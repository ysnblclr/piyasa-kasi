/* Piyasa Kası — Küresel sıralama API'si (Vercel Serverless, bağımlılıksız)
   Uçlar: ?op=register (POST) · ?op=login (POST) · ?op=score (POST) · ?op=board (GET) · ?op=diag (GET)
   Depolama: Vercel KV / Upstash Redis REST (env ile). Yoksa geçici bellek (kalıcı değil). */

const KV_URL   = process.env.KV_REST_API_URL   || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = "pk_players_v1";
const mem = { data: null }; // depolama yoksa geçici bellek

async function loadPlayers() {
  if (!KV_URL || !KV_TOKEN) return mem.data || {};
  const r = await fetch(`${KV_URL}/get/${KEY}`, { headers: { Authorization: `Bearer ${KV_TOKEN}` } });
  if (!r.ok) throw new Error("kv-get-" + r.status);
  const j = await r.json();
  if (!j || j.result == null) return {};
  try { return JSON.parse(j.result); } catch (e) { return {}; }
}
async function savePlayers(players) {
  if (!KV_URL || !KV_TOKEN) { mem.data = players; return; }
  const r = await fetch(`${KV_URL}/set/${KEY}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
    body: JSON.stringify(players)
  });
  if (!r.ok) throw new Error("kv-set-" + r.status);
}

const cleanNick  = s => String(s || "").replace(/[<>&"'`]/g, "").trim().slice(0, 20);
const cleanEmail = s => String(s || "").trim().toLowerCase().slice(0, 80);
const validEmail = s => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
const num = (v, lo, hi, dflt) => { const n = Number(v); return Number.isFinite(n) ? Math.max(lo, Math.min(hi, n)) : dflt; };

export default async function handler(req, res) {
  const op = (req.query && req.query.op) || "";
  const body = (req.body && typeof req.body === "object") ? req.body : {};
  try {
    if (op === "diag") {
      return res.status(200).json({ ok: true, kv: !!(KV_URL && KV_TOKEN) });
    }

    if (op === "board") {
      const players = await loadPlayers();
      const rows = Object.values(players)
        .map(p => ({
          nick: p.nick, bal: Math.round(p.bal),
          ret: Math.round((p.bal / 10000 - 1) * 1000) / 10,
          perQ: p.qs > 0 ? Math.round((p.sumPct / p.qs) * 100) / 100 : null,
          games: p.games || 0, qs: p.qs || 0
        }))
        .sort((a, b) => b.ret - a.ret).slice(0, 100);
      return res.status(200).json({ ok: true, rows });
    }

    if (op === "register" && req.method === "POST") {
      const email = cleanEmail(body.email), nick = cleanNick(body.nick);
      if (!validEmail(email)) return res.status(400).json({ ok: false, err: "Geçerli bir e-posta yaz." });
      if (!nick) return res.status(400).json({ ok: false, err: "Bir nickname yaz." });
      const players = await loadPlayers();
      const token = crypto.randomUUID();
      const existing = players[email];
      if (existing) {
        existing.token = token; existing.nick = nick || existing.nick;
        await savePlayers(players);
        return res.status(200).json({ ok: true, token, nick: existing.nick, bal: existing.bal, existing: true });
      }
      if (Object.values(players).some(p => p.nick.toLowerCase() === nick.toLowerCase()))
        return res.status(400).json({ ok: false, err: "Bu nickname alınmış — başka bir tane dene." });
      players[email] = { nick, token, bal: num(body.bal, 0, 1e7, 10000), games: 0, qs: 0, sumPct: 0, created: Date.now(), updated: Date.now() };
      await savePlayers(players);
      return res.status(200).json({ ok: true, token, nick, bal: players[email].bal, existing: false });
    }

    if (op === "login" && req.method === "POST") {
      const email = cleanEmail(body.email);
      const players = await loadPlayers();
      const p = players[email];
      if (!p) return res.status(404).json({ ok: false, err: "Bu e-posta kayıtlı değil — önce kaydol." });
      const token = crypto.randomUUID();
      p.token = token; await savePlayers(players);
      return res.status(200).json({ ok: true, nick: p.nick, bal: p.bal, token });
    }

    if (op === "score" && req.method === "POST") {
      const email = cleanEmail(body.email);
      const players = await loadPlayers();
      const p = players[email];
      if (!p || p.token !== body.token) return res.status(403).json({ ok: false, err: "auth" });
      p.bal = num(body.bal, 0, 1e7, p.bal);
      p.games += num(body.games, 0, 20, 0);
      p.qs += num(body.qs, 0, 200, 0);
      p.sumPct += num(body.sumPct, -2000, 2000, 0);
      p.updated = Date.now();
      await savePlayers(players);
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ ok: false, err: "bilinmeyen-istek" });
  } catch (e) {
    return res.status(500).json({ ok: false, err: String(e.message || e) });
  }
}

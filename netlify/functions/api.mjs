/* Piyasa Kası — Küresel sıralama API'si (Netlify Functions v2, bağımlılıksız)
   Uçlar: ?op=register (POST) · ?op=score (POST) · ?op=board (GET) · ?op=diag (GET) */

function blobCfg() {
  const raw = process.env.NETLIFY_BLOBS_CONTEXT;
  if (!raw) return null;
  try {
    const c = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
    const cached = c.edgeURL || c.url;
    const uncached = c.uncachedEdgeURL || c.url_uncached || cached;
    return {
      url: uncached, // güçlü tutarlılık: hem okuma hem yazma önbelleksiz uçtan
      token: c.token,
      siteID: c.siteID || c.site_id
    };
  } catch (e) { return null; }
}

const STORE = "piyasa-kasi";
const KEY = "players-v1";

async function loadPlayers() {
  const c = blobCfg();
  if (!c) throw new Error("no-blobs-context");
  const r = await fetch(`${c.url}/${c.siteID}/${STORE}/${KEY}`, {
    headers: { authorization: `Bearer ${c.token}` }
  });
  if (r.status === 404) return {};
  if (!r.ok) throw new Error("blob-get-" + r.status);
  try { return await r.json(); } catch (e) { return {}; }
}

async function savePlayers(players) {
  const c = blobCfg();
  const r = await fetch(`${c.url}/${c.siteID}/${STORE}/${KEY}`, {
    method: "PUT",
    headers: { authorization: `Bearer ${c.token}`, "content-type": "application/json" },
    body: JSON.stringify(players)
  });
  if (!r.ok) throw new Error("blob-put-" + r.status);
}

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json" } });

const cleanNick = s => String(s || "").replace(/[<>&"'`]/g, "").trim().slice(0, 20);
const cleanEmail = s => String(s || "").trim().toLowerCase().slice(0, 80);
const validEmail = s => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
const num = (v, lo, hi, dflt) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.max(lo, Math.min(hi, n)) : dflt;
};

export default async (req) => {
  const url = new URL(req.url);
  const op = url.searchParams.get("op") || "";

  try {
    if (op === "diag") {
      const c = blobCfg();
      return json({ ok: true, blobs: !!c, hasUrl: !!(c && c.url), hasToken: !!(c && c.token) });
    }

    if (op === "board") {
      const players = await loadPlayers();
      const rows = Object.values(players)
        .map(p => ({
          nick: p.nick,
          bal: Math.round(p.bal),
          ret: Math.round((p.bal / 10000 - 1) * 1000) / 10,
          perQ: p.qs > 0 ? Math.round((p.sumPct / p.qs) * 100) / 100 : null,
          games: p.games || 0,
          qs: p.qs || 0
        }))
        .sort((a, b) => b.ret - a.ret)
        .slice(0, 100);
      return json({ ok: true, rows });
    }

    if (op === "register" && req.method === "POST") {
      const b = await req.json().catch(() => ({}));
      const email = cleanEmail(b.email);
      const nick = cleanNick(b.nick);
      if (!validEmail(email)) return json({ ok: false, err: "Geçerli bir e-posta yaz." }, 400);
      if (!nick) return json({ ok: false, err: "Bir nickname yaz." }, 400);

      const players = await loadPlayers();
      const token = crypto.randomUUID();
      const existing = players[email];

      if (existing) {
        // hesap taşıma: e-postasını bilen, hesabını yeni cihaza bağlar
        existing.token = token;
        existing.nick = nick || existing.nick;
        await savePlayers(players);
        return json({ ok: true, token, nick: existing.nick, bal: existing.bal, existing: true });
      }

      const nickTaken = Object.values(players).some(p => p.nick.toLowerCase() === nick.toLowerCase());
      if (nickTaken) return json({ ok: false, err: "Bu nickname alınmış — başka bir tane dene." }, 400);

      players[email] = {
        nick, token,
        bal: num(b.bal, 0, 10000000, 10000),
        games: 0, qs: 0, sumPct: 0,
        created: Date.now(), updated: Date.now()
      };
      await savePlayers(players);
      return json({ ok: true, token, nick, bal: players[email].bal, existing: false });
    }

    if (op === "score" && req.method === "POST") {
      const b = await req.json().catch(() => ({}));
      const email = cleanEmail(b.email);
      const players = await loadPlayers();
      const p = players[email];
      if (!p || p.token !== b.token) return json({ ok: false, err: "auth" }, 403);

      p.bal = num(b.bal, 0, 10000000, p.bal);
      p.games += num(b.games, 0, 20, 0);
      const qd = num(b.qs, 0, 200, 0);
      p.qs += qd;
      p.sumPct += num(b.sumPct, -2000, 2000, 0);
      p.updated = Date.now();
      await savePlayers(players);
      return json({ ok: true });
    }

    if (op === "login" && req.method === "POST") {
      const b = await req.json().catch(() => ({}));
      const email = cleanEmail(b.email);
      const players = await loadPlayers();
      const p = players[email];
      if (!p) return json({ ok: false, err: "Bu e-posta kayıtlı değil — önce kaydol." }, 404);
      const token = crypto.randomUUID();
      p.token = token;
      await savePlayers(players);
      return json({ ok: true, nick: p.nick, bal: p.bal, token });
    }

    return json({ ok: false, err: "bilinmeyen-istek" }, 400);
  } catch (e) {
    return json({ ok: false, err: String(e.message || e) }, 500);
  }
};

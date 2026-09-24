/* Piyasa Kası — veri bütünlük testi. Kullanım: node tools/check-data.mjs
   Tüm data*.js + realdata.js'i yükler ve şunları doğrular:
   - başlıklar benzersiz; her senaryonun ders (les) ve konu (t) anahtarı geçerli; ctx tam 3 madde
   - SCEN'deki her başlık bir senaryoya karşılık geliyor (yetim yok) ve tersi
   - realdata'da ext/post/dv alanları tutarlı (kapanış, gün içi dip–tepe aralığında)
   - make5 için her senaryonun en az 2 PK_DETAILS maddesi var (uyarı)
   Hata varsa çıkış kodu 1 döner. */
import fs from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const ctx = { window: {} }; vm.createContext(ctx);
for(const f of ["data1.js","data2.js","data3.js","data4.js","data5.js","data6.js","realdata.js"]){
  const p = new URL(f, root); if(fs.existsSync(p)) vm.runInContext(fs.readFileSync(p,"utf8"), ctx, {filename:f});
}
const W = ctx.window, errs = [], warns = [];
const ALL = [].concat(W.PK_A||[], W.PK_B||[], W.PK_C||[], W.PK_D||[], W.PK_E||[]);
const seen = new Set(), noDet = [];
for(const s of ALL){
  if(seen.has(s.title)) errs.push(`Yinelenen başlık: ${s.title}`); seen.add(s.title);
  if(!W.PK_LESSONS[s.les]) errs.push(`Geçersiz ders '${s.les}': ${s.title}`);
  if(!W.PK_TOPICS[s.t]) errs.push(`Geçersiz konu '${s.t}': ${s.title}`);
  if(!Array.isArray(s.ctx) || s.ctx.length !== 3) errs.push(`ctx 3 madde değil (${s.ctx&&s.ctx.length}): ${s.title}`);
  if(((W.PK_DETAILS||{})[s.title]||[]).length < 2) noDet.push(s.title);
}
if(noDet.length) warns.push(`${noDet.length} senaryoda PK_DETAILS <2 madde → make5 son 2 maddeyi genel dolguyla tamamlar. İlk 5: ` + noDet.slice(0,5).map(t=>t.slice(0,40)).join(" | ") + (process.argv.includes("-v") ? "\n   " + noDet.join("\n   ") : "  (tümü için: -v)"));
// SCEN ↔ senaryo eşleşmesi
const src = fs.readFileSync(new URL("tools/fetch-data.mjs", root), "utf8");
const scen = [...src.matchAll(/^\s*\["(.+?)","([^"]*)","([yb-])","(\d{4}-\d\d-\d\d)",(-?[\d.]+)\]/gm)].map(m=>m[1]);
for(const t of scen) if(!seen.has(t)) errs.push(`SCEN yetim (senaryosu yok): ${t}`);
const scenSet = new Set(scen);
const noScen = ALL.filter(s=>!scenSet.has(s.title));
if(noScen.length) warns.push(`${noScen.length} senaryo SCEN'de yok (gerçek veri yerine SVG): ` + noScen.map(s=>s.title.slice(0,40)).join(" | "));
// realdata tutarlılığı
const R = W.PK_REAL || {}; let real = 0;
for(const [t,o] of Object.entries(R)){
  if(!o || !o.ret) continue; real++;
  for(const k in o.ret){
    if(o.ret[k]==null) continue;
    const e = o.ext && o.ext[k];
    if(!e) { errs.push(`ext eksik ${k}: ${t}`); continue; }
    if(o.ret[k] < e[0]-0.15 || o.ret[k] > e[1]+0.15) errs.push(`ext/ret tutarsız ${k} ret=${o.ret[k]} ext=${e}: ${t}`);
  }
  if(!o.post || !o.post.length) warns.push(`post yolu yok: ${t}`);
}
console.log(`Senaryo: ${ALL.length} · SCEN: ${scen.length} · gerçek veri: ${real} · ders: ${Object.keys(W.PK_LESSONS).length}`);
warns.forEach(w=>console.log("⚠️ ", w));
errs.forEach(e=>console.log("❌", e));
console.log(errs.length ? `\n${errs.length} HATA` : "\n✅ Bütünlük testi geçti");
process.exit(errs.length ? 1 : 0);

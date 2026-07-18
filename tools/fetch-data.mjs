/* Piyasa Kası — gerçek fiyat verisi çekme + doğrulama hattı (offline build script)
   Kaynaklar: Yahoo Finance (hisse/endeks/emtia/FX), Binance (kripto)
   Çıktı: realdata.js (window.PK_REAL = {title -> {ticker, baseDate, base, pre:[OHLC], ret:{...}}})
          + konsol doğrulama/yazım tablosu
   Node 24+ (global fetch). Kullanım: node tools/fetch-data.mjs            */

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36";
const DAY = 86400;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const iso = ts => new Date(ts*1000).toISOString().slice(0,10);

// title (data dosyalarındaki birebir), ticker, kaynak(y/b/-), olay tarihi (ISO), hikâyedeki hareket (%)
const SCEN = [
  ["Nvidia bilançosu: DeepSeek şokundan sonra ilk sınav","NVDA","y","2025-02-26",-8],
  ["Tarife manşetleri art arda: piyasa zirveden sarkıyor","^GSPC","y","2025-03-10",-6],
  ["Almanya savunma için 'ne gerekiyorsa' diyor: borç freni gevşiyor","RHM.DE","y","2025-03-04",25],
  ["Almanya'dan 500 milyar €'luk altyapı fonu: DAX'ta ne yaparsın?","^GDAXI","y","2025-03-18",5],
  ["Altın 3.000$ psikolojik seviyesini kırıyor","GC=F","y","2025-03-14",15],
  ["Altın 3.500$: iki haftada +%15'lik dikey tırmanış","GC=F","y","2025-04-22",-8],
  ["ABD-Çin, Cenevre'de tarife ateşkesi ilan etti","^GSPC","y","2025-05-12",3.3],
  ["Moody's, ABD'nin son AAA notunu da düşürdü","^GSPC","y","2025-05-16",1],
  ["İsrail-İran savaşı başladı: petrol +%7 açıldı","BZ=F","y","2025-06-13",-10],
  ["Orta Doğu'da savaş: hisseler satılır mı?","^GSPC","y","2025-06-13",3],
  ["Stablecoin devi Circle halka arzı patladı: geç mi kalındı?","CRCL","y","2025-06-05",80],
  ["Figma halka arzı: son yılların en çılgın ilk günü","FIG","y","2025-07-31",-35],
  ["Bitcoin 112k direncini kırdı: kurumsal alım dalgası","BTC","b","2025-07-14",10],
  ["Powell'ın Jackson Hole konuşması: bu kez piyasa karamsar","^GSPC","y","2025-08-22",1.5],
  ["FED 9 ay sonra ilk faiz indirimi: %96 fiyatlanmış","^GSPC","y","2025-09-17",0],
  ["Oracle bilançosu: dev yapay zekâ kontratları söylentisi","ORCL","y","2025-09-09",36],
  ["OpenAI-AMD anlaşması az önce duyuruldu: premarket +%15, kovalar mısın?","AMD","y","2025-10-06",24],
  ["Nvidia, OpenAI'a 100 milyar dolara varan yatırım açıkladı","NVDA","y","2025-09-22",4],
  ["Çin'e '%100 ek tarife' resti: piyasa güne zirvede başlamıştı","^GSPC","y","2025-10-10",-2.7],
  ["Tarife şoku kriptoya sıçradı: tarihin en büyük likidasyonu","BTC","b","2025-10-10",-14],
  ["Altın 4.380$: '4.000 kırıldı, 5.000 kesin' havası","GC=F","y","2025-10-21",-6],
  ["Palantir bilançosu: rekor kesin ama çarpan 60x gelir","PLTR","y","2025-11-03",-8],
  ["Nvidia yine ezdi: premarket +%5, ama piyasada 'balon' tartışması var","NVDA","y","2025-11-19",-3],
  ["FED yılın üçüncü indirimine gidiyor: Kasım düşüşü sonrası","^GSPC","y","2025-12-10",1.5],
  ["Bitcoin 89k: zirveden %30 düştü, 'dip' mi?","BTC","b","2025-11-20",-10],
  ["CoreWeave IPO'su fiyaskoyla açıldı: kimse istemiyor","CRWV","y","2025-03-28",60],
  ["Musk ile Başkan sosyal medyada alenen kavgaya tutuştu","TSLA","y","2025-06-05",-14],
  ["Tarife listesi açıklandı: Çin %54+ — iPhone'ların üretim üssü","AAPL","y","2025-04-03",-15],
  ["Novo Nordisk: kilo ilacı devinde art arda kötü sinyal","NVO","y","2025-07-29",-22],
  ["UnitedHealth bilançosu: 'istikrar abidesi' sağlık devi","UNH","y","2025-04-17",-22],
  ["Google antitröst davasında karar açıklanıyor: Chrome elden mi gidiyor?","GOOGL","y","2025-09-02",9],
  ["Pentagon, nadir element üreticisi MP'ye ortak oluyor","MP","y","2025-07-10",50],
  ["Güney Kore'de sıkıyönetim ilan edildi: piyasa nasıl açılır?","^KS11","y","2024-12-03",-1.5],
  ["Yurt içinde siyasi gerilim şoku: BIST ve TL baskı altında","XU100.IS","y","2025-03-19",-9],
  ["Nisan çöküşünden 11 hafta sonra: S&P yeni zirvede","^GSPC","y","2025-06-27",3],
  ["Japonya'da genişlemeci aday parti liderliğini kazandı","^N225","y","2025-10-06",8],
  ["Gümüş 50$: 1980 ve 2011'in efsane zirvesi test ediliyor","SI=F","y","2025-10-14",-7],
  ["Ethereum 4 yıl sonra tarihi zirvesine dönüyor","ETH","b","2025-08-22",5],
  ["'Yapay zekâ balonu' manşetleri: endeks 3 haftada -%5","^GSPC","y","2025-11-13",4],
  ["Nvidia bilançosu: rekor kesin, soru artık 'yeter mi?'","NVDA","y","2026-02-25",-6],
  ["İran savaşı: Hürmüz Boğazı fiilen kapandı, petrol 85$","BZ=F","y","2026-03-02",40],
  ["Savaş patladı, altın 5.400$ zirvesinde: güvenli liman alınır mı?","GC=F","y","2026-03-02",-25],
  ["Nasdaq resmi düzeltmede: üst üste 5 haftalık düşüş","^NDX","y","2026-03-27",15],
  ["İstihdam beklentinin İKİ KATI geldi: güçlü ekonomi, güçlü piyasa?","^NDX","y","2026-06-05",-4.2],
  ["SpaceX: tarihin en büyük halka arzı ilk gün +%19 kapattı","","-","2026-06-12",20],
  ["ABD-İran anlaşma çerçevesi açıklandı: Asya nasıl açılır?","^N225","y","2026-06-15",5.5],
  ["FED kararı: 'sabit tutar' fiyatlı — ama nokta grafiği ne diyecek?","^GSPC","y","2026-06-17",-1.5],
  ["Bitcoin dipten %13 toparladı: 82k — dönüş mü, ölü kedi mi?","BTC","b","2026-04-15",-20],
  ["'Asla satmayız' diyen Strategy (Saylor) Bitcoin sattı","BTC","b","2026-05-15",-10],
];

const HOR_Y = { "1g":1, "1h":5, "1a":21, "3a":63, "6a":126, "1y":252 };
const HOR_B = { "1g":1, "1h":7, "1a":30, "3a":90, "6a":180, "1y":365 };

async function fetchYahoo(ticker, startTs, endTs){
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?period1=${startTs}&period2=${endTs}&interval=1d`;
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if(!r.ok) throw new Error("yahoo-"+r.status);
  const j = await r.json();
  const res = j?.chart?.result?.[0];
  if(!res) throw new Error("yahoo-empty");
  const ts = res.timestamp || [], q = res.indicators?.quote?.[0] || {};
  const out = [];
  for(let i=0;i<ts.length;i++){
    if(q.close?.[i]==null) continue;
    out.push({ t:ts[i], o:q.open[i]??q.close[i], h:q.high[i]??q.close[i], l:q.low[i]??q.close[i], c:q.close[i] });
  }
  return out;
}
async function fetchBinance(sym, startMs, endMs){
  const out = []; let cur = startMs;
  while(cur < endMs){
    const url = `https://api.binance.com/api/v3/klines?symbol=${sym}&interval=1d&startTime=${cur}&endTime=${endMs}&limit=1000`;
    const r = await fetch(url); if(!r.ok) throw new Error("binance-"+r.status);
    const arr = await r.json(); if(!arr.length) break;
    for(const k of arr) out.push({ t:Math.floor(k[0]/1000), o:+k[1], h:+k[2], l:+k[3], c:+k[4] });
    cur = arr[arr.length-1][0] + DAY*1000;
    if(arr.length < 1000) break;
  }
  return out;
}
function baseIdx(series, eventTs){
  let idx = -1;
  for(let i=0;i<series.length;i++){ if(series[i].t <= eventTs + DAY*0.6) idx = i; else break; }
  return idx;
}
const rp = (v,d=2) => +v.toFixed(v>=1000?1:v>=10?2:4);

async function run(){
  const now = Math.floor(Date.now()/1000);
  const out = {}; const rows = [];
  for(const [title, ticker, src, dateISO, storedPct] of SCEN){
    const eventTs = Math.floor(new Date(dateISO+"T00:00:00Z").getTime()/1000);
    if(src === "-" || !ticker){ out[title] = {hidden:true}; rows.push({title, note:"GİZLİ"}); continue; }
    try{
      const startTs = eventTs - DAY*130, endTs = Math.min(eventTs + DAY*400, now);
      let series;
      if(src === "b"){ const sym = ticker==="BTC"?"BTCUSDT":ticker==="ETH"?"ETHUSDT":ticker+"USDT"; series = await fetchBinance(sym, startTs*1000, endTs*1000); }
      else series = await fetchYahoo(ticker, startTs, endTs);
      await sleep(280);
      if(series.length < 3) throw new Error("az-veri");
      const bi = baseIdx(series, eventTs);
      if(bi < 0) throw new Error("baz-yok");
      const base = series[bi].c, baseDate = iso(series[bi].t);
      const toBar = p => ({ time:iso(p.t), open:rp(p.o), high:rp(p.h), low:rp(p.l), close:rp(p.c) });
      const pre = series.slice(Math.max(0, bi-59), bi+1).map(toBar);
      const HOR = src==="b" ? HOR_B : HOR_Y;
      const ret = {}, days = {};
      for(const [k,off] of Object.entries(HOR)){
        const ti=bi+off;
        if(ti<series.length){ ret[k] = +(((series[ti].c-base)/base)*100).toFixed(2); days[k] = iso(series[ti].t); }
        else { ret[k] = null; days[k] = null; }
      }
      out[title] = { ticker, src, baseDate, base:rp(base), pre, ret, days };
      rows.push({ title, ticker, baseDate, base:rp(base), ret, storedPct });
    }catch(e){ out[title] = {error:String(e.message)}; rows.push({title, ticker, note:"❌ "+e.message}); }
  }
  const fs = await import("fs");
  fs.writeFileSync(new URL("../realdata.js", import.meta.url), "window.PK_REAL = " + JSON.stringify(out) + ";\n");
  // yazım tablosu: her senaryonun tüm vade getirileri
  console.log("\n=== YAZIM TABLOSU: gerçek getiriler (%) | hikaye ===");
  const f = v => v==null ? "  —  " : (v>=0?"+":"")+v.toFixed(1);
  for(const r of rows){
    if(r.note){ console.log((r.title.slice(0,40)).padEnd(40), r.note); continue; }
    console.log(`${r.title.slice(0,40).padEnd(40)} ${r.ticker.padEnd(9)} ${r.baseDate} | 1g${f(r.ret["1g"])} 1h${f(r.ret["1h"])} 1a${f(r.ret["1a"])} 3a${f(r.ret["3a"])} 6a${f(r.ret["6a"])} 1y${f(r.ret["1y"])} | hik:${r.storedPct}`);
  }
  const okc = rows.filter(r=>!r.note).length;
  console.log(`\nrealdata.js yazıldı — ${okc}/${SCEN.length} senaryo gerçek veri.`);
}
run();

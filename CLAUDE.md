# CLAUDE.md — Piyasa Kası Ajan Rehberi

> **BU DOSYA TÜM YAPAY ZEKÂ AJANLARI İÇİNDİR.** Projede çalışan her ajan önce burayı
> okur. **KURAL: Uygulamada yaptığın HER anlamlı değişikliği bu dosyaya işle** —
> yeni fonksiyon, kural, veri şeması, bug düzeltmesi veya deploy adımı. En alttaki
> "Değişiklik Günlüğü"ne bir satır ekle. Bu dosya güncel kalmazsa sonraki ajan yanlış
> varsayımlarla çalışır. Bir dosya/fonksiyon adı yazmadan önce hâlâ var olduğunu doğrula.

---

## 1. Uygulama Nedir

**Piyasa Kası** — finansal piyasa refleks/simülasyon oyunu. Oyuncu gerçek tarihi piyasa
anlarıyla (bilançolar, FED kararları, zirve kırılımları, şok haberler, jeopolitik, niş krizler)
karşılaşır ve **LONG / PAS / SHORT** + pozisyon büyüklüğü (%10/%25/%50) seçer. Sonuç, o olayın
**gerçek geçmiş fiyat hareketine** göre hesaplanır. Kasa kalıcıdır; küresel sıralama vardır.
Her karardan sonra **Trade Analizi**, tüm kararlardan **📊 Analizim** (oyuncu profili) üretilir.

- **Framework yok. Build adımı yok.** Saf vanilla JS + tek HTML. Tarayıcıda direkt çalışır.
- Dil: **Türkçe** (arayüz ve içerik). Kod yorumları da Türkçe.
- Canlı: https://piyasa-kasi.vercel.app · Repo: https://github.com/ysnblclr/piyasa-kasi (public)

---

## 2. Dosya Yapısı

| Dosya | İçerik |
|---|---|
| `index.html` | **Ana oyun.** Tüm UI + oyun mantığı + CSS burada (~1600 satır). |
| `realdata.js` | `window.PK_REAL` — gerçek fiyat + analiz verisi. **Otomatik üretilir**, elle düzenleme. ~1.46MB, 263 anahtar / 260 gerçek veri. |
| `data1.js` | `S()` factory, `PK_TOPICS`, `PK_LESSONS`, `PK_A` (bilanço + FED/makro + Türkiye) |
| `data2.js` | `PK_B` (zirve kırılımı, sempati, şok, halka arz, kripto, emtia, meme) |
| `data3.js` | `PK_C` (2025 senaryoları) |
| `data4.js` | `PK_D` (2026 senaryoları) |
| `data5.js` | `PK_DETAILS` — senaryo başına 3 nitel madde (Ortam/Varlık/Duyarlılık) |
| `data6.js` | `PK_E` — **24 niş olay** + `Object.assign` ile yeni `PK_LESSONS` ve `PK_DETAILS` |
| `vendor-lightweight-charts.js` | TradingView lightweight-charts v4.2.1, gömülü (CDN yok). |
| `disiplin-paneli.html` | Bağımsız "Disiplin Kazan" psikoloji paneli. Oyuna **iframe** ile gömülü. |
| `tools/fetch-data.mjs` | **Offline veri çekme hattı.** realdata.js'i üretir. Node 24+. |
| `tools/check-data.mjs` | **Veri bütünlük testi.** Her veri değişikliğinden sonra çalıştır. |
| `tools/.cache/` | Hattın ham seri önbelleği (git'e girmez, silinebilir). |
| `api/lb.mjs` | Vercel serverless — küresel sıralama API'si (Upstash Redis). |
| `netlify/functions/api.mjs` | Netlify eşdeğeri (çift platform için tutuluyor). |
| `.claude/launch.json` | Preview dev server (`npx http-server . -p 8080`). |
| `cors_server.py` | Alternatif yerel sunucu. |

**Script yükleme sırası (index.html, ~satır 328-335):**
`vendor-lightweight-charts.js` → `realdata.js?v=15` → `data1..5.js?v=12` → `data6.js?v=2`

> ⚠️ **CACHE VERSİYONU:** `realdata.js` veya `data*.js` değiştirdiysen, index.html'deki
> ilgili `?v=NN` sayısını artır — yoksa tarayıcı eski dosyayı önbellekten okur.

> ⚠️ **HAVUZ SIRASI:** `SCENARIOS_ALL = PK_A.concat(PK_B, PK_C, PK_D, PK_E)`. Oyuncunun
> `pk_used` kaydı bu dizinin **indekslerini** tutar → yeni senaryo dosyası hep **SONA** eklenir,
> mevcut dizilerin ortasına senaryo eklenmez (eklenirse oyuncuların "görülmüş soru" kaydı kayar).

---

## 3. Veri Modeli

### Senaryo — `S()` factory (data1.js)
```
S(name, cat, t, date, title, ctx, from, to, pct, story, les, vade)
```
- `name` görünen varlık adı ("Nvidia"), `cat` kategori etiketi, `t` konu anahtarı (PK_TOPICS:
  bilanco, fed, makro, zirve, sempati, sok, ipo, kripto, emtia, meme, tr, endeks),
  `date` görünen tarih metni, `title` **benzersiz başlık** (realdata + PK_DETAILS bununla eşleşir),
  `ctx` **tam 3 madde** — karar anında BİLİNEN bilgi, sonucu ele vermez; `from`/`to`/`pct` temsili
  fiyatlar/hareket (yalnız SVG fallback'te kullanılır), `story` sonuç açıklaması, `les` ders anahtarı
  (PK_LESSONS), `vade` varsayılan vade metni.

### Gerçek veri — `window.PK_REAL` (realdata.js)
```
"<title>": { ticker, src, baseDate, base, pre:[{time,open,high,low,close}...],
             ret:{1g,1h,1a,3a,6a,1y}, days:{...}, ext:{1g:[mn,mx],...}, post:[[gün,kapanış],...], dv, gap }
```
- `src`: `"y"`=Yahoo, `"b"`=Binance. `base` baz kapanış, `pre` olay öncesi ≤60 mum (grafik),
  `ret[vade]` baz → vade sonu **gerçek %**, `days[vade]` o vadenin tarihi. Veri yoksa `null`.
- **Analiz alanları:**
  - `ext[vade] = [mn, mx]` — baz'dan vade sonuna kadar **gün içi** en düşük / en yüksek (%).
    Pozisyonun yolda yaşattığı acı (MAE) ve fırsat (MFE). Kural: her vadede `mn ≤ ret ≤ mx`.
  - `post` — olay sonrası kapanış yolu `[baz'dan takvim günü, kapanış]`; ilk 21 seans günlük,
    63'e kadar 3'te bir, sonra 7'de bir örneklenir (boyut). Sonuç grafiği bunu çizer.
  - `dv` — olay öncesi günlük oynaklık (% std, log getiri). IPO'larda `null`.
  - `gap` — baz sonrası ilk seansın **açılışı** (%). Stop analizinde boşluk (gap) dolumu için.
- Başarısız senaryolarda `{error:...}` veya `{hidden:true}` (SpaceX: ticker yok).

### `PK_DETAILS`: `"<title>": [madde1, madde2, madde3]` — make5 ilk 2'sini gösterir.

### Arşiv — localStorage `pk_archive` (en yeni önde, max 300)
`{n, cat, t(title), d, v(vade etiketi), c(long/short/pass), r(risk), p(K/Z $), pct(efektif %), story, les, ts,
  pl(oyuncu), tp(konu), ar(ilgi alanı), mae, mfe, sh(stop tetiklenir miydi 0/1)}` —
`pl/tp/ar/mae/mfe/sh` 2026-09 sonrası kayıtlarda var; eskilerde yok (analiz geri dönüş yapar).

---

## 4. KALICI ALGORİTMA KURALLARI (kullanıcı tarafından zorunlu kılındı — BOZMA)

1. **Veri dosyada tutulur, veritabanında DEĞİL.** Gerçek veri `realdata.js` dosyasındadır.
2. **Vade tarih doğrulaması:** Bir vade yalnızca `(olay tarihi + vade süresi) ≤ bugün` ise
   gösterilir. Hat bunu otomatik sağlar (series bugüne kadar → gelecek vade `null`).
3. **Soru başına TAM 5 bilgi maddesi:** `make5(sc)` = `sc.ctx` (3) + `PK_DETAILS` (2). Grafik
   istatistiği maddesi (eski `realInfoBullets`/`ensure5`) geri ekleme.
4. **Skorlama gerçek `ret[vade]` üzerinden.** Temsili `pct` sadece gerçek veri yoksa.
5. **Volatilite tabanı (VOL_FLOOR = %3):** seçilen vadede |ret| < %3 ise `effVade` ≥%3 fırsatın
   olduğu en yakın vadeye (önce ileri) kayar (`reason:"vol"`) — "fırsatlar bitmez, takip edildiği sürece."
6. **Baz hizalama hikâye niyetine göre:** `anchorIdx` baz'ı `storedPct` yönüyle eşleşecek şekilde seçer.
7. **Olgusal doğruluk:** Senaryo metinleri gerçek tarihe ve hattın ölçtüğü getirilere uymalı.
   Emin olmadığın sayıyı yazma; `ctx`'te sonucu ele verme.

---

## 5. Gerçek Veri Hattı — `tools/fetch-data.mjs`

**Çalıştırma:** `node tools/fetch-data.mjs` → `realdata.js` + konsolda yazım tablosu. Ardından
**mutlaka** `node tools/check-data.mjs`. Önbellek sayesinde tekrar çalıştırma ~15 sn
(ilk/temiz çalıştırma ~3-4 dk). İnternet gerekir.

- **`SCEN`:** `[title, ticker, src, dateISO, storedPct]`. `title` data dosyalarıyla **birebir**.
- **Ağ:** `getJSON` 429/5xx'te üstel bekleme ile 5 kez dener (Yahoo hız sınırı gerçek).
- **Önbellek:** `cachedSeries` — penceresi (olay+400 gün) tamamen geçmişte kalan seriler
  `tools/.cache/`'e yazılır ve bir daha çekilmez. Güncel olaylar her seferinde ağdan gelir.
  Şüpheli veri görürsen ilgili `.cache` dosyasını silip yeniden çalıştır.
- **`fetchYahoo` temizliği:** h/l, o/c ile tutarlı yapılır; `low < close×0.3` veya
  `high > close×3.5` bozuk gün içi uç sayılıp kırpılır (negatif fiyatlı petrol hariç).
- **`DATA_FIX`:** bilinen kaynak hataları için belgelenmiş düzeltmeler (`ticker → {tarih:{c,h,l}}`).
  Şu an: VOW.DE 28.10.2008 (Yahoo 500€ gösteriyor; gerçek kapanış 945€, gün içi 1.005,01€).
  Yalnız kamuya açık, iyi belgelenmiş değerler + kaynak notu.
- `HOR_Y` borsa günü {1g:1,1h:5,1a:21,3a:63,6a:126,1y:252}; `HOR_B` takvim günü {…,1y:365}.
- **`anchorIdx(series, eventDateISO, storedPct)`:** baz adayları `{olay-günü-1, olay-günü}`;
  1g'si `storedPct` ile aynı işaretli ve en büyük olan seçilir. **Halka arz:** olay serinin ilk
  barıysa (e=0) tek aday ilk gün kapanışıdır ("ilk gün sonrası" kararı).
  - **SCEN `dateISO` seçimi:** karar olaydan ÖNCE ise (hafta sonu haberi, açılış öncesi) tarih =
    tepki günü; karar olay günü KAPANIŞINDA ise tarih = o gün. `storedPct` işareti hangi tabanın
    seçileceğini belirler — yazdıktan sonra tablodaki `baseDate`'i kontrol et.
- **Başarısızlar (3):** SpaceX (ticker yok), Spirit AeroSystems ve Nikola (borsadan çıktı, 404).
  SCEN'de olmayan 10 senaryo (LUNA, Twitter, XIV, BBBY, FRC, Hertz, TTF gaz, lityum, gram altın,
  SK Hynix) SVG fallback ile oynanır.

### `tools/check-data.mjs` — bütünlük testi
Yinelenen başlık, geçersiz `les`/`t`, 3 olmayan `ctx`, yetim SCEN kaydı, `ext`/`ret` tutarsızlığı
→ **hata (çıkış 1)**. PK_DETAILS eksikliği ve SCEN'de olmayan senaryolar → uyarı (`-v` tam liste).

---

## 6. Frontend Anahtar Fonksiyonlar (index.html)

- `realOf(sc)`, `effVade(r, key)` (sıra: veri yok → en yakın; |ret|<%3 → ileri kay; yoksa seçilen),
  `make5(sc)`.
- `showScenario()` → soru ekranı (+ `setView("oyna")`). `realOf` varsa mum grafiği, yoksa SVG.
- `resolve()` → skorlar, `tradeAnalysis` çalıştırır, sonucu `state.history` ve arşive (`saveToArchive(…, extra)`) yazar.
- `buildPostLine(r, effKey)` → `r.post`'tan vade sonuna kadar **gerçek günlük yol**; `post` yoksa
  vade noktalarını birleştirir. `renderCandles` yol üstüne **dip/tepe** işaretleri koyar.
  **`setTimeout` kullanılır, `requestAnimationFrame` DEĞİL** (arka plan sekmesinde rAF tetiklenmez).
- `showFinal()` → oyun sonu; ders özeti + akıllı disiplin kartı + "📊 Karar Analizim" butonu.
- `pickRound()` → 10 soru; ilgi filtresine uyar; 6/10 ağırlık 2025+ olaylara.
- `interestOf(sc)` → 8 ilgi alanı. Döviz çiftleri (`eur/chf|gbp/usd|usd/jpy|usd/rub`) ve Şanghay → endeks; Kodak → meme.
- `apiCall()` → Vercel (`/api/lb`) / Netlify otomatik seçim.

**localStorage (oyun):** `pk_player`, `pk_players_v1`, `pk_archive`, `pk_used`, `pk_interests`, `pk_best`, `pk_*`.

---

## 7. Analiz Katmanı

### 📐 Trade Analizi — `tradeAnalysis(r, effKey, choice, risk, bal)` → `{html, m}`
Her gerçek-veri sonucunda gösterilir. Yön-duyarlı (`d` = +1 LONG, −1 SHORT, 0 PAS):
- **En kötü an** (MAE = `d>0 ? mn : -mx`) ve kasadaki $ etkisi; kasanın ≥%50'si → **margin call** uyarısı.
- **En iyi an** (MFE) ve vade sonuna göre geri verilen kâr (≥5 puan → kâr alma dersi).
- **%8 stop testi** (`STOP_PCT`): tetiklenir mi; `gap` stop'un ötesindeyse emir açılıştan dolar;
  boşluk tüm kayıpsa "stop gap'e karşı koruma değildir" mesajı.
- **En iyi çıkış vadesi**; hiçbir vadede kâr yoksa "yön yanlışsa beklemek kurtarmaz".
- **Oynaklık/boyut:** `σ = dv·√n` (n = `HOR_N[src][vade]`); kasa salınımını ~±%2'de tutan pozisyon
  `≈ 200/σ` (5–50 arası). **Kara kuğu:** uç hareket ≥ 4σ ise uyarı.
- PAS'ta: iki yönün en kötü anı, kaçan hareket, en büyük fırsat.
- `m = {mae, mfe, sh}` → history + arşiv.

### 📊 Analizim — `showAnalysis()` (nav: `data-v="analiz"`, Hesabım ve oyun sonundan da açılır)
`myArchive()`: aktif oyuncunun (`pl`) kayıtları; hiç yoksa eski oyuncusuz kayıtlar. `tp`/`ar`
senaryonun **güncel** tanımından alınır. En az 5 karar gerekir. Üretilenler:
- **Profil** (öncelik sırasıyla): Kumarbaz Eğilimi, Agresif Avcı, Aşırı Özgüvenli, Temkinli Gözlemci,
  Kalıcı Boğa, Ayı Avcısı, Yön Arayışında, Keskin Nişancı, Dengeli Trader.
- **Disiplin skoru** (50'den başlar; bileşenleri ekranda açılır): isabet, aşırı özgüven
  (yanlışlarda daha büyük pozisyon), %50 pozisyonla kayıplar, yerinde PAS, kaçan ≥%10 hareket,
  stop seviyesini aşan kayıplar, kazanç/kayıp oranı.
- İsabet (toplam/LONG/SHORT), K/Z, PAS oranı, **kümülatif K/Z eğrisi** (inline SVG) + gelişim trendi.
- **Yön yanlılığı** (LONG payı vs senaryoların gerçek yükselme oranı), aşırı özgüven, kazanç/kayıp oranı, sabır testi.
- **Zaaf profili** — `ARCHETYPES`: FOMO (LONG, kalabalik/yorgun/sat/ipo…), panik satış (SHORT,
  panik/jeo/lehman…), bıçak tutma (LONG, ucuz/olum/bulas…), trende karşı (SHORT, zirve/trend/sqz…).
  En belirgin zaaf → ilgili disiplin aracına `openDiscipline(tool)` bağlantısı.
- Alan ve olay tipi bazında isabet çubukları; PAS'ta kaçan büyük hareketler.

---

## 8. Disiplin Paneli Entegrasyonu

- **`showDiscipline(view)`** — `disiplin-paneli.html`'i **iframe** ile gömer. `view` → `#view=<id>`.
- **`openDiscipline(view)`** — oyun içinden belirli aracı açar (oyun sonu kartı, Analizim zaaf kartı).
- **Oyun sonu kancası:** büyük/agresif kayıp → `em-red-view`; hiç PAS yok → `checklist-view`;
  yüksek kâr → `em-yellow-view`; diğer → `simulation-view`.
- Panel view id'leri: `home-view`, `em-red-view`, `em-yellow-view`, `checklist-view`, `position-size-view`,
  `routine-view`, `journal-view`, `stats-view`, `wizard-view`, `mindset-view`, `fear-guide-view`,
  `social-view`, `simulation-view`, `perception-view`, `glossary-view`, `buy-time-view`.
  Panel localStorage: `streak`, `journal`, `perc` (oyunla çakışmaz).

---

## 9. Deploy

- **GitHub:** `ysnblclr/piyasa-kasi` (public). Kullanıcı isteği: her değişikliği push et.
  Commit mesajları Türkçe; sonuna `Co-Authored-By: Claude ...` satırı.
- **Vercel:** push → otomatik deploy. `api/lb.mjs` + Upstash Redis (env `KV_REST_API_URL`/`_TOKEN`).
- **Netlify:** kredi bitti ama kod tutuluyor — Netlify dosyalarını SİLME.

---

## 10. Yerel Çalıştırma / Test

- Preview: Browser pane `preview_start {name:"piyasa-kasi"}`.
- **Doğrulama:** `node tools/check-data.mjs` → oyunu oyna (1 Gün ve 1 Ay), soru ekranında 5 madde +
  grafik, sonuçta gerçek getiriler + Trade Analizi + grafikte gerçek yol; Analizim ekranı (≥5 karar);
  375px genişlikte yatay taşma olmamalı; konsolda hata olmamalı.
- Belirli senaryoyu test etmek için konsolda: `round=[SCENARIOS_ALL.find(s=>s.title.startsWith("…"))]
  .concat(pickRound().slice(0,9)); state.i=0; showScenario();`

---

## 11. Tuzaklar / Öğrenilenler

- **Stooq** captcha ile CLI'ı engelliyor → Yahoo. **Yahoo 429** verir → hat yeniden dener; önbelleği silme.
- **Yahoo veri hataları olur** (VW 2008). Uç bir analiz değeri görürsen gün içi veriyi kontrol et, gerekirse `DATA_FIX`.
- **Yahoo FX tarih damgaları kayık** (ör. EUR/CHF şoku "16 Ocak" barında, sterlin cuma kapanışı "25 Eylül" barında).
  FX senaryolarında hattın seçtiği `baseDate`'e bak, metni ona göre yaz.
- **Hisse bölünmeleri:** Yahoo fiyatları bölünmeye göre düzeltilmiş (Netflix 2011 ≈ 2$). Metinlerde mutlak fiyat yerine % kullan.
- **Halka arz regresyonu (düzeltildi):** `anchorIdx` bir ara e=0'ı reddettiği için 7 IPO senaryosu sessizce SVG'ye düşmüştü.
  Başarısız sayısı arttığında (`realdata.js yazıldı — X/Y`) nedenini mutlaka incele.
- **Hikâye/gerçek uyuşmazlığı:** Bazı eski `story`/`les` metinleri gerçek sonuçla çelişiyor (ör. Airbnb IPO
  hikâyesi −%10 diyor; gerçek 3 ayda +%45). Gerçek veri varsa ekranda `story` değil gerçek getiriler gösterilir,
  ama `les` dersi yine gösterilir — yeni senaryolarda dersi gerçek sonuca göre seç.
- **Yeni senaryo ekleme sırası:** (1) data dosyasına `S(...)` (yeni dosya ise index.html'e script + `SCENARIOS_ALL`
  sonuna ekle), (2) `PK_DETAILS`'e 3 madde, (3) `SCEN`'e satır, (4) `node tools/fetch-data.mjs`, (5) `baseDate`
  ve getirileri kontrol et, metni gerçek sayılara göre yaz, (6) `node tools/check-data.mjs`, (7) `?v=` artır,
  (8) tarayıcıda test, (9) bu dosyayı güncelle, commit+push.
- **Windows git:** `LF will be replaced by CRLF` uyarısı zararsız.

### Açık işler
- **200 eski senaryonun (PK_A, PK_B) PK_DETAILS'i yok** → make5 son 2 maddeyi genel dolguyla tamamlıyor
  (kural 3'ü tam karşılamıyor). `node tools/check-data.mjs -v` listeyi verir.

---

## 12. Değişiklik Günlüğü

> **Buraya her ajan kendi değişikliğini bir satırla ekler (en yeni üstte).**

- 2026-09-24 — **Analiz + niş senaryolar + hat güçlendirme.** Hat: 429 yeniden deneme, ham seri önbelleği
  (3 dk → 15 sn), Yahoo gün içi temizliği, `DATA_FIX` (VW 2008), yeni alanlar `ext`/`post`/`dv`/`gap`;
  `anchorIdx` halka arz regresyonu düzeldi (+11 senaryo: Circle, Figma, CoreWeave, ARM, FB, Uber, Coinbase,
  Rivian, Snap, Airbnb, DoorDash); Rivian tarihi düzeltildi. Gerçek veri 225 → 260/263. `data6.js`: 24 niş olay
  (İsviçre frangı şoku, TL 2018, VW squeeze, Kara Pazartesi, Lehman, Adani, sterlin mini bütçe, yen müdahalesi,
  Şanghay 2015, Nikkei 1989, Nasdaq 2000, Kodak, Carnival aşı günü, BTC Kara Perşembe, Moderna, Qwikster,
  Tesla "funding secured", ETH ICO, BTC CME, YPF/Milei, ruble, FTT, Luckin, UBS/CS) + 5 yeni ders
  (taahhut, niyet, gecikme, mudahale, kontrol). Frontend: Trade Analizi (MAE/MFE, boşluk-farkında stop, margin call,
  kara kuğu, oynaklığa göre boyut), sonuç grafiğinde gerçek günlük yol + dip/tepe, 📊 Analizim ekranı (profil,
  disiplin skoru, yanlılık, zaaf profili → disiplin paneli), arşive `pl/tp/ar/mae/mfe/sh`. `tools/check-data.mjs`
  eklendi. Bug: oyun ortasında nav'dan dönünce "Oyna" vurgusu güncellenmiyordu (`showScenario` → `setView`).
- 2026-07-19 — CLAUDE.md oluşturuldu (bu dosya): tam mimari + kalıcı kurallar + hattı belgelendi.
- 2026-07-19 — Disiplin paneli oyuna entegre edildi: `showDiscipline` iframe gömme + `openDiscipline`
  derin bağlantı + `showFinal`'de risk-davranışına göre akıllı disiplin kartı; panele `#view=` hash okuyucusu.
- 2026-07-19 — Gerçek volatilite: `anchorIdx` storedPct-hizalı baz seçimi (bilanço off-by-one düzeldi) +
  frontend `VOL_FLOOR=%3` (effVade ileri kayar). |1g|≥%3 canlı senaryo 113→153.
- 2026-07-19 — 232→225 senaryo gerçek veriyle eşlendi (SCEN 49→239); vade tarih doğrulaması;
  5 madde kuralı (make5 = ctx3 + PK_DETAILS2); realInfoBullets/ensure5 kaldırıldı.

# CLAUDE.md — Piyasa Kası Ajan Rehberi

> **BU DOSYA TÜM YAPAY ZEKÂ AJANLARI İÇİNDİR.** Projede çalışan her ajan önce burayı
> okur. **KURAL: Uygulamada yaptığın HER anlamlı değişikliği bu dosyaya işle** —
> yeni fonksiyon, kural, veri şeması, bug düzeltmesi veya deploy adımı. En alttaki
> "Değişiklik Günlüğü"ne bir satır ekle. Bu dosya güncel kalmazsa sonraki ajan yanlış
> varsayımlarla çalışır. Bir dosya/fonksiyon adı yazmadan önce hâlâ var olduğunu doğrula.

---

## 1. Uygulama Nedir

**Piyasa Kası** — finansal piyasa refleks/simülasyon oyunu. Oyuncu gerçek tarihi piyasa
anlarıyla (bilançolar, FED kararları, zirve kırılımları, şok haberler, jeopolitik) karşılaşır
ve **LONG / PAS / SHORT** + pozisyon büyüklüğü (%10/%25/%50) seçer. Sonuç, o olayın
**gerçek geçmiş fiyat hareketine** göre hesaplanır. Kasa kalıcıdır; küresel sıralama vardır.

- **Framework yok. Build adımı yok.** Saf vanilla JS + tek HTML. Tarayıcıda direkt çalışır.
- Dil: **Türkçe** (arayüz ve içerik). Kod yorumları da Türkçe.
- Canlı: https://piyasa-kasi.vercel.app · Repo: https://github.com/ysnblclr/piyasa-kasi (public)

---

## 2. Dosya Yapısı

| Dosya | İçerik |
|---|---|
| `index.html` | **Ana oyun.** Tüm UI + oyun mantığı + CSS burada (~1300 satır). |
| `realdata.js` | `window.PK_REAL` — gerçek OHLC verisi. **Otomatik üretilir**, elle düzenleme. ~1.1MB, 239 anahtar / 225 gerçek veri. |
| `data1.js` | `S()` factory, `PK_TOPICS`, `PK_LESSONS`, `PK_A` (bilanço + FED/makro + Türkiye senaryoları) |
| `data2.js` | `PK_B` (zirve kırılımı, sempati, şok, halka arz, kripto, emtia, meme) |
| `data3.js` | `PK_C` (2025 senaryoları) |
| `data4.js` | `PK_D` (2026 senaryoları) |
| `data5.js` | `PK_DETAILS` — her senaryo için 3 nitel bilgi maddesi (Ortam/Varlık/Duyarlılık) |
| `vendor-lightweight-charts.js` | TradingView lightweight-charts v4.2.1, gömülü (CDN yok). |
| `disiplin-paneli.html` | Bağımsız "Disiplin Kazan" psikoloji paneli. Oyuna **iframe** ile gömülü. |
| `tools/fetch-data.mjs` | **Offline veri çekme hattı.** realdata.js'i üretir. Node 24+. |
| `api/lb.mjs` | Vercel serverless — küresel sıralama API'si (Upstash Redis). |
| `netlify/functions/api.mjs` | Netlify eşdeğeri (çift platform için tutuluyor). |
| `.claude/launch.json` | Preview dev server (`npx http-server . -p 8080`). |
| `cors_server.py` | Alternatif yerel sunucu. |

**Script yükleme sırası (index.html içinde, ~satır 312-318):**
`vendor-lightweight-charts.js` → `realdata.js?v=14` → `data1..5.js?v=12`

> ⚠️ **CACHE VERSİYONU:** `realdata.js` veya `data*.js` değiştirdiysen, index.html'deki
> ilgili `?v=NN` sayısını artır — yoksa tarayıcı eski dosyayı önbellekten okur.

---

## 3. Veri Modeli

### Senaryo — `S()` factory (data1.js)
```
S(name, cat, t, date, title, ctx, from, to, pct, story, les, vade)
```
- `name` görünen varlık adı ("Nvidia"), `cat` kategori etiketi, `t` konu anahtarı (PK_TOPICS),
  `date` görünen tarih metni, `title` **benzersiz başlık** (realdata + PK_DETAILS bununla eşleşir),
  `ctx` **3 elemanlı bağlam maddesi dizisi**, `from`/`to`/`pct` temsili fiyatlar/hareket,
  `story` sonuç açıklaması, `les` ders anahtarı (PK_LESSONS), `vade` varsayılan vade metni.

### Gerçek veri — `window.PK_REAL` (realdata.js)
```
"<title>": { ticker, src, baseDate, base, pre:[{time,open,high,low,close}...],
             ret:{1g,1h,1a,3a,6a,1y}, days:{1g,1h,...} }
```
- `src`: `"y"`=Yahoo Finance, `"b"`=Binance. `base` = baz kapanış fiyatı, `pre` = olay öncesi
  mum serisi (grafik), `ret[vade]` = baz'dan o vade sonuna **gerçek %** getiri, `days[vade]` = o
  vadenin tarihi. Veri yoksa `ret/days` `null`. Başarısız senaryolarda `{error:...}` veya `{hidden:true}`.

### `PK_DETAILS` (data5.js): `"<title>": [madde1, madde2, madde3]` — nitel bağlam.

---

## 4. KALICI ALGORİTMA KURALLARI (kullanıcı tarafından zorunlu kılındı — BOZMA)

1. **Veri dosyada tutulur, veritabanında DEĞİL.** Gerçek veri `realdata.js` dosyasındadır.
   Kullanıcı bunu defalarca onayladı. Veritabanına taşıma.
2. **Vade tarih doğrulaması:** Bir vade yalnızca `(olay tarihi + vade süresi) ≤ bugün` ise
   gösterilir. `fetch-data.mjs` bunu otomatik sağlar (series sadece bugüne kadar veri içerir →
   `ti < series.length` gelecekteki vadeyi `null` bırakır). **2026 olaylarının 1 yıllık vadesi YOKTUR.**
3. **Soru başına TAM 5 bilgi maddesi:** `make5(sc)` = `sc.ctx` (3) + `PK_DETAILS` (2). Eski
   `realInfoBullets`/`ensure5` (grafik istatistikleri) kaldırıldı — geri ekleme.
4. **Skorlama gerçek `ret[vade]` üzerinden** yapılır (realdata.js). Temsili `pct` sadece gerçek
   veri yoksa (SVG fallback) kullanılır.
5. **Volatilite tabanı (VOL_FLOOR = %3):** Her senaryo ≥%3'lük bir "fırsat" sunmalı. `effVade`
   seçilen vadede |ret| < %3 ise **≥%3 fırsatın olduğu en yakın vadeye (önce ileri) kayar**
   (`reason:"vol"`). Kullanıcının felsefesi: "fırsatlar bitmez, takip edildiği sürece."
6. **Baz hizalama hikâye niyetine göre:** `anchorIdx` baz'ı, sonucu `storedPct`'in
   (hikâyedeki hareket yönü) ile eşleşecek şekilde seçer (bkz. §5). Bunu bozma — hikâyeler ters döner.

---

## 5. Gerçek Veri Hattı — `tools/fetch-data.mjs`

**Çalıştırma:** `node tools/fetch-data.mjs` (Node 24+, global fetch). Çıktı: `realdata.js` +
konsolda yazım/doğrulama tablosu. İnternet gerekir (Yahoo + Binance).

- **`SCEN` dizisi:** `[title, ticker, src, dateISO, storedPct]`. `title` **data dosyalarındaki
  başlıkla birebir** aynı olmalı, yoksa oyunda eşleşmez. Yeni senaryo eklerken buraya ekle.
- Kaynaklar: Yahoo (`fetchYahoo`, hisse/endeks/emtia/FX), Binance (`fetchBinance`, kripto;
  `BTC→BTCUSDT`, `ETH→ETHUSDT`, diğerleri `+USDT`).
- `HOR_Y` = borsa günü offsetleri {1g:1,1h:5,1a:21,3a:63,6a:126,1y:252},
  `HOR_B` = takvim günü offsetleri {1g:1,1h:7,1a:30,...,1y:365}.
- **`anchorIdx(series, eventDateISO, storedPct)` — EN KRİTİK FONKSİYON:**
  Baz adayları `{olay-günü-1, olay-günü}`. Her aday için 1g getirisi hesaplanır; `storedPct`
  ile **aynı işaretli ve en büyük** olan baz seçilir (PAS senaryolarında en küçük |hareket|).
  Bu; (a) kapanış-sonrası bilanço off-by-one bug'ını çözer (Nvidia 1g -2.85% → +16.4%),
  (b) intraday spike'ları doğru yakalar, (c) hikâyeleri ters çevirmez (AMC -17.9%, GameStop +135%).
- **Başarısızlar (~14 senaryo):** IPO ilk-gün senaryoları (`baz-yok` — olay öncesi geçmiş yok:
  Rivian/Snap/Airbnb/DoorDash ilk gün) ve delisted ticker'lar (`yahoo-404`, örn. Nikola). Bunlar
  oyunda otomatik SVG fallback moduna düşer — sorun değil.

---

## 6. Frontend Anahtar Fonksiyonlar (index.html)

- `realOf(sc)` → senaryonun gerçek verisi (varsa) veya null.
- `effVade(r, chosenKey)` → efektif vade + pct. Sıra: (1) veri yoksa en yakın mevcut vade
  (`reason:"nodata"`), (2) |ret|<%3 ise ≥%3 fırsata ileri kay (`reason:"vol"`), (3) yeterliyse seçileni ver.
- `make5(sc)` → tam 5 nitel madde (ctx 3 + PK_DETAILS 2).
- `showScenario()` → soru ekranı. `realOf` varsa TradingView mum grafiği + gerçek vade; yoksa SVG fallback.
  `effVade` fallback yaptıysa görünür not gösterir ("… hareketi zayıf → fırsat vadesi X").
- `resolve()` → cevap sonucu; gerçek `ret[vade]` ile skorlar; tüm vade getirilerini listeler; grafiğe olay-sonrası çizgi çizer.
- `renderCandles(elId, pre, postLine)` → mum grafiği çizer. **`setTimeout` kullanır, `requestAnimationFrame` DEĞİL**
  (rAF arka plan sekmesinde tetiklenmez → grafik boş kalırdı).
- `showFinal()` → oyun sonu; ders özeti + **akıllı disiplin kartı** (§7).
- `pickRound()` → 10 soru seçer; ilgi filtresine uyar; 6/10 ağırlık 2025+ olaylara.
- `apiCall()` → Vercel (`/api/lb`) mı Netlify (`/.netlify/functions/api`) mı otomatik seçer.

**İlgi filtresi:** `AREAS` (8 kategori: tech/endeks/kripto/emtia/stock/ipo/meme/tr), `interestOf(sc)`,
`getInterests`/`toggleInterest`/`setInterests`. Hiçbiri seçilmezse tüm havuz aktif.

**localStorage anahtarları (oyun):** `pk_best`, `pk_players_v1`, kayıt/oyuncu anahtarları, `pk_*`.

---

## 7. Disiplin Paneli Entegrasyonu

- **`showDiscipline(view)`** — `disiplin-paneli.html`'i **iframe** ile gömer (aynı origin →
  localStorage/nav sorunsuz). `view` verilirse `#view=<view>` hash'i ile o araçta açar.
  "⛶ Tam ekran aç" linki paneli yeni sekmede açar. Dar (tek-sütun) modda içeriği görünüme kaydırır.
- **`openDiscipline(view)`** — oyun içinden belirli aracı açar (iframe'i hash ile yeniden yükler).
- **Akıllı kanca (`showFinal` içinde):** oyuncunun risk davranışına göre kart:
  büyük/agresif kayıp (`roundRet≤-25` veya `aggroLoss≥2`) → `em-red-view`; hiç PAS yok
  (`trades≥9 && passes===0`) → `checklist-view`; yüksek kâr (`roundRet≥15`) → `em-yellow-view`;
  diğer → `simulation-view`.
- **`disiplin-paneli.html`:** kendi teması (Midas yeşil/amber) + Google Fonts. `init()` sonunda
  `#view=` hash okuyucusu var (oyun derin bağlantısı için). View id'leri: `home-view`,
  `em-red-view`, `em-yellow-view`, `checklist-view`, `position-size-view`, `routine-view`,
  `journal-view`, `stats-view`, `wizard-view`, `mindset-view`, `fear-guide-view`, `social-view`,
  `simulation-view`, `perception-view`, `glossary-view`, `buy-time-view`.
  Panel localStorage anahtarları: `streak`, `journal`, `perc` (oyunun `pk_*` anahtarlarıyla çakışmaz).
- **Not:** "İşlem Döngüsü" kartı eskiden var olmayan `islem-dongusu.html`'e gidiyordu → `checklist-view`'a yönlendirildi.

---

## 8. Deploy

- **GitHub:** `ysnblclr/piyasa-kasi` (public). Kullanıcı isteği: her değişikliği push et.
  Commit mesajları Türkçe; sonuna `Co-Authored-By: Claude ...` satırı.
- **Vercel:** GitHub push → **otomatik deploy**. `api/lb.mjs` + **Upstash Redis** (env:
  `KV_REST_API_URL`/`KV_REST_API_TOKEN` veya `UPSTASH_REDIS_REST_URL`/`_TOKEN`). Anahtar: `pk_players_v1`.
  API opları: `register`, `login`, `score`, `board`, `diag` (?op= ile).
- **Netlify:** `quiet-daffodil-1c8983.netlify.app` — kredi bitti ama **kod tutuluyor** (çift platform).
  `netlify/functions/api.mjs` + Netlify Blobs. Kullanıcı "her ikisini de tut" dedi — Netlify dosyalarını SİLME.
- **Deploy adımları:** `git add … && git commit && git push origin main`. Vercel gerisini halleder.

---

## 9. Yerel Çalıştırma / Test

- Statik dosya; sunucu şart değil ama fetch/iframe için sunucu iyi olur.
- Preview: Browser pane `preview_start {name:"piyasa-kasi"}` (`.claude/launch.json` → `npx http-server . -p 8080`).
- Alternatif: `python cors_server.py`.
- **Doğrulama:** oyunu oyna, 1 Gün vade seç, soru ekranında 5 madde + grafik, sonuç ekranında
  gerçek getiriler + skor doğru mu bak. Konsolda hata olmamalı.

---

## 10. Tuzaklar / Öğrenilenler

- **Stooq** captcha ile CLI'ı engelliyor → Yahoo Finance kullan.
- **Grafik boş kalırsa:** `renderCandles` içinde `setTimeout` kullan (rAF arka planda çalışmaz).
- **Windows git:** `LF will be replaced by CRLF` uyarısı zararsız.
- **Hikâye/gerçek uyuşmazlığı:** Bazı `story`/`pct` değerleri tarihsel olarak yanlıştı; gerçek veri
  bunları açığa çıkardı. `anchorIdx` + `storedPct` hizalaması tutarlılığı sağlıyor — yeni senaryolarda
  `SCEN`'deki `storedPct`'i hikâyenin gerçek yönüyle uyumlu ver.
- **Yeni senaryo eklerken sıra:** (1) data dosyasına `S(...)` ekle, (2) `PK_DETAILS`'e 2+ madde
  ekle, (3) `fetch-data.mjs` `SCEN`'e `[title, ticker, src, date, storedPct]` ekle, (4) `node tools/fetch-data.mjs`
  çalıştır, (5) index.html'de `?v=` artır, (6) oyunda test, (7) commit+push.

---

## 11. Değişiklik Günlüğü

> **Buraya her ajan kendi değişikliğini bir satırla ekler (en yeni üstte).**

- 2026-07-19 — CLAUDE.md oluşturuldu (bu dosya): tam mimari + kalıcı kurallar + hattı belgelendi.
- 2026-07-19 — Disiplin paneli oyuna entegre edildi: `showDiscipline` iframe gömme + `openDiscipline`
  derin bağlantı + `showFinal`'de risk-davranışına göre akıllı disiplin kartı; panele `#view=` hash okuyucusu.
- 2026-07-19 — Gerçek volatilite: `anchorIdx` storedPct-hizalı baz seçimi (bilanço off-by-one düzeldi) +
  frontend `VOL_FLOOR=%3` (effVade ileri kayar). |1g|≥%3 canlı senaryo 113→153; 223/225 senaryo ≥%3 fırsat sunar.
- 2026-07-19 — 232→225 senaryo gerçek veriyle eşlendi (SCEN 49→239); vade tarih doğrulaması;
  5 madde kuralı (make5 = ctx3 + PK_DETAILS2); realInfoBullets/ensure5 kaldırıldı.

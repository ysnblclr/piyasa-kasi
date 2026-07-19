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
  // === PK_A: Bilanço ===
  ["Nvidia bilançosu: yapay zekâ talebi ilk kez test ediliyor","NVDA","y","2023-05-24",24],
  ["Nvidia bilançosu: 'beklenti çok yüksek, karşılayamaz' deniyor","NVDA","y","2024-02-21",16],
  ["Nvidia bilançosu: rekor bekleniyor ama herkes içeride","NVDA","y","2024-08-28",-6],
  ["Nvidia bilançosu: üst üste üçüncü mucize beklentisi","NVDA","y","2023-11-21",-3],
  ["Nvidia bilançosu: kripto çöküşü sonrası stoklar soru işareti","NVDA","y","2018-11-15",-19],
  ["Meta (Facebook) bilançosu: TikTok gölgesinde","META","y","2022-02-02",-26],
  ["Meta bilançosu: metaverse'e milyarlar akarken","META","y","2022-10-26",-25],
  ["Meta bilançosu: herkes umudu kesmişken","META","y","2023-02-01",23],
  ["Meta bilançosu: bu kez yapay zekâ harcamaları masada","META","y","2024-04-24",-11],
  ["Netflix bilançosu: büyüme hikâyesi sorgulanıyor","NFLX","y","2022-04-19",-35],
  ["Netflix bilançosu: felaket bekleniyor","NFLX","y","2022-07-19",7],
  ["Netflix bilançosu: şifre paylaşımı hamlesi sonrası","NFLX","y","2024-01-23",11],
  ["Tesla bilançosu: 'iflas eder' koroları arasında","TSLA","y","2019-10-23",18],
  ["Tesla bilançosu: fiyat indirimleri marjları yedi mi?","TSLA","y","2024-01-24",-12],
  ["Tesla bilançosu: robotaxi hayali rakamlara karşı","TSLA","y","2024-07-23",-12],
  ["Apple bilançosu: dev ama durgun","AAPL","y","2024-08-01",1],
  ["Apple: Çin'den kötü sinyaller gelirken","AAPL","y","2019-01-02",-10],
  ["Amazon bilançosu: pandemi devinin normalleşme sınavı","AMZN","y","2022-04-28",-14],
  ["Amazon bilançosu: kötümserlik zirvedeyken","AMZN","y","2022-02-03",14],
  ["Amazon bilançosu: maliyet kesintileri meyve veriyor mu?","AMZN","y","2023-08-03",8],
  ["Google bilançosu: reklam pazarı soğurken","GOOGL","y","2022-10-25",-9],
  ["Google bilançosu: 'yapay zekâ Google'ı öldürür' tezine cevap","GOOGL","y","2023-07-25",6],
  ["Microsoft bilançosu: bulut yavaşlarken","MSFT","y","2023-01-24",-1],
  ["Microsoft bilançosu: yapay zekâ gelire dönüşüyor mu?","MSFT","y","2023-04-25",7],
  ["Intel bilançosu: 'artık dibi gördü' mü?","INTC","y","2024-08-01",-26],
  ["Micron bilançosu: HBM güçlü ama PC zayıf","MU","y","2024-12-18",-16],
  ["Micron bilançosu: bellek döngüsü dönüyor mu?","MU","y","2024-03-20",14],
  ["AMD: PC pazarı çökerken bilanço yaklaşıyor","AMD","y","2022-10-06",-14],
  ["Super Micro: yapay zekâ sunucusu talebi patlarken","SMCI","y","2024-01-29",36],
  ["Broadcom bilançosu: özel yapay zekâ çipleri (ASIC) hikâyesi","AVGO","y","2024-12-12",24],
  ["ARM bilançosu: halka arz sonrası ilk büyük sınav","ARM","y","2024-02-07",48],
  ["Palantir bilançosu: yapay zekâ platformu ticarileşiyor mu?","PLTR","y","2025-02-03",24],
  ["Snap bilançosu: dijital reklamın kanaryası","SNAP","y","2022-07-21",-39],
  ["PayPal bilançosu: pandemi yıldızının hedef sınavı","PYPL","y","2022-02-01",-25],
  ["Shopify bilançosu: e-ticaret normalleşmesi","SHOP","y","2022-05-05",-15],
  ["Zoom bilançosu: pandeminin tam ortasında","ZM","y","2020-08-31",41],
  ["Zoom bilançosu: aşı sonrası dünyada","ZM","y","2021-11-22",-15],
  ["DocuSign bilançosu: dijital imza kalıcı mı moda mıydı?","DOCU","y","2021-12-02",-42],
  ["Peloton bilançosu: evde spor devri sürüyor mu?","PTON","y","2021-11-04",-35],
  ["Disney bilançosu: Iger'ın maliyet operasyonu","DIS","y","2023-11-08",7],
  ["Uber bilançosu: nakit yakan şirketten nakit makinesine","UBER","y","2024-02-07",10],
  ["TSMC bilançosu: çip döngüsünün dibinden sinyal","TSM","y","2024-01-18",10],
  ["ASML bilançosu: litografi tekelinin sipariş defteri","ASML","y","2024-10-15",-16],
  ["Nokia bilançosu: telekom kışı sürerken","NOK","y","2024-07-18",-8],
  ["Walmart bilançosu: 'güvenli liman' testi","WMT","y","2022-05-17",-11],
  ["Nike bilançosu: marka devi yavaşlarken","NKE","y","2024-06-27",-20],
  ["FedEx: küresel ekonominin barometresi","FDX","y","2022-09-22",-21],
  ["Salesforce bilançosu: kurumsal yazılımda yapay zekâ belirsizliği","CRM","y","2024-05-29",-20],
  ["Adobe bilançosu: yapay zekâ dost mu düşman mı?","ADBE","y","2024-12-11",-14],
  ["Oracle bilançosu: eski devin bulut dönüşü","ORCL","y","2024-09-09",11],
  ["Snowflake bilançosu: yıldız CEO ve yavaşlayan büyüme","SNOW","y","2024-02-28",-20],
  ["CrowdStrike bilançosu: siber güvenlikte lider prim yapıyor","CRWD","y","2024-06-04",12],
  ["Costco bilançosu: istikrar makinesi","COST","y","2024-03-07",2],
  ["Coca-Cola bilançosu: savunma hissesinde olay günü","KO","y","2024-04-23",1],
  ["J&J bilançosu: ilaç devinde rutin gün","JNJ","y","2024-04-16",1],
  ["P&G bilançosu: temel tüketimde fiyat/hacim dengesi","PG","y","2024-01-23",-1],
  ["JPMorgan bilançosu: banka krizinin ortasında dev","JPM","y","2023-04-14",7],
  ["Dell bilançosu: yapay zekâ sunucu hikâyesinin bedeli","DELL","y","2024-05-30",-18],
  ["GameStop bilançosu: meme rallisi rakamla buluşuyor","GME","y","2021-03-23",-34],
  ["Alibaba bilançosu: parçalanma planı ve Çin riski","BABA","y","2023-11-16",-9],
  ["PDD bilançosu: Temu'nun sessiz devrimi","PDD","y","2023-08-28",15],
  ["Lululemon bilançosu: premium tüketici yorgun mu?","LULU","y","2024-03-21",-16],
  ["Starbucks bilançosu: trafik verisi alarm veriyor mu?","SBUX","y","2024-04-30",-16],
  ["Qualcomm bilançosu: telefon stok krizi","QCOM","y","2022-11-02",-8],
  ["Robinhood bilançosu: meme çılgınlığı sonrası ilk kış","HOOD","y","2022-01-27",-10],
  // === PK_A: FED & Makro ===
  ["FED faiz kararı: indirim fiyatlanmış, asıl konu 2025","^GSPC","y","2024-12-18",-3],
  ["Powell'ın Jackson Hole konuşması: piyasa güvercin umuyor","^GSPC","y","2022-08-26",-3.4],
  ["FED paniği: Pazar gecesi acil 100bp indirim","^GSPC","y","2020-03-16",-12],
  ["FED kararı: 'zirveden dönüş' sinyali gelir mi?","^GSPC","y","2023-12-13",5],
  ["FED kararı: 75bp kesin, metinde yumuşama aranıyor","^GSPC","y","2022-11-02",-2.5],
  ["FED kararı: sızıntıyla gelen 75bp","^GSPC","y","2022-06-15",1.5],
  ["ABD enflasyon (CPI) verisi: tepe döndü mü?","^NDX","y","2022-11-10",7.4],
  ["ABD CPI: piyasa bu kez soğuma bekliyor","^NDX","y","2022-09-13",-5.2],
  ["ABD CPI: zirve sonrası ilk gerçek soğuma?","^NDX","y","2022-07-13",2.9],
  ["ABD istihdam (NFP): 'yumuşak iniş' testi","^GSPC","y","2024-08-02",-2.4],
  ["ABD istihdam: ekonomi güçlü mü kalmalı?","^GSPC","y","2023-02-03",-1.3],
  ["ABD 10 yıllık tahvil faizi %5'e dayandı","^GSPC","y","2023-10-19",-3],
  ["Tahvil faizi tepeden dönüyor: ralli başlar mı?","^GSPC","y","2023-11-01",5],
  ["S&P, ABD'nin kredi notunu düşürdü (tarihte ilk)","^GSPC","y","2011-08-08",-6.7],
  ["Fitch, ABD'nin notunu düşürdü — 2011 tekrarı mı?","^GSPC","y","2023-08-02",-1.4],
  ["Taper Tantrum: FED tahvil alımını azaltmayı ima etti","^GSPC","y","2013-05-22",-4],
  ["Draghi: 'Euro'yu kurtarmak için ne gerekiyorsa'","^STOXX50E","y","2012-07-26",4],
  ["Japonya Merkez Bankası'ndan sürpriz: faiz bandı gevşetildi","^N225","y","2022-12-20",-2.5],
  ["2 trilyon dolarlık teşvik + sınırsız QE masada","^GSPC","y","2020-03-24",9.4],
  // === PK_A: Türkiye ===
  ["TCMB kararı: enflasyon %19'ken faiz indirimi konuşuluyor","USDTRY=X","y","2021-09-23",3],
  ["Dolar/TL 18'i aştı: hükümetten hamle bekleniyor","USDTRY=X","y","2021-12-20",-25],
  ["Yeni ekonomi yönetiminin ilk faiz kararı","USDTRY=X","y","2023-06-22",7],
  ["BIST: enflasyon %80, mevduat faizi %20","XU100.IS","y","2022-10-01",20],
  ["Şimşek atandı: bankalara 'rasyonel dönüş' rallisi gelir mi?","XU100.IS","y","2023-06-05",20],
  ["THY bilançosu: turizm rekoru kâra dönüşüyor mu?","THYAO.IS","y","2022-11-01",8],
  // === PK_B: Zirve Kırılımları ===
  ["Altın, 4 yıllık direnç olan tarihi zirveyi kırıyor","GC=F","y","2024-03-08",15],
  ["Altın yıl içinde 30. kez rekor kırıyor: hâlâ mı alım?","GC=F","y","2024-10-30",-5],
  ["Altın 1.900$: dergi kapaklarında 'altın çağı'","GC=F","y","2011-09-05",-15],
  ["Gümüş 4 yıllık direncini kırdı: altının gölgesinden çıkış","SI=F","y","2020-07-21",30],
  ["Bitcoin, 2017'nin efsane zirvesi 20.000$'ı kırıyor","BTC","b","2020-12-16",50],
  ["Bitcoin ETF parasıyla tarihi zirve 69k kırıldı","BTC","b","2024-03-05",-15],
  ["Bitcoin 77k: yeni zirve + kripto dostu yönetim","BTC","b","2024-11-07",30],
  ["Japonya, 34 YIL önceki zirvesini kırıyor","^N225","y","2024-02-22",10],
  ["S&P 500, 2 yıl sonra tarihi zirvesini kırdı — habersiz","^GSPC","y","2024-01-19",9],
  ["S&P 500, 2007 krizi zirvesini 6 yıl sonra kırdı","^GSPC","y","2013-03-28",8],
  ["S&P 500 tarihi zirvede: her şey mükemmel görünüyor","^GSPC","y","2020-02-19",-12],
  ["Nasdaq, COVID çöküşünden 3 ay sonra tarihi zirvede","^NDX","y","2020-06-08",15],
  ["Nasdaq, dot-com zirvesini 15 YIL sonra kırdı","^NDX","y","2015-04-23",6],
  ["Nvidia 1 trilyon dolar kulübüne giriyor","NVDA","y","2023-06-13",12],
  ["Apple, tarihin ilk 1 trilyon dolarlık şirketi oluyor","AAPL","y","2018-08-02",8],
  ["Tesla 1,2 trilyon dolar: Hertz siparişiyle yeni zirve","TSLA","y","2021-11-04",-25],
  ["Ethereum 4.800$: kripto coşkusunun zirvesi","ETH","b","2021-11-10",-40],
  ["Bakır tarihi zirveyi kırdı: 'yapay zekâ metali' anlatısı","HG=F","y","2024-05-20",-12],
  ["Kakao 46 yıllık zirvesini kırdı: arz krizi","CC=F","y","2024-01-18",80],
  ["Uranyum 12 yıllık zirvesini kırıyor: nükleer rönesans","CCJ","y","2023-09-18",30],
  ["Petrol 130$: savaş şokuyla 14 yıl zirvesi","BZ=F","y","2022-03-08",-25],
  ["Dolar endeksi 20 yılın zirvesinde: 'kral dolar'","DX-Y.NYB","y","2022-09-27",-8],
  ["DAX tarihi zirvede: resesyondaki ülkenin borsası","^GDAXI","y","2023-12-14",5],
  ["JPMorgan tarihî zirvede: bankalar da kırılım yapar","JPM","y","2024-03-20",8],
  // === PK_B: Sempati ===
  ["Nvidia dün akşam efsane bilanço açıkladı — sıra AMD'de mi?","AMD","y","2023-05-25",11],
  ["Nvidia +%25: sunucu ortağı Super Micro'da ne yaparsın?","SMCI","y","2023-05-25",25],
  ["Nvidia şoku: çipleri basan TSMC'de hareket ne kadar olur?","TSM","y","2023-05-25",6],
  ["Veri merkezi soğutma: Nvidia dalgasının gizli kazananı","VRT","y","2024-01-15",15],
  ["Nvidia yine şaşırttı: bellekçi Micron'a dalga gelir mi?","MU","y","2024-02-22",8],
  ["Walmart dün -%11 çöktü: yarın Target açıklıyor","TGT","y","2022-05-18",-25],
  ["GameStop uçtu: 'sıradaki AMC' deniyor","AMC","y","2021-01-27",50],
  ["Bitcoin ralli yapıyor: borsası Coinbase'de ne yaparsın?","COIN","y","2024-11-08",25],
  ["Boeing'in kapısı uçtu: parçayı üreten Spirit'te ne yaparsın?","SPR","y","2024-01-08",-11],
  ["DeepSeek şoku: Nvidia -%14 açılacak, ya Vertiv?","VRT","y","2025-01-27",-30],
  ["DeepSeek şoku: herkes satarken Apple'a ne olur?","AAPL","y","2025-01-27",3],
  ["Rakip Novo'nun ilaç denemesi hayal kırıklığı: Lilly'de ne yaparsın?","LLY","y","2024-12-20",1],
  ["LUNA/UST çöküyor: Bitcoin'e bulaşır mı?","BTC","b","2022-05-09",-15],
  ["FTX batıyor: FTX'in desteklediği Solana'da ne yaparsın?","SOL","b","2022-11-08",-40],
  ["Tesla tüm modellerde %20 indirim yaptı: Rivian'da ne yaparsın?","RIVN","y","2023-01-12",-8],
  ["Snap dün -%39 çöktü: Meta bilançosu 1 hafta sonra","META","y","2022-07-22",-7],
  // === PK_B: Şok Haberler ===
  ["DeepSeek şoku: Çin'den ucuz yapay zekâ iddiası","NVDA","y","2025-01-27",-17],
  ["Virüs İtalya'ya sıçradı: 'lokal salgın' tezi çöküyor","^GSPC","y","2020-02-24",-8],
  ["Pandemi paniği: her şey satılıyor, dip arayanlar var","^GSPC","y","2020-03-12",-9.5],
  ["Çöküşün 23. günü: FED 'sınırsız' dedi, Kongre paket geçiriyor","^GSPC","y","2020-03-24",9.4],
  ["Yen carry depremi: Tokyo'da panik açılışı bekleniyor","^N225","y","2024-08-05",-12.4],
  ["Tarihi çöküşün ertesi sabahı: enkazdan alım yapılır mı?","^N225","y","2024-08-06",10.2],
  ["Brexit sürprizi: İngiltere AB'den çıkıyor","^GSPC","y","2016-06-24",-3.6],
  ["Brexit paniğinin 3. günü: tepki gelir mi?","^GSPC","y","2016-06-27",5],
  ["ABD seçim gecesi: sürpriz sonuçla vadeliler -%5","^GSPC","y","2016-11-09",4],
  ["ABD seçimi net bitti: piyasa nasıl açılır?","^GSPC","y","2024-11-06",2.5],
  ["Seçimi Musk'ın desteklediği aday kazandı: Tesla'da ne yaparsın?","TSLA","y","2024-11-06",15],
  ["Rusya, Ukrayna'ya savaş başlattı: piyasa nasıl açılır?","^NDX","y","2022-02-24",3.4],
  ["'Kurtuluş Günü' tarifeleri: beklenenden çok daha sert","^GSPC","y","2025-04-03",-10],
  ["Tarife çöküşünün 5. günü: 'erteleme' söylentisi dolaşıyor","^GSPC","y","2025-04-09",9.5],
  ["Silicon Valley Bank çöktü: bölgesel bankalarda ne yaparsın?","KRE","y","2023-03-10",-16],
  ["Çin sürpriz devalüasyon yaptı: küresel piyasalar sarsılıyor","^GSPC","y","2015-08-11",-6],
  ["'Çin'in Lehman'ı': Evergrande iflasın eşiğinde","^GSPC","y","2021-09-20",2],
  ["GameStop %100 yükseldi: 'bu saçmalık, short açarım' düşüncesi","GME","y","2021-01-27",135],
  ["Dev borsa FTX çöküyor: Bitcoin'de ne yaparsın?","BTC","b","2022-11-08",-20],
  ["Çin, tarihin en büyük halka arzını son gün durdurdu","BABA","y","2020-11-03",-8],
  ["Çin, özel ders sektörünü 'kâr amaçsız' yapmayı planlıyor","TAL","y","2021-07-23",-70],
  ["Çin devlet medyası oyunlara 'ruhsal afyon' dedi","NTES","y","2021-08-03",-8],
  ["ABD'nin dev iklim yasası (IRA) geçmek üzere","FSLR","y","2022-08-07",12],
  ["Lyft bilançosunda inanılmaz rakam: marj 500bp artacak yazıyor","LYFT","y","2024-02-13",35],
  ["Boeing uçağının kapı paneli havada koptu: hisse nasıl açılır?","BA","y","2024-01-08",-8],
  ["Dünya çapında bilgisayarlar mavi ekran verdi — kaynak: CrowdStrike","CRWD","y","2024-07-19",-11],
  ["OPEC+ sürpriz üretim kesintisi açıkladı","CL=F","y","2023-04-03",6],
  ["Orta Doğu'da savaş patladı: altın güvenli liman mı?","GC=F","y","2023-10-09",8],
  ["Piyasalar çöküyor: altın da neden düşüyor?","GC=F","y","2020-03-16",-8],
  ["Noel arifesi katliamı: 3 aylık düşüş dibe vuruyor mu?","^GSPC","y","2018-12-24",8],
  ["Enflasyon yine beklenti üstü: piyasa -%2 açıldı, short kovalanır mı?","^GSPC","y","2022-10-13",2.6],
  // === PK_B: Halka Arz & Özel ===
  ["Tarihin en çok konuşulan halka arzı: Facebook","META","y","2012-05-18",-20],
  ["ARM halka arzı ilk gün +%25: şimdi mi binmeli?","ARM","y","2023-09-14",-15],
  ["Rivian 150 milyar dolar: Ford'dan değerli EV girişimi","RIVN","y","2021-11-10",-50],
  ["Snapchat halka arzı uçtu: partiye katılmalı mı?","SNAP","y","2017-03-02",-25],
  ["Uber: on yılın en ünlü halka arzı","UBER","y","2019-05-10",-8],
  ["Coinbase listeleniyor: kripto'nun 'meşruiyet günü'","COIN","y","2021-04-14",-25],
  ["Airbnb ilk gün ikiye katladı: hâlâ girilir mi?","ABNB","y","2020-12-10",-10],
  ["DoorDash arzı uçtu: pandemi kazananına geç mi kalındı?","DASH","y","2020-12-09",-15],
  ["Tesla bugün S&P 500'e giriyor: fonlar almak ZORUNDA","TSLA","y","2020-12-21",-8],
  ["SMCI, S&P 500'e alınacağı duyuruldu","SMCI","y","2024-03-01",10],
  ["Nvidia 10'a bölünüyor: 'ucuzlayan' hisseye talep patlar mı?","NVDA","y","2024-06-10",-13],
  ["Tesla 5'e bölünüyor: split rallisi efsanesi","TSLA","y","2020-08-31",-25],
  ["SanDisk, Western Digital'den ayrılıp ayrı listeleniyor","WDC","y","2025-02-03",-10],
  // === PK_B: Kripto ===
  ["Spot Bitcoin ETF'leri bugün onaylanıyor: 10 yıllık rüya","BTC","b","2024-01-10",-15],
  ["Ethereum 'Merge': tarihin en büyük blokzincir güncellemesi","ETH","b","2022-09-15",-15],
  ["Musk bu gece SNL'de: Dogecoin 'dünya tarihine geçecek'","DOGE","b","2021-05-08",-30],
  ["Bitcoin halving bugün: arz yarıya iniyor","BTC","b","2024-04-19",1],
  ["Çin, kripto madenciliğini tamamen yasaklıyor","BTC","b","2021-05-21",-25],
  ["Musk: 'Tesla artık BTC ile ödeme kabul etmeyecek'","BTC","b","2021-05-12",-12],
  ["Tesla, bilançosuna 1,5 milyar dolarlık Bitcoin aldı","BTC","b","2021-02-08",18],
  ["SEC, Ripple'a 'kayıtsız menkul kıymet' davası açıyor","XRP","b","2020-12-22",-50],
  ["Ripple davasında karar açıklanıyor","XRP","b","2023-07-13",70],
  ["MicroStrategy: BTC'nin 3 kat primli versiyonu","MSTR","y","2024-11-20",-30],
  // === PK_B: Emtia ===
  ["Petrol 1$ oldu: 'bedavaya petrol' fırsatı mı?","CL=F","y","2020-04-20",-50],
  ["Buğday limit-up serisinde: 'küresel gıda krizi' manşetleri","ZW=F","y","2022-03-07",-30],
  ["Reddit'in yeni hedefi gümüş: 'squeeze edelim'","SI=F","y","2021-02-01",-8],
  // === PK_B: Meme ===
  ["AMC 72$: 'maymun ordusu' kazandı mı?","AMC","y","2021-06-02",-40],
  ["3 yıl sonra: 'Roaring Kitty' tek tweet attı, GME +%70 açılıyor","GME","y","2024-05-13",-30],
  ["Kamyon girişimi Nikola'ya 'sahtecilik' raporu","NKLA","y","2020-09-10",-40],
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
      const todayTs = now;
      for(const [k,off] of Object.entries(HOR)){
        const ti=bi+off;
        const vadeEndTs = eventTs + off * DAY * (src==="b" ? 1 : 1.45);
        if(vadeEndTs > todayTs){ ret[k] = null; days[k] = null; continue; }
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

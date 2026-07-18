/* Piyasa Kası — Veri Dosyası 1: Konu rehberleri, dersler, senaryolar A (bilanço + makro/FED + Türkiye) */

window.PK_TOPICS = {
  bilanco: {
    title: "📊 Bilanço Dönemi",
    desc: "Şirketler üç ayda bir kâr/zarar açıklar. Hisse, açıklanan rakamlara değil, rakamların BEKLENTİYE göre durumuna ve gelecek çeyrek öngörüsüne (guidance) tepki verir.",
    points: [
      "Guidance (gelecek beklentisi), geçmiş rakamdan daha önemlidir.",
      "Beklentiyi karşılamak yetmez — piyasanın gizli çıtası (whisper number) vardır.",
      "Bilanço öncesi pozisyon almak yön kumarıdır; alınacaksa pozisyon küçük tutulur.",
      "Açıklama sonrası ilk dakikalar aşırı oynaktır; ilk tepki sık sık ters döner.",
      "Sektör liderinin bilançosu tüm sektöre sinyaldir."
    ]
  },
  fed: {
    title: "🏛️ FED ve Faiz Kararları",
    desc: "ABD Merkez Bankası'nın faiz kararları tüm dünya piyasalarını yönlendirir. Kararın kendisi çoğu zaman önceden fiyatlanmıştır; asıl hareket sürpriz detaylardan gelir.",
    points: [
      "%90+ ihtimalle beklenen karar fiyatın içindedir; sürpriz yaratan detay oynatır.",
      "Asıl hareket karar metninde değil, basın toplantısında gelir.",
      "Nokta grafiği (dot plot) = üyelerin gelecek faiz tahminleri; piyasa bunu okur.",
      "Faiz indirimi her zaman iyi değildir: acil indirim panik işaretidir.",
      "FED gününde ilk yarım saatteki hareket sık sık ters döner."
    ]
  },
  makro: {
    title: "📈 Makro Veriler (CPI, İstihdam)",
    desc: "Enflasyon (CPI) ve istihdam (NFP) verileri, merkez bankasının ne yapacağını belirlediği için piyasayı en çok oynatan takvim olaylarıdır.",
    points: [
      "Verinin kendisi değil, BEKLENTİDEN sapması fiyatı oynatır.",
      "Rejim önemli: sıkılaşma döneminde güçlü ekonomi verisi hisseler için KÖTÜ haberdir.",
      "Veri öncesi pozisyon kumardır — sonucu kimse bilemez.",
      "Tahvil faizleri hisselerin yerçekimidir; %5'e giden 10 yıllık, hisseleri baskılar.",
      "Aynı verinin etkisi ortama göre değişir; bağlam her şeydir."
    ]
  },
  zirve: {
    title: "⛰️ Zirve Kırılımı",
    desc: "Fiyatın tarihi veya dönemsel zirvesini yukarı kırması güçlü bir teknik sinyaldir: üstte 'zararda bekleyen' satıcı kalmaz. Ama her kırılım tutmaz.",
    points: [
      "Tarihi zirvenin üstünde direnç yoktur — kâr satışı yapacak zararda yatırımcı kalmaz.",
      "Kırılım için habere gerek yoktur; kırılımın kendisi sinyaldir.",
      "Hacim teyidi olmayan, yorgun ralli sonrası kırılımlar sık sık tuzaktır.",
      "Herkes aynı zirveyi konuşuyorsa (magazin kapağı), geç kalmış olabilirsin.",
      "Kırılım stratejisi de kaybeder — stop-loss bu yüzden vardır."
    ]
  },
  sempati: {
    title: "🔗 Sempati Hareketi",
    desc: "Bir hissedeki büyük haber, aynı temadaki/sektördeki diğer hisselere taşar. Lider uçarsa tedarikçileri ve rakipleri de taşınır; lider çakılırsa sektör bulaşır.",
    points: [
      "Lider hissedeki dev haber, aynı hikâyedeki hisselere taşar (pozitif veya negatif).",
      "En yüksek beta (en oynak) hisse, temadan en sert etkilenendir.",
      "Sempati rallisi kısa ömürlü olabilir — hikâye kendine ait değilse çıkış planla.",
      "Kriz tek şirkette kalmaz: 'bir hamamböceği asla tek değildir.'",
      "Rakibin kötü haberi otomatik olarak sana iyi haber değildir."
    ]
  },
  sok: {
    title: "⚡ Şok Haber ve Panik",
    desc: "Beklenmeyen haberler (pandemi, savaş, iflas, teknoloji şoku) piyasayı en sert oynatan olaylardır. Panik günlerinde hem en büyük kayıplar hem en büyük fırsatlar oluşur.",
    points: [
      "Hissenin ana yatırım hikâyesini sorgulatan haber, en tehlikeli haber türüdür.",
      "Panik satışının ertesi günü sık sık en sert tepki rallisi gelir.",
      "En büyük yükseliş günleri ayı piyasasının İÇİNDE yaşanır; tek güne bakıp dönüş ilan etme.",
      "Gerçek panikte her şey satılır — altın bile. Nakit kraldır.",
      "Her şokta kaybeden kadar kazanan da vardır; para nereye kaçıyor diye sor."
    ]
  },
  ipo: {
    title: "🔔 Halka Arz ve Özel Durumlar",
    desc: "Halka arzlar (IPO), endekse dahil olma, hisse bölünmesi ve spin-off'lar takvimi belli olaylardır — ve çoğu 'beklenen güzel olay gerçekleşince satış gelir' kuralına uyar.",
    points: [
      "Çok konuşulan IPO'larda ilk günler hype'lıdır; ilk bilançoları görmeden acele etme.",
      "Endekse dahil olma duyurusu alınır, gerçekleşme günü satılır.",
      "Hisse bölünmesi (split) şirkete değer katmaz; split hype'ı sık sık kısa vadeli tepedir.",
      "Dev, herkesin bildiği IPO çoğu zaman zaten fiyatlanmıştır.",
      "Spin-off ilk haftalarda endeks fonu satışıyla baskılanır."
    ]
  },
  kripto: {
    title: "₿ Kripto Piyasası",
    desc: "7/24 açık, yüksek volatiliteli ve haber+likidite güdümlü bir piyasa. Regülasyon kararları ve büyük kurumsal haberler en büyük fiyat sürücüleridir.",
    points: [
      "'Söylentiyi al, haberi sat' kripto'da en sık çalışan kuraldır (ETF, Merge, halving).",
      "Regülasyon riski altcoin'lerde ölümcüldür; tek davaya bağlı varlıkta pozisyon küçültülür.",
      "Bilinen takvim olayları (halving) günü trade edilmez; etkisi aylar sonra gelir.",
      "Kriz bulaşıcıdır: bir borsa/coin çökerse bağlantılı her şey satılır.",
      "Yapısal çöküşte (depeg) 'dip' yoktur."
    ]
  },
  emtia: {
    title: "🛢️ Emtia Piyasaları",
    desc: "Altın, petrol, gaz, tarım ürünleri... Emtialar arz-talep şoklarıyla hareket eder ve vadeli kontrat mekaniği hisse senedinden çok farklıdır.",
    points: [
      "Emtiada spot değil vadeli kontrat işlem görür; vade yapısını bilmeden 'ucuz' diye dokunma.",
      "Şok kaynaklı dikey spike'lar trend değildir; kriz zirvesinde emtia almak tepeyi almaktır.",
      "Arz krizi kaynaklı trendler (kakao, uranyum) sanılandan uzun sürer; erken short intihardır.",
      "Fiziki talep teyidi olmayan spekülatif rallliler hızlı söner.",
      "Emtia üreticisi hisseleri, emtianın kaldıraçlı versiyonu gibi davranır."
    ]
  },
  meme: {
    title: "🎢 Meme Hisseler ve Squeeze",
    desc: "Sosyal medya güdümlü, temelden kopuk hareket eden hisseler. Short squeeze'de fiyat, şirket değerinden bağımsız olarak shortçuları ezerek yükselir.",
    points: [
      "'Aşırı değerli' diye squeeze'deki hisseye short açılmaz — piyasa sen iflas edene kadar irrasyonel kalabilir.",
      "Squeeze yakıtı short oranıdır; yakıt bitince düşüş, çıkış kadar sert olur.",
      "Zirve sinyali: kurucular/içerdekiler satmaya başladığında hikâye bitmiştir.",
      "Meme rallisinde kazanan çoğunluk değil, erken girip erken çıkan azınlıktır.",
      "Hype rakamla test edilir: bilanço, hikâyeyi doğrulamazsa çöküş gelir."
    ]
  },
  tr: {
    title: "🇹🇷 Türkiye Piyasası",
    desc: "BIST, TL ve gram altın; enflasyon, TCMB politikası ve siyasi kararlarla şekillenir. Yüksek enflasyon ortamında 'nominal' ve 'reel' getiri ayrımı hayatidir.",
    points: [
      "Enflasyonun altında faiz (negatif reel faiz) para biriminden kaçışı hızlandırır.",
      "Negatif reel faizde hisse ve altın nominal koruma sağlar; getirinin reel olup olmadığını sorgula.",
      "Politika müdahaleleri (KKM gibi) en sert ters hareketleri yaratır; kalabalık tek yönlü pozisyonlar hedeftir.",
      "Gram altın çift motorludur: ons fiyatı + dolar/TL kuru.",
      "Politika değişimi sinyali (yeni ekonomi yönetimi) sektör bazında dev rallliler başlatabilir."
    ]
  },
  endeks: {
    title: "🌍 Endeksler ve Global Piyasa",
    desc: "S&P 500, Nasdaq, Nikkei, DAX... Endeksler tek hisse riskini değil, piyasanın genel yönünü ve risk iştahını yansıtır.",
    points: [
      "Endeksler tek şirket haberinden değil; makro, faiz ve risk iştahından hareket eder.",
      "Kaldıraçlı carry trade'ler çözülürken ilgisiz varlıklar bile birlikte satılır.",
      "'Yeni Lehman' manşetleri neredeyse hiçbir zaman yeni Lehman değildir.",
      "Volatilite üzerine kurulu yapısal ürünler (XIV gibi) tek günde sıfırlanabilir.",
      "Ayı piyasası dipleri en kötü haberlerin ortasında, kimse almak istemezken oluşur."
    ]
  }
};

window.PK_LESSONS = {
  guid:     "Bilançoda geçmiş rakam değil, <b>gelecek beklentisi (guidance)</b> fiyatı oynatır. 'Beklentiyi karşıladı ama çöktü' piyasanın klasik tuzağıdır.",
  fiyat:    "Beklenen haber gerçekleşince fiyat oynamaz; <b>fiyatlanmamış sürpriz</b> oynatır. Herkesin bildiği haber, fiyatın içindedir.",
  ucuz:     "<b>'Düştü, artık ucuz'</b> bir analiz değildir. Sorunlu varlık daha da ucuzlar — bıçak düşerken tutulmaz, saplanması beklenir.",
  zirve:    "<b>Tarihi zirvenin üstünde direnç yoktur</b> — kâr satışı yapacak 'zararda bekleyen' kalmaz. Güçlü temelle gelen kırılım çoğu zaman başlangıçtır.",
  semp:     "<b>Sempati hareketi</b> gerçektir: liderdeki dev haber aynı temaya taşar. Ama hikâye kendine ait değilse ralli kısa ömürlü olabilir — çıkışı planla.",
  veri:     "Veri öncesi pozisyon <b>kumara en yakın trade'dir</b>. Kazanmış olsan bile unutma: aynı bahsi 10 kez oynayan çoğu zaman kaybeder. Risk küçük tutulur ya da PAS geçilir.",
  hik:      "Bir varlığın <b>ana yatırım hikâyesini sorgulatan haber</b>, en tehlikeli haber türüdür. Zirve yakınında kötü haber çok sert çalışır.",
  panik:    "Panik satışının ertesi günü sık sık <b>en sert tepki rallisi</b> gelir. Ama düşen bıçağı tutmak yerine dönüş sinyali (dev hacim, tükenmiş satıcı) beklenir.",
  sat:      "<b>'Söylentiyi al, haberi sat.'</b> Herkesin beklediği güzel olay gerçekleştiği an, alacak kimse kalmamıştır — satış gelir.",
  sqz:      "Squeeze'deki hisseye 'aşırı değerli' diye <b>short açılmaz</b>. Piyasa, sen iflas edene kadar irrasyonel kalabilir.",
  ipo:      "Çok konuşulan <b>halka arzlarda ilk günler hype'lıdır</b>. Kilit açılmaları ve ilk gerçek bilançolar gelmeden acele etme.",
  jeo:      "<b>Jeopolitik şoklarda ilk panik</b> çoğu zaman satış fırsatı değildir; 'top sesleri arasında al' — ilk tepki sık sık ters döner.",
  acil:     "Plansız <b>acil müdahale (acil faiz indirimi)</b> güven değil korku verir: 'Merkez bankası bizim görmediğimiz neyi görüyor?'",
  yorgun:   "Uzun ralli sonrası gelen <b>yorgun kırılımlar</b> tutmayabilir. Hacim ve momentum teyidi olmayan kırılım sık sık tuzaktır.",
  bulas:    "Kriz tek kurumda kalmaz; aynı iş modeline sahip herkese <b>bulaşır</b>. 'Bir hamamböceği asla tek değildir.'",
  cita:     "Rakamlar rekor bile olsa <b>gizli çıta (whisper number)</b> aşılamazsa hisse düşer. Çıta, resmi beklenti değil, fiyatın içindeki umuttur.",
  rejim:    "Aynı veri farklı rejimde ters çalışır: <b>sıkılaşma döneminde güçlü ekonomi verisi hisseler için kötü haberdir</b> — 'iyi haber, kötü haberdir.'",
  nominal:  "Yüksek enflasyon + negatif reel faizde hisse ve altın <b>nominal koruma</b> sağlar. Getirinin enflasyondan arındırılmış (reel) hâlini sorgula.",
  vadeli:   "Emtiada spot değil <b>vadeli kontrat</b> alırsın. Depolama maliyeti ve vade yapısını bilmeden 'ucuz' diye dokunma — fiyat eksiye bile düşebilir.",
  spike:    "Şok kaynaklı <b>dikey fiyat spike'ları trend değildir</b>. Kriz zirvesinde emtia almak, genellikle tepeyi satın almaktır.",
  reg:      "<b>Regülasyon riski</b> hikâyeyi bir gecede bitirebilir. Tek karara/davaya bağlı varlıkta pozisyon küçük tutulur.",
  endeks:   "<b>Endekse dahil olma duyurusu alınır, gerçekleşme günü satılır.</b> Dahil olma günü, zorunlu alıcı talebinin son günüdür.",
  split:    "<b>Hisse bölünmesi (split) değer katmaz.</b> Split heyecanı çoğu zaman kısa vadeli tepe işaretidir.",
  pas:      "<b>PAS da bir pozisyondur.</b> Düşük volatiliteli varlıkta olay trade etmek masrafı bile çıkarmaz; en iyi trade bazen trade yapmamaktır.",
  olum:     "Yapısal çöküşte (depeg, iflas sarmalı) <b>'dip' yoktur</b>. Bu düşen bıçak değil, düşen kılıçtır — uzak dur.",
  pol:      "<b>Hükümet/politika müdahaleleri</b> piyasadaki en sert ters hareketleri yaratır. Aşırı kalabalık tek yönlü pozisyonlar her zaman hedeftir.",
  ayi:      "<b>En büyük yükseliş günleri ayı piyasasının içinde gelir.</b> Tek bir dev ralliye bakıp trend dönüşü ilan etme.",
  kazanan:  "Her şokta kaybeden kadar <b>kazanan</b> da vardır. Sermaye şoktan kaçarken nereye akıyor diye sor.",
  kalabalik:"<b>Herkesin bildiği ve bindiği trade</b> (magazin kapağı sinyali) sona yaklaşmıştır. Kalabalığın en rahat olduğu an, en riskli andır.",
  oper:     "Şirket dışı <b>operasyonel kazalar</b> (kesinti, kaza, hack) çoğu zaman telafi edilir. Hasar kalıcı mı geçici mi — asıl soru budur. Tekrarlayan sorun kalıcıdır.",
  trend:    "<b>Yüksek beklenti = otomatik düşüş değildir.</b> Gerçekten güçlü hikâye çıtayı da aşar. Short için 'pahalı' yetmez; katalizör gerekir.",
  donus:    "Herkesin nefret ettiği varlıkta <b>küçük bir olumlu değişim dev ralli başlatır</b>. Dip, kötü haberlerin tamamen fiyatlandığı yerdir.",
  gorece:   "Piyasa mutlak değil <b>göreli</b> çalışır: felaket beklentisine 'daha az kötü' sonuç bile ralli yaptırır.",
  basin:    "FED gününde asıl hareket kararda değil, <b>basın toplantısında</b> gelir. İlk yarım saatteki hareket sık sık ters döner.",
  faiz:     "<b>Tahvil faizi hisselerin yerçekimidir.</b> Faiz hızla yükselirken değerlemesi yüksek hisseler baskılanır; faiz tepe yapınca ralli gelir.",
  baglam:   "Aynı haberin etkisi <b>ortama bağlıdır</b>: 2011'de -%7 yaptıran not indirimi 2023'te -%1 yaptı. Bağlam her şeydir.",
  reel:     "Enflasyonun altında faiz = <b>negatif reel faiz</b> = paradan kaçış. Merkez bankası adımlarını nominal değil reel faizle oku.",
  algo:     "Haber akışının <b>ilk saniyeleri algoritmalarındır</b> ve metindeki tek kelime (hatta yazım hatası) %50 oynatabilir. İlk tepkiye atlama.",
  stop:     "<b>Hiçbir sinyal %100 değildir</b> — en güçlü kurulum bile kaybedebilir. Stop-loss ve pozisyon boyutu bu yüzden stratejinin parçasıdır.",
  arz:      "<b>Arz krizi kaynaklı emtia trendleri</b> sanılandan çok daha uzun sürer. 'Çok yükseldi' diye erken short almak intihardır.",
  rakip:    "<b>Rakibin kötü haberi otomatik olarak sana iyi haber değildir</b>; bazen tüm sektörün hikâyesini sorgulatır. Tepkiyi bekle.",
  carry:    "<b>Ucuz fonlama (carry) trade'leri çözülürken</b> ilgisiz varlıklar bile birlikte satılır. Kaldıraç zinciri, şokta tek varlık gibi davranır.",
  lehman:   "<b>'Yeni Lehman' manşetleri</b> neredeyse hiçbir zaman yeni Lehman değildir. Gerçek krizler manşetten önce fiyatta görünür.",
  spin:     "<b>Spin-off hisseleri ilk haftalarda</b> endeks fonlarının zorunlu satışıyla baskılanır; asıl fırsat toz dindikten sonra doğar."
};

function S(name, cat, t, date, title, ctx, from, to, pct, story, les, vade) {
  return { name, cat, t, date, title, ctx, from, to, pct, story, les, vade };
}

/* ============ SENARYOLAR A: BİLANÇOLAR ============ */
window.PK_A = [
S("Nvidia","Bilanço","bilanco","Mayıs 2023 · Bilanço kapanıştan sonra","Nvidia bilançosu: yapay zekâ talebi ilk kez test ediliyor",["ChatGPT patlamasıyla yapay zekâ çip talebi konuşuluyor ama henüz rakamlara yansımadı.","Hisse yıl başından beri güçlü, beklentiler yükseldi.","Veri merkezi gelirleri kilit metrik."],270,306,24,"Nvidia, tarihin en büyük guidance yükseltmelerinden birini açıkladı: gelecek çeyrek geliri beklentinin %50 üstü. Hisse %24 fırladı.","guid"),
S("Nvidia","Bilanço","bilanco","Şubat 2024 · Bilanço kapanıştan sonra","Nvidia bilançosu: 'beklenti çok yüksek, karşılayamaz' deniyor",["Hisse bir yılda 3'e katladı; 'balon' tartışması gündemde.","Analistler üst üste hedef yükseltiyor; çıta çok yüksek.","Veri merkezi talebi hâlâ arzın üstünde."],680,726,16,"Rakamlar o yüksek çıtayı bile ezdi: gelir beklentinin %8 üstü, guidance yine güçlü. Hisse %16 daha yükseldi.","trend"),
S("Nvidia","Bilanço","bilanco","Ağustos 2024 · Bilanço kapanıştan sonra","Nvidia bilançosu: rekor bekleniyor ama herkes içeride",["Hisse tüm zamanların zirvesine yakın; fonların en kalabalık pozisyonu.","Rakamların rekor gelmesi kesin gibi; soru 'ne kadar rekor' olduğu.","Blackwell çipinde gecikme söylentileri var."],103,126,-6,"Rakamlar rekordu ve beklentiyi aştı — ama piyasanın gizli çıtasını aşamadı. Hisse %6 düştü.","cita"),
S("Nvidia","Bilanço","bilanco","Kasım 2023 · Bilanço kapanıştan sonra","Nvidia bilançosu: üst üste üçüncü mucize beklentisi",["Önceki iki bilançoda hisse %24 ve %6 yükseldi.","Hisse yıl içinde %240 yukarıda, herkes olumlu.","Çin'e çip kısıtlamaları yeni risk."],420,499,-3,"Rakamlar yine mükemmeldi ama artık kimseyi şaşırtmadı; Çin riski bahane oldu, hisse %3 geriledi. Mükemmellik fiyatın içindeydi.","fiyat"),
S("Nvidia","Bilanço","bilanco","Kasım 2018 · Bilanço kapanıştan sonra","Nvidia bilançosu: kripto çöküşü sonrası stoklar soru işareti",["Kripto madenciliği çöktü; ikinci el GPU'lar piyasaya dönüyor.","Yönetim 'stok sorunu kısa sürer' diyor.","Hisse zirveden %30 gerilemiş, 'ucuzladı' diyenler var."],200,164,-19,"Stok sorunu itiraftan büyüktü: guidance çöktü, hisse %19 daha eridi. 'Ucuzladı' diyenler bıçağı tuttu.","ucuz"),
S("Meta","Bilanço","bilanco","Şubat 2022 · Bilanço kapanıştan sonra","Meta (Facebook) bilançosu: TikTok gölgesinde",["Günlük kullanıcı sayısı ilk kez düşebilir söylentisi var.","Apple'ın gizlilik değişikliği reklam gelirini vuruyor.","Hisse zirveye yakın, değerleme makul görünüyor."],323,320,-26,"Tarihte ilk kez kullanıcı sayısı düştü. Hisse tek günde %26 çakıldı — 230 milyar dolar buhar oldu.","hik"),
S("Meta","Bilanço","bilanco","Ekim 2022 · Bilanço kapanıştan sonra","Meta bilançosu: metaverse'e milyarlar akarken",["Zuckerberg metaverse'e yılda 10+ milyar dolar harcıyor; yatırımcılar rahatsız.","Hisse yıl içinde %60 düşmüş durumda; 'artık çok ucuz' deniyor.","Reklam pazarı da zayıf."],135,130,-25,"Harcama planı daha da büyüdü, disiplin sinyali gelmedi. 'Ucuz' hisse %25 daha düştü.","ucuz"),
S("Meta","Bilanço","bilanco","Şubat 2023 · Bilanço kapanıştan sonra","Meta bilançosu: herkes umudu kesmişken",["Hisse zirveden %70 düşmüş; medya 'Meta bitti' diyor.","Zuckerberg son konuşmalarında 'verimlilik yılı'ndan bahsetti.","Dev hisse geri alım programı söylentisi var."],130,153,23,"'Verimlilik yılı' ilan edildi: maliyet kesintisi + 40 milyar dolarlık geri alım. Hisse %23 fırladı ve yıl boyu üçe katlandı.","donus"),
S("Meta","Bilanço","bilanco","Nisan 2024 · Bilanço kapanıştan sonra","Meta bilançosu: bu kez yapay zekâ harcamaları masada",["Meta toparlandı, hisse tarihi zirvede.","Rakamların iyi gelmesi bekleniyor.","Soru: yapay zekâ altyapısına ne kadar harcayacak?"],440,495,-11,"Rakamlar iyiydi ama 'yapay zekâ harcamalarını ciddi artıracağız' guidance'ı 2022 travmasını hatırlattı: %11 düşüş.","guid"),
S("Netflix","Bilanço","bilanco","Nisan 2022 · Bilanço kapanıştan sonra","Netflix bilançosu: büyüme hikâyesi sorgulanıyor",["Pandemi bitti; 'abone büyümesi yavaşlar mı' korkusu var.","Rusya'dan çıkış abone sayısını etkileyecek.","Hisse zirveden %40 düşmüş; 'ucuzladı' görüşü yaygın."],390,348,-35,"10 yıl sonra ilk kez abone KAYBI açıklandı. Büyüme hikâyesi bitti algısı hisseyi %35 çökertti.","hik"),
S("Netflix","Bilanço","bilanco","Temmuz 2022 · Bilanço kapanıştan sonra","Netflix bilançosu: felaket bekleniyor",["Geçen çeyrek abone kaybıyla hisse %35 çakılmıştı.","Bu çeyrek 2 milyon abone kaybı bekleniyor — beklenti dibe vurmuş.","Reklamlı paket planı açıklandı."],180,201,7,"Kayıp 'sadece' 970 bin geldi — felaket beklentisinden iyi. Hisse %7 yükseldi: piyasa mutlak değil, göreli çalışır.","gorece"),
S("Netflix","Bilanço","bilanco","Ocak 2024 · Bilanço kapanıştan sonra","Netflix bilançosu: şifre paylaşımı hamlesi sonrası",["Şifre paylaşımına kısıtlama getirildi; etkisi bu rakamlarda görülecek.","Reklamlı paket ivme kazanıyor.","Hisse toparlanma trendinde."],450,483,11,"Şifre hamlesi tuttu: 13 milyon yeni abone — beklentinin iki katı. Hisse %11 yükseldi.","trend"),
S("Tesla","Bilanço","bilanco","Ekim 2019 · Bilanço kapanıştan sonra","Tesla bilançosu: 'iflas eder' koroları arasında",["Wall Street'in yarısı Tesla'nın nakit yakıp iflas edeceğini düşünüyor.","Short pozisyonlar rekor seviyede.","Model 3 üretimi hızlanıyor sinyalleri var."],240,255,18,"Sürpriz kâr açıklandı. Shortçular kapanmak zorunda kaldı; hisse %18 fırladı ve tarihi ralli başladı.","donus"),
S("Tesla","Bilanço","bilanco","Ocak 2024 · Bilanço kapanıştan sonra","Tesla bilançosu: fiyat indirimleri marjları yedi mi?",["Tesla yıl boyu araç fiyatlarını indirdi; marj endişesi büyük.","Rekabet (BYD) hızla artıyor.","Musk'tan büyüme hedefi bekleniyor."],248,209,-12,"Marjlar daraldı ve yönetim 2024 için net hedef VERMEDİ. Guidance yokluğu da kötü guidance'tır: %12 düşüş.","guid"),
S("Tesla","Bilanço","bilanco","Temmuz 2024 · Bilanço kapanıştan sonra","Tesla bilançosu: robotaxi hayali rakamlara karşı",["Hisse robotaxi beklentisiyle rallide.","Otomotiv marjları baskı altında.","Robotaxi tanıtımının ertelendiği söylentisi var."],262,248,-12,"Marjlar zayıf geldi, robotaxi tanıtımı ertelendi. Hayal ile rakam çarpışınca rakam kazandı: %12 düşüş.","cita"),
S("Apple","Bilanço","bilanco","Ağustos 2024 · Bilanço kapanıştan sonra","Apple bilançosu: dev ama durgun",["iPhone satışları yatay; büyük sürpriz beklenmiyor.","Hisse tüm zamanların zirvesine yakın.","Buffett'ın hisse azalttığı haberi ayrı gündem."],218,220,1,"Rakamlar beklendiği gibi geldi; hisse %1 oynadı. Dev ve durgun şirkette bilanço günü kumarına değmezdi.","pas"),
S("Apple","Bilanço","bilanco","Ocak 2019 · Bilanço öncesi hafta","Apple: Çin'den kötü sinyaller gelirken",["Çin ekonomisi yavaşlıyor; iPhone talebi zayıf söylentileri var.","Apple nadiren gelir uyarısı yapar — ama tedarikçileri üst üste uyarı verdi.","Hisse zirveden %30 gerilemiş durumda."],157,148,-10,"Apple 16 yıl sonra ilk gelir uyarısını yayınladı: Çin talebi çökmüştü. Hisse %10 düştü. Tedarikçi uyarıları sinyaldi.","hik"),
S("Amazon","Bilanço","bilanco","Nisan 2022 · Bilanço kapanıştan sonra","Amazon bilançosu: pandemi devinin normalleşme sınavı",["Pandemide kapasite ikiye katlandı; şimdi talep normalleşiyor.","Maliyet enflasyonu (yakıt, ücret) baskı yapıyor.","Rivian yatırımı zarara döndü."],3390,2890,-14,"7 yıl sonra ilk çeyrek zararı + zayıf guidance. Aşırı kapasite itirafı hisseyi %14 düşürdü.","guid"),
S("Amazon","Bilanço","bilanco","Şubat 2022 · Bilanço kapanıştan sonra","Amazon bilançosu: kötümserlik zirvedeyken",["Bir gün önce Meta %26 çakıldı; tüm teknolojiye satış geldi.","Amazon'dan da kötü rakam bekleniyor.","AWS (bulut) hâlâ kârlılık motoru."],3000,2780,14,"AWS beklentiyi ezdi, Prime zammı açıklandı. Meta korkusuyla dibe atılan hisse %14 fırladı.","gorece"),
S("Amazon","Bilanço","bilanco","Ağustos 2023 · Bilanço kapanıştan sonra","Amazon bilançosu: maliyet kesintileri meyve veriyor mu?",["Bir yıldır agresif maliyet kesintisi yapılıyor.","AWS büyümesi yavaşlamıştı; stabilizasyon aranıyor.","Hisse toparlanma trendinde."],128,134,8,"Marjlar beklentiyi ezdi, AWS stabilize oldu. Verimlilik hikâyesi rakamla doğrulandı: +%8.","trend"),
S("Alphabet (Google)","Bilanço","bilanco","Ekim 2022 · Bilanço kapanıştan sonra","Google bilançosu: reklam pazarı soğurken",["Dijital reklam pazarında yavaşlama sinyalleri var (Snap çökmüştü).","YouTube gelirleri ilk kez düşebilir.","Hisse yıl içinde %30 düşmüş."],104,100,-9,"Reklam yavaşlaması teyit oldu, YouTube geliri düştü. Sektör sinyalini (Snap) ciddiye alanlar kazandı: -%9.","semp"),
S("Alphabet (Google)","Bilanço","bilanco","Temmuz 2023 · Bilanço kapanıştan sonra","Google bilançosu: 'yapay zekâ Google'ı öldürür' tezine cevap",["ChatGPT'nin arama motorunu bitireceği konuşuluyor.","Reklam pazarında toparlanma sinyalleri var.","Bulut birimi kârlılığa yeni geçti."],118,122,6,"Arama geliri güçlü toparlandı; 'Google bitti' tezi rakamla çürüdü. +%6.","donus"),
S("Microsoft","Bilanço","bilanco","Ocak 2023 · Bilanço kapanıştan sonra","Microsoft bilançosu: bulut yavaşlarken",["Azure büyümesi yavaşlıyor; kurumsal harcamalar kısılıyor.","OpenAI ortaklığı yeni açıklandı ama gelire yansıması yok.","Piyasa zaten kötümser."],240,242,-1,"Rakamlar vasat, tepki de vasattı: %1 oynama. Dev şirkette sürpriz yoksa hareket de yok.","pas"),
S("Microsoft","Bilanço","bilanco","Nisan 2023 · Bilanço kapanıştan sonra","Microsoft bilançosu: yapay zekâ gelire dönüşüyor mu?",["Copilot ve OpenAI entegrasyonları duyuruldu.","Soru: yapay zekâ hikâyesi Azure rakamlarına yansıdı mı?","Hisse yıl başından beri güçlü."],275,288,7,"Azure beklentiyi aştı ve yönetim 'yapay zekâ talebi şimdiden ölçülüyor' dedi. Hikâye rakama dönüştü: +%7.","trend"),
S("Intel","Bilanço","bilanco","Ağustos 2024 · Bilanço kapanıştan sonra","Intel bilançosu: 'artık dibi gördü' mü?",["Hisse yıl başından beri %40 düşmüş; 'ucuz' görünüyor.","Fabrika (foundry) hamlesi milyarlarca dolar yakıyor.","Bazıları 'tüm kötü haber fiyatlandı' diyor."],44,29,-26,"Temettü askıya alındı, 15.000 kişi işten çıkarıldı, guidance zayıf. Hisse %26 çöktü — 50 yılın en kötü günü.","ucuz"),
S("Micron","Bilanço","bilanco","Aralık 2024 · Bilanço kapanıştan sonra","Micron bilançosu: HBM güçlü ama PC zayıf",["Yapay zekâ belleği (HBM) talebi çok güçlü.","PC ve telefon talebi zayıf seyrediyor.","Analistler beklentilerin karşılanacağını düşünüyor."],140,104,-16,"Rakamlar beklentiyi karşıladı ama gelecek çeyrek guidance'ı çok zayıftı. Hisse %16 çakıldı.","guid"),
S("Micron","Bilanço","bilanco","Mart 2024 · Bilanço kapanıştan sonra","Micron bilançosu: bellek döngüsü dönüyor mu?",["Bellek fiyatları dipten dönüyor; HBM kapasitesi 2024 için tükendi deniyor.","Hisse yükselişte ama sektöre şüphe var.","Zarardan kâra geçiş bekleniyor."],80,95,14,"Beklenenden erken kâra geçti; HBM'de 'kapasite 2025'e kadar satıldı' dendi. +%14.","trend"),
S("AMD","Bilanço","bilanco","Ekim 2022 · Bilanço öncesi","AMD: PC pazarı çökerken bilanço yaklaşıyor",["PC satışları tarihi hızda düşüyor.","Intel'den art arda kötü sinyaller geldi.","AMD 'farklı, veri merkezi taşır' görüşü var."],68,60,-14,"AMD ön uyarı yayınladı: PC segmenti çöktü. Sektör sinyali (Intel) buraya da bulaştı: -%14.","bulas"),
S("Super Micro","Bilanço","bilanco","Ocak 2024 · Ön duyuru","Super Micro: yapay zekâ sunucusu talebi patlarken",["Nvidia rallisinin 'kaldıraçlı' oyunu olarak görülüyor.","Hisse kısa sürede ikiye katlandı; 'artık pahalı' deniyor.","Şirket ön guidance yükseltme duyurusu yapabilir söylentisi var."],300,420,36,"Guidance neredeyse ikiye katlandı. 'Pahalı' hisse bir günde %36 daha yükseldi. Güçlü temada 'pahalı' short sebebi değildir.","trend"),
S("Broadcom","Bilanço","bilanco","Aralık 2024 · Bilanço kapanıştan sonra","Broadcom bilançosu: özel yapay zekâ çipleri (ASIC) hikâyesi",["Dev teknoloji şirketleri kendi yapay zekâ çiplerini tasarlıyor; Broadcom ana ortak.","Yönetimden uzun vadeli yapay zekâ hedefi bekleniyor.","Hisse zirveye yakın."],162,180,24,"CEO '2027'de yapay zekâ pazarımız 60-90 milyar dolar' dedi. Hisse %24 fırlayıp 1 trilyon dolar kulübüne girdi.","guid"),
S("ARM","Bilanço","bilanco","Şubat 2024 · Bilanço kapanıştan sonra","ARM bilançosu: halka arz sonrası ilk büyük sınav",["Halka arzdan beri hisse yatay; şüphe hâkim.","Telefon pazarı zayıf ama yapay zekâ lisanslama hikâyesi var.","Float (dolaşımdaki hisse) çok az — hareketler sert olabilir."],68,77,48,"Yapay zekâ lisans gelirleri patladı; az float sert harekete çevirdi: tek günde +%48.","trend"),
S("Palantir","Bilanço","bilanco","Şubat 2025 · Bilanço kapanıştan sonra","Palantir bilançosu: yapay zekâ platformu ticarileşiyor mu?",["ABD ticari segment büyümesi kilit metrik.","Hisse bir yılda 4'e katlandı; değerleme tartışmalı.","Devlet kontratları güçlü seyrediyor."],75,83,24,"ABD ticari gelir +%64 geldi, guidance güçlü. Değerleme eleştirisi yine katalizöre yenildi: +%24.","trend"),
S("Snap","Bilanço","bilanco","Temmuz 2022 · Bilanço kapanıştan sonra","Snap bilançosu: dijital reklamın kanaryası",["Apple gizlilik değişikliği küçük reklam platformlarını vuruyor.","Makro yavaşlamada ilk kesilen bütçe reklamdır.","Hisse zaten zirveden %70 düşmüş."],16.5,16,-39,"Gelir guidance'ı verilemedi bile. Hisse %39 çöktü — ve tüm reklam sektörüne (Meta, Google) satış bulaştı.","hik"),
S("PayPal","Bilanço","bilanco","Şubat 2022 · Bilanço kapanıştan sonra","PayPal bilançosu: pandemi yıldızının hedef sınavı",["Yönetimin '750 milyon kullanıcı' hedefi vardı.","E-ticaret normalleşiyor; rakip baskısı artıyor.","Hisse zirveden %40 düşmüş; 'ucuz' deniyor."],176,175,-25,"Kullanıcı hedefi resmen terk edildi. Hikâyenin direği kırılınca %25 daha düştü.","hik"),
S("Shopify","Bilanço","bilanco","Mayıs 2022 · Bilanço kapanıştan sonra","Shopify bilançosu: e-ticaret normalleşmesi",["Pandemi döneminde hisse 10'a katlanmıştı.","Mağazalar açıldı; online büyüme yavaşlıyor.","Lojistik yatırımları marjları yiyor."],450,404,-15,"Büyüme sert yavaşladı, pandemi çarpanı geri verildi: -%15. Olağanüstü dönem rakamları kalıcı sanılmamalı.","hik"),
S("Zoom","Bilanço","bilanco","Ağustos 2020 · Bilanço kapanıştan sonra","Zoom bilançosu: pandeminin tam ortasında",["Dünya evden çalışıyor; 'Zoom' fiil oldu.","Beklentiler zaten uçmuş durumda; 'fiyatlandı' diyenler var.","Hisse yıl başından beri 3 kat yukarıda."],290,325,41,"Gelir yıllık +%355 geldi — beklentinin de katbekat üstü. Mega-trendin ortasında 'fiyatlandı' demek için erkendi: +%41.","trend"),
S("Zoom","Bilanço","bilanco","Kasım 2021 · Bilanço kapanıştan sonra","Zoom bilançosu: aşı sonrası dünyada",["Ofisler açılıyor; büyüme normalleşiyor.","Hisse zirveden %50 düşmüş; 'hâlâ büyüyor ama' deniyor.","Kurumsal segment tek umut."],260,242,-15,"Büyüme %35'e yavaşladı (bir yıl önce %355'ti). Pandemi hikâyesi bitmişti: -%15.","hik"),
S("DocuSign","Bilanço","bilanco","Aralık 2021 · Bilanço kapanıştan sonra","DocuSign bilançosu: dijital imza kalıcı mı moda mıydı?",["Pandemide herkes dijital imzaya geçti; hisse 3 kat yükseldi.","Yönetim 'talep normalleşiyor' sinyali verdi geçen çeyrek.","Hisse hâlâ yüksek çarpanlarda."],233,230,-42,"Fatura (billings) guidance'ı çöktü: pandemi talebi öne çekilmişti. Tek günde -%42.","guid"),
S("Peloton","Bilanço","bilanco","Kasım 2021 · Bilanço kapanıştan sonra","Peloton bilançosu: evde spor devri sürüyor mu?",["Salonlar açıldı; evde spor bisikleti talebi soru işareti.","Hisse zirveden %60 düşmüş; 'dip avcıları' toplanıyor.","Yönetim geçen çeyrek iyimserdi."],92,86,-35,"Talep çöktü, guidance yarıya kesildi. 'Dip' sanılan yer uçurumun kenarıydı: -%35.","ucuz"),
S("Disney","Bilanço","bilanco","Kasım 2023 · Bilanço kapanıştan sonra","Disney bilançosu: Iger'ın maliyet operasyonu",["Bob Iger geri döndü; agresif maliyet kesintisi sözü verdi.","Streaming zararları kilit metrik.","Aktivist yatırımcı baskısı var."],84,91,7,"Kesintiler hedefin üstünde, streaming zararı yarıya indi. Yeni yönetim hikâyesi rakamla desteklendi: +%7.","donus"),
S("Uber","Bilanço","bilanco","Şubat 2024 · Bilanço kapanıştan sonra","Uber bilançosu: nakit yakan şirketten nakit makinesine",["Uber ilk kez tam yıl kârı açıkladı; kültür değişimi konuşuluyor.","İlk hisse geri alım programı bekleniyor.","Hisse zirveye yakın."],63,70,10,"7 milyar dolarlık ilk geri alım programı açıklandı. 'Büyümeden kârlılığa' dönüşüm taçlandı: +%10.","trend"),
S("TSMC","Bilanço","bilanco","Ocak 2024 · Bilanço","TSMC bilançosu: çip döngüsünün dibinden sinyal",["Dünyanın en büyük çip üreticisi; herkesin (Nvidia dahil) fabrikası.","Telefon çipleri zayıf ama yapay zekâ siparişleri artıyor.","2024 büyüme guidance'ı kritik."],95,105,10,"'2024'te %20+ büyüme, yapay zekâ talebi çok güçlü' guidance'ı geldi. Tüm çip sektörü birlikte ralli yaptı: +%10.","guid"),
S("ASML","Bilanço","bilanco","Ekim 2024 · Bilanço (erken sızdı)","ASML bilançosu: litografi tekelinin sipariş defteri",["Çip makinelerinde dünya tekeli; sipariş rakamı sektörün ham göstergesi.","Çin'e ihracat kısıtlamaları belirsizlik yaratıyor.","Yapay zekâ dışı talep (telefon, PC) zayıf."],830,750,-16,"Siparişler beklentinin yarısı geldi (rapor bir gün erken sızdı). Hisse %16 çöktü ve tüm çip sektörünü aşağı çekti.","guid"),
S("Nokia","Bilanço","bilanco","Temmuz 2024 · Bilanço","Nokia bilançosu: telekom kışı sürerken",["Operatörler 5G yatırımlarını kısıyor.","Hisse yıllardır ucuz; 'değer tuzağı mı' tartışılıyor.","Kuzey Amerika pazarı zayıf."],3.6,3.4,-8,"Gelir yine düştü; 'ucuz' hisse daha da ucuzladı. Katalizörsüz ucuzluk bir tez değildir: -%8.","ucuz"),
S("Walmart","Bilanço","bilanco","Mayıs 2022 · Bilanço","Walmart bilançosu: 'güvenli liman' testi",["Enflasyon döneminde 'tüketici Walmart'a kaçar' tezi popüler.","Yakıt ve stok maliyetleri artıyor.","Savunmacı hisse olarak zirveye yakın."],150,148,-11,"Maliyetler marjı ezdi: 35 yılın en kötü günü (-%11). Savunmacı hisse demek risksiz demek değildir.","cita"),
S("Nike","Bilanço","bilanco","Haziran 2024 · Bilanço kapanıştan sonra","Nike bilançosu: marka devi yavaşlarken",["Çin talebi zayıf, ABD'de rakip markalar (Hoka, On) pay çalıyor.","Hisse zaten zirveden %30 aşağıda.","Yönetim değişikliği söylentileri var."],94,94,-20,"2025 gelir guidance'ı kesildi. Marka ne kadar güçlü olursa olsun guidance konuşur: -%20.","guid"),
S("FedEx","Bilanço","bilanco","Eylül 2022 · Ön uyarı","FedEx: küresel ekonominin barometresi",["FedEx guidance'ını çekebileceği söylentisi var — bu küresel talep sinyali olur.","Avrupa ve Asya hacimleri zayıflıyor.","Hisse yıl içinde %25 düşmüş."],205,204,-21,"Guidance tamamen geri çekildi: 'küresel hacimler çöküyor.' Hisse -%21; tüm piyasa resesyon sinyali olarak okudu.","hik"),
S("Salesforce","Bilanço","bilanco","Mayıs 2024 · Bilanço kapanıştan sonra","Salesforce bilançosu: kurumsal yazılımda yapay zekâ belirsizliği",["Kurumsal bütçeler yapay zekâya kayıyor; klasik yazılım sorgulanıyor.","Şirket 20 yıldır gelir beklentisini hiç kaçırmadı.","Hisse zirveye yakın."],272,271,-20,"20 yılda ilk kez gelir beklentisi kaçtı. 'Hiç kaçırmaz' unvanı kırılınca ceza sert oldu: -%20.","cita"),
S("Adobe","Bilanço","bilanco","Aralık 2024 · Bilanço kapanıştan sonra","Adobe bilançosu: yapay zekâ dost mu düşman mı?",["Firefly yapay zekâ ürünleri övülüyor ama gelire katkısı belirsiz.","'Yapay zekâ, Photoshop'u ucuzlatır' tezi dolaşıyor.","2025 guidance'ı kritik."],540,549,-14,"2025 gelir guidance'ı beklentinin altında geldi. Yapay zekâ hikâyesi savunmada kaldı: -%14.","guid"),
S("Oracle","Bilanço","bilanco","Eylül 2024 · Bilanço kapanıştan sonra","Oracle bilançosu: eski devin bulut dönüşü",["Oracle yapay zekâ veri merkezi kiralama işinde sessizce büyüyor.","Dev yapay zekâ şirketleriyle kontrat söylentileri var.","Hisse yıllardır 'sıkıcı' kabul ediliyor."],140,142,11,"Dev bulut kontratları açıklandı; 'sıkıcı' Oracle yapay zekâ hikâyesine resmen katıldı: +%11.","donus"),
S("Snowflake","Bilanço","bilanco","Şubat 2024 · Bilanço kapanıştan sonra","Snowflake bilançosu: yıldız CEO ve yavaşlayan büyüme",["Veri bulutu yıldızı; çarpanlar hâlâ çok yüksek.","Büyüme her çeyrek yavaşlıyor.","Yapay zekâ ürünleri henüz gelir üretmiyor."],230,232,-20,"Efsane CEO Slootman'ın emekliliği + zayıf guidance aynı anda geldi: -%20. Yıldız yöneticinin gidişi de bir guidance'tır.","guid"),
S("CrowdStrike","Bilanço","bilanco","Haziran 2024 · Bilanço kapanıştan sonra","CrowdStrike bilançosu: siber güvenlikte lider prim yapıyor",["Siber saldırılar arttıkça güvenlik bütçeleri korunuyor.","Hisse zirvede; çarpan yüksek ama büyüme de yüksek.","Rakiplerden pay çaldığı konuşuluyor."],300,340,12,"Rakamlar ve guidance güçlü; 'pahalı ama en iyisi' tezi yine kazandı: +%12.","trend"),
S("Costco","Bilanço","bilanco","Mart 2024 · Bilanço","Costco bilançosu: istikrar makinesi",["Üyelik modeli sayesinde gelirler öngörülebilir.","Sürpriz ihtimali tarihsel olarak düşük.","Hisse zirveye yakın ama volatilitesi düşük."],730,735,2,"Beklendiği gibi sağlam ve sürprizsiz. %2 hareket için bilanço kumarı oynamaya değmezdi — PAS doğru karardı.","pas"),
S("Coca-Cola","Bilanço","bilanco","Nisan 2024 · Bilanço","Coca-Cola bilançosu: savunma hissesinde olay günü",["Talep istikrarlı; fiyat artışları geçiyor.","Analist beklentileri dar bantta.","Hisse tarihsel olarak bilanço günü az oynar."],59,61,1,"Hafif beat, +%1. Sıkıcı hissede bilanço trade'i masrafını bile çıkarmaz.","pas"),
S("Johnson & Johnson","Bilanço","bilanco","Nisan 2024 · Bilanço","J&J bilançosu: ilaç devinde rutin gün",["Ürün portföyü geniş; tek üründe sürpriz genel sonucu değiştirmez.","Dava riskleri biliniyor ve fiyatlanmış.","Beklentiler dar bantta."],152,155,1,"Rutin bir beat, ±%1 hareket. Buradaki gerçek ders: her bilanço trade edilmez.","pas"),
S("Procter & Gamble","Bilanço","bilanco","Ocak 2024 · Bilanço","P&G bilançosu: temel tüketimde fiyat/hacim dengesi",["Zamlar geliri taşıyor ama hacimler hafif düşük.","Tüketici temel ürünlerden vazgeçmez.","Volatilite beklentisi düşük."],148,146,-1,"Karışık ama önemsiz: -%1. Düşük volatiliteli hisselerde PAS da bir pozisyondur.","pas"),
S("JPMorgan","Bilanço","bilanco","Nisan 2023 · Bilanço","JPMorgan bilançosu: banka krizinin ortasında dev",["SVB krizi bölgesel bankaları vurdu; mevduat dev bankalara kaçıyor.","JPMorgan 'krizin kazananı' olabilir tezi var.","Faiz gelirleri rekor kırabilir."],128,127,7,"Mevduat AKIŞI ve rekor faiz geliri açıklandı: kriz, devin işine yaradı. +%7. Şokta kazananı ara.","kazanan"),
S("Dell","Bilanço","bilanco","Mayıs 2024 · Bilanço kapanıştan sonra","Dell bilançosu: yapay zekâ sunucu hikâyesinin bedeli",["Dell yapay zekâ sunucularıyla yeniden keşfedildi; hisse 1 yılda 2 kat.","Soru: yapay zekâ sunucusu satmak kârlı mı?","Beklentiler çok yükseldi."],130,154,-18,"Gelir iyi ama yapay zekâ sunucu MARJI sıfıra yakın çıktı. Hype, kârlılık testini geçemedi: -%18.","cita"),
S("GameStop","Bilanço","bilanco","Mart 2021 · Bilanço kapanıştan sonra","GameStop bilançosu: meme rallisi rakamla buluşuyor",["Ocak squeeze'inden sonra hisse hâlâ 10 kat yukarıda.","Şirketin gerçek işi (mağazacılık) küçülüyor.","'Dönüşüm planı' detayı bekleniyor."],195,181,-34,"Rakamlar vasat, dönüşüm planı detaysız. Hype rakamla doğrulanmayınca -%34. Bilanço, hikâyenin yalan makinesidir.","cita"),
S("Alibaba","Bilanço","bilanco","Kasım 2023 · Bilanço","Alibaba bilançosu: parçalanma planı ve Çin riski",["Şirket 6'ya bölünme planı açıklamıştı; bulut spin-off'u bekleniyor.","Çin ekonomisi zayıf; düzenleyici baskı sürüyor.","Hisse tarihi diplerde 'çok ucuz' görünüyor."],86,84,-9,"Bulut spin-off'u ABD çip kısıtlamaları yüzünden İPTAL edildi. Çin hisselerinde politika riski her tezi ezer: -%9.","reg"),
S("PDD (Temu)","Bilanço","bilanco","Ağustos 2023 · Bilanço","PDD bilançosu: Temu'nun sessiz devrimi",["Temu ABD'de uygulama listelerinin tepesinde ama gelire etkisi bilinmiyor.","Çin e-ticaretinde fiyat savaşı var.","Beklentiler mütevazı."],78,82,15,"Gelir beklentiyi %10+ aştı; Temu etkisi rakamlara girmişti. Sokaktaki sinyali (uygulama sıralaması) okuyanlar kazandı: +%15.","gorece"),
S("Lululemon","Bilanço","bilanco","Mart 2024 · Bilanço kapanıştan sonra","Lululemon bilançosu: premium tüketici yorgun mu?",["ABD'de premium giyim talebinde yavaşlama sinyalleri var.","Marka gücü ve marjlar hâlâ sektör lideri.","Hisse zirveye yakın."],470,478,-16,"ABD talebi yavaşladı, guidance zayıf geldi. Premium tüketici de sonsuz değil: -%16.","guid"),
S("Starbucks","Bilanço","bilanco","Nisan 2024 · Bilanço kapanıştan sonra","Starbucks bilançosu: trafik verisi alarm veriyor mu?",["ABD'de mağaza trafiğinde düşüş söylentileri var.","Çin pazarı da zayıf.","Hisse yıl içinde zaten geride."],88,88,-16,"Trafik ve Çin birlikte çöktü; guidance kesildi. İki motoru da teklerken hisse taşınmaz: -%16.","guid"),
S("Qualcomm","Bilanço","bilanco","Kasım 2022 · Bilanço kapanıştan sonra","Qualcomm bilançosu: telefon stok krizi",["Telefon üreticilerinde stok fazlası konuşuluyor.","Android talebi zayıf; Çin kilit pazar.","Hisse yıl içinde %30 düşmüş, 'ucuz' deniyor."],118,115,-8,"Stok eritme itirafı geldi, guidance kesildi. Döngüsel hissede 'ucuz', döngü dönmeden çalışmaz: -%8.","ucuz"),
S("Robinhood","Bilanço","bilanco","Ocak 2022 · Bilanço kapanıştan sonra","Robinhood bilançosu: meme çılgınlığı sonrası ilk kış",["Meme/kripto işlem hacimleri düşüyor.","Kullanıcı büyümesi durdu söylentisi var.","Hisse halka arz fiyatının yarısında; 'ucuz' deniyor."],15,14,-10,"Aktif kullanıcılar düştü, guidance zayıf. Halka arz hype'ının faturası kesilmeye devam etti: -%10.","ipo"),

/* ============ SENARYOLAR A: FED & MAKRO ============ */
S("S&P 500","FED Kararı","fed","Aralık 2024 · FOMC kararına 1 saat","FED faiz kararı: indirim fiyatlanmış, asıl konu 2025",["25 baz puan indirim %95 ihtimalle bekleniyor — sürpriz değil.","Asıl merak: FED'in 2025 için kaç indirim öngöreceği (dot plot).","S&P 500 tarihi zirvesinin dibinde, piyasa iyimser."],5870,6050,-3,"İndirim geldi ama 2025 projeksiyonu 4'ten 2 indirime düştü. Fiyatlanmamış şahin detay: -%3.","fiyat"),
S("S&P 500","FED Konuşması","fed","Ağustos 2022 · Jackson Hole konuşmasına 1 saat","Powell'ın Jackson Hole konuşması: piyasa güvercin umuyor",["Piyasa yaz boyunca 'FED yakında döner' diye ralli yaptı (+%17).","Enflasyon hâlâ %8'in üstünde.","Powell'ın kısa bir konuşma yapacağı duyuruldu."],4280,4200,-3.4,"8 dakikalık konuşma: 'Hanehalkına acı verecek ama enflasyonu ezeceğiz.' Umut rallisi tek celsede bitti: -%3.4.","rejim"),
S("S&P 500","FED Kararı","fed","Mart 2020 · Pazar gecesi acil indirim sonrası","FED paniği: Pazar gecesi acil 100bp indirim",["FED, Pazar gecesi olağanüstü toplantıyla faizi sıfıra çekti.","'Piyasalar buna sevinir' diyenler var.","COVID vaka sayıları katlanarak artıyor."],2970,2711,-12,"Piyasa şunu okudu: 'FED bizim görmediğimiz neyi görüyor?' Ertesi gün tarihin en sert düşüşlerinden biri: -%12.","acil"),
S("S&P 500","FED Kararı","fed","Aralık 2023 · FOMC kararına 1 saat","FED kararı: 'zirveden dönüş' sinyali gelir mi?",["Enflasyon hızla düşüyor; piyasa 2024 indirimlerini fiyatlamaya başladı.","Powell şimdiye dek hep şahin konuştu.","S&P 500 zirveye %5 mesafede."],4560,4710,5,"Dot plot 2024'e 3 indirim koydu; Powell 'indirimleri konuştuk' dedi. Güvercin pivot: haftalar süren ralli, +%5.","basin"),
S("S&P 500","FED Kararı","fed","Kasım 2022 · FOMC kararına 1 saat","FED kararı: 75bp kesin, metinde yumuşama aranıyor",["4. kez üst üste 75bp bekleniyor — tamamen fiyatlı.","Karar metnine 'gecikmeli etkiler' ifadesi girebilir söylentisi var.","Piyasa dönüş sinyaline aç."],3790,3860,-2.5,"Metin güvercindi, piyasa önce +%1 yükseldi. Sonra Powell basın toplantısında 'durmak yok' dedi: kapanış -%2.5. Asıl mesaj toplantıda gelir.","basin"),
S("S&P 500","FED Kararı","fed","Haziran 2022 · FOMC kararına 1 saat","FED kararı: sızıntıyla gelen 75bp",["İki gün önce WSJ 'FED 75 düşünecek' yazdı; beklenti bir gecede değişti.","Piyasa sızıntıyla birlikte zaten %5 düştü.","Kötü haber artık fiyatın içinde olabilir."],3735,3790,1.5,"75bp geldi — ve piyasa YÜKSELDİ: kötü haber iki gün önce fiyatlanmıştı. Haberin kendisi değil, fiyatlanmışlığı önemli.","fiyat"),
S("Nasdaq 100","Makro Veri","makro","Kasım 2022 · Enflasyon verisine 5 dk","ABD enflasyon (CPI) verisi: tepe döndü mü?",["Beklenti %8,0 (önceki %8,2); tepe sinyalleri var.","Nasdaq yıl içinde -%34, piyasa aşırı karamsar.","Kural: beklenti altı veri = sert ralli."],11700,10800,7.4,"%7,7 geldi — beklenti altı. Nasdaq %7,4 fırladı: 2020'den beri en iyi gün. Ama unutma: bu bir kumardı.","veri"),
S("Nasdaq 100","Makro Veri","makro","Eylül 2022 · Enflasyon verisine 5 dk","ABD CPI: piyasa bu kez soğuma bekliyor",["Benzin fiyatları düştü; herkes yumuşak veri bekliyor.","Nasdaq veriye güvenip hafta boyunca ralli yaptı.","Beklenti %8,1'e düşüş."],12500,12380,-5.2,"Çekirdek enflasyon YÜKSELDİ. Ralliyle şişen piyasa tek günde %5,2 çöktü — 2020'den beri en kötü gün. Veri kumarının diğer yüzü.","veri"),
S("Nasdaq 100","Makro Veri","makro","Temmuz 2022 · Enflasyon verisine 5 dk","ABD CPI: zirve sonrası ilk gerçek soğuma?",["Beklenti: manşetin %8,7'ye gerilemesi.","Emtia fiyatları haziranda sert düştü.","Piyasa hâlâ ayı piyasası modunda, kimse inanmıyor."],12100,12500,2.9,"Veri beklentiden soğuk geldi; 'enflasyon tepesi' teyit edildi ve yaz rallisi ivmelendi: +%2,9.","veri"),
S("S&P 500","Makro Veri","makro","Ağustos 2024 · İstihdam verisine 5 dk","ABD istihdam (NFP): 'yumuşak iniş' testi",["Öncü veriler (işsizlik başvuruları) bozulmaya başladı.","Sahm kuralı (resesyon göstergesi) tetiklenmek üzere.","Piyasa hâlâ zirveye yakın, rehavet var."],5560,5440,-2.4,"Veri çok zayıf geldi, Sahm kuralı tetiklendi: resesyon korkusu + %2,4 düşüş. Üç gün sonra bu satış küresel krize dönüşecekti.","rejim"),
S("S&P 500","Makro Veri","makro","Şubat 2023 · İstihdam verisine 5 dk","ABD istihdam: ekonomi güçlü mü kalmalı?",["Piyasa yeni yıl rallisinde; 'FED yakında durur' fiyatlanıyor.","Beklenti ~190 bin yeni istihdam.","Sıkılaşma rejiminde güçlü veri = kötü haber."],4130,4170,-1.3,"517 BİN geldi — beklentinin 3 katı. Güçlü ekonomi = 'FED daha çok sıkacak' = hisse satışı. İyi haber, kötü haberdi: -%1,3.","rejim"),
S("S&P 500","Tahvil Piyasası","makro","Ekim 2023 · Gün içi","ABD 10 yıllık tahvil faizi %5'e dayandı",["16 yılın en yüksek tahvil faizi; 'risksiz getiri' %5.","Hisse değerlemeleri baskı altında.","'Faiz %5'ken neden hisse tutayım' söylemi yayılıyor."],4390,4250,-3,"Faiz %5'i gördü, hisseler haftalarca ezildi (-%3). Ta ki faiz tepe yapana kadar — sonra her şey ters döndü.","faiz"),
S("S&P 500","Tahvil Piyasası","makro","Kasım 2023 · FOMC sonrası","Tahvil faizi tepeden dönüyor: ralli başlar mı?",["10 yıllık %5,02'den %4,7'ye hızla geriledi.","FED toplantısı beklenenden güvercin geçti.","Piyasa Ekim dibinde aşırı karamsardı."],4120,4240,5,"Faiz yerçekimi tersine döndü: S&P 500 iki ayda %14 ralli yaptı (ilk hafta +%5). Faizin yönü, hissenin yönüdür.","faiz"),
S("S&P 500","Makro Şok","makro","Ağustos 2011 · Not indirimi sonrası ilk gün","S&P, ABD'nin kredi notunu düşürdü (tarihte ilk)",["Cuma gecesi ABD AAA notunu kaybetti.","Borç tavanı krizi haftalardır sürüyor.","'Panik abartı, ABD batmaz' diyenler çok."],1250,1199,-6.7,"Pazartesi tarihi satış: -%6,7. İronik: para 'not düşürülen' ABD tahvillerine kaçtı. Panik gününde likidite kraldır.","hik"),
S("S&P 500","Makro Şok","makro","Ağustos 2023 · Not indirimi sonrası","Fitch, ABD'nin notunu düşürdü — 2011 tekrarı mı?",["2011'deki S&P indirimi -%7'lik güne yol açmıştı.","Bu kez ekonomi güçlü, kriz havası yok.","'Tarih tekerrür eder' diye short açanlar var."],4590,4560,-1.4,"Sadece -%1,4. Aynı haber, farklı bağlam, bambaşka sonuç. Geçmiş şablonu köre köre kopyalama.","baglam"),
S("S&P 500","FED Sinyali","makro","Mayıs 2013 · Bernanke ifadesi sonrası","Taper Tantrum: FED tahvil alımını azaltmayı ima etti",["FED yıllardır tahvil alarak piyasayı destekliyor (QE).","Bernanke ilk kez 'alımları azaltabiliriz' dedi.","Piyasa QE'ye bağımlı hâle gelmişti."],1650,1660,-4,"'Azaltma' iması bile haftalarca süren satış başlattı (-%4 ve tahvillerde deprem). Piyasanın bağımlı olduğu şeyi elinden almaya kalkmak sancılıdır.","faiz"),
S("Euro Stoxx 50","MB Konuşması","makro","Temmuz 2012 · Draghi konuşması","Draghi: 'Euro'yu kurtarmak için ne gerekiyorsa'",["Euro bölgesi dağılma riski konuşuluyor; İtalya/İspanya faizleri patladı.","ECB Başkanı Draghi Londra'da konuşacak.","Piyasa somut eylem değil laf bekliyor."],2100,2180,4,"'Whatever it takes' — tek cümle euro krizini bitirdi: +%4 ve aylarca ralli. Güvenilir kurumun taahhüdü, paradan güçlüdür.","panik"),
S("Nikkei 225","MB Kararı","makro","Aralık 2022 · BOJ kararı sonrası","Japonya Merkez Bankası'ndan sürpriz: faiz bandı gevşetildi",["BOJ yıllardır faizi sıfırda tutuyor; kimse değişiklik beklemiyor.","Yen tarihi diplerde.","Karar gecesi 'rutin' toplantı sanılıyor."],27900,26800,-2.5,"BOJ tahvil bandını sürpriz genişletti: yen fırladı, Nikkei -%2,5. 'Asla değişmez' denilen politika değişince hareket en sert olur.","pol"),
S("S&P 500","Teşvik Paketi","makro","Mart 2020 · Kongre oylaması öncesi","2 trilyon dolarlık teşvik + sınırsız QE masada",["FED 'sınırsız' tahvil alımı ilan etti.","Kongre'de tarihin en büyük teşvik paketi oylanacak.","Piyasa 1 ayda %34 çökmüş durumda."],2600,2237,9.4,"Paket geçti: tek günde +%9,4 (1933'ten beri en iyi gün). Ama dikkat: bu ralli ayı piyasasının İÇİNDEYDİ — dip 3 gün önceydi, kimse bilmiyordu.","ayi"),

/* ============ SENARYOLAR A: TÜRKİYE ============ */
S("Dolar/TL","TCMB Kararı","tr","Eylül 2021 · TCMB kararına 1 saat","TCMB kararı: enflasyon %19'ken faiz indirimi konuşuluyor",["Enflasyon %19,3; politika faizi %19.","Yeni MB yönetimi 'faiz indirimi' sinyali veriyor.","Ekonomistlerin çoğu 'indirilmez, indirilemez' diyor."],8.3,8.65,3,"Faiz 100bp indirildi. Negatif reel faize geçiş TL'den kaçışı başlattı: dolar/TL o gün +%3, yıl sonuna %60 yükselecekti.","reel"),
S("Dolar/TL","Politika Şoku","tr","Aralık 2021 · Akşam açıklaması öncesi","Dolar/TL 18'i aştı: hükümetten hamle bekleniyor",["Kur 3 ayda ikiye katlandı; dolarizasyon rekor seviyede.","Akşam 'yeni ekonomik model' açıklaması yapılacağı duyuruldu.","Herkes dolarda; 'kur daha da gider' görüşü kalabalık."],13.5,18.3,-25,"KKM açıklandı: kur tek gecede 18'den 13'e (-%25) çöktü. Politika müdahalesi, en kalabalık pozisyonu (dolar longu) ezdi.","pol"),
S("Dolar/TL","TCMB Kararı","tr","Haziran 2023 · Seçim sonrası ilk TCMB kararı","Yeni ekonomi yönetiminin ilk faiz kararı",["Mehmet Şimşek atandı; 'rasyonel zemine dönüş' dedi.","Piyasa faizin %8,5'ten %20+'ya çıkmasını bekliyor.","TL'de değer kaybı baskısı sürüyor."],23.5,23.5,7,"Faiz sadece %15'e çıktı — beklentinin altında. 'Kademeli' mesaj yetersiz bulundu: dolar/TL bir haftada +%7.","fiyat"),
S("BIST 100","Enflasyon Ortamı","tr","Ekim 2022 · Dönem ortası","BIST: enflasyon %80, mevduat faizi %20",["Reel faiz tarihin en negatif seviyelerinde.","Yerli yatırımcı parasını korumak için hisseye akıyor.","Yabancılar 'sürdürülemez' diyor, uzak duruyor."],3400,3900,20,"BIST 100 iki ayda %20 daha yükseldi (yılı +%196 kapattı). Negatif reel faizde hisse, nominal sığınaktır — ama getiriyi hep reel hesapla.","nominal"),
S("Banka Endeksi (XBANK)","Politika Değişimi","tr","Haziran 2023 · Kabine sonrası","Şimşek atandı: bankalara 'rasyonel dönüş' rallisi gelir mi?",["Yıllardır baskılanan bankacılık sektörü tarihi ucuz çarpanlarda.","Ortodoks politikaya dönüş bankaların kârını patlatır tezi var.","Yabancı girişi başlarsa ilk adres bankalar olur."],4400,5100,20,"Politika değişimi teyit oldukça XBANK yaz boyunca katlandı (ilk ay +%20). Rejim değişiminde en çok ezilmiş sektör en sert döner.","donus"),
S("Türk Hava Yolları","Bilanço","tr","Kasım 2022 · Bilanço","THY bilançosu: turizm rekoru kâra dönüşüyor mu?",["Türkiye turizmde rekor sezon geçirdi.","Kur artışı gelirlerin dolar bazlı olmasını avantaja çevirdi.","Kargo gelirleri de güçlü."],90,110,8,"Tarihi rekor kâr açıklandı; hisse rallisine devam etti (+%8). Sokakta gördüğün trend (dolu uçaklar) bilançoda karşılığını bulur.","trend"),
S("Gram Altın","Zirve Kırılımı","tr","Mart 2024 · Gün içi","Gram altın tarihi zirvesini kırıyor",["Ons altın tarihî 2.075$ direncini kırdı.","Dolar/TL'de kademeli yükseliş sürüyor.","Gram altın çift motorlu: ons + kur."],1950,2080,10,"İki motor aynı anda çalıştı: gram altın ay içinde +%10 ve yıl boyu rekor tazeledi. TL cinsi varlıklarda kur ayağını hesaba kat.","nominal")
];

# Piyasa Kası 💪📈

Gerçek geçmiş piyasa olaylarına dayanan bir **finansal refleks / trade simülasyon oyunu**. Amaç: yatırım ve anlık trade kasanı güçlendirmek.

🔗 **Canlı:** https://quiet-daffodil-1c8983.netlify.app

## Özellikler

- **249+ gerçek tarihi senaryo** — bilançolar, FED kararları, zirve kırılımları, şok haberler, sempati hareketleri, halka arzlar, kripto, emtia ve Türkiye piyasası (ağırlıklı 2025–2026).
- **LONG / PAS / SHORT** kararı + pozisyon büyüklüğü (risk yönetimi).
- **Vade seçimi** (1 gün → 1 yıl + 🎲 random); sonuç seçilen vadenin sonundaki fiyata göre hesaplanır.
- **Kalıcı kasa** ve isimli oyuncular; her oyunda kaldığın paradan devam.
- **Küresel sıralama** (Netlify Functions + Blobs) — e-posta + nickname ile üyelik, kâr oranına göre.
- **İlgi alanı filtresi** — sorular yalnız seçtiğin varlık sınıflarından gelsin (kripto, endeksler, emtia…).
- Her soruda **konu rehberi**, **detaylı durum** ve **ders özeti**; çözülen sorular arşivi.

## Teknoloji

- Saf HTML/CSS/JS (bağımlılık yok) — `index.html` + `data1.js … data5.js`
- Küresel sıralama: `netlify/functions/api.mjs` (Netlify Functions v2 + Netlify Blobs)

## Yerel çalıştırma

```bash
# basit statik sunucu
python -m http.server 4173 --directory .
# tarayıcıda http://localhost:4173
```

> ⚠️ Yatırım tavsiyesi değildir — bu bir eğitim ve eğlence oyunudur. Fiyat/oran verileri yaklaşıktır.

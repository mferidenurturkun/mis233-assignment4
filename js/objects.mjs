// Mübeccel Feride Nur Türkün, 2024502063
// Object destructuring (forms 5 to 10). Run with `node js/objects.mjs`.

// Form 5 (worked example): take properties out of an object by name.


const fuzuliSiir = {
  baslik: 'Su Kasidesi',
  nazimSekli: 'Kaside',
  mahlas: 'Fuzûlî',
  beyitSayisi: 32,
  vezin: {
    kalip: 'Fâilâtün Fâilâtün Fâilâtün Fâilün',
    bahr: 'Remel',
  },
  anahtarKelimeler: ['su', 'naat', 'gözyaşı'],
}

// Form 5 (Fuzuli): özellik adıyla nesneden veri çekme
let { baslik, nazimSekli } = fuzuliSiir
console.log('form 5:', baslik, '-', nazimSekli)

// Form 6: çekerken yeniden adlandırma (mahlas değişkeni oluşmaz, sairAdi oluşur)
const { mahlas: sairAdi, beyitSayisi: toplamBeyit } = fuzuliSiir
console.log('form 6:', sairAdi, toplamBeyit)

// Form 7: nesnede olmayan özellik için varsayılan değer
const { redif = 'su (varsayılan)', yazilisYili = '16. yüzyıl' } = fuzuliSiir
console.log('form 7:', redif, '|', yazilisYili)

// Form 8: bir özelliği ayırıp kalan tüm özellikleri yeni bir nesnede toplama (...rest)
const { baslik: ayrilanBaslik, ...siirDetaylari } = fuzuliSiir
console.log('form 8:', ayrilanBaslik, Object.keys(siirDetaylari))

// Form 9: iç içe (nested) nesne ve nesne içindeki diziyi tek seferde parçalama
const {
  vezin: { kalip, bahr },
  anahtarKelimeler: [ilkTema, ikinciTema],
} = fuzuliSiir
console.log('form 9:', bahr, '->', kalip, '| temalar:', ilkTema, ikinciTema)

// Form 10: dinamik/hesaplanmış anahtar (computed key) ile özellik okuma
const seciliOzellik = 'nazimSekli'
const { [seciliOzellik]: dinamikDeger } = fuzuliSiir
console.log('form 10:', seciliOzellik, '=', dinamikDeger)
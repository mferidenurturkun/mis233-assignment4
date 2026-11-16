// Mübeccel Feride Nur Türkün, 2024502063
// Things that surprise people. Run with `node js/pitfalls.mjs`.

// Pitfall 1: undefined veya null destructure etmeye çalışmak TypeError fırlatır
try {
  const { baslik } = undefined
  console.log(baslik)
} catch (error) {
  console.log('pitfall 1:', error.constructor.name, '-', error.message)
}

// Pitfall 2: varsayılan değer (=) sadece undefined için çalışır, null için çalışmaz
const eksikRedif = { baslik: 'Şikâyetnâme', redif: null, nazimSekli: undefined }
const { redif = 'yok', nazimSekli = 'Mektup' } = eksikRedif
console.log('pitfall 2:', 'redif =', redif, '| nazimSekli =', nazimSekli)

// Pitfall 3: const/let olmadan mevcut değişkene nesne atarken parantez zorunludur: ({ a } = obj)
let mevcutBaslik = 'Eski Başlık'
const yeniSiir = { baslik: 'Beng ü Bâde' }
;({ baslik: mevcutBaslik } = yeniSiir)
console.log('pitfall 3:', mevcutBaslik)

// Pitfall 4: destructuring derin kopya değil yüzeysel kopya (shallow copy) yapar
const orijinal = {
  baslik: 'Su Kasidesi',
  ozellikler: { dil: 'Azerbaycan / Osmanlı Türkçesi' },
}
const { ozellikler } = orijinal
ozellikler.dil = 'Klasik Türkçe'
console.log('pitfall 4 (orijinal değişti):', orijinal.ozellikler.dil)

// Pitfall 5: nesnelerde sıra önemsizken dizilerde pozisyon (sıra) kritiktir
const { vezin, baslik: siirAdi } = { baslik: 'Hadîkatü’s-Süedâ', vezin: 'Mensur-Manzum' }
const [ilkEleman, ikinciEleman] = ['Hadîkatü’s-Süedâ', 'Mensur-Manzum']
console.log('pitfall 5 (nesne):', siirAdi, '|', vezin)
console.log('pitfall 5 (dizi):', ilkEleman, '|', ikinciEleman)
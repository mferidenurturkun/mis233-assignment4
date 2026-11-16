// Mübeccel Feride Nur Türkün, 2024502063
// Destructuring in parameters and loops (forms 11 and 12). Run with `node js/params.mjs`.

// Form 11: fonksiyon parametresinde nesne destructuring ve varsayılan değerler
function siirOzetle({ baslik, nazimSekli = 'Gazel', vezin = 'Remel bahri' } = {}) {
  return `${baslik} (${nazimSekli}) - ${vezin}`
}
console.log('form 11:', siirOzetle({ baslik: 'Leylâ vü Mecnûn', nazimSekli: 'Mesnevi' }))
console.log('form 11 (varsayılan):', siirOzetle({ baslik: 'Beni Cândan Usandırdı' }))

// Form 11b: parametre listesinde dizi destructuring
const ilkBeyitFormatla = ([birinciMisra, ikinciMisra]) => `${birinciMisra} / ${ikinciMisra}`
const matlaBeyti = [
  'Âşiyân-ı mürg-i dil zülf-i perîşânındadır',
  'Kanda olsam ey perî gönlüm senin yanındadır',
]
console.log('form 11b:', ilkBeyitFormatla(matlaBeyti))

// Form 12: Object.entries() ve Map üzerinde [anahtar, değer] döngüsü
const kasideBilgisi = {
  eser: 'Su Kasidesi',
  sair: 'Fuzûlî',
  redif: 'su',
}
for (const [ozellik, deger] of Object.entries(kasideBilgisi)) {
  console.log('form 12 (object):', ozellik, '->', deger)
}

const beyitSayilari = new Map([
  ['Su Kasidesi', 32],
  ['Leylâ vü Mecnûn', 3096],
  ['Beni Cândan Usandırdı', 7],
])
for (const [eserAdi, sayi] of beyitSayilari) {
  console.log('form 12 (map):', eserAdi, '=', sayi, 'beyit')
}
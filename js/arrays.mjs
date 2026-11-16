// Mübeccel Feride Nur Türkün, 2024502063
// Array destructuring (forms 1 to 4). Plain JavaScript: run with `node js/arrays.mjs`.

// Form 1 (Fuzuli): bir gazelin matla (ilk) ve makta (son) beytini pozisyona göre alma
function matlaVeMakta(beyitler) {
  return [beyitler[0], beyitler[beyitler.length - 1]]
}
const suKasidesiBeyitler = [
  'Saçma ey göz eşkden gönlümdeki odlare su',
  'Ârızun yâdıyla nem-nâk olsa müjgânum n’ola',
  'Suya virsün bâğ-bân gül-zârı zahmet çekmesün',
  'Hâk-i pâyine yetem der ömrlerdir muttasıl',
]
const [matla, makta] = matlaVeMakta(suKasidesiBeyitler)
console.log('form 1:', matla, '|', makta)

// Form 2: ilk elemanı atla (, ), ikinciyi al ve geri kalanları (...rest) dizide topla
const [, ikinciBeyit, ...digerBeyitler] = suKasidesiBeyitler
console.log('form 2:', ikinciBeyit, '| kalan:', digerBeyitler.length)

// Form 3: geçici değişken olmadan iki değişkenin yerini değiştirme
let acilisBeyti = 'Beni cândan usandırdı cefâdan yâr usanmaz mı'
let kapanisBeyti = 'Fuzûlî rind-i şeydâdır hemîşe halka rüsvâdır'
;[acilisBeyti, kapanisBeyti] = [kapanisBeyti, acilisBeyti]
console.log('form 3:', acilisBeyti, '-->', kapanisBeyti)

// Form 4: eksik veya undefined elemanlar için varsayılan değer (default value)
const eksikGazel = ['Öyle ser-mestem ki idrâk etmezem dünyâ nedür']
const [birinci = 'Beyit bulunamadı', ikinci = 'İkinci beyit henüz eklenmedi'] = eksikGazel
console.log('form 4:', birinci, '|', ikinci)
// Mübeccel Feride Nur Türkün, 2024502063
// Array destructuring (forms 1 to 4) in strict TypeScript. Run with `npx tsx ts/arrays.ts`.

type BeyitCifti = [string, string]

// Form 1: dönüş tipi sabit uzunluklu bir tuple ([string, string])
function matlaVeMakta(beyitler: readonly string[]): BeyitCifti {
  const ilk = beyitler[0] ?? 'Matla beyti yok'
  const son = beyitler[beyitler.length - 1] ?? 'Makta beyti yok'
  return [ilk, son]
}

const suKasidesiBeyitler: string[] = [
  'Saçma ey göz eşkden gönlümdeki odlare su',
  'Ârızun yâdıyla nem-nâk olsa müjgânum n’ola',
  'Suya virsün bâğ-bân gül-zârı zahmet çekmesün',
  'Hâk-i pâyine yetem der ömrlerdir muttasıl',
]

const [matla, makta] = matlaVeMakta(suKasidesiBeyitler)
console.log('form 1 (ts):', matla, '|', makta)

// Form 2: ilk elemanı atla, ikinciyi al (noUncheckedIndexedAccess nedeniyle string | undefined olur)
const [, ikinciBeyit, ...digerBeyitler] = suKasidesiBeyitler
console.log('form 2 (ts):', ikinciBeyit ?? 'İkinci beyit yok', '| kalan:', digerBeyitler.length)

// Form 3: geçici değişken olmadan iki string değişkeni takas etme
let acilisBeyti: string = 'Beni cândan usandırdı cefâdan yâr usanmaz mı'
let kapanisBeyti: string = 'Fuzûlî rind-i şeydâdır hemîşe halka rüsvâdır'
;[acilisBeyti, kapanisBeyti] = [kapanisBeyti, acilisBeyti]
console.log('form 3 (ts):', acilisBeyti, '-->', kapanisBeyti)

// Form 4: varsayılan değerler verildiğinde tip `string | undefined` yerine `string` olur
const eksikGazel: string[] = ['Öyle ser-mestem ki idrâk etmezem dünyâ nedür']
const [birinci = 'Beyit bulunamadı', ikinci = 'İkinci beyit henüz eklenmedi'] = eksikGazel
console.log('form 4 (ts):', birinci, '|', ikinci)
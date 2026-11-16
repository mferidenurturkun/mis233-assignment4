// Mübeccel Feride Nur Türkün, 2024502063
// Destructuring in parameters and loops (forms 11 and 12) in strict TypeScript.

type SiirOzetiGirdisi = {
  baslik: string
  nazimSekli?: 'Gazel' | 'Kaside' | 'Mesnevi'
  vezin?: string
}

// Form 11: tip tanımı destructuring pattern'ının tamamından sonra yazılır
function siirOzetle({ baslik, nazimSekli = 'Gazel', vezin = 'Remel bahri' }: SiirOzetiGirdisi): string {
  return `${baslik} (${nazimSekli}) - ${vezin}`
}
console.log('form 11 (ts):', siirOzetle({ baslik: 'Leylâ vü Mecnûn', nazimSekli: 'Mesnevi' }))
console.log('form 11 (ts varsayılan):', siirOzetle({ baslik: 'Beni Cândan Usandırdı' }))

// Form 11b: parametre listesinde tuple destructuring
type Beyit = [string, string]
const ilkBeyitFormatla = ([birinciMisra, ikinciMisra]: Beyit): string =>
  `${birinciMisra} / ${ikinciMisra}`

const matlaBeyti: Beyit = [
  'Âşiyân-ı mürg-i dil zülf-i perîşânındadır',
  'Kanda olsam ey perî gönlüm senin yanındadır',
]
console.log('form 11b (ts):', ilkBeyitFormatla(matlaBeyti))

// Form 12: Object.entries ve Map üzerinde tipli döngü
const kasideBilgisi: Record<string, string> = {
  eser: 'Su Kasidesi',
  sair: 'Fuzûlî',
  redif: 'su',
}
for (const [ozellik, deger] of Object.entries(kasideBilgisi)) {
  console.log('form 12 (ts object):', ozellik, '->', deger)
}

const beyitSayilari = new Map<string, number>([
  ['Su Kasidesi', 32],
  ['Leylâ vü Mecnûn', 3096],
  ['Beni Cândan Usandırdı', 7],
])
for (const [eserAdi, sayi] of beyitSayilari) {
  console.log('form 12 (ts map):', eserAdi, '=', sayi, 'beyit')
}
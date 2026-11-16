// Mübeccel Feride Nur Türkün, 2024502063
// Object destructuring (forms 5 to 10) in strict TypeScript. Run with `npx tsx ts/objects.ts`.

type NazimSekli = 'Gazel' | 'Kaside' | 'Mesnevi'

type FuzuliEseri = {
  baslik: string
  nazimSekli: NazimSekli
  mahlas: string
  beyitSayisi: number
  redif?: string
  vezin: {
    kalip: string
    bahr: string
  }
  anahtarKelimeler: string[]
}

const fuzuliSiir: FuzuliEseri = {
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

// Form 5: özellik adıyla nesneden veri çekme
let { baslik, nazimSekli } = fuzuliSiir
console.log('form 5 (ts):', baslik, '-', nazimSekli)

// Form 6: çekerken yeniden adlandırma
const { mahlas: sairAdi, beyitSayisi: toplamBeyit } = fuzuliSiir
console.log('form 6 (ts):', sairAdi, toplamBeyit)

// Form 7: opsiyonel alan için varsayılan değer (tip `string | undefined` -> `string` olur)
const { redif = 'su (varsayılan)' } = fuzuliSiir
console.log('form 7 (ts):', redif)

// Form 8: rest operatörü ile kalan özellikleri toplama
const { baslik: ayrilanBaslik, ...siirDetaylari } = fuzuliSiir
console.log('form 8 (ts):', ayrilanBaslik, Object.keys(siirDetaylari))

// Form 9: iç içe nesne ve diziyi tek seferde parçalama
const {
  vezin: { kalip, bahr },
  anahtarKelimeler: [ilkTema = 'yok', ikinciTema = 'yok'],
} = fuzuliSiir
console.log('form 9 (ts):', bahr, '->', kalip, '| temalar:', ilkTema, ikinciTema)

// Form 10: keyof FuzuliEseri ile tip güvenli dinamik anahtar erişimi
const seciliOzellik: keyof FuzuliEseri = 'nazimSekli'
const { [seciliOzellik]: dinamikDeger } = fuzuliSiir
console.log('form 10 (ts):', seciliOzellik, '=', dinamikDeger)
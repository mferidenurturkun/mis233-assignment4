// Mübeccel Feride Nur Türkün, 2024502063
// TypeScript-only destructuring behaviors (T1 to T5). Run with `npx tsx ts/types.ts`.

// T1: Pattern içindeki `{ baslik: string }` bir TİP DEĞİL, yeniden adlandırmadır (rename).
// Bu yazım `baslik` özelliğini `string` adında bir değişkene atar. Tip, pattern'ın sonuna yazılır.
const gazelOrnegi = { baslik: 'Beni Cândan Usandırdı', beyitSayisi: 7 }
const { baslik: string } = gazelOrnegi // Dikkat: burada `string` bir değişken adıdır!
const { baslik: dogruBaslik }: { baslik: string } = gazelOrnegi
console.log('T1:', string, '|', dogruBaslik)

// T2: Tuple dönüş tipi [number, string] ile sabit uzunluk ve pozisyon tipi;
// `as const` ise diziyi değiştirilemez (readonly) bir tuple'a dönüştürür.
function eserBilgisiGetir(): [number, string] {
  return [32, 'Su Kasidesi']
}
const [beyitAdedi, kasideAdi] = eserBilgisiGetir()
// beyitAdedi kesinlikle `number`, kasideAdi kesinlikle `string` tipindedir.

const sabitBahirler = ['Remel', 'Hezec', 'Müctes'] as const
const [ilkBahr, ikinciBahr] = sabitBahirler
// `as const` sayesinde ilkBahr'ın tipi genel `string` değil, literal `'Remel'` olur.
console.log('T2:', beyitAdedi, kasideAdi, '|', ilkBahr, ikinciBahr)

// T3: `noUncheckedIndexedAccess: true` açıkken normal diziden destructure edilen eleman `T | undefined` olur.
const divanEserleri: string[] = ['Leylâ vü Mecnûn', 'Beng ü Bâde']
const [ilkEser] = divanEserleri // Tipi: string | undefined
const guvenliIlkEser = ilkEser !== undefined ? ilkEser.toUpperCase() : 'Eser bulunamadı'
console.log('T3:', guvenliIlkEser)

// T4: Opsiyonel alan (`redif?: string`) vs varsayılan değer (`redif = 'redifsiz'`).
// Varsayılan değer verildiğinde değişkenin tipi `string | undefined` durumundan `string` durumuna daralır.
type SiirKaydi = { baslik: string; redif?: string }
const kayit: SiirKaydi = { baslik: 'Şikâyetnâme' }

const { redif: opsiyonelRedif } = kayit // Tipi: string | undefined
const { redif: varsayilanliRedif = 'redifsiz' } = kayit // Tipi: string (undefined ihtimali kalktı)
console.log('T4:', opsiyonelRedif, '|', varsayilanliRedif.toUpperCase())

// T5: Destructuring kaynaklı gerçek bir derleme hatası (`// @ts-expect-error` ile).
// 2 elemanlı bir tuple'dan 3. elemanı çıkarmaya çalışmak TypeScript'te derleme hatası verir:
// Hata: TS2493: Tuple type '[string, string]' of length '2' has no element at index '2'.
const ikiMisra: [string, string] = [
  'Saçma ey göz eşkden gönlümdeki odlare su',
  'Kim bu denlü dutuşan odlare kılmaz çâre su',
]
// @ts-expect-error Tuple uzunluğu 2 olduğu için 3. eleman (index 2) destructure edilemez
const [birinciMisra, ikinciMisra, ucuncuMisra] = ikiMisra
// Çözüm: Tuple tipini 3 elemanlı yapmak veya normal `string[]` dizisi kullanmak.
console.log('T5:', birinciMisra, '|', ikinciMisra, '|', ucuncuMisra)
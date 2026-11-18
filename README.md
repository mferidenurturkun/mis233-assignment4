# Destructuring Field Guide

Name Surname: Mübeccel Feride Nur Türkün  
Student number: 2024502063

Bonuses claimed:
- **Bonus 4: Git repository**

---

## Run

```bash
npm install
npm run all      # runs the JS and TS examples
npm run check    # type-checks in strict mode
```

Windows PowerShell'de çıktıyı UTF-8 olarak `output.txt` dosyasına kaydetmek için:

> **Not:** UTF-8 ayarı, Fuzuli'nin şiirlerindeki şapkalı karakterlerin (`û`, `î`, `â`) düzgün görünmesi için gereklidir.

```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
npm run all | Out-File -FilePath output.txt -Encoding utf8
```

---

## `...` Notu (Rest ve Spread Farkı)

Üç nokta (`...`) kullanıldığı yere göre birbirinin tam tersi iki iş yapar:
- **Rest** (`=` işaretinin sol tarafında, örneğin `const [, ikinci, ...digerleri] = list`): Geriye kalan elemanları veya özellikleri yeni bir dizi ya da nesne içinde toplar.
- **Spread** (`=` işaretinin sağ tarafında veya JSX içinde, örneğin `<section {...rest}>`): Var olan bir diziyi veya nesneyi tek tek elemanlara ya da prop'lara açar.

---

## Field Guide

### Form 1: Pozisyona göre dizi destructuring, `const [x, y] = f()`

**Syntax:** `const [matla, makta] = matlaVeMakta(suKasidesiBeyitler)`

**Example** (`js/arrays.mjs`):
```js
function matlaVeMakta(beyitler) {
  return [beyitler[0], beyitler[beyitler.length - 1]]
}
const [matla, makta] = matlaVeMakta(suKasidesiBeyitler)
console.log('form 1:', matla, '|', makta)
```
*(Normal atama karşılığı: `const res = matlaVeMakta(...); const matla = res[0]; const makta = res[1];`)*

**Output:** `form 1: Saçma ey göz eşkden gönlümdeki odlare su | Hâk-i pâyine yetem der ömrlerdir muttasıl`

**Ne zaman kullanılır:** Bir fonksiyon sırası belli olan sabit sayıda değer döndürdüğünde.

**Dikkat edilecek nokta:** Sıra önemlidir. Değişken isimlerinin yerini değiştirirsen hata almadan yanlış değerleri çekersin.

---

### Form 2: Eleman atlama ve kalanları toplama, `const [, second, ...others] = list`

**Syntax:** `const [, ikinciBeyit, ...digerBeyitler] = suKasidesiBeyitler`

**Example** (`js/arrays.mjs`):
```js
const [, ikinciBeyit, ...digerBeyitler] = suKasidesiBeyitler
console.log('form 2:', ikinciBeyit, '| kalan:', digerBeyitler.length)
```
*(Normal atama karşılığı: `const ikinciBeyit = suKasidesiBeyitler[1]; const digerBeyitler = suKasidesiBeyitler.slice(2);`)*

**Output:** `form 2: Ârızun yâdıyla nem-nâk olsa müjgânum n’ola | kalan: 2`

**Ne zaman kullanılır:** Baştaki elemanları atlayıp geri kalanları yeni bir dizide toplamak istediğinde.

**Dikkat edilecek nokta:** `...digerBeyitler` her zaman kalıbın en sonunda olmalıdır.

---

### Form 3: İki değişkenin yerini değiştirme, `[a, b] = [b, a]`

**Syntax:** `;[acilisBeyti, kapanisBeyti] = [kapanisBeyti, acilisBeyti]`

**Example** (`js/arrays.mjs`):
```js
let acilisBeyti = 'Beni cândan usandırdı cefâdan yâr usanmaz mı'
let kapanisBeyti = 'Fuzûlî rind-i şeydâdır hemîşe halka rüsvâdır'
;[acilisBeyti, kapanisBeyti] = [kapanisBeyti, acilisBeyti]
console.log('form 3:', acilisBeyti, '-->', kapanisBeyti)
```
*(Normal atama karşılığı: `const temp = acilisBeyti; acilisBeyti = kapanisBeyti; kapanisBeyti = temp;`)*

**Output:** `form 3: Fuzûlî rind-i şeydâdır hemîşe halka rüsvâdır --> Beni cândan usandırdı cefâdan yâr usanmaz mı`

**Ne zaman kullanılır:** Geçici bir `temp` değişkeni oluşturmadan iki `let` değişkenini takas etmek istediğinde.

**Dikkat edilecek nokta:** Bir önceki satırda noktalı virgül yoksa `[` işaretinin başına `;` koymak gerekir, yoksa JavaScript bunu bir önceki satıra indeks erişimi sanır.

---

### Form 4: Dizilerde varsayılan değerler, `const [a = 1, b = 2] = []`

**Syntax:** `const [birinci = 'Beyit bulunamadı', ikinci = 'İkinci beyit henüz eklenmedi'] = eksikGazel`

**Example** (`js/arrays.mjs`):
```js
const eksikGazel = ['Öyle ser-mestem ki idrâk etmezem dünyâ nedür']
const [birinci = 'Beyit bulunamadı', ikinci = 'İkinci beyit henüz eklenmedi'] = eksikGazel
console.log('form 4:', birinci, '|', ikinci)
```
*(Normal atama karşılığı: `const ikinci = eksikGazel[1] !== undefined ? eksikGazel[1] : 'İkinci beyit henüz eklenmedi';`)*

**Output:** `form 4: Öyle ser-mestem ki idrâk etmezem dünyâ nedür | İkinci beyit henüz eklenmedi`

**Ne zaman kullanılır:** Dizi beklenenden kısa geldiğinde `undefined` yerine yedek bir değer kullanmak istediğinde.

**Dikkat edilecek nokta:** Varsayılan değer sadece `undefined` durumunda devreye girer, `null` için çalışmaz.

---

### Form 5: İsimle nesne özelliği alma, `let { a, b } = t`

**Syntax:** `let { baslik, nazimSekli } = fuzuliSiir`

**Example** (`js/objects.mjs`):
```js
let { baslik, nazimSekli } = fuzuliSiir
console.log('form 5:', baslik, '-', nazimSekli)
```
*(Normal atama karşılığı: `let baslik = fuzuliSiir.baslik; let nazimSekli = fuzuliSiir.nazimSekli;`)*

**Output:** `form 5: Su Kasidesi - Kaside`

**Ne zaman kullanılır:** Sürekli `fuzuliSiir.` yazmadan bir nesneden birkaç alanı çekmek istediğinde.

**Dikkat edilecek nokta:** Değişken isimleri nesnedeki anahtar isimleriyle birebir aynı olmalıdır.

---

### Form 6: Çekerken yeniden adlandırma, `const { a: alpha } = t`

**Syntax:** `const { mahlas: sairAdi, beyitSayisi: toplamBeyit } = fuzuliSiir`

**Example** (`js/objects.mjs`):
```js
const { mahlas: sairAdi, beyitSayisi: toplamBeyit } = fuzuliSiir
console.log('form 6:', sairAdi, toplamBeyit)
```
*(Normal atama karşılığı: `const sairAdi = fuzuliSiir.mahlas; const toplamBeyit = fuzuliSiir.beyitSayisi;`)*

**Output:** `form 6: Fuzûlî 32`

**Ne zaman kullanılır:** Nesnedeki anahtar adı mevcut bir değişkenle çakıştığında veya daha anlaşılır bir isim vermek istediğinde.

**Dikkat edilecek nokta:** `mahlas` diye bir değişken oluşmaz, sadece `sairAdi` oluşur (kaynak solda, yeni isim sağdadır).

---

### Form 7: Nesnelerde varsayılan değerler, `const { a = 1 } = t`

**Syntax:** `const { redif = 'su (varsayılan)', yazilisYili = '16. yüzyıl' } = fuzuliSiir`

**Example** (`js/objects.mjs`):
```js
const { redif = 'su (varsayılan)', yazilisYili = '16. yüzyıl' } = fuzuliSiir
console.log('form 7:', redif, '|', yazilisYili)
```
*(Normal atama karşılığı: `const redif = fuzuliSiir.redif !== undefined ? fuzuliSiir.redif : 'su (varsayılan)';`)*

**Output:** `form 7: su (varsayılan) | 16. yüzyıl`

**Ne zaman kullanılır:** Nesnedeki bir özellik isteğe bağlıysa veya eksik olma ihtimali varsa.

**Dikkat edilecek nokta:** Dizilerde olduğu gibi `null` değeri varsayılanı tetiklemez.

---

### Form 8: Nesnede rest kullanımı, `const { a, ...others } = t`

**Syntax:** `const { baslik: ayrilanBaslik, ...siirDetaylari } = fuzuliSiir`

**Example** (`js/objects.mjs`):
```js
const { baslik: ayrilanBaslik, ...siirDetaylari } = fuzuliSiir
console.log('form 8:', ayrilanBaslik, Object.keys(siirDetaylari))
```
*(Normal atama karşılığı: `baslik` dışındaki tüm özellikleri yeni bir nesneye kopyalar.)*

**Output:** `form 8: Su Kasidesi [ 'nazimSekli', 'mahlas', 'beyitSayisi', 'vezin', 'anahtarKelimeler' ]`

**Ne zaman kullanılır:** Bir iki alanı ayırıp geri kalan tüm özellikleri tek bir nesnede toplamak istediğinde (React prop'larında çok sık kullanılır).

**Dikkat edilecek nokta:** Yüzeysel (shallow) kopya oluşturur; iç içe nesneler hâlâ aynı referansı paylaşır.

---

### Form 9: İç içe kalıplar, `const { p: { x }, list: [first] } = t`

**Syntax:** `const { vezin: { kalip, bahr }, anahtarKelimeler: [ilkTema, ikinciTema] } = fuzuliSiir`

**Example** (`js/objects.mjs`):
```js
const {
  vezin: { kalip, bahr },
  anahtarKelimeler: [ilkTema, ikinciTema],
} = fuzuliSiir
console.log('form 9:', bahr, '->', kalip, '| temalar:', ilkTema, ikinciTema)
```
*(Normal atama karşılığı: `const kalip = fuzuliSiir.vezin.kalip; const ilkTema = fuzuliSiir.anahtarKelimeler[0];`)*

**Output:** `form 9: Remel -> Fâilâtün Fâilâtün Fâilâtün Fâilün | temalar: su naat`

**Ne zaman kullanılır:** Bir nesnenin içindeki başka bir nesneye veya diziye tek adımda ulaşmak istediğinde.

**Dikkat edilecek nokta:** Burada `vezin` ve `anahtarKelimeler` değişken olarak oluşmaz; sadece en içteki `kalip`, `bahr`, `ilkTema` ve `ikinciTema` oluşur.

---

### Form 10: Dinamik (hesaplanmış) anahtar, `const { [key]: value } = t`

**Syntax:** `const { [seciliOzellik]: dinamikDeger } = fuzuliSiir`

**Example** (`js/objects.mjs`):
```js
const seciliOzellik = 'nazimSekli'
const { [seciliOzellik]: dinamikDeger } = fuzuliSiir
console.log('form 10:', seciliOzellik, '=', dinamikDeger)
```
*(Normal atama karşılığı: `const dinamikDeger = fuzuliSiir[seciliOzellik];`)*

**Output:** `form 10: nazimSekli = Kaside`

**Ne zaman kullanılır:** Okunacak özellik adı sabit değil de bir değişkenin içinde tutuluyorsa.

**Dikkat edilecek nokta:** `: dinamikDeger` şeklinde yeni bir isim vermek zorunludur; tek başına `{ [seciliOzellik] }` yazmak `SyntaxError` verir.

---

### Form 11: Fonksiyon parametrelerinde destructuring, `function f({ a = 1, b } = {})`

**Syntax:** `function siirOzetle({ baslik, nazimSekli = 'Gazel', vezin = 'Remel bahri' } = {})`

**Example** (`js/params.mjs`):
```js
function siirOzetle({ baslik, nazimSekli = 'Gazel', vezin = 'Remel bahri' } = {}) {
  return `${baslik} (${nazimSekli}) - ${vezin}`
}
console.log('form 11:', siirOzetle({ baslik: 'Leylâ vü Mecnûn', nazimSekli: 'Mesnevi' }))
console.log('form 11 (varsayılan):', siirOzetle({ baslik: 'Beni Cândan Usandırdı' }))

const ilkBeyitFormatla = ([birinciMisra, ikinciMisra]) => `${birinciMisra} / ${ikinciMisra}`
```

**Output:**
```text
form 11: Leylâ vü Mecnûn (Mesnevi) - Remel bahri
form 11 (varsayılan): Beni Cândan Usandırdı (Gazel) - Remel bahri
form 11b: Âşiyân-ı mürg-i dil zülf-i perîşânındadır / Kanda olsam ey perî gönlüm senin yanındadır
```

**Ne zaman kullanılır:** Bir fonksiyon ayar nesnesi veya ikili bir dizi aldığında (örneğin React bileşenlerinde prop alırken).

**Dikkat edilecek nokta:** Fonksiyon hiç argüman verilmeden çağrılabilirse en sona `= {}` eklemek gerekir, yoksa `TypeError` hatası verir.

---

### Form 12: Döngülerde destructuring, `for (const [k, v] of Object.entries(o))`

**Syntax:** `for (const [ozellik, deger] of Object.entries(kasideBilgisi))`

**Example** (`js/params.mjs`):
```js
for (const [ozellik, deger] of Object.entries(kasideBilgisi)) {
  console.log('form 12 (object):', ozellik, '->', deger)
}
for (const [eserAdi, sayi] of beyitSayilari) {
  console.log('form 12 (map):', eserAdi, '=', sayi, 'beyit')
}
```

**Output:**
```text
form 12 (object): eser -> Su Kasidesi
form 12 (object): sair -> Fuzûlî
form 12 (object): redif -> su
form 12 (map): Su Kasidesi = 32 beyit
form 12 (map): Leylâ vü Mecnûn = 3096 beyit
form 12 (map): Beni Cândan Usandırdı = 7 beyit
```

**Ne zaman kullanılır:** `Object.entries()` veya `Map` içindeki `[anahtar, değer]` ikilileri üzerinde dönerken.

**Dikkat edilecek nokta:** Düz bir nesne üzerinde doğrudan `for...of` ile dönülemez; önce `Object.entries()` ile diziye çevirmek gerekir.

---

## Pitfalls

1. **`undefined` veya `null` destructure etmeye çalışmak kodu çökertir**
   - **Output:** `pitfall 1: TypeError - Cannot destructure property 'baslik' of 'undefined' as it is undefined.`
   - **Neden:** JavaScript `undefined` veya `null` değerini nesneye dönüştüremediği için üzerinden özellik okuyamaz.

2. **Varsayılan değerler `null` için çalışmaz**
   - **Output:** `pitfall 2: redif = null | nazimSekli = Mektup`
   - **Neden:** Varsayılan değerler yalnızca değer tam olarak `undefined` olduğunda devreye girer; `null` geçerli bir değer sayılır.

3. **`const`/`let` olmadan yeniden atama yaparken parantez gerekir**
   - **Output:** `pitfall 3: Beng ü Bâde`
   - **Neden:** `{` ile başlayan satırları JavaScript kod bloğu sanır; `({ baslik: mevcutBaslik } = yeniSiir)` şeklinde paranteze almak gerekir.

4. **Destructuring yalnızca yüzeysel (shallow) kopya yapar**
   - **Output:** `pitfall 4 (orijinal değişti): Klasik Türkçe`
   - **Neden:** İç içe nesneler kopyalanmaz, referansları paylaşılır; bu yüzden içerideki nesneyi değiştirmek orijinalini de değiştirir.

5. **Dizilerde sıra önemlidir, nesnelerde önemli değildir**
   - **Output:**
     `pitfall 5 (nesne): Hadîkatü’s-Süedâ | Mensur-Manzum`
     `pitfall 5 (dizi): Hadîkatü’s-Süedâ | Mensur-Manzum`
   - **Neden:** Nesneler değerleri sıraya bakmaksızın anahtar adıyla eşleştirir, diziler ise doğrudan indeks sırasına göre eşleştirir.

---

## Props and Children

### P1: `props` aslında tek bir nesnedir
`function BeyitKartiA(props)` ile `function BeyitKartiB({ baslik, children })` birebir aynı işi yapar. İkincisi sadece **Form 11** (parametrede destructuring) ve **Form 5** (isimle özellik çekme) kurallarını kullanır.
- **Output:**
  `P1 A: <section><h2>Su Kasidesi</h2>Saçma ey göz...</section>`
  `P1 B: <section><h2>Su Kasidesi</h2>Saçma ey göz...</section>`

### P2: `children` sıradan bir prop'tur
`<BeyitKartiB baslik="Gazel">Beni cândan usandırdı</BeyitKartiB>` yazmak ile `<BeyitKartiB baslik="Gazel" children="Beni cândan usandırdı"/>` yazmak bileşene tamamen aynı `props` nesnesini gönderir.
- **Output:**
  `P2 etiket: <section><h2>Gazel</h2>Beni cândan usandırdı</section>`
  `P2 prop: <section><h2>Gazel</h2>Beni cândan usandırdı</section>`

### P3: `children` neler olabilir?
React metinleri, sayıları, tek elementleri ve birden fazla elementi ekrana basar. `undefined`, `null` ve `false` değerlerini ise sessizce yok sayar (boş döner). Bir fonksiyon gönderildiğinde ekrana bir şey basmaz ve terminalde React uyarısı (`Functions are not valid as a React child`) verir.
- **Output:**
  `P3 string: <div>Fuzûlî</div>`
  `P3 number: <div>32</div>`
  `P3 tek element: <div><em>Remel bahri</em></div>`
  `P3 coklu element: <div><span>Matla</span><span>Makta</span></div>`
  `P3 undefined: <div></div>`
  `P3 null: <div></div>`
  `P3 false: <div></div>`
  `P3 fonksiyon: <div></div>`

### P4: `children` ve `...rest` ayrımı
`({ baslik, children, ...rest })` yazdığımızda `baslik` ve `children` ayıklanır, geriye kalan HTML özellikleri `<section {...rest}>` içine aktarılır. Çakışan özelliklerde **en sonda yazılan** kazanır:
- `<section id="varsayilan-id" {...rest}>` yazıldığında dışarıdan gelen `rest.id` varsayılanı ezer.
- `<section {...rest} id="sabit-id">` yazıldığında ise `sabit-id` kazanır.
- **Output:**
  `P4 rest sonra (rest kazanır): <section id="ozel-id" data-tur="mesnevi"><h3>Leylâ vü Mecnûn</h3>İçerik</section>`
  `P4 rest önce (sabit id kazanır): <section id="sabit-id" data-tur="mesnevi"><h3>Leylâ vü Mecnûn</h3>İçerik</section>`

### P5: İsimli prop'lar vs. `children`
İki yöntem de aynı HTML çıktısını üretebilir. Sabit bir şablonu ve belirli alanları olan bileşenlerde **isimli prop'ları** (`ustBilgi`, `ortaBeyit`, `altBilgi`), içine ne konulacağına bileşeni çağıran yerin karar vereceği esnek kutularda ise **`children`** yapısını tercih ederim.
- **Output:**
  `P5 props: <article><header>Fuzûlî - 16. Yüzyıl</header><p>Öyle ser-mestem ki idrâk etmezem dünyâ nedür</p><footer>Remel Bahri</footer></article>`
  `P5 children: <article><header>Fuzûlî - 16. Yüzyıl</header><p>Öyle ser-mestem ki idrâk etmezem dünyâ nedür</p><footer>Remel Bahri</footer></article>`

### P6: Prop varsayılanları (`undefined` vs. `null`)
`{ vezin = 'Vezin belirtilmedi' }` tanımında `vezin` hiç verilmezse veya `vezin={undefined}` olarak verilirse varsayılan metin görünür. `vezin={null}` verildiğinde ise varsayılan çalışmaz ve içi boş bir `<span>` basılır.
- **Output:**
  `P6 eksik: <span>Vezin belirtilmedi</span>`
  `P6 undefined: <span>Vezin belirtilmedi</span>`
  `P6 null: <span></span>`

### P7: TypeScript prop tipleri (`ts/props.tsx`)
- `children?: ReactNode`: Geçerli tüm React çocuklarına (metin, sayı, element, `null`, `undefined`, `boolean`) izin verir ama düz nesneleri engeller.
- `PropsWithChildren<{ baslik: string }>`: Kendi prop tipimize otomatik olarak `children?: ReactNode` ekler.
- `ComponentProps<'button'>`: Standart bir HTML `<button>` etiketinin tüm özelliklerini (`type`, `disabled`, `onClick`) ve `children` prop'unu içerir; geçersiz prop'ları (örneğin `href`) engeller.
- **Output:**
  `P7 Manuel: <div><strong>Divan</strong>: Türkçe Divan</div>`
  `P7 PropsWithChildren: <div><strong>Mesnevi</strong>: Beng ü Bâde</div>`
  `P7 ComponentProps: <button data-eser="SU-01" type="button" disabled="">Kasideden Beyit Oku</button>`

---

## JavaScript vs TypeScript

| Form / Durum | Aynı kalan kısım | TS'de eklenen | Yanlış yapıldığında alınan hata |
| :--- | :--- | :--- | :--- |
| **Form 1 (Tuple dönüşü)** | `const [matla, makta] = f()` | `: [string, string]` dönüş tipi | `TS2493: Tuple type '[string, string]' of length '2' has no element at index '2'.` |
| **Form 2 (Dizi indeksi)** | `const [, ikinciBeyit] = list` | `!== undefined` kontrolü veya `??` (`noUncheckedIndexedAccess`) | `TS18048: 'ikinciBeyit' is possibly 'undefined'.` |
| **Form 3 (Takas / Swap)** | `[a, b] = [b, a]` | İki `let` değişkeninin aynı tipte olması | `TS2322: Type 'number' is not assignable to type 'string'.` |
| **Form 5 (Nesne alanları)** | `const { baslik, nazimSekli } = obj` | Geçerli anahtarları tanımlayan nesne `type` tanımı | `TS2339: Property 'kafiye' does not exist on type 'FuzuliEseri'.` |
| **Form 6 / T1 (İsim değiştirme vs tip)** | `{ mahlas: sairAdi }` | Tip kalıbın *sonuna* yazılır: `: { mahlas: string }` | `TS2339: Property 'string' does not exist on type ...` |
| **Form 7 / T4 (İsteğe bağlı + varsayılan)** | `const { redif = 'yok' } = obj` | Tipte `redif?: string`; varsayılan değer tipi `string` yapar | `TS18048: 'opsiyonelRedif' is possibly 'undefined'.` |
| **Form 10 (Dinamik anahtar)** | `const { [key]: val } = obj` | `key: keyof FuzuliEseri` | `TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'FuzuliEseri'.` |
| **Form 11 (Fonksiyon parametresi)** | `function f({ baslik } = {})` | Kalıbın sonuna `: SiirOzetiGirdisi` tipi | `TS2554: Expected 1 arguments, but got 0.` |
| **React `children`** | `function Card({ title, children })` | `children?: ReactNode` veya `PropsWithChildren` | `TS2339: Property 'children' does not exist on type 'BeyitKartiProps'.` |

---

## Bonus 4: Git repository

Repository link: [https://github.com/mferidenurturkun/mis233-assignment4](https://github.com/mferidenurturkun/mis233-assignment4)

Repo `.gitignore` ile `node_modules` klasörünü hariç tutar; `git clone`, `npm install` ve `npm run all` adımlarından sonra doğrudan çalışır ve geliştirme sürecini adım adım gösteren commit geçmişini içerir.





##MY OWN LOG <3<3<3<3

1. "npm run all > output.txtnpm run all | Out-File -FilePath output.txt -Encoding utf8" komutunu yazınca önce "Functions are not valid as a React child. This may happen if you return children instead of <children /> from render. Or maybe you meant to call this function rather than return it." yazısı çıktı. Sonra meğer yanlış komut yazmışım. "npm run all | Out-File -FilePath output.txt -Encoding utf8" yazdım ve çalıştırınca yine aynı mesaj çıktı. Ama sonra gerçekten de output.txt dosyamın oluşturulduğunu gördüm.
Ayrıca konuyu daha detaylı öğrenmek için Gemini'ya sordum. "bunu daha da açıklar mısın? ne zman böyle bir görünmez komutu yazdık ve bu komut ne işe yarıyor? "


Şöyle bir açıklama yaptı, fonksiyon bizi children olarak bozmuyor ama terminalde hata uyarısı vari bir mesaj veriyor. Aslında yine boş dönüyor ama bir uyarı da veriyor düzeltelim diye.

2. Yanlışlıkla `output.txtnpm` dosyası oluşturdum :P Çünkü "npm run all" komutunda output.txt'ime UTF-8 eklemeye çaılışırken 'output.txtnpm` diye bir şey oldu. Garip gurup işler ama neyseki Gemini bana şu kodu verdi `npm run all | Out-File -FilePath output.txt -Encoding utf8` ben de bunu yazıp düzelttim. Bu sayede şapkalı harflerim gözüküyorrr :D

3. Kodumda `Fuzûlî` ve Türkçe harfler antin kuntin çıktı (`├ğ`, `├╝`)  İlk output.txt dosyasını oluştururken  `npm run all | Out-File -FilePath output.txt -Encoding utf8` şu kod ile oluşturmuştum ama anlaşılan yeterli olmadı :( Ben de sonra Gemini ile `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8` komutunu yazdım ve sonunda harflerim düzeldi.

4. js/arrays.mjs dosyasında form 2'de const [, ikinciBeyit, ...digerBeyitler] = null dedim ve 
TypeError: null is not iterable hatası verdi.

5. js/arrays.mjs dosyasında form 3'te altı üstü oradaki (;) noktalı virgül işaretini sildim. Hata verdi ve Form 4'ü basmadı bile :/ 
ReferenceError: Cannot access 'kapanisBeyti' before initialization 

6. js/arrays.mjs dosyasında form 4'te deney olarak 'İkinci beyit henüz eklenmedi' yerine undefined koydum ama yine aynı "ikinci beyit...." çıktısını verdi. He ama null dedim null döndü?

7. js/objects.mjs form 6'da console.log'a sairAdi demek yerine mahlas dedim ama ReferenceError: mahlas is not defined hatası verdi. 

8. js/objects.mjs form 7'de redif'in yanındaki su yerine null ardından undefined yazdım. İkisini de normal string olarak bastı ama fuzuliSiir'in içine redif: null veya redif: undefined yazarsam null için kalın bir null basıyor ama undefined'da su(varsayılan) basıyor. Form 6'da tam tersi konumdakini yazdırmak gerekiyordu ama orada  iki nokta (:)  işareti kullanmıştık burada eşittir (=) farklı işliyor.

9. js/objects.mjs form 9'da fuzuliSiir'in içindeki vezni vezin: undefined yaptım ve TypeError: Cannot read properties of undefined (reading 'kalip') hatası verdi.

10. js/objects.mjs form 10'da dinamikDeger kısmını sildim ama SyntaxError: Unexpected token '[' hatası verdi.



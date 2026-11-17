// Mübeccel Feride Nur Türkün, 2024502063
// Props and children in TypeScript (P1 to P7). Run with `npx tsx ts/props.tsx`.
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// P1 & P2: Props tek bir nesnedir ve children sadece bir prop'tur.
type BeyitKartiProps = {
  baslik: string
  children?: ReactNode
}

function BeyitKartiA(props: BeyitKartiProps) {
  return (
    <section>
      <h2>{props.baslik}</h2>
      {props.children}
    </section>
  )
}

function BeyitKartiB({ baslik, children }: BeyitKartiProps) {
  return (
    <section>
      <h2>{baslik}</h2>
      {children}
    </section>
  )
}
console.log('P1/P2 TS A:', renderToStaticMarkup(<BeyitKartiA baslik="Su Kasidesi">Saçma ey göz...</BeyitKartiA>))
console.log('P1/P2 TS B:', renderToStaticMarkup(<BeyitKartiB baslik="Su Kasidesi" children="Saçma ey göz..." />))

// P3: ReactNode tipi; string, number, element, null, undefined ve boolean değerlerini kabul eder.
function Kutu({ children }: { children?: ReactNode }) {
  return <div>{children}</div>
}
console.log('P3 TS string:', renderToStaticMarkup(<Kutu>Fuzûlî</Kutu>))
console.log('P3 TS number:', renderToStaticMarkup(<Kutu>{32}</Kutu>))
console.log('P3 TS element:', renderToStaticMarkup(<Kutu><em>Remel bahri</em></Kutu>))
console.log('P3 TS null/false:', renderToStaticMarkup(<Kutu>{null}{false}{undefined}</Kutu>))

// P4: rest yayma sırası (ComponentProps<'section'> ile tüm HTML section özelliklerini destekler)
type SiirBolumuProps = ComponentProps<'section'> & {
  baslik: string
}
function SiirBolumu({ baslik, children, ...rest }: SiirBolumuProps) {
  return (
    <section id="varsayilan-id" {...rest}>
      <h3>{baslik}</h3>
      {children}
    </section>
  )
}
console.log(
  'P4 TS:',
  renderToStaticMarkup(
    <SiirBolumu baslik="Leylâ vü Mecnûn" id="ozel-id" className="gazel-kutu">
      İçerik
    </SiirBolumu>
  )
)

// P5: Named props vs children tasarımı
type PropTabanliProps = { ustBilgi: ReactNode; ortaBeyit: string; altBilgi: ReactNode }
function PropTabanliGazel({ ustBilgi, ortaBeyit, altBilgi }: PropTabanliProps) {
  return (
    <article>
      <header>{ustBilgi}</header>
      <p>{ortaBeyit}</p>
      <footer>{altBilgi}</footer>
    </article>
  )
}
console.log(
  'P5 TS:',
  renderToStaticMarkup(<PropTabanliGazel ustBilgi="Fuzûlî" ortaBeyit="Öyle ser-mestem..." altBilgi="Gazel" />)
)

// P6: Varsayılan değerler (`string | null | undefined` tipinde davranış)
function VezinEtiketi({ vezin = 'Vezin belirtilmedi' }: { vezin?: string | null }) {
  return <span>{vezin}</span>
}
console.log('P6 TS undefined:', renderToStaticMarkup(<VezinEtiketi vezin={undefined} />))
console.log('P6 TS null:', renderToStaticMarkup(<VezinEtiketi vezin={null} />))

// P7: children?: ReactNode vs PropsWithChildren<P> vs ComponentProps<'button'>
// 1) Manuel ReactNode: yalnızca tanımlanan prop'lara izin verir.
type ManuelKutuProps = { baslik: string; children?: ReactNode }
function ManuelKutu({ baslik, children }: ManuelKutuProps) {
  return <div><strong>{baslik}</strong>: {children}</div>
}

// 2) PropsWithChildren<P>: kendi prop tipimize otomatik olarak `children?: ReactNode` ekler.
type OtomatikKutuProps = PropsWithChildren<{ baslik: string }>
function OtomatikKutu({ baslik, children }: OtomatikKutuProps) {
  return <div><strong>{baslik}</strong>: {children}</div>
}

// 3) ComponentProps<'button'>: bir HTML <button> elementinin tüm yerleşik prop'larını (onClick, disabled, type vb.) ve children'ı içerir.
type SiirButonuProps = ComponentProps<'button'> & { eserKodu: string }
function SiirButonu({ eserKodu, children, ...rest }: SiirButonuProps) {
  return <button data-eser={eserKodu} {...rest}>{children}</button>
}

console.log('P7 Manuel:', renderToStaticMarkup(<ManuelKutu baslik="Divan">Türkçe Divan</ManuelKutu>))
console.log('P7 PropsWithChildren:', renderToStaticMarkup(<OtomatikKutu baslik="Mesnevi">Beng ü Bâde</OtomatikKutu>))
console.log(
  'P7 ComponentProps:',
  renderToStaticMarkup(
    <SiirButonu eserKodu="SU-01" type="button" disabled>
      Kasideden Beyit Oku
    </SiirButonu>
  )
)
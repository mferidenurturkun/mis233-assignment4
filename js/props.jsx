// Mübeccel Feride Nur Türkün, 2024502063
// Props and children in plain JavaScript (JSX). Run with `npx tsx js/props.jsx`.
import { renderToStaticMarkup } from 'react-dom/server'

// P1: props tek bir nesnedir. Parametre destructuring (Form 11 + Form 5) ile parçalanır.
function BeyitKartiA(props) {
  return (
    <section>
      <h2>{props.baslik}</h2>
      {props.children}
    </section>
  )
}
function BeyitKartiB({ baslik, children }) {
  return (
    <section>
      <h2>{baslik}</h2>
      {children}
    </section>
  )
}
console.log('P1 A:', renderToStaticMarkup(<BeyitKartiA baslik="Su Kasidesi">Saçma ey göz...</BeyitKartiA>))
console.log('P1 B:', renderToStaticMarkup(<BeyitKartiB baslik="Su Kasidesi">Saçma ey göz...</BeyitKartiB>))

// P2: children özel bir sihir değil, sadece bir prop'tur.
console.log('P2 etiket:', renderToStaticMarkup(<BeyitKartiB baslik="Gazel">Beni cândan usandırdı</BeyitKartiB>))
console.log('P2 prop:', renderToStaticMarkup(<BeyitKartiB baslik="Gazel" children="Beni cândan usandırdı" />))

// P3: children yerine gelebilecek farklı veri tipleri
function Kutu({ children }) {
  return <div>{children}</div>
}
console.log('P3 string:', renderToStaticMarkup(<Kutu>Fuzûlî</Kutu>))
console.log('P3 number:', renderToStaticMarkup(<Kutu>{32}</Kutu>))
console.log('P3 tek element:', renderToStaticMarkup(<Kutu><em>Remel bahri</em></Kutu>))
console.log(
  'P3 coklu element:',
  renderToStaticMarkup(
    <Kutu>
      <span>Matla</span>
      <span>Makta</span>
    </Kutu>
  )
)
console.log('P3 undefined:', renderToStaticMarkup(<Kutu>{undefined}</Kutu>))
console.log('P3 null:', renderToStaticMarkup(<Kutu>{null}</Kutu>))
console.log('P3 false:', renderToStaticMarkup(<Kutu>{false}</Kutu>))
console.log('P3 fonksiyon:', renderToStaticMarkup(<Kutu>{() => 'görünmez'}</Kutu>))

// P4: children ve özel prop'ları ...rest ile ayırma ve yayma (spread) sırası
function SiirBolumu({ baslik, children, ...rest }) {
  return (
    <section id="varsayilan-id" {...rest}>
      <h3>{baslik}</h3>
      {children}
    </section>
  )
}
function SabitIdBolumu({ baslik, children, ...rest }) {
  return (
    <section {...rest} id="sabit-id">
      <h3>{baslik}</h3>
      {children}
    </section>
  )
}
console.log(
  'P4 rest sonra (rest kazanır):',
  renderToStaticMarkup(
    <SiirBolumu baslik="Leylâ vü Mecnûn" id="ozel-id" data-tur="mesnevi">
      İçerik
    </SiirBolumu>
  )
)
console.log(
  'P4 rest önce (sabit id kazanır):',
  renderToStaticMarkup(
    <SabitIdBolumu baslik="Leylâ vü Mecnûn" id="ozel-id" data-tur="mesnevi">
      İçerik
    </SabitIdBolumu>
  )
)

// P5: Aynı bileşenin iki farklı tasarımı (Named props vs children)
function PropTabanliGazel({ ustBilgi, ortaBeyit, altBilgi }) {
  return (
    <article>
      <header>{ustBilgi}</header>
      <p>{ortaBeyit}</p>
      <footer>{altBilgi}</footer>
    </article>
  )
}
function ChildrenTabanliGazel({ children }) {
  return <article>{children}</article>
}
console.log(
  'P5 props:',
  renderToStaticMarkup(
    <PropTabanliGazel
      ustBilgi="Fuzûlî - 16. Yüzyıl"
      ortaBeyit="Öyle ser-mestem ki idrâk etmezem dünyâ nedür"
      altBilgi="Remel Bahri"
    />
  )
)
console.log(
  'P5 children:',
  renderToStaticMarkup(
    <ChildrenTabanliGazel>
      <header>Fuzûlî - 16. Yüzyıl</header>
      <p>Öyle ser-mestem ki idrâk etmezem dünyâ nedür</p>
      <footer>Remel Bahri</footer>
    </ChildrenTabanliGazel>
  )
)

// P6: Varsayılan değerler (undefined tetikler, null tetiklemez)
function VezinEtiketi({ vezin = 'Vezin belirtilmedi' }) {
  return <span>{vezin}</span>
}
console.log('P6 eksik:', renderToStaticMarkup(<VezinEtiketi />))
console.log('P6 undefined:', renderToStaticMarkup(<VezinEtiketi vezin={undefined} />))
console.log('P6 null:', renderToStaticMarkup(<VezinEtiketi vezin={null} />))
import Image from "next/image";

export default function Shop() {
  return (
    <div className="container">
          <header className="header">
  <div className="header-container">
    <h1>Lila & Kaiou</h1>
    <nav>
      <ul>
       {/*} <li><a href="#series">Série</a></li>*/}
        <li><a href="#products">Produits</a></li>
        <li><a href="#parents">Parents</a></li>
        <li><a href="/#contact">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>
<h1>Boutique</h1>

      <div className="product-card">
        <h2>Lila & Kaiou – Pâte magique</h2>
	<Image src="/Pot200gr.png" alt="Lila & Kaiou" width={300} height={200} />
        <p>
          Une pâte à modeler créative inspirée de l’univers de Lila & Kaiou.
        </p>

        <a 
  href="https://buy.stripe.com/aFaaEX1S90DB0qP5yk73G00"
  target="_blank"
  className="cta-button"
>
  Acheter
</a>
      </div>
    </div>
  );
}
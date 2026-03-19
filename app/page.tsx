import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
  <div className="header-container">
    <h1>Lila & Kaiou</h1>
    <nav>
      <ul>
        <li><a href="#series">Série</a></li>
        <li><a href="#products">Produits</a></li>
        <li><a href="#parents">Parents</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>

      {/* Hero */}
      <div className="hero">
        <Image src="/lila_kaiou.png" alt="Lila & Kaiou" width={600} height={400} />
        <h2>Découvrez le monde magique de Lila et Kaiou !</h2>
        <button>Voir les épisodes</button>
      </div>

      {/* Série */}
      <section id="series">
        <h2>Premiers épisodes</h2>
        <ul>
          <li>
            <strong>1️⃣ La communication résout les problèmes</strong>
            <p>Le papa s’énerve mais Kaia se transforme pour montrer l’importance de la communication.</p>
          </li>
          <li>
            <strong>2️⃣ Partager rend heureux</strong>
            <p>Lila apprend que partager ses jouets crée plus de plaisir.</p>
          </li>
          <li>
            <strong>3️⃣ La créativité ouvre des portes</strong>
            <p>Kaia aide Lila à transformer les objets pour inventer de nouvelles solutions.</p>
          </li>
        </ul>
      </section>

      {/* Produits */}
      <section id="products">
        <h2>Produits dérivés</h2>
        <p>Livres, figurines, pâte à modeler éducative, jeux interactifs, et plus encore !</p>
	  <Image src="/Kaiou.png" alt="Kaiou" width={300} height={200} />
	  <Image src="/lila.png" alt="Lila" width={300} height={200} />
	  
      </section>

      {/* Parents */}
      <section id="parents">
        <h2>Informations pour les parents</h2>
        <p>Recommandations d’âge : 5-8 ans, contenu éducatif et sûr, conseils pour suivre les épisodes avec votre enfant.</p>
      </section>

      {/* Contact */}
      <section id="contact">
        <h2>Contact</h2>
        <p>Pour licences, presse ou collaborations : contact@lilaetkaiou.com</p>
      </section>
    </div>
  );
}
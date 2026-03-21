import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <div id="products" className="container">
      <Header />

      <div className="hero">
        <Image
          src="/lila_kaiou.png"
          alt="Lila & Kaiou"
          width={600}
          height={400}
        />

        <h2>Découvrez la pâte à modeler naturelle de Lila & Kaiou</h2>

        <p>
          Créez, transformez et donnez vie à votre imagination dans un univers
          magique pensé pour les enfants et leurs familles.
        </p>

        <Link href="/shop" className="cta-button">
          Visiter la boutique
        </Link>
      </div>

      <section className="home-section">
        <h2>Pourquoi Lila & Kaiou ?</h2>

        <div className="home-cards">
          <div className="info-card">
            <h3>🌿 Naturelle</h3>
            <p>Fabriquée exclusivement à base de produits alimentaires.
            </p>
		<p>
              Une pâte à modeler pensée pour une expérience douce, simple et
              agréable à manipuler.</p> 
          </div>

          <div className="info-card">
            <h3>🎨 Créative</h3>
            <p>
              Elle encourage les enfants à inventer, modeler et raconter leurs
              propres histoires.
            </p>
          </div>

          <div className="info-card">
            <h3>✨ Inspirée d’un univers magique</h3>
            <p>
              Tout en aidant les enfants à développer leur créativité, Lila & Kaiou véhicule de vraies valeurs que sont l'amour, le partage et l'empathie.
            </p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2>Un aperçu de la boutique</h2>
        <p>
          Retrouvez les premières créations Lila & Kaiou, conçues pour mêler
          imagination, jeu et émotion.
        </p>

        <div className="products-images">
          <Image src="/Pot200gr.png" alt="Pâte magique 200g" width={280} height={220} />
          <Image src="/Kaiou.png" alt="Kaiou" width={280} height={220} />
        </div>

        <div className="home-center-button">
          <Link href="/shop" className="cta-button">
            Voir les produits
          </Link>
        </div>
      </section>

      <section id="parents" className="home-section">
        <h2>Pour les parents</h2>

        <div className="home-cards">
          <div className="info-card">
            <h3>💛 Jeu créatif</h3>
            <p>
              Une activité saine qui stimule l’imagination, la manipulation et
              l’expression personnelle.
            </p>
          </div>

          <div className="info-card">
            <h3>🔒 Paiement sécurisé</h3>
            <p>
              Les paiements sont traités via Stripe avec collecte de l’adresse
              de livraison au moment du checkout.
            </p>
          </div>

          <div className="info-card">
            <h3>📦 Commande simple</h3>
            <p>
              Choisissez vos produits, ajoutez-les au panier, validez votre
              paiement et nous préparons votre commande.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="home-section">
        <h2>Contact</h2>
        <p>Pour licences, presse ou collaborations :  <a href="mailto:contact@lilaetkaiou.com">contact@lilaetkaiou.com</a></p>
      </section>
    </div>
  );
}
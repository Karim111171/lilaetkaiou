"use client";
import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="container legal-page">
      <div className="legal-header">
        <h1>Mentions légales & Conditions Générales de Vente</h1>
      </div>

      <section>
        <h2>1. Éditeur du site</h2>
        <p>
          Lila & Kaiou<br />
          Email : contact@lilaetkaiou.com<br />
        </p>
      </section>

      <section>
        <h2>2. Hébergement</h2>
        <p>
          Site hébergé par Netlify<br />
          https://www.netlify.com
        </p>
      </section>

      <section>
        <h2>3. Produits</h2>
        <p>
          Les produits proposés sont des articles de pâte à modeler éducative
          inspirés de l’univers Lila & Kaiou.
        </p>
      </section>

      <section>
        <h2>4. Prix</h2>
        <p>
          Les prix sont indiqués en euros (€), toutes taxes comprises.
        </p>
      </section>

      <section>
        <h2>5. Paiement</h2>
        <p>
          Les paiements sont sécurisés via Stripe. Aucune donnée bancaire n’est
          stockée sur le site.
        </p>
      </section>

      <section>
        <h2>6. Livraison</h2>
        <p>
          Les produits sont livrés à l’adresse indiquée lors de la commande.
          Les délais peuvent varier selon la destination.
        </p>
      </section>

      <section>
        <h2>7. Droit de rétractation</h2>
        <p>
          Conformément à la législation en vigueur, vous disposez d’un délai de
          14 jours pour exercer votre droit de rétractation.
        </p>
      </section>

      <section>
        <h2>8. Contact</h2>
        <p>
          Pour toute question, vous pouvez nous contacter à :
          contact@lilaetkaiou.com
        </p>
      </section>

      <div className="legal-button">
        <Link href="/" className="cta-button">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
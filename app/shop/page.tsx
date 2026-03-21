"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../../lib/products";

export default function Shop() {
  const { addToCart } = useCart();

  const handleCheckout = async (product: { id: number }) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              id: product.id,
              quantity: 1,
            },
          ],
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur checkout");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur");
    }
  };

  return (
    <div className="container">
      <Header />

      <div className="shop-hero">
        <h1>Boutique</h1>
        <p>Bienvenue dans la boutique de Lila & Kaiou.</p>
      </div>

      <div className="products-grid">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="product-card enhanced-product-card">
            <h2>{product.name}</h2>

            <div className="product-image-wrap">
              <Image
                src={product.image}
                alt={product.name}
                width={320}
                height={240}
              />
            </div>

            <p className="product-description">{product.description}</p>

            <p className="product-price">
              <strong>{product.price.toFixed(2)} €</strong>
            </p>

            <div className="product-benefits">
              <p>✨ Stimule l’imagination</p>
              <p>🌿 Texture douce et agréable</p>
              <p>🎨 Inspire le jeu créatif</p>
            </div>

            <div className="product-actions">
              <button
                onClick={() => addToCart(product)}
                className="cta-button secondary-button"
              >
                Ajouter au panier
              </button>

              <button
                onClick={() =>
                  handleCheckout({
                    id: product.id,
                  })
                }
                className="cta-button"
              >
                Acheter maintenant
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="shop-info">
        <div className="shop-info-block">
          <h2>Pourquoi les parents aiment Lila & Kaiou ?</h2>
          <p>
            Notre pâte à modeler invite les enfants à inventer, transformer et
            raconter leurs propres histoires dans un univers doux et magique.
          </p>
        </div>

        <div className="shop-info-block">
          <h2>Paiement & livraison</h2>
          <p>
            Paiement sécurisé via Stripe. L’adresse de livraison est demandée au
            moment du paiement pour une commande simple et fluide.
          </p>
        </div>

        <div className="shop-info-block">
          <h2>L’univers Lila & Kaiou</h2>
          <p>
            Plus qu’un produit, c’est une porte d’entrée vers un monde créatif
            où les enfants peuvent imaginer, modeler et donner vie à leurs idées.
          </p>
        </div>
      </section>

      <div className="shop-back-home">
        <Link href="/" className="cta-button">
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
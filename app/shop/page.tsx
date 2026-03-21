"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function Shop() {
  const { addToCart, totalItems } = useCart();

  const products = [
    {
      id: 1,
      name: "Lila & Kaiou – Pâte magique 200g",
      price: 19.99,
      image: "/Pot200gr.png",
    },
    {
      id: 2,
      name: "Lila & Kaiou – Pâte magique Kaiou",
      price: 24.99,
      image: "/Kaiou.png",
    },
  ];

  const handleCheckout = async (product: { name: string; price: number }) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              name: product.name,
              price: product.price,
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
      <header className="header">
        <div className="header-container">
          <h1>Lila & Kaiou</h1>
          <nav>
            <ul>
              <li><Link href="/#products">Produits</Link></li>
              <li><Link href="/#parents">Parents</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
              <li><Link href="/cart">Panier ({totalItems})</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <h1>Boutique</h1>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>

            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
            />

            <p>
              Une pâte à modeler créative inspirée de l’univers de Lila & Kaiou.
            </p>

            <p><strong>{product.price.toFixed(2)} €</strong></p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => addToCart(product)}
                className="cta-button"
              >
                Ajouter au panier
              </button>

              <button
                onClick={() => handleCheckout(product)}
                className="cta-button"
              >
                Acheter maintenant
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
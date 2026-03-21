"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    localStorage.removeItem("cart");
  }, [clearCart]);

  return (
    <div className="container">
      <header className="header">
        <div className="header-container">
          <h1>Lila & Kaiou</h1>
          <nav>
            <ul>
              <li><Link href="/shop">Boutique</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <section>
        <h1>Merci pour votre commande 💛</h1>
        <p>
          Votre paiement a bien été reçu. Nous préparerons votre commande très bientôt.
        </p>

        <div style={{ marginTop: "20px" }}>
          <Link href="/shop" className="cta-button">
            Retour à la boutique
          </Link>
        </div>
      </section>
    </div>
  );
}
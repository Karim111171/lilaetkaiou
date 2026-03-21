"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import Header from "../../components/Header";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    localStorage.removeItem("cart");
  }, [clearCart]);

  return (
    <div className="container">
      <Header />

      <section>
        <h1>Merci pour votre commande 💛</h1>
        <p>
          Votre paiement a bien été reçu. Nous préparerons votre commande très bientôt.
        </p>

        <div style={{ marginTop: "20px" }}>
          <a href="/shop" className="cta-button">
  Retour à la boutique
</a>
        </div>
      </section>
    </div>
  );
}
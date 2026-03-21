"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";
import Header from "../../components/Header";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  const handleCartCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
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

      <h1>Panier</h1>

      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <p>{totalItems} article(s)</p>

          <div className="cart-grid">
            {cart.map((item) => (
              <div key={item.id} className="product-card">
                <h2>{item.name}</h2>

                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={220}
                    height={160}
                  />
                )}

                <p>Prix unitaire : {item.price.toFixed(2)} €</p>
                <p>Quantité : {item.quantity}</p>
                <p>Sous-total : {(item.price * item.quantity).toFixed(2)} €</p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    -
                  </button>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                  <button onClick={() => removeFromCart(item.id)}>
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2>Total : {totalPrice.toFixed(2)} €</h2>

          <button onClick={handleCartCheckout} className="cta-button">
            Passer au paiement
          </button>
        </>
      )}
    </div>
  );
}
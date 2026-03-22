"use client";

import Link from "next/link";
import { useCart } from "../app/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <h1><Link href="/#products">Lila & Kaiou</Link></h1>
        <nav>
          <ul>
            <li><Link href="/shop" >Boutique</Link></li>
		<li><Link href="/stories">Histoires</Link></li>
            {/*<li><Link href="/#parents">Parents</Link></li>*/}
            <li><Link href="/#contact">Contact</Link></li>
            <li><Link href="/cart">Panier ({totalItems})</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
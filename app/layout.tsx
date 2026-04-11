import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Footer from "../components/Footer";

export const metadata = {
  title: "Lila & Kaiou",
  description: "La pâte à modeler naturelle de Lila & Kaiou",
   icons: {
    icon: "/lila_kaiou",        // pour favicon standard
    shortcut: "/poupeekaiou.png",    // pour raccourci
    apple: "/poupeekaiou.png",       // pour iOS (optionnel)
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
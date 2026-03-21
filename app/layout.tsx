import "./globals.css";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "Lila & Kaiou",
  description: "La pâte à modeler naturelle de Lila & Kaiou",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
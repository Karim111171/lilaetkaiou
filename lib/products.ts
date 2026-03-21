export type Product = {
  id: number;
  name: string;
  shortName?: string;
  price: number;
  image: string;
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Pâte à modeler naturelle Lila & Kaiou – 200g",
    shortName: "Pâte magique 200g",
    price: 4.99,
    image: "/Pot200gr.png",
    description:
      "Une pâte à modeler naturelle, douce et créative inspirée de l’univers magique de Lila & Kaiou.",
  },
  {
    id: 2,
    name: "Pâte à modeler naturelle Lila & Kaiou – Kaiou",
    shortName: "Pâte magique Kaiou",
    price: 14.99,
    image: "/Kaiou.png",
    description:
      "Une version inspirée du personnage Kaiou pour enrichir le jeu, l’imagination et l’univers créatif des enfants.",
  },
  {
    id: 1,
    name: "Pâte à modeler naturelle Lila & Kaiou – 6 x 200g",
    shortName: "Pâte magique 200g",
    price: 24.99,
    image: "/Pot200gr.png",
    description:
      "Une pâte à modeler naturelle, douce et créative inspirée de l’univers magique de Lila & Kaiou.",
  },
];

export const PRODUCTS_BY_ID = Object.fromEntries(
  PRODUCTS.map((product) => [product.id, product])
) as Record<number, Product>;
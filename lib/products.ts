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
    name: "Pâte à modeler naturelle Lila & Kaiou – 100g",
    shortName: "Pâte à modeler 100g",
    price: 7.50,
    image: "/Pot200gr.png",
    description:
      "Une pâte à modeler naturelle, douce et créative inspirée de l’univers magique de Lila & Kaiou.",
  },
  {
    id: 2,
    name: "Pâte à modeler naturelle Lila & Kaiou – 6 x 100g",
    shortName: "Pâte à modeler 200g",
    price: 39.00,
    image: "/6pack_no_bg.png",
    description:
      "Une pâte à modeler naturelle, douce et créative inspirée de l’univers magique de Lila & Kaiou.",
  },
  {
    id: 21,
    name: "Stand de Pâte à modeler naturelle Lila & Kaiou – 36 x 100g",
    shortName: "Pâte à modeler 200g",
    price: 39.00,
    image: "/36pack.png",
    description:
      "Une pâte à modeler naturelle, douce et créative inspirée de l’univers magique de Lila & Kaiou.",
  },
  {
    id: 3,
    name: "Magic Bucket  Lila & Kaiou – 600gr",
    shortName: "Pâte magique 600g",
    price: 45.00,
    image: "/potmagic.png",
    description:
      "Une pâte à modeler naturelle, avec une activité inspirée de l’univers magique de Lila & Kaiou.",
  },
  {
    id: 4,
    name: "Poupée Kaiou – Lila & Kaiou – 17cm",
    shortName: "Poupée Kaiou",
    price: 24.00,
    image: "/poupeekaiou.png",
    description:
      "La poupée Kaiou est le doudou préféré de Lila ! – Inspirée de l’univers magique de Lila & Kaiou.",
  },
  {
    id: 5,
    name: "Poupée Lila – Lila & Kaiou – 29cm",
    shortName: "Poupée Lila",
    price: 29.00,
    image: "/poupeelila.png",
    description:
      "La poupée Lila est le doudou préféré de Kaia ! – Inspirée de l’univers magique de Lila & Kaiou.",
  },
  {
    id: 6,
    name: "Ciné Kaiou – Lila & Kaiou – 7cmx4cm",
    shortName: "Stop Motion Kaiou",
    price: 9.00,
    image: "/Kaiou.png",
    description:
      "Carnets cartonnés pour réaliser des animations et stimuler la créativité chez l'enfant. Lila en crayons et Kaiou la gomme",
  },
   {
    id: 7,
    name: "Double Familly – Lila & Kaiou – 8cmx5cm",
    shortName: "Stop Kaiou",
    price: 19.00,
    image: "/double-face.webp",
    description:
      "Jeux de carte éducatif et d'eveil pour enfants a partir de 5 ans. Créé par Kaia pour jouer avec sa famille adorée",
  },
  {
    id: 8,
    name: "Stop Kaiou – Lila & Kaiou – 12cm",
    shortName: "Poupée Kaiou",
    price: 29.00,
    image: "/poupeekaiou.png",
    description:
      "Le stop porte le plus mignon ! Kaiou sert à tout et à tous ! – Inspirée de l’univers magique de Lila & Kaiou.",
  },
  {
    id: 9,
    name: "T-night – Lila & Kaiou – 12cm",
    shortName: "T-shirt Kaiou",
    price: 19.00,
    image: "/t-night.png",
    description:
      "Le T-shirt pyjama Kaiou ! Vous ne dormirez pas seul ce soir! – Inspirée de l’univers magique de Lila & Kaiou.",
  },
];

export const PRODUCTS_BY_ID = Object.fromEntries(
  PRODUCTS.map((product) => [product.id, product])
) as Record<number, Product>;
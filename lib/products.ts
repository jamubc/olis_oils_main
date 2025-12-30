export interface Product {
  id: string;
  name: string;
  price: number; // in cents
  currency: string;
  size: string;
  image: string;
  description: string;
  ingredients: string;
  scent: string;
}

export const products: Product[] = [
  {
    id: "sapling",
    name: "Sapling",
    price: 2500, // $25 CAD in cents
    currency: "CAD",
    size: "100 ml",
    image: "/sapling.png",
    description: "Sapling is a light, fast-absorbing blend of cedar extract infused in jojoba oil, made for both hair and skin. It nourishes without feeling heavy, leaving hair soft and skin balanced. The natural cedar aroma is fresh and grounding, subtle but unmistakably good. Sapling can replace conditioner, daily moisturizer, sun-tan lotion, and even cologne, simplifying your routine with one versatile oil.",
    ingredients: "Cedar extract infused in jojoba oil",
    scent: "Fresh, grounding natural cedar"
  },
  {
    id: "blackbeard",
    name: "Blackbeard",
    price: 2500, // $25 CAD in cents
    currency: "CAD",
    size: "100 ml",
    image: "/blackbeard.png",
    description: "Blackbeard is a richer, more robust oil designed for deeper hydration and protection. Crafted for hair, beard, and skin that need a little more weight, it smooths, conditions, and restores without synthetic additives. Its bold, natural scent lingers just enough, warm and confident, while the oil works to strengthen hair and support healthy skin. One product, built for durability, function, and long days outdoors.",
    ingredients: "Jojoba oil, black spruce essential oil",
    scent: "Bold, warm, confident"
  },
  {
    id: "cat-nip",
    name: "Cat Nip",
    price: 2500, // $25 CAD in cents
    currency: "CAD",
    size: "100 ml",
    image: "/catnip.png",
    description: "PLACEHOLDER_DESCRIPTION: Product details for Cat Nip were incomplete in the source PDF. Preserve this exact placeholder text for seller to replace.",
    ingredients: "PLACEHOLDER_INGREDIENTS",
    scent: "PLACEHOLDER_SCENT"
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getAllProductIds(): string[] {
  return products.map(product => product.id);
}

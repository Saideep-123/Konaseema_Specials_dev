import type { Product } from "./CartContext";

export const CATEGORIES = [
  "All",
  "Traditional Sweets",
  "Snacks",
  "Pickles",
  "Gift Boxes",
];

const IMG_SWEET =
  "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=1200";
const IMG_SNACK =
  "https://images.pexels.com/photos/4397888/pexels-photo-4397888.jpeg?auto=compress&cs=tinysrgb&w=1200";
const IMG_PICKLE =
  "https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=1200";

export const PRODUCTS: (Product & {
  isHealthy?: boolean;
  isBestSeller?: boolean;
  foodType?: "veg" | "nonveg";
})[] = [
  {
    id: "p1",
    name: "Pootharekulu",
    price: 399,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET,
    isBestSeller: true,
    foodType: "veg",
  },
  {
    id: "p2",
    name: "Kaja Sweet",
    price: 299,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET,
    foodType: "veg",
  },
  {
    id: "p3",
    name: "Chekkalu",
    price: 199,
    weight: "250g",
    category: "Snacks",
    image: IMG_SNACK,
    isHealthy: true,
    foodType: "veg",
  },
  {
    id: "p4",
    name: "Avakaya Pickle",
    price: 249,
    weight: "250g",
    category: "Pickles",
    image: IMG_PICKLE,
    foodType: "veg",
  },
  {
    id: "p5",
    name: "Gongura Chicken Pickle",
    price: 349,
    weight: "250g",
    category: "Pickles",
    image: IMG_PICKLE,
    foodType: "nonveg",
  },
];

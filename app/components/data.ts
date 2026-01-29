import type { Product } from "./CartContext";

/**
 * We extend your existing Product type WITHOUT editing CartContext.ts,
 * so TypeScript won’t fail when we add filter fields.
 */
export type ProductWithTags = Product & {
  isHealthy?: boolean;
  isBestSeller?: boolean;
  foodType?: "veg" | "nonveg";
};

export const CATEGORIES = [
  "All",
  "Traditional Sweets",
  "Snacks",
  "Pickles (Veg)",
  "Pickles (Non Veg)",
  "Podi",
  "Healthy Snacks",
  "Oils",
  "Ghees",
] as const;

/* ------------------ Image placeholders (you can replace later) ------------------ */
const IMG_SWEET_1 =
  "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=1200";
const IMG_SWEET_2 =
  "https://images.pexels.com/photos/6419716/pexels-photo-6419716.jpeg?auto=compress&cs=tinysrgb&w=1200";
const IMG_SWEET_3 =
  "https://images.pexels.com/photos/7474376/pexels-photo-7474376.jpeg?auto=compress&cs=tinysrgb&w=1200";

const IMG_SNACK_1 =
  "https://images.pexels.com/photos/4397888/pexels-photo-4397888.jpeg?auto=compress&cs=tinysrgb&w=1200";

const IMG_PICKLE_1 =
  "https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=1200";

const IMG_PODI_1 =
  "https://images.pexels.com/photos/8470870/pexels-photo-8470870.jpeg?auto=compress&cs=tinysrgb&w=1200";

const IMG_HEALTHY_1 =
  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200";

const IMG_OIL_1 =
  "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=1200";

const IMG_GHEE_1 =
  "https://images.pexels.com/photos/6542786/pexels-photo-6542786.jpeg?auto=compress&cs=tinysrgb&w=1200";

/* ------------------ PRODUCTS (ALL ITEMS FROM YOUR IMAGES) ------------------ */
export const PRODUCTS: ProductWithTags[] = [
  /* =========================
     TRADITIONAL SWEETS (photo)
  ========================== */
  {
    id: "s1",
    name: "Kova",
    price: 299,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_1,
    isBestSeller: true,
    isHealthy: false,
    foodType: "veg",
  },
  {
    id: "s2",
    name: "Bellam Laddu",
    price: 249,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_2,
    isBestSeller: true,
    foodType: "veg",
  },
  {
    id: "s3",
    name: "Dry Kaju Katli",
    price: 649,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_3,
    isHealthy: true,
    isBestSeller: true,
    foodType: "veg",
  },
  {
    id: "s4",
    name: "Rava Laddu",
    price: 199,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_1,
    foodType: "veg",
  },
  {
    id: "s5",
    name: "Minapa Sunnundalu",
    price: 279,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_2,
    isBestSeller: true,
    foodType: "veg",
  },
  {
    id: "s6",
    name: "Kakinada Kaja (Madatha)",
    price: 299,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_3,
    isBestSeller: true,
    foodType: "veg",
  },
  {
    id: "s7",
    name: "Pootharekulu",
    price: 399,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_1,
    isBestSeller: true,
    foodType: "veg",
  },
  {
    id: "s8",
    name: "Ariselu + Nuvvula Pappu Ariselu",
    price: 329,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_2,
    foodType: "veg",
  },
  {
    id: "s9",
    name: "Boondi Laddu",
    price: 239,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_3,
    isBestSeller: true,
    foodType: "veg",
  },
  {
    id: "s10",
    name: "Thakudu Laddu",
    price: 249,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_1,
    foodType: "veg",
  },
  {
    id: "s11",
    name: "Kobbari Undha (Laddu)",
    price: 209,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_2,
    foodType: "veg",
  },
  {
    id: "s12",
    name: "Pooka Undhalu",
    price: 239,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_3,
    foodType: "veg",
  },
  {
    id: "s13",
    name: "Kobbari Ariselu",
    price: 349,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_1,
    foodType: "veg",
  },
  {
    id: "s14",
    name: "Dry Fruit Laddu",
    price: 499,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_2,
    isHealthy: true,
    isBestSeller: true,
    foodType: "veg",
  },
  {
    id: "s15",
    name: "Halwa",
    price: 299,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_3,
    foodType: "veg",
  },
  {
    id: "s16",
    name: "Bellam Gavvalu",
    price: 279,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_1,
    foodType: "veg",
  },
  {
    id: "s17",
    name: "Bellam Komullu",
    price: 279,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_2,
    foodType: "veg",
  },
  {
    id: "s18",
    name: "Ragi Bellam Laddu",
    price: 299,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_3,
    isHealthy: true,
    foodType: "veg",
  },
  {
    id: "s19",
    name: "Nuvvula Laddu",
    price: 219,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_1,
    isHealthy: true,
    foodType: "veg",
  },
  {
    id: "s20",
    name: "Paninulu",
    price: 299,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_2,
    foodType: "veg",
  },
  {
    id: "s21",
    name: "Gorimitilu",
    price: 269,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_3,
    foodType: "veg",
  },
  {
    id: "s22",
    name: "Pongadalu",
    price: 249,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_1,
    foodType: "veg",
  },
  {
    id: "s23",
    name: "Chalimidi",
    price: 269,
    weight: "250g",
    category: "Traditional Sweets",
    image: IMG_SWEET_2,
    foodType: "veg",
  },

  /* =========================
     SNACKS (photo)
  ========================== */
  { id: "sn1", name: "Chekkalu", price: 199, weight: "250g", category: "Snacks", image: IMG_SNACK_1, isBestSeller: true, foodType: "veg" },
  { id: "sn2", name: "Murukulu", price: 189, weight: "250g", category: "Snacks", image: IMG_SNACK_1, isBestSeller: true, foodType: "veg" },
  { id: "sn3", name: "Chekodhi", price: 189, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn4", name: "Ribbon Pakodi (Akku Pakodi)", price: 199, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn5", name: "Kara Boondi", price: 179, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn6", name: "Ganapathi Special Mixture", price: 219, weight: "250g", category: "Snacks", image: IMG_SNACK_1, isBestSeller: true, foodType: "veg" },
  { id: "sn7", name: "Karam Jantikullu", price: 199, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn8", name: "Komullu", price: 199, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn9", name: "Garlic Murukulu (Vammu Pusa)", price: 219, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn10", name: "Masala Pusa", price: 219, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn11", name: "Special Mixture", price: 199, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn12", name: "Chitti Appadalu", price: 169, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn13", name: "Nagaram Gavachillu", price: 169, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn14", name: "Natyam Kothalu", price: 179, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn15", name: "Mamidi Thandri", price: 199, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn16", name: "Thati Chapa", price: 199, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn17", name: "Bellam Jeedilu", price: 299, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn18", name: "Nuvvula Jeedilu", price: 299, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn19", name: "Chinna Boondi Aachu", price: 259, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn20", name: "Jeedi Pappu Aachu", price: 269, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn21", name: "Palli Aachu", price: 199, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn22", name: "Masala Cashew", price: 399, weight: "200g", category: "Snacks", image: IMG_SNACK_1, isBestSeller: true, foodType: "veg" },
  { id: "sn23", name: "Pepper Cashew", price: 399, weight: "200g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn24", name: "Masala Batani (Kabuli Chana)", price: 249, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn25", name: "Onion Chekodhi", price: 219, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn26", name: "Gulabi Jantikullu", price: 219, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },
  { id: "sn27", name: "Ringulu", price: 199, weight: "250g", category: "Snacks", image: IMG_SNACK_1, foodType: "veg" },

  /* =========================
     PODI (photo)
  ========================== */
  { id: "pd1", name: "Karvepaku Podi", price: 199, weight: "200g", category: "Podi", image: IMG_PODI_1, isHealthy: true, foodType: "veg" },
  { id: "pd2", name: "Mulaga Podi", price: 199, weight: "200g", category: "Podi", image: IMG_PODI_1, isHealthy: true, foodType: "veg" },
  { id: "pd3", name: "Karam Podi", price: 199, weight: "200g", category: "Podi", image: IMG_PODI_1, isHealthy: true, foodType: "veg" },
  { id: "pd4", name: "Nelluti Karam Podi", price: 199, weight: "200g", category: "Podi", image: IMG_PODI_1, isHealthy: true, foodType: "veg" },
  { id: "pd5", name: "Sonti Podi", price: 199, weight: "200g", category: "Podi", image: IMG_PODI_1, isHealthy: true, foodType: "veg" },
  { id: "pd6", name: "Kandi Podi", price: 199, weight: "200g", category: "Podi", image: IMG_PODI_1, isHealthy: true, foodType: "veg" },
  { id: "pd7", name: "Usiri Podi", price: 199, weight: "200g", category: "Podi", image: IMG_PODI_1, isHealthy: true, foodType: "veg" },
  { id: "pd8", name: "Nuvvula Karam Podi", price: 199, weight: "200g", category: "Podi", image: IMG_PODI_1, isHealthy: true, foodType: "veg" },
  { id: "pd9", name: "Dhaniyalu Podi", price: 199, weight: "200g", category: "Podi", image: IMG_PODI_1, isHealthy: true, foodType: "veg" },
  { id: "pd10", name: "Ilakasa Podi", price: 199, weight: "200g", category: "Podi", image: IMG_PODI_1, isHealthy: true, foodType: "veg" },
  { id: "pd11", name: "Avise Podi", price: 199, weight: "200g", category: "Podi", image: IMG_PODI_1, isHealthy: true, foodType: "veg" },
  { id: "pd12", name: "Kakara Podi", price: 199, weight: "200g", category: "Podi", image: IMG_PODI_1, isHealthy: true, foodType: "veg" },
  { id: "pd13", name: "Nuvvula Podi (Telaga Pindi)", price: 199, weight: "200g", category: "Podi", image: IMG_PODI_1, isHealthy: true, foodType: "veg" },
  { id: "pd14", name: "Miriyala Podi", price: 199, weight: "200g", category: "Podi", image: IMG_PODI_1, isHealthy: true, foodType: "veg" },
  { id: "pd15", name: "Chinta Pandu Karam (Mirychi Podi)", price: 219, weight: "200g", category: "Podi", image: IMG_PODI_1, isHealthy: true, isBestSeller: true, foodType: "veg" },

  /* =========================
     HEALTHY SNACKS (photo)
  ========================== */
  { id: "hs1", name: "Ragi Ringulu", price: 219, weight: "250g", category: "Healthy Snacks", image: IMG_HEALTHY_1, isHealthy: true, foodType: "veg" },
  { id: "hs2", name: "Ragi Jantikullu", price: 219, weight: "250g", category: "Healthy Snacks", image: IMG_HEALTHY_1, isHealthy: true, foodType: "veg" },
  { id: "hs3", name: "Ragi Chekkalu", price: 219, weight: "250g", category: "Healthy Snacks", image: IMG_HEALTHY_1, isHealthy: true, foodType: "veg" },
  { id: "hs4", name: "Beetroot Jantikullu", price: 229, weight: "250g", category: "Healthy Snacks", image: IMG_HEALTHY_1, isHealthy: true, foodType: "veg" },
  { id: "hs5", name: "Beetroot Chekkalu", price: 229, weight: "250g", category: "Healthy Snacks", image: IMG_HEALTHY_1, isHealthy: true, foodType: "veg" },

  /* =========================
     OILS (photo)
  ========================== */
  { id: "o1", name: "Nuvvula Nunne (Sesame Oil)", price: 399, weight: "1L", category: "Oils", image: IMG_OIL_1, isHealthy: true, foodType: "veg" },
  { id: "o2", name: "Kobbari Nunne (Coconut Oil)", price: 449, weight: "1L", category: "Oils", image: IMG_OIL_1, isHealthy: true, foodType: "veg" },
  { id: "o3", name: "Groundnut Oil", price: 399, weight: "1L", category: "Oils", image: IMG_OIL_1, isHealthy: true, isBestSeller: true, foodType: "veg" },

  /* =========================
     GHEES (photo)
  ========================== */
  { id: "g1", name: "Cow Ghee", price: 699, weight: "500ml", category: "Ghees", image: IMG_GHEE_1, isHealthy: true, isBestSeller: true, foodType: "veg" },
  { id: "g2", name: "Buffalo Ghee", price: 649, weight: "500ml", category: "Ghees", image: IMG_GHEE_1, isHealthy: true, foodType: "veg" },

  /* =========================
     PICKLES – VEG (photo)
  ========================== */
  { id: "pv1", name: "Gongura Pickle", price: 269, weight: "250g", category: "Pickles (Veg)", image: IMG_PICKLE_1, isBestSeller: true, foodType: "veg" },
  { id: "pv2", name: "Avakaya Pickle", price: 249, weight: "250g", category: "Pickles (Veg)", image: IMG_PICKLE_1, isBestSeller: true, foodType: "veg" },
  { id: "pv3", name: "Mixed Pickle", price: 249, weight: "250g", category: "Pickles (Veg)", image: IMG_PICKLE_1, foodType: "veg" },
  { id: "pv4", name: "Maggaya", price: 269, weight: "250g", category: "Pickles (Veg)", image: IMG_PICKLE_1, foodType: "veg" },
  { id: "pv5", name: "Allam Pickle (Ginger)", price: 249, weight: "250g", category: "Pickles (Veg)", image: IMG_PICKLE_1, foodType: "veg" },
  { id: "pv6", name: "Tomato Pickle", price: 229, weight: "250g", category: "Pickles (Veg)", image: IMG_PICKLE_1, foodType: "veg" },
  { id: "pv7", name: "Usirikaya Pickle", price: 269, weight: "250g", category: "Pickles (Veg)", image: IMG_PICKLE_1, foodType: "veg" },
  { id: "pv8", name: "Chinthakaya Pickle", price: 269, weight: "250g", category: "Pickles (Veg)", image: IMG_PICKLE_1, foodType: "veg" },
  { id: "pv9", name: "Cauliflower Pickle", price: 249, weight: "250g", category: "Pickles (Veg)", image: IMG_PICKLE_1, foodType: "veg" },
  { id: "pv10", name: "Lemon Pickle", price: 229, weight: "250g", category: "Pickles (Veg)", image: IMG_PICKLE_1, isBestSeller: true, foodType: "veg" },
  { id: "pv11", name: "Kothimeera Pickle (Coriander)", price: 249, weight: "250g", category: "Pickles (Veg)", image: IMG_PICKLE_1, foodType: "veg" },
  { id: "pv12", name: "Karvepaku Pickle (Curry Leaf)", price: 249, weight: "250g", category: "Pickles (Veg)", image: IMG_PICKLE_1, foodType: "veg" },
  { id: "pv13", name: "Dosakaya Pickle", price: 249, weight: "250g", category: "Pickles (Veg)", image: IMG_PICKLE_1, foodType: "veg" },
  { id: "pv14", name: "Mulakayya Pachidi", price: 269, weight: "250g", category: "Pickles (Veg)", image: IMG_PICKLE_1, foodType: "veg" },

  /* =========================
     PICKLES – NON VEG (photo)
  ========================== */
  { id: "pn1", name: "Chicken Pickle", price: 499, weight: "250g", category: "Pickles (Non Veg)", image: IMG_PICKLE_1, isBestSeller: true, foodType: "nonveg" },
  { id: "pn2", name: "Gongura Chicken Pickle", price: 549, weight: "250g", category: "Pickles (Non Veg)", image: IMG_PICKLE_1, isBestSeller: true, foodType: "nonveg" },
  { id: "pn3", name: "Mutton Pickle", price: 649, weight: "250g", category: "Pickles (Non Veg)", image: IMG_PICKLE_1, foodType: "nonveg" },
  { id: "pn4", name: "Gongura Mutton Pickle", price: 699, weight: "250g", category: "Pickles (Non Veg)", image: IMG_PICKLE_1, foodType: "nonveg" },
  { id: "pn5", name: "Prawns Pickle", price: 699, weight: "250g", category: "Pickles (Non Veg)", image: IMG_PICKLE_1, foodType: "nonveg" },
  { id: "pn6", name: "Gongura Prawns Pickle", price: 749, weight: "250g", category: "Pickles (Non Veg)", image: IMG_PICKLE_1, foodType: "nonveg" },
  { id: "pn7", name: "Crabs Pickle", price: 799, weight: "250g", category: "Pickles (Non Veg)", image: IMG_PICKLE_1, foodType: "nonveg" },
];

/**
 * OPTIONAL: If your UI expects the old category names like "Pickles" or "Gift Boxes",
 * tell me what the UI uses and I’ll map these categories without changing UI layout.
 */

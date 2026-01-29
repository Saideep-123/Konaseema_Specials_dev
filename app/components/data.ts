import type { Product } from "./CartContext";

export const CATEGORIES = [
  "All Products",
  "Traditional Sweets",
  "Dry Fruit Sweets",
  "Snacks",
  "Pickles",
  "Podis",
  "Gift Boxes",
];

export const PRODUCTS: Product[] = [
  // ---- Traditional Sweets (1-18)
  { id: "p1", name: "Pootharekulu", price: 399, weight: "250g", category: "Traditional Sweets", image: "/images/Pootharekulu.jpg" },
  { id: "p2", name: "Kaja Sweet", price: 299, weight: "250g", category: "Traditional Sweets", image: "/images/Kaja Sweet.jpg" },
  { id: "p3", name: "Gavvalu", price: 249, weight: "250g", category: "Traditional Sweets", image: "/images/Gavvalu.jpg" },
  { id: "p4", name: "Bellam Pootharekulu", price: 429, weight: "250g", category: "Traditional Sweets", image: "/images/Bellam Pootharekulu.jpg" },
  { id: "p5", name: "Nuvvula Laddu", price: 219, weight: "250g", category: "Traditional Sweets", image: "/images/Nuvvula Laddu.jpg" },
  { id: "p6", name: "Sunnundalu", price: 279, weight: "250g", category: "Traditional Sweets", image: "/images/Sunnundalu.jpg" },
  { id: "p7", name: "Boondi Laddu", price: 239, weight: "250g", category: "Traditional Sweets", image: "/images/Boondi Laddu.jpg" },
  { id: "p8", name: "Putharekulu (Dryfruit)", price: 499, weight: "250g", category: "Traditional Sweets", image: "/images/Putharekulu (Dryfruit).jpg" },
  { id: "p9", name: "Ariselu", price: 329, weight: "250g", category: "Traditional Sweets", image: "/images/Ariselu.jpg" },
  { id: "p10", name: "Bobbatlu / Puran Poli", price: 349, weight: "4 pcs", category: "Traditional Sweets", image: "/images/Bobbatlu - Puran Poli.jpg" },
  { id: "p11", name: "Mysore Pak", price: 299, weight: "250g", category: "Traditional Sweets", image: "/images/Mysore Pak.jpg" },
  { id: "p12", name: "Milk Mysore Pak", price: 329, weight: "250g", category: "Traditional Sweets", image: "/images/Milk Mysore Pak.jpg" },
  { id: "p13", name: "Badusha", price: 259, weight: "250g", category: "Traditional Sweets", image: "/images/Badusha.jpg" },
  { id: "p14", name: "Gulab Jamun", price: 299, weight: "250g", category: "Traditional Sweets", image: "/images/Gulab Jamun.jpg" },
  { id: "p15", name: "Jangri", price: 279, weight: "250g", category: "Traditional Sweets", image: "/images/Jangri.jpg" },
  { id: "p16", name: "Rava Laddu", price: 199, weight: "250g", category: "Traditional Sweets", image: "/images/Rava Laddu.jpg" },
  { id: "p17", name: "Kobbari (Coconut) Laddu", price: 209, weight: "250g", category: "Traditional Sweets", image: "/images/Kobbari (Coconut) Laddu.jpg" },
  { id: "p18", name: "Malpuri", price: 289, weight: "250g", category: "Traditional Sweets", image: "/images/Malpuri.jpg" },

  // ---- Dry Fruit Sweets (19-28)
  { id: "p19", name: "Dry Fruit Laddu", price: 499, weight: "250g", category: "Dry Fruit Sweets", image: "/images/Dry Fruit Laddu.jpg" },
  { id: "p20", name: "Kaju Katli", price: 649, weight: "250g", category: "Dry Fruit Sweets", image: "/images/Kaju Katli.jpg" },
  { id: "p21", name: "Badam Barfi", price: 699, weight: "250g", category: "Dry Fruit Sweets", image: "/images/Badam Barfi.jpg" },
  { id: "p22", name: "Pista Roll", price: 749, weight: "250g", category: "Dry Fruit Sweets", image: "/images/Pista Roll.jpg" },
  { id: "p23", name: "Anjeer Barfi", price: 799, weight: "250g", category: "Dry Fruit Sweets", image: "/images/Anjeer Barfi.jpg" },
  { id: "p24", name: "Dates & Nuts Laddu", price: 549, weight: "250g", category: "Dry Fruit Sweets", image: "/images/Dates & Nuts Laddu.jpg" },
  { id: "p25", name: "Kaju Pista Barfi", price: 799, weight: "250g", category: "Dry Fruit Sweets", image: "/images/Kaju Pista Barfi.jpg" },
  { id: "p26", name: "Badam Halwa", price: 699, weight: "250g", category: "Dry Fruit Sweets", image: "/images/Badam Halwa.jpg" },
  { id: "p27", name: "Kaju Pakkam", price: 699, weight: "250g", category: "Dry Fruit Sweets", image: "/images/Kaju Pakkam.jpg" },
  { id: "p28", name: "Dry Fruit Pootharekulu", price: 599, weight: "250g", category: "Dry Fruit Sweets", image: "/images/Dry Fruit Pootharekulu.jpg" },

  // ---- Snacks (29-42)
  { id: "p29", name: "Chekkalu", price: 199, weight: "250g", category: "Snacks", image: "/images/Chekkalu.jpg" },
  { id: "p30", name: "Murukulu", price: 189, weight: "250g", category: "Snacks", image: "/images/Murukulu.jpg" },
  { id: "p31", name: "Kara Boondi", price: 179, weight: "250g", category: "Snacks", image: "/images/Kara Boondi.jpg" },
  { id: "p32", name: "Mixture", price: 179, weight: "250g", category: "Snacks", image: "/images/Mixture.jpg" },
  { id: "p33", name: "Nippat", price: 169, weight: "250g", category: "Snacks", image: "/images/Nippat.jpg" },
  { id: "p34", name: "Chakodi", price: 189, weight: "250g", category: "Snacks", image: "/images/Chakodi.jpg" },
  { id: "p35", name: "Palli (Peanut) Chikki", price: 159, weight: "250g", category: "Snacks", image: "/images/Palli (Peanut) Chikki.jpg" },
  { id: "p36", name: "Sesame Chikki", price: 169, weight: "250g", category: "Snacks", image: "/images/Sesame Chikki.jpg" },
  { id: "p37", name: "Banana Chips", price: 199, weight: "250g", category: "Snacks", image: "/images/Banana Chips.jpg" },
  { id: "p38", name: "Masala Cashew", price: 399, weight: "200g", category: "Snacks", image: "/images/Masala Cashew.jpg" },
  { id: "p39", name: "Spicy Murukku", price: 199, weight: "250g", category: "Snacks", image: "/images/Spicy Murukku.jpg" },
  { id: "p40", name: "Corn Mixture", price: 199, weight: "250g", category: "Snacks", image: "/images/Corn Mixture.jpg" },
  { id: "p41", name: "Ribbon Pakoda", price: 199, weight: "250g", category: "Snacks", image: "/images/Ribbon Pakoda.jpg" },
  { id: "p42", name: "Thattai", price: 199, weight: "250g", category: "Snacks", image: "/images/Thattai.jpg" },

  // ---- Pickles (43-47)
  { id: "p43", name: "Avakaya Pickle", price: 249, weight: "250g", category: "Pickles", image: "/images/Avakaya Pickle.jpg" },
  { id: "p44", name: "Gongura Pickle", price: 269, weight: "250g", category: "Pickles", image: "/images/Gongura Pickle.jpg" },
  { id: "p45", name: "Tomato Pickle", price: 229, weight: "250g", category: "Pickles", image: "/images/Tomato Pickle.jpg" },
  { id: "p46", name: "Lemon Pickle", price: 229, weight: "250g", category: "Pickles", image: "/images/Lemon Pickle.jpg" },
  { id: "p47", name: "Mixed Veg Pickle", price: 249, weight: "250g", category: "Pickles", image: "/images/Mixed Veg Pickle.jpg" },

  // ---- Podis (48-54)
  { id: "p48", name: "Kandi Podi", price: 199, weight: "200g", category: "Podis", image: "/images/Kandi Podi.jpg" },
  { id: "p49", name: "Mulaga Podi", price: 189, weight: "200g", category: "Podis", image: "/images/Mulaga Podi.jpg" },
  { id: "p50", name: "Karivepaku Podi", price: 199, weight: "200g", category: "Podis", image: "/images/Karivepaku Podi.jpg" },
  { id: "p51", name: "Nuvvula Podi", price: 189, weight: "200g", category: "Podis", image: "/images/Nuvvula Podi.jpg" },
  { id: "p52", name: "Moringa Leaf Podi", price: 219, weight: "200g", category: "Podis", image: "/images/Moringa Podi.jpg" },
  { id: "p53", name: "Flaxseed Podi", price: 209, weight: "200g", category: "Podis", image: "/images/Flaxseed Podi.jpg" },
  { id: "p54", name: "Curry Leaves Garlic Podi", price: 219, weight: "200g", category: "Podis", image: "/images/Garlic Podi.jpg" },

  // ---- Gift Boxes (55-57)
  { id: "p55", name: "Sweet Combo Box (Small)", price: 899, weight: "Assorted", category: "Gift Boxes", image: "/images/Sweet Combo Box (Small).jpg" },
  { id: "p56", name: "Sweet Combo Box (Medium)", price: 1299, weight: "Assorted", category: "Gift Boxes", image: "/images/Sweet Combo Box (Medium).jpg" },
  { id: "p57", name: "Festive Gift Hamper", price: 1799, weight: "Assorted", category: "Gift Boxes", image: "/images/Festive Gift Hamper.jpg" },
];

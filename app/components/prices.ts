// app/components/prices.ts

export type PriceTier = Record<string, number>; // e.g. { "250g": 145, "500g": 290, "1kg": 580 }

export const CURRENCY: "INR" | "USD" = "INR";

/**
 * INR → USD later:
 *   export const CURRENCY: "INR" | "USD" = "USD";
 *   export const FX_RATE = 0.012; // example only
 *
 * Keep FX_RATE=1 for INR.
 */
export const FX_RATE = 1;

export const CURRENCY_SYMBOL: Record<"INR" | "USD", string> = {
  INR: "₹",
  USD: "$",
};

// ---- helpers
export function formatMoney(amount: number) {
  const n = Number.isFinite(amount) ? amount : 0;
  const symbol = CURRENCY_SYMBOL[CURRENCY];
  // show 2 decimals only for USD; INR usually no decimals
  if (CURRENCY === "USD") return `${symbol}${n.toFixed(2)}`;
  return `${symbol}${Math.round(n)}`;
}

export function convert(amountInINR: number) {
  const n = Number.isFinite(amountInINR) ? amountInINR : 0;
  return n * FX_RATE;
}

export function getPrice(prices: Record<string, PriceTier>, key: string, size: string): number {
  const tier = prices[key];
  if (!tier) return 0;
  const raw = tier[size];
  if (raw == null) return 0;
  return convert(raw);
}

/**
 * SINGLE SOURCE OF TRUTH — update prices only here.
 * Keys are referenced by data.ts (priceKey).
 */
export const PRICES: Record<string, PriceTier> = {
  // =================== Sweets ===================
  kova: { "250g": 145, "500g": 290, "1kg": 580 },
  bellam_laddu_nuvvu_rava: { "250g": 70, "500g": 140, "1kg": 280 },
  dry_kajjikayalu: { "250g": 90, "500g": 175, "1kg": 350 },
  rava_laddu: { "250g": 70, "500g": 140, "1kg": 280 },
  minapa_sunnundalu: { "250g": 150, "500g": 300, "1kg": 600 },
  kakinada_kaja_madatha: { "250g": 115, "500g": 225, "1kg": 450 },
  pootharekulu: { "250g": 175, "500g": 350, "1kg": 700 },
  arisallu_nuvvula_arisallu: { "250g": 150, "500g": 300, "1kg": 600 },
  boondi_laddu: { "250g": 75, "500g": 150, "1kg": 300 },
  thakudhu_laddu: { "250g": 125, "500g": 250, "1kg": 500 },
  kobbari_arisallu: { "250g": 125, "500g": 250, "1kg": 500 },
  dry_fruit_laddu: { "250g": 325, "500g": 650, "1kg": 1300 },
  halwa: { "250g": 125, "500g": 250, "1kg": 500 },
  bellam_gavvalu: { "250g": 100, "500g": 200, "1kg": 400 },
  bellam_kommulu: { "250g": 100, "500g": 200, "1kg": 400 },
  ragi_bellam_laddu: { "250g": 175, "500g": 350, "1kg": 700 },
  nuvvula_laddu: { "250g": 175, "500g": 350, "1kg": 700 },
  paanilu: { "250g": 90, "500g": 175, "1kg": 350 },
  gormithilu: { "250g": 70, "500g": 135, "1kg": 270 },
  pongadalu: { "250g": 75, "500g": 150, "1kg": 300 },

  // =================== Snacks ===================
  chekkalu: { "250g": 90, "500g": 175, "1kg": 350 },
  murukulu: { "250g": 90, "500g": 175, "1kg": 350 },
  chekodhi: { "250g": 90, "500g": 175, "1kg": 350 },
  ribbon_pakodi: { "250g": 100, "500g": 200, "1kg": 400 },
  karam_boondi: { "250g": 85, "500g": 170, "1kg": 340 },
  ganapathi_special_mixture: { "250g": 150, "500g": 300, "1kg": 600 },
  karam_jantikalu: { "250g": 150, "500g": 300, "1kg": 600 },
  kommulu: { "250g": 140, "500g": 275, "1kg": 550 },
  garlic_murukulu: { "250g": 115, "500g": 225, "1kg": 450 },
  masala_biscuits: { "250g": 90, "500g": 175, "1kg": 350 },
  special_mixture: { "250g": 125, "500g": 250, "1kg": 500 },
  chitti_appadalu: { "250g": 90, "500g": 175, "1kg": 350 },
  nagaram_garajilu: { "250g": 125, "500g": 250, "1kg": 500 },
  nagaram_kastha: { "250g": 75, "500g": 150, "1kg": 300 },
  mamidi_thondri: { "250g": 150, "500g": 300, "1kg": 600 },
  thati_chapa: { "250g": 150, "500g": 300, "1kg": 600 },
  bellam_jeedilu: { "250g": 75, "500g": 150, "1kg": 300 },
  nuvvula_jeedilu: { "250g": 90, "500g": 175, "1kg": 350 },
  chinna_boondi_aachu: { "250g": 70, "500g": 140, "1kg": 280 },
  jeedi_pappu_aachu: { "250g": 225, "500g": 450, "1kg": 900 },
  pallila_aachu: { "250g": 100, "500g": 200, "1kg": 400 },
  masala_cashew: { "250g": 275, "500g": 550, "1kg": 1100 },
  masala_batani: { "250g": 90, "500g": 175, "1kg": 350 },
  onion_chekodhi: { "250g": 90, "500g": 175, "1kg": 350 },
  gulabi_jantikalu: { "250g": 115, "500g": 225, "1kg": 450 },
  ringulu: { "250g": 90, "500g": 175, "1kg": 350 },

  // =================== Podis ===================
  karvepaku_podi: { "250g": 225, "500g": 450, "1kg": 900 },
  mulaga_podi: { "250g": 275, "500g": 550, "1kg": 1100 },
  karam_podi: { "250g": 175, "500g": 350, "1kg": 700 },
  velluli_karvepaku_podi: { "250g": 250, "500g": 500, "1kg": 1000 },
  sonti_podi: { "250g": 200, "500g": 400, "1kg": 800 },
  kandi_podi: { "250g": 225, "500g": 450, "1kg": 900 },
  usiri_podi: { "250g": 250, "500g": 500, "1kg": 1000 },
  nuvvula_karam_podi: { "250g": 225, "500g": 450, "1kg": 900 },
  daniyalu_podi: { "250g": 165, "500g": 330, "1kg": 660 },
  avise_podi: { "250g": 250, "500g": 500, "1kg": 1000 },
  kakara_podi: { "250g": 200, "500g": 400, "1kg": 800 },
  nuvvula_podi: { "250g": 100, "500g": 200, "1kg": 400 },
  miriyala_podi: { "250g": 275, "500g": 550, "1kg": 1100 },

  // =================== Healthy Snacks ===================
  ragi_ringulu: { "250g": 115, "500g": 225, "1kg": 450 },
  ragi_jantikalu: { "250g": 115, "500g": 225, "1kg": 450 },
  ragi_chekkalu: { "250g": 115, "500g": 225, "1kg": 450 },
  beetroot_jantikalu: { "250g": 115, "500g": 225, "1kg": 450 },
  beetroot_chekkalu: { "250g": 115, "500g": 225, "1kg": 450 },

  // =================== Oils & Ghee ===================
  // Using sizes: 250ml / 500ml / 1L
  nuvvula_nune: { "250ml": 120, "500ml": 240, "1L": 480 },
  kobbari_nune: { "250ml": 150, "500ml": 300, "1L": 600 },
  groundnut_oil: { "250ml": 115, "500ml": 225, "1L": 450 },
  cow_ghee: { "250ml": 275, "500ml": 550, "1kg": 1100 }, // table uses kg; keep as-is
  buffalo_ghee: { "250ml": 225, "500ml": 450, "1kg": 900 },

  // =================== Veg Pickles ===================
  gongura_pickle: { "250g": 200, "500g": 400, "1kg": 800 },
  avakaya_pickle: { "250g": 200, "500g": 400, "1kg": 800 },
  magaya_pickle: { "250g": 190, "500g": 375, "1kg": 750 },
  allam_pickle: { "250g": 225, "500g": 450, "1kg": 900 },
  tomato_pickle: { "250g": 200, "500g": 400, "1kg": 800 },
  usirikaya_pickle: { "250g": 200, "500g": 400, "1kg": 800 },
  chinthakaya_pickle: { "250g": 225, "500g": 450, "1kg": 900 },
  cauliflower_pickle: { "250g": 150, "500g": 300, "1kg": 600 },
  lemon_pickle: { "250g": 200, "500g": 400, "1kg": 800 },
  kothimeera_pickle: { "250g": 200, "500g": 400, "1kg": 800 },
  karvepaku_pickle: { "250g": 200, "500g": 400, "1kg": 800 },
  dosakaya_pickle: { "250g": 175, "500g": 350, "1kg": 700 },
  mulakkaya_pachadi: { "250g": 200, "500g": 400, "1kg": 800 },

  // =================== Non-Veg Pickles ===================
  chicken_pickle: { "250g": 325, "500g": 650, "1kg": 1300 },
  chicken_pickle_special: { "250g": 365, "500g": 725, "1kg": 1450 },
  gongura_chicken_pickle: { "250g": 375, "500g": 750, "1kg": 1500 },
  mutton_pickle: { "250g": 400, "500g": 800, "1kg": 1600 },
  gongura_mutton_pickle: { "250g": 475, "500g": 950, "1kg": 1900 },
  prawns_pickle: { "250g": 400, "500g": 800, "1kg": 1600 },
  gongura_prawns_pickle: { "250g": 475, "500g": 950, "1kg": 1900 },
};

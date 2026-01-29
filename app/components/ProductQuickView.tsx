"use client";

import { useEffect, useMemo, useState } from "react";

type ProductLike = {
  id: string;
  name: string;
  category: string;
  image: string;
  price?: number;
  weight?: string;
  // optional fields if you already have them
  description?: string;
  highlights?: string[];
};

type Props = {
  product: ProductLike;
  onClose: () => void;

  /**
   * Backward compatible:
   * - your current code likely passes: onAdd={() => cart.add(selected)}
   * - we keep supporting onAdd() with no args
   * - if you later change parent to accept payload, we will pass it
   */
  onAdd: ((payload?: any) => void) | (() => void);
};

const WEIGHTS = [
  { label: "250g", grams: 250, multiplier: 1 },
  { label: "500g", grams: 500, multiplier: 2 },
  { label: "1kg", grams: 1000, multiplier: 4 },
];

function buildHighlights(p: ProductLike): string[] {
  // If you already store highlights in data, use them
  if (Array.isArray(p.highlights) && p.highlights.length >= 4) {
    return p.highlights.slice(0, 4);
  }

  const cat = (p.category || "").toLowerCase();
  const name = (p.name || "").toLowerCase();

  if (cat.includes("podi")) {
    return [
      "Stone-ground using traditional methods",
      "No preservatives or artificial colors",
      "Fresh curry leaves & premium spices",
      "Shelf life: up to 3 months (airtight packed)",
    ];
  }

  if (cat.includes("pickle") || cat.includes("pachadi")) {
    return [
      "Authentic Andhra-style recipe",
      "Made with fresh ingredients & cold-pressed oil",
      "Bold spice balance, homestyle taste",
      "Shelf life: 2–3 months (refrigerate after opening)",
    ];
  }

  if (cat.includes("oil") || cat.includes("ghee")) {
    return [
      "Pure, unblended & aromatic",
      "Slow-processed for rich flavor",
      "Ideal for cooking & tempering",
      "Shelf life: 6–9 months (store cool & dry)",
    ];
  }

  if (cat.includes("snack")) {
    return [
      "Fresh batch made for crunch & taste",
      "Traditional ingredients & spice mix",
      "Perfect with tea / evening snacks",
      "Shelf life: 15–30 days (airtight packed)",
    ];
  }

  if (cat.includes("sweet") || name.includes("laddu") || name.includes("kaja") || name.includes("pootharekulu")) {
    return [
      "Traditional festival-style preparation",
      "Made fresh with quality ingredients",
      "Rich taste & authentic texture",
      "Best before: 10–15 days (airtight packed)",
    ];
  }

  // Default fallback
  return [
    "Freshly prepared and hygienically packed",
    "Authentic Konaseema-style taste",
    "No artificial colors (as per batch)",
    "Carefully packed for safe delivery",
  ];
}

export default function ProductQuickView({ product, onClose, onAdd }: Props) {
  const [qty, setQty] = useState<number>(1);
  const [weight, setWeight] = useState(WEIGHTS[0]);

  const highlights = useMemo(() => buildHighlights(product), [product]);

  // Calculate display price based on weight multiplier (keeps your existing base price)
  const computedPrice = useMemo(() => {
    const base = Number(product.price ?? 0);
    const val = base * weight.multiplier * qty;
    return val;
  }, [product.price, weight.multiplier, qty]);

  useEffect(() => {
    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // esc close
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const handleAdd = () => {
    // Payload is optional; parent can ignore it safely
    const payload = {
      ...product,
      selectedWeight: weight.label,
      selectedGrams: weight.grams,
      quantity: qty,
      // useful for cart summary if you later want it
      computedPrice,
    };

    // Backward compatible call:
    // - if parent expects no args, this still works
    try {
      (onAdd as any)(payload);
    } catch {
      (onAdd as any)();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="w-full max-w-4xl rounded-2xl bg-[#fffaf2] border border-[#e8dccb] shadow-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT: Image */}
            <div className="relative bg-[#faf7f2]">
              <div className="relative w-full h-[320px] md:h-full min-h-[320px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* RIGHT: Details */}
            <div className="p-6 md:p-7 relative">
              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-5 top-5 text-2xl leading-none opacity-60 hover:opacity-100"
                aria-label="Close"
              >
                ×
              </button>

              <div className="text-[12px] text-[#c9a36a] font-semibold tracking-wide">
                {product.category}
              </div>

              <h3 className="mt-2 text-3xl font-semibold text-[#2c1f14]">
                {product.name}
              </h3>

              <div className="mt-2 text-sm text-[#6b5a4a]">
                {weight.label}
              </div>

              {/* Price */}
              <div className="mt-4 text-2xl font-bold text-[#2c1f14]">
                ₹{Number.isFinite(computedPrice) ? computedPrice : 0}
              </div>

              {/* Weight selector */}
              <div className="mt-6">
                <div className="text-sm font-semibold text-[#2c1f14] mb-2">
                  Select weight
                </div>
                <div className="flex flex-wrap gap-2">
                  {WEIGHTS.map((w) => {
                    const active = w.label === weight.label;
                    return (
                      <button
                        key={w.label}
                        type="button"
                        onClick={() => setWeight(w)}
                        className={[
                          "px-4 py-2 rounded-full text-sm border transition",
                          active
                            ? "bg-[#2f4a3a] text-white border-[#2f4a3a]"
                            : "bg-white text-[#2c1f14] border-[#e8dccb] hover:border-[#c9a36a]",
                        ].join(" ")}
                      >
                        {w.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mt-6">
                <div className="text-sm font-semibold text-[#2c1f14] mb-2">
                  Quantity
                </div>

                <div className="inline-flex items-center rounded-xl border border-[#e8dccb] bg-white overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-12 h-10 grid place-items-center text-xl text-[#2c1f14] hover:bg-[#faf7f2]"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <div className="w-14 h-10 grid place-items-center font-semibold text-[#2c1f14]">
                    {qty}
                  </div>

                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="w-12 h-10 grid place-items-center text-xl text-[#2c1f14] hover:bg-[#faf7f2]"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-6">
                <div className="text-sm font-semibold text-[#2c1f14] mb-2">
                  Product details
                </div>

                <ul className="space-y-2 text-sm text-[#5c4a3c] list-disc pl-5">
                  {highlights.slice(0, 4).map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>

              {/* Single Add to Cart button */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="w-full h-12 rounded-2xl bg-[#2f4a3a] text-white font-semibold hover:brightness-110 transition"
                >
                  Add to Cart
                </button>

                <div className="mt-3 text-xs opacity-70">
                  Tip: press Esc to close
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

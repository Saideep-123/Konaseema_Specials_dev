"use client";

import { useEffect, useMemo, useState } from "react";

type ProductLike = {
  id: string;
  name: string;
  category: string;
  image: string;
  price?: number;
  weight?: string;

  // NEW: per-product content
  desc?: string;
  highlights?: string[]; // ideally 4+
};

type Props = {
  product: ProductLike;
  onClose: () => void;
  onAdd: ((payload?: any) => void) | (() => void);
};

const WEIGHTS = [
  { label: "250g", grams: 250, multiplier: 1 },
  { label: "500g", grams: 500, multiplier: 2 },
  { label: "1kg", grams: 1000, multiplier: 4 },
];

// fallback ONLY if a product doesn't have its own highlights
function fallbackHighlights(p: ProductLike): string[] {
  const cat = (p.category || "").toLowerCase();
  if (cat.includes("podi")) {
    return [
      "Freshly prepared in small batches",
      "Traditional roast & grind process",
      "Airtight packing for freshness",
      "Best with ghee / oil",
    ];
  }
  if (cat.includes("pickle")) {
    return [
      "Authentic homestyle recipe",
      "Made with fresh ingredients",
      "Balanced spice & tang",
      "Store refrigerated after opening",
    ];
  }
  if (cat.includes("snack")) {
    return [
      "Fresh batch for crunch",
      "Traditional spice blend",
      "Airtight packing",
      "Best before: 15–30 days",
    ];
  }
  return [
    "Freshly prepared and packed",
    "Authentic Konaseema taste",
    "Hygienic packing",
    "Store cool & dry",
  ];
}

export default function ProductQuickView({ product, onClose, onAdd }: Props) {
  const [qty, setQty] = useState(1);
  const [weight, setWeight] = useState(WEIGHTS[0]);

  const highlights = useMemo(() => {
    const h = product.highlights?.filter(Boolean) ?? [];
    return h.length >= 4 ? h.slice(0, 4) : fallbackHighlights(product);
  }, [product]);

  const computedPrice = useMemo(() => {
    const base = Number(product.price ?? 0);
    return base * weight.multiplier * qty;
  }, [product.price, weight.multiplier, qty]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

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
    const payload = {
      ...product,
      selectedWeight: weight.label,
      selectedGrams: weight.grams,
      quantity: qty,
      computedPrice,
    };

    try {
      (onAdd as any)(payload);
    } catch {
      (onAdd as any)();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="w-full max-w-4xl rounded-2xl bg-[#fffaf2] border border-[#e8dccb] shadow-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
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

            {/* Details */}
            <div className="p-6 md:p-7 relative">
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

              {/* Optional short description */}
              {product.desc && (
                <p className="mt-2 text-sm text-[#6b5a4a]">{product.desc}</p>
              )}

              <div className="mt-2 text-sm text-[#6b5a4a]">
                Selected: <span className="font-semibold">{weight.label}</span>
              </div>

              <div className="mt-4 text-2xl font-bold text-[#2c1f14]">
                ₹{Number.isFinite(computedPrice) ? computedPrice : 0}
              </div>

              {/* Weight */}
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

              {/* Qty */}
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

              {/* Product details */}
              <div className="mt-6">
                <div className="text-sm font-semibold text-[#2c1f14] mb-2">
                  Product details
                </div>

                <ul className="space-y-2 text-sm text-[#5c4a3c] list-disc pl-5">
                  {highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>

              {/* Add only */}
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

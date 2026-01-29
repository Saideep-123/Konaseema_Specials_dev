"use client";

import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PRODUCTS } from "./data"; // ✅ CORRECT import (from data.ts)

type Filters = {
  healthy: boolean;
  bestseller: boolean;
  veg: boolean;
  nonveg: boolean;
};

export default function HomePage() {
  const [filters, setFilters] = useState<Filters>({
    healthy: false,
    bestseller: false,
    veg: false,
    nonveg: false,
  });

  // keep your existing logic if different
  const featuredProducts = PRODUCTS.slice(0, 8);

  const anySelected = useMemo(
    () => Object.values(filters).some(Boolean),
    [filters]
  );

  const filteredFeatured = useMemo(() => {
    // No filters selected → show all (current behavior)
    if (!anySelected) return featuredProducts;

    return featuredProducts.filter((p: any) => {
      // These fields can be added later in data.ts
      const isHealthy = Boolean(p?.isHealthy);
      const isBestSeller = Boolean(p?.isBestSeller);
      const foodType = String(p?.foodType ?? "").toLowerCase(); // "veg" | "nonveg"

      if (filters.healthy && !isHealthy) return false;
      if (filters.bestseller && !isBestSeller) return false;
      if (filters.veg && foodType !== "veg") return false;
      if (filters.nonveg && foodType !== "nonveg") return false;

      return true;
    });
  }, [featuredProducts, anySelected, filters]);

  const toggle = (key: keyof Filters) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const clearAll = () =>
    setFilters({ healthy: false, bestseller: false, veg: false, nonveg: false });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* ===== FEATURED PRODUCTS HEADER + FILTER ===== */}
          <div className="flex items-start justify-between gap-6 mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-brown">
              Featured Products
            </h2>

            {/* ✅ Checkbox Filter (Right side) */}
            <div className="min-w-[260px] card p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-extrabold text-brown">
                  Filter
                </span>

                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs font-bold text-brown/70 hover:text-brown"
                >
                  Clear
                </button>
              </div>

              <div className="grid gap-2">
                <Checkbox
                  label="Healthy product"
                  checked={filters.healthy}
                  onChange={() => toggle("healthy")}
                />
                <Checkbox
                  label="Best seller"
                  checked={filters.bestseller}
                  onChange={() => toggle("bestseller")}
                />
                <Checkbox
                  label="Veg"
                  checked={filters.veg}
                  onChange={() => toggle("veg")}
                />
                <Checkbox
                  label="Non veg"
                  checked={filters.nonveg}
                  onChange={() => toggle("nonveg")}
                />
              </div>

              {anySelected && filteredFeatured.length === 0 && (
                <div className="mt-3 text-xs text-brown/70">
                  No products match. Add tags later in <code>data.ts</code>.
                </div>
              )}
            </div>
          </div>

          {/* ===== FEATURED PRODUCTS GRID ===== */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFeatured.map((p: any) => (
              <div key={p.id} className="card p-4">
                {/* 🔹 KEEP YOUR EXISTING PRODUCT CARD UI */}
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
                <div className="font-bold text-brown">{p.name}</div>
                <div className="text-brown/70 mb-2">₹{p.price}</div>

                <button className="btn-primary w-full">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-[#173b2c]"
      />
      <span className="text-sm font-semibold text-brown">
        {label}
      </span>
    </label>
  );
}

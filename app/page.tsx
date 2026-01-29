"use client";

import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PRODUCTS } from "./components/data";
import { useCart } from "./components/CartContext";

type Filters = {
  healthy: boolean;
  bestseller: boolean;
  veg: boolean;
  nonveg: boolean;
};

export default function HomePage() {
  const { add } = useCart(); // ✅ CORRECT API

  const [filters, setFilters] = useState<Filters>({
    healthy: false,
    bestseller: false,
    veg: false,
    nonveg: false,
  });

  const [showFilter, setShowFilter] = useState(false);

  // same as old ZIP
  const featuredProducts = PRODUCTS.slice(0, 4);

  const filteredFeatured = useMemo(() => {
    return featuredProducts.filter((p: any) => {
      if (filters.healthy && !p.isHealthy) return false;
      if (filters.bestseller && !p.isBestSeller) return false;
      if (filters.veg && p.foodType !== "veg") return false;
      if (filters.nonveg && p.foodType !== "nonveg") return false;
      return true;
    });
  }, [filters, featuredProducts]);

  const toggle = (key: keyof Filters) =>
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const clearAll = () =>
    setFilters({ healthy: false, bestseller: false, veg: false, nonveg: false });

  return (
    <>
      <Navbar />

      <main className="bg-cream pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* ================= HERO (OLD ZIP) ================= */}
          <section className="grid md:grid-cols-2 gap-10 items-center mb-20">
            <div>
              <p className="text-sm font-semibold text-gold mb-2">
                Traditional • Hygienic • Fresh
              </p>

              <h1 className="text-4xl md:text-6xl font-extrabold text-brown">
                Authentic <span className="text-gold">Konaseema</span> Sweets
              </h1>

              <p className="mt-5 text-brown/70 max-w-lg">
                Classic recipes from Konaseema — made with pure ingredients and
                packed carefully for delivery.
              </p>

              <div className="flex gap-4 mt-6">
                <a href="/products" className="btn-primary">
                  Shop Products
                </a>
              </div>
            </div>

            {/* OUR SPECIAL ITEM */}
            <div className="premium-card p-6">
              <p className="text-sm font-semibold text-gold mb-2">
                Our Special Item
              </p>

              <h3 className="text-2xl font-bold text-brown">
                {PRODUCTS[0].name}
              </h3>

              <p className="text-sm text-brown/70 mb-3">
                {PRODUCTS[0].weight}
              </p>

              <img
                src={PRODUCTS[0].image}
                alt={PRODUCTS[0].name}
                className="rounded-2xl w-full h-56 object-cover mb-4"
              />

              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-brown">
                  ₹{PRODUCTS[0].price}
                </div>
                <button
                  className="btn-primary"
                  onClick={() => add(PRODUCTS[0])} // ✅ FIXED
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </section>

          {/* ================= FEATURED PRODUCTS ================= */}
          <div className="flex items-center justify-between mb-8 relative">
            <h2 className="text-3xl font-extrabold text-brown">
              Featured Products
            </h2>

            <button
              onClick={() => setShowFilter((v) => !v)}
              className="text-sm font-semibold"
            >
              Filter
            </button>

            {showFilter && (
              <div className="absolute right-0 top-full mt-2 premium-card p-4 z-50">
                <label>
                  <input type="checkbox" onChange={() => toggle("healthy")} /> Healthy
                </label>
                <br />
                <label>
                  <input type="checkbox" onChange={() => toggle("bestseller")} /> Best Seller
                </label>
                <br />
                <label>
                  <input type="checkbox" onChange={() => toggle("veg")} /> Veg
                </label>
                <br />
                <label>
                  <input type="checkbox" onChange={() => toggle("nonveg")} /> Non Veg
                </label>
                <br />
                <button
                  onClick={clearAll}
                  className="mt-2 text-xs text-brown/70"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredFeatured.map((p: any) => (
              <div key={p.id} className="premium-card p-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
                <h3 className="font-bold text-brown">{p.name}</h3>
                <p className="text-sm text-brown/70">₹{p.price}</p>
                <button
                  className="btn-primary w-full mt-3"
                  onClick={() => add(p)} // ✅ FIXED
                >
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

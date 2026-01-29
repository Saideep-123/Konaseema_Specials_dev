"use client";

import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PRODUCTS } from "./components/data";

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

  const [open, setOpen] = useState(false);

  const featured = PRODUCTS.slice(0, 4);

  const filtered = useMemo(() => {
    return featured.filter((p) => {
      if (filters.healthy && !p.isHealthy) return false;
      if (filters.bestseller && !p.isBestSeller) return false;
      if (filters.veg && p.foodType !== "veg") return false;
      if (filters.nonveg && p.foodType !== "nonveg") return false;
      return true;
    });
  }, [filters, featured]);

  const toggle = (k: keyof Filters) =>
    setFilters((p) => ({ ...p, [k]: !p[k] }));

  return (
    <>
      <Navbar />

      <main className="bg-cream pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-3xl font-extrabold text-brown">
              Featured Products
            </h2>

            {/* FILTER DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="border px-4 py-2 rounded-lg text-sm font-bold"
              >
                Filter
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl p-4 z-50">
                  <FilterItem label="Healthy" onClick={() => toggle("healthy")} />
                  <FilterItem label="Best Seller" onClick={() => toggle("bestseller")} />
                  <FilterItem label="Veg" onClick={() => toggle("veg")} />
                  <FilterItem label="Non Veg" onClick={() => toggle("nonveg")} />
                </div>
              )}
            </div>
          </div>

          {/* GRID (UNCHANGED LOOK) */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <div key={p.id} className="card p-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-sm text-brown/70">₹{p.price}</p>
                <button className="btn-primary w-full mt-3">
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

function FilterItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer py-1">
      <input type="checkbox" onChange={onClick} />
      <span className="text-sm">{label}</span>
    </label>
  );
}

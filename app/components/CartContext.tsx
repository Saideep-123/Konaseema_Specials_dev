"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Variant = { label: string };

export type Product = {
  id: string;
  name: string;
  weight: string; // default label shown in grid (we keep it)
  category: string;
  image: string;

  // NEW: priceKey points into prices.ts
  priceKey: string;

  // optional product details for quick view
  desc?: string;
  highlights?: string[];
  variants?: Variant[]; // if not provided, quick view will show default 250g/500g/1kg
};

export type CartItem = {
  id: string;
  name: string;
  category: string;
  image: string;

  priceKey: string;

  // selected size label (e.g. 250g / 500g / 1kg / 1L / 500ml)
  size: string;

  // price per unit for this size (already converted by FX_RATE)
  unitPrice: number;

  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  total: number;

  add: (p: Product, opts?: { size?: string; qty?: number; unitPrice?: number }) => void;
  dec: (id: string) => void;
  inc: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;

  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

const STORAGE_KEY = "konaseema_cart_v2";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // save
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const total = useMemo(() => items.reduce((s, i) => s + i.qty * i.unitPrice, 0), [items]);

  const add: CartCtx["add"] = (p, opts) => {
    const size = opts?.size ?? p.weight ?? "250g";
    const unitPrice = Number(opts?.unitPrice ?? 0);
    const qtyAdd = Math.max(1, Number(opts?.qty ?? 1));

    setItems((prev) => {
      // unique per product+size
      const key = `${p.id}__${size}`;
      const found = prev.find((x) => `${x.id}__${x.size}` === key);

      if (found) {
        return prev.map((x) =>
          `${x.id}__${x.size}` === key ? { ...x, qty: x.qty + qtyAdd } : x
        );
      }

      return [
        ...prev,
        {
          id: p.id,
          name: p.name,
          category: p.category,
          image: p.image,
          priceKey: p.priceKey,
          size,
          unitPrice,
          qty: qtyAdd,
        },
      ];
    });

    setIsOpen(true);
  };

  const inc = (id: string) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)));

  const dec = (id: string) =>
    setItems((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0)
    );

  const remove = (id: string) => setItems((prev) => prev.filter((x) => x.id !== id));
  const clear = () => setItems([]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);

  const value: CartCtx = {
    items,
    count,
    total,
    add,
    dec,
    inc,
    remove,
    clear,
    isOpen,
    open,
    close,
    toggle,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { supabase } from "../lib/supabaseClient";

const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // 🔴 change this

type Shipping = {
  full_name: string;
  email: string;
  phone: string;
  country: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  delivery_notes: string;
};

export default function CheckoutPage() {
  const cart = useCart();

  const [form, setForm] = useState<Shipping>({
    full_name: "",
    email: "",
    phone: "",
    country: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    delivery_notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const errors = useMemo(() => {
    const e: Record<string, boolean> = {};
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

    if (!form.full_name.trim()) e.full_name = true;
    if (!form.email.trim() || !emailOk) e.email = true;
    if (!form.phone.trim()) e.phone = true;
    if (!form.country.trim()) e.country = true;
    if (!form.address_line1.trim()) e.address_line1 = true;
    if (!form.city.trim()) e.city = true;
    if (!form.state.trim()) e.state = true;
    if (!form.postal_code.trim()) e.postal_code = true;

    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const inputClass =
    "w-full px-4 py-3 rounded-2xl border border-[#d8b679] bg-[#fff7ea] focus:outline-none focus:ring-2 focus:ring-[#d8b679]/40";

  const openWhatsApp = (message: string) => {
    const num = WHATSAPP_NUMBER.replace(/[^\d]/g, "");
    const url = `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onWhatsAppOrder = async () => {
    setError(null);

    if (!isValid) {
      setError("Please fill all required fields.");
      return;
    }

    if (cart.items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr) throw new Error(userErr.message);
      if (!userData.user) throw new Error("Please login to place the order.");

      const user_id = userData.user.id;

      // 1️⃣ Address
      const { data: address, error: addrErr } = await supabase
        .from("addresses")
        .insert({
          user_id,
          full_name: form.full_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address_line1: form.address_line1.trim(),
          address_line2: form.address_line2.trim() || null,
          city: form.city.trim(),
          state: form.state.trim(),
          postal_code: form.postal_code.trim(),
          country: form.country.trim(),
        })
        .select("id")
        .single();

      if (addrErr) throw new Error(addrErr.message);

      const subtotal = cart.items.reduce(
        (s: number, i: any) => s + Number(i.price) * Number(i.qty),
        0
      );

      // 2️⃣ Order
      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({
          user_id,
          address_id: address.id,
          currency: "INR",
          status: "pending",
          subtotal,
          shipping: 0,
          total: subtotal,
          notes: form.delivery_notes.trim() || null,
        })
        .select("id")
        .single();

      if (orderErr) throw new Error(orderErr.message);

      // 3️⃣ Order items
      const itemsPayload = cart.items.map((i: any) => ({
        order_id: order.id,
        product_id: String(i.id),
        name: i.name,
        price: Number(i.price),
        qty: Number(i.qty),
      }));

      const { error: itemsErr } = await supabase
        .from("order_items")
        .insert(itemsPayload);

      if (itemsErr) throw new Error(itemsErr.message);

      // 4️⃣ WhatsApp message
      const msg = [
        "Hi, I placed an order on Konaseema Foods.",
        `Order ID: ${order.id}`,
        `Total: ₹${subtotal}`,
        "Please assist with the next steps.",
      ].join("\n");

      cart.clear();
      openWhatsApp(msg);
    } catch (e: any) {
      setError(e?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-5">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brown mb-8">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* ORDER SUMMARY (NO BUTTON HERE) */}
            <section className="card p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {cart.items.map((i: any) => (
                <div
                  key={i.id}
                  className="flex items-center justify-between mb-3"
                >
                  <div className="font-semibold text-brown">
                    {i.name} × {i.qty}
                  </div>
                  <div className="font-bold text-brown">
                    ₹{Number(i.price) * Number(i.qty)}
                  </div>
                </div>
              ))}

              <div className="border-t mt-4 pt-4 flex justify-between font-extrabold text-lg">
                <span>Total</span>
                <span>₹{cart.total}</span>
              </div>
            </section>

            {/* SHIPPING DETAILS (ONLY BUTTON HERE) */}
            <section className="card p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Details</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input className={inputClass} placeholder="Full Name *" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
                <input className={inputClass} placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className={inputClass} placeholder="Phone *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input className={inputClass} placeholder="Country *" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                <input className={inputClass} placeholder="City *" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                <input className={inputClass} placeholder="State *" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
                <input className={inputClass} placeholder="ZIP / Postal *" value={form.postal_code} onChange={(e) => setForm({ ...form, postal_code: e.target.value })} />
                <input className={inputClass} placeholder="Address Line 1 *" value={form.address_line1} onChange={(e) => setForm({ ...form, address_line1: e.target.value })} />
                <input className={inputClass} placeholder="Address Line 2" value={form.address_line2} onChange={(e) => setForm({ ...form, address_line2: e.target.value })} />
              </div>

              <textarea
                className={`${inputClass} mt-4 min-h-[110px]`}
                placeholder="Delivery Notes"
                value={form.delivery_notes}
                onChange={(e) =>
                  setForm({ ...form, delivery_notes: e.target.value })
                }
              />

              {error && (
                <div className="mt-4 text-sm text-red-600">{error}</div>
              )}

              {/* ✅ SINGLE WHATSAPP BUTTON */}
              <button
                className="btn-whatsapp mt-6"
                onClick={onWhatsAppOrder}
                disabled={loading}
              >
                💬 Order via WhatsApp (₹{cart.total})
              </button>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

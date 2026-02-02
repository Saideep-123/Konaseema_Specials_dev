"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { supabase } from "../lib/supabaseClient";

const WHATSAPP_NUMBER = "7989301401";

export default function CheckoutPage() {
  const cart = useCart();

  /* ---------------- ADDRESS ---------------- */
  const [address, setAddress] = useState({
    full_name: "",
    email: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
  });

  /* ---------------- COUPON ---------------- */
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState<string | null>(null);

  /* ---------------- TOTALS ---------------- */
  const subtotal = cart.items.reduce(
    (s: number, it: any) => s + it.price * it.qty,
    0
  );
  const total = Math.max(0, subtotal - discount);

  /* ---------------- APPLY COUPON ---------------- */
  const applyCoupon = async () => {
    setCouponMsg(null);
    setDiscount(0);

    if (!coupon.trim()) return;

    const { data } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", coupon.trim().toUpperCase())
      .eq("is_active", true)
      .single();

    if (!data) {
      setCouponMsg("Invalid or expired coupon");
      return;
    }

    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      setCouponMsg("Coupon expired");
      return;
    }

    if (subtotal < data.min_order_value) {
      setCouponMsg(`Minimum order ₹${data.min_order_value}`);
      return;
    }

    const d =
      data.type === "percent"
        ? Math.floor((subtotal * data.value) / 100)
        : data.value;

    setDiscount(d);
    setCouponMsg(`Coupon applied (-₹${d})`);
  };

  /* ---------------- PLACE ORDER ---------------- */
  const placeOrder = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      alert("Please login");
      return;
    }

    const { data: addr } = await supabase
      .from("addresses")
      .insert({
        user_id: userData.user.id,
        ...address,
      })
      .select("id")
      .single();

    const { data: order } = await supabase
      .from("orders")
      .insert({
        user_id: userData.user.id,
        address_id: addr.id,
        subtotal,
        discount_amount: discount,
        coupon_code: coupon || null,
        total,
        status: "pending",
      })
      .select("id")
      .single();

    await supabase.from("order_items").insert(
      cart.items.map((i: any) => ({
        order_id: order.id,
        product_id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
      }))
    );

    cart.clear();

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Order ${order.id}\nTotal ₹${total}`
      )}`,
      "_blank"
    );
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-5">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* ORDER SUMMARY */}
            <section className="card p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {cart.items.map((it: any) => (
                <div key={it.id} className="flex justify-between mb-2">
                  <span>{it.name} × {it.qty}</span>
                  <span>₹{it.price * it.qty}</span>
                </div>
              ))}

              {/* COUPON */}
              <div className="mt-4">
                <label className="text-sm font-semibold">Coupon Code</label>
                <div className="flex gap-2 mt-1">
                  <input
                    className="w-full px-3 py-2 rounded-xl border"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button className="btn-secondary" onClick={applyCoupon}>
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <div className="text-sm mt-1">{couponMsg}</div>
                )}
              </div>

              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </section>

            {/* ADDRESS BLOCK */}
            <section className="card p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

              {[
                ["full_name", "Full Name"],
                ["email", "Email"],
                ["phone", "Phone"],
                ["address_line1", "Address Line 1"],
                ["address_line2", "Address Line 2"],
                ["city", "City"],
                ["state", "State"],
                ["postal_code", "Postal Code"],
              ].map(([k, label]) => (
                <input
                  key={k}
                  placeholder={label}
                  className="w-full mb-3 px-3 py-2 border rounded-xl"
                  value={(address as any)[k]}
                  onChange={(e) =>
                    setAddress({ ...address, [k]: e.target.value })
                  }
                />
              ))}

              <button
                className="btn-primary w-full mt-4"
                onClick={placeOrder}
              >
                Place Order (₹{total})
              </button>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

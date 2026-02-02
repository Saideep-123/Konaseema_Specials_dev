"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { supabase } from "../lib/supabaseClient";

const WHATSAPP_NUMBER = "7989301401";

type Shipping = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  deliveryNotes: string;
};

export default function CheckoutPage() {
  const cart = useCart();

  const [shipping, setShipping] = useState<Shipping>({
    fullName: "",
    email: "",
    phone: "",
    country: "India",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    deliveryNotes: "",
  });

  /* ---------------- COUPON STATE ---------------- */
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

    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", coupon.trim().toUpperCase())
      .eq("is_active", true)
      .single();

    if (error || !data) {
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

    const { data: address } = await supabase
      .from("addresses")
      .insert({
        user_id: userData.user.id,
        full_name: shipping.fullName,
        email: shipping.email,
        phone: shipping.phone,
        address_line1: shipping.address1,
        address_line2: shipping.address2 || null,
        city: shipping.city,
        state: shipping.state,
        postal_code: shipping.zip,
        country: shipping.country,
      })
      .select("id")
      .single();

    const { data: order } = await supabase
      .from("orders")
      .insert({
        user_id: userData.user.id,
        address_id: address.id,
        subtotal,
        total,
        coupon_code: coupon || null,
        discount_amount: discount,
        status: "pending",
      })
      .select("id")
      .single();

    const items = cart.items.map((i: any) => ({
      order_id: order.id,
      product_id: i.id,
      name: i.name,
      price: i.price,
      qty: i.qty,
    }));

    await supabase.from("order_items").insert(items);

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
          <h1 className="text-4xl font-extrabold mb-8">Checkout</h1>

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
                  <button
                    className="btn-secondary"
                    type="button"
                    onClick={applyCoupon}
                  >
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

            {/* SHIPPING */}
            <section className="card p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
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

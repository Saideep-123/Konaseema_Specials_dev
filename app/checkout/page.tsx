"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { supabase } from "../lib/supabaseClient";

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

const STORAGE_KEY = "konaseema_shipping_v1";

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();

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

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Load saved shipping draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setShipping((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch {}
  }, []);

  // Persist shipping draft
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shipping));
    } catch {}
  }, [shipping]);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    const email = shipping.email.trim();
    const phone = shipping.phone.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneOk = phone.length >= 7;

    if (!shipping.fullName.trim()) e.fullName = "Full name is required";
    if (!email) e.email = "Email is required";
    else if (!emailOk) e.email = "Enter a valid email";

    if (!phone) e.phone = "Phone number is required";
    else if (!phoneOk) e.phone = "Enter a valid phone number";

    if (!shipping.country.trim()) e.country = "Country is required";
    if (!shipping.address1.trim()) e.address1 = "Address line 1 is required";
    if (!shipping.city.trim()) e.city = "City is required";
    if (!shipping.state.trim()) e.state = "State is required";
    if (!shipping.zip.trim()) e.zip = "ZIP / Postal code is required";

    return e;
  }, [shipping]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const inputBase =
    "w-full px-4 py-3 rounded-2xl border border-gold bg-[#fffaf2] focus:outline-none focus:ring-2 focus:ring-gold/40";
  const inputErr = "border-red-400 focus:ring-red-200";
  const showErr = (k: keyof Shipping) => touched[k] && errors[k];

  const saveOrderToDb = async (): Promise<string> => {
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr) throw new Error(userErr.message);
    if (!userData.user) throw new Error("Please login to place the order.");

    const userId = userData.user.id;
    const subtotal = cart.items.reduce((s, it) => s + Number(it.price) * Number(it.qty), 0);
    const shippingFee = 0;
    const total = subtotal + shippingFee;

    const { data: address, error: addrErr } = await supabase
      .from("addresses")
      .insert({
        user_id: userId,
        full_name: shipping.fullName.trim(),
        email: shipping.email.trim(),
        phone: shipping.phone.trim(),
        address_line1: shipping.address1.trim(),
        address_line2: shipping.address2.trim() ? shipping.address2.trim() : null,
        city: shipping.city.trim(),
        state: shipping.state.trim(),
        postal_code: shipping.zip.trim(),
        country: shipping.country.trim(),
      })
      .select("id")
      .single();

    if (addrErr) throw new Error(addrErr.message);

    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        address_id: address.id,
        currency: "INR",
        status: "pending",
        subtotal,
        shipping: shippingFee,
        total,
        notes: shipping.deliveryNotes.trim() ? shipping.deliveryNotes.trim() : null,
      })
      .select("id")
      .single();

    if (orderErr) throw new Error(orderErr.message);

    const itemsPayload = cart.items.map((i) => ({
      order_id: order.id,
      product_id: String(i.id),
      name: i.name,
      price: Number(i.price),
      qty: Number(i.qty),
      image: i.image ?? null,
      weight: i.weight ?? null,
      category: i.category ?? null,
    }));

    const { error: itemsErr } = await supabase.from("order_items").insert(itemsPayload);
    if (itemsErr) throw new Error(itemsErr.message);

    return String(order.id);
  };

  const onPlaceOrder = async () => {
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      country: true,
      address1: true,
      city: true,
      state: true,
      zip: true,
    });

    if (cart.items.length === 0) {
      setSaveError("Your cart is empty.");
      return;
    }
    if (!isValid) {
      setSaveError("Please fill all required fields.");
      return;
    }

    try {
      setSaveError(null);
      setSuccessMsg(null);
      setSaving(true);

      const orderId = await saveOrderToDb();
      setSuccessMsg(`✅ Order placed successfully. Order ID: ${orderId}`);

      // keep shipping draft (useful for repeat orders), but clear cart
      cart.clear();
    } catch (e: any) {
      setSaveError(e?.message || "Failed to place order.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-5">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brown mb-8">Checkout</h1>

          {cart.items.length === 0 ? (
            <section className="card p-6">
              <div className="text-lg font-semibold">Your cart is empty.</div>
              <p className="opacity-75 mt-2">Add items to the cart, then come back to checkout.</p>
              <button className="btn-primary mt-6" onClick={() => router.push("/")} type="button">
                Go to Home
              </button>
            </section>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              <section className="card p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  {cart.items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between">
                      <div className="font-semibold">
                        {it.name} <span className="opacity-70">× {it.qty}</span>
                      </div>
                      <div className="font-semibold">₹{it.qty * it.price}</div>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-5 pt-4 flex items-center justify-between text-lg font-extrabold">
                  <div>Total</div>
                  <div>₹{cart.total}</div>
                </div>
              </section>

              <section className="card p-6">
                <h2 className="text-xl font-bold mb-4">Shipping Details</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field
                    label="Full Name *"
                    value={shipping.fullName}
                    onChange={(v) => setShipping({ ...shipping, fullName: v })}
                    onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
                    className={`${inputBase} ${showErr("fullName") ? inputErr : ""}`}
                  />
                  <Field
                    label="Email *"
                    value={shipping.email}
                    onChange={(v) => setShipping({ ...shipping, email: v })}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    className={`${inputBase} ${showErr("email") ? inputErr : ""}`}
                  />
                  <Field
                    label="Phone *"
                    value={shipping.phone}
                    onChange={(v) => setShipping({ ...shipping, phone: v })}
                    onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                    className={`${inputBase} ${showErr("phone") ? inputErr : ""}`}
                  />
                  <Field
                    label="Country *"
                    value={shipping.country}
                    onChange={(v) => setShipping({ ...shipping, country: v })}
                    onBlur={() => setTouched((t) => ({ ...t, country: true }))}
                    className={`${inputBase} ${showErr("country") ? inputErr : ""}`}
                  />
                  <Field
                    label="Address Line 1 *"
                    value={shipping.address1}
                    onChange={(v) => setShipping({ ...shipping, address1: v })}
                    onBlur={() => setTouched((t) => ({ ...t, address1: true }))}
                    className={`${inputBase} ${showErr("address1") ? inputErr : ""}`}
                  />
                  <Field
                    label="Address Line 2"
                    value={shipping.address2}
                    onChange={(v) => setShipping({ ...shipping, address2: v })}
                    onBlur={() => setTouched((t) => ({ ...t, address2: true }))}
                    className={inputBase}
                  />
                  <Field
                    label="City *"
                    value={shipping.city}
                    onChange={(v) => setShipping({ ...shipping, city: v })}
                    onBlur={() => setTouched((t) => ({ ...t, city: true }))}
                    className={`${inputBase} ${showErr("city") ? inputErr : ""}`}
                  />
                  <Field
                    label="State *"
                    value={shipping.state}
                    onChange={(v) => setShipping({ ...shipping, state: v })}
                    onBlur={() => setTouched((t) => ({ ...t, state: true }))}
                    className={`${inputBase} ${showErr("state") ? inputErr : ""}`}
                  />
                  <Field
                    label="ZIP / Postal *"
                    value={shipping.zip}
                    onChange={(v) => setShipping({ ...shipping, zip: v })}
                    onBlur={() => setTouched((t) => ({ ...t, zip: true }))}
                    className={`${inputBase} ${showErr("zip") ? inputErr : ""}`}
                  />

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1">Delivery Notes</label>
                    <textarea
                      className={`${inputBase} min-h-[110px]`}
                      value={shipping.deliveryNotes}
                      onChange={(e) => setShipping({ ...shipping, deliveryNotes: e.target.value })}
                    />
                  </div>
                </div>

                {saveError && <div className="mt-4 text-sm text-red-600">{saveError}</div>}
                {successMsg && <div className="mt-4 text-sm text-green-700">{successMsg}</div>}

                <button
                  className="btn-primary mt-6 w-full"
                  onClick={onPlaceOrder}
                  disabled={saving}
                  type="button"
                >
                  {saving ? "Placing order..." : `Place Order (₹${cart.total})`}
                </button>
              </section>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  className: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input className={className} value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} />
    </div>
  );
}

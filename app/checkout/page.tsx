"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../components/CartContext";
import { supabase } from "../lib/supabaseClient";

const WHATSAPP_NUMBER = "7989301401"; // ✅ change this (countrycode + number)

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

function safeStr(v: any) {
  return String(v ?? "").trim();
}

// Builds a fixed-width "table" using monospace code block for WhatsApp
function makeTable(headers: string[], rows: string[][]) {
  const widths = headers.map((h, i) =>
    Math.max(
      h.length,
      ...rows.map((r) => (r[i] ? String(r[i]).length : 0))
    )
  );

  const line = (cols: string[]) =>
    cols
      .map((c, i) => {
        const s = String(c ?? "");
        return s + " ".repeat(Math.max(0, widths[i] - s.length));
      })
      .join("  ");

  const sep = widths.map((w) => "-".repeat(w)).join("  ");

  return [line(headers), sep, ...rows.map(line)].join("\n");
}

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

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setShipping((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch {}
  }, []);

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

  const openWhatsApp = (message: string) => {
    const clean = WHATSAPP_NUMBER.replace(/[^\d]/g, "");
    const url = `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const buildWhatsAppMessage = (orderId: string, subtotal: number, shippingFee: number, total: number) => {
    const deliveryRows = [
      ["Name", safeStr(shipping.fullName)],
      ["Email", safeStr(shipping.email)],
      ["Phone", safeStr(shipping.phone)],
      ["Country", safeStr(shipping.country)],
      ["Address 1", safeStr(shipping.address1)],
      ["Address 2", safeStr(shipping.address2 || "-")],
      ["City", safeStr(shipping.city)],
      ["State", safeStr(shipping.state)],
      ["ZIP", safeStr(shipping.zip)],
      ["Notes", safeStr(shipping.deliveryNotes || "-")],
    ];

    const itemsRows = cart.items.map((it: any, idx: number) => {
      const name = safeStr(it.name);
      const qty = String(Number(it.qty));
      const price = `₹${Number(it.price)}`;
      const line = `₹${Number(it.price) * Number(it.qty)}`;
      return [String(idx + 1), name, qty, price, line];
    });

    const deliveryTable = makeTable(["Field", "Value"], deliveryRows);
    const itemsTable = makeTable(["#", "Item", "Qty", "Price", "Line"], itemsRows);

    const totalsTable = makeTable(
      ["Label", "Amount"],
      [
        ["Subtotal", `₹${subtotal}`],
        ["Shipping", `₹${shippingFee}`],
        ["Total", `₹${total}`],
      ]
    );

    // WhatsApp supports monospace via ``` blocks
    return [
      "Hi! I placed an order on the website.",
      `Order ID: ${orderId}`,
      "",
      "Delivery Details:",
      "```",
      deliveryTable,
      "```",
      "",
      "Order Items:",
      "```",
      itemsTable,
      "```",
      "",
      "Totals:",
      "```",
      totalsTable,
      "```",
      "",
      "Please confirm and assist with next steps. Thanks!",
    ].join("\n");
  };

  const saveOrderToDb = async (): Promise<{ orderId: string; subtotal: number; shippingFee: number; total: number }> => {
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr) throw new Error(userErr.message);
    if (!userData.user) throw new Error("Please login to place the order.");
    const userId = userData.user.id;

    const subtotal = cart.items.reduce(
      (s: number, it: any) => s + Number(it.price) * Number(it.qty),
      0
    );

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

    const itemsPayload = cart.items.map((i: any) => ({
      order_id: order.id,
      product_id: String(i.id),
      name: i.name,
      price: Number(i.price),
      qty: Number(i.qty),
    }));

    const { error: itemsErr } = await supabase.from("order_items").insert(itemsPayload);
    if (itemsErr) throw new Error(itemsErr.message);

    return { orderId: String(order.id), subtotal, shippingFee, total };
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

    if (!isValid) {
      setSaveError("Please fill all required fields.");
      return;
    }
    if (cart.items.length === 0) {
      setSaveError("Your cart is empty.");
      return;
    }

    try {
      setSaveError(null);
      setSuccessMsg(null);
      setSaving(true);

      const { orderId, subtotal, shippingFee, total } = await saveOrderToDb();

      setSuccessMsg(`✅ Order placed successfully. Order ID: ${orderId}`);

      // ✅ Build WhatsApp message with all checkout data (tables)
      const waMsg = buildWhatsAppMessage(orderId, subtotal, shippingFee, total);

      // ✅ Clear cart after successful checkout
      cart.clear();
      cart.close?.();

      // ✅ Open WhatsApp
      openWhatsApp(waMsg);
    } catch (e: any) {
      setSaveError(e?.message || "Failed to place order.");
    } finally {
      setSaving(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-2xl border border-gold bg-[#fffaf2] focus:outline-none focus:ring-2 focus:ring-gold/40";
  const inputErr = "border-red-400 focus:ring-red-200";

  const showErr = (k: keyof Shipping) => touched[k] && errors[k];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-5">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brown mb-8">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            <section className="card p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3">
                {cart.items.map((it: any) => (
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
                  className={`${inputBase} ${showErr("fullName") ? inputErr : ""}`}
                />
                <Field
                  label="Email *"
                  value={shipping.email}
                  onChange={(v) => setShipping({ ...shipping, email: v })}
                  className={`${inputBase} ${showErr("email") ? inputErr : ""}`}
                />
                <Field
                  label="Phone *"
                  value={shipping.phone}
                  onChange={(v) => setShipping({ ...shipping, phone: v })}
                  className={`${inputBase} ${showErr("phone") ? inputErr : ""}`}
                />
                <Field
                  label="Country *"
                  value={shipping.country}
                  onChange={(v) => setShipping({ ...shipping, country: v })}
                  className={`${inputBase} ${showErr("country") ? inputErr : ""}`}
                />
                <Field
                  label="Address Line 1 *"
                  value={shipping.address1}
                  onChange={(v) => setShipping({ ...shipping, address1: v })}
                  className={`${inputBase} ${showErr("address1") ? inputErr : ""}`}
                />
                <Field
                  label="Address Line 2"
                  value={shipping.address2}
                  onChange={(v) => setShipping({ ...shipping, address2: v })}
                  className={inputBase}
                />
                <Field
                  label="City *"
                  value={shipping.city}
                  onChange={(v) => setShipping({ ...shipping, city: v })}
                  className={`${inputBase} ${showErr("city") ? inputErr : ""}`}
                />
                <Field
                  label="State *"
                  value={shipping.state}
                  onChange={(v) => setShipping({ ...shipping, state: v })}
                  className={`${inputBase} ${showErr("state") ? inputErr : ""}`}
                />
                <Field
                  label="ZIP / Postal *"
                  value={shipping.zip}
                  onChange={(v) => setShipping({ ...shipping, zip: v })}
                  className={`${inputBase} ${showErr("zip") ? inputErr : ""}`}
                />

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-1">
                    Delivery Notes
                  </label>
                  <textarea
                    className={`${inputBase} min-h-[110px]`}
                    value={shipping.deliveryNotes}
                    onChange={(e) =>
                      setShipping({ ...shipping, deliveryNotes: e.target.value })
                    }
                  />
                </div>
              </div>

              {saveError && <div className="mt-4 text-sm text-red-600">{saveError}</div>}
              {successMsg && <div className="mt-4 text-sm text-green-700">{successMsg}</div>}

              <button
                className="btn-primary mt-6 w-full"
                onClick={onPlaceOrder}
                disabled={saving || cart.items.length === 0}
                type="button"
              >
                {saving ? "Saving..." : `Place Order (₹${cart.total})`}
              </button>

              {cart.items.length === 0 && (
                <div className="mt-3 text-sm opacity-70">Your cart is empty.</div>
              )}
            </section>
          </div>
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
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input className={className} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

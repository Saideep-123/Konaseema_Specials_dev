{/* ================= HERO SECTION (ORIGINAL ZIP) ================= */}
<section className="grid md:grid-cols-2 gap-10 items-center mb-20">

  {/* LEFT CONTENT */}
  <div>
    <p className="text-sm font-semibold text-gold mb-2">
      Traditional • Hygienic • Fresh
    </p>

    <h1 className="text-4xl md:text-6xl font-extrabold text-brown leading-tight">
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

      <a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        className="px-5 py-3 rounded-lg bg-green-600 text-white font-semibold"
      >
        Contact on WhatsApp
      </a>
    </div>

    {/* FEATURES */}
    <div className="grid grid-cols-3 gap-6 mt-10">
      <div>
        <div className="font-bold text-brown">Fresh</div>
        <div className="text-xs text-brown/70">Packed Daily</div>
      </div>
      <div>
        <div className="font-bold text-brown">Pan-India</div>
        <div className="text-xs text-brown/70">Shipping</div>
      </div>
      <div>
        <div className="font-bold text-brown">Premium</div>
        <div className="text-xs text-brown/70">Gift Boxes</div>
      </div>
    </div>
  </div>

  {/* RIGHT – OUR SPECIAL ITEM */}
  <div className="bg-white rounded-3xl p-6 shadow-sm">
    <p className="text-sm font-semibold text-gold mb-2">
      Our Special Item
    </p>

    <h3 className="text-2xl font-bold text-brown">
      Pootharekulu
    </h3>

    <p className="text-sm text-brown/70 mb-3">250g</p>

    <img
      src="https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=1200"
      alt="Pootharekulu"
      className="rounded-2xl w-full h-56 object-cover mb-4"
    />

    <div className="flex items-center justify-between">
      <div className="text-xl font-bold text-brown">₹399</div>
      <button className="btn-primary">Add to Cart</button>
    </div>

    <p className="text-xs text-brown/60 mt-2">
      Checkout happens from Cart.
    </p>
  </div>

</section>
{/* ================= END HERO ================= */}

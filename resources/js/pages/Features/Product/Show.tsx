import { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import { type Product, type SharedData } from "@/types";
import { route } from "ziggy-js";
import Header from "@/pages/welcome/Partials/Header";
import Footer from "@/pages/welcome/Partials/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingCart, Truck, ShieldCheck, ArrowLeft, Star, CreditCard, Package } from "lucide-react";
import { Toaster, toast } from 'sonner';
import { Link } from "@inertiajs/react";

interface Props {
  product: Product;
}

export default function Show({ product }: Props) {
  const { auth } = usePage<SharedData>().props;
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const selectedVariant = product.variants?.find(v => {
    return Object.entries(selectedOptions).every(([k, val]) => v.options[k] === val) &&
           Object.keys(v.options).length === (product.custom_options?.length || 0);
  });

  const currentStock = selectedVariant ? selectedVariant.stock : product.stock;

  const [selectedImage, setSelectedImage] = useState(
    product.images && product.images.length > 0
      ? "/storage/" + product.images[0].image_path
      : "https://placehold.co/600x600/1e293b/94a3b8?text=No+Image"
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleDecrease = () => { if (quantity > 1) setQuantity(quantity - 1); };
  const handleIncrease = () => { if (quantity < currentStock) setQuantity(quantity + 1); };

  const addToCart = () => {
    if (!auth.user) {
      toast.error("Silahkan login terlebih dahulu untuk berbelanja.");
      return;
    }
    if (product.custom_options && product.custom_options.length > 0 && !selectedVariant) {
      toast.error("Silakan pilih varian yang tersedia terlebih dahulu.");
      return;
    }
    router.post(route('cart.store'), {
      product_id: product.id,
      product_variant_id: selectedVariant?.id,
      quantity: quantity
    }, {
      preserveScroll: true,
      onSuccess: () => toast.success("Produk berhasil ditambahkan ke keranjang!"),
      onError: (errors) => {
        if (errors.quantity) toast.error(errors.quantity);
        else toast.error("Gagal menambahkan produk.");
      }
    });
  };

  const buyNow = () => {
    if (!auth.user) {
      toast.error("Silahkan login terlebih dahulu untuk berbelanja.");
      return;
    }
    if (product.custom_options && product.custom_options.length > 0 && !selectedVariant) {
      toast.error("Silakan pilih varian yang tersedia terlebih dahulu.");
      return;
    }
    router.post(route('cart.store'), {
      product_id: product.id,
      product_variant_id: selectedVariant?.id,
      quantity: quantity,
      buy_now: true
    }, {
      preserveScroll: true,
      onError: (errors) => {
        if (errors.quantity) toast.error(errors.quantity);
        else toast.error("Gagal memproses.");
      }
    });
  };

  const canAddToCart = !(
    (product.custom_options && product.custom_options.length > 0 && !selectedVariant) ||
    (!product.custom_options?.length && product.stock <= 0)
  );

  const cartLabel = product.custom_options && product.custom_options.length > 0
    ? (!selectedVariant ? "Pilih Varian" : (selectedVariant.stock > 0 ? "+ Keranjang" : "Pre-order"))
    : (product.stock > 0 ? "+ Keranjang" : "Stok Habis");

  const buyNowLabel = product.custom_options && product.custom_options.length > 0
    ? (!selectedVariant ? "Pilih Varian" : (selectedVariant.stock > 0 ? "Beli Sekarang" : "Pre-order Langsung"))
    : (product.stock > 0 ? "Beli Sekarang" : "Stok Habis");

  const activePrice = selectedVariant && selectedVariant.selling_price ? selectedVariant.selling_price : product.selling_price;
  const installmentEstimate = Math.ceil(activePrice * 1.5 / 10);

  return (
    <>
      <Head title={`${product.name} — Haji Elektronik`} />
      <Toaster richColors closeButton position="top-center" />
      <div className="flex min-h-screen w-full flex-col" style={{ background: '#0d1e2e', color: '#F7F7FF' }}>
        <Header user={auth.user} />

        <main className="flex-1 py-8 pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-400 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Beranda
              </Link>
            </div>

            <div className="lg:grid lg:grid-cols-2 lg:gap-x-14 xl:gap-x-20 items-start">

              {/* ─── Left: Images ─── */}
              <div className="flex flex-col-reverse lg:flex-row gap-4 mb-10 lg:mb-0">
                {/* Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
                    {product.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImage("/storage/" + image.image_path)}
                        className={`relative h-18 w-18 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                          selectedImage === "/storage/" + image.image_path
                            ? "border-orange-500 shadow-lg shadow-orange-500/20"
                            : "border-white/10 hover:border-white/30 bg-slate-800/50"
                        }`}
                        style={{ height: '72px', width: '72px' }}
                      >
                        <img
                          src={"/storage/" + image.image_path}
                          alt={`${product.name} ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Image */}
                <div className="relative aspect-square w-full flex-1 overflow-hidden rounded-3xl bg-slate-800/50 border border-white/10 group">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Stock badge */}
                  {currentStock > 0 && currentStock <= 5 && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                        Sisa {currentStock} Unit
                      </span>
                    </div>
                  )}
                  {currentStock <= 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm rounded-3xl">
                      <span className="rounded-full bg-slate-800 border border-white/20 px-6 py-2 text-sm font-semibold text-slate-300">
                        Pre-order Available
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* ─── Right: Product Info ─── */}
              <div className="flex flex-col">
                {/* Category */}
                {product.category && (
                  <div className="mb-3">
                    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide" style={{ borderColor: 'rgba(87,115,153,0.4)', background: 'rgba(87,115,153,0.15)', color: '#BDD5EA' }}>
                      {product.category.name}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight">
                  {product.name}
                </h1>

                {/* Rating — removed fake data */}

                {/* Price */}
                <div className="mt-6 p-5 rounded-2xl" style={{ background: 'rgba(87,115,153,0.12)', border: '1px solid rgba(87,115,153,0.25)' }}>
                  <p className="text-4xl font-black text-white">
                    {formatCurrency(activePrice)}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ border: '1px solid rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.1)', color: '#4ade80' }}>
                      <Package className="h-3 w-3" />
                      {currentStock > 0 ? `${currentStock} unit tersedia` : 'Pre-order'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                {product.description && (
                  <div className="mt-6">
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Variant Selectors */}
                {product.custom_options && product.custom_options.length > 0 && (
                  <div className="mt-6 space-y-5">
                    {product.custom_options.map((optionGroup) => (
                      <div key={optionGroup.name}>
                        <p className="text-sm font-semibold text-white mb-2.5">
                          {optionGroup.name}
                          {selectedOptions[optionGroup.name] && (
                            <span className="ml-2 text-orange-400 font-normal">: {selectedOptions[optionGroup.name]}</span>
                          )}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {optionGroup.options.map((optValue) => {
                            const isSelected = selectedOptions[optionGroup.name] === optValue;
                            return (
                      <button
                                key={optValue}
                                onClick={() => setSelectedOptions(prev => ({ ...prev, [optionGroup.name]: optValue }))}
                                className={`px-5 py-2.5 text-sm rounded-xl border-2 font-medium transition-all`}
                                style={isSelected ? { borderColor: '#577399', background: 'rgba(87,115,153,0.2)', color: '#BDD5EA' } : { borderColor: 'rgba(87,115,153,0.2)', background: 'rgba(87,115,153,0.05)', color: '#8aacca' }}
                              >
                                {optValue}
                              </button>
                            );
                          })}
                        </div>
                        {Object.keys(selectedOptions).length === product.custom_options.length && (
                          <div className="mt-2">
                            {selectedVariant ? (
                              selectedVariant.stock > 0 ? (
                                <span className="text-xs text-emerald-400 font-medium">✓ Varian tersedia ({selectedVariant.stock} unit)</span>
                              ) : (
                                <span className="text-xs text-amber-400 font-medium">Pre-order — Menunggu Stok</span>
                              )
                            ) : (
                              <span className="text-xs text-red-400 font-medium">✗ Kombinasi ini tidak tersedia</span>
                            )}
                          </div>
                        )}
                        {Object.keys(selectedOptions).length < (product.custom_options?.length || 0) && (
                          <p className="mt-1.5 text-xs text-slate-500">Pilih semua opsi untuk melihat ketersediaan</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Add to Cart - Desktop */}
                <div className="hidden lg:block mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    {/* Quantity control */}
                    <div className="flex items-center rounded-xl border-2 border-white/15 bg-white/5">
                      <button
                        onClick={handleDecrease}
                        disabled={quantity <= 1}
                        className="h-12 w-12 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 rounded-l-xl transition-colors disabled:opacity-30"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-white text-lg">{quantity}</span>
                      <button
                        onClick={handleIncrease}
                        disabled={quantity >= currentStock}
                        className="h-12 w-12 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 rounded-r-xl transition-colors disabled:opacity-30"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={addToCart}
                      disabled={!canAddToCart}
                      className="group relative flex-1 h-12 overflow-hidden rounded-xl font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: 'rgba(87,115,153,0.15)', border: '1px solid rgba(87,115,153,0.3)' }}
                    >
                      <span className="absolute inset-0 bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
                      <span className="relative flex items-center justify-center gap-2 text-[#BDD5EA] text-sm lg:text-base">
                        <ShoppingCart className="h-4 w-4 lg:h-5 lg:w-5" />
                        {cartLabel}
                      </span>
                    </button>

                    {/* Buy Now Button */}
                    <button
                      onClick={buyNow}
                      disabled={!canAddToCart}
                      className="group relative flex-1 h-12 overflow-hidden rounded-xl font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: 'linear-gradient(135deg, #FE5F55, #e84a40)', boxShadow: '0 8px 24px rgba(254,95,85,0.3)' }}
                    >
                      <span className="absolute inset-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0" style={{ background: 'linear-gradient(135deg, #e84a40, #FE5F55)' }} />
                      <span className="relative flex items-center justify-center gap-2 text-sm lg:text-base">
                        <CreditCard className="h-4 w-4 lg:h-5 lg:w-5" />
                        {buyNowLabel}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Mobile Add to Cart Placeholder to prevent content hiding */}
                <div className="lg:hidden h-24"></div>

                {/* Benefits */}
                {/* Benefits removed — no fake claims */}
              </div>
            </div>

            {/* Spesifikasi Section */}
            <div className="mt-20 lg:mt-28">
              <Separator className="bg-white/10 mb-12" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500 mb-3">— Detail Produk</p>
                  <h2 className="text-3xl font-extrabold text-white">Spesifikasi<br />Lengkap</h2>
                  <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                    Semua informasi teknis yang Anda butuhkan sebelum memutuskan untuk membeli.
                  </p>
                </div>

                <div className="lg:col-span-2">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Always-present specs */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Berat</dt>
                      <dd className="text-base font-bold text-white">{product.weight} gram</dd>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Stok Tersedia</dt>
                      <dd className="text-base font-bold text-white">
                        {product.stock > 0 ? `${product.stock} unit` : 'Pre-order'}
                      </dd>
                    </div>

                    {product.specifications && (() => {
                      const specs = typeof product.specifications === 'string'
                        ? JSON.parse(product.specifications)
                        : product.specifications;
                      return Object.entries(specs).map(([key, value]) => (
                        <div key={key} className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 capitalize">
                            {key.replace(/_/g, ' ')}
                          </dt>
                          <dd className="text-base font-bold text-white">{String(value)}</dd>
                        </div>
                      ));
                    })()}
                  </dl>
                </div>
              </div>
            </div>

          </div>
        </main>

        <Footer />

        {/* Mobile Sticky Add to Cart */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d1e2e]/95 backdrop-blur-md border-t border-white/10 p-4 lg:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-3 max-w-[1024px] mx-auto">
            {/* Quantity control */}
            <div className="flex items-center rounded-xl border-2 border-white/15 bg-white/5 shrink-0">
              <button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="h-12 w-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 rounded-l-xl transition-colors disabled:opacity-30"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-bold text-white text-base">{quantity}</span>
              <button
                onClick={handleIncrease}
                disabled={quantity >= currentStock}
                className="h-12 w-10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 rounded-r-xl transition-colors disabled:opacity-30"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              disabled={!canAddToCart}
              className="group relative flex-1 h-12 overflow-hidden rounded-xl font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'rgba(87,115,153,0.15)', border: '1px solid rgba(87,115,153,0.3)' }}
            >
              <span className="absolute inset-0 bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative flex items-center justify-center gap-1.5 text-[#BDD5EA] text-xs sm:text-sm">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">{cartLabel}</span>
                <span className="sm:hidden">+ Troli</span>
              </span>
            </button>

            {/* Buy Now Button */}
            <button
              onClick={buyNow}
              disabled={!canAddToCart}
              className="group relative flex-[1.2] h-12 overflow-hidden rounded-xl font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #FE5F55, #e84a40)', boxShadow: '0 4px 15px rgba(254,95,85,0.4)' }}
            >
              <span className="absolute inset-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0" style={{ background: 'linear-gradient(135deg, #e84a40, #FE5F55)' }} />
              <span className="relative flex items-center justify-center gap-1.5 text-xs sm:text-sm">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">{buyNowLabel}</span>
                <span className="sm:hidden">Beli</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

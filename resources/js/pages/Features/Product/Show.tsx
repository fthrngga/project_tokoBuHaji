
import { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import { type Product, type SharedData } from "@/types";
import { route } from "ziggy-js";
import Header from "@/pages/welcome/Partials/Header";
import Footer from "@/pages/welcome/Partials/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingCart, Truck, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Toaster, toast } from 'sonner';

interface Props {
  product: Product;
}

export default function Show({ product }: Props) {
  const { auth } = usePage<SharedData>().props;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(
    product.images && product.images.length > 0
      ? "/storage/" + product.images[0].image_path
      : "https://placehold.co/600x600/f1f5f9/334155?text=No+Image"
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const addToCart = () => {
    if (!auth.user) {
      toast.error("Silahkan login terlebih dahulu untuk berbelanja.");
      // router.visit(route('login')); // Opsional: redirect otomatis
      return;
    }

    router.post(route('cart.store'), {
      product_id: product.id,
      quantity: quantity
    }, {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Produk berhasil ditambahkan ke keranjang!");
      },
      onError: (errors) => {
        if (errors.quantity) {
          toast.error(errors.quantity);
        }
      }
    });
  };

  return (
    <>
      <Head title={product.name} />
      <Toaster richColors closeButton position="top-center" />
      <div className="flex min-h-screen w-full flex-col bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200">
        <Header user={auth.user} />

        <main className="flex-1 py-12 pb-32">
          <div className="container mx-auto px-8 md:px-12 lg:px-24">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">

              {/* Product Images Section */}
              <div className="flex flex-col-reverse lg:flex-row gap-4 mb-10 lg:mb-0">
                {/* Thumbnails */}
                {product.images && product.images.length > 0 && (
                  <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible py-2 lg:py-0">
                    {product.images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImage("/storage/" + image.image_path)}
                        className={`relative flex h-20 w-20 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800 border ${selectedImage === "/storage/" + image.image_path
                            ? "border-black dark:border-white ring-1 ring-black dark:ring-white"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-400"
                          } overflow-hidden transition-all`}
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
                <div className="relative aspect-square w-full flex-1 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="h-full w-full object-contain p-4 transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Product Info Section */}
              <div className="flex flex-col">
                <div className="mb-4">
                  {product.category && (
                    <Badge variant="secondary" className="mb-3 text-sm font-medium">
                      {product.category.name}
                    </Badge>
                  )}
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    {product.name}
                  </h1>
                </div>

                <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(product.price)}
                </div>

                <div className="mt-8 prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {product.description || "Deskripsi produk belum tersedia."}
                  </p>
                </div>

                {/* Add to Cart Section */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-full px-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full hover:bg-transparent"
                        onClick={handleDecrease}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center font-medium text-lg">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full hover:bg-transparent"
                        onClick={handleIncrease}
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      onClick={addToCart}
                      className="flex-1 h-12 rounded-full text-lg font-medium"
                      disabled={product.stock <= 0}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {product.stock > 0 ? "Tambahkan ke Keranjang" : "Stok Habis"}
                    </Button>
                  </div>
                </div>

                {/* Benefits / Trust Badges */}
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-start space-x-3">
                    <Truck className="h-6 w-6 text-gray-400 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Pengiriman Cepat</h4>
                      <p className="text-sm text-gray-500">Dikirim langsung ke alamat Anda.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <ShieldCheck className="h-6 w-6 text-gray-400 mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Jaminan Kualitas</h4>
                      <p className="text-sm text-gray-500">Produk original dan bergaransi.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Produk Section */}
            <div className="mt-16 lg:mt-24">
              <div className="border-t border-gray-200 dark:border-gray-800 pt-10">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
                  Spesifikasi Produk
                </h2>

                <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Berat</dt>
                    <dd className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{product.weight} gram</dd>
                  </div>
                  <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Stok Tersedia</dt>
                    <dd className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                      {product.stock > 0 ? `${product.stock} unit` : 'Habis'}
                    </dd>
                  </div>

                  {product.specifications && (() => {
                    const specs = typeof product.specifications === 'string'
                      ? JSON.parse(product.specifications)
                      : product.specifications;

                    return Object.entries(specs).map(([key, value]) => (
                      <div key={key} className="border-b border-gray-100 dark:border-gray-800 pb-4">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">{key.replace(/_/g, ' ')}</dt>
                        <dd className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{String(value)}</dd>
                      </div>
                    ));
                  })()}
                </dl>
              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

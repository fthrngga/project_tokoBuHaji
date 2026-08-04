import { Link } from "@inertiajs/react";
import { type Product } from '@/types';
import { route } from "ziggy-js";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const fmt = (v: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);

function FeaturedCard({ product, large = false }: { product: Product; large?: boolean }) {
    const [hovered, setHovered] = useState(false);

    const img = product.images?.length > 0
        ? `/storage/${product.images[0].image_path}`
        : null;

    const price = product.variants && product.variants.length > 0
        ? Math.min(...product.variants.map(v => v.selling_price || 0))
        : product.selling_price;

    return (
        <Link
            href={route("products.show", product.slug)}
            className={`group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:-translate-y-1 ${large ? 'md:row-span-2' : ''}`}
            style={{ boxShadow: hovered ? "0 12px 32px rgba(37,99,235,0.12)" : "0 1px 4px rgba(0,0,0,0.06)" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Image */}
            <div className={`relative overflow-hidden bg-muted ${large ? 'aspect-[4/3]' : 'aspect-square'}`}>
                {img ? (
                    <img
                        src={img}
                        alt={product.name}
                        className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl font-black text-muted-foreground/10">
                            {product.name.charAt(0)}
                        </span>
                    </div>
                )}

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-primary/5 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

                {/* Stock badge */}
                {product.stock > 0 && product.stock <= 5 && (
                    <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-full">
                        Sisa {product.stock}
                    </span>
                )}
            </div>

            {/* Info */}
            <div className="p-4 md:p-5">
                {product.category && (
                    <p className="text-[10px] font-bold tracking-widest uppercase text-primary mb-1.5">
                        {product.category.name}
                    </p>
                )}
                <h3 className={`font-semibold text-foreground leading-snug mb-3 line-clamp-2 ${large ? 'text-base md:text-lg' : 'text-sm'}`}>
                    {product.name}
                </h3>
                <div className="flex items-center justify-between">
                    <p className={`font-extrabold text-foreground tracking-tight ${large ? 'text-lg md:text-xl' : 'text-base'}`}>
                        {fmt(price)}
                    </p>
                    <span className={`inline-flex items-center gap-1 text-primary text-[12px] font-semibold transition-all duration-200 group-hover:gap-2`}>
                        Detail <ArrowRight size={12} />
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function FeaturedProductsGrid({ products }: { products: Product[] }) {
    if (!products || products.length === 0) return null;

    const [main, ...rest] = products.slice(0, 4);
    const sideProducts = rest.slice(0, 3);

    return (
        <section className="py-10 md:py-14">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
                            Produk Unggulan
                        </h2>
                        <p className="text-sm text-muted-foreground mt-0.5">Pilihan terbaik kami untuk Anda</p>
                    </div>
                    <Link
                        href="/kategori"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                        Lihat Semua <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4">
                    {/* Large main product — spans 2 rows and 2 cols on desktop */}
                    {main && (
                        <div className="col-span-2 md:col-span-2 md:row-span-2">
                            <FeaturedCard product={main} large />
                        </div>
                    )}
                    {/* Side products */}
                    {sideProducts.map((product) => (
                        <div key={product.id} className="col-span-1 md:col-span-1">
                            <FeaturedCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

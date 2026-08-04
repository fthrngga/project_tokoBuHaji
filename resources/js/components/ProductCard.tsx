import { Link } from "@inertiajs/react";
import { type Product } from '@/types';
import { route } from "ziggy-js";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

const fmt = (v: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);

export const ProductCard = ({ product }: { product: Product }) => {
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
            className="group flex flex-col overflow-hidden rounded-2xl bg-card border border-border transition-all duration-300 hover:-translate-y-1"
            style={{ boxShadow: hovered ? "0 8px 24px rgba(37,99,235,0.12)" : "0 1px 3px rgba(0,0,0,0.06)" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-muted rounded-t-2xl">
                {img ? (
                    <img
                        src={img}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl font-black text-muted-foreground/20">
                            {product.name.charAt(0)}
                        </span>
                    </div>
                )}

                {/* Hover quick-look */}
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="inline-flex items-center gap-1.5 bg-white text-foreground text-[11px] font-bold tracking-wider uppercase px-3 py-2 rounded-full shadow-lg">
                        <ShoppingCart size={12} />
                        Lihat Detail
                    </span>
                </div>

                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                    {product.stock > 0 && product.stock <= 5 && (
                        <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Sisa {product.stock}
                        </span>
                    )}
                    {product.stock === 0 && (
                        <span className="bg-muted-foreground/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Pre-order
                        </span>
                    )}
                </div>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col flex-1">
                {product.category && (
                    <p className="text-[10px] font-bold tracking-widest uppercase text-primary mb-1.5">
                        {product.category.name}
                    </p>
                )}
                <h3 className="text-sm font-semibold text-foreground leading-snug mb-3 line-clamp-2 flex-1">
                    {product.name}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                    <p className="text-base font-extrabold text-foreground tracking-tight">
                        {fmt(price)}
                    </p>
                    <span className={`text-[10px] font-semibold tracking-wide ${product.stock > 0 ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                        {product.stock > 0 ? '● Tersedia' : '○ Pre-order'}
                    </span>
                </div>
            </div>
        </Link>
    );
};

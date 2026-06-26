import { Link } from "@inertiajs/react";
import { type Product } from '@/types';
import { ProductCard } from "@/components/ProductCard";

export default function HorizontalProductScroll({
    products,
    title,
}: {
    products: Product[];
    title: string;
    subtitle?: string;
}) {
    if (!products || products.length === 0) return null;

    return (
        <section className="bg-[#080f1a] py-16 md:py-[96px] pb-12 md:pb-[80px]">
            {/* Section header */}
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-8 md:mb-10">
                <div className="flex items-center gap-4 md:gap-6">
                    <h2 className="text-2xl md:text-[clamp(24px,3.5vw,48px)] font-extrabold tracking-tight text-white leading-none flex-shrink-0 m-0">
                        {title}
                    </h2>
                    <div className="flex-1 h-[1px] bg-[#577399]/10" />
                </div>
            </div>

            {/* Scroll track — bleeds to edge */}
            <div
                className="flex gap-3 md:gap-4 overflow-x-auto px-6 md:px-12 pb-4 cursor-grab max-w-[1440px] mx-auto no-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {products.map((product) => (
                    <div key={product.id} className="flex-none w-[240px] sm:w-[260px] md:w-[clamp(220px,22vw,280px)]">
                        <ProductCard product={product} />
                    </div>
                ))}
                <div className="flex-none w-4 md:w-8" />
            </div>
            <style>{`
                /* Hide scrollbar for Chrome, Safari and Opera */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}

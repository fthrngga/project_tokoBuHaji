import { Link } from "@inertiajs/react";
import { type Product } from '@/types';
import { ProductCard } from "@/components/ProductCard";

export default function HorizontalProductScroll({ products, title, subtitle }: { products: Product[], title: string, subtitle?: string }) {
    if (!products || products.length === 0) return null;

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-medium tracking-tight text-slate-900 dark:text-white">{title}</h2>
                    {subtitle && <p className="mt-2 text-slate-500">{subtitle}</p>}
                </div>
                <div className="hidden md:block">
                    {/* Optional: Add custom scroll controls here if wanted */}
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Scrollable Container */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style>{`
                        .hide-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    
                    {products.map((product, index) => (
                        <div key={product.id} className="snap-start flex-none w-[280px] sm:w-[320px] md:w-[350px]">
                            <ProductCard product={product} index={index} />
                        </div>
                    ))}
                    
                    {/* Fake item for trailing padding in scroll area */}
                    <div className="snap-start flex-none w-4 sm:w-8 md:w-12"></div>
                </div>
            </div>
        </section>
    );
}

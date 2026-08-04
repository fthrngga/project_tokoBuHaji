import { Link } from "@inertiajs/react";
import { type Product } from '@/types';
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";

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
        <section className="py-10 md:py-14 bg-background">
            {/* Section header */}
            <div className="max-w-[1440px] mx-auto px-4 md:px-12 mb-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground m-0">
                            {title}
                        </h2>
                    </div>
                    <Link
                        href="/kategori"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                        Lihat Semua <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            {/* Scroll track */}
            <div
                className="flex gap-3 md:gap-4 overflow-x-auto px-4 md:px-12 pb-3 cursor-grab max-w-[1440px] mx-auto no-scrollbar"
            >
                {products.map((product) => (
                    <div key={product.id} className="flex-none w-[200px] sm:w-[220px] md:w-[clamp(200px,20vw,260px)]">
                        <ProductCard product={product} />
                    </div>
                ))}
                <div className="flex-none w-4 md:w-8" />
            </div>
        </section>
    );
}

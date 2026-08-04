import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { type Product as ProductType } from '@/types';
import { route } from "ziggy-js";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Helper untuk format mata uang
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};

import { ProductCard } from "@/components/ProductCard";

// Komponen Utama Section
export default function FeaturedProductsSection({ products, hideTitle = false }: { products: ProductType[], hideTitle?: boolean }) {
    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section className="bg-white dark:bg-black py-20 lg:py-28">
            <div className="container px-4 sm:px-6 lg:px-8">
                {!hideTitle && (
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-foreground sm:text-3xl">
                                Koleksi Unggulan
                            </h2>
                            <p className="mt-2 text-slate-500 dark:text-slate-400">
                                Kurasi produk terbaik untuk rumah Anda.
                            </p>
                        </div>
                        <Link href="/products" className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-foreground hover:text-blue-600 transition-colors group">
                            Lihat Semua <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                )}

                {products && products.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {products.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="py-20 text-center">
                        <p className="text-slate-500">Produk akan segera hadir.</p>
                    </div>
                )}
            </div>
            
            {!hideTitle && (
                <div className="mt-10 flex justify-center md:hidden">
                    <Link href="/products" className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-foreground hover:text-blue-600 transition-colors">
                        Lihat Semua <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            )}
        </section>
    );
}


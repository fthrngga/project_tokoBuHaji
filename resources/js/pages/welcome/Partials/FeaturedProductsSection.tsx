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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white lg:text-5xl">Produk Unggulan</h2>
                        <p className="mb-12 text-lg text-center text-gray-500 dark:text-gray-400">Koleksi pilihan yang dirancang untuk Anda.</p>
                    </motion.div>
                )}

                {products && products.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {products.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </motion.div>
                ) : (
                    <p className="text-center text-gray-500">Produk unggulan akan segera hadir.</p>
                )}
            </div>
        </section>
    );
}


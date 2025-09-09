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

// Sub-Komponen untuk Kartu Produk yang Interaktif dan Elegan
const ProductCard = ({ product, index }: { product: ProductType, index: number }) => {
    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.215, 0.610, 0.355, 1.000] // Kurva easing yang halus
            }
        }
    };

    return (
        <motion.div variants={cardVariants} className="group relative flex flex-col">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/50">
                <Link href={route('products.show', product.slug)}>
                    <img
                        src={product.images.length > 0 ? `/storage/${product.images[0].image_path}` : 'https://placehold.co/500x500/f1f5f9/334155?text=Haji+Elektronik'}
                        alt={product.name}
                        className="h-full w-full object-contain p-8 transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                </Link>
            </div>

            <div className="mt-4 text-left">
                <p className="text-sm text-slate-500 dark:text-slate-400">{product.category.name}</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                    <Link href={route('products.show', product.slug)}>
                        {product.name}
                    </Link>
                </h3>

                {/* Informasi yang muncul saat hover */}
                <div className="mt-2 flex items-center justify-between">
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(product.price)}</p>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-10 w-10 rounded-full bg-slate-100 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-slate-800"
                        asChild
                    >
                       <Link href={route('products.show', product.slug)}>
                            <ArrowRight className="h-5 w-5" />
                       </Link>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};


// Komponen Utama Section
export default function FeaturedProductsSection({ products }: { products: ProductType[] }) {
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white lg:text-5xl">Produk Unggulan</h2>
                    <p className="mb-12 text-lg text-center text-gray-500 dark:text-gray-400">Koleksi pilihan yang dirancang untuk Anda.</p>
                </motion.div>

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


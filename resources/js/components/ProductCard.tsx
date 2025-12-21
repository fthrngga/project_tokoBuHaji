
import { Link } from "@inertiajs/react";
import { type Product } from '@/types';
import { route } from "ziggy-js";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};

export const ProductCard = ({ product, index = 0 }: { product: Product, index?: number }) => {
    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.215, 0.610, 0.355, 1.000]
            }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative flex flex-col"
        >
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/50">
                <Link href={route('products.show', product.slug)}>
                    <img
                        src={product.images && product.images.length > 0 ? `/storage/${product.images[0].image_path}` : 'https://placehold.co/500x500/f1f5f9/334155?text=Haji+Elektronik'}
                        alt={product.name}
                        className="h-full w-full object-contain p-8 transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                </Link>
            </div>

            <div className="mt-4 text-left">
                {product.category && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">{product.category.name}</p>
                )}
                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                    <Link href={route('products.show', product.slug)}>
                        {product.name}
                    </Link>
                </h3>

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

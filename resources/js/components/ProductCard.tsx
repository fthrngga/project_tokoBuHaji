
import { Link } from "@inertiajs/react";
import { type Product } from '@/types';
import { route } from "ziggy-js";
import { ShoppingBag } from "lucide-react";

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};

export const ProductCard = ({ product, index = 0 }: { product: Product, index?: number }) => {
    return (
        <div className="group flex flex-col h-full w-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-white dark:bg-slate-800">
                <Link href={route('products.show', product.slug)} className="block absolute inset-0">
                    <img
                        src={product.images && product.images.length > 0 ? `/storage/${product.images[0].image_path}` : 'https://placehold.co/500x500/ffffff/334155?text=Haji+Elektronik'}
                        alt={product.name}
                        className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    />
                </Link>

                {/* Stock Badge */}
                {product.stock > 0 && product.stock <= 5 && (
                    <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-600">
                            Sisa {product.stock}
                        </span>
                    </div>
                )}
            </div>

            {/* Content Details */}
            <div className="flex flex-col flex-1 p-5 relative">
                {/* Floating Action Button */}
                <div className="absolute -top-6 right-5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                    <Link 
                        href={route('products.show', product.slug)}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg hover:scale-110 transition-transform"
                        aria-label="Lihat Detail Produk"
                    >
                        <ShoppingBag className="h-5 w-5" />
                    </Link>
                </div>

                {product.category && (
                    <p className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-2">
                        {product.category.name}
                    </p>
                )}
                
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug mb-3">
                    <Link href={route('products.show', product.slug)} className="hover:text-blue-600 transition-colors">
                        {product.name}
                    </Link>
                </h3>

                <div className="mt-auto">
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(product.price)}
                    </p>
                </div>
            </div>
        </div>
    );
};

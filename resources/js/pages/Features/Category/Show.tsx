
import { Head, usePage, Link } from "@inertiajs/react";
import { type Category, type Product, type Pagination, type SharedData } from "@/types";
import Header from "@/Pages/welcome/Partials/Header";
import Footer from "@/Pages/welcome/Partials/Footer";
import { ProductCard } from "@/components/ProductCard";

interface Props {
    category: Category;
    products: Pagination<Product>;
}

export default function Show({ category, products }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title={`Kategori: ${category.name} - Haji Elektronik`} />
            <div className="flex min-h-screen w-full flex-col bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200">
                <Header user={auth.user} />

                <main className="flex-1 pb-32">
                    {/* Header Kategori Enhanced */}
                    <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        <div className="container mx-auto px-8 md:px-12 lg:px-24 py-16 lg:py-24">
                            {/* Breadcrumb sederhana */}
                            <nav className="flex mb-4 text-sm text-gray-500 dark:text-gray-400">
                                <Link href="/" className="hover:text-gray-900 dark:hover:text-white">Beranda</Link>
                                <span className="mx-2">/</span>
                                <span className="text-gray-900 dark:text-white font-medium">{category.name}</span>
                            </nav>

                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                                        {category.name}
                                    </h1>
                                    <p className="mt-4 max-w-xl text-lg text-gray-500 dark:text-gray-400">
                                        Temukan koleksi {category.name.toLowerCase()} pilihan kami yang dirancang untuk melengkapi gaya hidup modern Anda.
                                    </p>
                                </div>

                                {/* Placeholder untuk Filter/Sort (Opsional untuk improvement masa depan) */}
                                <div className="hidden md:block">
                                    <div className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                                        Urutkan: Terbaru
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="container mx-auto px-8 md:px-12 lg:px-24 py-16">
                        {products.data.length > 0 ? (
                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                {products.data.map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24">
                                <p className="text-xl text-gray-500 dark:text-gray-400">
                                    Belum ada produk dalam kategori ini.
                                </p>
                                <Link
                                    href="/"
                                    className="mt-4 inline-block text-sm font-semibold text-black dark:text-white hover:underline"
                                >
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        )}

                        {/* Pagination - Simple Implementation */}
                        {products.links.length > 3 && (
                            <div className="mt-16 flex justify-center">
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {products.links.map((link, i) => (
                                        link.url ? (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${link.active
                                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                                                    }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={i}
                                                className="px-4 py-2 text-sm font-medium text-gray-400 border border-gray-200 rounded-md dark:border-gray-800"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}

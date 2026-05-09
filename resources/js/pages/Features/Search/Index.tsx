import { Head, usePage, Link } from "@inertiajs/react";
import { type Product, type SharedData } from "@/types";
import Header from "@/pages/welcome/Partials/Header";
import Footer from "@/pages/welcome/Partials/Footer";
import { ProductCard } from "@/components/ProductCard";

interface Props {
    results: Product[];
    query: string;
}

export default function SearchIndex({ results, query }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title={`Pencarian: ${query} - Haji Elektronik`} />
            <div className="flex min-h-screen w-full flex-col bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200">
                <Header user={auth.user} />

                <main className="flex-1 pb-32">
                    {/* Header Pencarian */}
                    <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                        <div className="container mx-auto px-8 md:px-12 lg:px-24 py-16 lg:py-24">
                            <nav className="flex mb-4 text-sm text-gray-500 dark:text-gray-400">
                                <Link href="/" className="hover:text-gray-900 dark:hover:text-white">Beranda</Link>
                                <span className="mx-2">/</span>
                                <span className="text-gray-900 dark:text-white font-medium">Pencarian</span>
                            </nav>

                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                                        Hasil Pencarian
                                    </h1>
                                    <p className="mt-4 max-w-xl text-lg text-gray-500 dark:text-gray-400">
                                        Menampilkan hasil untuk kata kunci "{query}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="container mx-auto px-8 md:px-12 lg:px-24 py-16">
                        {results.length > 0 ? (
                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                {results.map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24">
                                <div className="mx-auto h-24 w-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                                    <svg className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tidak ada hasil ditemukan</h2>
                                <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                                    Maaf, kami tidak dapat menemukan produk yang sesuai dengan pencarian "{query}". Coba gunakan kata kunci lain.
                                </p>
                                <Link
                                    href="/"
                                    className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                >
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        )}
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}

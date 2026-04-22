import { Head, usePage, Link } from "@inertiajs/react";
import { type Category, type Product, type Pagination, type SharedData } from "@/types";
import Header from "@/pages/welcome/Partials/Header";
import Footer from "@/pages/welcome/Partials/Footer";
import { ProductCard } from "@/components/ProductCard";

interface ExtendedCategory extends Category {
    children?: Category[];
    parent?: Category;
}

interface Props {
    category: ExtendedCategory;
    products: Pagination<Product>;
    siblings?: Category[];
}

export default function Show({ category, products, siblings = [] }: Props) {
    const { auth } = usePage<SharedData>().props;

    // Menentukan subkategori yang akan ditampilkan sebagai filter
    const hasChildren = category.children && category.children.length > 0;
    const isChild = category.parent_id !== null;
    
    // Jika kita berada di kategori Parent, tampilkan anak-anaknya.
    // Jika kita berada di kategori Child, tampilkan saudara-saudaranya.
    const subcategories = hasChildren ? category.children : (isChild ? siblings : []);
    
    // Tentukan parent slug untuk tombol "Semua"
    const parentSlug = isChild && category.parent ? category.parent.slug : category.slug;

    return (
        <>
            <Head title={`Kategori: ${category.name} - Haji Elektronik`} />
            <div className="flex min-h-screen w-full flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased">
                <Header user={auth.user} />

                <main className="flex-1 pb-32">
                    {/* Header Kategori Premium */}
                    <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                            {/* Breadcrumb */}
                            <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-6 font-medium">
                                <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Beranda</Link>
                                <span>/</span>
                                {isChild && category.parent && (
                                    <>
                                        <Link href={`/kategori/${category.parent.slug}`} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                                            {category.parent.name}
                                        </Link>
                                        <span>/</span>
                                    </>
                                )}
                                <span className="text-slate-900 dark:text-white">{category.name}</span>
                            </nav>

                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div className="max-w-2xl">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                                        {category.name}
                                    </h1>
                                    <p className="mt-6 text-lg text-slate-500 leading-relaxed">
                                        Eksplorasi koleksi {category.name.toLowerCase()} pilihan kami. Didesain dengan perhatian terhadap detail untuk menyempurnakan ruang dan gaya hidup Anda.
                                    </p>
                                </div>
                            </div>

                            {/* Subcategory Filter Chips */}
                            {(subcategories && subcategories.length > 0) && (
                                <div className="mt-12 flex items-center gap-3 overflow-x-auto pb-4 hide-scrollbar">
                                    <style>{`
                                        .hide-scrollbar::-webkit-scrollbar { display: none; }
                                    `}</style>
                                    
                                    <Link 
                                        href={`/kategori/${parentSlug}`}
                                        className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-medium border transition-all ${
                                            !isChild 
                                            ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-md' 
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600'
                                        }`}
                                    >
                                        Semua
                                    </Link>
                                    
                                    {subcategories.map(sub => (
                                        <Link 
                                            key={sub.id}
                                            href={`/kategori/${sub.slug}`}
                                            className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-medium border transition-all ${
                                                category.id === sub.id 
                                                ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-md' 
                                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600'
                                            }`}
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        {products.data.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                                {products.data.map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-32 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 mt-8">
                                <h3 className="text-2xl font-medium text-slate-900 dark:text-white mb-3">Koleksi Belum Tersedia</h3>
                                <p className="text-slate-500 max-w-md mx-auto mb-8">
                                    Kami sedang mempersiapkan produk-produk terbaik untuk kategori ini. Silakan kembali lagi nanti.
                                </p>
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
                                >
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        )}

                        {/* Pagination */}
                        {products.links.length > 3 && (
                            <div className="mt-20 flex justify-center">
                                <div className="flex gap-2">
                                    {products.links.map((link, i) => (
                                        link.url ? (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                className={`flex items-center justify-center min-w-[40px] h-10 px-3 text-sm font-medium rounded-full transition-colors ${link.active
                                                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                                                    : "text-slate-600 bg-white border border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
                                                    }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={i}
                                                className="flex items-center justify-center min-w-[40px] h-10 px-3 text-sm font-medium text-slate-400 bg-transparent"
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

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
            <div className="flex min-h-screen w-full flex-col bg-[#080f1a] text-white font-sans antialiased">
                <Header user={auth.user} />

                <main className="flex-1 pb-32">
                    {/* Header Kategori Premium */}
                    <div className="bg-[#0d1e2e]/50 border-b border-[#577399]/20 relative overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-[#FE5F55]/10 blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-[#577399]/10 blur-3xl pointer-events-none" />

                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
                            {/* Breadcrumb */}
                            <nav className="flex items-center space-x-2 text-sm text-[#bdd5ea]/60 mb-6 font-medium">
                                <Link href="/" className="hover:text-[#FE5F55] transition-colors">Beranda</Link>
                                <span>/</span>
                                {isChild && category.parent && (
                                    <>
                                        <Link href={`/kategori/${category.parent.slug}`} className="hover:text-[#FE5F55] transition-colors">
                                            {category.parent.name}
                                        </Link>
                                        <span>/</span>
                                    </>
                                )}
                                <span className="text-white">{category.name}</span>
                            </nav>

                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div className="max-w-2xl">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        {category.name}
                                    </h1>
                                    <p className="mt-6 text-lg text-[#bdd5ea]/80 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                                        Eksplorasi koleksi {category.name.toLowerCase()} pilihan kami. Didesain dengan perhatian terhadap detail untuk menyempurnakan ruang dan gaya hidup Anda.
                                    </p>
                                </div>
                            </div>

                            {/* Subcategory Filter Chips */}
                            {(subcategories && subcategories.length > 0) && (
                                <div className="mt-12 flex items-center gap-3 overflow-x-auto pb-4 hide-scrollbar animate-in fade-in duration-700 delay-300">
                                    <style>{`
                                        .hide-scrollbar::-webkit-scrollbar { display: none; }
                                    `}</style>
                                    
                                    <Link 
                                        href={`/kategori`}
                                        className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-medium border transition-all ${
                                            !isChild 
                                            ? 'bg-[#FE5F55] text-white border-[#FE5F55] shadow-[0_4px_15px_rgba(254,95,85,0.4)] hover:scale-105' 
                                            : 'bg-[#0d1e2e] text-[#bdd5ea] border-[#577399]/30 hover:border-[#FE5F55]/50 hover:bg-[#577399]/10 hover:text-white'
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
                                                ? 'bg-[#FE5F55] text-white border-[#FE5F55] shadow-[0_4px_15px_rgba(254,95,85,0.4)] hover:scale-105' 
                                                : 'bg-[#0d1e2e] text-[#bdd5ea] border-[#577399]/30 hover:border-[#FE5F55]/50 hover:bg-[#577399]/10 hover:text-white'
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
                            <div className="text-center py-32 bg-[#0d1e2e]/50 backdrop-blur-sm rounded-3xl border border-[#577399]/20 mt-8">
                                <h3 className="text-2xl font-medium text-white mb-3">Koleksi Belum Tersedia</h3>
                                <p className="text-[#bdd5ea]/80 max-w-md mx-auto mb-8">
                                    Kami sedang mempersiapkan produk-produk terbaik untuk kategori ini. Silakan kembali lagi nanti.
                                </p>
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center px-8 py-3 rounded-full font-medium text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                    style={{ background: 'linear-gradient(135deg, #FE5F55, #e84a40)', boxShadow: '0 4px 15px rgba(254,95,85,0.4)' }}
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
                                                    ? "bg-[#FE5F55] text-white shadow-[0_4px_15px_rgba(254,95,85,0.4)]"
                                                    : "text-[#bdd5ea] bg-[#0d1e2e]/50 border border-[#577399]/30 hover:border-[#FE5F55]/50"
                                                    }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={i}
                                                className="flex items-center justify-center min-w-[40px] h-10 px-3 text-sm font-medium text-[#577399] bg-transparent"
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

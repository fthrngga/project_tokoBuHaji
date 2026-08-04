import { Head, usePage, Link } from "@inertiajs/react";
import { type Category, type Product, type Pagination, type SharedData } from "@/types";
import Header from "@/pages/welcome/Partials/Header";
import Footer from "@/pages/welcome/Partials/Footer";
import { ProductCard } from "@/components/ProductCard";

interface Props {
    parentCategories: Category[];
    products: Pagination<Product>;
}

export default function Index({ parentCategories, products }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Semua Produk - Haji Elektronik" />
            <div className="flex min-h-screen w-full flex-col bg-transparent text-foreground font-sans antialiased">
                <Header user={auth.user} />

                <main className="flex-1 pb-32">
                    {/* Header Kategori Premium */}
                    <div className="bg-card border-b border-border/20 relative overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-[#FE5F55]/10 blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-[#577399]/10 blur-3xl pointer-events-none" />

                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
                            {/* Breadcrumb */}
                            <nav className="flex items-center space-x-2 text-sm text-muted-foreground/60 mb-6 font-medium">
                                <Link href="/" className="hover:text-[#FE5F55] transition-colors">Beranda</Link>
                                <span>/</span>
                                <span className="text-foreground">Semua Produk</span>
                            </nav>

                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div className="max-w-2xl">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        Koleksi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FE5F55] to-[#f7b05b]">Premium</span> Kami
                                    </h1>
                                    <p className="mt-6 text-lg text-muted-foreground/80 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                                        Eksplorasi seluruh koleksi produk pilihan kami. Dari elektronik berteknologi tinggi hingga mebel yang dirancang khusus untuk menyempurnakan ruang dan gaya hidup Anda.
                                    </p>
                                </div>
                            </div>

                            {/* Subcategory Filter Chips */}
                            {(parentCategories && parentCategories.length > 0) && (
                                <div className="mt-12 flex items-center gap-3 overflow-x-auto pb-4 hide-scrollbar animate-in fade-in duration-700 delay-300">
                                    <style>{`
                                        .hide-scrollbar::-webkit-scrollbar { display: none; }
                                    `}</style>
                                    
                                    <Link 
                                        href={`/kategori`}
                                        className="shrink-0 px-6 py-2.5 rounded-full text-sm font-medium border transition-all bg-[#FE5F55] text-foreground border-[#FE5F55] shadow-[0_4px_15px_rgba(254,95,85,0.4)] hover:scale-105"
                                    >
                                        Semua
                                    </Link>
                                    
                                    {parentCategories.map(sub => (
                                        <Link 
                                            key={sub.id}
                                            href={`/kategori/${sub.slug}`}
                                            className="shrink-0 px-6 py-2.5 rounded-full text-sm font-medium border transition-all bg-card text-muted-foreground border-border/30 hover:border-[#FE5F55]/50 hover:bg-[#577399]/10 hover:text-foreground"
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Grid section */}
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-20">
                        {products.data.length === 0 ? (
                            <div className="text-center py-20 px-4 border border-border/10 rounded-3xl bg-card/30">
                                <div className="mx-auto w-20 h-20 bg-[#577399]/10 rounded-full flex items-center justify-center mb-6">
                                    <span className="text-[#577399] text-2xl">🔍</span>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Koleksi Kosong</h3>
                                <p className="text-muted-foreground/60 max-w-md mx-auto">Kami sedang menyiapkan produk terbaik untuk Anda. Silakan kembali lagi nanti.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                                {products.data.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                        
                        {/* Pagination - Minimalist Premium */}
                        {products.links && products.links.length > 3 && (
                            <div className="mt-20 flex justify-center">
                                <nav className="flex items-center gap-1 p-1 bg-card border border-border/20 rounded-full backdrop-blur-sm">
                                    {products.links.map((link, idx) => {
                                        if (link.url === null) {
                                            return (
                                                <span 
                                                    key={idx} 
                                                    className="px-4 py-2 text-sm text-muted-foreground/40 font-medium"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        }
                                        return (
                                            <Link
                                                key={idx}
                                                href={link.url}
                                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                                                    link.active
                                                        ? 'bg-[#FE5F55] text-foreground shadow-md'
                                                        : 'text-muted-foreground hover:bg-[#577399]/20 hover:text-foreground'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    })}
                                </nav>
                            </div>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

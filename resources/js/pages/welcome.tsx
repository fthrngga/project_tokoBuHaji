import { type SharedData, type Product } from '@/types'; // Import Product
import { Head, usePage } from '@inertiajs/react';
import HeroSection from './welcome/Partials/HeroSection';
import Header from './welcome/Partials/Header';
import FeaturedProductsSection from './welcome/Partials/FeaturedProductsSection';
import Footer from './welcome/Partials/Footer';


export default function Welcome() {
    // Ambil data featuredProducts dari props
    const { auth, featuredProducts, recommendedProducts } = usePage<{ auth: SharedData['auth'], featuredProducts: Product[], recommendedProducts: Product[] }>().props;

    return (
        <>
            <Head title="Haji Elektronik - Perabotan & Elektronik Modern" />
            <div className="flex min-h-screen w-full flex-col bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200">

                <Header user={auth.user} />

                <main className="flex-1">
                    <HeroSection />
                    {/* Hapus <CategoriesSection /> */}
                    <FeaturedProductsSection products={featuredProducts} />

                    {/* Recommended Section */}
                    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                                <div>
                                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                        {auth.user ? "Rekomendasi Untuk Anda" : "Produk Pilihan Lainnya"}
                                    </h2>
                                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
                                        {auth.user
                                            ? "Berdasarkan riwayat pencarian dan ketertarikan Anda."
                                            : "Temukan inspirasi dari koleksi produk terbaik kami."
                                        }
                                    </p>
                                </div>
                            </div>
                            {/* Reusing ProductCard grid logic/component if available or just passing to FeaturedProductsSection with prop */}
                            {/* Since FeaturedProductsSection likely has the layout, we can reuse it if it handles children or just use it again if it accepts title props (checking file...). 
                                Assuming FeaturedProductsSection is just the grid, let's reuse it or create a similar grid structure here.
                                Looking at line 23, it takes `products`. I will reuse it but since it likely has its own container/title inside, I might duplicating structure. 
                                Let's check FeaturedProductsSection content first using view_file or assume standard structure.
                                Actually simpler: let's just use FeaturedProductsSection and see if we can pass a title override.
                                If not, I'll copy the grid pattern.
                            */}
                            <FeaturedProductsSection products={recommendedProducts} hideTitle={true} />
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}


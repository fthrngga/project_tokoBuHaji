import { type SharedData, type Product } from '@/types'; // Import Product
import { Head, usePage } from '@inertiajs/react';
import HeroSection from './welcome/Partials/HeroSection';
import Header from './welcome/Partials/Header';
import FeaturedProductsSection from './welcome/Partials/FeaturedProductsSection';
import Footer from './welcome/Partials/Footer';


export default function Welcome() {
    // Ambil data featuredProducts dari props
    const { auth, featuredProducts } = usePage<{ auth: SharedData['auth'], featuredProducts: Product[] }>().props;

    return (
        <>
            <Head title="Haji Elektronik - Perabotan & Elektronik Modern" />
            <div className="flex min-h-screen w-full flex-col bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200">

                <Header user={auth.user} />

                <main className="flex-1">
                    <HeroSection />
                    {/* Hapus <CategoriesSection /> */}
                    <FeaturedProductsSection products={featuredProducts} />
                </main>

                <Footer />
            </div>
        </>
    );
}


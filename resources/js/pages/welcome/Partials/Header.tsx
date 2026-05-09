import { type User, type SharedData } from '@/types';
import { Link, usePage, router } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { ShoppingCart, User as UserIcon, LayoutDashboard, Search, LogOut, X, ShoppingBag, CreditCard } from 'lucide-react';
import { route } from 'ziggy-js';
import { useState, useEffect } from 'react';
import React from 'react';
import { cn } from '@/lib/utils';

// --- Sub-Komponen ---

function BrandLogo() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <img src="/image/logo.png" alt="Haji Elektronik Logo" className="h-12 w-auto" />
        </Link>
    );
}

function HeaderActions({ user }: { user: User | null }) {
    const { cartCount } = usePage<SharedData>().props;

    if (user) {
        return (
            <div className="flex items-center gap-2">
                <Link href={route('cart.index')}>
                    <Button variant="ghost" size="icon" className="h-10 w-10 relative">
                        <ShoppingCart className="h-6 w-6" />
                        <span className="sr-only">Keranjang</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </Button>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10">
                            <UserIcon className="h-6 w-6" />
                            <span className="sr-only">Menu Pengguna</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hi, {user.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {user.role === 'admin' ? (
                            <DropdownMenuItem asChild><Link href={route('dashboard')}><LayoutDashboard className="mr-2 h-4 w-4" /><span>Dashboard</span></Link></DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem asChild><Link href="#"><UserIcon className="mr-2 h-4 w-4" /><span>Profil</span></Link></DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild><Link href={route('orders.index')}><ShoppingBag className="mr-2 h-4 w-4" /><span>Pesanan Saya</span></Link></DropdownMenuItem>
                        {user.role !== 'admin' && (
                            <DropdownMenuItem asChild><Link href={route('customer.installments.index')}><CreditCard className="mr-2 h-4 w-4" /><span>Cek Angsuran</span></Link></DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href={route('logout')} method="post" as="button" className="w-full text-left"><LogOut className="mr-2 h-4 w-4" /><span>Log Out</span></Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
    }
    return (
        <div className="hidden items-center gap-2 md:flex">
            <Link
                href={route('login')}
                className={cn(buttonVariants({ variant: 'outline' }), "rounded-full px-6 border-gray-300 dark:border-gray-700")}
            >
                Log In
            </Link>
            <Link
                href={route('register')}
                className={cn(buttonVariants({ variant: 'default' }), "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-full px-6")}
            >
                Register
            </Link>
        </div>
    );
}

// Komponen helper untuk item di dalam dropdown navigasi
const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"


// --- Komponen Utama Header ---

export default function Header({ user }: { user: User | null }) {
    const [isTopBarVisible, setIsTopBarVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const isDismissed = sessionStorage.getItem('topBarDismissed') === 'true';
        if (!user && !isDismissed) {
            setIsTopBarVisible(true);
        }
    }, [user]);

    const handleDismissTopBar = () => {
        setIsTopBarVisible(false);
        sessionStorage.setItem('topBarDismissed', 'true');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get(route('search.index'), { q: searchQuery });
        }
    };

    return (
        <>
            {isTopBarVisible && (
                <div className="fixed top-0 left-0 right-0 z-[60] bg-black text-white text-center text-sm py-2 px-4">
                    <span>Untuk melakukan pembelian, silahkan login dahulu</span>
                    <button onClick={handleDismissTopBar} className="absolute top-1/2 right-4 -translate-y-1/2 text-white hover:opacity-75">
                        <X className="h-5 w-5" />
                    </button>
                </div>
            )}

            <header className={cn(
                "fixed left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300",
                isTopBarVisible ? "top-12 sm:top-14" : "top-6"
            )}>
                <div className="mx-auto max-w-7xl">
                    <div className="pointer-events-auto flex h-20 items-center justify-between gap-8 rounded-full border border-slate-200/60 bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/80 px-6 lg:px-8">

                        <div className="flex items-center gap-8">
                        <BrandLogo />
                        {/* NAVIGASI UTAMA DIPERBARUI */}
                        <nav className="hidden items-center gap-4 text-sm font-medium text-gray-700 dark:text-gray-300 md:flex">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className="bg-transparent">Produk</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                                <ListItem href="/kategori/elektronik" title="Elektronik">
                                                    Peralatan canggih untuk mempermudah kehidupan sehari-hari Anda.
                                                </ListItem>
                                                <ListItem href="/kategori/mebel" title="Mebel">
                                                    Koleksi furnitur modern dan minimalis untuk setiap sudut rumah Anda.
                                                </ListItem>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                            <Link href="#" className="hover:text-black dark:hover:text-white">Promo</Link>
                            <Link href="#" className="hover:text-black dark:hover:text-white">Tentang Kami</Link>
                            <Link href="#" className="hover:text-black dark:hover:text-white">Kontak</Link>
                        </nav>
                    </div>

                    <div className="flex-1 flex justify-center">
                        <div className="w-full max-w-lg">
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    type="search"
                                    placeholder="Cari produk elektronik atau mebel..."
                                    className="pl-12 pr-4 h-12 w-full rounded-full bg-gray-100 dark:bg-gray-800 border-transparent focus:border-gray-300 focus:bg-white focus:ring-0"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </form>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <HeaderActions user={user} />
                    </div>
                    </div>
                </div>
            </header>
            
            {/* Global Spacer to offset the floating navbar on all pages */}
            <div className={cn(
                "w-full shrink-0 transition-all duration-300",
                isTopBarVisible ? "h-36 lg:h-40" : "h-28 lg:h-32"
            )}></div>
        </>
    );
}


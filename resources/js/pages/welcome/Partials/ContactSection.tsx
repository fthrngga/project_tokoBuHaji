import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CONTACT_ITEMS = [
    {
        icon: Phone,
        label: "Telepon & WhatsApp",
        desc: "Layanan cepat via panggilan suara atau pesan teks.",
        value: "0823 2167 1759",
        href: "tel:082321671759",
    },
    {
        icon: Mail,
        label: "Email",
        desc: "Untuk penawaran bisnis atau komplain resmi.",
        value: "tokohajielektronik@gmail.com",
        href: "mailto:tokohajielektronik@gmail.com",
    },
    {
        icon: MapPin,
        label: "Kunjungi Toko Kami",
        desc: "Jl. Jend. Sudirman, Koto Raja, Kec. Siak Kecil, Kabupaten Bengkalis, Riau 28771",
        value: "Buka di Google Maps →",
        href: "https://maps.google.com",
    },
];

export default function ContactSection() {
    return (
        <section className="py-14 md:py-20 bg-background">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mb-2">
                        Hubungi Kami
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                        Punya pertanyaan seputar produk atau cicilan? Tim kami siap membantu Anda.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    {/* Contact Info Cards */}
                    <div className="space-y-4">
                        {CONTACT_ITEMS.map(({ icon: Icon, label, desc, value, href }) => (
                            <div
                                key={label}
                                className="group flex items-start gap-4 bg-card border border-border rounded-2xl p-5 hover:-translate-y-0.5 hover:border-primary/30 transition-all duration-200 card-shadow"
                            >
                                <div className="flex-none w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                                    <Icon size={18} />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-foreground text-sm mb-0.5">{label}</p>
                                    <p className="text-muted-foreground text-xs mb-2 leading-relaxed">{desc}</p>
                                    <a
                                        href={href}
                                        target={href.startsWith('http') ? '_blank' : undefined}
                                        rel={href.startsWith('http') ? 'noreferrer' : undefined}
                                        className="text-primary hover:text-primary/80 text-sm font-medium transition-colors truncate block"
                                    >
                                        {value}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* WhatsApp Quick Chat */}
                    <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center card-shadow">
                        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-5">
                            <MessageCircle className="text-green-600" size={36} />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1">Chat Langsung via WhatsApp</h3>
                        <p className="text-muted-foreground text-sm mb-2 max-w-xs leading-relaxed">
                            Respon instan dari admin kami setiap hari kerja.
                        </p>
                        <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full mb-6">
                            <Clock size={11} />
                            Buka Setiap Hari (08:00 – 17:00)
                        </div>
                        <a
                            href="https://wa.me/6282321671759?text=Halo%20Admin%20Toko%20Pak%20Haji%20Elektronik%2C%20saya%20ingin%20bertanya..."
                            target="_blank"
                            rel="noreferrer"
                            className="w-full"
                        >
                            <Button className="w-full h-12 text-base font-bold bg-green-600 hover:bg-green-700 text-white transition-all hover:-translate-y-0.5">
                                <MessageCircle size={18} className="mr-2" />
                                Hubungi via WhatsApp
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactSection() {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Hubungi Kami</h2>
                <p className="text-[#aabfd3] max-w-2xl mx-auto text-lg">Punya pertanyaan seputar produk atau cicilan? Jangan ragu untuk menghubungi tim layanan pelanggan kami. Kami siap membantu Anda!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
                {/* Contact Info Cards */}
                <div className="space-y-6">
                    <div className="group relative overflow-hidden bg-[#0d1e2e]/50 backdrop-blur-md border border-[#577399]/30 rounded-2xl p-6 transition-all duration-300 hover:bg-[#0d1e2e]/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20">
                        <div className="flex items-start gap-5">
                            <div className="bg-blue-600/20 p-4 rounded-xl text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Telepon & WhatsApp</h3>
                                <p className="text-[#8b9bb4] mb-3">Layanan cepat via panggilan suara atau pesan teks.</p>
                                <a href="tel:082321671759" className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors">0823 2167 1759</a>
                            </div>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden bg-[#0d1e2e]/50 backdrop-blur-md border border-[#577399]/30 rounded-2xl p-6 transition-all duration-300 hover:bg-[#0d1e2e]/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20">
                        <div className="flex items-start gap-5">
                            <div className="bg-blue-600/20 p-4 rounded-xl text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                                <p className="text-[#8b9bb4] mb-3">Untuk penawaran bisnis atau komplain resmi.</p>
                                <a href="mailto:tokohajielektronik@gmail.com" className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors">tokohajielektronik@gmail.com</a>
                            </div>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden bg-[#0d1e2e]/50 backdrop-blur-md border border-[#577399]/30 rounded-2xl p-6 transition-all duration-300 hover:bg-[#0d1e2e]/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20">
                        <div className="flex items-start gap-5">
                            <div className="bg-blue-600/20 p-4 rounded-xl text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Kunjungi Toko Kami</h3>
                                <p className="text-[#8b9bb4] mb-3">Jl. Jend. Sudirman, Koto Raja, Kec. Siak Kecil, Kabupaten Bengkalis, Riau 28771</p>
                                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                                    Buka di Google Maps <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Direct Message Form / Card */}
                <div className="bg-gradient-to-br from-[#0d1e2e] to-[#080f1a] border border-[#577399]/40 rounded-3xl p-8 lg:p-10 flex flex-col relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Kirim Pesan Cepat</h3>
                    <p className="text-[#8b9bb4] mb-8 relative z-10">Terhubung langsung dengan Admin kami via WhatsApp untuk respon instan (Real-time).</p>
                    
                    <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 relative z-10">
                        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                            <MessageCircle className="w-12 h-12 text-green-500" />
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-1">Admin Toko (Fast Response)</h4>
                            <p className="text-sm text-[#8b9bb4] flex items-center justify-center gap-2">
                                <Clock className="w-4 h-4" /> Buka Setiap Hari (08:00 - 17:00)
                            </p>
                        </div>
                        <a href="https://wa.me/6282321671759?text=Halo%20Admin%20Toko%20Pak%20Haji%20Elektronik,%20saya%20ingin%20bertanya..." target="_blank" rel="noreferrer" className="w-full">
                            <Button className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20 transition-all hover:scale-[1.02]">
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Chat via WhatsApp
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

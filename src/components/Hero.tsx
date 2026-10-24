import React from 'react';
import { ShieldCheck, Truck, Percent, MessageCircle, ArrowDown, Award } from 'lucide-react';
import { StoreConfig } from '../types.ts';

interface HeroProps {
  storeConfig: StoreConfig;
}

export const Hero: React.FC<HeroProps> = ({ storeConfig }) => {
  const cleanPhone = storeConfig.whatsappNumber.replace(/\D/g, '');

  return (
    <section className="relative overflow-hidden bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-red-700">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Official Evolene Indonesia</span>
              <span className="text-stone-300">|</span>
              <span className="text-stone-700 font-semibold">Tersertifikasi Labdoor USA</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-[1.15] text-balance">
              Bangun Otot Maksimal & Raih Badan Impian bersama Evolene.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Suplemen kebanggaan Indonesia dengan standar internasional. Dapatkan <strong className="text-stone-900 font-semibold">Evowhey, Evomass, Crevolene, hingga Prevo</strong> dengan 
              <strong className="text-red-600 font-semibold"> diskon langsung 20% - 25% di setiap produk</strong>. Pemesanan praktis dan konfirmasi cepat langsung via WhatsApp!
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#katalog"
                className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow active:scale-95 flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Lihat Produk Evolene Diskon</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Halo Hyper Trophy, saya ingin tanya rekomendasi suplemen Evolene dan promo diskon hari ini.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow active:scale-95 flex items-center gap-2 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Konsultasi via WhatsApp</span>
              </a>
            </div>

            {/* Proof Points */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-100 text-xs text-stone-600">
              <div className="flex items-start gap-2">
                <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-stone-900">Labdoor Certified</strong>
                  <span>Uji Kemurnian Dunia</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Percent className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-stone-900">Diskon Tiap Item</strong>
                  <span>Hemat s/d Rp 112.500</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-stone-900">100% BPOM & Halal</strong>
                  <span>Barcode Asli Tertera</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-800 aspect-[4/3] bg-stone-900">
              <img
                src="/src/assets/images/evolene_evowhey_protein_1792846433673.jpg"
                alt="Produk Resmi Evolene Evowhey Protein Indonesia di Hyper Trophy"
                className="w-full h-full object-cover"
                loading="eager"
              />
              
              {/* Scrim Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-stone-950/90 text-white backdrop-blur-md border border-stone-700 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                    <div>
                      <p className="text-xs font-bold text-white">Hyper Trophy — Evolene Store</p>
                      <p className="text-[11px] text-stone-300">Pesan langsung ke WhatsApp tanpa perlu repot daftar akun</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-red-600 text-white text-[11px] font-black rounded">
                    HEMAT 25%
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

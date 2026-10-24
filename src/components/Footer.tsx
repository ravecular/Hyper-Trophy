import React from 'react';
import { ShieldCheck, MessageCircle, Truck, Heart, Award } from 'lucide-react';
import { StoreConfig } from '../types.ts';

interface FooterProps {
  storeConfig: StoreConfig;
}

export const Footer: React.FC<FooterProps> = ({ storeConfig }) => {
  const cleanPhone = storeConfig.whatsappNumber.replace(/\D/g, '');

  return (
    <footer className="bg-stone-950 text-stone-300 pt-14 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-base">
                H
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                HYPER <span className="text-red-500">TROPHY</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Mitra resmi penjualan suplemen Evolene di Indonesia. Menghadirkan suplemen protein, gainer, kreatin, dan pre-workout dengan sertifikasi kemurnian Labdoor USA, BPOM RI, serta Halal MUI dengan diskon langsung di setiap pembelian.
            </p>
            <div className="flex items-center gap-3 text-xs text-stone-400 pt-1">
              <span className="flex items-center gap-1.5 text-red-500 font-bold">
                <Award className="w-4 h-4 text-amber-400" /> Labdoor Certified
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> 100% BPOM Resmi
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-stone-300">
                <Truck className="w-4 h-4 text-red-400" /> Pengiriman Se-Indonesia
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Suplemen Populer Evolene</h4>
            <ul className="text-xs text-stone-400 space-y-2">
              <li><a href="#katalog" className="hover:text-red-400 transition-colors">Evolene Evowhey (Whey Protein 25g)</a></li>
              <li><a href="#katalog" className="hover:text-red-400 transition-colors">Evolene Evomass (Mass Gainer 52g)</a></li>
              <li><a href="#katalog" className="hover:text-red-400 transition-colors">Crevolene (Creatine Monohydrate)</a></li>
              <li><a href="#katalog" className="hover:text-red-400 transition-colors">Evolene Prevo (Pre-Workout Energy)</a></li>
              <li><a href="#katalog" className="hover:text-red-400 transition-colors">Evogold Isolate (Zero Fat & Sugar)</a></li>
            </ul>
          </div>

          {/* Customer Service & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Layanan Konsultasi WA</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Bingung memilih suplemen untuk program bulking atau cutting Anda? Konsultasikan gratis bersama tim spesialis nutrisi kami via WhatsApp.
            </p>
            <div className="pt-1">
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Halo Admin Evolene, saya ingin konsultasi suplemen yang pas untuk program tubuh saya.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +{storeConfig.whatsappNumber}</span>
              </a>
            </div>
            <p className="text-[11px] text-stone-500">Fast Response: Setiap Hari (08.00 - 21.00 WIB)</p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Hyper Trophy — Official Evolene Partner Store. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-2">
            <span>Dibuat untuk kebugaran & kemajuan atlet Indonesia</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>

      </div>
    </footer>
  );
};

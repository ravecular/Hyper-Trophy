import React from 'react';
import { ShoppingBag, MessageCircle, Percent, Sparkles, Award } from 'lucide-react';
import { StoreConfig } from '../types.ts';
import { formatRupiah } from '../utils/formatters.ts';

interface HeaderProps {
  cartCount: number;
  cartTotalSavings: number;
  onOpenCart: () => void;
  storeConfig: StoreConfig;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotalSavings,
  onOpenCart,
  storeConfig
}) => {
  const cleanPhone = storeConfig.whatsappNumber.replace(/\D/g, '');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Top micro announcement */}
      <div className="bg-stone-950 text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide border-b border-red-700/40">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>PROMO RESMI EVOLENE: Diskon 20% - 25% di Setiap Pembelian + Pesan Cepat via WhatsApp!</span>
        </div>
      </div>

      {/* Main Top Bar adhering to Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line */}
        <a href="#" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-xl shadow-sm group-hover:bg-red-700 transition-colors">
            H
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-stone-900 leading-none">
              HYPER <span className="text-red-600">TROPHY</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400 mt-0.5">
              Sports Nutrition & Evolene Store
            </span>
          </div>
        </a>

        {/* Zone 2: 4 clean nav links, single-line text */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a href="#katalog" className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0">
            Katalog Evolene
          </a>
          <a href="#promo-diskon" className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Promo Diskon
          </a>
          <a href="#keunggulan" className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0">
            Labdoor & BPOM
          </a>
          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Halo Hyper Trophy, saya ingin konsultasi pemilihan suplemen yang pas untuk program latihan saya.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-emerald-800 font-semibold"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            Konsultasi WA
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            aria-label={`Keranjang belanja: ${cartCount} barang`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span>Keranjang</span>
            {cartTotalSavings > 0 && (
              <span className="hidden sm:inline bg-red-950 text-red-200 text-[10px] px-1.5 py-0.5 rounded font-mono border border-red-800/60">
                Hemat {formatRupiah(cartTotalSavings)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  HelpCircle, 
  ChevronDown, 
  MessageCircle, 
  CheckCircle2,
  Percent,
  TrendingDown,
  Award
} from 'lucide-react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { PromoBanner } from './components/PromoBanner.tsx';
import { ProductCard } from './components/ProductCard.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { WhatsAppCheckoutModal } from './components/WhatsAppCheckoutModal.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { Footer } from './components/Footer.tsx';

import { PRODUCTS, CATEGORIES, STORE_CONFIG, AVAILABLE_VOUCHERS, STORE_FEATURES } from './data/products.ts';
import { Product, CartItem, StoreConfig, Voucher } from './types.ts';
import { formatRupiah } from './utils/formatters.ts';

const CART_STORAGE_KEY = 'hypertrophy:cart:v2';
const CONFIG_STORAGE_KEY = 'hypertrophy:config:v2';

export default function App() {
  // Store Config
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.whatsappNumber && parsed.whatsappNumber !== '6281234567890') {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return STORE_CONFIG;
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return [];
  });

  // Filtering & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage quota issues
    }
  }, [cart]);

  // Sync Store Config to LocalStorage
  const handleUpdateStoreConfig = (updated: Partial<StoreConfig>) => {
    setStoreConfig((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const index = prev.findIndex((item) => item.product.id === product.id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = {
          ...next[index],
          quantity: next[index].quantity + quantity
        };
        return next;
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Voucher Handlers
  const handleApplyVoucher = (code: string) => {
    const found = AVAILABLE_VOUCHERS.find((v) => v.code === code);
    if (found) {
      setAppliedVoucher(found);
      setIsCartOpen(true);
    }
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Semua' || product.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.subtitle.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.benefits.some((b) => b.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Aggregate Calculations
  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartTotalSavings = useMemo(() => {
    const productDiscount = cart.reduce(
      (acc, item) => acc + (item.product.originalPrice - item.product.price) * item.quantity,
      0
    );
    let extraVoucher = 0;
    if (appliedVoucher) {
      const totalPromo = cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      if (appliedVoucher.discountAmount) {
        extraVoucher = appliedVoucher.discountAmount;
      } else if (appliedVoucher.discountRate) {
        extraVoucher = Math.round(totalPromo * appliedVoucher.discountRate);
      }
    }
    return productDiscount + extraVoucher;
  }, [cart, appliedVoucher]);

  const cleanStorePhone = storeConfig.whatsappNumber.replace(/\D/g, '');

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900">
      {/* Top Bar Header */}
      <Header
        cartCount={cartCount}
        cartTotalSavings={cartTotalSavings}
        onOpenCart={() => setIsCartOpen(true)}
        storeConfig={storeConfig}
      />

      {/* Main Hero Section */}
      <Hero storeConfig={storeConfig} />

      {/* Discount & Voucher Strip */}
      <PromoBanner
        onApplyVoucher={handleApplyVoucher}
        appliedVoucherCode={appliedVoucher?.code}
      />

      {/* Catalog & Shop Section */}
      <main id="katalog" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full space-y-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span>Katalog Resmi Suplemen Evolene</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-1">
              Koleksi Lengkap Suplemen Evolene Terdiskon
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Evowhey, Evomass, Crevolene, dan Prevo original dengan diskon spesial 20% - 25% di setiap produk. Order instan langsung ke WhatsApp admin resmi.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Evowhey, Evomass, Prevo..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-stone-300 rounded-xl text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-red-300 hover:text-red-600'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-800">
              Produk Evolene Tidak Ditemukan
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Tidak ada produk Evolene yang cocok dengan pencarian "{searchQuery}". Silakan coba kata kunci lain seperti Evowhey atau Crevolene.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
              }}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={(p) => setSelectedProduct(p)}
                storeConfig={storeConfig}
              />
            ))}
          </div>
        )}

        {/* Value Proposition & Keunggulan Section */}
        <section id="keunggulan" className="pt-10 border-t border-stone-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Standar Kualitas Evolene
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
              Mengapa Memilih Suplemen Fitness Evolene?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STORE_FEATURES.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-stone-200 space-y-2 hover:border-red-200 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center text-xs font-black">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-stone-900 text-sm">{feat.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{feat.description}</p>
                <span className="inline-block text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  {feat.badge}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Cara Pesan via WhatsApp Guide */}
        <section className="bg-stone-950 text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-md">
                ALUR PEMESANAN EVOLENE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                3 Langkah Praktis Pesan Suplemen Evolene via WhatsApp
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                Pesan langsung dengan potongan diskon 20% - 25% tanpa perlu registrasi berbelit-belit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <h4 className="font-bold text-sm text-white">Pilih Produk Evolene</h4>
                <p className="text-xs text-stone-400">
                  Pilih Evowhey, Evomass, Crevolene atau Prevo dengan potongan diskon langsung.
                </p>
              </div>

              <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <h4 className="font-bold text-sm text-white">Rincian Otomatis Disusun</h4>
                <p className="text-xs text-stone-400">
                  Data produk, rasa pilihan, jumlah, alamat kirim, dan total diskon tersusun rapi.
                </p>
              </div>

              <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <h4 className="font-bold text-sm text-white">Kirim Pesan WhatsApp</h4>
                <p className="text-xs text-stone-400">
                  Kirim ke WhatsApp admin resmi Evolene. Pesanan segera dikonfirmasi dan dikirim hari ini.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${cleanStorePhone}?text=${encodeURIComponent('Halo Hyper Trophy, saya ingin tanya promo diskon dan pemesanan suplemen hari ini.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Chat WhatsApp Hyper Trophy Sekarang</span>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pt-8 border-t border-stone-200 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              Pertanyaan Seputar Produk Evolene (FAQ)
            </h2>
            <p className="text-xs text-stone-500">
              Informasi keaslian, sertifikasi Labdoor USA, aturan konsumsi, dan garansi BPOM RI.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: 'Apakah semua suplemen Evolene di sini dijamin 100% Original dan bergaransi?',
                a: 'Ya, seluruh produk Evolene (Evowhey, Evomass, Crevolene, Prevo, Evoboost, dll.) dijamin 100% Asli langsung dari pabrik resmi Evolene Indonesia dengan nomor BPOM aktif dan sertifikat halal MUI.'
              },
              {
                q: 'Apa itu sertifikasi Labdoor USA yang dimiliki Evolene?',
                a: 'Labdoor adalah lembaga pengujian independen asal Amerika Serikat yang menguji kemurnian, akurasi kandungan nutrisi, dan keamanan suplemen secara ketat di laboratorium. Evolene adalah brand suplemen Indonesia pertama yang meraih peringkat kemurnian dunia di Labdoor.'
              },
              {
                q: 'Bagaimana cara mendapatkan diskon 20% - 25% pada setiap pembelian?',
                a: 'Seluruh harga di katalog sudah otomatis dipotong diskon langsung tanpa syarat minimum. Selain itu, Anda bisa memasukkan kode voucher promo EVOHEMAT atau EVOBULK pada keranjang untuk tambahan potongan ekstra!'
              },
              {
                q: 'Apakah bisa memesan dengan sistem COD (Bayar di Tempat)?',
                a: 'Bisa! Kami melayani pembayaran via Transfer Bank (BCA, Mandiri), QRIS, serta COD (Cash on Delivery) ke berbagai kota di Indonesia. Pilih opsi pembayaran saat mengirim pesanan via WhatsApp.'
              }
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-xl border border-stone-200 overflow-hidden text-xs"
              >
                <summary className="p-4 font-bold text-stone-900 flex items-center justify-between cursor-pointer select-none list-none">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-stone-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
                </summary>
                <div className="px-4 pb-4 text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        storeConfig={storeConfig}
        appliedVoucher={appliedVoucher}
        onApplyVoucher={handleApplyVoucher}
        onRemoveVoucher={handleRemoveVoucher}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        storeConfig={storeConfig}
      />

      {/* WhatsApp Checkout Modal */}
      <WhatsAppCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        storeConfig={storeConfig}
        onUpdateStoreConfig={handleUpdateStoreConfig}
        appliedVoucher={appliedVoucher}
      />

      {/* Quick Floating WhatsApp Help */}
      <FloatingWhatsApp storeConfig={storeConfig} />

      {/* Footer */}
      <Footer storeConfig={storeConfig} />
    </div>
  );
}

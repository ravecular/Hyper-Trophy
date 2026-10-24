import React, { useEffect } from 'react';
import { X, Star, ShieldCheck, ShoppingBag, MessageCircle, Check, Info, Award } from 'lucide-react';
import { Product, StoreConfig } from '../types.ts';
import { formatRupiah, buildDirectWhatsAppProductUrl } from '../utils/formatters.ts';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  storeConfig: StoreConfig;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  storeConfig
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const [addedToast, setAddedToast] = React.useState(false);

  useEffect(() => {
    setQuantity(1);
    setAddedToast(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const totalNormal = product.originalPrice * quantity;
  const totalPromo = product.price * quantity;
  const totalSavings = totalNormal - totalPromo;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 1200);
  };

  const handleDirectWA = () => {
    const url = buildDirectWhatsAppProductUrl(product, quantity, storeConfig);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
            <span>Evolene {product.category}</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-500 font-normal">{product.serving}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Image & Badges */}
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-900 border border-stone-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-black rounded-md shadow-md tracking-wider">
                    DISKON {product.discountPercent}%
                  </span>
                </div>
              </div>

              {/* BPOM & Authenticity */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Sertifikasi Resmi BPOM RI & Labdoor USA</span>
                </div>
                <p className="font-mono text-stone-500 text-[11px]">{product.bpom}</p>
              </div>
            </div>

            {/* Info & Purchase Details */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="ml-1 text-xs font-bold text-stone-900">{product.rating}</span>
                  </div>
                  <span className="text-xs text-stone-400">({product.reviewsCount} Ulasan Pembeli Terverifikasi)</span>
                </div>
                <h2 className="text-xl font-extrabold text-stone-900 leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-stone-500 mt-1">{product.subtitle}</p>
              </div>

              {/* Pricing Box */}
              <div className="p-4 bg-red-50/60 rounded-xl border border-red-100">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl font-black text-stone-900 tabular-nums">
                    {formatRupiah(product.price)}
                  </span>
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    {formatRupiah(product.originalPrice)}
                  </span>
                  <span className="text-xs font-black text-red-600">
                    -{product.discountPercent}%
                  </span>
                </div>
                <p className="text-xs font-bold text-red-700 mt-1">
                  Hemat {formatRupiah(product.originalPrice - product.price)} per produk
                </p>
              </div>

              {/* Quantity Stepper */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-700">Jumlah Pembelian</label>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center border border-stone-300 rounded-lg bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="px-3 py-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-40 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-sm font-bold text-stone-900 tabular-nums min-w-10 text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-xs text-stone-600">
                    Total: <strong className="text-stone-900 font-bold">{formatRupiah(totalPromo)}</strong>
                    <span className="block text-[11px] text-red-600 font-semibold">
                      (Total Hemat {formatRupiah(totalSavings)})
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedToast
                      ? 'bg-red-600 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
                  }`}
                >
                  {addedToast ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Berhasil Ditambahkan!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Tambah ke Keranjang</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDirectWA}
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>Beli via WhatsApp</span>
                </button>
              </div>

            </div>
          </div>

          {/* Description & Benefits tabs */}
          <div className="border-t border-stone-200 pt-5 space-y-4 text-xs text-stone-700">
            <div>
              <h4 className="font-bold text-stone-900 text-sm mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Keunggulan & Manfaat Suplemen Evolene</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-stone-900 text-sm">Deskripsi Produk Evolene</h4>
              <p className="leading-relaxed text-stone-600">{product.description}</p>
            </div>

            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 flex items-start gap-2.5 text-stone-700">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold text-stone-900">Petunjuk Pemakaian Resmi:</strong>
                <span>{product.usage}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

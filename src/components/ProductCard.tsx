import React from 'react';
import { ShoppingBag, MessageCircle, Star, ShieldCheck, Check, Award } from 'lucide-react';
import { Product, StoreConfig } from '../types.ts';
import { formatRupiah, buildDirectWhatsAppProductUrl } from '../utils/formatters.ts';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  storeConfig: StoreConfig;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  storeConfig
}) => {
  const [justAdded, setJustAdded] = React.useState(false);
  const savings = product.originalPrice - product.price;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleDirectWA = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = buildDirectWhatsAppProductUrl(product, 1, storeConfig);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      onClick={() => onViewDetails(product)}
      className="group flex flex-col bg-white rounded-2xl border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-[4/3] w-full bg-stone-900 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <span className="px-2.5 py-1 bg-red-600 text-white text-xs font-black rounded-md shadow-md tracking-wider">
            HEMAT {product.discountPercent}%
          </span>
          {product.isBestSeller && (
            <span className="px-2 py-0.5 bg-black/80 text-amber-300 text-[10px] font-bold rounded backdrop-blur-xs flex items-center gap-1 border border-amber-500/30">
              <Award className="w-3 h-3 text-amber-400" />
              Best Seller
            </span>
          )}
        </div>

        {/* Serving tag */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-stone-200 text-[11px] font-medium backdrop-blur-xs border border-white/10">
          {product.serving}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-bold uppercase tracking-wider text-red-600 text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-stone-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-stone-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title & Subtitle */}
          <div>
            <h3 className="font-extrabold text-stone-900 text-base group-hover:text-red-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
              {product.subtitle}
            </p>
          </div>

          {/* Key Benefits (Clean unboxed list) */}
          <ul className="text-xs text-stone-600 space-y-1 pt-1">
            {product.benefits.slice(0, 2).map((benefit, i) => (
              <li key={i} className="flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                <span className="truncate">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-stone-100 space-y-3">
          {/* Price with Discount */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-stone-900 tabular-nums">
                {formatRupiah(product.price)}
              </span>
              <span className="text-xs text-stone-400 line-through tabular-nums">
                {formatRupiah(product.originalPrice)}
              </span>
            </div>
            <p className="text-[11px] font-bold text-red-600 mt-0.5">
              Hemat {formatRupiah(savings)} ({product.discountPercent}% OFF)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className={`py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                justAdded
                  ? 'bg-red-600 text-white'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
              }`}
              title="Tambah ke Keranjang"
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Masuk</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-stone-600" />
                  <span>+ Keranjang</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDirectWA}
              className="py-2 px-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
              title="Pesan Langsung via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
              <span>Beli via WA</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
            <span className="flex items-center gap-1 text-emerald-800 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              BPOM RI Resmi
            </span>
            <span className="hover:underline text-stone-500 font-medium">Detail produk →</span>
          </div>
        </div>
      </div>
    </article>
  );
};

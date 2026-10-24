import React from 'react';
import { Tag, Sparkles, Copy, Check } from 'lucide-react';
import { AVAILABLE_VOUCHERS } from '../data/products.ts';

interface PromoBannerProps {
  onApplyVoucher: (code: string) => void;
  appliedVoucherCode?: string;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  onApplyVoucher,
  appliedVoucherCode
}) => {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopyAndApply = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onApplyVoucher(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="promo-diskon" className="bg-stone-100 py-6 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          {/* Left info */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Promo Diskon Spesial Suplemen Evolene</span>
            </div>
            <p className="text-sm text-stone-700">
              Setiap produk Evolene sudah <strong className="font-semibold text-stone-900">terdiskon langsung s/d 25%</strong>. Tambahkan kode kupon berikut untuk potongan harga ekstra saat checkout WhatsApp:
            </p>
          </div>

          {/* Vouchers Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {AVAILABLE_VOUCHERS.map((voucher) => {
              const isApplied = appliedVoucherCode === voucher.code;
              const isCopied = copiedCode === voucher.code;

              return (
                <button
                  key={voucher.code}
                  type="button"
                  onClick={() => handleCopyAndApply(voucher.code)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                    isApplied
                      ? 'bg-red-600 text-white border-red-700 shadow-sm'
                      : 'bg-white text-stone-800 border-stone-300 hover:border-red-500 hover:bg-red-50'
                  }`}
                  title={`Klik untuk pasang voucher ${voucher.code}`}
                >
                  <Tag className={`w-3.5 h-3.5 ${isApplied ? 'text-white' : 'text-red-600'}`} />
                  <span className="font-mono font-bold tracking-wider">{voucher.code}</span>
                  <span className="text-[11px] opacity-80">({voucher.label.split('(')[0].trim()})</span>
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                  ) : (
                    <Copy className="w-3 h-3 opacity-60" />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Truck, ShieldCheck } from 'lucide-react';
import { CartItem, StoreConfig, Voucher } from '../types.ts';
import { formatRupiah } from '../utils/formatters.ts';
import { AVAILABLE_VOUCHERS } from '../data/products.ts';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  storeConfig: StoreConfig;
  appliedVoucher: Voucher | null;
  onApplyVoucher: (code: string) => void;
  onRemoveVoucher: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  storeConfig,
  appliedVoucher,
  onApplyVoucher,
  onRemoveVoucher
}) => {
  const [voucherInput, setVoucherInput] = React.useState('');
  const [voucherError, setVoucherError] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const totalNormal = items.reduce(
    (acc, item) => acc + item.product.originalPrice * item.quantity,
    0
  );
  const totalPromo = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const totalProductDiscount = totalNormal - totalPromo;

  let voucherDiscount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountAmount) {
      voucherDiscount = appliedVoucher.discountAmount;
    } else if (appliedVoucher.discountRate) {
      voucherDiscount = Math.round(totalPromo * appliedVoucher.discountRate);
    }
  }

  const isFreeShipping = totalPromo >= storeConfig.freeShippingThreshold;
  const shippingFee = items.length === 0 ? 0 : (isFreeShipping ? 0 : storeConfig.standardShippingFee);
  const finalTotal = Math.max(0, totalPromo - voucherDiscount + shippingFee);
  const totalOverallSavings = totalProductDiscount + voucherDiscount;

  const freeShippingDifference = Math.max(0, storeConfig.freeShippingThreshold - totalPromo);
  const freeShippingProgress = Math.min(100, Math.round((totalPromo / storeConfig.freeShippingThreshold) * 100));

  const handleApplyVoucherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError(null);
    const code = voucherInput.trim().toUpperCase();
    if (!code) return;

    const normalizedInput = code.replace(/\s+/g, '');
    const found = AVAILABLE_VOUCHERS.find((v) => v.code === code || v.code.replace(/\s+/g, '') === normalizedInput);
    if (!found) {
      setVoucherError('Kode voucher tidak ditemukan.');
      return;
    }

    if (totalPromo < found.minSpend) {
      setVoucherError(`Minimal belanja untuk voucher ${found.code} adalah ${formatRupiah(found.minSpend)}.`);
      return;
    }

    onApplyVoucher(found.code);
    setVoucherInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/70">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              <h2 className="text-base font-bold text-stone-900">Keranjang Suplemen</h2>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                {items.reduce((acc, i) => acc + i.quantity, 0)} item
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer"
              aria-label="Tutup keranjang"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          {items.length > 0 && (
            <div className="px-6 py-2.5 bg-emerald-50/60 border-b border-emerald-100 text-xs text-stone-700">
              <div className="flex items-center justify-between mb-1">
                <span className="flex items-center gap-1.5 font-medium text-emerald-900">
                  <Truck className="w-3.5 h-3.5 text-emerald-700" />
                  {isFreeShipping ? (
                    <strong className="text-emerald-800">Selamat! Anda Berhak Gratis Ongkir</strong>
                  ) : (
                    <span>Tambah {formatRupiah(freeShippingDifference)} lagi untuk Gratis Ongkir</span>
                  )}
                </span>
                <span className="font-semibold text-emerald-800">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Items list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-bold text-stone-800 text-base">Keranjang Anda Masih Kosong</p>
                <p className="text-xs text-stone-500 max-w-xs">
                  Pilih suplemen kesehatan dan nikmati potongan diskon otomatis hingga 25% di setiap produk.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
                >
                  Mulai Belanja Suplemen
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemSavings = (item.product.originalPrice - item.product.price) * item.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="flex gap-3.5 p-3 rounded-xl border border-stone-200 hover:border-stone-300 bg-white transition-all"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-18 object-cover rounded-lg bg-stone-100 shrink-0 border border-stone-100"
                    />

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-stone-900 text-xs line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-stone-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                            title="Hapus dari keranjang"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-[10px] text-stone-500">{item.product.serving}</span>
                        
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="font-extrabold text-xs text-stone-900 tabular-nums">
                            {formatRupiah(item.product.price)}
                          </span>
                          <span className="text-[11px] text-stone-400 line-through tabular-nums">
                            {formatRupiah(item.product.originalPrice)}
                          </span>
                          <span className="text-[10px] font-bold text-red-600">
                            -{item.product.discountPercent}%
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Savings */}
                      <div className="flex items-center justify-between pt-2 border-t border-stone-100 mt-2">
                        <span className="text-[10px] font-medium text-emerald-700">
                          Hemat {formatRupiah(itemSavings)}
                        </span>

                        <div className="flex items-center border border-stone-300 rounded-md bg-stone-50">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="px-2 py-0.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-bold text-stone-900 tabular-nums min-w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="px-2 py-0.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer with Calculations */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50/70 space-y-4">
              
              {/* Voucher section */}
              <div className="space-y-1.5">
                <form onSubmit={handleApplyVoucherSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                    placeholder="Masukkan Kode Voucher (cth: EVOHEMAT)"
                    className="flex-1 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-mono placeholder:font-sans focus:outline-none focus:ring-1 focus:ring-red-600 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Gunakan
                  </button>
                </form>

                {voucherError && (
                  <p className="text-[11px] text-red-600">{voucherError}</p>
                )}

                {appliedVoucher && (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-900 px-3 py-1.5 rounded-lg text-xs">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-700" />
                      <span>
                        Voucher <strong>{appliedVoucher.code}</strong> aktif (-{formatRupiah(voucherDiscount)})
                      </span>
                    </div>
                    <button
                      onClick={onRemoveVoucher}
                      className="text-stone-400 hover:text-stone-700 text-xs font-bold p-1 cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Subtotal Harga Normal</span>
                  <span className="line-through text-stone-400 tabular-nums">{formatRupiah(totalNormal)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Potongan Diskon Produk</span>
                  <span className="tabular-nums">-{formatRupiah(totalProductDiscount)}</span>
                </div>
                {appliedVoucher && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Diskon Voucher Tambahan</span>
                    <span className="tabular-nums">-{formatRupiah(voucherDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Ongkos Kirim</span>
                  <span className="tabular-nums">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold">GRATIS</span>
                    ) : (
                      formatRupiah(shippingFee)
                    )}
                  </span>
                </div>

                <div className="p-2 bg-emerald-100/70 text-emerald-900 rounded-lg flex items-center justify-between text-xs font-bold">
                  <span>Total Penghematan Anda</span>
                  <span className="tabular-nums">{formatRupiah(totalOverallSavings)}</span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Akhir</span>
                  <span className="text-emerald-800 tabular-nums">{formatRupiah(finalTotal)}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <span>Pesan Sekarang via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-stone-500">
                Data pesanan akan dirangkum rapi dan otomatis dikirimkan ke WhatsApp admin kami.
              </p>
            </div>
          )}

        </aside>
      </div>
    </div>
  );
};

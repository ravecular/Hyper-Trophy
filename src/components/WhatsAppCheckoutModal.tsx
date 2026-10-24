import React, { useState } from 'react';
import { X, MessageCircle, Send, ShieldCheck, MapPin, CreditCard, User, Phone, Check, Settings2 } from 'lucide-react';
import { CartItem, CustomerInfo, StoreConfig, Voucher } from '../types.ts';
import { formatRupiah, buildWhatsAppOrderUrl } from '../utils/formatters.ts';

interface WhatsAppCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  storeConfig: StoreConfig;
  onUpdateStoreConfig: (updated: Partial<StoreConfig>) => void;
  appliedVoucher: Voucher | null;
}

export const WhatsAppCheckoutModal: React.FC<WhatsAppCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  storeConfig,
  onUpdateStoreConfig,
  appliedVoucher
}) => {
  const [customer, setCustomer] = useState<CustomerInfo>({
    fullName: '',
    whatsapp: '',
    address: '',
    city: '',
    paymentMethod: 'transfer_bca',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showConfig, setShowConfig] = useState(false);
  const [customPhone, setCustomPhone] = useState(storeConfig.whatsappNumber);
  const [phoneSavedToast, setPhoneSavedToast] = useState(false);

  if (!isOpen) return null;

  const totalPromo = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const isFreeShipping = totalPromo >= storeConfig.freeShippingThreshold;
  const shippingFee = items.length === 0 ? 0 : (isFreeShipping ? 0 : storeConfig.standardShippingFee);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!customer.fullName.trim()) {
      errors.fullName = 'Nama lengkap wajib diisi.';
    }
    if (!customer.whatsapp.trim()) {
      errors.whatsapp = 'Nomor WhatsApp wajib diisi.';
    } else {
      const clean = customer.whatsapp.replace(/\D/g, '');
      if (clean.length < 9) {
        errors.whatsapp = 'Nomor WhatsApp minimal 9 digit angka.';
      }
    }
    if (!customer.address.trim()) {
      errors.address = 'Alamat pengiriman wajib diisi.';
    }
    if (!customer.city.trim()) {
      errors.city = 'Kota atau kecamatan wajib diisi.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const url = buildWhatsAppOrderUrl(items, customer, storeConfig, appliedVoucher, shippingFee);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSaveStorePhone = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customPhone.replace(/\D/g, '');
    if (clean.length >= 8) {
      onUpdateStoreConfig({ whatsappNumber: clean });
      setPhoneSavedToast(true);
      setTimeout(() => {
        setPhoneSavedToast(false);
        setShowConfig(false);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base leading-none">
                Pemesanan via WhatsApp
              </h3>
              <p className="text-[11px] text-stone-500 mt-1">
                Data akan diformat otomatis dan dikirimkan langsung ke nomor admin toko
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Store WhatsApp Target Bar with test setting */}
          <div className="p-3 bg-stone-100 rounded-xl flex items-center justify-between text-xs text-stone-700">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-900">Tujuan Nomor WhatsApp Toko:</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-stone-300 text-emerald-800 font-bold">
                +{storeConfig.whatsappNumber}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="text-[11px] text-stone-500 hover:text-emerald-700 flex items-center gap-1 cursor-pointer font-medium"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{showConfig ? 'Tutup Pengaturan' : 'Ubah Nomor Toko'}</span>
            </button>
          </div>

          {/* Quick config toggle */}
          {showConfig && (
            <form onSubmit={handleSaveStorePhone} className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
              <label className="text-xs font-semibold text-emerald-950 block">
                Sesuaikan Nomor WhatsApp Toko (Awalan 62):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                  placeholder="Contoh: 6281234567890"
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  {phoneSavedToast ? 'Tersimpan!' : 'Simpan'}
                </button>
              </div>
              <p className="text-[10px] text-stone-500">
                Gunakan format internasional (cth: 6281234567890). Nomor ini yang akan menerima pesanan pelanggan.
              </p>
            </form>
          )}

          {/* Checkout Form */}
          <form id="checkout-form" onSubmit={handleSendOrder} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Nama Lengkap */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-stone-500" />
                  <span>Nama Lengkap Penerima *</span>
                </label>
                <input
                  type="text"
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="Contoh: Budi Santoso"
                  className={`w-full px-3 py-2 text-xs bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 ${
                    formErrors.fullName ? 'border-red-500 focus:ring-red-500 bg-red-50/30' : 'border-stone-300 focus:ring-emerald-600'
                  }`}
                />
                {formErrors.fullName && <p className="text-[11px] text-red-600">{formErrors.fullName}</p>}
              </div>

              {/* Nomor WhatsApp */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-stone-500" />
                  <span>Nomor WhatsApp Anda *</span>
                </label>
                <input
                  type="tel"
                  value={customer.whatsapp}
                  onChange={(e) => setCustomer({ ...customer, whatsapp: e.target.value })}
                  placeholder="Contoh: 08123456789 atau 62812..."
                  className={`w-full px-3 py-2 text-xs bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 ${
                    formErrors.whatsapp ? 'border-red-500 focus:ring-red-500 bg-red-50/30' : 'border-stone-300 focus:ring-emerald-600'
                  }`}
                />
                {formErrors.whatsapp && <p className="text-[11px] text-red-600">{formErrors.whatsapp}</p>}
              </div>
            </div>

            {/* Alamat Pengiriman */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                <span>Alamat Lengkap Pengiriman *</span>
              </label>
              <textarea
                rows={2}
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                placeholder="Jl. Merdeka No. 45, RT 02 / RW 05, Patokan dekat pos satpam..."
                className={`w-full px-3 py-2 text-xs bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 ${
                  formErrors.address ? 'border-red-500 focus:ring-red-500 bg-red-50/30' : 'border-stone-300 focus:ring-emerald-600'
                }`}
              />
              {formErrors.address && <p className="text-[11px] text-red-600">{formErrors.address}</p>}
            </div>

            {/* Kota & Kode Pos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Kota / Kabupaten & Kecamatan *</label>
                <input
                  type="text"
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  placeholder="Contoh: Jakarta Selatan, Kebayoran Baru"
                  className={`w-full px-3 py-2 text-xs bg-stone-50 border rounded-lg focus:outline-none focus:ring-1 ${
                    formErrors.city ? 'border-red-500 focus:ring-red-500 bg-red-50/30' : 'border-stone-300 focus:ring-emerald-600'
                  }`}
                />
                {formErrors.city && <p className="text-[11px] text-red-600">{formErrors.city}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Kode Pos (Opsional)</label>
                <input
                  type="text"
                  value={customer.postalCode || ''}
                  onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                  placeholder="Contoh: 12150"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-stone-500" />
                <span>Pilihan Pembayaran yang Diinginkan</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'transfer_bca', name: 'Transfer BCA' },
                  { id: 'transfer_mandiri', name: 'Transfer Mandiri' },
                  { id: 'qris', name: 'QRIS Instan' },
                  { id: 'cod', name: 'COD / Bayar di Tempat' }
                ].map((pay) => (
                  <button
                    key={pay.id}
                    type="button"
                    onClick={() => setCustomer({ ...customer, paymentMethod: pay.id as CustomerInfo['paymentMethod'] })}
                    className={`p-2.5 rounded-lg border text-xs font-medium transition-all text-center cursor-pointer ${
                      customer.paymentMethod === pay.id
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
                    }`}
                  >
                    {pay.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Catatan Khusus */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Catatan Tambahan untuk Admin (Opsional)</label>
              <input
                type="text"
                value={customer.notes}
                onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                placeholder="Contoh: Kirim sebelum sore ya, atau mohon rasa vanilla bean"
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </form>

          {/* Quick Order Summary */}
          <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-xs space-y-2">
            <div className="font-bold text-stone-900 flex items-center justify-between">
              <span>Ringkasan {items.length} Suplemen:</span>
              <span className="text-emerald-800 font-extrabold tabular-nums">
                {formatRupiah(Math.max(0, totalPromo - (appliedVoucher?.discountAmount || 0) + shippingFee))}
              </span>
            </div>
            <ul className="text-stone-600 divide-y divide-stone-200/60 max-h-32 overflow-y-auto">
              {items.map((it) => (
                <li key={it.product.id} className="py-1 flex justify-between">
                  <span className="truncate pr-2">{it.quantity}x {it.product.name}</span>
                  <span className="tabular-nums font-medium shrink-0">
                    {formatRupiah(it.product.price * it.quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Pesan aman & privasi terlindungi</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Kembali
            </button>
            <button
              type="submit"
              form="checkout-form"
              className="w-1/2 sm:w-auto px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Buka WhatsApp Sekarang</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

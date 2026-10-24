import { CartItem, CustomerInfo, StoreConfig, Voucher, Product } from '../types.ts';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function buildDirectWhatsAppProductUrl(
  product: Product,
  quantity: number = 1,
  storeConfig: StoreConfig
): string {
  const cleanPhone = storeConfig.whatsappNumber.replace(/\D/g, '');
  const subtotalNormal = product.originalPrice * quantity;
  const subtotalPromo = product.price * quantity;
  const hemat = subtotalNormal - subtotalPromo;

  const text = `Halo Admin *${storeConfig.storeName}*,

Saya ingin memesan suplemen berikut secara langsung:

📦 *PRODUK:* ${product.name}
🔢 *Jumlah:* ${quantity} pcs
💰 *Harga Promo:* ${formatRupiah(product.price)} / pcs (Hemat ${product.discountPercent}%)
🏷️ *Harga Normal:* ~${formatRupiah(product.originalPrice)}~
💵 *Subtotal:* ${formatRupiah(subtotalPromo)} (Hemat ${formatRupiah(hemat)})

Mohon info stok dan total ongkos kirim ke alamat saya. Terima kasih! 🙏`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppOrderUrl(
  items: CartItem[],
  customer: CustomerInfo,
  storeConfig: StoreConfig,
  voucher: Voucher | null = null,
  shippingFee: number = 0
): string {
  const cleanPhone = storeConfig.whatsappNumber.replace(/\D/g, '');
  
  const totalNormalPrice = items.reduce(
    (acc, item) => acc + item.product.originalPrice * item.quantity,
    0
  );
  const totalPromoPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const totalProductDiscount = totalNormalPrice - totalPromoPrice;

  let voucherDiscount = 0;
  if (voucher) {
    if (voucher.discountAmount) {
      voucherDiscount = voucher.discountAmount;
    } else if (voucher.discountRate) {
      voucherDiscount = Math.round(totalPromoPrice * voucher.discountRate);
    }
  }

  const finalTotal = Math.max(0, totalPromoPrice - voucherDiscount + shippingFee);
  const totalHematSemua = totalProductDiscount + voucherDiscount;

  const orderId = `NV-${Date.now().toString().slice(-6)}`;

  let itemsListText = '';
  items.forEach((item, index) => {
    const normalSub = item.product.originalPrice * item.quantity;
    const promoSub = item.product.price * item.quantity;
    const itemHemat = normalSub - promoSub;

    itemsListText += `${index + 1}. *${item.product.name}*\n`;
    itemsListText += `   • Jumlah: ${item.quantity} pcs\n`;
    itemsListText += `   • Harga Promo: ${formatRupiah(item.product.price)} (Diskon ${item.product.discountPercent}%)\n`;
    itemsListText += `   • Subtotal: ${formatRupiah(promoSub)} _(Hemat ${formatRupiah(itemHemat)})_\n\n`;
  });

  const paymentLabels: Record<string, string> = {
    transfer_bca: 'Transfer Bank BCA',
    transfer_mandiri: 'Transfer Bank Mandiri',
    qris: 'QRIS (Gopay/OVO/ShopeePay/Dana)',
    cod: 'COD (Bayar di Tempat saat barang tiba)'
  };

  const message = `Halo *${storeConfig.storeName}*, saya ingin melakukan pemesanan suplemen dengan rincian berikut:

🛒 *NO. PESANAN: #${orderId}*
━━━━━━━━━━━━━━━━━━━━

📋 *DAFTAR PRODUK YANG DIPESAN:*
${itemsListText.trim()}

━━━━━━━━━━━━━━━━━━━━
📊 *RINGKASAN BIAYA & DISKON:*
• Subtotal Harga Normal: ~${formatRupiah(totalNormalPrice)}~
• Potongan Diskon Produk: -${formatRupiah(totalProductDiscount)}
${voucher ? `• Kupon Voucher (${voucher.code}): -${formatRupiah(voucherDiscount)}\n` : ''}• Ongkos Kirim: ${shippingFee === 0 ? 'GRATIS (Promo)' : formatRupiah(shippingFee)}
🎉 *TOTAL PENGHEMATAN:* ${formatRupiah(totalHematSemua)}

💰 *TOTAL AKHIR PEMBAYARAN: ${formatRupiah(finalTotal)}*
━━━━━━━━━━━━━━━━━━━━

👤 *DATA PENERIMA:*
• *Nama Lengkap:* ${customer.fullName}
• *Nomor WhatsApp:* ${customer.whatsapp}
• *Alamat Pengiriman:* ${customer.address}
• *Kota / Kecamatan:* ${customer.city}${customer.postalCode ? ` (${customer.postalCode})` : ''}
• *Metode Pembayaran:* ${paymentLabels[customer.paymentMethod] || customer.paymentMethod}
${customer.notes ? `• *Catatan Tambahan:* ${customer.notes}\n` : ''}
Mohon konfirmasi ketersediaan stok dan rekening pembayaran. Terima kasih banyak!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

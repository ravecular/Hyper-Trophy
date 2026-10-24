# Panduan Operasional & Penggunaan — Hyper Trophy

## 1. Menjalankan Aplikasi Secara Lokal
Aplikasi menggunakan Vite dan React. Jalankan perintah berikut:

```bash
# 1. Pastikan dependensi terpasang
npm install

# 2. Jalankan server pengembangan
npm run dev
```
Buka browser di `http://localhost:3000`.

---

## 2. Pengelolaan Katalog & Diskon
Untuk menambah, mengubah harga, atau menyesuaikan diskon produk:
- Buka berkas `/src/data/products.ts`.
- Setiap objek dalam array `PRODUCTS` memiliki atribut:
  - `originalPrice`: Harga normal produk.
  - `price`: Harga promo setelah diskon.
  - `discountPercent`: Persentase diskon yang ditampilkan pada badge.
  - `bpom`: Nomor izin edar resmi BPOM RI.

---

## 3. Pengaturan Nomor WhatsApp Toko
Nomor WhatsApp toko telah disetel ke **+6281319337833**.
- Pengaturan default terdapat di `/src/data/products.ts`:
  ```typescript
  export const STORE_CONFIG: StoreConfig = {
    storeName: 'Hyper Trophy',
    whatsappNumber: '6281319337833',
    ...
  };
  ```
- Pelanggan atau pengelola toko juga dapat menguji nomor lain secara langsung melalui opsi *"Ubah Nomor Toko"* di dalam modal Checkout WhatsApp.

---

## 4. Pengelolaan Kode Voucher Diskon
Voucher promosi dapat ditambah atau diubah di array `AVAILABLE_VOUCHERS` dalam berkas `/src/data/products.ts`:
```typescript
{
  code: 'EVOHEMAT',
  label: 'Potongan Rp 15.000 (Min. Belanja Rp 200rb)',
  discountAmount: 15000,
  minSpend: 200000
}
```

---

## 5. Build dan Deployment
Untuk melakukan kompilasi paket produksi web:
```bash
npm run build
```
Hasil build akan tersimpan di direktori `dist/` siap untuk dideploy ke hosting statis modern seperti Vercel, Netlify, atau Cloudflare Pages.

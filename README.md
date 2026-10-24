# Hyper Trophy — Toko Suplemen Fitness & Evolene Resmi

Website e-commerce modern penjualan produk suplemen kebugaran dan nutrisi resmi **Evolene** di Indonesia (*Evowhey, Evomass, Crevolene, Prevo, Evogold, Evoboost, Evobcaa, Evogreen*). Dilengkapi dengan kalkulasi diskon otomatis pada setiap produk, sistem voucher promo, dan integrasi pemesanan langsung melalui WhatsApp.

---

## 🌟 Fitur Utama

1. **Katalog Produk Suplemen Evolene Lengkap:**
   - Evowhey Protein (25g Protein, 5.2g BCAA, Rendah Lemak)
   - Evomass High Calorie Mass Gainer (52g Protein, 950 Kalori)
   - Crevolene Micronized Creatine 100% (5g Kreatin Murni per sajian)
   - Evolene Prevo Pre-Workout (Beta-Alanine, Citrulline, Kafein)
   - Evogold Isolate Gold Series (Zero Fat, Zero Sugar, Labdoor Top Rank)
   - Evoboost Testosterone Booster (Herbal Alami Pasak Bumi, Purwoceng, Tribulus)
   - Evobcaa Amino Recovery (Rasio 2:1:1 L-Leucine, L-Isoleucine, L-Valine)
   - Evogreen Plant-Based Protein (100% Vegan Pea & Soy Isolate)

2. **Diskon Spesial Pada Setiap Produk:**
   - Potongan harga langsung 20% s/d 25% di setiap produk tanpa syarat minimum.
   - Penampilan harga normal (dicoret) dan harga promo serta estimasi nominal penghematan.
   - Sistem kupon voucher tambahan (`EVOHEMAT`, `EVOBULK`, `EVOSULTAN`) dengan fitur satu-klik salin dan pasang.
   - Pelacak progres otomatis belanja menuju Gratis Ongkir.

3. **Pemesanan Cepat via WhatsApp (+6281319337833):**
   - **Beli Cepat via WA:** Tombol langsung pada setiap kartu produk.
   - **Checkout Keranjang:** Mengisi formulir nama, nomor WhatsApp, alamat lengkap, kota/kabupaten, dan metode pembayaran (BCA, Mandiri, QRIS, COD).
   - **Pesan Otomatis:** Pesan WhatsApp terformat rapi dengan rincian nomor pesanan, daftar barang, jumlah, subtotal, potongan diskon, voucher, dan total akhir pembayaran.

4. **Transparansi & Legalitas:**
   - Informasi nomor izin edar BPOM RI aktif di setiap suplemen.
   - Sertifikasi kemurnian internasional Labdoor USA & Halal MUI.
   - Panduan cara pemakaian resmi (*serving facts*) dan daftar manfaat.

---

## 🚀 Menjalankan Proyek

### Prasyarat
- Node.js (v18+)
- npm atau bun

### Instalasi & Menjalankan Dev Server
```bash
npm install
npm run dev
```
Buka browser pada `http://localhost:3000`.

### Build untuk Produksi
```bash
npm run build
```

---

## 📁 Struktur Berkas

```text
├── index.html                           # Entry HTML & Meta Tags
├── package.json                         # Dependensi dan skrip proyek
├── metadata.json                        # Metadata konfigurasi AI Studio
├── vite.config.ts                       # Konfigurasi bundler Vite
├── tsconfig.json                        # Konfigurasi TypeScript
├── src/
│   ├── main.tsx                         # Entry React
│   ├── App.tsx                          # Komponen utama aplikasi
│   ├── index.css                        # Styling Tailwind CSS
│   ├── types.ts                         # Tipe TypeScript (Product, Cart, Checkout, Voucher)
│   ├── data/
│   │   └── products.ts                  # Data katalog produk Evolene & voucher
│   ├── utils/
│   │   └── formatters.ts                # Format rupiah & generator pesan WhatsApp
│   ├── components/
│   │   ├── Header.tsx                   # Top navigation bar
│   │   ├── Hero.tsx                     # Hero banner & value propositions
│   │   ├── PromoBanner.tsx              # Banner voucher diskon interaktif
│   │   ├── ProductCard.tsx              # Kartu produk dengan diskon & tombol WA
│   │   ├── ProductDetailModal.tsx       # Modal detail nutrisi, BPOM & pemesanan
│   │   ├── CartDrawer.tsx               # Drawer keranjang belanja & kalkulator diskon
│   │   ├── WhatsAppCheckoutModal.tsx    # Formulir pemesanan & generator chat WhatsApp
│   │   ├── FloatingWhatsApp.tsx         # Tombol floating konsultasi cepat WhatsApp
│   │   └── Footer.tsx                   # Footer & informasi legalitas
│   └── assets/
│       └── images/                      # Foto studio kemasan suplemen Evolene
├── prd.md                               # Dokumen Kebutuhan Produk (PRD)
├── arsitektur.md                        # Desain Arsitektur Sistem
├── tech_stack.md                        # Spesifikasi Teknologi yang Digunakan
├── ui.ux.md                             # Panduan Desain & Antarmuka UI/UX
├── instruction.md                       # Petunjuk Operasional & Penggunaan
└── verification.md                      # Catatan Verifikasi & Pengujian
```

---

## 📞 Kontak Toko
- **Nama Toko:** Hyper Trophy
- **WhatsApp Resmi:** [+6281319337833](https://wa.me/6281319337833)
- **Jam Layanan:** Setiap Hari (08.00 - 21.00 WIB)

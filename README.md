# Hyper Trophy — Toko Suplemen Fitness & Evolene Resmi

Website e-commerce modern penjualan suplemen diet, snack protein, kesehatan, dan gym gear resmi **Evolene** di Indonesia (*Evobar, Evoslim, Evodrain, Evoshield, Evoglow, Shaker Pro, dan Lifting Gear*). Dilengkapi dengan kalkulasi diskon otomatis pada setiap produk, sistem voucher promo, dan integrasi pemesanan langsung melalui WhatsApp.

---

## 🌟 Fitur Utama

1. **Katalog Suplemen & Gear Evolene Lengkap (20 Produk):**
   - **Nutrisi Pembangun Otot (Muscle Building):**
     - Evolene Evowhey 100% Protein Matrix (25g Protein, 5.2g BCAA, Teruji Labdoor USA)
     - Evolene Evomass Hardgainer Mass Gainer (52g Protein, 950 Kalori, Bulking Cepat)
     - Crevolene 100% Micronized Creatine (5g Kreatin 200 Mesh, Pemicu ATP & Tenaga)
     - Evolene Prevo High-Energy Pre-Workout (Beta-Alanine, Citrulline, Nitric Oxide Pump)
     - Evolene Hydrolyzed Whey Isolate Gold Series (28g Peptida Mikro Serap 15 Menit)
     - Evolene Micellar Casein Nighttime Recovery (24g Protein Pelepasan Lambat 8 Jam)
     - Evolene Pure Micronized L-Glutamine Powder (5000mg Glutamin, Pemulihan Serat Otot)
     - Evolene EAA Essential Amino Acids Matrix (9 Asam Amino Lengkap + Elektrolit Kelapa)
     - Evolene HMB Pure Muscle Builder 1000mg (Anti-Katabolik Pelindung Otot Terkuat)
     - Evolene ZMA Anabolic Night Recovery (Zinc Monomethionine, Magnesium & B6)
   - **Snack, Diet, Kesehatan & Gym Gear:**
     - Evolene Evobar High Protein Bar (16g Protein, Rendah Gula, Cokelat Renyah)
     - Evolene Evoslim Meal Replacement Shake (21g Protein, Kaya Serat, Defisit Kalori)
     - Evolene Evodrain Thermogenic Fat Burner (L-Carnitine, Green Tea, Cayenne)
     - Evolene Evoshield Daily Multivitamin & Zinc (26 Vitamin & Mineral Atlet)
     - Evolene Evoglow Marine Collagen + Glutathione (Regenerasi Sendi & Kulit)
     - Evolene Pro Stainless Steel Shaker 750ml (Anti Bau, Food Grade 304)
     - Evolene Neoprene Padded Heavy Duty Lifting Straps (Support Deadlift 350kg)
     - Evolene Pro Genuine Leather Weightlifting Belt 10mm (Powerlifting Standard)
     - Evolene Elastic Heavy Duty Wrist Wraps 18" (Stabilitas Bench Press)
     - Evolene "Transformasi Nyata" Gym Oversized Tee (Katun Combed 24s Breathable)

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

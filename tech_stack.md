# Spesifikasi Teknologi — Hyper Trophy

## 1. Daftar Stack Utama

| Lapisan | Teknologi | Versi | Alasan Pemilihan |
| :--- | :--- | :--- | :--- |
| **Framework UI** | React | ^19.0.1 | Komponen deklaratif, reaktivitas tinggi, ekosistem solid |
| **Bahasa** | TypeScript | ^7.0.2 | Keamanan tipe data, meminimalkan bug perhitungan uang & kuantitas |
| **Styling & CSS** | Tailwind CSS | ^4.3.3 | Utilitas modern, performa tinggi, desain responsif instan |
| **Bundler & Dev Server**| Vite | ^8.3.0 | Kompilasi ultra-cepat, Hot Module Replacement (HMR) mulus |
| **Icon Pack** | Lucide React | ^0.546.0 | Koleksi ikon semantik, ringan, konsisten secara visual |
| **Penyimpanan Lokal** | Browser localStorage | Native HTML5 | Menyimpan keranjang belanja & konfigurasi tanpa butuh login server |
| **Integrasi Chat** | WhatsApp Direct Link (`wa.me`) | Standar Web | Pembentukan pesan instan tanpa ketergantungan API pihak ketiga berbayar |

---

## 2. Standar Kode & Format
- **Format Rupiah:** `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })`
- **Tipografi:** Google Font *Plus Jakarta Sans* untuk tampilan modern yang ramah dan berwibawa.
- **Warna Identitas:**
  - Latar Netral: `bg-stone-50`, `bg-white`, `text-stone-900`
  - Aksen Energi & Brand: `bg-red-600` (Evolene signature red)
  - Aksen WhatsApp & Kesehatan: `bg-emerald-600` / `bg-emerald-700`
- **Keamanan Input:** Penggunaan encodeURIComponent pada penyusunan parameter URL dan validasi sanitasi teks.

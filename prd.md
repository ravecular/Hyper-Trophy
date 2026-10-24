# Product Requirement Document (PRD) — Hyper Trophy

**Status:** Rilis Versi 1.0 (Produk Resmi Evolene, Diskon Spesial, Integrasi WhatsApp).

---

## 1. Visi Produk
Menghadirkan toko e-commerce suplemen kebugaran dan nutrisi resmi Indonesia yang memudahkan atlet, binaragawan, dan masyarakat umum dalam memilih dan membeli produk suplemen teruji Labdoor dan BPOM (**Evolene**) dengan harga hemat (diskon di setiap produk) serta kemudahan transaksi instan melalui WhatsApp.

---

## 2. Masalah yang Dipecahkan
1. **Keraguan Keaslian Produk:** Maraknya suplemen palsu tanpa izin BPOM yang membahayakan kesehatan. Hyper Trophy hanya menyajikan produk resmi dengan nomor BPOM tertera dan sertifikat Labdoor USA.
2. **Harga Mahal & Diskon Rumit:** Calon pembeli sering kali kesulitan mendapatkan potongan harga tanpa harus mengklaim syarat yang rumit. Hyper Trophy memberikan diskon langsung 20% - 25% di setiap item.
3. **Pemesanan yang Berbelit-belit:** Banyak calon pembeli enggan mendaftar akun di marketplace/website tradisional. Integrasi WhatsApp memungkinkan pemesanan dalam beberapa ketukan jari tanpa perlu registrasi akun.
4. **Kebutuhan Konsultasi Dosis:** Pembeli membutuhkan saran pemilihan produk (misal: beda Evowhey vs Evomass) sebelum membeli. Saluran WhatsApp admin langsung siap melayani tanya jawab.

---

## 3. Ruang Lingkup Fitur (Scope)

### A. Katalog & Navigasi Produk
- 8 produk unggulan Evolene: *Evowhey, Evomass, Crevolene, Prevo, Evogold Isolate, Evoboost, Evobcaa, Evogreen*.
- Kategori filter: *Whey Protein, Mass Gainer, Creatine & Power, Pre-Workout & Energy, Recovery & Stamina*.
- Pencarian instan berdasarkan nama produk, manfaat, dan deskripsi.
- Informasi lengkap nomor BPOM RI, sajian (*servings*), takaran pakai, dan manfaat utama.

### B. Mekanisme Diskon & Voucher
- Diskon bawaan langsung (*direct price cut*) pada setiap produk sebesar 20%–25%.
- Penampilan harga coret (harga normal) dan harga promo aktif.
- Perhitungan nominal penghematan pelanggan.
- Fitur kupon voucher ekstra (`EVOHEMAT`, `EVOBULK`, `EVOSULTAN`) dengan validasi minimal belanja.
- Pelacak progres bebas ongkos kirim (minimal belanja Rp 350.000).

### C. Alur Pemesanan WhatsApp
- **Beli Cepat via WA:** Tombol pada setiap kartu produk untuk menanyakan/memesan produk satuan secara instan.
- **Keranjang Belanja:** Menyimpan daftar pesanan di browser (`localStorage`), mengatur kuantitas, dan menghapus item.
- **Formulir Checkout:**
  - Nama Penerima (wajib)
  - Nomor WhatsApp Pelanggan (wajib)
  - Alamat Lengkap Pengiriman (wajib)
  - Kota / Kecamatan (wajib)
  - Pilihan Metode Pembayaran: Transfer BCA, Transfer Mandiri, QRIS, atau COD.
  - Catatan Tambahan.
- **Format Pesan WhatsApp Otomatis:**
  - ID Pemesanan otomatis.
  - Rincian item beserta kuantitas, harga promo, dan hemat.
  - Rincian subtotal, potongan diskon produk, diskon kupon, dan ongkos kirim.
  - Data penerima lengkap.
  - Tautan langsung ke nomor WhatsApp toko `+6281319337833`.

---

## 4. Aturan Bisnis (Business Rules)
1. Seluruh transaksi mata uang menggunakan Rupiah (IDR) dalam format standar Indonesia.
2. WhatsApp toko utama adalah `+6281319337833` (format internasional `6281319337833`).
3. Seluruh pesanan dikonfirmasi oleh admin toko mengenai ketersediaan stok rasa dan ongkos kirim.
4. Tidak ada batasan minimal order untuk mendapatkan diskon langsung produk.

---

## 5. Kriteria Penerimaan (Acceptance Criteria)
- [x] Setiap produk menampilkan potongan diskon harga normal vs promo.
- [x] Tombol "Beli via WA" dan checkout keranjang mengarahkan pengguna ke `wa.me/6281319337833`.
- [x] Keranjang tersimpan di memori browser pengguna saat halaman dimuat ulang.
- [x] Tampilan 100% responsif di layar ponsel (360px), tablet (768px), dan desktop (1280px+).
- [x] Seluruh input formulir tervalidasi sebelum tautan WhatsApp dibuka.

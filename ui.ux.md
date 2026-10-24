# Panduan Desain & UI/UX — Hyper Trophy

## 1. Konsep & Arah Visual
Tema antarmuka dirancang khusus untuk platform **Sports Nutrition & Supplement E-Commerce**:
- **Kuat, Bertenaga, & Terpercaya:** Mengadopsi palet warna merah atletik (`#DC2626`), hitam arang gelap (`#0C0A09`), serta hijau emerald kepercayaan kesehatan (`#047857`).
- **Disiplin Anti-Slop:** Tidak menggunakan elemen dekoratif berlebihan atau badge palsu. Informasi disajikan secara presisi dengan angka tabular (*tabular-nums*).
- **Hirarki Tipografi Jelas:** Judul tebal (*font-black*) untuk kesan maskulin dan atletik, dipadukan teks isi yang bersih dan nyaman dibaca.

---

## 2. Token Visual
- **Kanvas Utama:** `#F5F5F4` (Stone-50)
- **Permukaan Kartu:** `#FFFFFF` (White) dengan border halus `#E7E5E4` (Stone-200)
- **Teks Utama:** `#1C1917` (Stone-900)
- **Teks Sekunder:** `#78716C` (Stone-500)
- **Aksen Primer:** `#DC2626` (Red-600) untuk diskon, tombol aksi, dan identitas Evolene
- **Aksen Sekunder:** `#047857` (Emerald-700) untuk konfirmasi BPOM, sertifikasi Halal, dan tombol WhatsApp
- **Radius Sudut:** 16px (kartu & modal), 10px-12px (tombol & input formulir)

---

## 3. Komponen Utama
1. **Top Bar Header:**
   - Wordmark brand: `HYPER TROPHY`
   - Navigasi satu baris: *Katalog Evolene*, *Promo Diskon*, *Labdoor & BPOM*, *Konsultasi WA*
   - Tombol keranjang dengan badge jumlah barang dan penghematan langsung.
2. **Kartu Produk:**
   - 65%-70% area diisi foto studio kemasan produk.
   - Badge diskon mencolok (`HEMAT 25%`).
   - Tampilan perbandingan harga normal dicoret dan harga promo.
   - Tombol ganda: Tambah ke Keranjang & Beli Langsung via WA.
3. **Drawer Keranjang & Pelacak Ongkir:**
   - Menghitung total harga normal, potongan diskon, dan diskon kupon.
   - Bar progres dinamis yang menunjukkan sisa nominal belanja untuk mendapatkan Gratis Ongkir.
4. **Modal Checkout WhatsApp:**
   - Desain terstruktur dan ramah jempol (*mobile-friendly*).
   - Validasi formulir interaktif jika ada kolom penting yang terlewat.

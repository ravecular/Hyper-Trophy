import { Product, Voucher, StoreConfig } from '../types.ts';

export const STORE_CONFIG: StoreConfig = {
  storeName: 'Hyper Trophy',
  whatsappNumber: '6281319337833',
  freeShippingThreshold: 350000,
  standardShippingFee: 20000,
  tagline: 'Distributor Resmi Suplemen Evolene Indonesia - Teruji Labdoor, BPOM & Halal'
};

export const AVAILABLE_VOUCHERS: Voucher[] = [
  {
    code: 'EVOHEMAT',
    label: 'Potongan Rp 15.000 (Min. Belanja Rp 200rb)',
    discountAmount: 15000,
    minSpend: 200000
  },
  {
    code: 'EVOBULK',
    label: 'Ekstra Diskon 5% (Min. Belanja Rp 400rb)',
    discountRate: 0.05,
    minSpend: 400000
  },
  {
    code: 'EVOSULTAN',
    label: 'Diskon Spesial Rp 30.000 (Min. Belanja Rp 600rb)',
    discountAmount: 30000,
    minSpend: 600000
  }
];

export const CATEGORIES = [
  'Semua',
  'Whey Protein',
  'Mass Gainer',
  'Creatine & Power',
  'Pre-Workout & Energy',
  'Recovery & Stamina'
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'evolene-evowhey',
    name: 'Evolene Evowhey Protein',
    subtitle: '25g Protein per Serving + 5.2g BCAA untuk Pembentukan Otot Bebas Lemak',
    category: 'Whey Protein',
    originalPrice: 380000,
    price: 304000,
    discountPercent: 20,
    image: '/src/assets/images/evolene_evowhey_protein_1792846433673.jpg',
    rating: 4.9,
    reviewsCount: 428,
    serving: 'Pouch 20 Sachet / 50 Sachet',
    benefits: [
      '25 Gram Protein berkualitas tinggi per sachet',
      'Mengandung 5.2g BCAA alami untuk pemulihan dan anti-katabolik',
      'Rendah lemak (<1.5g) dan rendah kalori (hanya 140 kkal)',
      'Tersertifikasi Labdoor USA peringkat kemurnian dunia',
      'Pilihan rasa favorit: Cokelat, Cokelat Hazelnut, Vanilla, Strawberry'
    ],
    description: 'Evolene Evowhey adalah suplemen whey protein lokal nomor satu di Indonesia yang lolos uji kemurnian Labdoor USA. Diformulasikan khusus untuk postur tubuh masyarakat Indonesia guna mencukupi kebutuhan protein harian, membentuk otot kencang tanpa timbunan lemak, dan mempercepat regenerasi sel otot setelah latihan gym.',
    usage: 'Larutkan 1 sachet Evowhey ke dalam 200-250 ml air dingin atau air biasa (jangan air panas). Minum segera setelah latihan fitness atau saat sarapan.',
    bpom: 'BPOM RI MD 862331046307 | Halal MUI Terdaftar',
    inStock: true,
    isBestSeller: true,
    isFlashSale: true
  },
  {
    id: 'evolene-evomass',
    name: 'Evolene Evomass Mass Gainer',
    subtitle: '52g Protein & 950 Kalori Tinggi Nutrisi untuk Bulking Cepat & Badan Berisi',
    category: 'Mass Gainer',
    originalPrice: 450000,
    price: 337500,
    discountPercent: 25,
    image: '/src/assets/images/evolene_evomass_gainer_1792846433809.jpg',
    rating: 4.9,
    reviewsCount: 512,
    serving: 'Tub 2 Lbs (909g) / Pouch 10 Lbs',
    benefits: [
      '52 Gram Protein tinggi per sajian harian',
      '950 Kalori padat nutrisi dari karbohidrat kompleks pilihan',
      'Diperkaya 11g BCAA dan 5.4g Glutamine untuk pembesaran otot',
      'Membantu menaikkan berat badan secara proporsional dan padat',
      'Rasa cokelat nikmat tidak bikin enek atau begah'
    ],
    description: 'Evolene Evomass diformulasikan spesifik bagi Anda bertubuh kurus (hardgainer) yang ingin menaikkan berat badan dan membentuk massa otot berisi secara sehat. Bebas dari gula berlebih dan lemak jenuh jahat, sehingga kenaikan bobot tubuh lebih padat otot bukan gelambir lemak perut.',
    usage: 'Campurkan 3-4 scoop Evomass secara bertahap ke dalam 400-500ml air dingin. Dapat diminum 2 kali sehari: di antara jam makan dan setelah berolahraga.',
    bpom: 'BPOM RI MD 862331034307 | Halal MUI Resmi',
    inStock: true,
    isBestSeller: true,
    isFlashSale: true
  },
  {
    id: 'evolene-crevolene',
    name: 'Crevolene Micronized Creatine 100%',
    subtitle: 'Meningkatkan Kekuatan Angkatan, Volume Sel Otot & ATP Latihan',
    category: 'Creatine & Power',
    originalPrice: 280000,
    price: 210000,
    discountPercent: 25,
    image: '/src/assets/images/evolene_crevolene_creatine_1792846433913.jpg',
    rating: 4.9,
    reviewsCount: 389,
    serving: 'Tub 300 gram / 60 Servings',
    benefits: [
      '100% Pure Creatine Monohydrate micronized partikel ultra halus',
      'Meningkatkan cadangan fosfokreatin ATP untuk tenaga ledak maksimal',
      'Menambah ketahanan otot sehingga mampu menambah beban repetisi',
      'Mendorong hidrasi intraseluler otot (volumizing otot lebih padat)',
      'Tanpa rasa (Unflavored) & Rasa Anggur Segar'
    ],
    description: 'Crevolene dari Evolene menggunakan kreatin monohidrat micronized dengan tingkat kelarutan sangat cepat tanpa residu berpasir di mulut. Berfungsi menambah daya tahan dan tenaga saat mengangkat beban maksimal, sekaligus merangsang sintesis protein pembangun massa otot.',
    usage: 'Campurkan 1 scoop (5g) Crevolene ke dalam air dingin, jus buah, atau shake Evowhey Anda. Konsumsi rutin setiap hari (pada waktu sebelum atau sesudah latihan).',
    bpom: 'BPOM RI MD 862331057307 | Halal MUI',
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'evolene-prevo',
    name: 'Evolene Prevo Pre-Workout',
    subtitle: 'Suplemen Pre-Workout Pertama di Indonesia Bersertifikat BPOM & Halal',
    category: 'Pre-Workout & Energy',
    originalPrice: 295000,
    price: 221250,
    discountPercent: 25,
    image: '/src/assets/images/evolene_prevo_preworkout_1792846435137.jpg',
    rating: 4.8,
    reviewsCount: 340,
    serving: 'Tub 400g / 30 Servings (Rasa Green Apple)',
    benefits: [
      'Kombinasi Beta-Alanine, L-Citrulline Malate & Kafein alami',
      'Memberikan ledakan energi dan fokus tajam tanpa rasa gelisah crash',
      'Memperlebar vaskularisasi darah untuk pompa otot (muscle pump) ekstrem',
      'Membantu menunda timbulnya asam laktat penyebab lelah otot',
      'Rasa Green Apple Splash yang sangat segar dan membangkitkan semangat'
    ],
    description: 'Prevo adalah pelopor pre-workout legal terdaftar BPOM di Indonesia yang dirancang aman bagi lambung dan jantung jika dikonsumsi sesuai dosis. Memberikan dorongan fokus dan tenaga intens agar sesi latihan Anda berjalan dengan intensitas tertinggi.',
    usage: 'Larutkan 1 scoop (10-13g) Prevo dengan 200ml air dingin. Minum 15-30 menit sebelum memulai sesi latihan berat. Hindari konsumsi mendekati jam tidur.',
    bpom: 'BPOM RI MD 867031005307 | Halal Indonesia',
    inStock: true,
    isFlashSale: true
  },
  {
    id: 'evolene-evogold',
    name: 'Evolene Evogold Isolate Gold Series',
    subtitle: 'Isolate 100% Tanpa Gula & Lemak — Peringkat Top Labdoor Dunia',
    category: 'Whey Protein',
    originalPrice: 490000,
    price: 392000,
    discountPercent: 20,
    image: '/src/assets/images/evolene_evowhey_protein_1792846433673.jpg',
    rating: 5.0,
    reviewsCount: 195,
    serving: 'Box 20 Sachet @30g / Rasa Cokelat Belgia',
    benefits: [
      '27 Gram Protein Isolate murni dengan bioavailabilitas tertinggi',
      '0 Gram Gula Tambahan, 0 Gram Lemak, bebas laktosa ramah perut',
      'Skor tertinggi Labdoor USA untuk akurasi nutrisi dan kemurnian',
      'Sangat dianjurkan untuk program cutting, lean muscle, dan persiapan tanding'
    ],
    description: 'Evogold Isolate merupakan kasta tertinggi whey protein dari Evolene. Dibuat dengan metode filtrasi mikro ganda sehingga menyisakan protein murni tanpa lemak dan karbohidrat. Cocok bagi atlet dan binaragawan yang menginginkan definisi otot paling tajam.',
    usage: 'Seduh 1 sachet Evogold ke dalam 200ml air dingin. Konsumsi 1-2 sachet sehari segera setelah latihan atau saat perut kosong di pagi hari.',
    bpom: 'BPOM RI MD 862331048307 | Halal MUI',
    inStock: true
  },
  {
    id: 'evolene-evoboost',
    name: 'Evolene Evoboost Testosterone Booster',
    subtitle: 'Ekstrak Herbal Alami Tribulus, Pasak Bumi & Purwoceng untuk Vitalitas Pria',
    category: 'Recovery & Stamina',
    originalPrice: 320000,
    price: 240000,
    discountPercent: 25,
    image: '/src/assets/images/evolene_evomass_gainer_1792846433809.jpg',
    rating: 4.8,
    reviewsCount: 215,
    serving: 'Botol 60 Kapsul / 30 Hari',
    benefits: [
      'Kandungan alami: Pasak Bumi (Eurycoma Longifolia), Purwoceng & Tribulus',
      'Membantu meningkatkan hormon testosteron alami pria secara optimal',
      'Meningkatkan performa fisik, stamina latihan dan vitalitas pria perkasa',
      'Mencegah kelelahan kronis dan mempercepat pemulihan energi'
    ],
    description: 'Evoboost diformulasikan dari kombinasi herbal terbaik Indonesia dan zinc bioaktif untuk merangsang produksi hormon testosteron endogen tubuh tanpa bahan kimia sintetis terlarang. Aman dikonsumsi harian dan telah lulus BPOM.',
    usage: 'Konsumsi 2 kapsul setiap hari setelah makan (pagi atau malam hari sebelum tidur).',
    bpom: 'BPOM RI SD 211320491 | Halal MUI',
    inStock: true
  },
  {
    id: 'evolene-evobcaa',
    name: 'Evolene Evobcaa Amino Powder',
    subtitle: 'Rasio BCAA 2:1:1 Teruji Klinis untuk Mencegah Penyusutan Otot',
    category: 'Recovery & Stamina',
    originalPrice: 310000,
    price: 232500,
    discountPercent: 25,
    image: '/src/assets/images/evolene_prevo_preworkout_1792846435137.jpg',
    rating: 4.9,
    reviewsCount: 167,
    serving: 'Tub 300g / 30 Servings (Rasa Jeruk Segar)',
    benefits: [
      'Rasio emas 2:1:1 L-Leucine, L-Isoleucine, dan L-Valine',
      'Mencegah pemecahan massa otot saat defisit kalori atau cardio panjang',
      'Mengurangi rasa pegal linu (DOMS) secara signifikan keesokan harinya',
      'Cepat larut dengan rasa buah menyegarkan tanpa aftertaste pahit'
    ],
    description: 'Evobcaa memasok asam amino esensial rantai cabang langsung ke jaringan otot yang bekerja. Memastikan tubuh Anda tetap dalam kondisi anabolik meskipun sedang menjalani program cutting atau latihan berintensitas tinggi.',
    usage: 'Campurkan 1 scoop (10g) ke dalam 300-400ml air dingin. Minum selama sesi latihan (intra-workout) atau sesudah latihan.',
    bpom: 'BPOM RI MD 867031007307 | Halal MUI',
    inStock: true
  },
  {
    id: 'evolene-evogreen',
    name: 'Evolene Evogreen Plant-Based Protein',
    subtitle: '100% Protein Nabati Pea & Soy Isolate Bebas Laktosa & Gluten',
    category: 'Whey Protein',
    originalPrice: 360000,
    price: 270000,
    discountPercent: 25,
    image: '/src/assets/images/evolene_crevolene_creatine_1792846433913.jpg',
    rating: 4.8,
    reviewsCount: 144,
    serving: 'Pouch 500g / 15 Servings (Rasa Cokelat Hazelnut)',
    benefits: [
      '21g Protein nabati murni bersumber dari kacang polong dan kedelai non-GMO',
      '100% Vegan friendly, bebas laktosa, aman bagi yang intoleransi susu sapi',
      'Tekstur halus tidak berpasir dengan rasa cokelat hazelnut lembut',
      'Kaya serat pangan alami yang menyehatkan pencernaan'
    ],
    description: 'Evogreen adalah alternatif protein nabati terbaik dari Evolene untuk vegetarian atau mereka yang memiliki intoleransi laktosa. Memberikan profil asam amino lengkap untuk regenerasi otot tanpa risiko perut kembung atau timbul jerawat.',
    usage: 'Larutkan 1 scoop ke dalam 250ml air dingin atau susu nabati (oat milk / almond milk). Minum setiap hari setelah olahraga.',
    bpom: 'BPOM RI MD 862331061307 | Halal Indonesia',
    inStock: true
  }
];

export const STORE_FEATURES = [
  {
    title: '100% Produk Evolene Original & BPOM',
    description: 'Garansi resmi suplemen asli dari distributor resmi Evolene Indonesia dengan nomor BPOM aktif.',
    badge: 'Garansi Asli'
  },
  {
    title: 'Diskon Spesial 20% - 25% Tiap Produk',
    description: 'Hemat puluhan ribu rupiah di setiap pembelian tanpa syarat minimum pembelian yang rumit.',
    badge: 'Diskon Langsung'
  },
  {
    title: 'Lolos Sertifikasi Labdoor USA',
    description: 'Suplemen kebanggaan Indonesia dengan pengakuan sertifikat kemurnian taraf internasional.',
    badge: 'Kualitas Teruji'
  },
  {
    title: 'Pesan Cepat via WhatsApp & COD',
    description: 'Konsultasi gratis, konfirmasi instan, serta opsi pembayaran Transfer, QRIS, dan COD se-Indonesia.',
    badge: 'Kirim Cepat'
  }
];

import { Product, Voucher, StoreConfig } from '../types.ts';

export const STORE_CONFIG: StoreConfig = {
  storeName: 'Hyper Trophy',
  whatsappNumber: '6281319337833',
  freeShippingThreshold: 350000,
  standardShippingFee: 20000,
  tagline: 'Distributor Resmi Suplemen & Aksesoris Evolene Indonesia - Teruji Labdoor, BPOM & Halal'
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
    label: 'Ekstra Diskon 5% (Min. Belanja Rp 350rb)',
    discountRate: 0.05,
    minSpend: 350000
  },
  {
    code: 'EVOSULTAN',
    label: 'Diskon Spesial Rp 30.000 (Min. Belanja Rp 500rb)',
    discountAmount: 30000,
    minSpend: 500000
  }
];

export const CATEGORIES = [
  'Semua',
  'Membangun Otot',
  'Whey & Protein',
  'Creatine & Power',
  'Snack & Diet',
  'Fat Burner & Cutting',
  'Kesehatan & Sendi',
  'Aksesoris & Gym Gear'
] as const;

export const PRODUCTS: Product[] = [
  // --- 10 PRODUK SUPLEMEN & NUTRISI MEMBANGUN OTOT ---
  {
    id: 'evolene-evowhey',
    name: 'Evolene Evowhey 100% Protein Matrix',
    subtitle: '25g Protein Isolate & Concentrate + 5.2g BCAA untuk Pertumbuhan Otot Bersih',
    category: 'Whey & Protein',
    originalPrice: 380000,
    price: 285000,
    discountPercent: 25,
    image: '/src/assets/images/evolene_evowhey_protein_1792846433673.jpg',
    rating: 4.9,
    reviewsCount: 512,
    serving: 'Pouch 20 Sachet @32g / 50 Sachet',
    benefits: [
      '25 Gram Protein berkualitas tinggi teruji Labdoor USA',
      'Mengandung 5.2g BCAA untuk memicu sintesis protein otot (MPS)',
      'Rendah lemak (<1.5g) dan kalori terukur (hanya 140 kkal per sachet)',
      'Mudah larut, tidak menggumpal, ramah pencernaan orang Indonesia'
    ],
    description: 'Evolene Evowhey adalah suplemen protein terpopuler di Indonesia yang mengantongi sertifikat kemurnian internasional Labdoor USA. Formula sinergis Whey Isolate dan Concentrate memastikan pasokan asam amino anabolik instan ke sel otot pasca-latihan keras untuk pembentukan massa otot bebas lemak.',
    usage: 'Campurkan 1 sachet Evowhey ke dalam 200-250ml air dingin. Minum segera setelah latihan atau saat sarapan pagi.',
    bpom: 'BPOM RI MD 862331046307 | Halal MUI Terdaftar',
    inStock: true,
    isBestSeller: true,
    isFlashSale: true
  },
  {
    id: 'evolene-evomass',
    name: 'Evolene Evomass Hardgainer Mass Gainer',
    subtitle: '52g Protein & 950 Kalori Bersih untuk Bulking Cepat & Tubuh Padat Berotot',
    category: 'Membangun Otot',
    originalPrice: 450000,
    price: 337500,
    discountPercent: 25,
    image: '/src/assets/images/evolene_evomass_gainer_1792846433809.jpg',
    rating: 4.9,
    reviewsCount: 620,
    serving: 'Tub 2 Lbs (909g) / Pouch 10 Lbs',
    benefits: [
      '52 Gram Protein tinggi per sajian harian lengkap',
      '950 Kalori padat karbohidrat kompleks berkualitas tanpa gula berlebih',
      'Diperkaya 11g BCAA dan Glutamine untuk percepatan pembesaran volume otot',
      'Membantu menaikkan bobot badan secara proporsional dan berisi otot'
    ],
    description: 'Evomass dirancang khusus bagi Anda bertubuh kurus (hardgainer) yang sulit menaikkan berat badan. Menyediakan surplus kalori bersih dan rasio protein-karbohidrat optimal agar pertambahan berat badan berupa serat otot tebal, bukan lemak perut buncit.',
    usage: 'Larutkan 3-4 scoop Evomass ke dalam 400-500ml air dingin. Minum 2 kali sehari: di antara jam makan siang dan setelah berolahraga.',
    bpom: 'BPOM RI MD 862331034307 | Halal MUI Resmi',
    inStock: true,
    isBestSeller: true,
    isFlashSale: true
  },
  {
    id: 'evolene-crevolene',
    name: 'Crevolene 100% Micronized Creatine',
    subtitle: 'Meningkatkan Cadangan ATP, Daya Ledak Angkatan & Volumisasi Sel Otot',
    category: 'Creatine & Power',
    originalPrice: 280000,
    price: 210000,
    discountPercent: 25,
    image: '/src/assets/images/evolene_crevolene_creatine_1792846433913.jpg',
    rating: 5.0,
    reviewsCount: 440,
    serving: 'Tub 300g / 60 Servings (Unflavored)',
    benefits: [
      '100% Pure Creatine Monohydrate micronized partikel 200 mesh ekstra halus',
      'Meningkatkan tenaga angkat beban maksimal hingga 15-20%',
      'Mempercepat resintesis ATP agar kuat menambah repetisi di setiap set',
      'Memicu hidrasi intraseluler otot (muscle cell volumizing) lebih padat keras'
    ],
    description: 'Crevolene menggunakan kreatin micronized dengan daya kelarutan instan tanpa ampas pasir. Berdasarkan ratusan uji klinis, kreatin adalah suplemen terpenting nomor satu untuk mendongkrak kekuatan fisik, massa otot tebal, dan performa hypertrophy angkat beban.',
    usage: 'Campurkan 1 scoop (5g) Crevolene ke dalam air dingin, jus buah, atau shake Evowhey Anda. Konsumsi konsisten setiap hari.',
    bpom: 'BPOM RI MD 862331057307 | Halal MUI',
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'evolene-prevo',
    name: 'Evolene Prevo High-Energy Pre-Workout',
    subtitle: 'Pompa Vaskularisasi Otot Ekstrem, Fokus Tajam & Ledakan Tenaga Tanpa Crash',
    category: 'Creatine & Power',
    originalPrice: 295000,
    price: 221250,
    discountPercent: 25,
    image: '/src/assets/images/evolene_prevo_preworkout_1792846435137.jpg',
    rating: 4.8,
    reviewsCount: 388,
    serving: 'Tub 400g / 30 Servings (Green Apple Splash)',
    benefits: [
      'Dosis klinis Beta-Alanine, L-Citrulline Malate & Kafein alami bioaktif',
      'Memicu pelebaran pembuluh darah (Nitric Oxide) untuk muscle pump maksimal',
      'Menunda penumpukan asam laktat agar otot tidak cepat kelelahan saat repetisi tinggi',
      'Pelopor pre-workout legal berizin BPOM yang aman bagi lambung'
    ],
    description: 'Prevo adalah formula pendorong performa sebelum latihan yang memberikan sensasi fokus tajam dan aliran darah maksimal ke otot yang dilatih. Membantu Anda menembus batas repetisi terberat untuk stimulasi hipertrofi optimal.',
    usage: 'Larutkan 1 scoop Prevo ke dalam 200-250ml air dingin 20-30 menit sebelum memulai sesi latihan angkat beban.',
    bpom: 'BPOM RI MD 867031005307 | Halal Indonesia',
    inStock: true,
    isFlashSale: true
  },
  {
    id: 'evolene-hydro-whey-gold',
    name: 'Evolene Hydrolyzed Whey Isolate Gold Series',
    subtitle: 'Protein Peptida Mikro Ultra-Murni Cepat Serap 15 Menit — 0g Lemak & Gula',
    category: 'Whey & Protein',
    originalPrice: 490000,
    price: 392000,
    discountPercent: 20,
    image: '/src/assets/images/evolene_hydro_whey_isolate_1793851668787.jpg',
    rating: 5.0,
    reviewsCount: 265,
    serving: 'Tub 2.2 kg / 60 Servings (Chocolate Silk)',
    benefits: [
      '28 Gram Protein Hydrolyzed Isolate dengan ikatan peptida terhidrolisis',
      'Penyerapan kilat dalam 15 menit langsung ke aliran darah otot',
      'Zero Sugar, Zero Fat, Zero Lactose — sangat aman bagi lambung sensitif',
      'Dianjurkan khusus untuk atlet binaraga pada fase cutting definisi tajam'
    ],
    description: 'Kasta tertinggi suplemen protein dari Evolene Gold Series. Menggunakan teknologi hidrolisis dingin tercanggih yang memecah rantai protein menjadi peptida mikro siap serap, menghentikan katabolisme otot seketika dan memaksimalkan sintesis jaringan otot baru.',
    usage: 'Larutkan 1 scoop ke dalam 200ml air dingin. Konsumsi segera seusai sesi latihan intensif atau saat perut kosong di pagi hari.',
    bpom: 'BPOM RI MD 862331048307 | Halal MUI',
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'evolene-micellar-casein',
    name: 'Evolene Micellar Casein Nighttime Recovery',
    subtitle: 'Protein Pelepasan Lambat 8 Jam untuk Mencegah Katabolik Otot Sepanjang Malam',
    category: 'Whey & Protein',
    originalPrice: 430000,
    price: 322500,
    discountPercent: 25,
    image: '/src/assets/images/evolene_micellar_casein_1793851666021.jpg',
    rating: 4.9,
    reviewsCount: 210,
    serving: 'Tub 2 kg / 60 Servings (Rich Chocolate)',
    benefits: [
      '24 Gram Protein Kasein Miselar murni per sajian',
      'Membentuk gel alami di lambung untuk pelepasan asam amino bertahap hingga 8 jam',
      'Melindungi serat otot dari penyusutan (anti-katabolik) saat puasa tidur malam',
      'Tekstur pudding kental lezat yang mengenyangkan sebelum tidur'
    ],
    description: 'Ketika tidur 7-8 jam di malam hari, tubuh memasuki fase puasa alami di mana risiko pemecahan otot (katabolisme) meningkat. Micellar Casein Evolene bekerja sebagai suplemen proteksi malam hari, melepaskan aliran asam amino stabil sepanjang malam untuk perbaikan sel otot.',
    usage: 'Campurkan 1 scoop Casein ke dalam 250-300ml air dingin atau susu. Minum 30 menit sebelum tidur malam.',
    bpom: 'BPOM RI MD 862331059307 | Halal MUI',
    inStock: true
  },
  {
    id: 'evolene-pure-glutamine',
    name: 'Evolene Pure Micronized L-Glutamine Powder',
    subtitle: '5000mg L-Glutamine Murni untuk Mempercepat Regenerasi Serat Otot Rusak',
    category: 'Membangun Otot',
    originalPrice: 270000,
    price: 202500,
    discountPercent: 25,
    image: '/src/assets/images/evolene_glutamine_powder_1793851666818.jpg',
    rating: 4.9,
    reviewsCount: 195,
    serving: 'Tub 300g / 60 Servings (Unflavored)',
    benefits: [
      '5000mg L-Glutamine murni farmasi micronized per sajian',
      'Mempercepat pemulihan mikrotrauma robekan serat otot pasca-squat & bench press berat',
      'Meredakan nyeri pegal otot berkepanjangan (Delayed Onset Muscle Soreness - DOMS)',
      'Mendukung kesehatan vili usus dan efisiensi penyerapan nutrisi makanan'
    ],
    description: 'Glutamin adalah asam amino bebas terbanyak di jaringan otot rangka (mencapai 60%). Latihan berat menguras cadangan glutamin hingga 50%. Suplementasi Pure L-Glutamine Evolene memulihkan cadangan tersebut dengan cepat agar Anda siap berlatih keras keesokan harinya.',
    usage: 'Campurkan 1 scoop (5g) ke dalam air dingin, protein shake, atau jus buah segera setelah latihan atau sebelum tidur.',
    bpom: 'BPOM RI MD 867031012307 | Halal MUI',
    inStock: true
  },
  {
    id: 'evolene-eaa-intra',
    name: 'Evolene EAA Essential Amino Acids Matrix',
    subtitle: 'Spektrum 9 Asam Amino Esensial Lengkap + Elektrolit Hidrasi Intra-Workout',
    category: 'Membangun Otot',
    originalPrice: 310000,
    price: 232500,
    discountPercent: 25,
    image: '/src/assets/images/evolene_eaa_amino_matrix_1793851668154.jpg',
    rating: 4.9,
    reviewsCount: 280,
    serving: 'Tub 360g / 30 Servings (Iced Berry Splash)',
    benefits: [
      'Mengandung lengkap 9 Asam Amino Esensial (EAA) yang tidak bisa diproduksi tubuh',
      'Memicu aktivasi mTOR untuk pertumbuhan otot baru bahkan saat latihan sedang berlangsung',
      'Dilengkapi elektrolit air kelapa alami untuk mencegah kram dan dehidrasi sel',
      'Rasa Iced Berry segar dingin tanpa gula'
    ],
    description: 'EAA Evolene mengungguli BCAA biasa karena menyediakan kesembilan asam amino pembangun otot secara lengkap. Diminum saat latihan (intra-workout), suplemen ini menjaga otot tetap terhidrasi, berenergi, dan berada dalam kondisi anabolik konstan.',
    usage: 'Larutkan 1 scoop ke dalam 400-500ml air es dingin. Minum secara perlahan di sela-sela set latihan gym Anda.',
    bpom: 'BPOM RI MD 867031021307 | Halal MUI',
    inStock: true
  },
  {
    id: 'evolene-hmb-builder',
    name: 'Evolene HMB Pure Muscle Builder 1000mg',
    subtitle: 'Metabolit Leusin Terkuat untuk Melindungi Massa Otot dari Katabolisme Ekstrem',
    category: 'Membangun Otot',
    originalPrice: 330000,
    price: 247500,
    discountPercent: 25,
    image: '/src/assets/images/evolene_hmb_capsules_1793851668722.jpg',
    rating: 4.8,
    reviewsCount: 168,
    serving: 'Botol 120 Kapsul / 60 Servings',
    benefits: [
      '1000mg Calcium HMB (Beta-Hydroxy Beta-Methylbutyrate) murni per sajian',
      'Perisai anti-katabolik terkuat saat program defisit kalori atau puasa intermiten',
      'Meningkatkan kapasitas kekuatan fisik dan mempercepat adaptasi hipertrofi',
      'Kapsul praktis yang mudah ditelan tanpa rasa pahit'
    ],
    description: 'HMB adalah metabolit aktif dari asam amino L-Leusin. Untuk mendapatkan 3g HMB dari makanan biasa, Anda harus mengonsumsi 60g Leusin murni. Evolene HMB hadir dalam bentuk kapsul konsentrat tinggi yang secara ilmiah terbukti mengunci massa otot agar tidak terbuang saat fase cutting.',
    usage: 'Minum 2 kapsul di pagi hari dan 2 kapsul 30 menit sebelum berolahraga.',
    bpom: 'BPOM RI SD 211320501 | Halal MUI',
    inStock: true
  },
  {
    id: 'evolene-zma-recovery',
    name: 'Evolene ZMA Anabolic Night Recovery',
    subtitle: 'Kombinasi Zinc Monomethionine, Magnesium Aspartate & B6 untuk Kualitas Tidur & Hormon',
    category: 'Membangun Otot',
    originalPrice: 250000,
    price: 187500,
    discountPercent: 25,
    image: '/src/assets/images/evolene_zma_anabolic_1793851668541.jpg',
    rating: 4.9,
    reviewsCount: 230,
    serving: 'Botol 90 Kapsul / 45 Hari',
    benefits: [
      'Bentuk Zinc dan Magnesium dengan tingkat penyerapan seluler tertinggi',
      'Mendukung kadar hormon pertumbuhan alami (HGH) dan testosteron saat tidur nyenyak',
      'Melemaskan sistem saraf pusat, meredakan ketegangan otot, dan mencegah kram malam',
      'Memperbaiki siklus tidur REM (deep sleep) untuk pemulihan optimal'
    ],
    description: 'Otot tidak tumbuh di gym, melainkan saat Anda tidur nyenyak di malam hari. Evolene ZMA memasok mineral esensial yang sering terkuras melalui keringat saat angkat beban, memastikan tubuh Anda masuk ke fase tidur lelap terdalam di mana regenerasi sel otot terjadi.',
    usage: 'Minum 2 kapsul 30-60 menit sebelum tidur saat perut kosong (hindari konsumsi bersamaan dengan makanan berkalsium tinggi/susu).',
    bpom: 'BPOM RI SD 211520131 | Halal MUI',
    inStock: true
  },

  // --- 10 PRODUK DIET, SNACK & GEAR EVOLENE SEBELUMNYA ---
  {
    id: 'evolene-evobar',
    name: 'Evolene Evobar High Protein Bar',
    subtitle: 'Snack Protein Praktis 16g Protein Murni & Kurang dari 1g Gula',
    category: 'Snack & Diet',
    originalPrice: 240000,
    price: 180000,
    discountPercent: 25,
    image: '/src/assets/images/evolene_evobar_snack_1793264675818.jpg',
    rating: 4.9,
    reviewsCount: 320,
    serving: 'Box isi 12 Bar @45g',
    benefits: [
      '16 Gram Protein murni per bar untuk cegah lapar berlebih',
      'Kurang dari 1g gula (Zero Added Sugar) dan kaya serat pangan',
      'Tekstur renyah dengan balutan cokelat asli lezat tidak seret',
      'Praktis dibawa di saku gym sebagai asupan anabolik kapan saja'
    ],
    description: 'Evolene Evobar adalah camilan tinggi protein inovatif dari Evolene yang memudahkan Anda memenuhi target protein harian tanpa khawatir kelebihan gula atau lemak. Cocok dikonsumsi sebelum latihan, sesudah latihan, atau di sela kesibukan kantor.',
    usage: 'Konsumsi 1-2 bar sehari di sela waktu makan atau 30 menit sebelum latihan sebagai sumber energi instan.',
    bpom: 'BPOM RI MD 836031003307 | Halal MUI',
    inStock: true,
    isBestSeller: true,
    isFlashSale: true
  },
  {
    id: 'evolene-evoslim',
    name: 'Evolene Evoslim Meal Replacement Shake',
    subtitle: 'Formula Pengganti Makanan Bernutrisi Tinggi Serat untuk Defisit Kalori Sehat',
    category: 'Snack & Diet',
    originalPrice: 320000,
    price: 240000,
    discountPercent: 25,
    image: '/src/assets/images/evolene_evoslim_diet_1793264676154.jpg',
    rating: 4.8,
    reviewsCount: 278,
    serving: 'Pouch 16 Sachet @50g (Rasa Chocolate Fudge)',
    benefits: [
      '21 Gram Protein lambat cerna untuk rasa kenyang tahan 4-6 jam',
      'Hanya 170 Kalori per sajian, sangat pas untuk program fat loss',
      'Diperkaya 27 Vitamin & Mineral esensial lengkap dan Psyllium Husk',
      'Menjaga sistem pencernaan lancar tanpa rasa lemas seharian'
    ],
    description: 'Evoslim dirancang khusus bagi Anda yang ingin menurunkan berat badan tanpa kehilangan massa otot berharga. Menggantikan 1 porsi makan siang atau malam dengan nutrisi lengkap seimbang dan kalori terukur.',
    usage: 'Campurkan 1 sachet Evoslim ke dalam 250-300ml air dingin. Minum sebagai pengganti sarapan pagi atau makan malam.',
    bpom: 'BPOM RI MD 830531001307 | Halal MUI',
    inStock: true,
    isBestSeller: true,
    isFlashSale: true
  },
  {
    id: 'evolene-evodrain',
    name: 'Evolene Evodrain Thermogenic Fat Burner',
    subtitle: 'Meningkatkan Metabolisme Basal & Membakar Lemak Membandel saat Kardio',
    category: 'Fat Burner & Cutting',
    originalPrice: 290000,
    price: 217500,
    discountPercent: 25,
    image: '/src/assets/images/evolene_evodrain_fatburner_1793264677334.jpg',
    rating: 4.8,
    reviewsCount: 234,
    serving: 'Botol isi 60 Kapsul / 30 Hari',
    benefits: [
      'Kombinasi L-Carnitine Tartrate murni, Green Tea Extract & Cayenne Pepper',
      'Mengubah cadangan asam lemak tubuh menjadi energi aktif latihan',
      'Menekan nafsu makan berlebih (natural appetite suppressant)',
      'Formula ramah lambung tanpa sensasi jantung berdebar berlebihan'
    ],
    description: 'Evodrain adalah suplemen fat burner thermogenic resmi ber-BPOM dari Evolene yang memaksimalkan pembakaran kalori tubuh bahkan saat Anda sedang beristirahat. Solusi terbaik bagi program cutting dan pembentukan perut sixpack.',
    usage: 'Minum 2 kapsul 20-30 menit sebelum sesi latihan kardio atau angkat beban bersama segelas air putih.',
    bpom: 'BPOM RI SD 211320492 | Halal MUI',
    inStock: true,
    isFlashSale: true
  },
  {
    id: 'evolene-evoshield',
    name: 'Evolene Evoshield Daily Athletic Multivitamin',
    subtitle: 'Spektrum 26 Vitamin, Zinc Picolinate & Antioksidan untuk Proteksi Atlet',
    category: 'Kesehatan & Sendi',
    originalPrice: 230000,
    price: 184000,
    discountPercent: 20,
    image: '/src/assets/images/evolene_evoshield_vitamins_1793265913634.jpg',
    rating: 4.9,
    reviewsCount: 189,
    serving: 'Botol isi 60 Kapsul / 60 Hari',
    benefits: [
      'Formula imun lengkap: Vitamin C 1000mg, D3 2000 IU, Zinc & Selenium',
      'Mencegah sindrom overtraining dan rasa drop akibat kelelahan fisik',
      'Meningkatkan metabolisme seluler dan penyerapan asam amino protein',
      'Kapsul vegetarian lembut yang aman bagi penderita maag'
    ],
    description: 'Saat berlatih intensif di gym, tubuh memproduksi radikal bebas berlebih yang dapat menurunkan imunitas. Evoshield diformulasikan dengan dosis mikronutrien yang disesuaikan untuk atlet aktif guna mempercepat recovery sel dan menjaga daya tahan.',
    usage: 'Konsumsi 1 kapsul setiap pagi setelah sarapan bersama segelas air putih.',
    bpom: 'BPOM RI SD 211520121 | Halal MUI',
    inStock: true
  },
  {
    id: 'evolene-evoglow',
    name: 'Evolene Evoglow Marine Collagen + Glutathione',
    subtitle: 'Nutrisi Regenerasi Bantalan Sendi Tulang Rawan & Kesehatan Kulit',
    category: 'Kesehatan & Sendi',
    originalPrice: 340000,
    price: 255000,
    discountPercent: 25,
    image: '/src/assets/images/evolene_evoglow_collagen_1793265913555.jpg',
    rating: 4.9,
    reviewsCount: 162,
    serving: 'Box 15 Sachet @15g (Rasa Peach Berries)',
    benefits: [
      'Peptida kolagen laut terhidrolisis molekul ultra-rendah (<1000 Dalton)',
      'Memperkuat bantalan tulang rawan lutut dan ligamen sendi saat angkat beban',
      'Diperkaya L-Glutathione dan Vitamin C untuk menangkal radikal bebas',
      'Rasa peach buah segar alami tanpa aftertaste amis'
    ],
    description: 'Suplemen kolagen tripeptida premium dari Evolene yang bekerja ganda: meredakan gesekan dan nyeri sendi saat latihan squat/leg press berat, sekaligus menjaga elastisitas kulit agar tetap segar dan awet muda.',
    usage: 'Larutkan 1 sachet ke dalam 150ml air dingin. Minum 1 kali sehari di malam hari sebelum tidur.',
    bpom: 'BPOM RI MD 867031024307 | Halal MUI',
    inStock: true
  },
  {
    id: 'evolene-shaker-pro',
    name: 'Evolene Pro Stainless Steel Shaker 750ml',
    subtitle: 'Botol Shaker Stainless Steel Food Grade Dinding Ganda Anti Bau & Bocor',
    category: 'Aksesoris & Gym Gear',
    originalPrice: 195000,
    price: 146250,
    discountPercent: 25,
    image: '/src/assets/images/evolene_shaker_accessories_1793264676132.jpg',
    rating: 5.0,
    reviewsCount: 412,
    serving: 'Kapasitas 750ml / Warna Matte Black Red Logo',
    benefits: [
      'Bahan Stainless Steel 304 anti karat, higienis, dan tidak meninggalkan bau susu basi',
      'Tutup flip-cap kedap dengan teknologi leak-proof seal anti tumpah di tas gym',
      'Dilengkapi wire whisk ball pengocok untuk melarutkan bubuk tanpa gumpalan',
      'Pengukur mililiter timbul presisi di bagian dalam botol'
    ],
    description: 'Tinggalkan shaker plastik berbau tak sedap. Evolene Pro Shaker berbahan stainless steel premium menjaga minuman protein Anda tetap dingin dan segar sepanjang sesi latihan.',
    usage: 'Gunakan untuk mengocok protein atau BCAA dengan air dingin.',
    bpom: 'Food Grade Certified | BPA Free',
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'evolene-lifting-straps',
    name: 'Evolene Neoprene Padded Heavy Duty Lifting Straps',
    subtitle: 'Tali Angkat Beban dengan Bantalan Neoprene Lembut Anti Licin & Robek',
    category: 'Aksesoris & Gym Gear',
    originalPrice: 140000,
    price: 105000,
    discountPercent: 25,
    image: '/src/assets/images/evolene_lifting_straps_barbell_1793265914542.jpg',
    rating: 4.9,
    reviewsCount: 350,
    serving: '1 Pasang (Kiri & Kanan)',
    benefits: [
      'Bahan katun anyam militer berkekuatan tinggi sanggup menahan beban hingga 350kg',
      'Bantalan busa neoprene tebal melindungi pergelangan tangan dari memar',
      'Lapisan silikon grip anti selip pada batang barbell atau dumbbell',
      'Membantu fokus kontraksi otot punggung tanpa terhalang kekuatan cengkeraman tangan'
    ],
    description: 'Lifting straps resmi Evolene dirancang untuk atlet yang ingin meningkatkan beban pada latihan Deadlift, Barbell Row, Lat Pulldown, dan Shrug tanpa cemas grip tangan keburu lepas.',
    usage: 'Lilitkan ujung tali pada stang barbell/dumbbell sebanyak 2-3 putaran dan kencangkan.',
    bpom: 'Original Evolene Gear | Heavy Duty Construction',
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'evolene-weightlifting-belt',
    name: 'Evolene Pro Genuine Leather Weightlifting Belt 10mm',
    subtitle: 'Sabuk Angkat Beban Kulit Sapi Asli dengan Double Steel Prong Buckle',
    category: 'Aksesoris & Gym Gear',
    originalPrice: 420000,
    price: 315000,
    discountPercent: 25,
    image: '/src/assets/images/evolene_weightlifting_belt_leather_1793265915391.jpg',
    rating: 5.0,
    reviewsCount: 175,
    serving: 'Ukuran S, M, L, XL (Tebal 10mm, Lebar 4 Inci)',
    benefits: [
      'Terbuat dari 100% genuine leather kulit sapi berlapis kokoh tahan sobek',
      'Tebal 10mm standar powerlifting memberikan support lumbar punggung maksimal',
      'Meningkatkan tekanan intra-abdominal untuk stabilitas angkatan Squat & Deadlift PR',
      'Gesper baja ganda (double prong) tidak mudah melar atau lepas'
    ],
    description: 'Sabuk angkat beban profesional Evolene melindungi tulang belakang bagian bawah dari cedera fatal saat mengangkat beban terberat. Memberikan dinding penopang kuat saat Anda mengunci nafas (Valsalva maneuver).',
    usage: 'Kencangkan di sekeliling perut setinggi pusar sebelum melakukan set angkatan berat.',
    bpom: 'Powerlifting Standard | Genuine Buffalo Leather',
    inStock: true
  },
  {
    id: 'evolene-wrist-wraps',
    name: 'Evolene Elastic Heavy Duty Wrist Wraps 18"',
    subtitle: 'Pelindung Sendi Pergelangan Tangan Elastis untuk Bench Press & Overhead Press',
    category: 'Aksesoris & Gym Gear',
    originalPrice: 135000,
    price: 101250,
    discountPercent: 25,
    image: '/src/assets/images/evolene_wrist_wraps_support_1793265916026.jpg',
    rating: 4.8,
    reviewsCount: 210,
    serving: '1 Pasang (Panjang 18 Inci / 45cm)',
    benefits: [
      'Material elastis grade kompetisi dengan velcro rekat kuat tahan lama',
      'Dilengkapi reinforced thumb loop (pengait ibu jari) untuk kemudahan pemakaian',
      'Mencegah hiperekstensi dan cedera pergelangan tangan saat menopang beban press berat',
      'Tingkat kekencangan dapat diatur sesuai kebutuhan stabilitas latihan'
    ],
    description: 'Wrist wraps Evolene mengunci pergelangan tangan pada posisi netral saat latihan Bench Press, Incline Dumbbell Press, dan Overhead Barbell Press agar tenaga tersalurkan maksimal tanpa rasa ngilu di sendi.',
    usage: 'Kaitkan pada ibu jari, lilitkan kencang mengelilingi sendi pergelangan tangan, dan rekatkan velcro.',
    bpom: 'Original Evolene Gear | Competition Grade',
    inStock: true
  },
  {
    id: 'evolene-jersey-oversized',
    name: 'Evolene "Transformasi Nyata" Gym Oversized Tee',
    subtitle: 'Baju Gym Katun Combed 24s Premium Breathable, Nyaman & Stylish',
    category: 'Aksesoris & Gym Gear',
    originalPrice: 190000,
    price: 142500,
    discountPercent: 25,
    image: '/src/assets/images/evolene_gym_tshirt_oversized_1793265915406.jpg',
    rating: 4.9,
    reviewsCount: 290,
    serving: 'Ukuran M, L, XL, XXL (Warna Hitam & Merah Maroon)',
    benefits: [
      'Bahan 100% Katun Combed 24s adem, menyerap keringat dan tidak gatal di kulit',
      'Fitting oversized atletik modern yang menonjolkan siluet bahu dan lengan kekar',
      'Sablon discharge plastisol awet tidak pecah meskipun dicuci berkali-kali',
      'Cocok digunakan untuk latihan gym intensif maupun gaya streetwear kasual'
    ],
    description: 'Kaos resmi komunitas Evolene dengan slogan ikonik "Transformasi Nyata". Dirancang dengan potongan longgar yang memberikan kebebasan gerak penuh saat mengangkat beban maupun latihan kardio.',
    usage: 'Gunakan saat sesi latihan di gym atau pakaian santai harian.',
    bpom: 'Original Evolene Apparel | 100% Cotton Combed',
    inStock: true
  }
];

export const STORE_FEATURES = [
  {
    title: '100% Produk & Gear Evolene Original',
    description: 'Garansi resmi suplemen nutrisi pembangun otot, diet sehat, dan gym gear asli langsung dari Evolene Indonesia.',
    badge: 'Garansi Asli'
  },
  {
    title: 'Diskon Spesial 20% - 25% Tiap Produk',
    description: 'Hemat puluhan hingga ratusan ribu rupiah di setiap item tanpa syarat minimum pembelian yang rumit.',
    badge: 'Diskon Langsung'
  },
  {
    title: 'Standar Mutu BPOM & Labdoor USA',
    description: 'Seluruh suplemen terdaftar BPOM dan teruji kemurnian independen standar internasional.',
    badge: 'Kualitas Teruji'
  },
  {
    title: 'Pesan Cepat via WhatsApp & COD',
    description: 'Konsultasi gratis, konfirmasi instan, serta opsi pembayaran Transfer, QRIS, dan COD se-Indonesia.',
    badge: 'Kirim Cepat'
  }
];

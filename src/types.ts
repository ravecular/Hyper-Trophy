export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  originalPrice: number;
  price: number;
  discountPercent: number;
  image: string;
  rating: number;
  reviewsCount: number;
  serving: string;
  benefits: string[];
  description: string;
  usage: string;
  bpom: string;
  inStock: boolean;
  isBestSeller?: boolean;
  isFlashSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  whatsapp: string;
  address: string;
  city: string;
  postalCode?: string;
  paymentMethod: 'transfer_bca' | 'transfer_mandiri' | 'qris' | 'cod';
  notes: string;
}

export interface StoreConfig {
  storeName: string;
  whatsappNumber: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  tagline: string;
}

export interface Voucher {
  code: string;
  label: string;
  discountAmount?: number;
  discountRate?: number; // e.g. 0.1 for 10%
  minSpend: number;
}

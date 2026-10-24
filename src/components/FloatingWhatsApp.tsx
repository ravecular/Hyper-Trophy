import React from 'react';
import { MessageCircle } from 'lucide-react';
import { StoreConfig } from '../types.ts';

interface FloatingWhatsAppProps {
  storeConfig: StoreConfig;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ storeConfig }) => {
  const cleanPhone = storeConfig.whatsappNumber.replace(/\D/g, '');
  const greeting = encodeURIComponent('Halo Hyper Trophy! Saya ingin berkonsultasi mengenai suplemen Evolene yang paling sesuai dengan kebutuhan saya.');

  return (
    <aside aria-label="Layanan pelanggan WhatsApp" className="fixed bottom-6 right-6 z-30">
      <a
        href={`https://wa.me/${cleanPhone}?text=${greeting}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
        aria-label="Konsultasi cepat via WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          Konsultasi Suplemen WA
        </span>
      </a>
    </aside>
  );
};

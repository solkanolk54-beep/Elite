import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Calculator, X, ChevronUp, ChevronDown } from 'lucide-react';

interface FloatingContactActionsProps {
  lang: 'en' | 'ar';
  onOpenMacroEstimator: () => void;
}

export const FloatingContactActions: React.FC<FloatingContactActionsProps> = ({
  lang,
  onOpenMacroEstimator,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const officialPhone = '0555000000';
  const whatsappNumber = '213555000000';
  const defaultWhatsAppMsg = encodeURIComponent(
    lang === 'en'
      ? 'Salam Elite Healthy Food by Healthy_Brunchy Sol+ (Mila). I would like to inquire about healthy meals / place an order.'
      : 'سلام إيليت فود (Healthy_Brunchy Sol+ ميلة)، أود الاستفسار عن الوجبات الصحية وتأكيد طلبيتي.'
  );

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Expanded Quick Action Menu */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2 mb-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
          
          {/* Quick Macro Estimator */}
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenMacroEstimator();
            }}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#13281c] text-white border border-[#88c999]/40 shadow-xl hover:bg-[#1b3b2b] transition-all text-xs font-bold cursor-pointer group"
          >
            <Calculator className="w-4 h-4 text-[#88c999] group-hover:scale-110 transition-transform" />
            <span>{lang === 'en' ? 'Macro Calculator' : 'حاسبة الماكروز'}</span>
          </button>

          {/* Direct Phone Call */}
          <a
            href={`tel:${officialPhone}`}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#13281c] text-white border border-amber-500/40 shadow-xl hover:bg-[#1b3b2b] transition-all text-xs font-bold group"
          >
            <Phone className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>{lang === 'en' ? 'Call Kitchen (Mila)' : 'اتصال مباشر بالمطعم'}</span>
          </a>

          {/* Direct WhatsApp Ordering */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${defaultWhatsAppMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#165b33] text-white border border-emerald-400/50 shadow-xl hover:bg-[#1a6e3e] transition-all text-xs font-bold group"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
            <span>{lang === 'en' ? 'Order on WhatsApp' : 'طلب سريع عبر واتساب'}</span>
          </a>

          {/* Location details card */}
          <div className="px-3 py-2 rounded-xl bg-[#0a1810]/95 border border-[#a3c9a8]/25 text-[11px] text-[#cbe0cf] shadow-xl flex items-center gap-1.5 max-w-[240px]">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
            <span>{lang === 'en' ? 'Cité Ben Aazouz (El Kamounia), Mila' : 'حي بن عزوز (الكمونية) - ميلة'}</span>
          </div>

        </div>
      )}

      {/* Main Trigger Toggle Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#1b3b2b] hover:bg-[#234f3a] text-white border border-[#88c999]/60 shadow-2xl transition-all cursor-pointer group"
        aria-label="Quick Actions & WhatsApp"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>

        <span className="text-xs font-bold text-white font-heading">
          {lang === 'en' ? 'Contact & Order' : 'تواصل وطلب سريع'}
        </span>

        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-[#88c999]" />
        ) : (
          <ChevronUp className="w-4 h-4 text-[#88c999]" />
        )}
      </button>
    </div>
  );
};

import React from 'react';
import { ShoppingBag, BookOpen, MapPin, Dumbbell, Target, MessageCircle } from 'lucide-react';
import { CartItem } from '../types/menu';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenHowToRead: () => void;
  onOpenSheetViewer: () => void;
  onOpenMacroEstimator: () => void;
  lang: 'en' | 'ar';
  onToggleLang: () => void;
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenHowToRead,
  onOpenSheetViewer,
  onOpenMacroEstimator,
  lang,
  onToggleLang,
}) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalProtein = Math.round(cart.reduce((sum, item) => sum + (item.calculatedMacros.protein * item.quantity), 0));

  return (
    <header className="sticky top-0 z-40 bg-[#0c1912]/95 backdrop-blur-md border-b border-[#a3c9a8]/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6 sm:gap-8">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex flex-col group">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-heading uppercase group-hover:text-[#88c999] transition-colors">
                ELITE<span className="text-[#88c999] text-base">™</span>
              </span>
              <span className="text-xs uppercase tracking-widest text-[#88c999]/90 font-semibold hidden sm:inline">
                Healthy Food
              </span>
            </div>
            <span className="text-sm text-[#88c999] font-script -mt-1 tracking-wide">
              by Healthy_Brunchy Sol+
            </span>
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs sm:text-sm font-medium text-[#cbe0cf]/80">
          <a 
            href="#menu-section" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#88c999]"
          >
            {lang === 'en' ? 'Digital Menu' : 'قائمة الوجبات'}
          </a>
          
          <button 
            onClick={onOpenMacroEstimator} 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-left font-bold text-[#d4af37]"
          >
            <Target className="w-4 h-4 text-[#d4af37]" />
            <span>{lang === 'en' ? 'Macro Calculator' : 'حاسبة الماكروز'}</span>
          </button>

          <button 
            onClick={onOpenHowToRead} 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-left"
          >
            <BookOpen className="w-4 h-4 text-[#88c999]" />
            <span>{lang === 'en' ? 'Guide' : 'دليل الماكروز'}</span>
          </button>

          <button 
            onClick={onOpenSheetViewer} 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-left"
          >
            <Dumbbell className="w-4 h-4 text-[#88c999]" />
            <span>{lang === 'en' ? 'Printed Cards' : 'صور المنيو'}</span>
          </button>

          <a 
            href="#location-section" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-white/90"
          >
            <MapPin className="w-4 h-4 text-[#d4af37]" />
            <span className="text-xs">{lang === 'en' ? 'Cité Ben Aazouz (El Kamounia)' : 'حي بن عزوز (الكمونية)'}</span>
          </a>
        </nav>

        {/* Primary Actions & Utilities */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Quick Macro Calculator button for mobile */}
          <button
            onClick={onOpenMacroEstimator}
            className="lg:hidden p-2 text-xs font-semibold rounded-lg border border-[#d4af37]/40 text-[#d4af37] bg-[#1b3b2b]/50 hover:bg-[#1b3b2b] transition-colors cursor-pointer"
            title="Macro Calculator / حاسبة الماكروز"
          >
            <Target className="w-4 h-4" />
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="px-2.5 py-1 text-xs font-semibold rounded-md border border-[#88c999]/30 text-[#88c999] hover:bg-[#183325] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Toggle Language / تغيير اللغة"
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          {/* Quick WhatsApp Link */}
          <a
            href="https://wa.me/213558327813"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-[#165b33] hover:bg-[#1a6e3e] text-white border border-emerald-400/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="WhatsApp: 0558 32 78 13"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
            <span className="font-mono text-emerald-100">0558 32 78 13</span>
          </a>

          {/* Athlete Tray CTA Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#1b3b2b] hover:bg-[#234f3a] border border-[#88c999]/40 rounded-lg shadow-sm hover:border-[#88c999] transition-all whitespace-nowrap shrink-0 cursor-pointer group"
          >
            <ShoppingBag className="w-4 h-4 text-[#88c999] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">
              {lang === 'en' ? 'Nutrition Tray' : 'صينية الطلب'}
            </span>
            {totalItems > 0 ? (
              <span className="flex items-center gap-1 text-[#88c999] font-mono tabular-nums">
                <span>({totalItems})</span>
                <span className="hidden md:inline text-xs text-white/70">·</span>
                <span className="hidden md:inline text-xs text-[#88c999] font-bold">{totalProtein}g P</span>
              </span>
            ) : (
              <span className="text-white/60 text-xs hidden sm:inline">(0)</span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};

import React from 'react';
import { Flame, ShoppingBag, BookOpen, MapPin, Dumbbell } from 'lucide-react';
import { CartItem } from '../types/menu';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenHowToRead: () => void;
  onOpenSheetViewer: () => void;
  onOpenFoodCost: () => void;
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
  onOpenFoodCost,
  lang,
  onToggleLang,
}) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalProtein = Math.round(cart.reduce((sum, item) => sum + (item.calculatedMacros.protein * item.quantity), 0));
  const totalCalories = Math.round(cart.reduce((sum, item) => sum + (item.calculatedMacros.calories * item.quantity), 0));

  return (
    <header className="sticky top-0 z-40 bg-[#0c1912]/95 backdrop-blur-md border-b border-[#a3c9a8]/15 transition-all">
      {/* Top Bar Zone Contract: Zone 1 (Brand) — Zone 2 (Nav links) — Zone 3 (Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark with signature lockup */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex flex-col group">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white font-heading uppercase group-hover:text-[#a3c9a8] transition-colors">
                ELITE<span className="text-[#a3c9a8] text-base">™</span>
              </span>
              <span className="text-xs uppercase tracking-widest text-[#a3c9a8]/80 font-semibold hidden sm:inline">
                Healthy Food
              </span>
            </div>
            <span className="text-sm text-[#a3c9a8] font-script -mt-1 tracking-wide">
              by Healthy_Brunchy Sol+
            </span>
          </a>
        </div>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#cbe0cf]/80">
          <a 
            href="#menu-section" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#a3c9a8]"
          >
            {lang === 'en' ? 'Digital Menu' : 'قائمة الوجبات'}
          </a>
          <button 
            onClick={onOpenFoodCost} 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-left font-semibold text-[#a3c9a8]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{lang === 'en' ? 'Cost & Pricing Engine' : 'حاسبة التكاليف والأسعار'}</span>
          </button>
          <button 
            onClick={onOpenHowToRead} 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-left"
          >
            <BookOpen className="w-4 h-4 text-[#a3c9a8]" />
            <span>{lang === 'en' ? 'Macro Guide' : 'دليل الماكروز'}</span>
          </button>
          <button 
            onClick={onOpenSheetViewer} 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-left"
          >
            <Dumbbell className="w-4 h-4 text-[#a3c9a8]" />
            <span>{lang === 'en' ? 'Original Sheets' : 'صور المنيو'}</span>
          </button>
          <a 
            href="#location-section" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <MapPin className="w-4 h-4 text-[#a3c9a8]" />
            <span>Mila</span>
          </a>
        </nav>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="px-2.5 py-1 text-xs font-semibold rounded-md border border-[#a3c9a8]/30 text-[#a3c9a8] hover:bg-[#183325] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Toggle Language / تغيير اللغة"
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          {/* Athlete Tray CTA Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#1b3b2b] hover:bg-[#234f3a] border border-[#a3c9a8]/40 rounded-lg shadow-sm hover:border-[#a3c9a8] transition-all whitespace-nowrap shrink-0 cursor-pointer group"
          >
            <ShoppingBag className="w-4 h-4 text-[#a3c9a8] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">
              {lang === 'en' ? 'Nutrition Tray' : 'صينية الطلب'}
            </span>
            {totalItems > 0 ? (
              <span className="flex items-center gap-1 text-[#a3c9a8] font-mono tabular-nums">
                <span>({totalItems})</span>
                <span className="hidden md:inline text-xs text-white/70">·</span>
                <span className="hidden md:inline text-xs text-[#a3c9a8] font-bold">{totalProtein}g P</span>
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

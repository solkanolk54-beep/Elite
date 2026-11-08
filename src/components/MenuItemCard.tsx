import React from 'react';
import { Plus, SlidersHorizontal, Dumbbell, Flame, Wheat, ShieldCheck } from 'lucide-react';
import { MenuItem } from '../types/menu';

interface MenuItemCardProps {
  item: MenuItem;
  lang: 'en' | 'ar';
  onCustomize: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  lang,
  onCustomize,
  onQuickAdd,
}) => {
  return (
    <div className="group relative bg-[#13271c] hover:bg-[#183325] border border-[#a3c9a8]/15 hover:border-[#a3c9a8]/40 rounded-xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md">
      
      {/* Top Details */}
      <div>
        
        {/* Unboxed category / portion metadata with typographic separators (§1.A Zero-Pill) */}
        <div className="flex items-center gap-2 text-xs text-[#a3c9a8] mb-1.5 font-medium">
          <span>{item.weight}</span>
          <span aria-hidden="true" className="text-white/20">·</span>
          <span className="capitalize">{item.categoryId}</span>
          {item.isAthleteFavorite && (
            <>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="text-white/90 font-semibold flex items-center gap-1">
                <Dumbbell className="w-3 h-3 text-[#a3c9a8]" />
                Athlete Top Pick
              </span>
            </>
          )}
        </div>

        {/* Item Title & Arabic subtitle */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#a3c9a8] transition-colors leading-snug">
              {lang === 'en' ? item.nameEn : item.nameAr}
            </h3>
            <p className="text-xs text-white/50 mt-0.5 font-arabic">
              {lang === 'en' ? item.nameAr : item.nameEn}
            </p>
          </div>

          {/* Transparent Price in DZD & Centimes */}
          <div className="text-right shrink-0">
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-base sm:text-lg font-mono font-black text-white tabular-nums">
                {item.priceDZD}
              </span>
              <span className="text-[10px] text-white/60 font-sans">DZD</span>
            </div>
            <div className="text-[10px] text-[#a3c9a8] font-mono font-semibold">
              {item.priceCentimes || Math.round(item.priceDZD / 10)} ألف
            </div>
          </div>
        </div>

        {/* Short description */}
        {item.descriptionEn && (
          <p className="text-xs text-[#cbe0cf]/70 mt-2 line-clamp-2 leading-relaxed">
            {lang === 'en' ? item.descriptionEn : item.descriptionAr}
          </p>
        )}

      </div>

      {/* Macro Data Strip & Actions */}
      <div className="mt-4 pt-3 border-t border-[#a3c9a8]/10">
        
        {/* 4 Macro Pillars Grid with Tabular Numerals */}
        <div className="grid grid-cols-4 gap-1.5 text-center mb-3">
          
          {/* KCAL */}
          <div className="bg-[#0c1912]/80 p-1.5 rounded border border-[#a3c9a8]/10">
            <span className="text-[9px] text-white/50 uppercase font-semibold block">Kcal</span>
            <span className="font-mono text-xs font-bold text-white tabular-nums">
              {item.macros.calories}
            </span>
          </div>

          {/* PROTEIN (High contrast anchor) */}
          <div className="bg-[#183325] p-1.5 rounded border border-[#a3c9a8]/30">
            <span className="text-[9px] text-[#a3c9a8] uppercase font-bold block">Protein</span>
            <span className="font-mono text-xs font-black text-[#a3c9a8] tabular-nums">
              {item.macros.protein}g
            </span>
          </div>

          {/* CARBS */}
          <div className="bg-[#0c1912]/80 p-1.5 rounded border border-[#a3c9a8]/10">
            <span className="text-[9px] text-white/50 uppercase font-semibold block">Carbs</span>
            <span className="font-mono text-xs font-bold text-white tabular-nums">
              {item.macros.carbs}g
            </span>
          </div>

          {/* FATS */}
          <div className="bg-[#0c1912]/80 p-1.5 rounded border border-[#a3c9a8]/10">
            <span className="text-[9px] text-white/50 uppercase font-semibold block">Fats</span>
            <span className="font-mono text-xs font-bold text-white tabular-nums">
              {item.macros.fats}g
            </span>
          </div>
        </div>

        {/* Action Button */}
        {item.allowsCarbCustomization ? (
          <button
            onClick={() => onCustomize(item)}
            className="w-full py-2.5 px-3 bg-[#183325] hover:bg-[#1e3f2e] text-[#a3c9a8] hover:text-white border border-[#a3c9a8]/40 hover:border-[#a3c9a8] rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#a3c9a8] group-hover/btn:rotate-45 transition-transform" />
            <span>{lang === 'en' ? 'Select 200g Carb & Add' : 'تخصيص الكارب (200غ) والطلب'}</span>
          </button>
        ) : (
          <button
            onClick={() => onQuickAdd(item)}
            className="w-full py-2.5 px-3 bg-[#1b3b2b] hover:bg-[#234f3a] text-white border border-[#a3c9a8]/30 hover:border-[#a3c9a8] rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#a3c9a8]" />
            <span>{lang === 'en' ? 'Add To Nutrition Tray' : 'إضافة إلى صينية الطلب'}</span>
          </button>
        )}

      </div>

    </div>
  );
};

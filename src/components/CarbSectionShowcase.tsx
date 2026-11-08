import React from 'react';
import { Wheat, Sparkles, Scale, Info } from 'lucide-react';
import { CARB_OPTIONS } from '../data/menuData';
import { CarbOption } from '../types/menu';

interface CarbSectionShowcaseProps {
  lang: 'en' | 'ar';
  onSelectCarbQuickView?: (carb: CarbOption) => void;
}

export const CarbSectionShowcase: React.FC<CarbSectionShowcaseProps> = ({
  lang,
}) => {
  return (
    <section className="mt-14 mb-16 pt-10 border-t border-[#a3c9a8]/15">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a3c9a8] mb-1">
            <Wheat className="w-4 h-4" />
            <span>{lang === 'en' ? 'The Carb Customization Engine' : 'قسم الكاربوهيدرات الصحية المعتمد'}</span>
            <span aria-hidden="true">·</span>
            <span>200g Fixed Weight</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
            {lang === 'en' ? '10 Clean Carb Sources' : '10 مصادر كاربوهيدرات نقية'}
          </h2>
          <p className="text-xs sm:text-sm text-[#cbe0cf]/70 mt-1 max-w-2xl">
            {lang === 'en'
              ? 'Every Chicken, Beef, Burger, and Shawarma meal can be paired with any of these 10 clean carb choices. Lab-measured at exactly 200g per portion.'
              : 'كل وجبة دجاج أو لحم أو برجر أو شاورما يمكن دمجها مع أي خيار من مصادر الكاربوهيدرات التالية، محسوبة وموزونة بـ 200غ لكل حصة.'}
          </p>
        </div>

        <div className="text-xs text-white/50 flex items-center gap-1.5 shrink-0 bg-[#13271c] px-3 py-2 rounded-lg border border-[#a3c9a8]/20">
          <Info className="w-3.5 h-3.5 text-[#a3c9a8]" />
          <span>{lang === 'en' ? 'Zero added refined sugars' : 'خالٍ من السكريات المكررة والزيوت'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {CARB_OPTIONS.map((carb) => (
          <div
            key={carb.id}
            className="p-3.5 rounded-xl bg-[#13271c] border border-[#a3c9a8]/15 hover:border-[#a3c9a8]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-xs font-bold text-white leading-tight">
                  {lang === 'en' ? carb.nameEn : carb.nameAr}
                </h3>
                {carb.tag && (
                  <span className="text-[9px] font-mono text-[#a3c9a8] bg-[#0c1912] px-1.5 py-0.5 rounded border border-[#a3c9a8]/20 whitespace-nowrap">
                    {carb.tag}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-white/50 font-arabic mb-2">
                {lang === 'en' ? carb.nameAr : carb.nameEn}
              </p>
              <p className="text-[11px] text-[#cbe0cf]/80 line-clamp-2 leading-relaxed">
                {lang === 'en' ? carb.descriptionEn : carb.descriptionAr}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#a3c9a8]/10 flex items-center justify-between text-[11px] font-mono">
              <span className="font-bold text-white tabular-nums">{carb.macros.calories} kcal</span>
              <span className="text-[#a3c9a8] font-bold tabular-nums">{carb.macros.protein}g P</span>
              <span className="text-white/70 tabular-nums">{carb.macros.carbs}g C</span>
              <span className="text-white/40 tabular-nums">{carb.macros.fats}g F</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

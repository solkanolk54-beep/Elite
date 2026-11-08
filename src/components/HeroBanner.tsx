import { ShieldCheck, Dumbbell, Sparkles, ChevronRight, Scale, Clock, MapPin, Calculator } from 'lucide-react';
import { DietGoal } from '../types/menu';

interface HeroBannerProps {
  lang: 'en' | 'ar';
  currentGoal: DietGoal;
  onSelectGoal: (goal: DietGoal) => void;
  onOpenHowToRead: () => void;
  onOpenSheetViewer: () => void;
  onOpenFoodCost?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  lang,
  currentGoal,
  onSelectGoal,
  onOpenHowToRead,
  onOpenSheetViewer,
  onOpenFoodCost,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#102319] via-[#0c1912] to-[#0c1912] border-b border-[#a3c9a8]/10 pt-10 pb-12 sm:pt-16 sm:pb-16">
      {/* Subtle background ambient graphic */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#a3c9a8_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Brand & Proposition Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Trust and origin statement without pills */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a3c9a8] mb-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Mila, Algeria</span>
              </span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>Elite Athletic Nutrition</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span className="text-white/80">Healthy_Brunchy Sol+</span>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-heading leading-tight max-w-2xl text-balance">
              {lang === 'en' ? (
                <>
                  Precision Macros. <br />
                  <span className="text-[#a3c9a8]">Pure Athletic Performance</span> In Every Meal.
                </>
              ) : (
                <>
                  تغذية دقيقة بالماكروز. <br />
                  <span className="text-[#a3c9a8]">أداء رياضي نقي</span> في كل وجبة بميلة.
                </>
              )}
            </h1>

            {/* Market Recalibration Badge */}
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#183325]/80 border border-emerald-500/30 text-xs text-[#a3c9a8]">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>
                {lang === 'en'
                  ? 'Costing Calibrated: Chicken 800 DA · Beef 3,000 DA · Basmati Rice 360 DA · Bulgur 300 DA · Veggies 180-230 DA'
                  : 'تدقيق شامل للتكاليف: دجاج 800 دج · لحم 3000 دج · أرز بسمتي 360 دج · برغل 300 دج · خضار 180-230 دج'}
              </span>
            </div>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-[#cbe0cf]/80 max-w-xl leading-relaxed">
              {lang === 'en'
                ? 'Engineered specifically for athletes, bodybuilders, and busy professionals in Mila. Every meal features lab-calculated calories, protein, carbs, healthy fats, and a 200g custom healthy carb selector.'
                : 'مصممة خصيصاً للرياضيين وأبطال كمال الأجسام وأصحاب الأعمال في ميلة. كل وجبة تأتيك بحساب دقيق للسعرات، البروتين، الكاربوهيدرات والدهون الصحية مع 200غ كارب مخصص.'}
            </p>

            {/* CTA and Action Bar */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#menu-section"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-[#0c1912] bg-[#a3c9a8] hover:bg-[#bfe2c4] rounded-lg shadow-md transition-all font-heading tracking-wide cursor-pointer"
              >
                <span>{lang === 'en' ? 'Explore Digital Menu' : 'استعراض قائمة الطعام'}</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              {onOpenFoodCost && (
                <button
                  onClick={onOpenFoodCost}
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-bold text-white bg-[#1b3b2b] hover:bg-[#234f3a] border border-emerald-500/40 rounded-lg transition-colors cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'en' ? 'Market Costing Engine' : 'حاسبة التكاليف وهوامش الربح'}</span>
                </button>
              )}

              <button
                onClick={onOpenHowToRead}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#183325] hover:bg-[#1e3f2e] border border-[#a3c9a8]/30 rounded-lg transition-colors cursor-pointer"
              >
                <Scale className="w-4 h-4 text-[#a3c9a8]" />
                <span>{lang === 'en' ? 'How To Read Macros' : 'طريقة قراءة الماكروز'}</span>
              </button>

              <button
                onClick={onOpenSheetViewer}
                className="inline-flex items-center gap-2 px-3 py-3 text-sm font-medium text-[#cbe0cf] hover:text-white transition-colors cursor-pointer"
              >
                <Dumbbell className="w-4 h-4 text-[#a3c9a8]" />
                <span className="underline underline-offset-4 decoration-[#a3c9a8]/40 hover:decoration-[#a3c9a8]">
                  {lang === 'en' ? 'Printed Cards' : 'كروت المنيو'}
                </span>
              </button>
            </div>

            {/* Key performance highlights: Clean unboxed metadata with separators */}
            <div className="mt-8 pt-6 border-t border-[#a3c9a8]/10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#a3c9a8]">
              <div className="flex items-center gap-1.5 text-white/90">
                <ShieldCheck className="w-4 h-4 text-[#a3c9a8]" />
                <span>Zero Seed Oils</span>
              </div>
              <span aria-hidden="true" className="text-white/20">·</span>
              <div className="flex items-center gap-1.5 text-white/90">
                <Dumbbell className="w-4 h-4 text-[#a3c9a8]" />
                <span>Up to 63g Protein / Box</span>
              </div>
              <span aria-hidden="true" className="text-white/20">·</span>
              <div className="flex items-center gap-1.5 text-white/90">
                <Scale className="w-4 h-4 text-[#a3c9a8]" />
                <span>200g Fixed Carb Customizer</span>
              </div>
              <span aria-hidden="true" className="text-white/20">·</span>
              <div className="flex items-center gap-1.5 text-white/90">
                <Clock className="w-4 h-4 text-[#a3c9a8]" />
                <span>Fast Gym Drop-Off in Mila</span>
              </div>
            </div>

          </div>

          {/* Brand Showcase Right Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#a3c9a8]/20 bg-[#13271c] shadow-2xl p-6 flex flex-col items-center text-center">
              
              {/* Actual brand emblem from assets */}
              <div className="w-full max-w-[280px] sm:max-w-[320px] rounded-xl overflow-hidden border border-[#a3c9a8]/30 shadow-lg relative bg-[#1b3b2b]">
                <img
                  src="/assets/aistudio/1794091301776_ddd72469.jpg"
                  alt="Elite Healthy Food by Healthy_Brunchy Sol+ Menu Cover"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Brand tagline beneath image */}
              <div className="mt-4">
                <p className="text-sm font-bold text-white uppercase tracking-wider">
                  Mila Healthy Dining HQ
                </p>
                <p className="text-xs text-[#a3c9a8] font-script text-base mt-0.5">
                  by Healthy_Brunchy Sol+
                </p>
              </div>

              {/* Mini quick-macro card */}
              <div className="mt-4 w-full bg-[#183325]/90 border border-[#a3c9a8]/20 rounded-xl p-3 text-left">
                <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                  <span className="font-semibold text-[#a3c9a8]">Standard Meal Composition</span>
                  <span className="font-mono text-white/90">200g Carb + Protein</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-[#102319] p-2 rounded border border-[#a3c9a8]/10">
                    <span className="text-[10px] text-white/50 block">KCAL</span>
                    <span className="font-mono font-bold text-white tabular-nums">350-650</span>
                  </div>
                  <div className="bg-[#102319] p-2 rounded border border-[#a3c9a8]/10">
                    <span className="text-[10px] text-[#a3c9a8] block">PROTEIN</span>
                    <span className="font-mono font-bold text-[#a3c9a8] tabular-nums">35-63g</span>
                  </div>
                  <div className="bg-[#102319] p-2 rounded border border-[#a3c9a8]/10">
                    <span className="text-[10px] text-white/50 block">CARBS</span>
                    <span className="font-mono font-bold text-white tabular-nums">30-65g</span>
                  </div>
                  <div className="bg-[#102319] p-2 rounded border border-[#a3c9a8]/10">
                    <span className="text-[10px] text-white/50 block">FATS</span>
                    <span className="font-mono font-bold text-white tabular-nums">1-15g</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Athletic Goals Segmented Filter Bar (functional buttons, not static pills) */}
        <div className="mt-12 p-3 bg-[#13271c] border border-[#a3c9a8]/20 rounded-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2 px-1">
            <span className="text-xs font-bold text-[#a3c9a8] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Filter by Athletic Training Goal:' : 'تصفية حسب الهدف الرياضي:'}</span>
            </span>
            <span className="text-xs text-white/50">
              {lang === 'en' ? 'Click to filter menu items by macro profile' : 'اضغط للتصفية السريعة للوجبات'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'all', labelEn: 'All Meals', labelAr: 'جميع الوجبات', hint: 'Full Menu' },
              { id: 'high_protein', labelEn: 'High Protein (35g+)', labelAr: 'عالي البروتين (35غ+)', hint: 'Hypertrophy' },
              { id: 'low_carb', labelEn: 'Low Carb / Cut', labelAr: 'منخفض الكارب / تنشيف', hint: 'Under 25g Carbs' },
              { id: 'clean_bulk', labelEn: 'Clean Bulk (500+ kcal)', labelAr: 'ضخامة نظيفة', hint: 'Energy Reload' },
              { id: 'lean_cut', labelEn: 'Ultra Lean Fillets', labelAr: 'فيليه صافي قليل الدهن', hint: 'Low Fat' },
            ].map((goal) => {
              const active = currentGoal === goal.id;
              return (
                <button
                  key={goal.id}
                  onClick={() => onSelectGoal(goal.id as DietGoal)}
                  className={`px-3 py-2 text-left rounded-lg transition-all border text-xs font-medium cursor-pointer ${
                    active
                      ? 'bg-[#1b3b2b] text-white border-[#a3c9a8] shadow-sm'
                      : 'bg-[#183325]/50 text-white/70 border-transparent hover:bg-[#183325] hover:text-white'
                  }`}
                >
                  <div className="font-bold text-white whitespace-nowrap truncate">
                    {lang === 'en' ? goal.labelEn : goal.labelAr}
                  </div>
                  <div className="text-[10px] text-[#a3c9a8]/80 font-mono mt-0.5">
                    {goal.hint}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

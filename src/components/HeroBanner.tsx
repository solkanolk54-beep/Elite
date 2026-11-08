import React from 'react';
import { 
  ShieldCheck, 
  Dumbbell, 
  Sparkles, 
  ChevronRight, 
  Scale, 
  Clock, 
  MapPin, 
  Calculator, 
  Phone, 
  MessageCircle, 
  Briefcase,
  Target
} from 'lucide-react';
import { DietGoal } from '../types/menu';

interface HeroBannerProps {
  lang: 'en' | 'ar';
  currentGoal: DietGoal;
  onSelectGoal: (goal: DietGoal) => void;
  onOpenHowToRead: () => void;
  onOpenSheetViewer: () => void;
  onOpenFoodCost?: () => void;
  onOpenMacroEstimator?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  lang,
  currentGoal,
  onSelectGoal,
  onOpenHowToRead,
  onOpenSheetViewer,
  onOpenFoodCost,
  onOpenMacroEstimator,
}) => {
  const whatsappNumber = '213555000000';
  const whatsappText = encodeURIComponent(
    lang === 'en'
      ? 'Salam Elite Healthy Food (Mila). I would like to order macro-calculated meals.'
      : 'سلام إيليت فود ميلة (Healthy_Brunchy Sol+). أود الاستفسار وطلب وجبات صحية محسوبة الماكروز.'
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#102319] via-[#0c1912] to-[#0c1912] border-b border-[#a3c9a8]/15 pt-8 pb-12 sm:pt-14 sm:pb-16">
      {/* Subtle background ambient graphic */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#88c999_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Main Brand & Proposition Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Location & Status Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#13281c] border border-[#88c999]/30 text-xs text-[#88c999]">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="font-semibold">
                  {lang === 'en' ? 'Cité Ben Aazouz (El Kamounia), Mila' : 'حي بن عزوز (الكمونية) - ميلة'}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#163824]/90 border border-emerald-500/40 text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-medium">
                  {lang === 'en' ? 'Open for Delivery & Pickup' : 'مفتوح للطلبات والتوصيل'}
                </span>
              </div>

              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-950/40 border border-[#d4af37]/40 text-xs text-[#d4af37]">
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                <span className="font-semibold">Healthy_Brunchy Sol+</span>
              </div>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-heading leading-tight max-w-2xl text-balance">
              {lang === 'en' ? (
                <>
                  Precision Macros. <br />
                  <span className="text-[#88c999]">Pure Athletic Dining</span> In Mila.
                </>
              ) : (
                <>
                  تغذية دقيقة بالماكروز. <br />
                  <span className="text-[#88c999]">أداء رياضي نقي</span> في كل وجبة بميلة.
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="mt-3.5 text-sm sm:text-base text-[#cbe0cf]/85 max-w-xl leading-relaxed">
              {lang === 'en'
                ? 'Engineered for athletes, bodybuilders, and busy professionals in Mila. Every meal features lab-calculated calories, protein, carbs, healthy fats, and a 200g custom healthy carb selector.'
                : 'مصممة خصيصاً للرياضيين وأبطال كمال الأجسام وأصحاب الأعمال في ميلة. كل وجبة تأتيك بحساب دقيق للسعرات، البروتين، الكاربوهيدرات والدهون الصحية مع 200غ كارب مخصص.'}
            </p>

            {/* Market Recalibration Badge */}
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#183325]/80 border border-emerald-500/30 text-xs text-[#a3c9a8]">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>
                {lang === 'en'
                  ? 'Costing Calibrated: Chicken 800 DA · Beef 3,000 DA · Basmati Rice 360 DA · Bulgur 300 DA · Veggies 180-230 DA'
                  : 'تدقيق شامل للتكاليف: دجاج 800 دج · لحم 3000 دج · أرز بسمتي 360 دج · برغل 300 دج · خضار 180-230 دج'}
              </span>
            </div>

            {/* CTA and Action Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              
              {/* Explore Menu */}
              <a
                href="#menu-section"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-[#0c1912] bg-[#88c999] hover:bg-[#a3c9a8] rounded-lg shadow-md transition-all font-heading tracking-wide cursor-pointer"
              >
                <span>{lang === 'en' ? 'Explore Digital Menu' : 'استعراض قائمة الطعام'}</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              {/* Personal Macro Estimator Trigger */}
              {onOpenMacroEstimator && (
                <button
                  onClick={onOpenMacroEstimator}
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#1b3b2b] hover:bg-[#244f39] border border-[#d4af37]/60 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Target className="w-4 h-4 text-[#d4af37]" />
                  <span>{lang === 'en' ? 'Calculate My Macros' : 'احسب ماكروز جسمك'}</span>
                </button>
              )}

              {/* Quick WhatsApp Order */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#165b33] hover:bg-[#1a6e3e] border border-emerald-400/40 rounded-lg transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>{lang === 'en' ? 'WhatsApp Order' : 'طلب واتساب'}</span>
              </a>

              {/* Direct Call */}
              <a
                href="tel:0555000000"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs sm:text-sm font-medium text-white/90 bg-[#13271c] hover:bg-[#1a3526] border border-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">{lang === 'en' ? 'Call' : 'اتصال'}</span>
              </a>

              {/* Costing Engine */}
              {onOpenFoodCost && (
                <button
                  onClick={onOpenFoodCost}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#88c999] bg-[#102319] hover:bg-[#183325] border border-[#88c999]/30 rounded-lg transition-colors cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#88c999]" />
                  <span className="hidden sm:inline">{lang === 'en' ? 'Costing' : 'التكاليف'}</span>
                </button>
              )}

              {/* How to Read Macros */}
              <button
                onClick={onOpenHowToRead}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs sm:text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <Scale className="w-3.5 h-3.5 text-[#88c999]" />
                <span className="underline underline-offset-4 decoration-[#88c999]/40 hover:decoration-[#88c999]">
                  {lang === 'en' ? 'Guide' : 'الدليل'}
                </span>
              </button>
            </div>

            {/* Key performance highlights */}
            <div className="mt-7 pt-5 border-t border-[#a3c9a8]/10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#88c999]">
              <div className="flex items-center gap-1.5 text-white/90">
                <ShieldCheck className="w-3.5 h-3.5 text-[#88c999]" />
                <span>Zero Seed Oils (EVOO Only)</span>
              </div>
              <span aria-hidden="true" className="text-white/20">·</span>
              <div className="flex items-center gap-1.5 text-white/90">
                <Dumbbell className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Up to 63g Protein / Box</span>
              </div>
              <span aria-hidden="true" className="text-white/20">·</span>
              <div className="flex items-center gap-1.5 text-white/90">
                <Scale className="w-3.5 h-3.5 text-[#88c999]" />
                <span>200g Fixed Carb Customizer</span>
              </div>
              <span aria-hidden="true" className="text-white/20">·</span>
              <div className="flex items-center gap-1.5 text-white/90">
                <Clock className="w-3.5 h-3.5 text-[#88c999]" />
                <span>Fast Gym Drop-Off in Mila</span>
              </div>
            </div>

          </div>

          {/* Brand Showcase Right Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#a3c9a8]/25 bg-[#12281c] shadow-2xl p-5 flex flex-col items-center text-center">
              
              {/* Actual brand emblem from assets */}
              <div className="w-full max-w-[260px] sm:max-w-[300px] rounded-xl overflow-hidden border border-[#a3c9a8]/30 shadow-lg relative bg-[#1b3b2b]">
                <img
                  src="/assets/aistudio/1794091301776_ddd72469.jpg"
                  alt="Elite Healthy Food by Healthy_Brunchy Sol+ Menu Cover"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Brand tagline beneath image */}
              <div className="mt-3.5">
                <p className="text-sm font-bold text-white uppercase tracking-wider">
                  Mila Healthy Dining HQ
                </p>
                <p className="text-xs text-[#88c999] font-script text-base mt-0.5">
                  by Healthy_Brunchy Sol+
                </p>
                <p className="text-[11px] text-[#d4af37] font-medium mt-1">
                  {lang === 'en' ? 'Cité Ben Aazouz (El Kamounia) · Mila' : 'حي بن عزوز (الكمونية) · ميلة'}
                </p>
              </div>

              {/* Mini quick-macro card */}
              <div className="mt-3 w-full bg-[#0a1810]/90 border border-[#a3c9a8]/20 rounded-xl p-3 text-left">
                <div className="flex items-center justify-between text-xs text-white/70 mb-2">
                  <span className="font-semibold text-[#88c999]">Standard Meal Composition</span>
                  <span className="font-mono text-white/90">200g Carb + Protein</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-[#13281c] p-2 rounded border border-[#a3c9a8]/10">
                    <span className="text-[10px] text-white/50 block">KCAL</span>
                    <span className="font-mono font-bold text-white tabular-nums">350-650</span>
                  </div>
                  <div className="bg-[#13281c] p-2 rounded border border-[#a3c9a8]/10">
                    <span className="text-[10px] text-[#88c999] block">PROTEIN</span>
                    <span className="font-mono font-bold text-[#88c999] tabular-nums">35-63g</span>
                  </div>
                  <div className="bg-[#13281c] p-2 rounded border border-[#a3c9a8]/10">
                    <span className="text-[10px] text-white/50 block">CARBS</span>
                    <span className="font-mono font-bold text-white tabular-nums">30-65g</span>
                  </div>
                  <div className="bg-[#13281c] p-2 rounded border border-[#a3c9a8]/10">
                    <span className="text-[10px] text-white/50 block">FATS</span>
                    <span className="font-mono font-bold text-white tabular-nums">1-15g</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Athletic Goals Segmented Filter Bar */}
        <div className="mt-10 p-3 sm:p-4 bg-[#12281c] border border-[#a3c9a8]/25 rounded-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 px-1">
            <span className="text-xs font-bold text-[#88c999] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{lang === 'en' ? 'Fitness Goal Selector:' : 'اختر هدفك الرياضي والغذائي:'}</span>
            </span>
            <span className="text-xs text-white/60">
              {lang === 'en' ? 'Click to filter meals by goal' : 'اضغط لعرض الوجبات المطابقة لهدفك'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { 
                id: 'all', 
                icon: '🌟',
                labelEn: 'All Meals', 
                labelAr: 'جميع الوجبات', 
                hint: 'Full Menu (68 items)' 
              },
              { 
                id: 'bulking', 
                icon: '🏋️',
                labelEn: 'Bulking (ضخامة عضلية)', 
                labelAr: 'ضخامة عضلية', 
                hint: 'High Protein & Carb' 
              },
              { 
                id: 'cutting', 
                icon: '✂️',
                labelEn: 'Cutting (تنشيف)', 
                labelAr: 'تنشيف وحرق دهون', 
                hint: 'Lean Protein & Low Fat' 
              },
              { 
                id: 'employee', 
                icon: '💼',
                labelEn: 'Clean Employee Meals', 
                labelAr: 'طاقة الموظفين', 
                hint: 'Balanced & Easy Digest' 
              },
            ].map((goal) => {
              const active = currentGoal === goal.id;
              return (
                <button
                  key={goal.id}
                  onClick={() => onSelectGoal(goal.id as DietGoal)}
                  className={`p-3 text-left rounded-xl transition-all border text-xs cursor-pointer ${
                    active
                      ? 'bg-[#1b3b2b] text-white border-[#88c999] ring-1 ring-[#88c999] shadow-md'
                      : 'bg-[#0a1810] text-white/70 border-white/10 hover:bg-[#152e20] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{goal.icon}</span>
                    <span className="font-bold text-white whitespace-nowrap truncate">
                      {lang === 'en' ? goal.labelEn : goal.labelAr}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#88c999]/90 font-mono mt-1">
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

import React from 'react';
import { X, Flame, ShieldAlert, Dumbbell, Wheat, Scale, Sparkles, CheckCircle2 } from 'lucide-react';

interface HowToReadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'ar';
}

export const HowToReadModal: React.FC<HowToReadModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl my-6 bg-[#13271c] border border-[#a3c9a8]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0c1912] border-b border-[#a3c9a8]/20 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#a3c9a8] uppercase tracking-wider mb-1">
              <span>Elite Nutritional Standard</span>
              <span aria-hidden="true">·</span>
              <span>Healthy_Brunchy Sol+</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
              {lang === 'en' ? 'How To Read The Menu' : 'كيفية قراءة ألمنيو'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white bg-[#183325] hover:bg-[#1e3f2e] rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Top banner visual representation */}
          <div className="p-4 rounded-xl bg-[#0c1912] border border-[#a3c9a8]/20 flex flex-col items-center text-center">
            <span className="text-xs uppercase tracking-widest text-[#a3c9a8] font-bold">
              The 5 Precision Pillars
            </span>
            <p className="text-xs text-white/70 mt-1 max-w-md">
              {lang === 'en'
                ? 'Every row on our menu table provides 5 exact measurements so you can track your nutrition with 100% precision:'
                : 'كل سطر في جدول المنيو يوفر 5 مؤشرات دقيقة لتتبع نظامك الغذائي بدون أي تخمين:'}
            </p>
          </div>

          {/* 5 Macro Cards corresponding to official iconography */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* 1. KCAL */}
            <div className="p-3.5 rounded-xl bg-[#183325] border border-[#a3c9a8]/20 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0c1912] border border-[#a3c9a8]/30 flex items-center justify-center shrink-0 text-[#f59e0b]">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase font-heading">
                    KCAL / السعرات
                  </span>
                  <span className="text-[10px] text-white/50 font-mono">Energy Unit</span>
                </div>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  {lang === 'en'
                    ? 'Total biological energy provided by the meal, factoring in clean proteins and complex carbs.'
                    : 'الطاقة الحيوية الكلية المحسوبة للوجبة، وتعتمد على البروتين الصافي والدهون والكارب النظيف.'}
                </p>
              </div>
            </div>

            {/* 2. Healthy Fats */}
            <div className="p-3.5 rounded-xl bg-[#183325] border border-[#a3c9a8]/20 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0c1912] border border-[#a3c9a8]/30 flex items-center justify-center shrink-0 text-[#10b981]">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase font-heading">
                    FATS / دهون صحية
                  </span>
                  <span className="text-[10px] text-white/50 font-mono">Grams (g)</span>
                </div>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  {lang === 'en'
                    ? 'Natural essential fatty acids (extra virgin olive oil, nuts, avocados). Zero hydrogenated seed oils.'
                    : 'دهون غير مشبعة ومفيدة لصحة الهرمونات والقلب من زيت الزيتون والمكسرات الطبيعية بدون زيوت مهدرجة.'}
                </p>
              </div>
            </div>

            {/* 3. Muscle Protein */}
            <div className="p-3.5 rounded-xl bg-[#183325] border border-[#a3c9a8]/20 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0c1912] border border-[#a3c9a8]/40 flex items-center justify-center shrink-0 text-[#a3c9a8]">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#a3c9a8] uppercase font-heading">
                    PROTEIN / بروتين
                  </span>
                  <span className="text-[10px] text-[#a3c9a8] font-mono">Key Metric</span>
                </div>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  {lang === 'en'
                    ? 'High-bioavailability protein derived from freshly grilled poultry, prime beef, and seafood.'
                    : 'بروتين حيواني نقي سريع الامتصاص لبناء الألياف العضلية والاستشفاء من الدجاج الطازج واللحم البقري.'}
                </p>
              </div>
            </div>

            {/* 4. Clean Carbs */}
            <div className="p-3.5 rounded-xl bg-[#183325] border border-[#a3c9a8]/20 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0c1912] border border-[#a3c9a8]/30 flex items-center justify-center shrink-0 text-[#38bdf8]">
                <Wheat className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase font-heading">
                    CARBS / كاربيز
                  </span>
                  <span className="text-[10px] text-white/50 font-mono">Grams (g)</span>
                </div>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  {lang === 'en'
                    ? 'Complex slow-burning carbohydrates for sustained athletic stamina and glycogen fullness.'
                    : 'كاربوهيدرات معقدة بطيئة الامتصاص تمد الجسم بالطاقة المستمرة لتمارين القوة والتحمل.'}
                </p>
              </div>
            </div>

            {/* 5. Scale Weight */}
            <div className="p-3.5 rounded-xl bg-[#183325] border border-[#a3c9a8]/20 flex items-start gap-3 sm:col-span-2">
              <div className="w-9 h-9 rounded-lg bg-[#0c1912] border border-[#a3c9a8]/30 flex items-center justify-center shrink-0 text-white">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase font-heading">
                    WEIGHT / الجرامات
                  </span>
                  <span className="text-[10px] text-white/50 font-mono">Kitchen Scale Precision</span>
                </div>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  {lang === 'en'
                    ? 'Accurate portion weight (e.g. 100g, 150g, 200g, 250g, or skewer count) weighed post-cook in our Mila kitchen.'
                    : 'وزن الحصة الفعلي (100غ، 150غ، 200غ، 250غ أو عدد الأسياخ) موزون بدقة بميزان المطبخ الرقمي.'}
                </p>
              </div>
            </div>

          </div>

          {/* Official Rule Callout from Menu Card */}
          <div className="p-4 rounded-xl bg-[#0c1912] border border-[#a3c9a8]/30">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#a3c9a8] shrink-0 mt-0.5" />
              <div className="space-y-2 text-xs">
                <p className="font-bold text-white">
                  {lang === 'en' ? 'The Protein + 200g Carb Customizer Rule:' : 'قاعدة البروتين + 200غ كارب الصحي:'}
                </p>
                <p className="text-white/80 leading-relaxed">
                  {lang === 'en'
                    ? 'In the Chicken, Beef, Burger, and Shawarma sections, the values printed on the menu calculate the protein section only. When ordering, you can optionally select any healthy carb source from our 10 options (each provided in a standard 200g portion), and our digital system automatically sums the total combined macros!'
                    : 'قيم الوجبات داخل أقسام (الدجاج، الشاورما، اللحم، والبرجر) محسوبة لحصة البروتين فقط. يمكنك اختيار أحد خيارات الكارب الصحية العشرة (حصة ثابتة 200غ)، ونظامنا الرقمي يحسب المجموع الكلي للماكروز مباشرة وبكل دقة!'}
                </p>
              </div>
            </div>
          </div>

          {/* Scanned menu card preview */}
          <div className="rounded-xl overflow-hidden border border-[#a3c9a8]/20 bg-[#0c1912] p-2 text-center">
            <span className="text-[11px] text-[#a3c9a8] font-mono block mb-2">
              Original Printed Guide Sheet Scan:
            </span>
            <img
              src="/assets/aistudio/1794091353349_6d90da71.jpg"
              alt="How to read the menu official scan"
              className="w-full max-w-md mx-auto rounded-lg shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#0c1912] border-t border-[#a3c9a8]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#a3c9a8] hover:bg-[#bfe2c4] text-[#0c1912] font-heading font-black text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            {lang === 'en' ? 'Understood, Let\'s Order' : 'فهمت، ابدأ الطلب'}
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Check, Dumbbell, Flame, Wheat, Scale, Plus, Minus } from 'lucide-react';
import { CarbOption, MenuItem, MacroNutrients } from '../types/menu';
import { CARB_OPTIONS } from '../data/menuData';

interface CarbCustomizerModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, selectedCarb: CarbOption | null, quantity: number, note: string) => void;
  lang: 'en' | 'ar';
}

export const CarbCustomizerModal: React.FC<CarbCustomizerModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
  lang,
}) => {
  if (!isOpen || !item) return null;

  // Default to White Basmati Rice
  const [selectedCarbId, setSelectedCarbId] = useState<string>('white_basmati');
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>('');

  const selectedCarb = CARB_OPTIONS.find((c) => c.id === selectedCarbId) || null;

  // Calculate live combined macros
  const calculatedMacros: MacroNutrients = {
    calories: item.macros.calories + (selectedCarb ? selectedCarb.macros.calories : 0),
    protein: Math.round((item.macros.protein + (selectedCarb ? selectedCarb.macros.protein : 0)) * 10) / 10,
    carbs: Math.round((item.macros.carbs + (selectedCarb ? selectedCarb.macros.carbs : 0)) * 10) / 10,
    fats: Math.round((item.macros.fats + (selectedCarb ? selectedCarb.macros.fats : 0)) * 10) / 10,
  };

  const totalCaloriesFromMacros = (calculatedMacros.protein * 4) + (calculatedMacros.carbs * 4) + (calculatedMacros.fats * 9);
  const proteinPercent = totalCaloriesFromMacros > 0 ? Math.round(((calculatedMacros.protein * 4) / totalCaloriesFromMacros) * 100) : 0;
  const carbsPercent = totalCaloriesFromMacros > 0 ? Math.round(((calculatedMacros.carbs * 4) / totalCaloriesFromMacros) * 100) : 0;
  const fatsPercent = totalCaloriesFromMacros > 0 ? Math.round(((calculatedMacros.fats * 9) / totalCaloriesFromMacros) * 100) : 0;

  const handleConfirm = () => {
    onAddToCart(item, selectedCarb, quantity, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl my-6 bg-[#13271c] border border-[#a3c9a8]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#0c1912] border-b border-[#a3c9a8]/20 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#a3c9a8] uppercase tracking-wider mb-1">
              <span>{lang === 'en' ? 'Carb Customization Engine' : 'محرك تخصيص الكاربوهيدرات'}</span>
              <span aria-hidden="true">·</span>
              <span>200g Fixed Portion</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
              {lang === 'en' ? item.nameEn : item.nameAr}
            </h2>
            <div className="flex items-center gap-2 text-xs text-[#cbe0cf]/70 mt-1">
              <span>{lang === 'en' ? `Base Protein: ${item.weight}` : `البروتين الأساسي: ${item.weight}`}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-white font-bold">{item.priceDZD} DZD</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white bg-[#183325] hover:bg-[#1e3f2e] rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Macro Dashboard Strip */}
        <div className="bg-[#183325] border-b border-[#a3c9a8]/20 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#a3c9a8]">
              {lang === 'en' ? 'Live Calculated Macro Breakdown' : 'المحصلة الغذائية اللحظية (لحم + كارب)'}
            </span>
            <span className="text-xs text-white/70">
              {item.weight} + {selectedCarb ? '200g Carb' : '0g Carb'}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-[#0c1912]/80 p-2.5 rounded-lg border border-[#a3c9a8]/20">
              <span className="text-[10px] text-white/50 uppercase block font-semibold">Calories</span>
              <span className="text-base sm:text-lg font-mono font-black text-white tabular-nums">
                {calculatedMacros.calories}
              </span>
              <span className="text-[10px] text-white/40 block">kcal</span>
            </div>

            <div className="bg-[#0c1912]/80 p-2.5 rounded-lg border border-[#a3c9a8]/30">
              <span className="text-[10px] text-[#a3c9a8] uppercase block font-semibold">Protein</span>
              <span className="text-base sm:text-lg font-mono font-black text-[#a3c9a8] tabular-nums">
                {calculatedMacros.protein}g
              </span>
              <span className="text-[10px] text-[#a3c9a8]/70 block font-mono">{proteinPercent}%</span>
            </div>

            <div className="bg-[#0c1912]/80 p-2.5 rounded-lg border border-[#a3c9a8]/20">
              <span className="text-[10px] text-white/50 uppercase block font-semibold">Carbs</span>
              <span className="text-base sm:text-lg font-mono font-black text-white tabular-nums">
                {calculatedMacros.carbs}g
              </span>
              <span className="text-[10px] text-white/40 block font-mono">{carbsPercent}%</span>
            </div>

            <div className="bg-[#0c1912]/80 p-2.5 rounded-lg border border-[#a3c9a8]/20">
              <span className="text-[10px] text-white/50 uppercase block font-semibold">Fats</span>
              <span className="text-base sm:text-lg font-mono font-black text-white tabular-nums">
                {calculatedMacros.fats}g
              </span>
              <span className="text-[10px] text-white/40 block font-mono">{fatsPercent}%</span>
            </div>
          </div>

          {/* Caloric Distribution Progress Bar */}
          <div className="mt-2.5 w-full bg-[#0c1912] h-2 rounded-full overflow-hidden flex">
            <div 
              style={{ width: `${proteinPercent}%` }} 
              className="bg-[#a3c9a8] h-full transition-all duration-300" 
              title={`Protein: ${proteinPercent}%`} 
            />
            <div 
              style={{ width: `${carbsPercent}%` }} 
              className="bg-[#38bdf8] h-full transition-all duration-300" 
              title={`Carbs: ${carbsPercent}%`} 
            />
            <div 
              style={{ width: `${fatsPercent}%` }} 
              className="bg-[#f59e0b] h-full transition-all duration-300" 
              title={`Fats: ${fatsPercent}%`} 
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-white/60 mt-1 px-0.5">
            <span className="text-[#a3c9a8]">■ Protein ({proteinPercent}%)</span>
            <span className="text-[#38bdf8]">■ Carbs ({carbsPercent}%)</span>
            <span className="text-[#f59e0b]">■ Fats ({fatsPercent}%)</span>
          </div>
        </div>

        {/* Scrollable Carb Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
              {lang === 'en' ? 'Select Your Healthy Carb Source (200g portion):' : 'اختر مصدر الكاربوهيدرات الصحي (حصة ثابتة 200غ):'}
            </h3>
            <p className="text-xs text-[#cbe0cf]/70 mb-3">
              {lang === 'en'
                ? 'Select one of the 10 wholesome carbs listed on the official Elite Healthy Food menu:'
                : 'اختر أحد خيارات الكارب الصحية العشرة المعتمدة في منيو إيليت:'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              {/* Option: No Added Carb (Protein Only) */}
              <button
                type="button"
                onClick={() => setSelectedCarbId('none')}
                className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                  selectedCarbId === 'none'
                    ? 'bg-[#1b3b2b] border-[#a3c9a8] shadow-md ring-1 ring-[#a3c9a8]'
                    : 'bg-[#0c1912]/60 border-[#a3c9a8]/20 hover:bg-[#183325] text-white/80'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {lang === 'en' ? 'No Added Carb (Protein Only)' : 'بدون كارب مضاف (بروتين فقط)'}
                    </span>
                    <span className="text-[10px] text-[#a3c9a8] font-mono">Strict Cut / Keto</span>
                  </div>
                  <p className="text-[11px] text-white/60 mt-1">
                    {lang === 'en' ? 'Pure meat/poultry portion with 0 added carbohydrates.' : 'وجبة لحم أو دجاج صافية بدون أي كارب مضاف.'}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-white/60 font-mono mt-1.5">
                    <span>+0 kcal</span>
                    <span>·</span>
                    <span>+0g C</span>
                    <span>·</span>
                    <span>+0g P</span>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
                  selectedCarbId === 'none' ? 'bg-[#a3c9a8] border-[#a3c9a8] text-[#0c1912]' : 'border-white/30 text-transparent'
                }`}>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </button>

              {/* The 10 Official Carb Options from Menu */}
              {CARB_OPTIONS.map((carb) => {
                const isSelected = selectedCarbId === carb.id;
                return (
                  <button
                    key={carb.id}
                    type="button"
                    onClick={() => setSelectedCarbId(carb.id)}
                    className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                      isSelected
                        ? 'bg-[#1b3b2b] border-[#a3c9a8] shadow-md ring-1 ring-[#a3c9a8]'
                        : 'bg-[#0c1912]/60 border-[#a3c9a8]/20 hover:bg-[#183325] text-white/80'
                    }`}
                  >
                    <div className="pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {lang === 'en' ? carb.nameEn : carb.nameAr}
                        </span>
                        {carb.tag && (
                          <span className="text-[10px] text-[#a3c9a8] font-mono">
                            {carb.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-white/60 mt-0.5 leading-snug">
                        {lang === 'en' ? carb.descriptionEn : carb.descriptionAr}
                      </p>
                      
                      {/* Macro contributions */}
                      <div className="flex items-center gap-2 text-[11px] font-mono mt-2 text-[#cbe0cf]">
                        <span className="text-white font-bold">+{carb.macros.calories} kcal</span>
                        <span className="text-white/30">·</span>
                        <span>{carb.macros.carbs}g C</span>
                        <span className="text-white/30">·</span>
                        <span className="text-[#a3c9a8]">{carb.macros.protein}g P</span>
                        <span className="text-white/30">·</span>
                        <span>{carb.macros.fats}g F</span>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
                      isSelected ? 'bg-[#a3c9a8] border-[#a3c9a8] text-[#0c1912]' : 'border-white/30 text-transparent'
                    }`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kitchen / Athlete Notes */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5">
              {lang === 'en' ? 'Kitchen & Athlete Preparation Notes (Optional):' : 'ملاحظات التحضير للمطبخ والرياضي (اختياري):'}
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={
                lang === 'en'
                  ? 'e.g. Sauce on the side, extra lemon, training drop-off at 5:30 PM...'
                  : 'مثال: الصوص جانبي، ليمون إضافي، استلام قبل التمرين الساعة 5:30...'
              }
              className="w-full px-3.5 py-2.5 text-xs bg-[#0c1912] border border-[#a3c9a8]/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#a3c9a8] transition-colors"
            />
          </div>
        </div>

        {/* Modal Footer with Quantity and Add Button */}
        <div className="p-4 sm:p-5 bg-[#0c1912] border-t border-[#a3c9a8]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-xs text-white/70 font-semibold">
              {lang === 'en' ? 'Quantity:' : 'الكمية:'}
            </span>
            <div className="flex items-center bg-[#183325] border border-[#a3c9a8]/30 rounded-lg">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 text-sm font-mono font-bold text-white tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="text-right sm:hidden">
              <span className="text-xs text-white/60 block">Total</span>
              <span className="text-base font-mono font-black text-[#a3c9a8]">
                {item.priceDZD * quantity} DZD
              </span>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="hidden sm:block text-right">
              <span className="text-[11px] text-white/60 block">Calculated Total</span>
              <span className="text-lg font-mono font-black text-[#a3c9a8] tabular-nums">
                {item.priceDZD * quantity} DZD
              </span>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              className="w-full sm:w-auto px-6 py-3 bg-[#a3c9a8] hover:bg-[#bfe2c4] text-[#0c1912] font-heading font-black text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{lang === 'en' ? 'Add To Nutrition Tray' : 'إضافة إلى صينية الطلب'}</span>
              <span className="font-mono">({calculatedMacros.protein}g Protein)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

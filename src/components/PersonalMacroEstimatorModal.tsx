import React, { useState, useMemo } from 'react';
import { 
  X, 
  Calculator, 
  Dumbbell, 
  Flame, 
  Wheat, 
  Sparkles, 
  Check, 
  User, 
  Activity, 
  TrendingUp, 
  Target, 
  ArrowRight, 
  Droplet,
  ShoppingBag,
  Briefcase
} from 'lucide-react';
import { PersonalMacroProfile, PersonalMacroResult, MenuItem, CarbOption } from '../types/menu';
import { MENU_ITEMS, CARB_OPTIONS } from '../data/menuData';

interface PersonalMacroEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'ar';
  onApplyGoalFilter: (goal: 'bulking' | 'cutting' | 'employee') => void;
  onAddComboToCart: (items: { item: MenuItem; carb: CarbOption | null; quantity: number }[]) => void;
}

export const PersonalMacroEstimatorModal: React.FC<PersonalMacroEstimatorModalProps> = ({
  isOpen,
  onClose,
  lang,
  onApplyGoalFilter,
  onAddComboToCart,
}) => {
  if (!isOpen) return null;

  // Form State
  const [profile, setProfile] = useState<PersonalMacroProfile>({
    gender: 'male',
    age: 26,
    weightKg: 78,
    heightCm: 178,
    activityLevel: 'moderate',
    fitnessGoal: 'cutting',
  });

  const [comboAdded, setComboAdded] = useState(false);

  // Accurate BMR & TDEE calculation (Mifflin-St Jeor formula)
  const macroResults: PersonalMacroResult = useMemo(() => {
    const { gender, age, weightKg, heightCm, activityLevel, fitnessGoal } = profile;

    // Base BMR
    let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,    // Office / desk job
      light: 1.375,      // 1-3 gym days
      moderate: 1.55,    // 3-5 gym days
      athlete: 1.725,    // 6-7 intense bodybuilding / athletic days
    };

    const tdee = Math.round(bmr * activityMultipliers[activityLevel]);

    let targetCalories = tdee;
    let targetProtein = 0;
    let targetFats = 0;
    let targetCarbs = 0;
    let descriptionEn = '';
    let descriptionAr = '';

    if (fitnessGoal === 'cutting') {
      // Caloric deficit for fat loss while preserving lean mass
      targetCalories = Math.max(1400, tdee - 450);
      targetProtein = Math.round(weightKg * 2.2); // 2.2g/kg for cutting
      targetFats = Math.round(weightKg * 0.75); // ~0.75g/kg
      const proteinCalories = targetProtein * 4;
      const fatCalories = targetFats * 9;
      const remainingCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
      targetCarbs = Math.round(remainingCalories / 4);

      descriptionEn = 'High-protein, calorie-deficit plan to shed body fat while preserving lean muscle.';
      descriptionAr = 'خطة عجز حراري مدروس مع بروتين مرتفع (2.2غ/كغ) لحرق الدهون مع حماية الكتلة العضلية.';
    } else if (fitnessGoal === 'bulking') {
      // Hypertrophy surplus
      targetCalories = tdee + 400;
      targetProtein = Math.round(weightKg * 2.0); // 2.0g/kg
      targetFats = Math.round(weightKg * 0.9); // ~0.9g/kg
      const proteinCalories = targetProtein * 4;
      const fatCalories = targetFats * 9;
      const remainingCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
      targetCarbs = Math.round(remainingCalories / 4);

      descriptionEn = 'Clean caloric surplus paired with glycogen-reloading carbs for maximum hypertrophy.';
      descriptionAr = 'فائض سعرات نظيف مع كاربوهيدرات معقدة لملء مخازن الجليكوجين وبناء ألياف عضلية صافية.';
    } else {
      // Clean employee / maintenance
      targetCalories = tdee;
      targetProtein = Math.round(weightKg * 1.6);
      targetFats = Math.round((tdee * 0.25) / 9);
      const proteinCalories = targetProtein * 4;
      const fatCalories = targetFats * 9;
      const remainingCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
      targetCarbs = Math.round(remainingCalories / 4);

      descriptionEn = 'Balanced steady-energy nutrition for sharp cognitive focus and anti-fatigue.';
      descriptionAr = 'تغذية متوازنة لثبات سكر الدم والطاقة الدماغية طوال ساعات العمل والنشاط اليومي.';
    }

    // Recommended water intake (35-40ml per kg + workout bonus)
    const waterLiters = Math.round(((weightKg * 0.038) + (activityLevel === 'athlete' ? 1.0 : 0.5)) * 10) / 10;

    return {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      targetProtein,
      targetCarbs,
      targetFats,
      waterLiters,
      descriptionEn,
      descriptionAr,
    };
  }, [profile]);

  // Recommended meals from the menu matching the profile
  const recommendedCombo = useMemo(() => {
    let mainMeal: MenuItem | undefined;
    let secondMeal: MenuItem | undefined;
    let carb: CarbOption | undefined;

    if (profile.fitnessGoal === 'bulking') {
      // High protein + big carb: Chicken Fillet 200g or 250g + Basmati Rice with Nuts + Beef Shawarma
      mainMeal = MENU_ITEMS.find(m => m.id === 'chk-fillet-200') || MENU_ITEMS[1];
      secondMeal = MENU_ITEMS.find(m => m.id === 'shawarma-meal-chicken') || MENU_ITEMS[5];
      carb = CARB_OPTIONS.find(c => c.id === 'rice_nuts') || CARB_OPTIONS[0];
    } else if (profile.fitnessGoal === 'cutting') {
      // Pure lean chicken 150g or Steak with mushrooms + Veggie Bulgur + Healthy Samosa Box
      mainMeal = MENU_ITEMS.find(m => m.id === 'chk-fillet-150') || MENU_ITEMS[0];
      secondMeal = MENU_ITEMS.find(m => m.id === 'sandwich-fahita-chk') || MENU_ITEMS[4];
      carb = CARB_OPTIONS.find(c => c.id === 'veggie_bulgur') || CARB_OPTIONS[7];
    } else {
      // Employee: Clean burger or Chicken Fahita + Oven baked potatoes
      mainMeal = MENU_ITEMS.find(m => m.id === 'burger-chk-oven') || MENU_ITEMS[0];
      secondMeal = MENU_ITEMS.find(m => m.id === 'pastry-bagit-chk') || MENU_ITEMS[6];
      carb = CARB_OPTIONS.find(c => c.id === 'oven_fries') || CARB_OPTIONS[5];
    }

    const comboCalories = (mainMeal?.macros.calories || 0) + (carb?.macros.calories || 0) + (secondMeal?.macros.calories || 0);
    const comboProtein = Math.round(((mainMeal?.macros.protein || 0) + (carb?.macros.protein || 0) + (secondMeal?.macros.protein || 0)) * 10) / 10;
    const comboCarbs = Math.round(((mainMeal?.macros.carbs || 0) + (carb?.macros.carbs || 0) + (secondMeal?.macros.carbs || 0)) * 10) / 10;
    const comboPrice = (mainMeal?.priceDZD || 0) + (secondMeal?.priceDZD || 0);

    return {
      mainMeal,
      secondMeal,
      carb,
      comboCalories,
      comboProtein,
      comboCarbs,
      comboPrice,
    };
  }, [profile.fitnessGoal]);

  const handleAddCombo = () => {
    if (!recommendedCombo.mainMeal || !recommendedCombo.secondMeal) return;

    onAddComboToCart([
      {
        item: recommendedCombo.mainMeal,
        carb: recommendedCombo.carb || null,
        quantity: 1,
      },
      {
        item: recommendedCombo.secondMeal,
        carb: null,
        quantity: 1,
      },
    ]);

    setComboAdded(true);
    setTimeout(() => setComboAdded(false), 2500);
  };

  const handleApplyFilter = () => {
    onApplyGoalFilter(profile.fitnessGoal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl my-6 bg-[#0f2418] border border-[#a3c9a8]/35 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0a1810] border-b border-[#a3c9a8]/20 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1b3b2b] border border-[#a3c9a8]/30 text-[#a3c9a8]">
              <Calculator className="w-6 h-6 text-[#88c999]" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                <span>★ Athletic Intelligence Engine</span>
                <span aria-hidden="true">·</span>
                <span>Mila, Algeria</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                {lang === 'en' ? 'Personal Macro & TDEE Calculator' : 'حاسبة الماكروز والاحتياج اليومي للرياضيين'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white bg-[#152e20] hover:bg-[#1b3b2b] rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Top Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Left Inputs Column (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Gender and Age Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1.5">
                    {lang === 'en' ? 'Biological Sex' : 'الجنس'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setProfile({ ...profile, gender: 'male' })}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        profile.gender === 'male'
                          ? 'bg-[#1b3b2b] text-white border-[#88c999] shadow-sm'
                          : 'bg-[#0a1810] text-white/70 border-white/10 hover:bg-[#152e20]'
                      }`}
                    >
                      {lang === 'en' ? 'Male (ذكر)' : 'ذكر'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setProfile({ ...profile, gender: 'female' })}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        profile.gender === 'female'
                          ? 'bg-[#1b3b2b] text-white border-[#88c999] shadow-sm'
                          : 'bg-[#0a1810] text-white/70 border-white/10 hover:bg-[#152e20]'
                      }`}
                    >
                      {lang === 'en' ? 'Female (أنثى)' : 'أنثى'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1.5">
                    {lang === 'en' ? 'Age (Years)' : 'العمر (سنة)'}
                  </label>
                  <input
                    type="number"
                    min={15}
                    max={85}
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: Math.max(15, Number(e.target.value)) })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#0a1810] border border-[#a3c9a8]/30 rounded-lg text-white focus:outline-none focus:border-[#88c999]"
                  />
                </div>
              </div>

              {/* Weight and Height */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-white/80">
                      {lang === 'en' ? 'Bodyweight (kg)' : 'الوزن الحالي (كغ)'}
                    </label>
                    <span className="font-mono text-xs font-bold text-[#88c999]">{profile.weightKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min={45}
                    max={140}
                    step={1}
                    value={profile.weightKg}
                    onChange={(e) => setProfile({ ...profile, weightKg: Number(e.target.value) })}
                    className="w-full accent-[#88c999] h-2 bg-[#0a1810] rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/40 font-mono mt-0.5">
                    <span>45 kg</span>
                    <span>140 kg</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-white/80">
                      {lang === 'en' ? 'Height (cm)' : 'الطول (سم)'}
                    </label>
                    <span className="font-mono text-xs font-bold text-[#88c999]">{profile.heightCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min={145}
                    max={210}
                    step={1}
                    value={profile.heightCm}
                    onChange={(e) => setProfile({ ...profile, heightCm: Number(e.target.value) })}
                    className="w-full accent-[#88c999] h-2 bg-[#0a1810] rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/40 font-mono mt-0.5">
                    <span>145 cm</span>
                    <span>210 cm</span>
                  </div>
                </div>
              </div>

              {/* Activity Level Selector */}
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#88c999]" />
                  <span>{lang === 'en' ? 'Daily Activity Level' : 'مستوى النشاط البدني اليومي'}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'sedentary', labelEn: '💼 Desk Worker / Sedentary', labelAr: '💼 عمل مكتبي / قليل الحركة' },
                    { id: 'light', labelEn: '🚶 1-2 Days Light Gym', labelAr: '🚶 تمرين خفيف 1-2 أيام' },
                    { id: 'moderate', labelEn: '🏋️ 3-5 Days Gym Athlete', labelAr: '🏋️ رياضي منتظم 3-5 أيام' },
                    { id: 'athlete', labelEn: '⚡ Heavy Bodybuilder (6+ days)', labelAr: '⚡ تدريب شاق 6+ أيام' },
                  ].map((act) => (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setProfile({ ...profile, activityLevel: act.id as any })}
                      className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer ${
                        profile.activityLevel === act.id
                          ? 'bg-[#1b3b2b] text-white border-[#88c999]'
                          : 'bg-[#0a1810] text-white/70 border-white/10 hover:bg-[#152e20]'
                      }`}
                    >
                      {lang === 'en' ? act.labelEn : act.labelAr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Fitness Goal (Bulking, Cutting, Employee) */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{lang === 'en' ? 'Current Fitness Goal' : 'هدفك الرياضي الحالي'}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      id: 'cutting',
                      icon: '✂️',
                      nameEn: 'Cutting',
                      nameAr: 'تنشيف دهون',
                      badge: '-450 kcal',
                      border: 'hover:border-emerald-400',
                    },
                    {
                      id: 'employee',
                      icon: '💼',
                      nameEn: 'Clean Energy',
                      nameAr: 'طاقة الموظف',
                      badge: 'Balanced',
                      border: 'hover:border-teal-400',
                    },
                    {
                      id: 'bulking',
                      icon: '🏋️',
                      nameEn: 'Clean Bulk',
                      nameAr: 'ضخامة عضلية',
                      badge: '+400 kcal',
                      border: 'hover:border-amber-400',
                    },
                  ].map((goal) => {
                    const active = profile.fitnessGoal === goal.id;
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => setProfile({ ...profile, fitnessGoal: goal.id as any })}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer relative ${
                          active
                            ? 'bg-[#1b3b2b] text-white border-[#88c999] ring-1 ring-[#88c999] shadow-md'
                            : 'bg-[#0a1810] text-white/70 border-white/10 hover:bg-[#152e20]'
                        }`}
                      >
                        <span className="text-xl block mb-1">{goal.icon}</span>
                        <span className="block text-xs font-bold text-white">
                          {lang === 'en' ? goal.nameEn : goal.nameAr}
                        </span>
                        <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-[#88c999] font-mono">
                          {goal.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Output Dashboard (5 cols) */}
            <div className="md:col-span-5 bg-[#0a1810] border border-[#a3c9a8]/25 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              
              <div>
                <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                  <span>{lang === 'en' ? 'Calculated Daily Targets' : 'الهدف اليومي الدقيق لجسمك'}</span>
                  <span className="text-[10px] text-[#d4af37] font-semibold">Mifflin-St Jeor</span>
                </div>

                {/* Target Calories Big Display */}
                <div className="p-4 rounded-xl bg-[#13281c] border border-[#a3c9a8]/30 text-center mb-3">
                  <span className="text-xs text-white/70 block mb-1">
                    {lang === 'en' ? 'Daily Target Intake' : 'إجمالي السعرات اليومية المستهدفة'}
                  </span>
                  <div className="flex items-baseline justify-center gap-2">
                    <Flame className="w-6 h-6 text-amber-400" />
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight tabular-nums">
                      {macroResults.targetCalories}
                    </span>
                    <span className="text-sm font-bold text-[#88c999]">kcal/day</span>
                  </div>
                  <span className="text-[11px] text-white/50 block mt-1 font-mono">
                    BMR: {macroResults.bmr} kcal · TDEE: {macroResults.tdee} kcal
                  </span>
                </div>

                {/* 3 Macro Pillars Breakdown */}
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  {/* Protein */}
                  <div className="p-2.5 rounded-lg bg-[#183325] border border-[#88c999]/40">
                    <span className="text-[10px] text-[#88c999] font-bold block mb-0.5">
                      {lang === 'en' ? 'Protein' : 'بروتين صافي'}
                    </span>
                    <span className="text-lg font-black text-white font-mono tabular-nums">
                      {macroResults.targetProtein}g
                    </span>
                    <span className="text-[10px] text-white/50 block font-mono">
                      {profile.fitnessGoal === 'cutting' ? '2.2g/kg' : '2.0g/kg'}
                    </span>
                  </div>

                  {/* Carbs */}
                  <div className="p-2.5 rounded-lg bg-[#183325] border border-amber-500/20">
                    <span className="text-[10px] text-amber-400 font-bold block mb-0.5">
                      {lang === 'en' ? 'Clean Carbs' : 'كارب معقد'}
                    </span>
                    <span className="text-lg font-black text-white font-mono tabular-nums">
                      {macroResults.targetCarbs}g
                    </span>
                    <span className="text-[10px] text-white/50 block font-mono">Glycogen</span>
                  </div>

                  {/* Fats */}
                  <div className="p-2.5 rounded-lg bg-[#183325] border border-teal-500/20">
                    <span className="text-[10px] text-teal-400 font-bold block mb-0.5">
                      {lang === 'en' ? 'Healthy Fats' : 'دهون صحية'}
                    </span>
                    <span className="text-lg font-black text-white font-mono tabular-nums">
                      {macroResults.targetFats}g
                    </span>
                    <span className="text-[10px] text-white/50 block font-mono">Hormonal</span>
                  </div>
                </div>

                {/* Hydration Recommendation */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#13281c] border border-sky-500/20 text-xs">
                  <div className="flex items-center gap-2 text-sky-400">
                    <Droplet className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Hydration Target:' : 'احتياج الماء اليومي:'}</span>
                  </div>
                  <span className="font-mono font-bold text-white tabular-nums">
                    {macroResults.waterLiters} Liters/day
                  </span>
                </div>

                {/* Plan Summary Text */}
                <p className="mt-3 text-xs text-[#cbe0cf]/80 leading-relaxed bg-[#152e20]/50 p-2.5 rounded-lg border border-white/5">
                  {lang === 'en' ? macroResults.descriptionEn : macroResults.descriptionAr}
                </p>
              </div>

              {/* Action Button: Filter Menu by this Goal */}
              <button
                type="button"
                onClick={handleApplyFilter}
                className="w-full py-2.5 px-4 bg-[#1b3b2b] hover:bg-[#234f3a] border border-[#88c999]/50 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>
                  {lang === 'en'
                    ? `Filter Menu For ${profile.fitnessGoal.toUpperCase()}`
                    : `فلترة المنيو حسب هدف (${profile.fitnessGoal === 'bulking' ? 'الضخامة' : profile.fitnessGoal === 'cutting' ? 'التنشيف' : 'طاقة الموظفين'})`}
                </span>
                <ArrowRight className="w-4 h-4 text-[#88c999]" />
              </button>

            </div>

          </div>

          {/* Bottom Section: Recommended Elite Combo Matcher */}
          {recommendedCombo.mainMeal && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0a1810] border border-[#d4af37]/30 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <h3 className="text-sm font-bold text-white font-heading">
                    {lang === 'en' ? 'Recommended Elite Daily Meal Combo' : 'الوجبات المقترحة من منيو Elite لتغطية احتياجك'}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#88c999]">
                  <span>Fulfills ~{Math.round((recommendedCombo.comboProtein / macroResults.targetProtein) * 100)}% Protein Target</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Meal 1 */}
                <div className="p-3 rounded-xl bg-[#13281c] border border-[#88c999]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#88c999] uppercase font-bold tracking-wider block">
                      {lang === 'en' ? 'Main Meal (+200g Carb)' : 'الوجبة الرئيسية (+ 200غ كارب)'}
                    </span>
                    <span className="text-xs font-bold text-white block mt-0.5">
                      {lang === 'en' ? recommendedCombo.mainMeal.nameEn : recommendedCombo.mainMeal.nameAr}
                    </span>
                    {recommendedCombo.carb && (
                      <span className="text-[11px] text-white/60">
                        + {lang === 'en' ? recommendedCombo.carb.nameEn : recommendedCombo.carb.nameAr}
                      </span>
                    )}
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-xs font-black text-white block">
                      {recommendedCombo.mainMeal.priceDZD} DZD
                    </span>
                    <span className="text-[10px] text-[#88c999]">
                      {recommendedCombo.mainMeal.macros.protein + (recommendedCombo.carb?.macros.protein || 0)}g Protein
                    </span>
                  </div>
                </div>

                {/* Meal 2 */}
                {recommendedCombo.secondMeal && (
                  <div className="p-3 rounded-xl bg-[#13281c] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block">
                        {lang === 'en' ? 'Second Meal / Fuel' : 'الوجبة الثانية / سناك عالي البروتين'}
                      </span>
                      <span className="text-xs font-bold text-white block mt-0.5">
                        {lang === 'en' ? recommendedCombo.secondMeal.nameEn : recommendedCombo.secondMeal.nameAr}
                      </span>
                      <span className="text-[11px] text-white/60">
                        {recommendedCombo.secondMeal.weight}
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-xs font-black text-white block">
                        {recommendedCombo.secondMeal.priceDZD} DZD
                      </span>
                      <span className="text-[10px] text-[#88c999]">
                        {recommendedCombo.secondMeal.macros.protein}g Protein
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Combo Summary Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-xs font-mono text-white/80">
                  <span>Combo Total: <strong className="text-white">{recommendedCombo.comboCalories} kcal</strong></span>
                  <span>·</span>
                  <span>Protein: <strong className="text-[#88c999]">{recommendedCombo.comboProtein}g</strong></span>
                  <span>·</span>
                  <span>Total: <strong className="text-[#d4af37]">{recommendedCombo.comboPrice} DZD ({Math.round(recommendedCombo.comboPrice / 10)} ألف)</strong></span>
                </div>

                <button
                  type="button"
                  onClick={handleAddCombo}
                  disabled={comboAdded}
                  className="w-full sm:w-auto py-2 px-4 bg-[#88c999] hover:bg-[#a3c9a8] text-[#0a1810] font-black text-xs rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  {comboAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-900" />
                      <span>{lang === 'en' ? 'Added to Tray!' : 'تمت الإضافة للصينية!'}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{lang === 'en' ? 'Add Both Meals to Tray (1-Click)' : 'أضف الوجبتين للصينية بضغطة واحدة'}</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

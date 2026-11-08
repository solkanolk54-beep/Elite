import React, { useState } from 'react';
import { X, Calculator, TrendingUp, AlertCircle, ChefHat, Check, Wheat, ShieldCheck } from 'lucide-react';
import { DEFAULT_MARKET_PRICES } from '../data/menuData';
import { IngredientMarketPrices } from '../types/menu';

interface FoodCostModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'ar';
}

export const FoodCostModal: React.FC<FoodCostModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  // Local state for editable market ingredient prices
  const [prices, setPrices] = useState<IngredientMarketPrices>(DEFAULT_MARKET_PRICES);
  const [targetFoodCostPct, setTargetFoodCostPct] = useState<number>(38);
  const [selectedCarbSim, setSelectedCarbSim] = useState<'basmati' | 'bulgur' | 'potatoes'>('basmati');

  // Simulation calculations based on current market inputs:
  const chickenCostPerGram = prices.chickenPerKg / 1000;      // e.g. 800 / 1000 = 0.80 DZD/g
  const beefCostPerGram = prices.beefPerKg / 1000;            // e.g. 3000 / 1000 = 3.00 DZD/g
  const oilCostPerMl = prices.oliveOilPerLiter / 1000;         // e.g. 1000 / 1000 = 1.00 DZD/ml
  const potatoCostPerGram = prices.potatoesPerKg / 1000;      // e.g. 100 / 1000 = 0.10 DZD/g
  const tomatoCostPerGram = prices.tomatoesPerKg / 1000;      // e.g. 200 / 1000 = 0.20 DZD/g
  const pepperCostPerGram = prices.peppersPerKg / 1000;       // e.g. 180 / 1000 = 0.18 DZD/g
  const basmatiCostPerGram = prices.basmatiRicePerKg / 1000;  // 360 / 1000 = 0.36 DZD/g
  const bulgurCostPerGram = prices.bulgurPerKg / 1000;        // 300 / 1000 = 0.30 DZD/g
  const veggiesMixCostPerGram = prices.veggiesMixPerKg / 1000;// 205 / 1000 = 0.205 DZD/g (180-230 DZD/kg)

  // Calculations for 200g cooked portion of each healthy carb:
  // 1) 200g Cooked Basmati: requires ~77g raw dry rice (yield factor 2.6x) + 5ml EVOO + spices
  const cost200gBasmati = Math.round((77 * basmatiCostPerGram) + (5 * oilCostPerMl) + 5); // ~38 DZD
  // 2) 200g Cooked Veggie Bulgur: requires ~60g raw bulgur (2.5x) + 50g fresh veggies + 5ml EVOO
  const cost200gBulgur = Math.round((60 * bulgurCostPerGram) + (50 * veggiesMixCostPerGram) + (5 * oilCostPerMl) + 4); // ~37 DZD
  // 3) 200g Oven Baked Potatoes: 200g fresh potatoes + 10ml EVOO + herbs
  const cost200gPotatoes = Math.round((200 * potatoCostPerGram) + (10 * oilCostPerMl) + 3); // ~33 DZD

  // Dynamic active carb cost based on selector
  const activeCarbCost = 
    selectedCarbSim === 'basmati' ? cost200gBasmati :
    selectedCarbSim === 'bulgur' ? cost200gBulgur : cost200gPotatoes;

  const packagingBoxAndCutlery = 50; // High-grade athlete meal box, bag, napkins, and cutlery

  // Benchmark meals cost calculations with exact carb integration
  const mealsSimulation = [
    {
      nameAr: 'فيليه صدر دجاج (150غ)',
      nameEn: 'Chicken Fillet (150g)',
      proteinGrams: 150,
      proteinType: 'chicken',
      rawProteinCost: 150 * chickenCostPerGram,
      oilAndSpices: 15 * oilCostPerMl + 10,
      carbCost: activeCarbCost,
      packagingCost: packagingBoxAndCutlery,
      currentMenuPrice: 580,
    },
    {
      nameAr: 'فيليه صدر دجاج (200غ)',
      nameEn: 'Chicken Fillet (200g)',
      proteinGrams: 200,
      proteinType: 'chicken',
      rawProteinCost: 200 * chickenCostPerGram,
      oilAndSpices: 18 * oilCostPerMl + 10,
      carbCost: activeCarbCost,
      packagingCost: packagingBoxAndCutlery,
      currentMenuPrice: 690,
    },
    {
      nameAr: 'فيليه صدر دجاج (250غ)',
      nameEn: 'Chicken Fillet (250g)',
      proteinGrams: 250,
      proteinType: 'chicken',
      rawProteinCost: 250 * chickenCostPerGram,
      oilAndSpices: 20 * oilCostPerMl + 12,
      carbCost: activeCarbCost,
      packagingCost: packagingBoxAndCutlery,
      currentMenuPrice: 790,
    },
    {
      nameAr: 'فاهيتا دجاج (150غ + فلفل 180دج + طماطم 200دج)',
      nameEn: 'Chicken Fahita (150g + Peppers + Tomatoes)',
      proteinGrams: 150,
      proteinType: 'chicken',
      rawProteinCost: 150 * chickenCostPerGram,
      oilAndSpices: (20 * oilCostPerMl) + (40 * pepperCostPerGram) + (40 * tomatoCostPerGram) + 10,
      carbCost: activeCarbCost,
      packagingCost: packagingBoxAndCutlery,
      currentMenuPrice: 650,
    },
    {
      nameAr: 'فاهيتا لحم بقري (150غ لحم صافي 3000دج + فلفل + طماطم)',
      nameEn: 'Beef Fahita (150g Beef + Peppers + Tomatoes)',
      proteinGrams: 150,
      proteinType: 'beef',
      rawProteinCost: 150 * beefCostPerGram, // 450 DZD!
      oilAndSpices: (20 * oilCostPerMl) + (40 * pepperCostPerGram) + (40 * tomatoCostPerGram) + 10,
      carbCost: activeCarbCost,
      packagingCost: packagingBoxAndCutlery,
      currentMenuPrice: 1190,
    },
    {
      nameAr: 'ستيك لحم بصوص الفطر (150غ لحم بقري)',
      nameEn: 'Steak with Mushroom Sauce (150g Beef)',
      proteinGrams: 150,
      proteinType: 'beef',
      rawProteinCost: 150 * beefCostPerGram, // 450 DZD!
      oilAndSpices: (20 * oilCostPerMl) + 55, // fresh mushrooms & reduction
      carbCost: activeCarbCost,
      packagingCost: packagingBoxAndCutlery,
      currentMenuPrice: 1290,
    },
    {
      nameAr: 'كباب لحم بقري (3 أسياخ ~ 240غ لحم بقري صافي)',
      nameEn: 'Meat Kebab (3 Skewers ~ 240g Beef)',
      proteinGrams: 240,
      proteinType: 'beef',
      rawProteinCost: 240 * beefCostPerGram, // 720 DZD raw beef!
      oilAndSpices: (20 * oilCostPerMl) + 25,
      carbCost: activeCarbCost,
      packagingCost: packagingBoxAndCutlery,
      currentMenuPrice: 1690,
    },
    {
      nameAr: 'برجر فرن دجاج (120غ دجاج + جبن ريجيم 60دج)',
      nameEn: 'Chicken Oven Burger (+ Diet Cheese)',
      proteinGrams: 120,
      proteinType: 'chicken',
      rawProteinCost: 120 * chickenCostPerGram,
      oilAndSpices: (10 * oilCostPerMl) + (30 * tomatoCostPerGram) + prices.dietCheesePerPiece + 40,
      carbCost: cost200gPotatoes, // oven fries accompaniment
      packagingCost: 40,
      currentMenuPrice: 650,
    },
    {
      nameAr: 'برجر فرن لحم بقري (130غ لحم + جبن ريجيم 60دج)',
      nameEn: 'Oven Meat Burger (130g Beef + Diet Cheese)',
      proteinGrams: 130,
      proteinType: 'beef',
      rawProteinCost: 130 * beefCostPerGram, // 390 DZD!
      oilAndSpices: (10 * oilCostPerMl) + (30 * tomatoCostPerGram) + prices.dietCheesePerPiece + 40,
      carbCost: cost200gPotatoes,
      packagingCost: 40,
      currentMenuPrice: 1150,
    },
    {
      nameAr: 'صفيحة مفروم لحم بقري (عجين صحي + لحم)',
      nameEn: 'Minced Meat Patty (Beef Safiha)',
      proteinGrams: 50,
      proteinType: 'beef',
      rawProteinCost: 50 * beefCostPerGram, // 150 DZD!
      oilAndSpices: (10 * oilCostPerMl) + (25 * tomatoCostPerGram) + 25,
      carbCost: 0,
      packagingCost: 15,
      currentMenuPrice: 380,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl my-6 bg-[#13271c] border border-[#a3c9a8]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0c1912] border-b border-[#a3c9a8]/20 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1b3b2b] border border-[#a3c9a8]/40 flex items-center justify-center text-[#a3c9a8]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#a3c9a8] uppercase tracking-wider mb-0.5">
                <span>{lang === 'en' ? 'Kitchen Food Costing & Pricing Engine' : 'محرك حساب تكلفة الوجبات وهوامش الربح'}</span>
                <span aria-hidden="true">·</span>
                <span>Mila Market Live Data (Protein + Carbs + Veggies)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                {lang === 'en' ? 'Menu Rebuilding Economics' : 'دراسة شاملة لتكاليف البروتين والكاربوهيدرات والخضار'}
              </h2>
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

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Baseline Market Ingredients Strip (10 Items) */}
          <div className="bg-[#0c1912]/80 border border-[#a3c9a8]/20 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#a3c9a8] flex items-center gap-2">
                <ChefHat className="w-4 h-4" />
                {lang === 'en' ? 'Verified Raw Market Costs (Mila, Algeria)' : 'الأسعار المرجعية لجميع المواد الخام المدخلة في الحساب (ولاية ميلة)'}
              </span>
              <span className="text-xs text-white/60 font-mono">بيانات محدثة</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              
              {/* Chicken */}
              <div className="bg-[#183325] p-2.5 rounded-lg border border-[#a3c9a8]/20">
                <span className="text-[11px] text-white/60 block font-medium">صدر دجاج نقي</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-base font-black font-mono text-white">{prices.chickenPerKg}</span>
                  <span className="text-[10px] text-white/60">دج/كغ</span>
                </div>
                <span className="text-[9px] text-[#a3c9a8] block mt-0.5">0.80 دج / غرام</span>
              </div>

              {/* Beef */}
              <div className="bg-[#183325] p-2.5 rounded-lg border border-amber-500/30">
                <span className="text-[11px] text-amber-200 block font-medium">اللحم البقري</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-base font-black font-mono text-amber-300">{prices.beefPerKg}</span>
                  <span className="text-[10px] text-white/60">دج/كغ</span>
                </div>
                <span className="text-[9px] text-amber-400 block mt-0.5">3.00 دج / غرام</span>
              </div>

              {/* Basmati Rice */}
              <div className="bg-[#183325] p-2.5 rounded-lg border border-emerald-400/30">
                <span className="text-[11px] text-emerald-200 block font-medium">أرز بسمتي</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-base font-black font-mono text-emerald-300">{prices.basmatiRicePerKg}</span>
                  <span className="text-[10px] text-white/60">دج/كغ</span>
                </div>
                <span className="text-[9px] text-emerald-400 block mt-0.5">0.36 دج/غ جاف (200غ مطبوخ = ~38 دج)</span>
              </div>

              {/* Bulgur */}
              <div className="bg-[#183325] p-2.5 rounded-lg border border-emerald-400/30">
                <span className="text-[11px] text-emerald-200 block font-medium">البرغل</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-base font-black font-mono text-emerald-300">{prices.bulgurPerKg}</span>
                  <span className="text-[10px] text-white/60">دج/كغ</span>
                </div>
                <span className="text-[9px] text-emerald-400 block mt-0.5">0.30 دج/غ جاف (200غ مطبوخ = ~37 دج)</span>
              </div>

              {/* Mixed Veggies */}
              <div className="bg-[#183325] p-2.5 rounded-lg border border-emerald-400/30">
                <span className="text-[11px] text-emerald-200 block font-medium">الخضار المشكلة</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-base font-black font-mono text-emerald-300">180 - 230</span>
                  <span className="text-[10px] text-white/60">دج/كغ</span>
                </div>
                <span className="text-[9px] text-emerald-400 block mt-0.5">متوسط 205 دج (0.20 دج/غ)</span>
              </div>

              {/* Potatoes */}
              <div className="bg-[#183325] p-2.5 rounded-lg border border-[#a3c9a8]/20">
                <span className="text-[11px] text-white/60 block font-medium">البطاطا</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-base font-black font-mono text-white">{prices.potatoesPerKg}</span>
                  <span className="text-[10px] text-white/60">دج/كغ</span>
                </div>
                <span className="text-[9px] text-[#a3c9a8] block mt-0.5">0.10 دج / غرام</span>
              </div>

              {/* Olive Oil */}
              <div className="bg-[#183325] p-2.5 rounded-lg border border-[#a3c9a8]/20">
                <span className="text-[11px] text-white/60 block font-medium">زيت زيتون بكر</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-base font-black font-mono text-white">{prices.oliveOilPerLiter}</span>
                  <span className="text-[10px] text-white/60">دج/لتر</span>
                </div>
                <span className="text-[9px] text-[#a3c9a8] block mt-0.5">1.00 دج / مل</span>
              </div>

              {/* Tomatoes */}
              <div className="bg-[#183325] p-2.5 rounded-lg border border-[#a3c9a8]/20">
                <span className="text-[11px] text-white/60 block font-medium">الطماطم</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-base font-black font-mono text-white">{prices.tomatoesPerKg}</span>
                  <span className="text-[10px] text-white/60">دج/كغ</span>
                </div>
                <span className="text-[9px] text-[#a3c9a8] block mt-0.5">0.20 دج / غرام</span>
              </div>

              {/* Peppers */}
              <div className="bg-[#183325] p-2.5 rounded-lg border border-[#a3c9a8]/20">
                <span className="text-[11px] text-white/60 block font-medium">الفلفل</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-base font-black font-mono text-white">{prices.peppersPerKg}</span>
                  <span className="text-[10px] text-white/60">دج/كغ</span>
                </div>
                <span className="text-[9px] text-[#a3c9a8] block mt-0.5">0.18 دج / غرام</span>
              </div>

              {/* Diet Cheese */}
              <div className="bg-[#183325] p-2.5 rounded-lg border border-[#a3c9a8]/20">
                <span className="text-[11px] text-white/60 block font-medium">جبن ريجيم</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-base font-black font-mono text-white">{prices.dietCheesePerPiece}</span>
                  <span className="text-[10px] text-white/60">دج/قطعة</span>
                </div>
                <span className="text-[9px] text-[#a3c9a8] block mt-0.5">شريحة / علبة</span>
              </div>

            </div>
          </div>

          {/* Carb Costing Detail Card */}
          <div className="p-4 rounded-xl bg-[#183325]/80 border border-[#a3c9a8]/30 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#a3c9a8] flex items-center gap-1.5">
                  <Wheat className="w-4 h-4 text-emerald-400" />
                  حساب تكلفة حصة الكارب الصحي المرافقة (200غ مطبوخ) في كل وجبة
                </span>
                <p className="text-xs text-white/70 mt-0.5">
                  اختر نوع الكارب لتحديث حساب تكلفة الأطباق المرافقة أدناه تلقائياً:
                </p>
              </div>

              {/* Carb selector tabs */}
              <div className="flex items-center gap-1 bg-[#0c1912] p-1 rounded-lg border border-[#a3c9a8]/20 shrink-0">
                <button
                  onClick={() => setSelectedCarbSim('basmati')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    selectedCarbSim === 'basmati'
                      ? 'bg-[#a3c9a8] text-[#0c1912]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  أرز بسمتي ({cost200gBasmati} دج)
                </button>
                <button
                  onClick={() => setSelectedCarbSim('bulgur')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    selectedCarbSim === 'bulgur'
                      ? 'bg-[#a3c9a8] text-[#0c1912]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  برغل خضار ({cost200gBulgur} دج)
                </button>
                <button
                  onClick={() => setSelectedCarbSim('potatoes')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    selectedCarbSim === 'potatoes'
                      ? 'bg-[#a3c9a8] text-[#0c1912]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  بطاطا فرن ({cost200gPotatoes} دج)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1 border-t border-[#a3c9a8]/15">
              <div className="bg-[#0c1912]/60 p-2.5 rounded-lg border border-[#a3c9a8]/10">
                <strong className="text-white block font-bold mb-0.5">1. أرز بسمتي (360 دج/كغ)</strong>
                <p className="text-white/60 leading-relaxed">
                  الحصة 200غ مطبوخ تتطلب ~77غ أرز جاف (28 دج) + 5مل زيت زيتون (5 دج) وتوابل = <span className="text-emerald-400 font-bold font-mono">38 دج للطبق</span>.
                </p>
              </div>

              <div className="bg-[#0c1912]/60 p-2.5 rounded-lg border border-[#a3c9a8]/10">
                <strong className="text-white block font-bold mb-0.5">2. برغل خضار (300 دج/كغ)</strong>
                <p className="text-white/60 leading-relaxed">
                  الحصة تتطلب ~60غ برغل جاف (18 دج) + 50غ خضار طازجة (10 دج) وزيت زيتون = <span className="text-emerald-400 font-bold font-mono">37 دج للطبق</span>.
                </p>
              </div>

              <div className="bg-[#0c1912]/60 p-2.5 rounded-lg border border-[#a3c9a8]/10">
                <strong className="text-white block font-bold mb-0.5">3. بطاطا فرن (100 دج/كغ)</strong>
                <p className="text-white/60 leading-relaxed">
                  200غ بطاطا طازجة (20 دج) + 10مل زيت زيتون بكر وأعشاب بروفنسية (10 دج) = <span className="text-emerald-400 font-bold font-mono">33 دج للطبق</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Table of Simulated Meals */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#a3c9a8]" />
                {lang === 'en' ? 'Detailed Meal Cost Breakdown & Recommended Prices' : 'جدول التكلفة التفصيلية الشاملة (بروتين + كارب + خضار + زيت + تغليف)'}
              </h3>
              <span className="text-xs text-[#a3c9a8] font-medium">
                هدف نسبة التكلفة: {targetFoodCostPct}%
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#a3c9a8]/20 bg-[#0c1912]/60">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#183325] text-white/70 font-semibold border-b border-[#a3c9a8]/20">
                  <tr>
                    <th className="py-3 px-4 text-right">الوجبة والمكونات</th>
                    <th className="py-3 px-2 text-center">البروتين الصافي</th>
                    <th className="py-3 px-2 text-center text-emerald-300">الكارب (200غ)</th>
                    <th className="py-3 px-2 text-center">الخضار والزيت والتغليف</th>
                    <th className="py-3 px-2 text-center font-bold">إجمالي التكلفة (COGS)</th>
                    <th className="py-3 px-3 text-center text-[#a3c9a8]">سعر البيع (DZD)</th>
                    <th className="py-3 px-3 text-center text-white/90">بالسنتيم</th>
                    <th className="py-3 px-3 text-center text-emerald-400">هامش الربح</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#a3c9a8]/10 text-white/90">
                  {mealsSimulation.map((meal, idx) => {
                    const totalCost = Math.round(meal.rawProteinCost + meal.carbCost + meal.oilAndSpices + meal.packagingCost);
                    const sellingPrice = meal.currentMenuPrice;
                    const grossMargin = sellingPrice - totalCost;
                    const costPct = Math.round((totalCost / sellingPrice) * 100);
                    const isBeef = meal.proteinType === 'beef';

                    return (
                      <tr key={idx} className="hover:bg-[#183325]/40 transition-colors">
                        <td className="py-3 px-4 text-right font-medium">
                          <div className="text-white font-bold">{meal.nameAr}</div>
                          <div className="text-[10px] text-white/50">{meal.nameEn}</div>
                        </td>

                        <td className="py-3 px-2 text-center font-mono font-bold">
                          <span className={isBeef ? 'text-amber-300' : 'text-[#a3c9a8]'}>
                            {Math.round(meal.rawProteinCost)} دج
                          </span>
                          <span className="block text-[9px] text-white/40">({meal.proteinGrams}غ)</span>
                        </td>

                        <td className="py-3 px-2 text-center font-mono text-emerald-300 font-bold bg-[#183325]/40">
                          {Math.round(meal.carbCost)} دج
                          <span className="block text-[9px] text-white/40">
                            {meal.carbCost > 0 ? '200غ كارب' : 'سناك'}
                          </span>
                        </td>

                        <td className="py-3 px-2 text-center font-mono text-white/70">
                          {Math.round(meal.oilAndSpices + meal.packagingCost)} دج
                        </td>

                        <td className="py-3 px-2 text-center font-mono font-black text-white">
                          {totalCost} دج
                          <span className="block text-[9px] text-white/40">{costPct}% من السعر</span>
                        </td>

                        <td className="py-3 px-3 text-center font-mono font-black text-base text-[#a3c9a8]">
                          {sellingPrice} دج
                        </td>

                        <td className="py-3 px-3 text-center font-mono font-bold text-white/90 bg-[#183325]/50">
                          {Math.round(sellingPrice / 10)} ألف
                        </td>

                        <td className="py-3 px-3 text-center font-mono font-bold text-emerald-400">
                          +{grossMargin} دج
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Operating Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/70">
            <div className="p-4 rounded-xl bg-[#183325]/50 border border-[#a3c9a8]/15">
              <strong className="text-white block font-semibold mb-1 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#a3c9a8]" />
                دقة حساب حصة الكارب (200غ)
              </strong>
              تم حساب وزن الأرز البسمتي (360 دج/كغ) والبرغل (300 دج/كغ) والبطاطا (100 دج/كغ) وفق معادلة التمدد بالطهي (Cooking Yield Factor). الحصة 200غ تكلف المطبخ ما بين 33 إلى 38 دج شاملة زيت الزيتون البكر والتوابل.
            </div>

            <div className="p-4 rounded-xl bg-[#183325]/50 border border-[#a3c9a8]/15">
              <strong className="text-white block font-semibold mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#a3c9a8]" />
                الخضار الطازجة (180 - 230 دج/كغ)
              </strong>
              تدخل تشكيلة الخضار الطازجة في صوصات البيتزا، وتتبيلات الفاهيتا، وسلطات البرجر، وأرز الخضار وبرغل الخضار بمتوسط تكلفة 205 دج/كغ (0.20 دج للجرام).
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#0c1912] border-t border-[#a3c9a8]/20 flex items-center justify-between">
          <div className="text-xs text-white/60">
            تم إدراج تكلفة الكارب والخضار بالكامل ضمن حسابات الأسعار وصينية الطلبات.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#1b3b2b] hover:bg-[#234f3a] text-white border border-[#a3c9a8]/40 hover:border-[#a3c9a8] rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            {lang === 'en' ? 'Close & Return to Menu' : 'العودة إلى قائمة الطعام'}
          </button>
        </div>

      </div>
    </div>
  );
};

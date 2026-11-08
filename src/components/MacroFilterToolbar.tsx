import React from 'react';
import { Search, RotateCcw, Dumbbell, Flame, Sparkles, Target, Briefcase } from 'lucide-react';
import { CategoryId, DietGoal } from '../types/menu';
import { CATEGORIES } from '../data/menuData';

interface MacroFilterToolbarProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (id: CategoryId | 'all') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  minProtein: number;
  onMinProteinChange: (val: number) => void;
  maxCalories: number;
  onMaxCaloriesChange: (val: number) => void;
  currentGoal: DietGoal;
  onSelectGoal: (goal: DietGoal) => void;
  onOpenMacroEstimator?: () => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
  lang: 'en' | 'ar';
}

export const MacroFilterToolbar: React.FC<MacroFilterToolbarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  minProtein,
  onMinProteinChange,
  maxCalories,
  onMaxCaloriesChange,
  currentGoal,
  onSelectGoal,
  onOpenMacroEstimator,
  onResetFilters,
  totalFilteredCount,
  lang,
}) => {
  const isFilterActive = searchQuery !== '' || minProtein > 0 || maxCalories < 800 || selectedCategory !== 'all' || currentGoal !== 'all';

  return (
    <div className="bg-[#102319] border border-[#a3c9a8]/20 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl">
      
      {/* Fitness Goal Selectors Row */}
      <div className="mb-4 pb-4 border-b border-[#a3c9a8]/15">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2.5">
          <span className="text-xs font-bold text-[#88c999] uppercase tracking-wider flex items-center gap-1.5">
            <Target className="w-4 h-4 text-[#d4af37]" />
            <span>{lang === 'en' ? 'Quick Fitness Goal Filter:' : 'تصفية سريعة حسب الهدف الرياضي:'}</span>
          </span>

          {onOpenMacroEstimator && (
            <button
              onClick={onOpenMacroEstimator}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4af37] hover:text-amber-300 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Open Macro Estimator Calculator' : 'افتح حاسبة الماكروز الشخصية'}</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'all', icon: '🌟', labelEn: 'All Meals', labelAr: 'جميع الوجبات' },
            { id: 'bulking', icon: '🏋️', labelEn: 'Bulking (ضخامة)', labelAr: 'ضخامة عضلية' },
            { id: 'cutting', icon: '✂️', labelEn: 'Cutting (تنشيف)', labelAr: 'تنشيف وحرق دهون' },
            { id: 'employee', icon: '💼', labelEn: 'Clean Employee Meals', labelAr: 'طاقة الموظفين' },
          ].map((goal) => {
            const active = currentGoal === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => onSelectGoal(goal.id as DietGoal)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#1b3b2b] text-white border-[#88c999] ring-1 ring-[#88c999] shadow-sm'
                    : 'bg-[#0a1810] text-white/70 border-white/10 hover:bg-[#152e20] hover:text-white'
                }`}
              >
                <span>{goal.icon}</span>
                <span className="truncate">{lang === 'en' ? goal.labelEn : goal.labelAr}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Row: Search and Quick Stats */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              lang === 'en'
                ? 'Search meal, cut, or protein (e.g. fillet, fahita, steak, pesto)...'
                : 'ابحث عن وجبة، صوص أو بروتين (فيليه، ستيك، بيستو، كباب)...'
            }
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#0c1912] border border-[#a3c9a8]/25 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#88c999] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-2.5 text-xs text-white/40 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Indicator & Reset */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span className="text-xs text-[#88c999] font-mono tabular-nums">
            {totalFilteredCount} {lang === 'en' ? 'items found' : 'وجبة مطابقة'}
          </span>
          {isFilterActive && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-white/60 hover:text-white bg-[#183325] hover:bg-[#1e3f2e] border border-[#a3c9a8]/20 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{lang === 'en' ? 'Reset' : 'إعادة ضبط'}</span>
            </button>
          )}
        </div>

      </div>

      {/* Category Segmented Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#a3c9a8]/10 mb-4">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#1b3b2b] text-white border border-[#88c999]/60 shadow-sm'
              : 'text-white/70 hover:text-white hover:bg-[#183325]'
          }`}
        >
          {lang === 'en' ? 'All Sections' : 'جميع الأقسام'}
        </button>

        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'bg-[#1b3b2b] text-white border border-[#88c999]/60 shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-[#183325]'
              }`}
            >
              <span>{lang === 'en' ? cat.nameEn : cat.nameAr}</span>
              <span className="text-[10px] text-[#88c999] ml-1 font-mono">({cat.itemCount})</span>
            </button>
          );
        })}
      </div>

      {/* Athletic Sliders (Protein & Calories) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        
        {/* Min Protein Slider */}
        <div className="bg-[#0c1912]/60 p-3 rounded-xl border border-[#a3c9a8]/10">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-white/80 font-semibold flex items-center gap-1.5">
              <Dumbbell className="w-3.5 h-3.5 text-[#88c999]" />
              <span>{lang === 'en' ? 'Minimum Bioavailable Protein:' : 'الحد الأدنى للبروتين الصافي:'}</span>
            </span>
            <span className="font-mono font-bold text-[#88c999] tabular-nums">
              {minProtein > 0 ? `${minProtein}g+` : 'Any'}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={55}
            step={5}
            value={minProtein}
            onChange={(e) => onMinProteinChange(Number(e.target.value))}
            className="w-full accent-[#88c999] h-1.5 bg-[#183325] rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-white/40 font-mono mt-1">
            <span>0g</span>
            <span>20g</span>
            <span>35g (Athletes)</span>
            <span>50g+ (Bodybuilders)</span>
          </div>
        </div>

        {/* Max Calories Slider */}
        <div className="bg-[#0c1912]/60 p-3 rounded-xl border border-[#a3c9a8]/10">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-white/80 font-semibold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'Maximum Calorie Ceiling:' : 'الحد الأقصى للسعرات الحرارية:'}</span>
            </span>
            <span className="font-mono font-bold text-white tabular-nums">
              {maxCalories < 800 ? `< ${maxCalories} kcal` : 'Any (Up to 800+)'}
            </span>
          </div>
          <input
            type="range"
            min={200}
            max={800}
            step={50}
            value={maxCalories}
            onChange={(e) => onMaxCaloriesChange(Number(e.target.value))}
            className="w-full accent-amber-400 h-1.5 bg-[#183325] rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-white/40 font-mono mt-1">
            <span>200 kcal</span>
            <span>350 kcal (Cutting)</span>
            <span>500 kcal (Balanced)</span>
            <span>800 kcal (Bulking)</span>
          </div>
        </div>

      </div>

    </div>
  );
};

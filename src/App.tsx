import React, { useState, useEffect, useMemo } from 'react';
import { 
  Dumbbell, 
  Sparkles, 
  Scale, 
  CheckCircle2, 
  BookOpen,
  Image as ImageIcon,
  ArrowUpRight,
  Target
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MenuItemCard } from './components/MenuItemCard';
import { CarbCustomizerModal } from './components/CarbCustomizerModal';
import { HowToReadModal } from './components/HowToReadModal';
import { OriginalSheetModal } from './components/OriginalSheetModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { MacroFilterToolbar } from './components/MacroFilterToolbar';
import { CarbSectionShowcase } from './components/CarbSectionShowcase';
import { Footer } from './components/Footer';
import { FoodCostModal } from './components/FoodCostModal';
import { PersonalMacroEstimatorModal } from './components/PersonalMacroEstimatorModal';
import { FloatingContactActions } from './components/FloatingContactActions';
import { MENU_ITEMS, CATEGORIES } from './data/menuData';
import { MenuItem, CarbOption, CartItem, CategoryId, DietGoal } from './types/menu';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [dietGoal, setDietGoal] = useState<DietGoal>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minProtein, setMinProtein] = useState<number>(0);
  const [maxCalories, setMaxCalories] = useState<number>(800);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isHowToReadOpen, setIsHowToReadOpen] = useState<boolean>(false);
  const [isSheetViewerOpen, setIsSheetViewerOpen] = useState<boolean>(false);
  const [isFoodCostOpen, setIsFoodCostOpen] = useState<boolean>(false);
  const [isMacroEstimatorOpen, setIsMacroEstimatorOpen] = useState<boolean>(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [activeSheetIndex, setActiveSheetIndex] = useState<number>(0);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('elite_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('elite_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Handle language toggle
  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ar' : 'en';
    setLang(nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
  };

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add customized item to cart
  const handleAddToCart = (
    item: MenuItem,
    selectedCarb: CarbOption | null,
    quantity: number,
    note: string
  ) => {
    const calculatedMacros = {
      calories: item.macros.calories + (selectedCarb ? selectedCarb.macros.calories : 0),
      protein: Math.round((item.macros.protein + (selectedCarb ? selectedCarb.macros.protein : 0)) * 10) / 10,
      carbs: Math.round((item.macros.carbs + (selectedCarb ? selectedCarb.macros.carbs : 0)) * 10) / 10,
      fats: Math.round((item.macros.fats + (selectedCarb ? selectedCarb.macros.fats : 0)) * 10) / 10,
    };

    const unitPriceDZD = item.priceDZD;
    const totalPriceDZD = unitPriceDZD * quantity;
    const cartItemId = `${item.id}-${selectedCarb ? selectedCarb.id : 'none'}-${Date.now()}`;

    const newCartItem: CartItem = {
      cartItemId,
      item,
      selectedCarb,
      quantity,
      customNote: note,
      calculatedMacros,
      unitPriceDZD,
      totalPriceDZD,
    };

    setCart((prev) => [...prev, newCartItem]);
    showToast(
      lang === 'en'
        ? `Added: ${item.nameEn} (+${calculatedMacros.protein}g Protein)`
        : `تمت الإضافة: ${item.nameAr} (${calculatedMacros.protein}غ بروتين)`
    );
  };

  // 1-Click Multi Add (from Personal Macro Estimator)
  const handleAddMultipleToCart = (items: { item: MenuItem; carb: CarbOption | null; quantity: number }[]) => {
    items.forEach(({ item, carb, quantity }) => {
      handleAddToCart(item, carb, quantity, '');
    });
    showToast(
      lang === 'en' 
        ? 'Daily meal combo added to your Nutrition Tray!' 
        : 'تمت إضافة وجبات الاحتياج اليومي إلى صينية الطلب!'
    );
  };

  // Quick add for non-customizable carb items
  const handleQuickAdd = (item: MenuItem) => {
    handleAddToCart(item, null, 1, '');
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity: newQty,
              totalPriceDZD: item.unitPriceDZD * newQty,
            }
          : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenSheetForCategory = (catId: CategoryId) => {
    const indexMap: Record<CategoryId, number> = {
      chicken: 2,
      beef: 3,
      burgers: 4,
      pizza: 5,
      sandwiches: 6,
      shawarma: 7,
      pastries: 8,
      upcoming: 9,
    };
    setActiveSheetIndex(indexMap[catId] ?? 0);
    setIsSheetViewerOpen(true);
  };

  // Filtering pipeline with explicit support for Bulking, Cutting, Employee
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Category
      if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) {
        return false;
      }

      // 2. Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchEn = item.nameEn.toLowerCase().includes(q) || (item.descriptionEn && item.descriptionEn.toLowerCase().includes(q));
        const matchAr = item.nameAr.toLowerCase().includes(q) || (item.descriptionAr && item.descriptionAr.toLowerCase().includes(q));
        if (!matchEn && !matchAr) return false;
      }

      // 3. Min protein
      if (minProtein > 0 && item.macros.protein < minProtein) {
        return false;
      }

      // 4. Max calories
      if (maxCalories < 800 && item.macros.calories > maxCalories) {
        return false;
      }

      // 5. Diet Goal Filters
      // Bulking (ضخامة عضلية): High protein + high calorie or customizable carb categories for massive glycogen reload
      if (dietGoal === 'bulking' || dietGoal === 'clean_bulk') {
        const isBulkingMeal = item.macros.protein >= 28 || item.allowsCarbCustomization || item.macros.calories >= 300;
        if (!isBulkingMeal) return false;
      }

      // Cutting (تنشيف): Lean protein, moderate/low fat, high protein density (fillets, kebabs, low calorie wraps)
      if (dietGoal === 'cutting' || dietGoal === 'lean_cut' || dietGoal === 'low_carb') {
        const isCuttingMeal = item.macros.protein >= 22 && item.macros.fats <= 10 && item.macros.calories <= 320;
        if (!isCuttingMeal) return false;
      }

      // Clean Employee Meals (طاقة الموظفين): Easy to digest, moderate calories (200-520 kcal), balanced focus
      if (dietGoal === 'employee') {
        const isEmployeeMeal = item.macros.calories >= 180 && item.macros.calories <= 550 && item.macros.protein >= 15;
        if (!isEmployeeMeal) return false;
      }

      if (dietGoal === 'high_protein' && item.macros.protein < 35) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, minProtein, maxCalories, dietGoal]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setDietGoal('all');
    setSearchQuery('');
    setMinProtein(0);
    setMaxCalories(800);
  };

  // Group items by category for structured reading
  const groupedCategories = useMemo(() => {
    if (selectedCategory !== 'all') {
      const cat = CATEGORIES.find((c) => c.id === selectedCategory);
      return cat ? [cat] : [];
    }
    return CATEGORIES;
  }, [selectedCategory]);

  return (
    <div className={`min-h-screen bg-[#0c1912] text-[#e8f2ec] flex flex-col ${lang === 'ar' ? 'font-arabic' : 'font-body'}`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1b3b2b] border border-[#88c999] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#88c999] shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-xs text-[#88c999] underline underline-offset-2 ml-2 hover:text-white font-bold cursor-pointer"
          >
            {lang === 'en' ? 'View Tray' : 'عرض الصينية'}
          </button>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenHowToRead={() => setIsHowToReadOpen(true)}
        onOpenSheetViewer={() => {
          setActiveSheetIndex(0);
          setIsSheetViewerOpen(true);
        }}
        onOpenFoodCost={() => setIsFoodCostOpen(true)}
        onOpenMacroEstimator={() => setIsMacroEstimatorOpen(true)}
        lang={lang}
        onToggleLang={toggleLanguage}
        activeCategory={selectedCategory}
        onSelectCategory={(id) => setSelectedCategory(id as any)}
      />

      <main className="flex-1">
        
        {/* Dynamic Header & Hero Section */}
        <HeroBanner
          lang={lang}
          currentGoal={dietGoal}
          onSelectGoal={(goal) => setDietGoal(goal)}
          onOpenHowToRead={() => setIsHowToReadOpen(true)}
          onOpenSheetViewer={() => {
            setActiveSheetIndex(0);
            setIsSheetViewerOpen(true);
          }}
          onOpenFoodCost={() => setIsFoodCostOpen(true)}
          onOpenMacroEstimator={() => setIsMacroEstimatorOpen(true)}
        />

        {/* Digital Menu Section */}
        <section id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Section Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#88c999] mb-1">
                <Dumbbell className="w-4 h-4" />
                <span>{lang === 'en' ? 'Lab-Calculated Nutrition' : 'تغذية دقيقة محسوبة مخبرياً'}</span>
                <span aria-hidden="true">·</span>
                <span>{lang === 'en' ? 'Cité Ben Aazouz (El Kamounia), Mila' : 'حي بن عزوز (الكمونية) - ميلة'}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#d4af37] font-bold">2026 Calibrated Pricing</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                {lang === 'en' ? 'Interactive Digital Menu' : 'قائمة الوجبات الرقمية التفاعلية'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsMacroEstimatorOpen(true)}
                className="px-3.5 py-2 text-xs font-bold text-white bg-[#1b3b2b] hover:bg-[#234f3a] border border-[#d4af37]/60 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <Target className="w-4 h-4 text-[#d4af37]" />
                <span>{lang === 'en' ? 'Macro Calculator' : 'حاسبة الماكروز الشخصية'}</span>
              </button>

              <button
                onClick={() => setIsFoodCostOpen(true)}
                className="px-3.5 py-2 text-xs font-bold text-white bg-[#183325] hover:bg-[#1e3f2e] border border-emerald-500/40 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{lang === 'en' ? 'Cost & Pricing Engine' : 'حاسبة التكاليف وهوامش الربح'}</span>
              </button>

              <button
                onClick={() => setIsHowToReadOpen(true)}
                className="px-3 py-2 text-xs font-semibold text-[#88c999] bg-[#183325] hover:bg-[#1e3f2e] border border-[#88c999]/30 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Macro Guide' : 'دليل الماكروز'}</span>
              </button>
              
              <button
                onClick={() => {
                  setActiveSheetIndex(1);
                  setIsSheetViewerOpen(true);
                }}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-[#183325] hover:bg-[#1e3f2e] border border-[#88c999]/30 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#88c999]" />
                <span>{lang === 'en' ? 'Original Print Sheets' : 'صور المنيو الورقي'}</span>
              </button>
            </div>
          </div>

          {/* Search, Category Tabs, & Macro Sliders with 3 Goal Tabs */}
          <MacroFilterToolbar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            minProtein={minProtein}
            onMinProteinChange={setMinProtein}
            maxCalories={maxCalories}
            onMaxCaloriesChange={setMaxCalories}
            currentGoal={dietGoal}
            onSelectGoal={(g) => setDietGoal(g)}
            onOpenMacroEstimator={() => setIsMacroEstimatorOpen(true)}
            onResetFilters={handleResetFilters}
            totalFilteredCount={filteredItems.length}
            lang={lang}
          />

          {/* Filtered Meals Display */}
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center bg-[#13271c] border border-[#88c999]/20 rounded-2xl my-8">
              <Dumbbell className="w-12 h-12 text-[#88c999] mx-auto opacity-50 mb-3" />
              <h3 className="text-lg font-bold text-white font-heading">
                {lang === 'en' ? 'No Meals Match Your Selected Macro Filters' : 'لا توجد وجبات تطابق معايير الماكروز المحددة'}
              </h3>
              <p className="text-xs text-white/60 mt-1 max-w-md mx-auto">
                {lang === 'en'
                  ? 'Try switching your fitness goal, lowering the protein threshold, or clearing the search query.'
                  : 'جرب تغيير الهدف الرياضي، تخفيض حد البروتين الأدنى أو زيادة سقف السعرات.'}
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 bg-[#88c999] text-[#0c1912] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'Reset All Filters' : 'إعادة ضبط كل الفلاتر'}
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {groupedCategories.map((cat) => {
                const catItems = filteredItems.filter((i) => i.categoryId === cat.id);
                if (catItems.length === 0) return null;

                return (
                  <div key={cat.id} className="space-y-4">
                    
                    {/* Category Title Strip */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#88c999]/20">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                            {lang === 'en' ? cat.nameEn : cat.nameAr}
                          </h3>
                          <span className="text-xs font-mono text-[#88c999] bg-[#183325] px-2 py-0.5 rounded border border-[#88c999]/30">
                            {catItems.length} {lang === 'en' ? 'options' : 'وجبة'}
                          </span>
                        </div>
                        <p className="text-xs text-[#cbe0cf]/70 mt-0.5">
                          {lang === 'en' ? cat.descriptionEn : cat.descriptionAr}
                        </p>
                      </div>

                      {/* Link to view this category's original print card */}
                      <button
                        onClick={() => handleOpenSheetForCategory(cat.id)}
                        className="text-xs text-[#88c999] hover:text-white flex items-center gap-1 font-medium cursor-pointer self-start sm:self-auto"
                      >
                        <span>{lang === 'en' ? 'View Printed Card' : 'معاينة كارت المنيو'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Carb Customization notice for protein categories */}
                    {cat.customizableCarb && (
                      <div className="bg-[#183325]/80 border border-[#88c999]/25 rounded-xl px-4 py-2.5 text-xs flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-[#cbe0cf]">
                          <Scale className="w-4 h-4 text-[#88c999] shrink-0" />
                          <span>
                            {lang === 'en'
                              ? 'Values below represent base protein. Click "Select 200g Carb" to pair with Basmati Rice, Sweet Potato, Bulgur, or Pesto Pasta.'
                              : 'القيم أدناه لمحصول البروتين فقط. اضغط على "تخصيص الكارب" لإضافة 200غ أرز، بطاطا حلوة، برغل أو باستا.'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Items Grid (3 Columns on Desktop) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {catItems.map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          lang={lang}
                          onCustomize={(itm) => setCustomizingItem(itm)}
                          onQuickAdd={handleQuickAdd}
                        />
                      ))}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* 10 Clean Carb Sources Showcase Section */}
          <CarbSectionShowcase lang={lang} />

        </section>

      </main>

      {/* Footer & Location info for Cité Ben Aazouz (El Kamounia), Mila */}
      <Footer
        lang={lang}
        onOpenHowToRead={() => setIsHowToReadOpen(true)}
        onOpenSheetViewer={() => {
          setActiveSheetIndex(0);
          setIsSheetViewerOpen(true);
        }}
      />

      {/* Quick Contact & Direct Action Floating Button (WhatsApp & Phone) */}
      <FloatingContactActions
        lang={lang}
        onOpenMacroEstimator={() => setIsMacroEstimatorOpen(true)}
      />

      {/* Personal Macro Estimator & TDEE Modal */}
      <PersonalMacroEstimatorModal
        isOpen={isMacroEstimatorOpen}
        onClose={() => setIsMacroEstimatorOpen(false)}
        lang={lang}
        onApplyGoalFilter={(goal) => {
          setDietGoal(goal);
        }}
        onAddComboToCart={handleAddMultipleToCart}
      />

      {/* Carb Customizer Modal */}
      <CarbCustomizerModal
        item={customizingItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
        lang={lang}
      />

      {/* How To Read Macro Guide Modal */}
      <HowToReadModal
        isOpen={isHowToReadOpen}
        onClose={() => setIsHowToReadOpen(false)}
        lang={lang}
      />

      {/* Food Cost & Pricing Simulator Modal */}
      <FoodCostModal
        isOpen={isFoodCostOpen}
        onClose={() => setIsFoodCostOpen(false)}
        lang={lang}
      />

      {/* Original Scanned Menu Sheets Viewer */}
      <OriginalSheetModal
        isOpen={isSheetViewerOpen}
        onClose={() => setIsSheetViewerOpen(false)}
        lang={lang}
        initialSheetIndex={activeSheetIndex}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onClearCart={handleClearCart}
        lang={lang}
      />

      {/* Checkout & WhatsApp Direct Transmission Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        lang={lang}
        onOrderCompleted={() => {
          setCart([]);
          setIsCheckoutOpen(false);
          showToast(
            lang === 'en'
              ? 'Order transmitted to Healthy_Brunchy Sol+ via WhatsApp!'
              : 'تم إرسال الطلب لمطعم هيلثي برانشي عبر واتساب!'
          );
        }}
      />

    </div>
  );
}

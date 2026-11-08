import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Dumbbell, Flame, Wheat, ShieldAlert, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types/menu';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  onClearCart: () => void;
  lang: 'en' | 'ar';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onClearCart,
  lang,
}) => {
  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPriceDZD = cart.reduce((sum, item) => sum + item.totalPriceDZD, 0);
  
  // Rolling total macros
  const totalCalories = Math.round(cart.reduce((sum, item) => sum + (item.calculatedMacros.calories * item.quantity), 0));
  const totalProtein = Math.round(cart.reduce((sum, item) => sum + (item.calculatedMacros.protein * item.quantity), 0) * 10) / 10;
  const totalCarbs = Math.round(cart.reduce((sum, item) => sum + (item.calculatedMacros.carbs * item.quantity), 0) * 10) / 10;
  const totalFats = Math.round(cart.reduce((sum, item) => sum + (item.calculatedMacros.fats * item.quantity), 0) * 10) / 10;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-opacity">
      <div 
        className="w-full max-w-md bg-[#102319] border-l border-[#a3c9a8]/20 h-full flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#0c1912] border-b border-[#a3c9a8]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#183325] rounded-lg text-[#a3c9a8]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-heading">
                {lang === 'en' ? 'Nutrition Order Tray' : 'صينية الطلب الرياضي'}
              </h2>
              <span className="text-xs text-[#a3c9a8] font-mono">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-white/50 hover:text-red-400 transition-colors px-2 py-1 cursor-pointer"
                title="Clear tray"
              >
                {lang === 'en' ? 'Clear' : 'إفراغ'}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-white/60 hover:text-white bg-[#183325] hover:bg-[#1e3f2e] rounded-lg transition-colors cursor-pointer"
              aria-label="Close tray"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Macro Aggregate Dashboard */}
        {cart.length > 0 && (
          <div className="bg-[#183325] border-b border-[#a3c9a8]/20 p-4 shrink-0">
            <div className="flex items-center justify-between text-xs font-semibold text-[#a3c9a8] mb-2 uppercase tracking-wider">
              <span>{lang === 'en' ? 'Total Calculated Nutrition' : 'المجموع الكلي للماكروز'}</span>
              <span className="text-white/60 font-mono">Session Target</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-[#0c1912] p-2 rounded border border-[#a3c9a8]/10">
                <span className="text-[9px] text-white/50 uppercase block font-semibold">Calories</span>
                <span className="text-sm sm:text-base font-mono font-bold text-white tabular-nums">
                  {totalCalories}
                </span>
                <span className="text-[9px] text-white/40 block">kcal</span>
              </div>

              <div className="bg-[#0c1912] p-2 rounded border border-[#a3c9a8]/30">
                <span className="text-[9px] text-[#a3c9a8] uppercase block font-bold">Protein</span>
                <span className="text-sm sm:text-base font-mono font-black text-[#a3c9a8] tabular-nums">
                  {totalProtein}g
                </span>
                <span className="text-[9px] text-[#a3c9a8]/80 block">Muscle Fuel</span>
              </div>

              <div className="bg-[#0c1912] p-2 rounded border border-[#a3c9a8]/10">
                <span className="text-[9px] text-white/50 uppercase block font-semibold">Carbs</span>
                <span className="text-sm sm:text-base font-mono font-bold text-white tabular-nums">
                  {totalCarbs}g
                </span>
                <span className="text-[9px] text-white/40 block">Energy</span>
              </div>

              <div className="bg-[#0c1912] p-2 rounded border border-[#a3c9a8]/10">
                <span className="text-[9px] text-white/50 uppercase block font-semibold">Fats</span>
                <span className="text-sm sm:text-base font-mono font-bold text-white tabular-nums">
                  {totalFats}g
                </span>
                <span className="text-[9px] text-white/40 block">Clean Fats</span>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-white/50">
              <div className="w-16 h-16 rounded-full bg-[#183325] border border-[#a3c9a8]/20 flex items-center justify-center text-[#a3c9a8] mb-4">
                <Dumbbell className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="text-base font-bold text-white font-heading">
                {lang === 'en' ? 'Your Tray Is Empty' : 'صينية الوجبات فارغة'}
              </h3>
              <p className="text-xs text-white/60 mt-1 max-w-xs leading-relaxed">
                {lang === 'en'
                  ? 'Select chicken, prime beef, or healthy burgers with custom 200g carb options to start building your macros.'
                  : 'اختر وجبات الدجاج أو اللحم أو البرجر مع الكارب الصحي لبدء بناء خطتك الغذائية.'}
              </p>
            </div>
          ) : (
            cart.map((cartItem) => (
              <div
                key={cartItem.cartItemId}
                className="p-3.5 bg-[#13271c] border border-[#a3c9a8]/15 rounded-xl flex flex-col justify-between"
              >
                
                {/* Item title and base details */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {lang === 'en' ? cartItem.item.nameEn : cartItem.item.nameAr}
                    </h4>
                    
                    {/* Selected Carb Indicator */}
                    {cartItem.selectedCarb ? (
                      <div className="text-xs text-[#a3c9a8] mt-1 flex items-center gap-1 font-medium">
                        <Wheat className="w-3.5 h-3.5" />
                        <span>
                          + {lang === 'en' ? cartItem.selectedCarb.nameEn : cartItem.selectedCarb.nameAr} (200g)
                        </span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-white/50 mt-0.5 block">
                        {lang === 'en' ? 'No added carb (Protein item)' : 'بدون كارب مضاف (بروتين فقط)'}
                      </span>
                    )}

                    {cartItem.customNote && (
                      <p className="text-[11px] text-white/60 italic mt-1 bg-[#0c1912] px-2 py-0.5 rounded border border-[#a3c9a8]/10 inline-block">
                        &quot;{cartItem.customNote}&quot;
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="text-right shrink-0">
                    <span className="text-sm font-mono font-bold text-white tabular-nums">
                      {cartItem.totalPriceDZD} DZD
                    </span>
                    <span className="text-[10px] text-white/40 block font-mono">
                      ({cartItem.unitPriceDZD} ea)
                    </span>
                  </div>
                </div>

                {/* Per-item macro breakdown */}
                <div className="mt-2.5 pt-2 border-t border-[#a3c9a8]/10 flex items-center justify-between text-xs text-white/70">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-[#cbe0cf]">
                    <span className="text-white font-bold">{cartItem.calculatedMacros.calories} kcal</span>
                    <span>·</span>
                    <span className="text-[#a3c9a8] font-bold">{cartItem.calculatedMacros.protein}g P</span>
                    <span>·</span>
                    <span>{cartItem.calculatedMacros.carbs}g C</span>
                    <span>·</span>
                    <span>{cartItem.calculatedMacros.fats}g F</span>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-[#0c1912] border border-[#a3c9a8]/20 rounded-md">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                        className="p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-mono font-bold text-xs text-white tabular-nums">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                        className="p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(cartItem.cartItemId)}
                      className="p-1.5 text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Drawer Bottom Action */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#0c1912] border-t border-[#a3c9a8]/20 shrink-0 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-white/60 block">
                  {lang === 'en' ? 'Estimated Total:' : 'المجموع الكلي للطلب:'}
                </span>
                <span className="text-xs text-[#a3c9a8] font-mono">
                  {totalProtein}g Protein · {totalCalories} kcal
                </span>
              </div>
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-xl sm:text-2xl font-mono font-black text-white tabular-nums">
                    {totalPriceDZD}
                  </span>
                  <span className="text-xs text-[#a3c9a8] font-bold font-mono">DZD</span>
                </div>
                <span className="text-[11px] text-white/60 font-mono block">
                  ({Math.round(totalPriceDZD / 10)} ألف)
                </span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 bg-[#a3c9a8] hover:bg-[#bfe2c4] text-[#0c1912] font-heading font-black text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{lang === 'en' ? 'Proceed to Order & WhatsApp' : 'إتمام الطلب والإرسال لواتساب'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

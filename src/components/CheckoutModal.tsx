import React, { useState } from 'react';
import { X, Check, Copy, Printer, MessageCircle, MapPin, Phone, User, Calendar, Dumbbell } from 'lucide-react';
import { CartItem, OrderCustomerInfo } from '../types/menu';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  lang: 'en' | 'ar';
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  lang,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const [customerInfo, setCustomerInfo] = useState<OrderCustomerInfo>({
    name: '',
    phone: '',
    orderType: 'takeaway',
    deliveryAddress: '',
    gymOrLocation: '',
    notes: '',
  });

  const [copied, setCopied] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const totalPriceDZD = cart.reduce((sum, item) => sum + item.totalPriceDZD, 0);
  const totalCalories = Math.round(cart.reduce((sum, item) => sum + (item.calculatedMacros.calories * item.quantity), 0));
  const totalProtein = Math.round(cart.reduce((sum, item) => sum + (item.calculatedMacros.protein * item.quantity), 0) * 10) / 10;
  const totalCarbs = Math.round(cart.reduce((sum, item) => sum + (item.calculatedMacros.carbs * item.quantity), 0) * 10) / 10;
  const totalFats = Math.round(cart.reduce((sum, item) => sum + (item.calculatedMacros.fats * item.quantity), 0) * 10) / 10;

  // Build formatted order text
  const generateOrderText = () => {
    let text = `*ELITE HEALTHY FOOD by Healthy_Brunchy Sol+ (Mila)*\n`;
    text += `*Athlete Nutrition Order & Macro Summary*\n`;
    text += `-------------------------------------------\n`;
    text += `👤 *Customer:* ${customerInfo.name || 'Athlete'}\n`;
    text += `📱 *Phone:* ${customerInfo.phone || 'N/A'}\n`;
    text += `📍 *Fulfillment:* ${customerInfo.orderType.toUpperCase()} - ${customerInfo.deliveryAddress || customerInfo.gymOrLocation || 'Mila Downtown'}\n`;
    if (customerInfo.notes) {
      text += `📝 *Notes:* ${customerInfo.notes}\n`;
    }
    text += `-------------------------------------------\n`;
    text += `*ORDER ITEMS:*\n`;

    cart.forEach((item, index) => {
      text += `${index + 1}. *${item.item.nameEn}* (x${item.quantity})\n`;
      text += `   - Price: ${item.totalPriceDZD} DZD\n`;
      if (item.selectedCarb) {
        text += `   - 200g Carb: ${item.selectedCarb.nameEn} (${item.selectedCarb.nameAr})\n`;
      }
      text += `   - Macros: ${item.calculatedMacros.calories * item.quantity} kcal | ${item.calculatedMacros.protein * item.quantity}g Protein | ${item.calculatedMacros.carbs * item.quantity}g Carbs | ${item.calculatedMacros.fats * item.quantity}g Fats\n`;
      if (item.customNote) {
        text += `   - Prep Note: ${item.customNote}\n`;
      }
    });

    text += `-------------------------------------------\n`;
    text += `*TOTAL MACRONUTRIENT ROLLUP:*\n`;
    text += `🔥 Calories: *${totalCalories} kcal*\n`;
    text += `💪 Bioavailable Protein: *${totalProtein}g*\n`;
    text += `🌾 Clean Carbs: *${totalCarbs}g*\n`;
    text += `🥑 Healthy Fats: *${totalFats}g*\n`;
    text += `💰 *Total Amount:* *${totalPriceDZD} DZD*\n`;
    text += `-------------------------------------------\n`;
    text += `Sent from Elite Healthy Food Digital Platform (Mila, Algeria)`;
    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateOrderText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppSend = () => {
    // Official Algerian phone number format for Healthy_Brunchy Sol+
    const orderText = encodeURIComponent(generateOrderText());
    // Direct WhatsApp web / mobile intent
    window.open(`https://wa.me/213555000000?text=${orderText}`, '_blank');
    setOrderSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

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
              <span>Fast Checkout</span>
              <span aria-hidden="true">·</span>
              <span>Mila, Algeria</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
              {lang === 'en' ? 'Complete Athlete Order' : 'تأكيد وإرسال الطلب'}
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
          
          {/* Order Summary & Calculated Macros Review Card */}
          <div className="p-4 rounded-xl bg-[#0c1912] border border-[#a3c9a8]/20 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#a3c9a8] font-bold uppercase tracking-wider">
              <span>{lang === 'en' ? 'Macro Nutrition Summary:' : 'ملخص القيمة الغذائية للطلب:'}</span>
              <span className="font-mono text-white text-sm font-black">{totalPriceDZD} DZD</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-[#183325] p-2 rounded">
                <span className="text-[10px] text-white/50 block font-semibold">Calories</span>
                <span className="font-mono font-bold text-white text-sm tabular-nums">{totalCalories}</span>
              </div>
              <div className="bg-[#183325] p-2 rounded border border-[#a3c9a8]/30">
                <span className="text-[10px] text-[#a3c9a8] block font-bold">Protein</span>
                <span className="font-mono font-black text-[#a3c9a8] text-sm tabular-nums">{totalProtein}g</span>
              </div>
              <div className="bg-[#183325] p-2 rounded">
                <span className="text-[10px] text-white/50 block font-semibold">Carbs</span>
                <span className="font-mono font-bold text-white text-sm tabular-nums">{totalCarbs}g</span>
              </div>
              <div className="bg-[#183325] p-2 rounded">
                <span className="text-[10px] text-white/50 block font-semibold">Fats</span>
                <span className="font-mono font-bold text-white text-sm tabular-nums">{totalFats}g</span>
              </div>
            </div>

            <div className="text-xs text-white/70 divide-y divide-white/10 pt-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="py-1.5 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-white">{item.quantity}x {item.item.nameEn}</span>
                    {item.selectedCarb && (
                      <span className="text-[11px] text-[#a3c9a8] ml-2">
                        + {item.selectedCarb.nameEn}
                      </span>
                    )}
                  </div>
                  <span className="font-mono tabular-nums text-white/90">{item.totalPriceDZD} DZD</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Customer & Delivery Information (Mila):' : 'بيانات العميل والتوصيل (ميلة):'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/70 mb-1">
                  {lang === 'en' ? 'Athlete / Full Name *' : 'اسم الرياضي / العميل *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/40 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder={lang === 'en' ? 'e.g. Walid Bouzid' : 'مثال: وليد بوزيد'}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#0c1912] border border-[#a3c9a8]/30 rounded-lg text-white focus:outline-none focus:border-[#a3c9a8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/70 mb-1">
                  {lang === 'en' ? 'Phone Number (Algeria) *' : 'رقم الهاتف (الجزائر) *'}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-white/40 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="05 / 06 / 07 XX XX XX XX"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#0c1912] border border-[#a3c9a8]/30 rounded-lg text-white focus:outline-none focus:border-[#a3c9a8]"
                  />
                </div>
              </div>
            </div>

            {/* Service Type Selection */}
            <div>
              <label className="block text-xs text-white/70 mb-1.5">
                {lang === 'en' ? 'Fulfillment Option:' : 'طريقة الاستلام:'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'takeaway', labelEn: 'Takeaway Pickup', labelAr: 'استلام من المطعم' },
                  { id: 'delivery', labelEn: 'Mila Delivery', labelAr: 'توصيل في ميلة' },
                  { id: 'gym_drop', labelEn: 'Gym Drop-off', labelAr: 'توصيل للصالة الرياضية' },
                ].map((opt) => {
                  const active = customerInfo.orderType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCustomerInfo({ ...customerInfo, orderType: opt.id as any })}
                      className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                        active
                          ? 'bg-[#1b3b2b] text-[#a3c9a8] border-[#a3c9a8]'
                          : 'bg-[#0c1912] text-white/70 border-[#a3c9a8]/20 hover:bg-[#183325]'
                      }`}
                    >
                      {lang === 'en' ? opt.labelEn : opt.labelAr}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Address or Gym Input */}
            <div>
              <label className="block text-xs text-white/70 mb-1">
                {customerInfo.orderType === 'gym_drop'
                  ? (lang === 'en' ? 'Gym Name in Mila (e.g. Gym Pro, Olympic Complex):' : 'اسم القاعة الرياضية في ميلة:')
                  : customerInfo.orderType === 'delivery'
                  ? (lang === 'en' ? 'Delivery Address in Mila (Neighborhood / Street):' : 'عنوان التوصيل في ميلة (الحي / الشارع):')
                  : (lang === 'en' ? 'Pickup at Kitchen (Cité Ben Aazouz - El Kamounia, Mila):' : 'استلام من المطعم (ميلة - حي بن عزوز، الكمونية):')}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-white/40 absolute left-3 top-3" />
                <input
                  type="text"
                  value={customerInfo.deliveryAddress}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, deliveryAddress: e.target.value })}
                  placeholder={
                    customerInfo.orderType === 'gym_drop'
                      ? 'e.g. Gym Pro Mila, Olympic Pool Area, Salle Omnisport'
                      : 'e.g. Cité Ben Aazouz (El Kamounia), Centre Ville, Downtown'
                  }
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#0c1912] border border-[#a3c9a8]/30 rounded-lg text-white focus:outline-none focus:border-[#a3c9a8]"
                />
              </div>
            </div>

            {/* Additional Order Note */}
            <div>
              <label className="block text-xs text-white/70 mb-1">
                {lang === 'en' ? 'Special Instructions / Diet Note:' : 'ملاحظات إضافية على الطلب:'}
              </label>
              <textarea
                rows={2}
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                placeholder={lang === 'en' ? 'e.g. Extra napkins, please pack sauces separately, athlete pre-workout' : 'أي طلب خاص بالتحضير أو التعبئة...'}
                className="w-full px-3 py-2 text-xs bg-[#0c1912] border border-[#a3c9a8]/30 rounded-lg text-white focus:outline-none focus:border-[#a3c9a8]"
              />
            </div>

          </div>

          {/* Action Row */}
          <div className="p-4 rounded-xl bg-[#0c1912] border border-[#a3c9a8]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-white/70">
              <span className="font-bold text-white block">
                {lang === 'en' ? 'Direct Kitchen Transmission' : 'إرسال مباشر لمطبخ إيليت بميلة'}
              </span>
              <span className="text-white/50">
                {lang === 'en' ? 'Sends complete macro breakdown straight to restaurant staff via WhatsApp' : 'إرسال بيانات الوجبات والماكروز المحسوبة بنقرة واحدة'}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 sm:flex-none px-3.5 py-2.5 bg-[#183325] hover:bg-[#1e3f2e] text-white border border-[#a3c9a8]/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Copy receipt to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-[#a3c9a8]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? (lang === 'en' ? 'Copied!' : 'تم النسخ!') : (lang === 'en' ? 'Copy Text' : 'نسخ النص')}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="p-2.5 bg-[#183325] hover:bg-[#1e3f2e] text-white border border-[#a3c9a8]/30 rounded-lg text-xs transition-colors cursor-pointer"
                title="Print Receipt"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer with Primary WhatsApp Send Button */}
        <div className="p-4 sm:p-5 bg-[#0c1912] border-t border-[#a3c9a8]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left w-full sm:w-auto">
            <span className="text-xs text-white/50 block">Grand Total</span>
            <span className="text-lg font-mono font-black text-white tabular-nums">
              {totalPriceDZD} DZD <span className="text-xs text-[#a3c9a8]">({totalProtein}g Protein)</span>
            </span>
          </div>

          <button
            type="button"
            onClick={handleWhatsAppSend}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-heading font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>{lang === 'en' ? 'Send Order via WhatsApp (+213)' : 'إرسال الطلب عبر واتساب'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

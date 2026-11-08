import React from 'react';
import { MapPin, Phone, Clock, Dumbbell, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'ar';
  onOpenHowToRead: () => void;
  onOpenSheetViewer: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenHowToRead,
  onOpenSheetViewer,
}) => {
  return (
    <footer id="location-section" className="bg-[#07100b] border-t border-[#a3c9a8]/15 text-white/70">
      
      {/* Location & Trust Information Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-white font-heading tracking-tight">
                ELITE<span className="text-[#a3c9a8]">™</span>
              </span>
              <span className="text-xs uppercase tracking-wider text-[#a3c9a8] font-bold">
                Healthy Food
              </span>
            </div>
            <p className="text-sm text-[#a3c9a8] font-script">
              by Healthy_Brunchy Sol+
            </p>
            <p className="text-xs text-white/60 leading-relaxed">
              {lang === 'en'
                ? 'The premier fitness and athletic nutrition platform in Mila, Algeria. Real macros, prime proteins, and clean dining for high achievers.'
                : 'المنصة الرقمية الرائدة في التغذية الرياضية الصحية في ميلة، الجزائر. ماكروز دقيقة، بروتين نقي وأكل نظيف للأبطال.'}
            </p>
          </div>

          {/* Location in Mila */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#a3c9a8]" />
              <span>{lang === 'en' ? 'Kitchen & Pick-Up' : 'المقر والاستلام'}</span>
            </h4>
            <p className="text-xs text-white/80 font-medium">
              Healthy_Brunchy Sol+ Headquarters
            </p>
            <p className="text-xs text-white/60 leading-relaxed">
              Cité Ben Aazouz (El Kamounia), Wilaya de Mila, Algeria (43000)
            </p>
            <p className="text-xs text-white/50">
              {lang === 'en' ? 'Located at Cité Ben Aazouz (El Kamounia)' : 'الموقع: ميلة، حي بن عزوز (الكمونية)'}
            </p>
            <p className="text-xs text-[#a3c9a8] mt-1">
              {lang === 'en' ? 'Serving Mila, Grarem Goua, & surrounding athletic gyms' : 'نخدم ميلة، القرارم قوقة والقاعات الرياضية المجاورة'}
            </p>
          </div>

          {/* Operating Hours */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#a3c9a8]" />
              <span>{lang === 'en' ? 'Athlete Service Hours' : 'أوقات العمل واستقبال الطلبات'}</span>
            </h4>
            <div className="text-xs space-y-1 text-white/70">
              <div className="flex justify-between">
                <span>{lang === 'en' ? 'Saturday – Thursday:' : 'السبت – الخميس:'}</span>
                <span className="font-mono text-white">11:00 – 23:00</span>
              </div>
              <div className="flex justify-between">
                <span>{lang === 'en' ? 'Friday:' : 'الجمعة:'}</span>
                <span className="font-mono text-white">15:00 – 23:00</span>
              </div>
              <p className="text-[11px] text-[#a3c9a8] mt-2">
                {lang === 'en' ? 'Fresh pre-workout prep & post-workout delivery' : 'تحضير وجبات قبل التمرين واستشفاء ما بعد التمرين'}
              </p>
            </div>
          </div>

          {/* Quick Links & Resources */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Dumbbell className="w-3.5 h-3.5 text-[#a3c9a8]" />
              <span>{lang === 'en' ? 'Athlete Resources' : 'روابط وأدلة رياضية'}</span>
            </h4>
            <ul className="text-xs space-y-2">
              <li>
                <button
                  onClick={onOpenHowToRead}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {lang === 'en' ? 'Macro Guide (5 Pillars)' : 'دليل قراءة الماكروز الخمسة'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSheetViewer}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {lang === 'en' ? 'Printed Menu Scans' : 'معاينة كروت المنيو الأصلية'}
                </button>
              </li>
              <li>
                <a href="#menu-section" className="hover:text-white transition-colors">
                  {lang === 'en' ? '200g Carb Customizer' : 'محرك الكاربوهيدرات 200غ'}
                </a>
              </li>
              <li className="pt-1">
                <a 
                  href="https://wa.me/213558327813" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-mono text-xs font-bold transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>WhatsApp: 0558 32 78 13</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:0558327813" 
                  className="flex items-center gap-1.5 text-amber-300/80 hover:text-amber-300 font-mono text-xs transition-colors"
                >
                  <span>{lang === 'en' ? 'Direct Line:' : 'الهاتف:'} 0558 32 78 13</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Quiet Copyright Row */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} Elite Healthy Food by Healthy_Brunchy Sol+. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span>Mila, Algeria</span>
            <span aria-hidden="true">·</span>
            <span>Zero Seed Oils</span>
            <span aria-hidden="true">·</span>
            <span>100% Calculated Nutrition</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

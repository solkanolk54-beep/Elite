import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, ZoomIn, Eye } from 'lucide-react';

interface Sheet {
  id: string;
  titleEn: string;
  titleAr: string;
  imagePath: string;
  categoryTag: string;
}

const SHEETS: Sheet[] = [
  {
    id: 'cover',
    titleEn: 'Brand Cover & Identity',
    titleAr: 'غلاف وهوية المنيو',
    imagePath: '/assets/aistudio/1794091301776_ddd72469.jpg',
    categoryTag: 'Branding',
  },
  {
    id: 'guide',
    titleEn: 'How to Read Menu Guide',
    titleAr: 'دليل قراءة المنيو',
    imagePath: '/assets/aistudio/1794091353349_6d90da71.jpg',
    categoryTag: 'Nutrition Guide',
  },
  {
    id: 'chicken',
    titleEn: 'Chicken Meals (14 Items)',
    titleAr: 'وجبات الدجاج',
    imagePath: '/assets/aistudio/FB_IMG_1794090559700_1a32a5a8.jpg',
    categoryTag: 'Poultry',
  },
  {
    id: 'beef',
    titleEn: 'Meat Meals (Beef)',
    titleAr: 'وجبات اللحم البقري',
    imagePath: '/assets/aistudio/FB_IMG_1794090565131_3e85be4b.jpg',
    categoryTag: 'Prime Beef',
  },
  {
    id: 'burgers',
    titleEn: 'Healthy Burger Meals',
    titleAr: 'وجبات البرجر الصحي',
    imagePath: '/assets/aistudio/1794170423126_2a9ddfab.jpg',
    categoryTag: 'Oven Burgers',
  },
  {
    id: 'pizza',
    titleEn: 'Healthy Pizza Meals',
    titleAr: 'وجبات البيتزا الصحية',
    imagePath: '/assets/aistudio/1794170417258_469990d4.jpg',
    categoryTag: 'Artisan Pizza',
  },
  {
    id: 'sandwiches',
    titleEn: 'Sandwiches & Tortillas',
    titleAr: 'سندوتشات وتورتيلا',
    imagePath: '/assets/aistudio/FB_IMG_1794090598133_644c19fc.jpg',
    categoryTag: 'Ciabatta & Wraps',
  },
  {
    id: 'shawarma',
    titleEn: 'Shawrma Meals & Boxes',
    titleAr: 'وجبات الشاورما والبوكسات',
    imagePath: '/assets/aistudio/FB_IMG_1794090610655_a056e4f6.jpg',
    categoryTag: 'Shawarma',
  },
  {
    id: 'pastries',
    titleEn: 'Healthy Pastries & Safiha',
    titleAr: 'المعجنات والصفائح الصحية',
    imagePath: '/assets/aistudio/FB_IMG_1794090604454_4c5e1509.jpg',
    categoryTag: 'Pastries',
  },
  {
    id: 'upcoming',
    titleEn: 'Soon: Salads & Kids Meals',
    titleAr: 'قريباً: سلطات وأطفال',
    imagePath: '/assets/aistudio/FB_IMG_1794090614595_a6cc48f8.jpg',
    categoryTag: 'Upcoming',
  },
];

interface OriginalSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'ar';
  initialSheetIndex?: number;
}

export const OriginalSheetModal: React.FC<OriginalSheetModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialSheetIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialSheetIndex);

  if (!isOpen) return null;

  const currentSheet = SHEETS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? SHEETS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === SHEETS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-hidden">
      <div 
        className="relative w-full max-w-4xl h-[92vh] bg-[#13271c] border border-[#a3c9a8]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Control Bar */}
        <div className="px-5 py-3.5 bg-[#0c1912] border-b border-[#a3c9a8]/20 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#a3c9a8] uppercase tracking-wider font-mono">
              Sheet {currentIndex + 1} of {SHEETS.length}
            </span>
            <span className="text-white/20">|</span>
            <h2 className="text-sm sm:text-base font-bold text-white font-heading truncate">
              {lang === 'en' ? currentSheet.titleEn : currentSheet.titleAr}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={currentSheet.imagePath}
              download
              target="_blank"
              rel="noreferrer"
              className="p-2 text-white/70 hover:text-white bg-[#183325] hover:bg-[#1e3f2e] rounded-lg transition-colors cursor-pointer"
              title="Open full resolution in new tab"
            >
              <Eye className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white bg-[#183325] hover:bg-[#1e3f2e] rounded-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="px-4 py-2 bg-[#0c1912]/80 border-b border-[#a3c9a8]/10 flex items-center gap-2 overflow-x-auto shrink-0">
          {SHEETS.map((sheet, idx) => {
            const active = idx === currentIndex;
            return (
              <button
                key={sheet.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-all font-medium cursor-pointer ${
                  active
                    ? 'bg-[#1b3b2b] text-[#a3c9a8] border border-[#a3c9a8]/50 font-bold'
                    : 'text-white/60 hover:text-white hover:bg-[#183325]'
                }`}
              >
                {lang === 'en' ? sheet.titleEn.split(' ')[0] : sheet.titleAr.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Image Display Area with Navigation Arrows */}
        <div className="relative flex-1 bg-[#07100b] flex items-center justify-center p-4 overflow-auto">
          
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 z-10 p-2.5 bg-black/60 hover:bg-[#183325] text-white rounded-full border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
            aria-label="Previous sheet"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Image */}
          <div className="max-h-full max-w-full flex items-center justify-center">
            <img
              src={currentSheet.imagePath}
              alt={currentSheet.titleEn}
              className="max-h-[70vh] sm:max-h-[74vh] w-auto object-contain rounded-lg shadow-2xl border border-[#a3c9a8]/20"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 z-10 p-2.5 bg-black/60 hover:bg-[#183325] text-white rounded-full border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
            aria-label="Next sheet"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Footer Notes */}
        <div className="px-5 py-3 bg-[#0c1912] border-t border-[#a3c9a8]/20 flex items-center justify-between text-xs text-white/60 shrink-0">
          <span>{lang === 'en' ? 'Official Healthy_Brunchy Sol+ Print Archive · Mila, Algeria' : 'أرشيف المنيو المطبوع الرسمي لمطعم إيليت بميلة'}</span>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Use arrows or tabs to switch pages</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export type CategoryId = 
  | 'chicken'
  | 'beef'
  | 'burgers'
  | 'pizza'
  | 'sandwiches'
  | 'shawarma'
  | 'pastries'
  | 'upcoming';

export interface MacroNutrients {
  calories: number;
  fats: number;
  protein: number;
  carbs: number;
}

export interface CarbOption {
  id: string;
  nameEn: string;
  nameAr: string;
  portionGrams: number;
  macros: MacroNutrients;
  descriptionEn: string;
  descriptionAr: string;
  tag?: string;
}

export interface IngredientMarketPrices {
  chickenPerKg: number; // 800 DZD
  beefPerKg: number;    // 3000 DZD
  oliveOilPerLiter: number; // 1000 DZD
  tomatoesPerKg: number; // 200 DZD
  potatoesPerKg: number; // 100 DZD
  peppersPerKg: number;  // 180 DZD
  dietCheesePerPiece: number; // 60 DZD
  basmatiRicePerKg: number; // 360 DZD
  bulgurPerKg: number;      // 300 DZD
  veggiesMixPerKg: number;  // 200 DZD (180 - 230 DZD)
}

export interface IngredientCostBreakdown {
  proteinType: 'chicken' | 'beef' | 'tuna' | 'egg' | 'vegetarian';
  proteinGrams: number;
  rawProteinCostDZD: number;
  carbType?: string;
  carbGrams?: number;
  rawCarbCostDZD?: number;
  produceCostDZD: number;
  oliveOilCostDZD: number;
  dietCheeseCostDZD?: number;
  packagingAndPrepCostDZD: number;
  totalFoodCostDZD: number;
  foodCostPercentage: number;
  grossMarginDZD: number;
}

export interface MenuItem {
  id: string;
  categoryId: CategoryId;
  nameEn: string;
  nameAr: string;
  priceDZD: number; // in DZD (e.g. 580 DZD)
  priceRaw: number; // menu shorthand / thousands of centimes (e.g. 58)
  priceCentimes: number; // e.g. 580 DZD = 58,000 centimes / 58 ألف
  weight: string; // e.g. "150g", "200g", "2 Skewers", etc.
  weightGrams?: number;
  macros: MacroNutrients;
  allowsCarbCustomization: boolean;
  descriptionEn?: string;
  descriptionAr?: string;
  isPopular?: boolean;
  isAthleteFavorite?: boolean;
  costBreakdown?: IngredientCostBreakdown;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  selectedCarb: CarbOption | null;
  quantity: number;
  customNote?: string;
  calculatedMacros: MacroNutrients;
  unitPriceDZD: number;
  totalPriceDZD: number;
}

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  orderType: 'takeaway' | 'delivery' | 'dine_in' | 'gym_drop';
  deliveryAddress?: string;
  gymOrLocation?: string;
  notes?: string;
}

export type DietGoal = 'all' | 'high_protein' | 'low_carb' | 'clean_bulk' | 'lean_cut';

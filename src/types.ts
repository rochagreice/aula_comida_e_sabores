export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'mains' | 'desserts' | 'sweets';
  price: number;
  image: string;
  tags: string[]; // e.g. "Sem Glúten", "Vegano", "Mais Vendido"
  calories: number;
  prepTime: string; // e.g. "15 min"
  ingredients: string[];
}

export interface CustomIngredient {
  id: string;
  name: string;
  category: 'base' | 'protein' | 'bean' | 'side' | 'extra';
  price: number;
  calories: number;
  dietary: string[]; // e.g. ["Vegano", "Sem Glúten"]
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  isCustomPlate?: boolean;
  customIngredients?: string[];
}

export type MenuFilter = 'all' | 'mains' | 'desserts' | 'sweets';

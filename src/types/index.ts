
export interface User {
  id: string;
  username: string;
  dietaryPreferences: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  quantity?: string;
  unit?: string;
}

export type IngredientCategory = 'Produce' | 'Meat' | 'Dairy' | 'Grains' | 'Seasonings' | 'Other';

export interface Recipe {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  ingredients: RecipeIngredient[];
  steps: string[];
  dietaryTags: string[];
  mealType: MealType[];
  prepTime: number;
  cookTime: number;
  servings: number;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  optional: boolean;
  substitutes?: string[];
}

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';

export interface ShoppingListItem extends Ingredient {
  checked: boolean;
}

export interface MealPlan {
  id: string;
  date: Date;
  meals: {
    type: MealType;
    recipeId: string;
  }[];
}

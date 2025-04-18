
import React from "react";
import { Recipe, RecipeIngredient } from "@/types";
import { usePantry } from "@/context/PantryContext";
import { useShoppingList } from "@/context/ShoppingListContext";
import { useMealPlan } from "@/context/MealPlanContext";
import { Button } from "@/components/ui/button";
import { Clock, User, UtensilsCrossed, Plus, Calendar, ShoppingBag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { MealType } from "@/types";

interface RecipeDetailProps {
  recipe: Recipe;
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const { hasIngredient } = usePantry();
  const { addToShoppingList } = useShoppingList();
  const { addMealToDate } = useMealPlan();
  
  const handleAddMissingToList = () => {
    const missingIngredients = recipe.ingredients.filter(
      ingredient => !hasIngredient(ingredient.name) && !ingredient.optional
    );
    
    missingIngredients.forEach(ingredient => {
      addToShoppingList({
        name: ingredient.name,
        category: 'Other',
        quantity: ingredient.quantity,
        unit: ingredient.unit
      });
    });
    
    toast({
      title: "Added to Shopping List",
      description: `${missingIngredients.length} missing ingredient${missingIngredients.length === 1 ? '' : 's'} added to your shopping list.`,
    });
  };
  
  const handleAddToMealPlan = (mealType: MealType) => {
    const today = new Date();
    addMealToDate(today, mealType, recipe.id);
  };

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="aspect-video w-full overflow-hidden rounded-xl mb-6">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center text-gray-600">
            <User className="h-4 w-4 mr-1" />
            <span>By {recipe.author}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{totalTime} min</span>
          </div>
          <div className="flex items-center text-gray-600">
            <UtensilsCrossed className="h-4 w-4 mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.dietaryTags.map((tag) => (
            <span 
              key={tag} 
              className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {recipe.mealType.map((type) => (
            <span 
              key={type} 
              className="text-sm bg-kitchen-primary bg-opacity-10 text-kitchen-primary px-3 py-1 rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
        
        <p className="text-gray-700">{recipe.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient) => (
              <IngredientItem 
                key={ingredient.id} 
                ingredient={ingredient} 
                available={hasIngredient(ingredient.name)}
              />
            ))}
          </ul>
          
          <div className="mt-6 space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleAddMissingToList}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add Missing to Shopping List
            </Button>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <Select onValueChange={handleAddToMealPlan}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Add to Meal Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Lunch">Lunch</SelectItem>
                  <SelectItem value="Dinner">Dinner</SelectItem>
                  <SelectItem value="Snack">Snack</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Preparation</h2>
          <ol className="list-decimal list-inside space-y-4">
            {recipe.steps.map((step, index) => (
              <li key={index} className="text-gray-700">
                <span className="ml-2">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

interface IngredientItemProps {
  ingredient: RecipeIngredient;
  available: boolean;
}

function IngredientItem({ ingredient, available }: IngredientItemProps) {
  return (
    <li className="flex items-center justify-between">
      <div className="flex-1">
        <span className={available ? 'text-gray-800' : 'text-gray-500'}>
          {ingredient.quantity} {ingredient.unit} {ingredient.name}
        </span>
        {ingredient.optional && (
          <span className="text-xs text-gray-500 ml-1">(optional)</span>
        )}
      </div>
      {!available && !ingredient.optional && (
        <span className="missing-ingredient-tag ml-2">Missing</span>
      )}
      {available && (
        <span className="ingredient-tag ml-2">In Pantry</span>
      )}
    </li>
  );
}

export default RecipeDetail;

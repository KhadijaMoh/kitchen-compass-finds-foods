
import React from "react";
import { Recipe } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { usePantry } from "@/context/PantryContext";
import { Clock, User, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  recipe: Recipe;
  showMatchedIngredients?: boolean;
}

export function RecipeCard({ recipe, showMatchedIngredients = false }: RecipeCardProps) {
  const { hasIngredient } = usePantry();
  
  const totalIngredients = recipe.ingredients.length;
  const availableIngredients = recipe.ingredients.filter(
    ingredient => hasIngredient(ingredient.name)
  ).length;
  
  const matchRatio = totalIngredients > 0 ? availableIngredients / totalIngredients : 0;
  const matchPercentage = Math.round(matchRatio * 100);

  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Card className="recipe-card h-full flex flex-col overflow-hidden">
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{recipe.title}</h3>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">{recipe.description}</p>
        </CardHeader>
        <CardContent className="p-4 grow">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{recipe.author}</span>
            </div>
          </div>
          
          {showMatchedIngredients && (
            <div className="mt-1 text-sm">
              <div className="flex justify-between items-center">
                <span>Pantry match:</span>
                <span className={`font-semibold ${matchPercentage >= 70 ? 'text-green-600' : matchPercentage >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
                  {matchPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div
                  className={`h-1.5 rounded-full ${
                    matchPercentage >= 70 ? 'bg-green-600' : matchPercentage >= 40 ? 'bg-amber-600' : 'bg-red-600'
                  }`}
                  style={{ width: `${matchPercentage}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-wrap gap-1">
          {recipe.dietaryTags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {recipe.mealType.slice(0, 1).map((type) => (
            <span 
              key={type} 
              className="text-xs bg-kitchen-primary bg-opacity-10 text-kitchen-primary px-2 py-1 rounded-full"
            >
              {type}
            </span>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}

export default RecipeCard;


import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recipe, RecipeIngredient } from '@/types';
import { useAuth } from './AuthContext';
import { toast } from '@/components/ui/use-toast';
import { usePantry } from './PantryContext';
import { mockRecipes } from '@/data/mockRecipes';

interface RecipeContextType {
  recipes: Recipe[];
  userRecipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  updateRecipe: (id: string, updates: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  getRecipeById: (id: string) => Recipe | undefined;
  getMatchingRecipes: (threshold?: number) => Recipe[];
  getMissingIngredients: (recipeId: string) => RecipeIngredient[];
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const { isAuthenticated, currentUser } = useAuth();
  const { pantryItems, hasIngredient } = usePantry();

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const storedRecipes = localStorage.getItem(`user-recipes-${currentUser.id}`);
      if (storedRecipes) {
        setUserRecipes(JSON.parse(storedRecipes));
      }
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      localStorage.setItem(`user-recipes-${currentUser.id}`, JSON.stringify(userRecipes));
    }
  }, [userRecipes, isAuthenticated, currentUser]);

  const addRecipe = (recipe: Omit<Recipe, 'id'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: crypto.randomUUID(),
    };
    
    setUserRecipes(prev => [...prev, newRecipe]);
    toast({
      title: "Recipe Added",
      description: `"${recipe.title}" has been added to your recipes.`,
    });
  };

  const updateRecipe = (id: string, updates: Partial<Recipe>) => {
    setUserRecipes(prev => 
      prev.map(recipe => recipe.id === id ? { ...recipe, ...updates } : recipe)
    );
    toast({
      title: "Recipe Updated",
      description: "Your recipe has been updated successfully.",
    });
  };

  const deleteRecipe = (id: string) => {
    setUserRecipes(prev => prev.filter(recipe => recipe.id !== id));
    toast({
      title: "Recipe Deleted",
      description: "The recipe has been deleted from your collection.",
    });
  };

  const getRecipeById = (id: string) => {
    return [...recipes, ...userRecipes].find(recipe => recipe.id === id);
  };

  const getMatchingRecipes = (threshold = 0.7) => {
    const allRecipes = [...recipes, ...userRecipes];
    
    return allRecipes.map(recipe => {
      const totalIngredients = recipe.ingredients.length;
      const availableIngredients = recipe.ingredients.filter(
        ingredient => hasIngredient(ingredient.name)
      ).length;
      
      const matchRatio = totalIngredients > 0 ? availableIngredients / totalIngredients : 0;
      
      return {
        ...recipe,
        matchRatio,
      };
    })
    .filter(recipe => recipe.matchRatio >= threshold)
    .sort((a, b) => b.matchRatio - a.matchRatio);
  };

  const getMissingIngredients = (recipeId: string) => {
    const recipe = getRecipeById(recipeId);
    if (!recipe) return [];

    return recipe.ingredients.filter(
      ingredient => !hasIngredient(ingredient.name) && !ingredient.optional
    );
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        userRecipes,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        getRecipeById,
        getMatchingRecipes,
        getMissingIngredients,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

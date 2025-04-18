
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ingredient, IngredientCategory } from '@/types';
import { useAuth } from './AuthContext';
import { toast } from '@/components/ui/use-toast';

interface PantryContextType {
  pantryItems: Ingredient[];
  addToPantry: (ingredient: Omit<Ingredient, 'id'>) => void;
  removeFromPantry: (id: string) => void;
  updatePantryItem: (id: string, updates: Partial<Ingredient>) => void;
  clearPantry: () => void;
  getIngredientsByCategory: (category: IngredientCategory) => Ingredient[];
  hasIngredient: (name: string) => boolean;
}

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export const PantryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pantryItems, setPantryItems] = useState<Ingredient[]>([]);
  const { isAuthenticated, currentUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const storedPantry = localStorage.getItem(`pantry-${currentUser.id}`);
      if (storedPantry) {
        setPantryItems(JSON.parse(storedPantry));
      }
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      localStorage.setItem(`pantry-${currentUser.id}`, JSON.stringify(pantryItems));
    }
  }, [pantryItems, isAuthenticated, currentUser]);

  const addToPantry = (ingredient: Omit<Ingredient, 'id'>) => {
    const newItem: Ingredient = {
      ...ingredient,
      id: crypto.randomUUID(),
    };
    
    setPantryItems(prev => [...prev, newItem]);
    toast({
      title: "Added to Pantry",
      description: `${ingredient.name} has been added to your pantry.`,
    });
  };

  const removeFromPantry = (id: string) => {
    setPantryItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Removed from Pantry",
      description: "The ingredient has been removed from your pantry.",
    });
  };

  const updatePantryItem = (id: string, updates: Partial<Ingredient>) => {
    setPantryItems(prev => 
      prev.map(item => item.id === id ? { ...item, ...updates } : item)
    );
    toast({
      title: "Updated Pantry Item",
      description: "The ingredient has been updated in your pantry.",
    });
  };

  const clearPantry = () => {
    setPantryItems([]);
    toast({
      title: "Pantry Cleared",
      description: "All ingredients have been removed from your pantry.",
    });
  };

  const getIngredientsByCategory = (category: IngredientCategory) => {
    return pantryItems.filter(item => item.category === category);
  };

  const hasIngredient = (name: string) => {
    return pantryItems.some(item => 
      item.name.toLowerCase() === name.toLowerCase()
    );
  };

  return (
    <PantryContext.Provider
      value={{
        pantryItems,
        addToPantry,
        removeFromPantry,
        updatePantryItem,
        clearPantry,
        getIngredientsByCategory,
        hasIngredient,
      }}
    >
      {children}
    </PantryContext.Provider>
  );
};

export const usePantry = () => {
  const context = useContext(PantryContext);
  if (context === undefined) {
    throw new Error('usePantry must be used within a PantryProvider');
  }
  return context;
};

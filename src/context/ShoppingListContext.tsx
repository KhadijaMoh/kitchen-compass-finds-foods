
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShoppingListItem, Ingredient } from '@/types';
import { useAuth } from './AuthContext';
import { toast } from '@/components/ui/use-toast';

interface ShoppingListContextType {
  shoppingList: ShoppingListItem[];
  addToShoppingList: (ingredient: Omit<Ingredient, 'id'>) => void;
  removeFromShoppingList: (id: string) => void;
  updateShoppingListItem: (id: string, updates: Partial<ShoppingListItem>) => void;
  toggleItemChecked: (id: string) => void;
  clearShoppingList: () => void;
  clearCheckedItems: () => void;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export const ShoppingListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const { isAuthenticated, currentUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const storedList = localStorage.getItem(`shopping-list-${currentUser.id}`);
      if (storedList) {
        setShoppingList(JSON.parse(storedList));
      }
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      localStorage.setItem(`shopping-list-${currentUser.id}`, JSON.stringify(shoppingList));
    }
  }, [shoppingList, isAuthenticated, currentUser]);

  const addToShoppingList = (ingredient: Omit<Ingredient, 'id'>) => {
    const newItem: ShoppingListItem = {
      ...ingredient,
      id: crypto.randomUUID(),
      checked: false,
    };
    
    setShoppingList(prev => [...prev, newItem]);
    toast({
      title: "Added to Shopping List",
      description: `${ingredient.name} has been added to your shopping list.`,
    });
  };

  const removeFromShoppingList = (id: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Removed from Shopping List",
      description: "The item has been removed from your shopping list.",
    });
  };

  const updateShoppingListItem = (id: string, updates: Partial<ShoppingListItem>) => {
    setShoppingList(prev => 
      prev.map(item => item.id === id ? { ...item, ...updates } : item)
    );
  };

  const toggleItemChecked = (id: string) => {
    setShoppingList(prev => 
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const clearShoppingList = () => {
    setShoppingList([]);
    toast({
      title: "Shopping List Cleared",
      description: "All items have been removed from your shopping list.",
    });
  };

  const clearCheckedItems = () => {
    setShoppingList(prev => prev.filter(item => !item.checked));
    toast({
      title: "Checked Items Cleared",
      description: "All checked items have been removed from your shopping list.",
    });
  };

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingList,
        addToShoppingList,
        removeFromShoppingList,
        updateShoppingListItem,
        toggleItemChecked,
        clearShoppingList,
        clearCheckedItems,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (context === undefined) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
};

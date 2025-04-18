
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MealPlan, MealType } from '@/types';
import { useAuth } from './AuthContext';
import { toast } from '@/components/ui/use-toast';

interface MealPlanContextType {
  mealPlans: MealPlan[];
  addMealPlan: (mealPlan: Omit<MealPlan, 'id'>) => void;
  updateMealPlan: (id: string, updates: Partial<MealPlan>) => void;
  deleteMealPlan: (id: string) => void;
  addMealToDate: (date: Date, mealType: MealType, recipeId: string) => void;
  removeMealFromDate: (id: string, mealType: MealType) => void;
  getMealPlanByDate: (date: Date) => MealPlan | undefined;
  getWeeklyMealPlans: (startDate: Date) => MealPlan[];
}

const MealPlanContext = createContext<MealPlanContextType | undefined>(undefined);

export const MealPlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const { isAuthenticated, currentUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const storedMealPlans = localStorage.getItem(`meal-plans-${currentUser.id}`);
      if (storedMealPlans) {
        const parsedPlans = JSON.parse(storedMealPlans);
        // Convert date strings back to Date objects
        const plansWithDates = parsedPlans.map((plan: any) => ({
          ...plan,
          date: new Date(plan.date)
        }));
        setMealPlans(plansWithDates);
      }
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      localStorage.setItem(`meal-plans-${currentUser.id}`, JSON.stringify(mealPlans));
    }
  }, [mealPlans, isAuthenticated, currentUser]);

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const addMealPlan = (mealPlan: Omit<MealPlan, 'id'>) => {
    const newMealPlan: MealPlan = {
      ...mealPlan,
      id: crypto.randomUUID(),
    };
    
    setMealPlans(prev => [...prev, newMealPlan]);
    toast({
      title: "Meal Plan Added",
      description: "Your meal plan has been created successfully.",
    });
  };

  const updateMealPlan = (id: string, updates: Partial<MealPlan>) => {
    setMealPlans(prev => 
      prev.map(plan => plan.id === id ? { ...plan, ...updates } : plan)
    );
    toast({
      title: "Meal Plan Updated",
      description: "Your meal plan has been updated successfully.",
    });
  };

  const deleteMealPlan = (id: string) => {
    setMealPlans(prev => prev.filter(plan => plan.id !== id));
    toast({
      title: "Meal Plan Deleted",
      description: "The meal plan has been deleted successfully.",
    });
  };

  const getMealPlanByDate = (date: Date) => {
    return mealPlans.find(plan => isSameDay(new Date(plan.date), date));
  };

  const addMealToDate = (date: Date, mealType: MealType, recipeId: string) => {
    const existingPlan = getMealPlanByDate(date);
    
    if (existingPlan) {
      // Remove any existing meal of the same type
      const updatedMeals = existingPlan.meals.filter(meal => meal.type !== mealType);
      // Add the new meal
      updateMealPlan(existingPlan.id, {
        meals: [...updatedMeals, { type: mealType, recipeId }]
      });
    } else {
      // Create a new meal plan for the date
      addMealPlan({
        date,
        meals: [{ type: mealType, recipeId }]
      });
    }
    
    toast({
      title: "Meal Added",
      description: `The meal has been added to your plan for ${date.toLocaleDateString()}.`,
    });
  };

  const removeMealFromDate = (id: string, mealType: MealType) => {
    const plan = mealPlans.find(p => p.id === id);
    if (!plan) return;
    
    const updatedMeals = plan.meals.filter(meal => meal.type !== mealType);
    
    if (updatedMeals.length === 0) {
      // If no meals left, delete the whole plan
      deleteMealPlan(id);
    } else {
      // Update the plan with the meal removed
      updateMealPlan(id, { meals: updatedMeals });
    }
    
    toast({
      title: "Meal Removed",
      description: "The meal has been removed from your plan.",
    });
  };

  const getWeeklyMealPlans = (startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    return mealPlans.filter(plan => {
      const planDate = new Date(plan.date);
      return planDate >= startDate && planDate <= endDate;
    });
  };

  return (
    <MealPlanContext.Provider
      value={{
        mealPlans,
        addMealPlan,
        updateMealPlan,
        deleteMealPlan,
        addMealToDate,
        removeMealFromDate,
        getMealPlanByDate,
        getWeeklyMealPlans,
      }}
    >
      {children}
    </MealPlanContext.Provider>
  );
};

export const useMealPlan = () => {
  const context = useContext(MealPlanContext);
  if (context === undefined) {
    throw new Error('useMealPlan must be used within a MealPlanProvider');
  }
  return context;
};

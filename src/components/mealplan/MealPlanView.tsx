
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMealPlan } from "@/context/MealPlanContext";
import { useRecipes } from "@/context/RecipeContext";
import { format, addDays, startOfWeek } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { MealType } from "@/types";
import { Link } from "react-router-dom";

const MEAL_TYPES: MealType[] = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];

export function MealPlanView() {
  const { mealPlans, getMealPlanByDate, removeMealFromDate } = useMealPlan();
  const { getRecipeById } = useRecipes();
  
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    return startOfWeek(new Date(), { weekStartsOn: 1 }); // Start on Monday
  });
  
  const handlePreviousWeek = () => {
    setCurrentWeekStart(prev => addDays(prev, -7));
  };
  
  const handleNextWeek = () => {
    setCurrentWeekStart(prev => addDays(prev, 7));
  };
  
  const getDayLabel = (date: Date) => {
    return format(date, "EEE, MMM d");
  };
  
  const renderMealForType = (date: Date, mealType: MealType) => {
    const dayPlan = getMealPlanByDate(date);
    
    if (!dayPlan) return null;
    
    const meal = dayPlan.meals.find(m => m.type === mealType);
    if (!meal) return null;
    
    const recipe = getRecipeById(meal.recipeId);
    if (!recipe) return null;
    
    return (
      <div className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
        <Link to={`/recipe/${recipe.id}`} className="text-sm font-medium hover:text-kitchen-primary truncate">
          {recipe.title}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => removeMealFromDate(dayPlan.id, mealType)}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    );
  };

  // Generate the days of the week
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Meal Planner</h2>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="font-medium">
            {format(currentWeekStart, "MMM d")} - {format(addDays(currentWeekStart, 6), "MMM d, yyyy")}
          </div>
          
          <Button variant="outline" size="icon" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-2">
            {/* Header row with empty corner and days */}
            <div className="bg-gray-100 p-3 text-center font-medium rounded-tl-md">
              <Calendar className="h-5 w-5 mx-auto" />
            </div>
            {weekDays.map((day, index) => (
              <div 
                key={index} 
                className="bg-gray-100 p-3 text-center font-medium"
              >
                {getDayLabel(day)}
              </div>
            ))}
            
            {/* Meal type rows */}
            {MEAL_TYPES.map((mealType) => (
              <React.Fragment key={mealType}>
                {/* Meal type label */}
                <div className="bg-gray-100 p-3 font-medium">
                  {mealType}
                </div>
                
                {/* Meal cells for each day */}
                {weekDays.map((day, dayIndex) => (
                  <div 
                    key={`${mealType}-${dayIndex}`}
                    className="p-1 min-h-[60px] border border-gray-100 bg-gray-50"
                  >
                    {renderMealForType(day, mealType) || (
                      <Link 
                        to="/browse-recipes" 
                        className="h-full flex items-center justify-center text-xs text-gray-400 hover:text-kitchen-primary"
                      >
                        Add {mealType.toLowerCase()}
                      </Link>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      
      {mealPlans.length === 0 && (
        <div className="text-center py-6 mt-4">
          <p className="text-gray-500">
            No meals planned yet. Browse recipes and add them to your meal plan.
          </p>
          <Link to="/browse-recipes">
            <Button variant="link">Find Recipes</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default MealPlanView;

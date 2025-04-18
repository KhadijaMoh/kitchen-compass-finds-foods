
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRecipes } from "@/context/RecipeContext";
import { Recipe, MealType } from "@/types";
import { RecipeCard } from "./RecipeCard";
import { Plus, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const MEAL_TYPES: MealType[] = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];
const DIETARY_TAGS = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Paleo"];

interface RecipeListProps {
  recipes: Recipe[];
  userRecipes?: boolean;
  fromPantry?: boolean;
}

export function RecipeList({ recipes, userRecipes = false, fromPantry = false }: RecipeListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMealTypes, setSelectedMealTypes] = useState<MealType[]>([]);
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<string[]>([]);
  const [matchThreshold, setMatchThreshold] = useState([70]); // Default to 70%
  
  const handleMealTypeChange = (type: MealType) => {
    setSelectedMealTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  const handleDietaryTagChange = (tag: string) => {
    setSelectedDietaryTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  const filteredRecipes = recipes.filter(recipe => {
    // Filter by search term
    if (searchTerm && !recipe.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by meal type
    if (selectedMealTypes.length > 0 && !recipe.mealType.some(type => selectedMealTypes.includes(type))) {
      return false;
    }
    
    // Filter by dietary tags
    if (selectedDietaryTags.length > 0 && !selectedDietaryTags.every(tag => recipe.dietaryTags.includes(tag))) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {userRecipes ? "My Recipes" : fromPantry ? "Recipes from Your Pantry" : "Browse Recipes"}
        </h2>
        
        {userRecipes && (
          <Link to="/add-recipe">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Recipe
            </Button>
          </Link>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes..."
            className="pl-10"
          />
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="filters">
            <AccordionTrigger className="py-2">
              <span className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
                <div className="space-y-3">
                  <h3 className="font-medium">Meal Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {MEAL_TYPES.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`filter-meal-${type}`}
                          checked={selectedMealTypes.includes(type)}
                          onCheckedChange={() => handleMealTypeChange(type)}
                        />
                        <Label htmlFor={`filter-meal-${type}`}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Dietary Preferences</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {DIETARY_TAGS.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`filter-tag-${tag}`}
                          checked={selectedDietaryTags.includes(tag)}
                          onCheckedChange={() => handleDietaryTagChange(tag)}
                        />
                        <Label htmlFor={`filter-tag-${tag}`}>{tag}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {fromPantry && (
                  <div className="space-y-3 col-span-full">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Pantry Match</h3>
                      <span className="text-sm font-medium">{matchThreshold[0]}%</span>
                    </div>
                    <Slider
                      value={matchThreshold}
                      onValueChange={setMatchThreshold}
                      min={0}
                      max={100}
                      step={10}
                    />
                    <p className="text-sm text-gray-500">
                      Show recipes where you have at least {matchThreshold[0]}% of the ingredients
                    </p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-md">
          <p className="text-gray-500">No recipes found matching your criteria.</p>
          {userRecipes && (
            <Link to="/add-recipe">
              <Button variant="link">Create your first recipe</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              showMatchedIngredients={fromPantry}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeList;

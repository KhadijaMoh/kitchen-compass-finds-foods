
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRecipes } from "@/context/RecipeContext";
import { Recipe, MealType, RecipeIngredient } from "@/types";
import { Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const MEAL_TYPES: MealType[] = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];
const DIETARY_TAGS = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Paleo"];

export function RecipeForm() {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<Omit<RecipeIngredient, "id">[]>([
    { name: "", quantity: "", unit: "", optional: false }
  ]);
  const [steps, setSteps] = useState<string[]>([""]);
  const [mealTypes, setMealTypes] = useState<MealType[]>([]);
  const [dietaryTags, setDietaryTags] = useState<string[]>([]);
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "", optional: false }]);
  };
  
  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };
  
  const handleIngredientChange = (index: number, field: keyof Omit<RecipeIngredient, "id">, value: any) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };
  
  const handleAddStep = () => {
    setSteps([...steps, ""]);
  };
  
  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };
  
  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };
  
  const handleMealTypeChange = (type: MealType) => {
    setMealTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  const handleDietaryTagChange = (tag: string) => {
    setDietaryTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty ingredients and steps
    const filteredIngredients = ingredients.filter(ing => ing.name.trim() !== "");
    const filteredSteps = steps.filter(step => step.trim() !== "");
    
    if (filteredIngredients.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }
    
    if (filteredSteps.length === 0) {
      alert("Please add at least one step.");
      return;
    }
    
    const newRecipe: Omit<Recipe, "id"> = {
      title,
      author: "You", // Currently hardcoded as the logged-in user
      description,
      imageUrl: "/lovable-uploads/face83d4-cc3a-41a0-8a35-757bc6fa1da6.png", // Placeholder image
      ingredients: filteredIngredients.map((ing, idx) => ({
        ...ing,
        id: `new-${idx}`
      })),
      steps: filteredSteps,
      mealType: mealTypes.length > 0 ? mealTypes : ["Dinner"], // Default to dinner if none selected
      dietaryTags,
      prepTime: parseInt(prepTime) || 0,
      cookTime: parseInt(cookTime) || 0,
      servings: parseInt(servings) || 1
    };
    
    addRecipe(newRecipe);
    navigate("/my-recipes");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Information</h2>
        
        <div className="space-y-2">
          <Label htmlFor="title">Recipe Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Homemade Pizza"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of your recipe"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="prepTime">Prep Time (minutes)</Label>
            <Input
              id="prepTime"
              type="number"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              placeholder="e.g., 15"
              min="0"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cookTime">Cook Time (minutes)</Label>
            <Input
              id="cookTime"
              type="number"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              placeholder="e.g., 30"
              min="0"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="servings">Servings</Label>
            <Input
              id="servings"
              type="number"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              placeholder="e.g., 4"
              min="1"
              required
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Ingredients</h2>
          <Button type="button" variant="outline" size="sm" onClick={handleAddIngredient}>
            <Plus className="h-4 w-4 mr-1" />
            Add Ingredient
          </Button>
        </div>
        
        {ingredients.map((ingredient, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-4">
              <Input
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                placeholder="Ingredient name"
                required
              />
            </div>
            
            <div className="col-span-2">
              <Input
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                placeholder="Qty"
              />
            </div>
            
            <div className="col-span-2">
              <Input
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                placeholder="Unit"
              />
            </div>
            
            <div className="col-span-3 flex items-center space-x-2">
              <Checkbox
                id={`optional-${index}`}
                checked={ingredient.optional}
                onCheckedChange={(checked) => 
                  handleIngredientChange(index, "optional", checked === true)
                }
              />
              <Label htmlFor={`optional-${index}`} className="text-sm">
                Optional
              </Label>
            </div>
            
            <div className="col-span-1 flex justify-end">
              {ingredients.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Preparation Steps</h2>
          <Button type="button" variant="outline" size="sm" onClick={handleAddStep}>
            <Plus className="h-4 w-4 mr-1" />
            Add Step
          </Button>
        </div>
        
        {steps.map((step, index) => (
          <div key={index} className="flex space-x-2 items-start">
            <div className="mt-2 text-gray-500 font-medium">{index + 1}.</div>
            <Textarea
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              placeholder={`Step ${index + 1}`}
              className="flex-1"
              required
            />
            
            {steps.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveStep(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Meal Type</h2>
          <div className="grid grid-cols-2 gap-2">
            {MEAL_TYPES.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`meal-${type}`}
                  checked={mealTypes.includes(type)}
                  onCheckedChange={() => handleMealTypeChange(type)}
                />
                <Label htmlFor={`meal-${type}`}>{type}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Dietary Tags</h2>
          <div className="grid grid-cols-2 gap-2">
            {DIETARY_TAGS.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={`tag-${tag}`}
                  checked={dietaryTags.includes(tag)}
                  onCheckedChange={() => handleDietaryTagChange(tag)}
                />
                <Label htmlFor={`tag-${tag}`}>{tag}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button type="submit" className="w-full md:w-auto">
          Save Recipe
        </Button>
      </div>
    </form>
  );
}

export default RecipeForm;

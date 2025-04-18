
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePantry } from "@/context/PantryContext";
import { Ingredient, IngredientCategory } from "@/types";
import { Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { AddIngredientForm } from "./AddIngredientForm";

const CATEGORIES: IngredientCategory[] = [
  "Produce",
  "Meat",
  "Dairy",
  "Grains",
  "Seasonings",
  "Other"
];

export function PantryList() {
  const { pantryItems, removeFromPantry } = usePantry();

  const renderIngredientsList = (category: IngredientCategory) => {
    const filteredItems = pantryItems.filter(item => item.category === category);
    
    if (filteredItems.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          <p>No {category.toLowerCase()} items in your pantry yet.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-2">
        {filteredItems.map((item) => (
          <IngredientItem 
            key={item.id} 
            ingredient={item} 
            onDelete={() => removeFromPantry(item.id)} 
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Pantry</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Ingredient</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Ingredient to Pantry</DialogTitle>
            </DialogHeader>
            <AddIngredientForm />
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="Produce">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
          {CATEGORIES.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {CATEGORIES.map((category) => (
          <TabsContent key={category} value={category}>
            {renderIngredientsList(category)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface IngredientItemProps {
  ingredient: Ingredient;
  onDelete: () => void;
}

function IngredientItem({ ingredient, onDelete }: IngredientItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-md shadow">
      <div>
        <h3 className="font-medium">{ingredient.name}</h3>
        {ingredient.quantity && ingredient.unit && (
          <p className="text-sm text-gray-500">
            {ingredient.quantity} {ingredient.unit}
          </p>
        )}
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default PantryList;

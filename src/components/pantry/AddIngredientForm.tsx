
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePantry } from "@/context/PantryContext";
import { IngredientCategory } from "@/types";

const CATEGORIES: IngredientCategory[] = [
  "Produce",
  "Meat",
  "Dairy",
  "Grains",
  "Seasonings",
  "Other"
];

export function AddIngredientForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<IngredientCategory>("Other");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  
  const { addToPantry } = usePantry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addToPantry({
      name: name.trim(),
      category,
      quantity: quantity.trim(),
      unit: unit.trim()
    });
    
    // Reset form
    setName("");
    setCategory("Other");
    setQuantity("");
    setUnit("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Ingredient Name</Label>
        <Input
          id="name"
          placeholder="e.g., Tomatoes"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={(value) => setCategory(value as IngredientCategory)} required>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity (Optional)</Label>
          <Input
            id="quantity"
            placeholder="e.g., 2"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="unit">Unit (Optional)</Label>
          <Input
            id="unit"
            placeholder="e.g., cups"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Add to Pantry
      </Button>
    </form>
  );
}

export default AddIngredientForm;

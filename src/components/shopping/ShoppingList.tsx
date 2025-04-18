
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useShoppingList } from "@/context/ShoppingListContext";
import { ShoppingListItem, IngredientCategory } from "@/types";
import { Trash2, Pencil, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const CATEGORIES: IngredientCategory[] = [
  "Produce",
  "Meat",
  "Dairy",
  "Grains",
  "Seasonings",
  "Other"
];

export function ShoppingList() {
  const { 
    shoppingList, 
    toggleItemChecked, 
    removeFromShoppingList, 
    clearCheckedItems,
    addToShoppingList
  } = useShoppingList();
  
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState<IngredientCategory>("Other");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemUnit, setNewItemUnit] = useState("");

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    addToShoppingList({
      name: newItemName.trim(),
      category: newItemCategory,
      quantity: newItemQuantity.trim(),
      unit: newItemUnit.trim()
    });
    
    // Reset form
    setNewItemName("");
    setNewItemCategory("Other");
    setNewItemQuantity("");
    setNewItemUnit("");
  };

  const checkedItems = shoppingList.filter(item => item.checked);
  const uncheckedItems = shoppingList.filter(item => !item.checked);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Shopping List</h2>
        
        <div className="flex space-x-2">
          {checkedItems.length > 0 && (
            <Button variant="outline" onClick={clearCheckedItems}>
              Clear Checked Items
            </Button>
          )}
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add to Shopping List</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Tomatoes"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newItemCategory} 
                    onValueChange={(value) => setNewItemCategory(value as IngredientCategory)}
                  >
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
                      value={newItemQuantity}
                      onChange={(e) => setNewItemQuantity(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit (Optional)</Label>
                    <Input
                      id="unit"
                      placeholder="e.g., lbs"
                      value={newItemUnit}
                      onChange={(e) => setNewItemUnit(e.target.value)}
                    />
                  </div>
                </div>
                
                <DialogClose asChild>
                  <Button type="submit" className="w-full">
                    Add to Shopping List
                  </Button>
                </DialogClose>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {shoppingList.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">Your shopping list is empty.</p>
          <p className="text-gray-500">Add items or generate a list from recipes.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Unchecked items */}
          <div className="space-y-2">
            {uncheckedItems.map((item) => (
              <ShoppingItem
                key={item.id}
                item={item}
                onToggle={() => toggleItemChecked(item.id)}
                onDelete={() => removeFromShoppingList(item.id)}
              />
            ))}
          </div>
          
          {/* Checked items */}
          {checkedItems.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-500 mb-2">Checked Items</h3>
              <div className="space-y-2 opacity-60">
                {checkedItems.map((item) => (
                  <ShoppingItem
                    key={item.id}
                    item={item}
                    onToggle={() => toggleItemChecked(item.id)}
                    onDelete={() => removeFromShoppingList(item.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface ShoppingItemProps {
  item: ShoppingListItem;
  onToggle: () => void;
  onDelete: () => void;
}

function ShoppingItem({ item, onToggle, onDelete }: ShoppingItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-md shadow">
      <div className="flex items-center space-x-3">
        <Checkbox 
          checked={item.checked} 
          onCheckedChange={onToggle} 
          id={`item-${item.id}`}
        />
        <div>
          <Label
            htmlFor={`item-${item.id}`}
            className={`font-medium ${item.checked ? 'line-through text-gray-500' : ''}`}
          >
            {item.name}
          </Label>
          {item.quantity && item.unit && (
            <p className="text-sm text-gray-500">
              {item.quantity} {item.unit}
            </p>
          )}
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={onDelete}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default ShoppingList;


import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecipeCard } from "@/components/recipes/RecipeCard";
import { useAuth } from "@/context/AuthContext";
import { usePantry } from "@/context/PantryContext";
import { useRecipes } from "@/context/RecipeContext";
import { useShoppingList } from "@/context/ShoppingListContext";
import { Navigate, Link } from "react-router-dom";
import { Utensils, ShoppingBag, Apple, Book, Calendar } from "lucide-react";

export function Dashboard() {
  const { isAuthenticated, currentUser } = useAuth();
  const { pantryItems } = usePantry();
  const { recipes, userRecipes, getMatchingRecipes } = useRecipes();
  const { shoppingList } = useShoppingList();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Get recipes that match the user's pantry
  const matchingRecipes = getMatchingRecipes(0.7); // At least 70% match

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Welcome, {currentUser?.username}</h1>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link to="/my-pantry">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Apple className="w-4 h-4 mr-2 text-kitchen-primary" />
                  My Pantry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pantryItems.length}</div>
                <p className="text-xs text-gray-500">ingredients available</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/browse-recipes">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Utensils className="w-4 h-4 mr-2 text-kitchen-primary" />
                  Recipes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recipes.length + userRecipes.length}</div>
                <p className="text-xs text-gray-500">total recipes</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/my-recipes">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Book className="w-4 h-4 mr-2 text-kitchen-primary" />
                  My Recipes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userRecipes.length}</div>
                <p className="text-xs text-gray-500">personal recipes</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/shopping-list">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <ShoppingBag className="w-4 h-4 mr-2 text-kitchen-primary" />
                  Shopping List
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shoppingList.length}</div>
                <p className="text-xs text-gray-500">items on your list</p>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recipes from Your Pantry</h2>
            <Link to="/pantry-recipes">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          
          {matchingRecipes.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-2">No matching recipes found with your current pantry items.</p>
              <Link to="/my-pantry">
                <Button variant="link">Add ingredients to your pantry</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matchingRecipes.slice(0, 3).map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe}
                  showMatchedIngredients={true}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Pantry at a Glance</h2>
            <Card>
              <CardContent className="p-4">
                {pantryItems.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500 mb-2">Your pantry is empty.</p>
                    <Link to="/my-pantry">
                      <Button variant="outline" size="sm">Add Ingredients</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Category</span>
                      <span className="font-medium">Count</span>
                    </div>
                    {["Produce", "Meat", "Dairy", "Grains", "Seasonings"].map((category) => {
                      const count = pantryItems.filter(item => item.category === category).length;
                      return (
                        <div key={category} className="flex justify-between items-center py-1 border-b">
                          <span>{category}</span>
                          <span className="font-semibold">{count}</span>
                        </div>
                      );
                    })}
                    <div className="pt-4">
                      <Link to="/my-pantry">
                        <Button variant="link" className="p-0">Manage Pantry →</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Today's Meals</h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <Link to="/meal-plan">
                    <Button variant="outline" size="sm" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Go to Meal Planner
                    </Button>
                  </Link>
                  <p className="text-center text-gray-500">
                    Plan your meals for the week and automatically generate shopping lists.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;

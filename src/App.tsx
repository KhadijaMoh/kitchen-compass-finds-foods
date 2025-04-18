
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PantryProvider } from "@/context/PantryContext";
import { RecipeProvider } from "@/context/RecipeContext";
import { ShoppingListProvider } from "@/context/ShoppingListContext";
import { MealPlanProvider } from "@/context/MealPlanContext";

// Import pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPantry from "./pages/MyPantry";
import BrowseRecipes from "./pages/BrowseRecipes";
import MyRecipes from "./pages/MyRecipes";
import RecipeDetail from "./pages/RecipeDetail";
import AddRecipe from "./pages/AddRecipe";
import ShoppingList from "./pages/ShoppingList";
import MealPlan from "./pages/MealPlan";
import Profile from "./pages/Profile";
import About from "./pages/About";
import PantryRecipes from "./pages/PantryRecipes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PantryProvider>
        <RecipeProvider>
          <ShoppingListProvider>
            <MealPlanProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/my-pantry" element={<MyPantry />} />
                    <Route path="/browse-recipes" element={<BrowseRecipes />} />
                    <Route path="/pantry-recipes" element={<PantryRecipes />} />
                    <Route path="/my-recipes" element={<MyRecipes />} />
                    <Route path="/recipe/:id" element={<RecipeDetail />} />
                    <Route path="/add-recipe" element={<AddRecipe />} />
                    <Route path="/shopping-list" element={<ShoppingList />} />
                    <Route path="/meal-plan" element={<MealPlan />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </MealPlanProvider>
          </ShoppingListProvider>
        </RecipeProvider>
      </PantryProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

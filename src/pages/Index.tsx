
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Apple, Utensils, ShoppingBag, Calendar } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex items-center min-h-screen bg-gradient-to-b from-white to-green-50 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
        </div>
        <div className="container mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                <span className="text-kitchen-primary">KitchenSync</span>
                <br />
                Find recipes with what's in your pantry
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Discover delicious meals based on ingredients you already have, reduce food waste, and simplify your meal planning. 
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button size="lg" className="text-lg py-6 px-8">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="text-lg py-6 px-8">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="aspect-square w-full max-w-lg mx-auto bg-kitchen-accent/20 rounded-full p-8">
                <img 
                  src="/lovable-uploads/fccf3f46-acb9-4b32-ba66-1acfabd17d63.png" 
                  alt="Recipe screenshot" 
                  className="rounded-2xl shadow-xl transform rotate-2"
                />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-kitchen-primary/10 rounded-full"></div>
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-kitchen-secondary/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              KitchenSync makes cooking at home easier and more efficient by helping you use what you already have.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-kitchen-primary/20 rounded-full flex items-center justify-center mb-4">
                <Apple className="h-6 w-6 text-kitchen-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Your Pantry</h3>
              <p className="text-gray-600">
                Keep a digital inventory of ingredients you have at home, organized by category.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-kitchen-secondary/20 rounded-full flex items-center justify-center mb-4">
                <Utensils className="h-6 w-6 text-kitchen-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Matching Recipes</h3>
              <p className="text-gray-600">
                Discover recipes based on what you already have, with clear indicators for missing ingredients.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-kitchen-accent/20 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-kitchen-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Shopping Lists</h3>
              <p className="text-gray-600">
                Automatically generate shopping lists for missing ingredients from recipes you want to make.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Plan Your Meals</h3>
              <p className="text-gray-600">
                Organize your week with a simple meal planning system to save time and reduce stress.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-kitchen-primary/10 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start cooking smarter?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Join KitchenSync today and transform the way you cook with ingredients you already have.
          </p>
          <Link to="/signup">
            <Button size="lg" className="text-lg">
              Sign Up – It's Free
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-kitchen-primary">KitchenSync</h2>
              <p className="text-sm text-gray-500 mt-1">
                Cook what you have, waste less, enjoy more.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/about" className="text-gray-600 hover:text-kitchen-primary">
                About
              </Link>
              <a href="#" className="text-gray-600 hover:text-kitchen-primary">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-kitchen-primary">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-kitchen-primary">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} KitchenSync. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

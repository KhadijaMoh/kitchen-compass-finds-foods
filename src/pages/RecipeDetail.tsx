
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { RecipeDetail as RecipeDetailComponent } from "@/components/recipes/RecipeDetail";
import { useRecipes } from "@/context/RecipeContext";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function RecipeDetail() {
  const { isAuthenticated } = useAuth();
  const { getRecipeById } = useRecipes();
  const { id } = useParams<{ id: string }>();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const recipe = id ? getRecipeById(id) : undefined;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Link to="/browse-recipes">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Recipes
            </Button>
          </Link>
        </div>
        
        {recipe ? (
          <RecipeDetailComponent recipe={recipe} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Recipe Not Found</h2>
            <p className="text-gray-500 mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
            <Link to="/browse-recipes">
              <Button>Browse All Recipes</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default RecipeDetail;

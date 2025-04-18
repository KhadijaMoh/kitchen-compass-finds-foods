
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { RecipeList } from "@/components/recipes/RecipeList";
import { useRecipes } from "@/context/RecipeContext";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export function PantryRecipes() {
  const { isAuthenticated } = useAuth();
  const { getMatchingRecipes } = useRecipes();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Get recipes that match the user's pantry (any match level)
  const matchingRecipes = getMatchingRecipes(0);

  return (
    <Layout>
      <RecipeList recipes={matchingRecipes} fromPantry={true} />
    </Layout>
  );
}

export default PantryRecipes;

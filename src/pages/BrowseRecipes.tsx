
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { RecipeList } from "@/components/recipes/RecipeList";
import { useRecipes } from "@/context/RecipeContext";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export function BrowseRecipes() {
  const { isAuthenticated } = useAuth();
  const { recipes, userRecipes } = useRecipes();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Combine both recipe sets for browsing
  const allRecipes = [...recipes, ...userRecipes];

  return (
    <Layout>
      <RecipeList recipes={allRecipes} />
    </Layout>
  );
}

export default BrowseRecipes;

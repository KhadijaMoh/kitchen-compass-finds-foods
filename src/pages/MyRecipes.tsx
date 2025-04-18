
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { RecipeList } from "@/components/recipes/RecipeList";
import { useRecipes } from "@/context/RecipeContext";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export function MyRecipes() {
  const { isAuthenticated } = useAuth();
  const { userRecipes } = useRecipes();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <RecipeList recipes={userRecipes} userRecipes={true} />
    </Layout>
  );
}

export default MyRecipes;


import React from "react";
import { Layout } from "@/components/layout/Layout";
import { RecipeForm } from "@/components/recipes/RecipeForm";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export function AddRecipe() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add New Recipe</h1>
        <RecipeForm />
      </div>
    </Layout>
  );
}

export default AddRecipe;


import React from "react";
import { Layout } from "@/components/layout/Layout";
import { MealPlanView } from "@/components/mealplan/MealPlanView";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export function MealPlan() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <MealPlanView />
    </Layout>
  );
}

export default MealPlan;

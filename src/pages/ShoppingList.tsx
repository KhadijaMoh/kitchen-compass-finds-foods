
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { ShoppingList as ShoppingListComponent } from "@/components/shopping/ShoppingList";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export function ShoppingList() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <ShoppingListComponent />
    </Layout>
  );
}

export default ShoppingList;

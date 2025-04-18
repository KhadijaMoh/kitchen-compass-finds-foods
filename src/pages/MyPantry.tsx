
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { PantryList } from "@/components/pantry/PantryList";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export function MyPantry() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <PantryList />
    </Layout>
  );
}

export default MyPantry;

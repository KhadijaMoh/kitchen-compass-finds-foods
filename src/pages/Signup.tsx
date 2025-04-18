
import React from "react";
import { SignupForm } from "@/components/auth/SignupForm";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export function Signup() {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SignupForm />
    </div>
  );
}

export default Signup;

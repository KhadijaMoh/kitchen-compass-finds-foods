
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, User, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  
  const handleLogout = () => {
    logout();
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-kitchen-primary">KitchenSync</h1>
            </Link>
          </div>
          
          {isAuthenticated ? (
            <>
              {/* Desktop navigation */}
              <nav className="hidden md:flex space-x-6">
                <Link
                  to="/"
                  className={`text-gray-600 hover:text-kitchen-primary ${
                    isActive("/") ? "text-kitchen-primary font-medium" : ""
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/my-pantry"
                  className={`text-gray-600 hover:text-kitchen-primary ${
                    isActive("/my-pantry") ? "text-kitchen-primary font-medium" : ""
                  }`}
                >
                  My Pantry
                </Link>
                <Link
                  to="/browse-recipes"
                  className={`text-gray-600 hover:text-kitchen-primary ${
                    isActive("/browse-recipes") ? "text-kitchen-primary font-medium" : ""
                  }`}
                >
                  Browse Recipes
                </Link>
                <Link
                  to="/my-recipes"
                  className={`text-gray-600 hover:text-kitchen-primary ${
                    isActive("/my-recipes") ? "text-kitchen-primary font-medium" : ""
                  }`}
                >
                  My Recipes
                </Link>
                <Link
                  to="/shopping-list"
                  className={`text-gray-600 hover:text-kitchen-primary ${
                    isActive("/shopping-list") ? "text-kitchen-primary font-medium" : ""
                  }`}
                >
                  Shopping List
                </Link>
                <Link
                  to="/meal-plan"
                  className={`text-gray-600 hover:text-kitchen-primary ${
                    isActive("/meal-plan") ? "text-kitchen-primary font-medium" : ""
                  }`}
                >
                  Meal Plan
                </Link>
              </nav>
              
              <div className="hidden md:flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Account</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/about" className="w-full">About</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile navigation */}
        {isAuthenticated && isMenuOpen && (
          <nav className="md:hidden py-3 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md ${
                  isActive("/") 
                    ? "bg-gray-100 text-kitchen-primary font-medium" 
                    : "text-gray-600"
                }`}
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/my-pantry"
                className={`px-3 py-2 rounded-md ${
                  isActive("/my-pantry") 
                    ? "bg-gray-100 text-kitchen-primary font-medium" 
                    : "text-gray-600"
                }`}
                onClick={toggleMenu}
              >
                My Pantry
              </Link>
              <Link
                to="/browse-recipes"
                className={`px-3 py-2 rounded-md ${
                  isActive("/browse-recipes") 
                    ? "bg-gray-100 text-kitchen-primary font-medium" 
                    : "text-gray-600"
                }`}
                onClick={toggleMenu}
              >
                Browse Recipes
              </Link>
              <Link
                to="/my-recipes"
                className={`px-3 py-2 rounded-md ${
                  isActive("/my-recipes") 
                    ? "bg-gray-100 text-kitchen-primary font-medium" 
                    : "text-gray-600"
                }`}
                onClick={toggleMenu}
              >
                My Recipes
              </Link>
              <Link
                to="/shopping-list"
                className={`px-3 py-2 rounded-md ${
                  isActive("/shopping-list") 
                    ? "bg-gray-100 text-kitchen-primary font-medium" 
                    : "text-gray-600"
                }`}
                onClick={toggleMenu}
              >
                Shopping List
              </Link>
              <Link
                to="/meal-plan"
                className={`px-3 py-2 rounded-md ${
                  isActive("/meal-plan") 
                    ? "bg-gray-100 text-kitchen-primary font-medium" 
                    : "text-gray-600"
                }`}
                onClick={toggleMenu}
              >
                Meal Plan
              </Link>
              <Link
                to="/profile"
                className={`px-3 py-2 rounded-md ${
                  isActive("/profile") 
                    ? "bg-gray-100 text-kitchen-primary font-medium" 
                    : "text-gray-600"
                }`}
                onClick={toggleMenu}
              >
                Profile
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-md ${
                  isActive("/about") 
                    ? "bg-gray-100 text-kitchen-primary font-medium" 
                    : "text-gray-600"
                }`}
                onClick={toggleMenu}
              >
                About
              </Link>
              <Button
                variant="ghost"
                className="justify-start px-3 py-2 h-auto font-normal hover:bg-gray-100 text-gray-600"
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
              >
                Logout
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;


import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { usePantry } from "@/context/PantryContext";
import { useShoppingList } from "@/context/ShoppingListContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export function Profile() {
  const { isAuthenticated, currentUser } = useAuth();
  const { clearPantry } = usePantry();
  const { clearShoppingList } = useShoppingList();
  
  const [username, setUsername] = useState(currentUser?.username || "");
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(
    currentUser?.dietaryPreferences || []
  );
  const [loading, setLoading] = useState(false);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const DIETARY_OPTIONS = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Keto",
    "Paleo",
    "Pescatarian",
    "Low-Sugar",
  ];
  
  const handleClearPantry = () => {
    if (window.confirm("Are you sure you want to clear your entire pantry? This cannot be undone.")) {
      clearPantry();
    }
  };
  
  const handleClearShoppingList = () => {
    if (window.confirm("Are you sure you want to clear your entire shopping list? This cannot be undone.")) {
      clearShoppingList();
    }
  };
  
  const handleSaveProfile = () => {
    setLoading(true);
    
    // Simulate API call to save profile
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile changes have been saved successfully.",
      });
    }, 1000);
  };
  
  const handleDietaryPrefChange = (pref: string) => {
    setDietaryPreferences(prev => 
      prev.includes(pref) 
        ? prev.filter(p => p !== pref) 
        : [...prev, pref]
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                
                <div className="space-y-4">
                  <Label>Dietary Preferences</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {DIETARY_OPTIONS.map((pref) => (
                      <div key={pref} className="flex items-center space-x-2">
                        <Checkbox
                          id={`pref-${pref}`}
                          checked={dietaryPreferences.includes(pref)}
                          onCheckedChange={() => handleDietaryPrefChange(pref)}
                        />
                        <Label htmlFor={`pref-${pref}`}>{pref}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveProfile} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Update Password</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Clear or reset your application data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Button 
                    variant="outline" 
                    onClick={handleClearPantry}
                    className="w-full justify-start text-left font-normal"
                  >
                    Clear Pantry
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    Remove all ingredients from your pantry
                  </p>
                </div>
                <Separator />
                <div>
                  <Button 
                    variant="outline" 
                    onClick={handleClearShoppingList}
                    className="w-full justify-start text-left font-normal"
                  >
                    Clear Shopping List
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    Remove all items from your shopping list
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Permanent account actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  This will permanently delete your account and all associated data.
                  This action cannot be undone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;

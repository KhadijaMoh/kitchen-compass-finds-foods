
import React from "react";
import { Layout } from "@/components/layout/Layout";

export function About() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-12 py-8">
        <section className="text-center">
          <h1 className="text-3xl font-bold mb-4">About KitchenSync</h1>
          <p className="text-lg text-gray-600">
            Helping you reduce food waste and discover new recipes with what you already have
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-gray-700">
            "Our mission is to reduce food waste, simplify meal planning, and
            inspire creative cooking in every home"
          </p>
          <p className="text-gray-700">
            The KitchenSync app is designed to help you manage your home ingredients and discover 
            delicious recipes based on what you have on hand. Our mission is to reduce food waste, 
            simplify meal planning, and inspire creative cooking in every kitchen.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Track Your Pantry</h3>
              <p className="text-gray-600">
                Add ingredients you have at home to your digital pantry so you always know what's available.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Find Matching Recipes</h3>
              <p className="text-gray-600">
                Our app suggests recipes based on what's in your pantry, showing you exactly what you're missing.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Plan & Shop Easily</h3>
              <p className="text-gray-600">
                Create meal plans and automatically generate shopping lists for ingredients you need.
              </p>
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Team</h2>
          <p className="text-gray-700">
            KitchenSync was created by a team of food enthusiasts and technology experts who believe
            that cooking at home should be simple, sustainable, and enjoyable. We're constantly working
            to improve the app and add new features based on user feedback.
          </p>
        </section>
        
        <section className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="text-gray-700">
            Have questions, suggestions, or feedback? We'd love to hear from you!
          </p>
          <a 
            href="mailto:contact@kitchensync.example.com" 
            className="inline-block mt-2 text-kitchen-primary hover:underline"
          >
            contact@kitchensync.example.com
          </a>
        </section>
      </div>
    </Layout>
  );
}

export default About;

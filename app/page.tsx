'use client'; // This page uses state, so it must be a Client Component

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CategorySection from '@/components/CategorySection';
import Footer from '@/components/Footer';
import { newsData } from '@/data/mockData'; // Assuming mockData is still used

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>("tech");

  // Get the news items for the active category
  const getNewsForCategory = (category: string) => {
    return newsData.filter(item => item.category === category);
  };

  // Get all categories from the data
  const categories = Array.from(new Set(newsData.map(item => item.category))); // This might be unused now?

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Pass categories to Navbar if needed */}
      <Navbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} /* categories={categories} */ /> 
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* 
          Consider fetching data server-side if possible in the future.
          For now, keep the client-side filtering based on state.
        */}
        {activeCategory === "tech" && (
          <CategorySection category="tech" newsItems={getNewsForCategory("tech")} />
        )}
        {activeCategory === "econ" && (
          <CategorySection category="econ" newsItems={getNewsForCategory("econ")} />
        )}
        {activeCategory === "policy" && (
          <CategorySection category="policy" newsItems={getNewsForCategory("policy")} />
        )}
        {activeCategory === "geopolitical" && (
          <CategorySection category="geopolitical" newsItems={getNewsForCategory("geopolitical")} />
        )}
      </main>

      <Footer />
    </div>
  );
} 
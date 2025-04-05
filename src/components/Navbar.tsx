import React from 'react';
import { Button } from "@/components/ui/button";
import { User } from 'lucide-react';

// Navigation categories
const categories = ["tech", "econ", "policy", "geopolitical"];

interface NavbarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const Navbar = ({ activeCategory, setActiveCategory }: NavbarProps) => {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-6 border-b border-slate-200">
      <div className="flex items-center">
        <span className="text-xl font-bold text-gray-800">News Dashboard</span>
      </div>
      <div className="flex justify-center space-x-2 items-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-colors duration-150 capitalize ${
              activeCategory === category
                ? 'bg-slate-200 text-slate-900'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex items-center">
        <Button variant="ghost" className="rounded-full p-2" aria-label="Account">
          <User className="h-5 w-5 text-slate-500" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

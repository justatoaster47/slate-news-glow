
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
    <nav className="w-full flex justify-between items-center py-4 px-6 border-b border-slate-50">
      <div className="flex space-x-1 items-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`category-pill ${activeCategory === category ? 'bg-slate-100 text-slate-300' : 'text-slate-200 hover:bg-slate-50'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <Button variant="ghost" className="rounded-full" aria-label="Account">
        <User className="h-5 w-5 text-slate-300" />
        <span className="ml-2 text-slate-300">account</span>
      </Button>
    </nav>
  );
};

export default Navbar;

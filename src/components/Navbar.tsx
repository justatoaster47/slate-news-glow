'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { User } from 'lucide-react';

// Navigation categories - Added 'science'
const categories = ["tech", "econ", "general", "science", "policy", "geopolitical"];

interface NavbarProps {
  currentCategory?: string;
}

const Navbar = ({ currentCategory = 'tech' }: NavbarProps) => {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-6 border-b border-slate-200">
      <div className="flex items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
           News Dashboard
        </Link>
      </div>
      <div className="flex justify-center space-x-2 items-center">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/?category=${category}`}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-colors duration-150 capitalize ${
              currentCategory === category
                ? 'bg-slate-200 text-slate-900'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
            passHref
          >
            {category}
          </Link>
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

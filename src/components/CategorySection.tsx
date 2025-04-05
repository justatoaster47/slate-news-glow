
import React from 'react';
import NewsCard from './NewsCard';
import { Laptop, Landmark, Building2, Globe } from 'lucide-react';

interface CategorySectionProps {
  category: string;
  newsItems: {
    id: string;
    title: string;
    summary: string;
    source?: string;
    time?: string;
  }[];
}

const CategorySection = ({ category, newsItems }: CategorySectionProps) => {
  const getCategoryIcon = () => {
    switch (category.toLowerCase()) {
      case 'tech':
        return <Laptop className="h-6 w-6 text-slate-300" />;
      case 'econ':
        return <Landmark className="h-6 w-6 text-slate-300" />;
      case 'policy':
        return <Building2 className="h-6 w-6 text-slate-300" />;
      case 'geopolitical':
        return <Globe className="h-6 w-6 text-slate-300" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-6">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-3xl font-bold capitalize text-slate-400">{category}</h2>
        {getCategoryIcon()}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <NewsCard
            key={item.id}
            title={item.title}
            summary={item.summary}
            source={item.source}
            time={item.time}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;

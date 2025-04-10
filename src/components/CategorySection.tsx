'use client'; // Mark as a Client Component

import React from 'react';
import NewsCard from './NewsCard';
import { Laptop, Landmark, Building2, Globe } from 'lucide-react';
import { NewsItem as SharedNewsItem } from '@/lib/types'; // Import the shared type

// Define the expected shape of a news item, matching NewsCard props
interface NewsItem {
  id: string; // Assuming API provides a unique ID
  title: string;
  summary: string; // Or description from API, used as summary for now
  source?: string;
  publishedAt?: string; // Changed from time
  url?: string; // Added URL
}

interface CategorySectionProps {
  category: string;
  newsItems: SharedNewsItem[]; // Use the imported shared type
  isModeActive: boolean;
  analyzedItemId: string | number | null;
  onItemSelect: (itemId: string | number, event?: React.MouseEvent) => void;
}

const CategorySection = ({
  category,
  newsItems,
  isModeActive,
  analyzedItemId,
  onItemSelect,
}: CategorySectionProps) => {
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
            publishedAt={item.publishedAt}
            url={item.url}
            isSelectable={isModeActive}
            isAnalyzed={item.id === analyzedItemId}
            onClick={(e) => isModeActive && onItemSelect(item.id, e)}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface NewsCardProps {
  title: string;
  summary: string; // This will now receive either the AI summary or the original description
  source?: string;
  publishedAt?: string; // Changed from time
  url?: string; // Added URL prop
}

const NewsCard = ({ title, summary, source = "Source", publishedAt, url }: NewsCardProps) => {
  // Format the date string if it exists
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Date unavailable';

  // Render a link if URL is provided, otherwise just the card
  const cardContent = (
    <Card className="news-card animate-fade-in h-full flex flex-col"> {/* Ensure card takes full height if needed */}
      <CardContent className="p-4 flex flex-col flex-grow"> {/* Allow content to grow */}
        <h3 className="font-bold text-slate-400 mb-2">{title}</h3>
        {/* Using summary as description for now, replace with AI summary later */}
        <p className="text-slate-200 text-sm mb-4 flex-grow">{summary}</p> 
        <div className="flex justify-between items-center text-xs text-slate-100 mt-auto"> {/* Push footer to bottom */}
          <span>{source}</span>
          {/* Display formatted date */}
          <span>{formattedDate}</span>
        </div>
      </CardContent>
    </Card>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full"> {/* Make anchor block and full height */}
        {cardContent}
      </a>
    );
  }

  return cardContent; // Render card without link if no URL
};

export default NewsCard;

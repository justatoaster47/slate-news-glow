'use client'; // Mark as a Client Component

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Import cn utility for conditional classes

interface NewsCardProps {
  title: string;
  summary: string; // This will now receive either the AI summary or the original description
  source?: string;
  publishedAt?: string; // Changed from time
  url?: string; // Added URL prop
  // --- Interaction Props --- 
  isSelectable?: boolean; // Can this card be clicked in the current mode?
  isSelected?: boolean;   // Is this card currently the selected one?
  onClick?: (event?: React.MouseEvent) => void;   
}

const NewsCard = ({
  title,
  summary,
  source = "Source",
  publishedAt,
  url,
  // Destructure new props with defaults
  isSelectable = false,
  isSelected = false,
  onClick,
}: NewsCardProps) => {
  // Format the date string if it exists
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Date unavailable';

  // --- Card container styling --- 
  const cardClasses = cn(
    "news-card animate-fade-in h-full flex flex-col", // Base classes
    "transition-all duration-200 ease-in-out", // Smooth transitions
    {
      "cursor-pointer hover:scale-105 hover:shadow-lg": isSelectable, // Style for selectable items
      "ring-2 ring-blue-500 ring-offset-2 scale-105 shadow-lg": isSelected, // Style for the selected item
      "opacity-50 grayscale hover:opacity-100 hover:grayscale-0": isSelectable && !isSelected, // Dim unselected items when selectable
      // Apply wiggle animation when the card is part of an active interaction mode
      "animate-wiggle": isSelectable, 
    }
  );

  // Render a link if URL is provided, otherwise just the card
  const cardContent = (
    <Card className={cardClasses} onClick={onClick}>
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

  // --- Link Wrapping --- 
  // Wrap with link only if NOT in an interaction mode OR if URL exists and interaction mode is off
  // If in interaction mode, the onClick on the Card itself handles the selection.
  if (url && !isSelectable) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full">
        {cardContent}
      </a>
    );
  }

  return cardContent; // Render card without link or handle click via Card's onClick
};

export default NewsCard;

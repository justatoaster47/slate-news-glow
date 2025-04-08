'use client';

import React from 'react';
import { NewsItem, Mode } from '@/lib/types';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalysisViewProps {
  mode: Mode; // Pass the whole mode object
  item: NewsItem;
  onClose: () => void; // Function to go back to the dashboard view
}

const AnalysisView = ({ mode, item, onClose }: AnalysisViewProps) => {
  const handleShare = () => {
    // Placeholder for share functionality
    console.log('Share clicked for:', item.url);
    // You might use navigator.share here if available
    alert('Share functionality not yet implemented.');
  };

  return (
    <div className="p-4 md:p-6 flex flex-col h-full">
      {/* 1. Header with Back Button and Mode Title */}
      <div className="flex items-center mb-4 md:mb-6">
        <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Go Back</span>
        </Button>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">{mode.name} Mode</h1>
      </div>

      {/* 2. Main Content Card */}
      <Card className="flex-grow flex flex-col"> {/* Make card take remaining height */}
        <CardHeader className="pb-2 border-b">
          <div className="flex justify-between items-start">
            {/* Article Title (Hyperlinked) */}
            <CardTitle className="text-lg md:text-xl">
              <a 
                href={item.url ?? '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-600 hover:underline"
              >
                {item.title}
              </a>
            </CardTitle>
            {/* Share Button */}
            <Button variant="ghost" size="icon" onClick={handleShare} className="ml-2 flex-shrink-0">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share Article</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4 flex-grow overflow-y-auto"> {/* Allow content to scroll if needed */}
          {/* Placeholder for Mode-Specific Content */}
          <p className="text-gray-600">
            Displaying analysis for &apos;{mode.name}&apos; on the selected article.
            <br />
            (Use filler content for now as requested in the wireframe)
          </p>
          {/* TODO: Replace with actual analysis components/data fetching */}
          <div className="mt-4 space-y-2">
            {[...Array(15)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer could potentially go here if needed, outside the card */}
    </div>
  );
};

export default AnalysisView; 

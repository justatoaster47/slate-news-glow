'use client';

import React, { useMemo } from 'react';
import { NewsItem, Mode } from '@/lib/types';
import { ArrowLeft, Share2, Lightbulb, BarChart, Smile, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InteractiveModeBar from './InteractiveModeBar';

// Define the modes here or import from a shared location
// TODO: Move modes definition to a shared file (e.g., @/lib/modes.ts)
const modes: Mode[] = [
  { id: 'summary', name: 'Summarize', description: 'Get a concise AI summary.', icon: Lightbulb },
  { id: 'trends', name: 'Trend Analysis', description: 'Visualize trends related to this data.', icon: BarChart },
  { id: 'sentiment', name: 'Sentiment Analysis', description: 'Analyze the sentiment of the text.', icon: Smile },
  { id: 'deep_dive', name: 'Deep Dive', description: 'Explore related topics and entities.', icon: Search },
];

interface AnalysisViewProps {
  activeModeId: string | null;
  item: NewsItem;
  onClose: () => void;
  onModeSelect: (modeId: string | null) => void;
}

const AnalysisView = ({ activeModeId, item, onClose, onModeSelect }: AnalysisViewProps) => {
  // Find the active mode object based on the ID
  const activeMode = useMemo(() => modes.find(m => m.id === activeModeId), [activeModeId]);

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
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          {activeMode ? `${activeMode.name} Analysis` : 'Article Analysis'}
        </h1>
      </div>

      {/* Insert Interactive Mode Bar here */}
      <InteractiveModeBar activeMode={activeModeId} onModeSelect={onModeSelect} />

      {/* 2. Main Content Card */}
      <Card className="flex-grow flex flex-col">
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
        <CardContent className="pt-4 flex-grow overflow-y-auto">
          {/* Placeholder for Mode-Specific Content */}
          {activeMode ? (
            <>
              <p className="text-gray-600 mb-4">
                Displaying analysis for &apos;{activeMode.name}&apos; on the selected article.
                <br />
                (Use filler content for now as requested in the wireframe)
              </p>
              {/* TODO: Replace with actual analysis components/data fetching based on activeMode */}
              <div className="space-y-2">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-center">Select a mode above to start analysis.</p>
          )}
        </CardContent>
      </Card>

      {/* Footer could potentially go here if needed, outside the card */}
    </div>
  );
};

export default AnalysisView; 

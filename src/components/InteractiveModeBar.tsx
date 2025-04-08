'use client';

import React from 'react';
import { Lightbulb, BarChart, Smile, Search } from 'lucide-react'; // Example icons
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface Mode {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

// Define the available modes
const modes: Mode[] = [
  { id: 'summary', name: 'Summarize', description: 'Get a concise AI summary.', icon: Lightbulb },
  { id: 'trends', name: 'Trend Analysis', description: 'Visualize trends related to this data.', icon: BarChart },
  { id: 'sentiment', name: 'Sentiment Analysis', description: 'Analyze the sentiment of the text.', icon: Smile },
  { id: 'deep_dive', name: 'Deep Dive', description: 'Explore related topics and entities.', icon: Search },
];

interface InteractiveModeBarProps {
  activeMode: string | null;
  onModeSelect: (modeId: string | null) => void;
}

export default function InteractiveModeBar({ activeMode, onModeSelect }: InteractiveModeBarProps) {
  const handleModeClick = (modeId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onModeSelect(activeMode === modeId ? null : modeId);
  };

  return (
    <div 
      className="flex justify-center items-center space-x-2 p-2 mb-4 border-b bg-gray-50 rounded-md shadow-sm"
      onClick={(e) => e.stopPropagation()} 
    >
      <TooltipProvider delayDuration={100}>
        {modes.map((mode) => (
          <Tooltip key={mode.id}>
            <TooltipTrigger asChild>
              <Button
                variant={activeMode === mode.id ? 'secondary' : 'ghost'}
                size="icon"
                onClick={(e) => handleModeClick(mode.id, e)}
                className={`hover:bg-gray-200 ${activeMode === mode.id ? 'bg-gray-200 ring-2 ring-blue-500' : ''}`}
                aria-label={mode.name}
              >
                <mode.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">{mode.name}</p>
              <p className="text-sm text-gray-600">{mode.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
} 
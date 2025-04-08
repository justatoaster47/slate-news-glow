'use client';

import React, { useState, useMemo, MouseEvent } from 'react';
import InteractiveModeBar from './InteractiveModeBar'; // Corrected import path
import CategorySection from './CategorySection'; // Corrected import path
import { NewsItem, Mode } from '@/lib/types'; // Import shared types
import { Lightbulb, BarChart, Smile, Search } from 'lucide-react'; // Import icons again for mode definitions

// Re-define modes here or import from a constants file if preferred
const modes: Mode[] = [
  { id: 'summary', name: 'Summarize', description: 'Get a concise AI summary.', icon: Lightbulb },
  { id: 'trends', name: 'Trend Analysis', description: 'Visualize trends related to this data.', icon: BarChart },
  { id: 'sentiment', name: 'Sentiment Analysis', description: 'Analyze the sentiment of the text.', icon: Smile },
  { id: 'deep_dive', name: 'Deep Dive', description: 'Explore related topics and entities.', icon: Search },
];

interface DashboardContentProps {
  initialCategory: string;
  initialNewsItems: NewsItem[];
}

export default function DashboardContent({ initialCategory, initialNewsItems }: DashboardContentProps) {
  const [activeModeId, setActiveModeId] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | number | null>(null);

  const activeMode = useMemo(() => modes.find(m => m.id === activeModeId), [activeModeId]);
  const selectedItem = useMemo(() => initialNewsItems.find(item => item.id === selectedItemId), [selectedItemId, initialNewsItems]);

  const handleModeSelect = (modeId: string | null) => {
    setActiveModeId(modeId);
    setSelectedItemId(null); // Reset selected item when changing mode
    console.log('Mode selected:', modeId);
  };

  const handleItemSelect = (itemId: string | number, event?: MouseEvent) => {
    event?.stopPropagation(); // Stop propagation to prevent background click
    if (activeModeId) { // Only allow item selection if a mode is active
      setSelectedItemId(itemId);
      console.log('Item selected:', itemId, 'for mode:', activeModeId);
    }
  };

  const handleClearSelection = (event?: MouseEvent) => {
    event?.stopPropagation(); // Stop propagation if called from a click
    setSelectedItemId(null);
  };

  // Function to close the active mode when clicking the background
  const handleBackgroundClick = () => {
    if (activeModeId) {
      console.log('Background clicked, exiting mode:', activeModeId);
      handleModeSelect(null); // Deactivate mode
    }
  };

  return (
    <div onClick={handleBackgroundClick}>
      <InteractiveModeBar activeMode={activeModeId} onModeSelect={handleModeSelect} />

      {/* Display mode instructions or analysis results */} 
      {activeModeId && !selectedItemId && (
        <div className="text-center p-4 mb-4 bg-blue-100 border border-blue-300 rounded-md">
          <h2 className="text-xl font-semibold mb-1">{activeMode?.name} Mode Activated</h2>
          <p className="text-gray-700">{activeMode?.description} Select an item below to analyze it.</p>
        </div>
      )}

      {activeModeId && selectedItemId && selectedItem && (
        <div className="p-4 mb-4 bg-green-100 border border-green-300 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Analysis: {activeMode?.name} on \"{selectedItem.title}\"</h2>
            <button 
              onClick={handleClearSelection}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              (Clear Selection)
            </button>
          </div>
          {/* Placeholder for actual analysis content */}
          <p className="text-gray-700">Displaying {activeMode?.name} analysis for item: {selectedItem.title}.</p>
          {/* TODO: Implement actual analysis logic/display based on activeModeId and selectedItem */} 
        </div>
      )}

      {/* Pass necessary props to CategorySection */} 
      <CategorySection
        category={initialCategory}
        newsItems={initialNewsItems}
        isInteractionActive={!!activeModeId} // Is any mode active?
        selectedItemId={selectedItemId} // Pass selected item ID
        onItemSelect={handleItemSelect} // Pass the updated handler with stopPropagation
      />
    </div>
  );
} 
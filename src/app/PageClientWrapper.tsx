'use client';

import React, { useState, useMemo, useEffect, MouseEvent } from 'react';
import DashboardContent from '@/components/DashboardContent';
import { NewsItem, Mode } from '@/lib/types';
import { Lightbulb, BarChart, Smile, Search } from 'lucide-react'; // Need icons if modes are defined here

// Define modes here - consistency is key, move to a shared file later if needed
const modes: Mode[] = [
  { id: 'summary', name: 'Summarize', description: 'Get a concise AI summary.', icon: Lightbulb },
  { id: 'trends', name: 'Trend Analysis', description: 'Visualize trends related to this data.', icon: BarChart },
  { id: 'sentiment', name: 'Sentiment Analysis', description: 'Analyze the sentiment of the text.', icon: Smile },
  { id: 'deep_dive', name: 'Deep Dive', description: 'Explore related topics and entities.', icon: Search },
];

interface PageClientWrapperProps {
  initialCategory: string;
  initialNewsItems: NewsItem[];
}

export default function PageClientWrapper({ initialCategory, initialNewsItems }: PageClientWrapperProps) {
  const [activeModeId, setActiveModeId] = useState<string | null>(null);
  const [itemForAnalysis, setItemForAnalysis] = useState<NewsItem | null>(null);

  const activeMode = useMemo(() => modes.find(m => m.id === activeModeId), [activeModeId]);

  // Effect to clear mode and close AnalysisView when category changes
  useEffect(() => {
    console.log(`[PageClientWrapper] Category changed to: ${initialCategory}. Resetting mode and closing analysis view.`);
    setItemForAnalysis(null); // Close analysis view on category navigation
    setActiveModeId(null); // Also reset the active mode
  }, [initialCategory]);

  // --- Handlers --- 
  const handleModeSelect = (modeId: string | null) => {
    setActiveModeId(modeId);
    console.log('[PageClientWrapper] Mode selected:', modeId);
  };

  const handleInitiateAnalysis = (itemId: string | number, event?: MouseEvent) => {
    event?.stopPropagation(); // Still needed here to prevent potential background clicks if dashboard is interactive
    if (activeModeId) { 
      // Find item within the *currently loaded* set of news items for the category
      const selectedItem = initialNewsItems.find(item => item.id === itemId);
      if (selectedItem) {
        setItemForAnalysis(selectedItem);
        console.log('[PageClientWrapper] Initiating analysis view:', activeModeId, 'on item:', selectedItem.id);
      } else {
        console.error('[PageClientWrapper] Could not find selected item with ID:', itemId, 'in category:', initialCategory);
        setItemForAnalysis(null); 
      }
    } 
  };

  const handleCloseAnalysis = () => {
    setItemForAnalysis(null); // Clear item to return to dashboard view for the active mode
    setActiveModeId(null); // Added: Also clear the active mode
    console.log('[PageClientWrapper] Closing analysis view and clearing mode.'); // Updated log message
  };

  return (
    <DashboardContent
      // Pass state down
      activeModeId={activeModeId}
      itemForAnalysis={itemForAnalysis}
      activeMode={activeMode} // Pass memoized activeMode object
      // Pass data
      initialCategory={initialCategory} // Pass category for display inside dashboard if needed
      initialNewsItems={initialNewsItems}
      // Pass handlers down
      handleModeSelect={handleModeSelect}
      handleInitiateAnalysis={handleInitiateAnalysis}
      handleCloseAnalysis={handleCloseAnalysis}
    />
  );
} 
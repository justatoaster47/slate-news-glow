'use client';

import React, { MouseEvent } from 'react';
import InteractiveModeBar from './InteractiveModeBar';
import CategorySection from './CategorySection';
import AnalysisView from './AnalysisView';
import { NewsItem, Mode } from '@/lib/types';

interface DashboardContentProps {
  activeModeId: string | null;
  itemForAnalysis: NewsItem | null;
  activeMode: Mode | undefined;
  initialCategory: string;
  initialNewsItems: NewsItem[];
  handleModeSelect: (modeId: string | null) => void;
  handleInitiateAnalysis: (itemId: string | number, event?: MouseEvent) => void;
  handleCloseAnalysis: () => void;
}

export default function DashboardContent({
  activeModeId,
  itemForAnalysis,
  activeMode,
  initialCategory,
  initialNewsItems,
  handleModeSelect,
  handleInitiateAnalysis,
  handleCloseAnalysis
}: DashboardContentProps) {
  const handleBackgroundClick = () => {
    if (activeModeId && !itemForAnalysis) {
      console.log('[DashboardContent] Background clicked, calling handleModeSelect(null).');
      handleModeSelect(null);
    }
  };

  if (activeMode && itemForAnalysis) {
    return (
      <AnalysisView 
        activeModeId={activeModeId}
        item={itemForAnalysis} 
        onClose={handleCloseAnalysis}
        onModeSelect={handleModeSelect}
      />
    );
  } else {
    return (
      <div onClick={handleBackgroundClick}>
        <InteractiveModeBar activeMode={activeModeId} onModeSelect={handleModeSelect} />

        {activeModeId && !itemForAnalysis && activeMode && (
          <div className="text-center p-4 mb-4 bg-blue-100 border border-blue-300 rounded-md">
            <h2 className="text-xl font-semibold mb-1">{activeMode.name} Mode Activated</h2>
            <p className="text-gray-700">{activeMode.description} Select an item below to analyze it.</p>
          </div>
        )}

        <CategorySection
          category={initialCategory}
          newsItems={initialNewsItems}
          isModeActive={!!activeModeId}
          analyzedItemId={null}
          onItemSelect={handleInitiateAnalysis}
        />
      </div>
    );
  }
} 
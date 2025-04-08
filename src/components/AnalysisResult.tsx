'use client';

import React from 'react';
import { NewsItem, Mode } from '@/lib/types';

interface AnalysisResultProps {
  modeId: string; // The ID of the active mode (e.g., 'summary', 'trends')
  item: NewsItem; // The full news item being analyzed
  onClose: (event?: React.MouseEvent) => void; // Callback to close the analysis view
}

// Placeholder component to display analysis results
const AnalysisResult = ({ modeId, item, onClose }: AnalysisResultProps) => {
  
  // Simple rendering based on modeId for now
  const renderAnalysisContent = () => {
    switch (modeId) {
      case 'summary':
<<<<<<< HEAD
        return <p>Generating AI summary for: "{item.title}"...</p>;
      case 'trends':
        return <p>Analyzing trends related to: "{item.title}"...</p>;
      case 'sentiment':
        return <p>Calculating sentiment for: "{item.title}"...</p>;
      case 'deep_dive':
        return <p>Preparing deep dive for: "{item.title}"...</p>;
=======
        return <p>Generating AI summary for: &quot;{item.title}&quot;...</p>;
      case 'trends':
        return <p>Analyzing trends related to: &quot;{item.title}&quot;...</p>;
      case 'sentiment':
        return <p>Calculating sentiment for: &quot;{item.title}&quot;...</p>;
      case 'deep_dive':
        return <p>Preparing deep dive for: &quot;{item.title}&quot;...</p>;
>>>>>>> 9b2e424 (interactive mode renders into new ui)
      default:
        return <p>Unknown analysis mode: {modeId}</p>;
    }
  };

  return (
    <div className="p-4 border border-dashed border-gray-400 rounded-md bg-white relative">
       {/* Close Button - uses the onClose prop from DashboardContent */}
       <button 
         onClick={onClose} 
         className="absolute top-2 right-2 text-xs text-gray-500 hover:text-gray-800 bg-gray-100 rounded-full p-1 border shadow-sm"
         aria-label="Close Analysis"
       >
         Close [X]
       </button>

      {/* Display the item title clearly */}
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Analysis Target: <span className="font-normal">{item.title}</span></h3>
      <p className="text-xs text-gray-500 mb-3">Source: {item.source} | Published: {new Date(item.publishedAt ?? Date.now()).toLocaleDateString()}</p>
      
      {/* Placeholder for the actual analysis output */}
      <div className="mt-4 text-gray-700">
        {renderAnalysisContent()}
        {/* TODO: Replace with actual analysis components/data fetching based on modeId and item */} 
      </div>
    </div>
  );
};

export default AnalysisResult; 
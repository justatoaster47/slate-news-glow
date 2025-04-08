// Define common types used across the application

// Structure for news articles fetched from the database or API
export interface NewsItem {
    id: string | number; // Use URL or DB ID
    title: string;
    summary: string; // Could be original description or AI summary
    source: string;
    publishedAt: string; // Keep as string for simplicity, format on display if needed
    url: string;
    // Add any other fields displayed or used by components
    category?: string;
    description?: string | null;
    source_name?: string | null; // From DB
  }

// Structure for Interactive Modes
export interface Mode {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
} 
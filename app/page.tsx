import React from 'react'; // Keep React import
import Navbar from '@/components/Navbar';
import CategorySection from '@/components/CategorySection';
import Footer from '@/components/Footer';
// import { newsData } from '@/data/mockData'; // Remove mock data import

// Define the expected shape of a news article from the API
interface NewsArticle {
  id: string; // Or any unique identifier from API (url, etc.)
  title: string;
  description: string; // Assuming API provides description, use as summary
  source?: { id?: string | null; name?: string }; // Match NewsAPI structure
  publishedAt?: string;
  url?: string;
  // category?: string; // Category might not be needed here if fetched by category
}

// Define the structure for searchParams passed to the page
interface HomePageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Helper function to get the base URL for fetch requests
// Handles client-side and server-side rendering environments
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side
    return window.location.origin;
  } else {
    // Server-side (adjust if needed based on deployment env)
    return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  }
};

// Fetch news data, now accepting a category parameter
async function getNewsData(category: string): Promise<NewsArticle[]> {
  const functionName = '[Page:getNewsData]'; // For easier log filtering
  try {
    const baseUrl = getBaseUrl();
    const apiUrl = `${baseUrl}/api/news?category=${encodeURIComponent(category)}`;
    console.log(`${functionName} Fetching news from: ${apiUrl}`);

    const res = await fetch(apiUrl, {
      cache: 'no-store',
    });

    console.log(`${functionName} Response status: ${res.status}`);
    if (!res.ok) {
      console.error(`${functionName} Failed to fetch news:`, res.status, res.statusText);
      const errorBody = await res.text();
      console.error(`${functionName} Error response body:`, errorBody);
      return [];
    }

    // Log before parsing JSON
    console.log(`${functionName} Attempting to parse JSON response...`);
    const data = await res.json();
    // Log the data immediately after parsing
    console.log(`${functionName} Raw data after res.json():`, JSON.stringify(data, null, 2));

    // Check if data structure is valid
    if (!data || typeof data !== 'object') {
        console.error(`${functionName} Invalid data object received:`, data);
        return [];
    }
    if (!Array.isArray(data.articles)) {
        console.error(`${functionName} data.articles is not an array:`, data.articles);
        // Log the keys to see what IS present
        console.log(`${functionName} Keys in received data object:`, Object.keys(data));
        return [];
    }

    console.log(`${functionName} Data structure seems valid. Found ${data.articles.length} articles. Proceeding with transformation.`);
    // Transform data
    return data.articles.map((article: any, index: number) => ({
      id: article.url || `news-${category}-${index}`,
      title: article.title || 'No Title',
      description: article.description || article.content || 'No Description',
      source: article.source,
      publishedAt: article.publishedAt,
      url: article.url,
    }));

  } catch (error) {
    // Make sure catch log is identifiable
    console.error(`${functionName} Error during fetch or processing:`, error);
    return [];
  }
}

// Page component now accepts searchParams
export default async function HomePage({ searchParams }: HomePageProps) {
  // Get category from URL search params, default to 'tech'
  const currentCategory = typeof searchParams?.category === 'string' ? searchParams.category : 'tech';
  console.log(`[Page] Current Category: ${currentCategory}`); // Log category

  // Fetch data for the current category
  const categoryNewsData = await getNewsData(currentCategory);
  console.log('[Page] Fetched categoryNewsData:', JSON.stringify(categoryNewsData, null, 2)); // Log fetched data

  // Transform data for the CategorySection component
  const newsItemsForSection = categoryNewsData.map(item => ({
    id: item.id,
    title: item.title,
    summary: item.description, // Use description as summary
    source: item.source?.name, // Extract name from source object
    publishedAt: item.publishedAt,
    url: item.url,
  }));
  console.log('[Page] Transformed newsItemsForSection:', JSON.stringify(newsItemsForSection, null, 2)); // Log transformed data

  // Add a check for empty data before rendering CategorySection
  if (!newsItemsForSection || newsItemsForSection.length === 0) {
      console.log('[Page] No news items to display for category:', currentCategory);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Pass the current category from URL to Navbar for highlighting */}
      <Navbar currentCategory={currentCategory} />

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Display the section for the current category */}
        <CategorySection category={currentCategory} newsItems={newsItemsForSection} />

        {/* Placeholder for potentially showing other sections or related content */}
      </main>

      <Footer />
    </div>
  );
} 
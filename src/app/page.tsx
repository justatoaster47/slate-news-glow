import React from 'react';
import Navbar from '@/components/Navbar';
// import CategorySection from '@/components/CategorySection'; // No longer imported directly
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase/client'; // Import the basic Supabase client
import { NewsItem } from '@/lib/types'; // Import the shared NewsItem type
// Remove DashboardContent import, import PageClientWrapper
// import DashboardContent from '@/components/DashboardContent'; 
import PageClientWrapper from './PageClientWrapper'; // Import the new client wrapper

// --- Type Definitions ---

// Structure matching the data we select from the DB
// No longer need DbNewsArticle here, use NewsItem from types

// Structure for searchParams passed to the page
interface HomePageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Removed the old getBaseUrl and getNewsData functions that called /api/news

// Fetch news data directly from Supabase DB
// Return type changed to NewsItem[]
async function fetchNewsFromDb(category: string): Promise<NewsItem[]> {
  const functionName = '[Page:fetchNewsFromDb]';
  console.log(`${functionName} Fetching news for category '${category}' from database.`);

  try {
    const { data, error } = await supabase
      .from('news_articles')
      .select('id, url, title, description, source_name, published_at, summary, category') // Select required fields
      .eq('category', category) // Filter by category
      .order('published_at', { ascending: false }) // Order by newest first
      .limit(30); // Limit the number of articles displayed per category

    if (error) {
      console.error(`${functionName} Supabase query error:`, error);
      throw error; // Re-throw the error to be caught below
    }

    console.log(`${functionName} Fetched ${data?.length ?? 0} articles for category '${category}'.`);
    // Ensure data is an array, default to empty array if null/undefined
    // Map directly to NewsItem structure here, ensuring id is number
    const mappedData: NewsItem[] = (data ?? []).map(item => ({
      id: item.id, // Use the numeric database ID
      url: item.url,
      title: item.title,
      summary: item.summary ?? item.description ?? '',
      source: item.source_name ?? 'Source unavailable',
      publishedAt: item.published_at,
      description: item.description, // Keep original fields if needed elsewhere
      source_name: item.source_name,
      category: item.category, // Keep category from DB
    }));

    return mappedData;

  } catch (error) {
    console.error(`${functionName} Error fetching from database:`, error);
    return []; // Return empty array on error
  }
}

// Page component now fetches from DB
export default async function HomePage({ searchParams }: HomePageProps) {
  // Get category from URL search params, default to 'tech'
  const urlCategory = typeof searchParams?.category === 'string' ? searchParams.category : 'tech';

  // Map URL category names (used in Navbar links) to DB category names (used for fetching)
  let dbCategory: string;
  switch (urlCategory.toLowerCase()) {
    case 'tech':
      dbCategory = 'technology';
      break;
    case 'econ':
      dbCategory = 'business';
      break;
    case 'general': // Assuming Navbar link might be 'general'
      dbCategory = 'general'; 
      break;
    case 'science':
      dbCategory = 'science';
      break;
    // policy and geopolitical are intentionally left out for now
    // They will fall through to the default or result in fetching 
    // with a category name that might not exist in the DB yet.
    default:
      // Fallback to the URL category name directly, or a default like 'general'
      // If policy/geopolitical links exist, this will try to fetch using those names.
      dbCategory = urlCategory; 
      console.log(`[Page] Unmapped URL category '${urlCategory}', attempting fetch with this name.`);
  }

  console.log(`[Page] URL Category: ${urlCategory}, Resolved DB Category: ${dbCategory}`);

  // Fetch data for the resolved DB category from the DB
  const categoryNewsData = await fetchNewsFromDb(dbCategory);

  // No longer need the transformation here, fetchNewsFromDb returns NewsItem[]
  // const newsItemsForSection = categoryNewsData.map(item => (...)); 

  if (!categoryNewsData || categoryNewsData.length === 0) {
      console.log(`[Page] No news items found in DB for resolved category: ${dbCategory}`);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Render Navbar directly */}
      <Navbar currentCategory={urlCategory} /> 
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Use PageClientWrapper to manage state and render DashboardContent */}
        <PageClientWrapper
          initialCategory={dbCategory} // Pass the resolved DB category name
          initialNewsItems={categoryNewsData} // Pass the fetched data directly
        />
        {/* <CategorySection category={dbCategory} newsItems={newsItemsForSection} /> // Old rendering */}
      </main>
      <Footer />
    </div>
  );
} 

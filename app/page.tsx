import React from 'react';
import Navbar from '@/components/Navbar';
import CategorySection from '@/components/CategorySection';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase/client'; // Import the basic Supabase client

// --- Type Definitions ---

// Structure matching the data we select from the DB
interface DbNewsArticle {
  id: number; // Assuming we select the primary key
  url: string;
  title: string;
  description?: string | null;
  source_name?: string | null; // Renamed from source.name
  published_at: string; 
  summary?: string | null; // Add the summary field
}

// Structure for searchParams passed to the page
interface HomePageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Removed the old getBaseUrl and getNewsData functions that called /api/news

// Fetch news data directly from Supabase DB
async function fetchNewsFromDb(category: string): Promise<DbNewsArticle[]> {
  const functionName = '[Page:fetchNewsFromDb]';
  console.log(`${functionName} Fetching news for category '${category}' from database.`);

  try {
    const { data, error } = await supabase
      .from('news_articles')
      .select('id, url, title, description, source_name, published_at, summary') // Select required fields
      .eq('category', category) // Filter by category
      .order('published_at', { ascending: false }) // Order by newest first
      .limit(30); // Limit the number of articles displayed per category

    if (error) {
      console.error(`${functionName} Supabase query error:`, error);
      throw error; // Re-throw the error to be caught below
    }

    console.log(`${functionName} Fetched ${data?.length ?? 0} articles for category '${category}'.`);
    // Ensure data is an array, default to empty array if null/undefined
    return data ?? []; 

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

  // Transform data for the CategorySection component
  const newsItemsForSection = categoryNewsData.map(item => ({
    id: item.url, 
    title: item.title,
    summary: item.summary ?? item.description ?? '', 
    source: item.source_name ?? 'Source unavailable',
    publishedAt: item.published_at, 
    url: item.url,
  }));

  if (!newsItemsForSection || newsItemsForSection.length === 0) {
      console.log(`[Page] No news items found in DB for resolved category: ${dbCategory}`);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar currentCategory={urlCategory} />
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Display the section using the resolved DB category name 
            (or consider passing urlCategory if you want the display title to match the URL) */}
        <CategorySection category={dbCategory} newsItems={newsItemsForSection} />
      </main>
      <Footer />
    </div>
  );
} 

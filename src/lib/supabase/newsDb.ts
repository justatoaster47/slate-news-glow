import { fetchTopHeadlines } from '@/lib/api-clients/newsApiClient';
import { getSupabaseAdminClient } from '@/lib/supabase/serverClient';

// --- Type Definitions ---

// Mirroring the expected structure from NewsAPI
interface NewsApiArticle {
  source: { id?: string | null; name?: string };
  author?: string | null;
  title: string;
  description?: string | null;
  url: string;
  urlToImage?: string | null;
  publishedAt: string;
  content?: string | null;
}

// Expected shape of the overall API response
// (Adjust based on actual fetchTopHeadlines return type if different)
// We will properly type fetchTopHeadlines in newsApiClient.ts next
interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles?: NewsApiArticle[]; // Make articles optional for safety
}

// Structure for Supabase upsert
interface NewsArticleRecord {
  url: string;
  source_id?: string | null;
  source_name?: string;
  author?: string | null;
  title: string;
  description?: string | null;
  url_to_image?: string | null;
  published_at: string; 
  content?: string | null;
  category: string;
}

// -------------------------

// Define the categories to fetch news for
const NEWS_CATEGORIES_TO_FETCH = ['technology', 'business', 'general', 'science'];

/**
 * Fetches news for predefined categories from NewsAPI and stores/updates them in the Supabase database.
 * Uses the service role key for database operations.
 */
export const fetchAndStoreNews = async (): Promise<{ success: boolean; message: string; details?: any }> => {
  console.log('Starting news fetch and store process...');
  const supabaseAdmin = getSupabaseAdminClient();
  let totalUpsertedCount = 0; // We won't get exact count back easily without select
  let categoriesProcessed = 0;
  const errors: { category: string; error: string }[] = [];

  for (const category of NEWS_CATEGORIES_TO_FETCH) {
    console.log(`Fetching news for category: ${category}...`);
    try {
      // Fetch (Assume fetchTopHeadlines returns Promise<NewsApiResponse>)
      const newsApiResponse = await fetchTopHeadlines({
        country: 'us',
        category: category,
        pageSize: 100,
      });

      // Use the defined type
      const articles = newsApiResponse?.articles;
      if (!Array.isArray(articles)) {
        console.warn(`No articles array found or invalid format for category: ${category}. Status: ${newsApiResponse?.status}`);
        continue; 
      }

      if (articles.length === 0) {
        console.log(`No articles returned from NewsAPI for category: ${category}. (Total Results: ${newsApiResponse?.totalResults})`);
        continue; 
      }

      console.log(`Received ${articles.length} articles for category: ${category}. Preparing for upsert...`);

      // Map API response 
      const recordsToUpsert: NewsArticleRecord[] = articles.map((article: NewsApiArticle) => ({
        url: article.url,
        source_id: article.source?.id,
        source_name: article.source?.name,
        author: article.author,
        title: article.title || 'No Title Provided',
        description: article.description,
        url_to_image: article.urlToImage,
        published_at: article.publishedAt, 
        content: article.content,
        category: category,
      })).filter(record => record.url && record.published_at && record.title);

      if (recordsToUpsert.length === 0) {
          console.log(`No valid records to upsert after filtering for category: ${category}.`);
          continue;
      }

      // Upsert data into Supabase
      const { error } = await supabaseAdmin
        .from('news_articles')
        .upsert(recordsToUpsert, {
          onConflict: 'url', 
          ignoreDuplicates: false,
        });
        // Removed problematic .select({ count: 'exact' })

      if (error) {
        console.error(`Supabase upsert error for category ${category}:`, error);
        errors.push({ category, error: error.message });
      } else {
        console.log(`Successfully completed upsert for ${recordsToUpsert.length} potential articles for category: ${category}.`);
        // We don't get the exact count of *new* vs *updated* easily without select
        categoriesProcessed++; 
      }

    } catch (fetchError: any) {
      console.error(`Error fetching or processing news for category ${category}:`, fetchError);
      errors.push({ category, error: fetchError.message || 'Unknown fetch error' });
    }
  }

  console.log('Finished news fetch and store process.');
  const finalMessage = `Processed ${categoriesProcessed}/${NEWS_CATEGORIES_TO_FETCH.length} categories.`;
  if (errors.length > 0) {
    return {
      success: false,
      message: `Completed with errors. ${finalMessage}`,
      details: errors,
    };
  }

  return {
    success: true,
    message: `Successfully fetched and stored news. ${finalMessage}`,
  };
}; 
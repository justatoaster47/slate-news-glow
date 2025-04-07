import { fetchTopHeadlines } from '@/lib/api-clients/newsApiClient';
import { getSupabaseAdminClient } from '@/lib/supabase/serverClient';
// Import the named export from the TypeScript module
import { summarizeText } from '@/services/analysis/aiService'; // No .ts extension needed

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
  summary?: string | null; // Add the summary field
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
      // Fetch
      const newsApiResponse = await fetchTopHeadlines({
        country: 'us',
        category: category,
        pageSize: 100, // Fetch more articles if planning to summarize
      });

      const articles = newsApiResponse?.articles;
      if (!Array.isArray(articles) || articles.length === 0) {
        console.log(`No articles returned or invalid format for category: ${category}.`);
        continue; 
      }

      console.log(`Received ${articles.length} articles for category: ${category}. Preparing for summarization and upsert...`);

      // Map API response and generate summaries concurrently
      const recordsToUpsertPromises = articles.map(async (article: NewsApiArticle): Promise<NewsArticleRecord | null> => {
        // Basic validation for essential fields
        if (!article.url || !article.publishedAt || !article.title) {
          console.warn(`Skipping article due to missing essential fields (URL, publishedAt, title): ${article.url || article.title || 'Unknown Article'}`);
          return null;
        }
          
        // Determine text for summarization (prioritize content -> description -> title)
        const textToSummarize = article.content || article.description || article.title; // Added title as fallback
        let summary: string | null = null;

        // Attempt summarization if any text is available (removed length check)
        if (textToSummarize && textToSummarize.trim().length > 0) { 
          try {
            // Optional: Add a warning if summarizing very short text, but proceed
            if (textToSummarize.trim().length <= 50) {
                console.warn(`Text for summarization is very short (<= 50 chars) for article: "${article.title}". Proceeding anyway.`);
            }
            console.log(`Attempting to summarize article: ${article.title.substring(0, 50)}...`);
            summary = await summarizeText(textToSummarize);
            if (!summary) {
                console.warn(`Summarization returned null for article: ${article.title}`);
            } else {
                console.log(`Successfully summarized article: ${article.title.substring(0, 50)}...`);
            }
          } catch (summaryError) {
            console.error(`Error summarizing article "${article.title}":`, summaryError);
            // Proceed without summary if AI call fails
          }
        } else {
            // This case should now be rare (only if title is also missing/empty)
            console.log(`Skipping summarization for article (no content/description/title): ${article.title || article.url}`);
        }
          
        // Construct the record for Supabase
        return {
          url: article.url,
          source_id: article.source?.id,
          source_name: article.source?.name,
          author: article.author,
          title: article.title, // Already checked non-null above
          description: article.description,
          url_to_image: article.urlToImage,
          published_at: article.publishedAt, // Already checked non-null above
          content: article.content, // Keep original content if needed elsewhere
          category: category,
          summary: summary, // Add the generated summary (or null)
        };
      });

      // Wait for all summarization attempts and filter out nulls (from validation skips)
      const recordsToUpsert = (await Promise.all(recordsToUpsertPromises)).filter(record => record !== null) as NewsArticleRecord[];

      if (recordsToUpsert.length === 0) {
          console.log(`No valid records to upsert after filtering and summarization for category: ${category}.`);
          continue;
      }
      
      console.log(`Attempting to upsert ${recordsToUpsert.length} articles with summaries for category: ${category}.`);

      // Upsert data into Supabase
      const { error } = await supabaseAdmin
        .from('news_articles')
        .upsert(recordsToUpsert, {
          onConflict: 'url', 
          ignoreDuplicates: false, 
        });

      if (error) {
        console.error(`Supabase upsert error for category ${category}:`, error);
        errors.push({ category, error: error.message });
      } else {
        console.log(`Successfully completed upsert for ${recordsToUpsert.length} articles for category: ${category}.`);
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

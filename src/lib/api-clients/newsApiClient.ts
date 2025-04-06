import axios from 'axios';

// --- Type Definition (Matching the one in newsDb.ts) ---
// Ideally, this would live in a shared types file (e.g., src/types/news.ts)
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

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles?: NewsApiArticle[]; // Optional for safety
}
// -----------------------------------------------------

// Base URL for NewsAPI
// Docs: https://newsapi.org/docs
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Fetch the API key from environment variables
const NEWS_API_KEY = process.env.NEWS_API_KEY;

/**
 * Fetches top headlines from NewsAPI.
 * 
 * @param {object} params - Optional parameters for the API request (e.g., country, category, q, pageSize).
 * @returns {Promise<NewsApiResponse>} - The typed news articles data response.
 */
export const fetchTopHeadlines = async (params: Record<string, string | number> = {}): Promise<NewsApiResponse> => {
  if (!NEWS_API_KEY) {
    console.error('NewsAPI key is missing.');
    throw new Error('NewsAPI key is not configured');
  }

  const defaultParams = {
    country: 'us', // Default to US headlines
    pageSize: 20,    // Default page size
  };

  const requestParams = { ...defaultParams, ...params };

  try {
    // Axios response is typed with the expected structure
    const response = await axios.get<NewsApiResponse>(`${NEWS_API_BASE_URL}/top-headlines`, {
      headers: {
        'X-Api-Key': NEWS_API_KEY,
      },
      params: requestParams, 
    });
    console.log(`Fetched top headlines with params: ${JSON.stringify(requestParams)}`);
    console.log('[newsApiClient] Raw NewsAPI Response Data:', JSON.stringify(response.data, null, 2));
    return response.data; // Directly return the typed data
  } catch (error: unknown) {
    console.error('[newsApiClient] Error fetching NewsAPI headlines:');
    if (typeof error === 'object' && error !== null && 'response' in error) {
        const responseError = error as { response?: { status?: number; data?: any } };
        console.error(` Status: ${responseError.response?.status}`);
        console.error(` Data: ${JSON.stringify(responseError.response?.data)}`);
    } else if (error instanceof Error) {
      console.error(` Message: ${error.message}`);
    } else {
      console.error(' Unknown error structure:', error);
    }
    
    // Re-throw the error to be handled by the caller (e.g., fetchAndStoreNews)
    throw error;
  }
};

/**
 * Fetches everything (all articles) from NewsAPI based on search criteria.
 * 
 * @param {object} params - Parameters for the API request (e.g., q, sources, domains, from, to, language, sortBy, pageSize).
 *                         Requires 'q', 'sources', or 'domains'.
 * @returns {Promise<NewsApiResponse>} - The news articles data.
 */
export const fetchEverything = async (params: Record<string, string | number>): Promise<NewsApiResponse> => {
    if (!NEWS_API_KEY) {
      console.error('NewsAPI key is missing.');
      throw new Error('NewsAPI key is not configured');
    }
  
    // Validate required parameters for /everything endpoint
    if (!params.q && !params.sources && !params.domains) {
        throw new Error('Missing required parameter for NewsAPI /everything endpoint: q, sources, or domains.');
    }
  
    const defaultParams = {
      language: 'en', // Default to English
      sortBy: 'publishedAt', // Default sort
      pageSize: 20,        // Limit page size
    };
  
    const requestParams = { ...defaultParams, ...params };

    try {
      const response = await axios.get<NewsApiResponse>(`${NEWS_API_BASE_URL}/everything`, {
        headers: {
          'X-Api-Key': NEWS_API_KEY,
        },
        params: requestParams,
      });
      console.log(`Fetched everything from NewsAPI with params: ${JSON.stringify(requestParams)}`);
      return response.data;
    } catch (error: unknown) {
      console.error('[newsApiClient] Error fetching everything from NewsAPI:');
      if (typeof error === 'object' && error !== null && 'response' in error) {
            const responseError = error as { response?: { status?: number; data?: any } };
            console.error(` Status: ${responseError.response?.status}`);
            console.error(` Data: ${JSON.stringify(responseError.response?.data)}`);
        } else if (error instanceof Error) {
          console.error(` Message: ${error.message}`);
        } else {
          console.error(' Unknown error structure:', error);
        }
      throw error;
    }
  }; 
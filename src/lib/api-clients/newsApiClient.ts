import axios from 'axios';

// Base URL for NewsAPI
// Docs: https://newsapi.org/docs
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Fetch the API key from environment variables
const NEWS_API_KEY = process.env.NEWS_API_KEY;

/**
 * Fetches top headlines from NewsAPI.
 * 
 * @param {object} params - Optional parameters for the API request (e.g., country, category, q, pageSize).
 * @returns {Promise<any>} - The news articles data.
 */
export const fetchTopHeadlines = async (params: Record<string, string | number> = {}) => {
  if (!NEWS_API_KEY) {
    console.error('NewsAPI key is missing. Please set NEWS_API_KEY environment variable.');
    throw new Error('NewsAPI key is not configured');
  }

  const defaultParams = {
    country: 'us', // Default to US headlines
    pageSize: 20,    // Limit page size
  };

  // Combine default and incoming params
  const combinedParams = { ...defaultParams, ...params };

  // --- TEMPORARY MODIFICATION: Remove category to fetch general news ---
  // Create a copy with a flexible type to allow accessing/deleting category
  const requestParams: Record<string, any> = { ...combinedParams }; 
  if (requestParams.category) {
      console.log(`[newsApiClient] Temporarily removing category: ${requestParams.category} to fetch general news.`);
      delete requestParams.category; 
  }
  // --------------------------------------------------------------------

  try {
    const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
      headers: {
        'X-Api-Key': NEWS_API_KEY,
      },
      params: requestParams, // Use the modified params without category
    });
    console.log(`Fetched top headlines with params: ${JSON.stringify(requestParams)}`);
    // Log the actual data received from NewsAPI before returning
    console.log('[newsApiClient] Raw NewsAPI Response Data:', JSON.stringify(response.data, null, 2));
    // The response.data object contains status, totalResults, and articles array.
    return response.data; 
  } catch (error) {
    // Use the refined error handling
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: any }; message: string };
      console.error(
        `Error fetching NewsAPI headlines (Status: ${axiosError.response?.status}):`,
        axiosError.response?.data || axiosError.message
      );
    } else if (error instanceof Error) {
      console.error('Error fetching NewsAPI headlines:', error.message);
    } else {
      console.error('An unknown error occurred while fetching NewsAPI headlines:', error);
    }
    throw error;
  }
};

/**
 * Fetches everything (all articles) from NewsAPI based on search criteria.
 * 
 * @param {object} params - Parameters for the API request (e.g., q, sources, domains, from, to, language, sortBy, pageSize).
 *                         Requires 'q', 'sources', or 'domains'.
 * @returns {Promise<any>} - The news articles data.
 */
export const fetchEverything = async (params: Record<string, string | number>) => {
    if (!NEWS_API_KEY) {
      console.error('NewsAPI key is missing. Please set NEWS_API_KEY environment variable.');
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
      const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
        headers: {
          'X-Api-Key': NEWS_API_KEY,
        },
        params: requestParams,
      });
      console.log(`Fetched everything from NewsAPI with params: ${JSON.stringify(requestParams)}`);
      return response.data;
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number; data?: any }; message: string };
        console.error(
          `Error fetching everything from NewsAPI (Status: ${axiosError.response?.status}):`,
          axiosError.response?.data || axiosError.message
        );
      } else if (error instanceof Error) {
        console.error('Error fetching everything from NewsAPI:', error.message);
      } else {
        console.error('An unknown error occurred while fetching everything from NewsAPI:', error);
      }
      throw error;
    }
  }; 
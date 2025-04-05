import axios from 'axios';

// Base URL for Alpha Vantage API
// Docs: https://www.alphavantage.co/documentation/
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

// Fetch the API key from environment variables
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Interface for common Alpha Vantage parameters
interface AlphaVantageParams {
  apikey: string;
  [key: string]: string | number; // Allow other string/number parameters
}

/**
 * Generic function to make requests to Alpha Vantage API.
 * 
 * @param {object} params - API parameters, including 'function' (e.g., 'TIME_SERIES_INTRADAY').
 * @returns {Promise<any>} - The data from Alpha Vantage.
 */
const fetchAlphaVantageData = async (params: Record<string, string | number>) => {
  if (!ALPHA_VANTAGE_API_KEY) {
    console.error('Alpha Vantage API key is missing. Please set ALPHA_VANTAGE_API_KEY environment variable.');
    throw new Error('Alpha Vantage API key is not configured');
  }

  const requestParams: AlphaVantageParams = {
    ...params,
    apikey: ALPHA_VANTAGE_API_KEY,
  };

  try {
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
      params: requestParams,
    });
    
    // Basic logging
    console.log(`Fetched Alpha Vantage data for function: ${params.function || 'N/A'}`);

    // Type guard to check if data is an object with potential error/info keys
    const responseData = response.data as Record<string, any>; // Assert as record for key access

    // Alpha Vantage specific error handling (sometimes errors are in the response body)
    if (responseData && responseData['Error Message']) {
      console.error('Alpha Vantage API Error:', responseData['Error Message']);
      throw new Error(responseData['Error Message']);
    }    
    if (responseData && responseData['Information']) {
        // API rate limit messages often appear here
        console.warn('Alpha Vantage API Info:', responseData['Information']);
        // Decide if this should be treated as an error or just a warning
        // For free tier, hitting limits is common, might not want to throw.
        // throw new Error(responseData['Information']); 
    }

    return responseData; // Return the typed data
  } catch (error) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: any }; message: string };
      console.error(
        `Error fetching Alpha Vantage data (Status: ${axiosError.response?.status}):`,
        axiosError.response?.data || axiosError.message
      );
    } else if (error instanceof Error) {
        // Catch errors potentially thrown from the response.data checks above
        console.error(`Error fetching Alpha Vantage data: ${error.message}`);
    } else {
      console.error('An unknown error occurred while fetching Alpha Vantage data:', error);
    }
    throw error;
  }
};

// --- Specific API Function Wrappers --- 

/**
 * Fetches global quote data (price, change, volume etc.) for a symbol.
 * 
 * @param symbol - The stock symbol (e.g., 'IBM').
 * @returns Promise<any> - The global quote data.
 */
export const fetchGlobalQuote = async (symbol: string) => {
  return fetchAlphaVantageData({ function: 'GLOBAL_QUOTE', symbol });
};

/**
 * Fetches time series intraday data.
 * 
 * @param symbol - The stock symbol.
 * @param interval - Time interval (e.g., '5min', '15min', '60min').
 * @param outputsize - 'compact' (last 100) or 'full' (full history).
 * @returns Promise<any> - The time series data.
 */
export const fetchTimeSeriesIntraday = async (
    symbol: string, 
    interval: '1min' | '5min' | '15min' | '30min' | '60min' = '5min', // Default interval
    outputsize: 'compact' | 'full' = 'compact' // Default size
) => {
  return fetchAlphaVantageData({ 
    function: 'TIME_SERIES_INTRADAY', 
    symbol, 
    interval,
    outputsize 
  });
};

// Add more specific functions as needed (e.g., fetchTimeSeriesDaily, fetchCompanyOverview) 
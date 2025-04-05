import axios from 'axios';

// Base URL for SEC EDGAR API submissions endpoint
// Note: The SEC API structure can be complex. This is a basic example for recent filings.
// You might need different URLs or structures for other data types (e.g., company facts).
// See docs: https://www.sec.gov/edgar/sec-api-documentation
const SEC_API_BASE_URL = 'https://data.sec.gov/submissions';

// SEC API often requires a User-Agent header for identification.
// Format: Sample Company Name AdminContact@<sample company domain>.com
// You should replace this with your actual app/company name and contact email.
const SEC_API_USER_AGENT = process.env.SEC_API_USER_AGENT || 'YourAppName YourContact@example.com';

/**
 * Fetches recent SEC filing metadata.
 * Note: This endpoint requires CIK numbers (0-padded to 10 digits).
 * Fetching a general list of *all* recent filings might require different approaches
 * or iterating through known CIKs. This example shows fetching for ONE CIK.
 * 
 * @param cik - The Central Index Key (CIK) of the company, zero-padded to 10 digits.
 * @returns Promise<any> - The submissions data for the given CIK.
 */
export const fetchRecentFilingsByCIK = async (cik: string) => {
  if (!SEC_API_USER_AGENT || SEC_API_USER_AGENT === 'YourAppName YourContact@example.com') {
      console.warn('SEC API User-Agent is not configured or using default. Please set SEC_API_USER_AGENT environment variable.');
      // Continue for now, but proper identification is recommended by SEC.
  }
  
  // Ensure CIK is zero-padded to 10 digits
  const paddedCik = cik.padStart(10, '0');
  const apiUrl = `${SEC_API_BASE_URL}/CIK${paddedCik}.json`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'User-Agent': SEC_API_USER_AGENT,
        'Accept-Encoding': 'gzip, deflate', // Recommended by SEC docs
        'Host': 'data.sec.gov' // Recommended by SEC docs
      },
    });
    // Basic logging
    console.log(`Fetched SEC filings metadata for CIK: ${cik}`);
    // The response contains a lot of data, you'll likely want to extract specific parts, 
    // especially from the 'filings.recent' object.
    return response.data; 
  } catch (error) {
    // Check if the error object has response data, typical of Axios errors
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: any }; message: string }; // Type assertion for clarity
      console.error(
        `Error fetching SEC filings for CIK ${cik} (Status: ${axiosError.response?.status}):`,
        axiosError.response?.data || axiosError.message
      );
    } else if (error instanceof Error) {
      // Handle generic Error objects
      console.error(`Error fetching SEC filings for CIK ${cik}:`, error.message);
    } else {
      // Handle other unknown error types
      console.error(`An unknown error occurred while fetching SEC filings for CIK ${cik}:`, error);
    }
    throw error;
  }
};

// You will likely need more specific functions later, e.g.:
// - Function to search for company CIKs
// - Function to parse the filings.recent structure to extract useful metadata
// - Function to fetch specific filing documents (often requires further calls) 
import { NextRequest, NextResponse } from 'next/server';
import { fetchTopHeadlines } from '@/lib/api-clients/newsApiClient'; // Adjusted import path

// Revalidate this route every 10 minutes
export const revalidate = 600; 

/**
 * API route handler for fetching top news headlines.
 * Supports query parameters like 'country', 'category', 'q', 'pageSize'.
 * Example: /api/news?category=business&pageSize=10
 */
export async function GET(request: NextRequest) {
  // Extract search parameters from the request URL
  const searchParams = request.nextUrl.searchParams;
  const params: Record<string, string | number> = {};

  // Iterate over search params and add them to the params object
  // NewsAPI expects string values for most params, numbers for pageSize/page
  searchParams.forEach((value, key) => {
    if (key === 'pageSize' || key === 'page') {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue)) {
        params[key] = numValue;
      }
    } else {
      params[key] = value;
    }
  });

  try {
    // Call the API client function with the extracted parameters
    const newsData = await fetchTopHeadlines(params);

    // Return the fetched data as JSON
    return NextResponse.json(newsData);
  } catch (error) {
    // Log the error on the server
    console.error('API Route Error fetching news:', error);

    // Determine a user-friendly error message and status code
    let errorMessage = 'Failed to fetch news headlines.';
    let statusCode = 500; // Internal Server Error

    if (error instanceof Error && error.message.includes('NewsAPI key is not configured')) {
      errorMessage = 'NewsAPI configuration error on server.';
      // Still use 500 as it's a server-side config issue, not client's fault
    } else if (error && typeof error === 'object' && 'response' in error) {
      // Check for Axios specific errors passed up from the client
      const axiosError = error as { response?: { status?: number; data?: any }; message: string };
      if (axiosError.response?.status === 401) { // Unauthorized - likely bad API key
        errorMessage = 'NewsAPI authentication failed. Check server configuration.';
        statusCode = 500; // Treat as server error, hide details from client
      } else if (axiosError.response?.status === 429) { // Rate limit exceeded
        errorMessage = 'NewsAPI rate limit exceeded.';
        statusCode = 429;
      } else if (axiosError.response?.status === 400) { // Bad request (e.g., bad params)
        errorMessage = `Invalid request parameters: ${axiosError.response?.data?.message || 'check query parameters'}`;
        statusCode = 400;
      }
      // Add more specific status code handling if needed
    }

    // Return an error response
    return NextResponse.json({ message: errorMessage }, { status: statusCode });
  }
} 
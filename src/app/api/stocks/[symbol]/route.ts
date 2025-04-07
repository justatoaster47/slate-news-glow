import { NextRequest, NextResponse } from 'next/server';
import { fetchGlobalQuote } from '@/lib/api-clients/stockApiClient'; // Adjusted import path

// Revalidate this route every 1 minute for quote data
export const revalidate = 60; 

interface RouteParams {
    params: { symbol: string };
}

/**
 * API route handler for fetching stock data for a specific symbol.
 * Fetches global quote data by default.
 * Example: /api/stocks/IBM
 * TODO: Add support for fetching other types (e.g., time series) via query params.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { symbol } = params; // Extract symbol from the dynamic route segment

  // TODO: Add logic to parse query parameters (e.g., request.nextUrl.searchParams)
  //       to fetch different types of stock data (e.g., time series intraday)
  //       using other functions from stockApiClient (e.g., fetchTimeSeriesIntraday).
  //       For now, we default to fetching the global quote.

  if (!symbol) {
    return NextResponse.json({ message: 'Stock symbol is required.' }, { status: 400 });
  }

  try {
    // Call the API client function with the extracted symbol
    const stockData = await fetchGlobalQuote(symbol.toUpperCase()); // Ensure symbol is uppercase

    // Return the fetched data as JSON
    return NextResponse.json(stockData);
  } catch (error) {
    // Log the error on the server
    console.error(`API Route Error fetching stock data for ${symbol}:`, error);

    // Determine a user-friendly error message and status code
    let errorMessage = `Failed to fetch stock data for ${symbol}.`;
    let statusCode = 500; // Internal Server Error

    if (error instanceof Error) {
        if (error.message.includes('Alpha Vantage API key is not configured')) {
            errorMessage = 'Alpha Vantage configuration error on server.';
        } else if (error.message.includes('Invalid API call') || error.message.includes('invalid symbol')) {
            // Catch specific errors reported by Alpha Vantage via the client
            errorMessage = `Invalid symbol or API call for ${symbol}: ${error.message}`;
            statusCode = 400;
        } else if (error.message.includes('limit') || error.message.includes('premium')) {
             // Catch rate limit messages reported by Alpha Vantage via the client
            errorMessage = `Alpha Vantage API limit reached for ${symbol}. Please try again later or check your plan.`;
            statusCode = 429; // Too Many Requests
        } 
        // Use the error message directly if it was thrown by our client logic
        // but wasn't one of the specific cases above
        else {
            errorMessage = error.message; 
        }
    } else if (error && typeof error === 'object' && 'response' in error) {
      // Check for underlying Axios network/HTTP errors passed up from the client
      const axiosError = error as { response?: { status?: number; data?: any }; message: string };
      // Avoid returning detailed Axios error data to the client
      errorMessage = `Network or server error fetching stock data for ${symbol}.`;
      statusCode = axiosError.response?.status && axiosError.response.status >= 500 ? 502 : 500; // Bad Gateway or generic server error
    } else {
        // Handle completely unknown errors
        errorMessage = `An unknown error occurred while fetching stock data for ${symbol}.`;
    }

    // Return an error response
    return NextResponse.json({ message: errorMessage }, { status: statusCode });
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import { fetchRecentFilingsByCIK } from '@/lib/api-clients/secApiClient'; // Adjusted import path

// Revalidate this route every hour
export const revalidate = 3600; 

interface RouteParams {
    params: { cik: string };
}

/**
 * API route handler for fetching recent SEC filing metadata for a specific company CIK.
 * Example: /api/filings/0000320193 (Apple Inc.)
 * Note: CIK should be the 10-digit number (can be zero-padded or not, the client handles padding).
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { cik } = params; // Extract CIK from the dynamic route segment

  if (!cik || !/^[0-9]+$/.test(cik)) {
    return NextResponse.json({ message: 'Valid CIK (Central Index Key) is required.' }, { status: 400 });
  }

  try {
    // The client function handles zero-padding the CIK
    const filingsData = await fetchRecentFilingsByCIK(cik);

    // The raw response can be large and complex. 
    // TODO: Consider processing/filtering the data here or in the client 
    //       to extract only the necessary fields (e.g., recent filings array).
    //       Example: filingsData.filings.recent

    return NextResponse.json(filingsData);
  } catch (error) {
    console.error(`API Route Error fetching SEC filings for CIK ${cik}:`, error);

    let errorMessage = `Failed to fetch SEC filings for CIK ${cik}.`;
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes('SEC API User-Agent is not configured')) {
          errorMessage = 'SEC API configuration error on server.';
      } else {
          errorMessage = error.message; // Use message from client if specific
      }
    } else if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: any }; message: string };
      if (axiosError.response?.status === 404) {
          errorMessage = `No filings found for CIK ${cik}, or CIK is invalid.`;
          statusCode = 404;
      } else if (axiosError.response?.status === 400) {
          errorMessage = `Bad request fetching filings for CIK ${cik}.`;
          statusCode = 400;
      } else {
          errorMessage = `Network or server error fetching SEC filings for CIK ${cik}.`;
          statusCode = axiosError.response?.status && axiosError.response.status >= 500 ? 502 : 500;
      }
    } else {
        errorMessage = `An unknown error occurred while fetching SEC filings for CIK ${cik}.`;
    }

    return NextResponse.json({ message: errorMessage }, { status: statusCode });
  }
} 
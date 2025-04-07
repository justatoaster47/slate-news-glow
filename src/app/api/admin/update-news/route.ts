import { NextResponse } from 'next/server';
import { fetchAndStoreNews } from '@/lib/supabase/newsDb';

// Simple security: Check for a secret query parameter 
// (In production, use proper auth/IP whitelisting)
const ADMIN_SECRET = process.env.ADMIN_SECRET_TOKEN;

export async function GET(request: Request) {
  console.log('Received request to /api/admin/update-news');

  // Basic Secret Check
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (!ADMIN_SECRET) {
      console.warn('Admin secret token is not set in environment variables.');
      return NextResponse.json({ message: 'Configuration error: Admin secret not set.' }, { status: 500 });
  }

  if (secret !== ADMIN_SECRET) {
    console.warn('Unauthorized attempt to update news. Invalid secret provided.');
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  console.log('Admin secret verified. Starting news update process...');

  try {
    // Call the function to fetch and store news
    const result = await fetchAndStoreNews();

    console.log('News update process finished.', result);

    if (result.success) {
      return NextResponse.json({ message: result.message }, { status: 200 });
    } else {
      // Return a server error status if the process completed with errors
      return NextResponse.json(
        { message: result.message, details: result.details },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Unhandled error in /api/admin/update-news:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred during the news update process.', error: error.message },
      { status: 500 }
    );
  }
} 
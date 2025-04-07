import Link from 'next/link'; // Use Next.js Link for client-side navigation

export default function NotFound() {
  // Note: We can't easily get the specific path that was attempted here
  // like in the old version with useLocation. Next.js handles this automatically.

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
} 
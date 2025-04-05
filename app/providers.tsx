'use client'; // Mark this component as a Client Component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes"; // Import ThemeProvider
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  // Use useState to ensure QueryClient is only created once per session client-side
  const [queryClient] = useState(() => new QueryClient());

  return (
    // Wrap with ThemeProvider
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
} 
import type { Metadata } from "next";
import { Lato } from "next/font/google"; // Use next/font for optimization
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Providers from "./providers"; // Create a client component for providers

// Configure Lato font
const lato = Lato({ 
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"] // Specify needed weights
});

// Metadata from index.html
export const metadata: Metadata = {
  title: "News Dashboard",
  description: "A minimalistic news dashboard",
  authors: [{ name: "Lovable" }],
  openGraph: {
    title: "News Dashboard",
    description: "A minimalistic news dashboard",
    type: "website",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lovable_dev",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> 
      {/* Removed direct font link, using next/font */}
      <body className={lato.className}>
        {/* Wrap children with providers in a separate client component */}
        <Providers> 
          <TooltipProvider>
            {children}
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </Providers>
        {/* IMPORTANT: This gptengineer script might need re-evaluation in Next.js context */}
        {/* <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script> */}
      </body>
    </html>
  );
} 
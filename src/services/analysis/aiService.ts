// src/services/analysis/aiService.ts

// Import necessary types from the Google Generative AI library
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

// Ensure the API key is loaded from environment variables
// Add type annotation for apiKey
const apiKey: string | undefined = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("ERROR: GOOGLE_GEMINI_API_KEY environment variable not set.");
  // Consider throwing an error for clearer failure indication in a TS context
  // throw new Error("GOOGLE_GEMINI_API_KEY is not set.");
}

// Initialize the Google Generative AI client
// Add type annotation for genAI
const genAI: GoogleGenerativeAI | null = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Specify the Gemini model to use
const MODEL_NAME = "gemini-1.5-flash-latest"; // Use a stable identifier like latest
// Add type annotation for model
const model: GenerativeModel | null = genAI ? genAI.getGenerativeModel({ model: MODEL_NAME }) : null;

/**
 * Summarizes the provided text using the Google Gemini API.
 * 
 * @param textToSummarize The text content to be summarized.
 * @returns A promise that resolves with the summary text, or null if summarization fails or the service is not configured.
 */
// Add parameter type and return type annotations
async function summarizeTextInternal(textToSummarize: string): Promise<string | null> {
  // Check if the Gemini client was initialized successfully
  if (!model) {
    console.error(`Gemini AI model ('${MODEL_NAME}') not initialized. Check API key and configuration.`);
    return null;
  }

  // Construct the prompt for summarization
  const prompt = `Please summarize the following text concisely, capturing the main points:

---
${textToSummarize}
---

Summary:`;

  try {
    // Call the Gemini API to generate content
    console.log(`Calling Gemini ('${MODEL_NAME}') for summarization...`);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();
    
    // Log the summary for debugging (optional)
    console.log(`Gemini ('${MODEL_NAME}') returned summary.`);
    // console.log("Generated Summary:", summary);

    return summary;
  } catch (error: unknown) { // Use 'unknown' for better type safety in catch blocks
    // Log any errors encountered during the API call
    console.error(`Error calling Gemini API ('${MODEL_NAME}') for summarization:`, error);
    // Optionally check error type
    // if (error instanceof Error) { console.error(error.message); }
    return null; // Indicate failure by returning null
  }
}

// Export the function using ES module syntax
export { summarizeTextInternal as summarizeText }; 

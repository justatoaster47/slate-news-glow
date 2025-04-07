-- Add a nullable text column to store AI-generated summaries
ALTER TABLE public.news_articles
ADD COLUMN summary TEXT NULL;

COMMENT ON COLUMN public.news_articles.summary IS 'AI-generated summary of the article content.';

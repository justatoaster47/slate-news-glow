-- Migration: initial_schema_setup
-- Description: Creates the initial data_sources and aggregated_data tables,
--              adds a helper function/trigger for updated_at timestamps,
--              and inserts initial known data sources.

-- Table to store information about the different data sources we use
CREATE TABLE public.data_sources (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- e.g., 'FRED', 'SEC EDGAR', 'Alpha Vantage'
    api_url TEXT,              -- Base URL for the API if applicable
    documentation_url TEXT,    -- Link to API docs
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Add comments to the table and columns for clarity
COMMENT ON TABLE public.data_sources IS 'Stores metadata about the external data sources used by the application.';
COMMENT ON COLUMN public.data_sources.name IS 'Unique human-readable name for the data source.';
COMMENT ON COLUMN public.data_sources.api_url IS 'Base URL for the source API, if applicable.';
COMMENT ON COLUMN public.data_sources.documentation_url IS 'Link to the official documentation for the data source/API.';
COMMENT ON COLUMN public.data_sources.created_at IS 'Timestamp when the data source record was created.';
COMMENT ON COLUMN public.data_sources.updated_at IS 'Timestamp when the data source record was last updated.';

-- Placeholder table for storing aggregated data points (schema will evolve)
-- This is a very generic structure and will likely be replaced or refined
-- as specific data types (news, filings, indicators) are integrated.
CREATE TABLE public.aggregated_data (
    id BIGSERIAL PRIMARY KEY,
    source_id INTEGER REFERENCES public.data_sources(id) ON DELETE SET NULL, -- Link to the source, set null if source is deleted
    data_type TEXT NOT NULL,                      -- e.g., 'economic_indicator', 'news_article', 'stock_quote', 'sec_filing'
    identifier TEXT,                              -- e.g., Indicator code 'GDP', Ticker 'AAPL', Article URL, Filing CIK/ACC#
    timestamp TIMESTAMPTZ NOT NULL,               -- Timestamp of the data point/event itself
    value JSONB,                                  -- The actual data payload (flexible with JSONB)
    fetched_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,-- When we fetched it
    processed_at TIMESTAMPTZ,                     -- When/if AI processing was applied
    metadata JSONB                                -- Any other relevant metadata (e.g., sentiment score, summary)
);

-- Add comments for the aggregated_data table
COMMENT ON TABLE public.aggregated_data IS 'Stores aggregated data points fetched from various sources. Schema is generic initially.';
COMMENT ON COLUMN public.aggregated_data.source_id IS 'Foreign key referencing the data_sources table.';
COMMENT ON COLUMN public.aggregated_data.data_type IS 'Categorizes the type of data stored (e.g., news, indicator, filing).';
COMMENT ON COLUMN public.aggregated_data.identifier IS 'A specific identifier for the data point within its type (e.g., Ticker, Series ID).';
COMMENT ON COLUMN public.aggregated_data.timestamp IS 'The actual timestamp associated with the data point or event.';
COMMENT ON COLUMN public.aggregated_data.value IS 'The JSONB payload containing the core data.';
COMMENT ON COLUMN public.aggregated_data.fetched_at IS 'Timestamp indicating when the application retrieved this data.';
COMMENT ON COLUMN public.aggregated_data.processed_at IS 'Timestamp indicating when AI or other processing was applied.';
COMMENT ON COLUMN public.aggregated_data.metadata IS 'Additional metadata, potentially including AI analysis results like summaries or sentiment.';

-- Optional: Add an index for potentially faster lookups based on type and identifier
CREATE INDEX idx_aggregated_data_type_identifier ON public.aggregated_data(data_type, identifier);
-- Optional: Add an index for faster lookups based on timestamp
CREATE INDEX idx_aggregated_data_timestamp ON public.aggregated_data(timestamp DESC);

-- Function to automatically update `updated_at` timestamp on row update
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for `data_sources` table to use the function
CREATE TRIGGER set_data_sources_timestamp
BEFORE UPDATE ON public.data_sources
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- Insert initial known data sources into the `data_sources` table
INSERT INTO public.data_sources (name, api_url, documentation_url)
VALUES
    ('SEC EDGAR (via SEC API)', 'https://www.sec.gov/edgar/sec-api-documentation', 'https://www.sec.gov/edgar/sec-api-documentation'),
    ('FRED API', 'https://api.stlouisfed.org/fred/', 'https://fred.stlouisfed.org/docs/api/fred/'),
    ('Alpha Vantage API', 'https://www.alphavantage.co/', 'https://www.alphavantage.co/documentation/'),
    ('Financial Modeling Prep (FMP) API', 'https://financialmodelingprep.com/api/v3/', 'https://site.financialmodelingprep.com/developer/docs'),
    ('NewsAPI.org', 'https://newsapi.org/v2/', 'https://newsapi.org/docs'),
    ('BLS API', 'https://api.bls.gov/publicAPI/v2/', 'https://www.bls.gov/developers/'),
    ('BEA API', 'https://apps.bea.gov/api/data/', 'https://apps.bea.gov/api/signup/'),
    ('Federal Register API', 'https://www.federalregister.gov/api/v1/', 'https://www.federalregister.gov/developers/api/v1'),
    ('US Census Bureau API', 'https://api.census.gov/data/', 'https://www.census.gov/data/developers/guidance.html'),
    ('EIA API', 'https://api.eia.gov/v2/', 'https://www.eia.gov/opendata/documentation.php'),
    ('Congress.gov API', 'https://api.congress.gov/v3/', 'https://api.congress.gov/'),
    ('USAspending.gov API', 'https://api.usaspending.gov/api/v2/', 'https://api.usaspending.gov/');


export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  time: string;
  category: string;
}

export const newsData: NewsItem[] = [
  {
    id: "1",
    title: "Apple Announces New MacBook Pro",
    summary: "Apple unveiled its latest MacBook Pro with the M3 chip, promising significant performance improvements and longer battery life compared to previous models.",
    source: "TechCrunch",
    time: "2h ago",
    category: "tech"
  },
  {
    id: "2",
    title: "Google's AI Breakthrough",
    summary: "Google DeepMind researchers have achieved a significant breakthrough in AI reasoning capabilities, potentially transforming how machines understand natural language.",
    source: "The Verge",
    time: "4h ago",
    category: "tech"
  },
  {
    id: "3",
    title: "Twitter Introduces New Feature",
    summary: "Twitter launches a new feature allowing users to create communities around specific topics, aimed at improving conversation quality on the platform.",
    source: "CNET",
    time: "6h ago",
    category: "tech"
  },
  {
    id: "4",
    title: "Federal Reserve Maintains Interest Rates",
    summary: "The Fed announced today that it will keep interest rates unchanged, citing stable inflation data and continued economic growth as key factors in the decision.",
    source: "Bloomberg",
    time: "1h ago",
    category: "econ"
  },
  {
    id: "5",
    title: "Global Supply Chain Showing Recovery Signs",
    summary: "After two years of disruption, global supply chains are showing strong signs of recovery with shipping costs dropping and delivery times improving worldwide.",
    source: "Financial Times",
    time: "3h ago",
    category: "econ"
  },
  {
    id: "6",
    title: "New Tax Reform Bill Advances",
    summary: "The comprehensive tax reform bill has advanced to committee stage, with key provisions targeting middle-class tax relief and corporate rate adjustments.",
    source: "Washington Post",
    time: "5h ago",
    category: "policy"
  },
  {
    id: "7",
    title: "US-China Trade Talks Resume",
    summary: "Diplomatic representatives from the US and China have resumed high-level trade talks this week, hoping to ease tensions and address tariff issues.",
    source: "Reuters",
    time: "7h ago",
    category: "geopolitical"
  },
  {
    id: "8",
    title: "EU Announces Climate Initiative",
    summary: "The European Union has unveiled a €500 billion climate initiative aimed at accelerating the transition to renewable energy across member states.",
    source: "BBC",
    time: "1d ago",
    category: "policy"
  },
  {
    id: "9",
    title: "Unemployment Rate Falls to 3.9%",
    summary: "The latest labor department report shows unemployment has fallen to 3.9%, with significant job gains in tech, healthcare, and manufacturing sectors.",
    source: "CNBC",
    time: "8h ago",
    category: "econ"
  },
  {
    id: "10",
    title: "Middle East Peace Summit Scheduled",
    summary: "World leaders will gather next month for a landmark Middle East peace summit, with key regional players confirming their attendance and participation.",
    source: "Al Jazeera",
    time: "12h ago",
    category: "geopolitical"
  }
];

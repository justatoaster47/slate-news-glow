
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface NewsCardProps {
  title: string;
  summary: string;
  source?: string;
  time?: string;
}

const NewsCard = ({ title, summary, source = "Source", time = "1h ago" }: NewsCardProps) => {
  return (
    <Card className="news-card animate-fade-in">
      <CardContent className="p-4">
        <h3 className="font-bold text-slate-400 mb-2">{title}</h3>
        <p className="text-slate-200 text-sm mb-4">{summary}</p>
        <div className="flex justify-between items-center text-xs text-slate-100">
          <span>{source}</span>
          <span>{time}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;

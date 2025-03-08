import React from 'react';
import { TrendingUp } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  description: string;
  source: string;
  time: string;
  url: string;
  image: string;
}

interface TrendingSectionProps {
  articles: Article[];
}

export function TrendingSection({ articles }: TrendingSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-6 h-6 text-teal-600 dark:text-teal-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Trending Now</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            className="group relative h-64 rounded-lg overflow-hidden"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 text-white/90 text-sm mb-2">
                <span className="font-medium">{article.source}</span>
                <span>•</span>
                <span>{article.time}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                {article.title}
              </h3>
              <p className="text-white/80 text-sm line-clamp-2">
                {article.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
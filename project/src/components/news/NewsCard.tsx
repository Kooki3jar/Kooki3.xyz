import React from 'react';
import { ArrowUpRight, Clock, Tag } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  description: string;
  source: string;
  time: string;
  url: string;
  image: string;
  categories?: string[];
}

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <span className="text-sm font-medium text-teal-600 dark:text-teal-400">{article.source}</span>
          </div>
        </div>
      </a>

      <div className="p-4">
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block group">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {article.description}
          </p>
        </a>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{article.time}</span>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
          >
            Read More
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {article.categories && article.categories.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-dark-border flex flex-wrap gap-2">
            {article.categories.slice(0, 3).map((category, index) => (
              <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-dark-hover rounded-full text-xs text-gray-600 dark:text-gray-300">
                <Tag className="w-3 h-3" />
                {category}
              </span>
            ))}
            {article.categories.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-dark-hover rounded-full text-xs text-gray-600 dark:text-gray-300">
                +{article.categories.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
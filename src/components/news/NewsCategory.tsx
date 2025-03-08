import React from 'react';

interface Article {
  id: number;
  title: string;
  description: string;
  source: string;
  time: string;
  url: string;
  image: string;
}

interface NewsCategoryProps {
  title: string;
  articles: Article[];
}

export function NewsCategory({ title, articles }: NewsCategoryProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 gap-6">
        {articles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            className="flex gap-4 group"
          >
            <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {article.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{article.source}</span>
                <span>•</span>
                <span>{article.time}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
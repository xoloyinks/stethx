import React from 'react';
import { NewsArticle } from './types';

const NewsCard = ({ article }: { article: NewsArticle }) => {
  return (
    <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white m-4 transition-transform transform hover:scale-105">
      {/* Image */}
      {article.urlToImage && (
        <img
          className="w-full h-48 object-cover"
          src={article.urlToImage}
          alt={article.title}
        />
      )}
      
      {/* Card Content */}
      <div className="p-6">
        {/* Source and Author */}
        <div className="text-sm text-gray-600 mb-2">
          <span>{article.source.name}</span> | <span>{article.author}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            {article.title}
          </a>
        </h3>
        
        {/* Description */}
        <p className="text-gray-700 text-base mb-4">{article.description}</p>
        
        {/* Published Date */}
        <p className="text-sm text-gray-500">
          Published: {new Date(article.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
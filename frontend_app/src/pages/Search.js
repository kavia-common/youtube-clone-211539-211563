import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard, { VideoCardSkeleton } from '../components/VideoCard';
import { generateMockVideos } from '../services/mockData';

// PUBLIC_INTERFACE
/**
 * Search results page component
 */
const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = generateMockVideos(20);
      setVideos(results);
      setIsLoading(false);
    }, 500);
  }, [query]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">
          Search results for: <span className="text-youtube-text-secondary">{query}</span>
        </h1>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <VideoCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}

      {!isLoading && videos.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-24 h-24 mx-auto mb-4 text-youtube-text-secondary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p className="text-youtube-text-secondary">Try different keywords or remove search filters</p>
        </div>
      )}
    </div>
  );
};

export default Search;

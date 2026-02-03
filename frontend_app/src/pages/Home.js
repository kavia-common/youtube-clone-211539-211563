import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import VideoCard, { VideoCardSkeleton } from '../components/VideoCard';
import { generateMockVideos } from '../services/mockData';

// PUBLIC_INTERFACE
/**
 * Home page component with video grid and infinite scroll
 */
const Home = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
  });

  // PUBLIC_INTERFACE
  /**
   * Load initial videos
   */
  useEffect(() => {
    loadVideos(0);
  }, []);

  // PUBLIC_INTERFACE
  /**
   * Load more videos when scrolling
   */
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadVideos(page + 1);
    }
  }, [inView, hasMore, isLoading, page]);

  // PUBLIC_INTERFACE
  /**
   * Load videos for a specific page
   */
  const loadVideos = (pageNum) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newVideos = generateMockVideos(20, pageNum * 20);
      setVideos(prev => [...prev, ...newVideos]);
      setPage(pageNum);
      setIsLoading(false);
      
      // Stop loading after 5 pages
      if (pageNum >= 4) {
        setHasMore(false);
      }
    }, 500);
  };

  return (
    <div className="p-6">
      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
        
        {/* Skeleton loaders */}
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <VideoCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {/* Load more trigger */}
      {hasMore && (
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          {isLoading && (
            <div className="text-youtube-text-secondary">Loading more videos...</div>
          )}
        </div>
      )}

      {!hasMore && videos.length > 0 && (
        <div className="text-center py-8 text-youtube-text-secondary">
          No more videos to load
        </div>
      )}
    </div>
  );
};

export default Home;

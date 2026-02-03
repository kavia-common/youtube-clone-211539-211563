import React, { useState, useEffect } from 'react';
import VideoCard, { VideoCardSkeleton } from '../components/VideoCard';
import { generateMockVideos, generateSubscribedChannels } from '../services/mockData';

// PUBLIC_INTERFACE
/**
 * Subscriptions page showing videos from subscribed channels
 */
const Subscriptions = () => {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load subscribed channels and their videos
    setTimeout(() => {
      setChannels(generateSubscribedChannels());
      setVideos(generateMockVideos(24));
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="p-6">
      {/* Subscribed channels row */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Subscriptions</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {channels.map((channel) => (
            <button
              key={channel.id}
              className="flex flex-col items-center flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <div className="relative">
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="w-20 h-20 rounded-full mb-2"
                />
                {channel.hasNewContent && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-blue-500 border-2 border-youtube-bg rounded-full"></span>
                )}
              </div>
              <span className="text-xs text-center max-w-[80px] truncate">
                {channel.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Latest videos */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Latest</h2>
          <button className="text-sm text-youtube-text-secondary hover:text-white transition-colors">
            Manage
          </button>
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
      </div>
    </div>
  );
};

export default Subscriptions;

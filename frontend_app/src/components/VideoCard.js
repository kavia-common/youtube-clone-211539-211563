import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatViews, formatTimeAgo, formatDuration } from '../services/mockData';

// PUBLIC_INTERFACE
/**
 * Video card component displaying video thumbnail and metadata
 */
const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // PUBLIC_INTERFACE
  /**
   * Handle video click navigation
   */
  const handleClick = () => {
    navigate(`/watch?v=${video.id}`);
  };

  return (
    <div
      className="cursor-pointer group"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-youtube-hover rounded-xl overflow-hidden mb-3">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-youtube-hover"></div>
        )}
        <img
          src={video.thumbnail}
          alt={video.title}
          className={`w-full h-full object-cover transition-transform duration-200 ${
            isHovered ? 'scale-105' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
          {formatDuration(video.duration)}
        </div>

        {/* Live badge */}
        {video.isLive && (
          <div className="absolute top-2 left-2 bg-youtube-red text-white text-xs font-bold px-2 py-1 rounded">
            LIVE
          </div>
        )}
      </div>

      {/* Video info */}
      <div className="flex gap-3">
        {/* Channel avatar */}
        <img
          src={video.channelAvatar}
          alt={video.channelName}
          className="w-9 h-9 rounded-full flex-shrink-0"
          loading="lazy"
        />

        {/* Title and metadata */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold line-clamp-2 mb-1 group-hover:text-white transition-colors">
            {video.title}
          </h3>
          
          <div className="flex items-center gap-1 text-xs text-youtube-text-secondary mb-0.5">
            <span>{video.channelName}</span>
            {video.isVerified && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z" />
              </svg>
            )}
          </div>
          
          <div className="text-xs text-youtube-text-secondary">
            {formatViews(video.views)} views • {formatTimeAgo(video.uploadDate)}
          </div>
        </div>

        {/* More options */}
        <button
          className="p-1 hover:bg-youtube-hover rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
          }}
          aria-label="More options"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// PUBLIC_INTERFACE
/**
 * Skeleton loader for video card
 */
export const VideoCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-video bg-youtube-hover rounded-xl mb-3"></div>
      <div className="flex gap-3">
        <div className="w-9 h-9 bg-youtube-hover rounded-full flex-shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-youtube-hover rounded w-full"></div>
          <div className="h-4 bg-youtube-hover rounded w-2/3"></div>
          <div className="h-3 bg-youtube-hover rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

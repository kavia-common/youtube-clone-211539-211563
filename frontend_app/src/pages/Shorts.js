import React, { useState, useEffect } from 'react';
import { generateMockShorts, formatViews } from '../services/mockData';

// PUBLIC_INTERFACE
/**
 * Shorts page component with vertical video feed
 */
const Shorts = () => {
  const [shorts, setShorts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    const shortsData = generateMockShorts(20);
    setShorts(shortsData);
  }, []);

  // PUBLIC_INTERFACE
  /**
   * Navigate to next short
   */
  const nextShort = () => {
    if (currentIndex < shorts.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsLiked(false);
      setIsDisliked(false);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Navigate to previous short
   */
  const prevShort = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsLiked(false);
      setIsDisliked(false);
    }
  };

  if (shorts.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-youtube-text-secondary">Loading Shorts...</div>
      </div>
    );
  }

  const currentShort = shorts[currentIndex];

  return (
    <div className="fixed inset-0 top-14 bg-black flex items-center justify-center">
      {/* Main short container */}
      <div className="relative max-w-md w-full h-full flex items-center">
        {/* Short video */}
        <div className="relative w-full aspect-[9/16] bg-youtube-hover rounded-xl overflow-hidden">
          <img
            src={currentShort.thumbnail}
            alt={currentShort.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={currentShort.channelAvatar}
                    alt={currentShort.channelName}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-semibold">{currentShort.channelName}</span>
                  <button className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">
                    Subscribe
                  </button>
                </div>
                <p className="text-sm mb-2 line-clamp-2">{currentShort.title}</p>
                <div className="text-sm text-youtube-text-secondary">
                  {formatViews(currentShort.views)} views
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right action buttons */}
        <div className="absolute right-4 bottom-24 flex flex-col gap-6">
          <button
            onClick={() => {
              setIsLiked(!isLiked);
              setIsDisliked(false);
            }}
            className="flex flex-col items-center"
          >
            <div className={`w-12 h-12 rounded-full bg-youtube-hover flex items-center justify-center ${
              isLiked ? 'text-white' : ''
            }`}>
              <svg className="w-6 h-6" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
            </div>
            <span className="text-xs mt-1">Like</span>
          </button>

          <button
            onClick={() => {
              setIsDisliked(!isDisliked);
              setIsLiked(false);
            }}
            className="flex flex-col items-center"
          >
            <div className={`w-12 h-12 rounded-full bg-youtube-hover flex items-center justify-center ${
              isDisliked ? 'text-white' : ''
            }`}>
              <svg className="w-6 h-6" fill={isDisliked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
              </svg>
            </div>
            <span className="text-xs mt-1">Dislike</span>
          </button>

          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-youtube-hover flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <span className="text-xs mt-1">Comment</span>
          </button>

          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-youtube-hover flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
              </svg>
            </div>
            <span className="text-xs mt-1">Share</span>
          </button>

          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-youtube-hover flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
            <span className="text-xs mt-1">More</span>
          </button>
        </div>

        {/* Navigation arrows */}
        {currentIndex > 0 && (
          <button
            onClick={prevShort}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full mb-8 w-12 h-12 bg-youtube-hover rounded-full flex items-center justify-center hover:bg-youtube-selected transition-colors"
          >
            <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            </svg>
          </button>
        )}

        {currentIndex < shorts.length - 1 && (
          <button
            onClick={nextShort}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-full mt-8 w-12 h-12 bg-youtube-hover rounded-full flex items-center justify-center hover:bg-youtube-selected transition-colors"
          >
            <svg className="w-6 h-6 -rotate-90" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Shorts;

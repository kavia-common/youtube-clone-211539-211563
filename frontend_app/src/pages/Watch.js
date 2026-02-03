import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { generateMockVideos, generateMockComments, formatViews, formatTimeAgo } from '../services/mockData';

// PUBLIC_INTERFACE
/**
 * Watch page component for video playback
 */
const Watch = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const videoId = searchParams.get('v');
  
  const [video, setVideo] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [comments, setComments] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Load video data
    const allVideos = generateMockVideos(100);
    const currentVideo = allVideos.find(v => v.id === videoId) || allVideos[0];
    setVideo(currentVideo);
    
    // Load recommendations
    setRecommendations(generateMockVideos(20, 200));
    
    // Load comments
    setComments(generateMockComments(50));
  }, [videoId]);

  if (!video) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-youtube-text-secondary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 p-6">
      {/* Main content */}
      <div className="flex-1 max-w-5xl">
        {/* Video player */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Video title */}
        <h1 className="text-xl font-semibold mb-3">{video.title}</h1>

        {/* Video info bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <img
              src={video.channelAvatar}
              alt={video.channelName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">{video.channelName}</span>
                {video.isVerified && (
                  <svg className="w-4 h-4 text-youtube-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z" />
                  </svg>
                )}
              </div>
              <div className="text-xs text-youtube-text-secondary">1.2M subscribers</div>
            </div>
            <button
              onClick={() => setIsSubscribed(!isSubscribed)}
              className={`ml-4 px-4 py-2 rounded-full font-medium transition-colors ${
                isSubscribed
                  ? 'bg-youtube-hover text-white'
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Like/Dislike */}
            <div className="flex items-center bg-youtube-hover rounded-full overflow-hidden">
              <button
                onClick={() => {
                  setIsLiked(!isLiked);
                  setIsDisliked(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 hover:bg-youtube-selected transition-colors ${
                  isLiked ? 'text-white' : ''
                }`}
              >
                <svg className="w-6 h-6" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                <span className="text-sm font-medium">1.2K</span>
              </button>
              <div className="w-px h-6 bg-youtube-border"></div>
              <button
                onClick={() => {
                  setIsDisliked(!isDisliked);
                  setIsLiked(false);
                }}
                className={`px-4 py-2 hover:bg-youtube-selected transition-colors ${
                  isDisliked ? 'text-white' : ''
                }`}
              >
                <svg className="w-6 h-6" fill={isDisliked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                </svg>
              </button>
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 px-4 py-2 bg-youtube-hover hover:bg-youtube-selected rounded-full transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
              </svg>
              <span className="text-sm font-medium">Share</span>
            </button>

            {/* More */}
            <button className="p-2 bg-youtube-hover hover:bg-youtube-selected rounded-full transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-youtube-hover rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3 text-sm font-medium mb-2">
            <span>{formatViews(video.views)} views</span>
            <span>•</span>
            <span>{formatTimeAgo(video.uploadDate)}</span>
          </div>
          <div className={`text-sm ${showFullDescription ? '' : 'line-clamp-2'}`}>
            This is a great video about {video.title.toLowerCase()}. In this video, we explore various aspects and provide detailed insights. 
            Make sure to subscribe and hit the notification bell to never miss an update!
          </div>
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-sm font-medium mt-2 hover:text-white transition-colors"
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </button>
        </div>

        {/* Comments section */}
        <div>
          <div className="flex items-center gap-8 mb-6">
            <h2 className="text-xl font-semibold">{comments.length} Comments</h2>
            <button className="flex items-center gap-2 text-sm font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
              </svg>
              Sort by
            </button>
          </div>

          {/* Add comment */}
          <div className="flex gap-4 mb-6">
            <img
              src="https://i.pravatar.cc/150?img=33"
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 bg-transparent border-b border-youtube-border focus:border-white outline-none py-2 transition-colors"
            />
          </div>

          {/* Comments list */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{comment.author}</span>
                    <span className="text-xs text-youtube-text-secondary">{comment.timeAgo}</span>
                  </div>
                  <p className="text-sm mb-2">{comment.text}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-youtube-text-secondary hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                      <span className="text-xs">{comment.likes}</span>
                    </button>
                    <button className="text-youtube-text-secondary hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                      </svg>
                    </button>
                    {comment.replies > 0 && (
                      <button className="text-sm text-blue-500 hover:text-blue-400 font-medium">
                        {comment.replies} replies
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations sidebar */}
      <div className="w-96 flex-shrink-0">
        <div className="space-y-2">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              onClick={() => navigate(`/watch?v=${rec.id}`)}
              className="flex gap-2 cursor-pointer hover:bg-youtube-hover p-2 rounded-lg transition-colors"
            >
              <img
                src={rec.thumbnail}
                alt={rec.title}
                className="w-40 aspect-video object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium line-clamp-2 mb-1">{rec.title}</h3>
                <div className="text-xs text-youtube-text-secondary">{rec.channelName}</div>
                <div className="text-xs text-youtube-text-secondary">
                  {formatViews(rec.views)} views • {formatTimeAgo(rec.uploadDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watch;

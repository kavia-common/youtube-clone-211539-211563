// PUBLIC_INTERFACE
/**
 * Mock data service providing realistic video data for the YouTube clone
 */

const CHANNEL_NAMES = [
  'Tech Review Pro', 'Gaming Universe', 'Cooking Masters', 'Travel Vlogs Daily',
  'Music Hits Channel', 'Comedy Central Hub', 'Science Explained', 'DIY Projects',
  'Sports Highlights', 'Movie Reviews', 'Fashion Trends', 'Fitness Journey',
  'News Today', 'Art & Design', 'Photography Tips', 'Education Hub'
];

const VIDEO_TITLES = [
  'Amazing Tutorial: How to Build',
  'Top 10 Things You Should Know',
  'Ultimate Guide to',
  'Best Practices for',
  'Unboxing and Review:',
  'Let\'s Play:',
  'Daily Vlog:',
  'How I Made $10k with',
  'Beginner\'s Guide to',
  'Advanced Tips for'
];

const VIDEO_TOPICS = [
  'React Development', 'Gaming Setup', 'Cooking Tips', 'Travel Destinations',
  'Music Production', 'Comedy Sketches', 'Science Facts', 'DIY Crafts',
  'Sports Analysis', 'Movie Analysis', 'Fashion Hauls', 'Workout Routines',
  'Breaking News', 'Digital Art', 'Photography', 'Online Courses'
];

// PUBLIC_INTERFACE
/**
 * Generate a random view count
 */
const generateViews = () => {
  const random = Math.random();
  if (random > 0.8) return Math.floor(Math.random() * 10000000) + 1000000; // 1M-10M
  if (random > 0.5) return Math.floor(Math.random() * 1000000) + 100000; // 100K-1M
  if (random > 0.2) return Math.floor(Math.random() * 100000) + 10000; // 10K-100K
  return Math.floor(Math.random() * 10000) + 1000; // 1K-10K
};

// PUBLIC_INTERFACE
/**
 * Format view count for display
 */
export const formatViews = (views) => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
};

// PUBLIC_INTERFACE
/**
 * Format time ago from date
 */
export const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
};

// PUBLIC_INTERFACE
/**
 * Format duration in seconds to MM:SS or HH:MM:SS format
 */
export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// PUBLIC_INTERFACE
/**
 * Generate a single mock video
 */
const generateMockVideo = (id) => {
  const channelName = CHANNEL_NAMES[Math.floor(Math.random() * CHANNEL_NAMES.length)];
  const titlePrefix = VIDEO_TITLES[Math.floor(Math.random() * VIDEO_TITLES.length)];
  const topic = VIDEO_TOPICS[Math.floor(Math.random() * VIDEO_TOPICS.length)];
  const views = generateViews();
  const daysAgo = Math.floor(Math.random() * 365);
  const uploadDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
  const duration = Math.floor(Math.random() * 3600) + 60; // 1 min to 1 hour
  
  return {
    id: `video-${id}`,
    title: `${titlePrefix} ${topic}`,
    channelName,
    channelAvatar: `https://i.pravatar.cc/150?img=${(id % 70) + 1}`,
    thumbnail: `https://picsum.photos/seed/${id}/640/360`,
    views,
    uploadDate,
    duration,
    isLive: Math.random() > 0.95,
    isVerified: Math.random() > 0.5,
  };
};

// PUBLIC_INTERFACE
/**
 * Generate multiple mock videos
 */
export const generateMockVideos = (count, startId = 0) => {
  return Array.from({ length: count }, (_, i) => generateMockVideo(startId + i));
};

// PUBLIC_INTERFACE
/**
 * Generate mock comments for a video
 */
export const generateMockComments = (count = 20) => {
  const commenters = [
    'John Doe', 'Jane Smith', 'Tech Guru', 'Random User', 'Video Lover',
    'Content Creator', 'Daily Viewer', 'Subscriber 101', 'Fan Account', 'Pro Gamer'
  ];
  
  const commentTexts = [
    'Great video! Really helpful content.',
    'This is exactly what I was looking for, thanks!',
    'Amazing explanation, keep up the good work!',
    'Can you make a video about [topic] next?',
    'I\'ve been watching your channel for years, love your content!',
    'This deserves more views!',
    'First! Great video as always.',
    'Thanks for sharing this, very informative.',
    'Subscribed! Looking forward to more content.',
    'This changed my perspective on this topic.'
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `comment-${i}`,
    author: commenters[Math.floor(Math.random() * commenters.length)],
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    text: commentTexts[Math.floor(Math.random() * commentTexts.length)],
    likes: Math.floor(Math.random() * 10000),
    timeAgo: formatTimeAgo(new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)),
    replies: Math.random() > 0.7 ? Math.floor(Math.random() * 50) : 0,
  }));
};

// PUBLIC_INTERFACE
/**
 * Generate mock shorts data
 */
export const generateMockShorts = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    ...generateMockVideo(10000 + i),
    isShort: true,
    duration: Math.floor(Math.random() * 60) + 10, // 10-60 seconds
    thumbnail: `https://picsum.photos/seed/${10000 + i}/360/640`,
  }));
};

// PUBLIC_INTERFACE
/**
 * Generate subscribed channels
 */
export const generateSubscribedChannels = () => {
  return CHANNEL_NAMES.map((name, i) => ({
    id: `channel-${i}`,
    name,
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    isVerified: Math.random() > 0.5,
    hasNewContent: Math.random() > 0.6,
  }));
};

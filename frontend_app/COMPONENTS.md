# Component API Documentation

## Components Overview

### Header

**Location**: `src/components/Header.js`

**Description**: Fixed top navigation bar with search, notifications, and user menu.

**Props**:
```javascript
{
  onMenuClick: () => void,    // Callback to toggle sidebar
  isSidebarOpen: boolean      // Current sidebar state
}
```

**Features**:
- Search form with query state
- Notifications dropdown
- User menu dropdown
- YouTube logo navigation
- Mobile-responsive

**Usage**:
```jsx
<Header 
  onMenuClick={toggleSidebar} 
  isSidebarOpen={true} 
/>
```

---

### Sidebar

**Location**: `src/components/Sidebar.js`

**Description**: Collapsible navigation sidebar with routes and subscriptions.

**Props**:
```javascript
{
  isOpen: boolean            // Whether sidebar is expanded
}
```

**Features**:
- Smooth width transitions (240px ↔ 80px)
- Active route highlighting
- Subscription list with indicators
- Icon-only mode when collapsed

**Usage**:
```jsx
<Sidebar isOpen={isSidebarOpen} />
```

---

### VideoCard

**Location**: `src/components/VideoCard.js`

**Description**: Video thumbnail card with metadata.

**Props**:
```javascript
{
  video: {
    id: string,              // Unique video ID
    title: string,           // Video title
    channelName: string,     // Channel name
    channelAvatar: string,   // Channel avatar URL
    thumbnail: string,       // Video thumbnail URL
    views: number,           // View count
    uploadDate: Date,        // Upload date object
    duration: number,        // Duration in seconds
    isLive: boolean,         // Live stream flag
    isVerified: boolean      // Channel verification
  }
}
```

**Features**:
- Lazy loading images
- Hover scale animation
- Duration badge
- Live indicator
- Click to watch page

**Usage**:
```jsx
<VideoCard video={videoData} />
```

---

### VideoCardSkeleton

**Location**: `src/components/VideoCard.js` (named export)

**Description**: Loading placeholder for video cards.

**Props**: None

**Features**:
- Pulse animation
- Matches VideoCard layout

**Usage**:
```jsx
<VideoCardSkeleton />
```

---

## Pages Overview

### Home

**Location**: `src/pages/Home.js`

**Route**: `/`

**Description**: Main feed with video grid and infinite scroll.

**Features**:
- Responsive grid layout
- Infinite scroll (20 videos per load)
- Skeleton loaders
- "No more videos" state

**State**:
```javascript
videos: Array<Video>      // Loaded videos
page: number              // Current page number
isLoading: boolean        // Loading state
hasMore: boolean          // More videos available
```

---

### Watch

**Location**: `src/pages/Watch.js`

**Route**: `/watch?v={videoId}`

**Query Params**:
- `v`: Video ID (required)

**Description**: Video player page with comments and recommendations.

**Features**:
- Video player container
- Like/Dislike/Subscribe interactions
- Expandable description
- Comments section (50 comments)
- Recommendations sidebar (20 videos)

**State**:
```javascript
video: Video              // Current video
recommendations: Array<Video>
comments: Array<Comment>
showFullDescription: boolean
isLiked: boolean
isDisliked: boolean
isSubscribed: boolean
```

---

### Search

**Location**: `src/pages/Search.js`

**Route**: `/search?q={query}`

**Query Params**:
- `q`: Search query (required)

**Description**: Search results page.

**Features**:
- Query display
- Video grid results
- Skeleton loaders
- Empty state

**State**:
```javascript
videos: Array<Video>
isLoading: boolean
```

---

### Shorts

**Location**: `src/pages/Shorts.js`

**Route**: `/shorts`

**Description**: Vertical video feed (TikTok-style).

**Features**:
- 9:16 aspect ratio
- Previous/Next navigation
- Action buttons (like, comment, share)
- Channel info overlay

**State**:
```javascript
shorts: Array<Video>
currentIndex: number
isLiked: boolean
isDisliked: boolean
```

**Navigation**:
- `nextShort()`: Advance to next
- `prevShort()`: Go to previous

---

### Subscriptions

**Location**: `src/pages/Subscriptions.js`

**Route**: `/subscriptions`

**Description**: Videos from subscribed channels.

**Features**:
- Horizontal channel list
- New content indicators
- Latest videos grid

**State**:
```javascript
videos: Array<Video>
channels: Array<Channel>
isLoading: boolean
```

---

## Service Functions

### mockData.js

**Location**: `src/services/mockData.js`

#### generateMockVideos
```javascript
generateMockVideos(count: number, startId: number = 0): Array<Video>
```
Generates array of mock video objects.

#### generateMockComments
```javascript
generateMockComments(count: number = 20): Array<Comment>
```
Generates array of mock comments.

#### generateMockShorts
```javascript
generateMockShorts(count: number): Array<Video>
```
Generates array of vertical videos (shorts).

#### generateSubscribedChannels
```javascript
generateSubscribedChannels(): Array<Channel>
```
Generates array of subscribed channels.

#### formatViews
```javascript
formatViews(views: number): string
```
Formats view count with K/M suffix.

**Examples**:
- `1234` → `"1.2K"`
- `1500000` → `"1.5M"`

#### formatTimeAgo
```javascript
formatTimeAgo(date: Date): string
```
Converts date to relative time string.

**Examples**:
- `"2 hours ago"`
- `"3 days ago"`
- `"1 year ago"`

#### formatDuration
```javascript
formatDuration(seconds: number): string
```
Converts seconds to MM:SS or HH:MM:SS.

**Examples**:
- `125` → `"2:05"`
- `3665` → `"1:01:05"`

---

## Type Definitions

### Video
```typescript
interface Video {
  id: string;
  title: string;
  channelName: string;
  channelAvatar: string;
  thumbnail: string;
  views: number;
  uploadDate: Date;
  duration: number;
  isLive: boolean;
  isVerified: boolean;
  isShort?: boolean;  // For shorts
}
```

### Comment
```typescript
interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  timeAgo: string;
  replies: number;
}
```

### Channel
```typescript
interface Channel {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  hasNewContent: boolean;
}
```

---

## Styling Classes

### Custom Tailwind Classes

#### Colors
- `bg-youtube-bg`: Main background (#0f0f0f)
- `bg-youtube-sidebar`: Sidebar background
- `bg-youtube-hover`: Hover state (#272727)
- `bg-youtube-selected`: Selected state (#3f3f3f)
- `border-youtube-border`: Border color (#3f3f3f)
- `text-youtube-text`: Primary text (#ffffff)
- `text-youtube-text-secondary`: Secondary text (#aaaaaa)
- `text-youtube-red`: YouTube red (#ff0000)

#### Utilities
- `line-clamp-1`: Single line with ellipsis
- `line-clamp-2`: Two lines with ellipsis

---

## Hooks Used

### React Hooks
- `useState`: Component state
- `useEffect`: Side effects
- `useMemo`: Memoization (ready to add)
- `useCallback`: Function memoization (ready to add)

### React Router Hooks
- `useNavigate`: Programmatic navigation
- `useSearchParams`: Query parameter access
- `useLocation`: Current location

### External Hooks
- `useInView` (react-intersection-observer): Infinite scroll detection

---

## Event Handlers

### Common Patterns

#### Navigation
```javascript
const navigate = useNavigate();
navigate('/watch?v=video-123');
```

#### State Toggle
```javascript
const [isLiked, setIsLiked] = useState(false);
setIsLiked(!isLiked);
```

#### Form Submission
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // Process form
};
```

#### Stop Propagation
```javascript
onClick={(e) => {
  e.stopPropagation();
  // Handle click
}}
```

---

## Best Practices

### Component Structure
1. Imports
2. PUBLIC_INTERFACE comment
3. Component definition
4. State declarations
5. Effects
6. Event handlers
7. Render logic
8. Export

### State Management
- Use `useState` for local state
- Use `useEffect` for side effects
- Keep state close to usage
- Lift state when needed

### Performance
- Lazy load images
- Use intersection observer
- Memoize expensive operations
- Avoid inline function definitions in renders

### Accessibility
- Add ARIA labels
- Use semantic HTML
- Ensure keyboard navigation
- Maintain focus management

---

## Testing Guidelines

### Unit Tests
```javascript
// Example test structure
import { render, screen } from '@testing-library/react';
import VideoCard from './VideoCard';

test('renders video card', () => {
  const video = { /* mock data */ };
  render(<VideoCard video={video} />);
  expect(screen.getByText(video.title)).toBeInTheDocument();
});
```

### Integration Tests
- Test user flows (search → results)
- Test navigation (home → watch)
- Test interactions (like, subscribe)

### E2E Tests
- Full user journeys
- Cross-browser compatibility
- Performance metrics

---

**For more information, see the main README.md**

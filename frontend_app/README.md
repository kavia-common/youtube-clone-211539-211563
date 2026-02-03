# YouTube Clone - React & Tailwind CSS

A pixel-perfect, desktop-optimized YouTube clone built with React 18.3.1 and Tailwind CSS 3.3.5. Features all core YouTube functionalities with realistic mock data, dark theme UI, and production-ready code.

## 🎯 Features

### Core Functionality
- **Fixed Header**: Search bar, notifications, user menu with dropdowns
- **Collapsible Sidebar**: Navigation links, subscriptions list with new content indicators
- **Responsive Layout**: Adapts to sidebar state (expanded/collapsed)
- **Dark Theme**: YouTube's exact color palette (#0f0f0f background)
- **Accessibility**: ARIA labels, keyboard navigation support

### Pages

#### Home Page (`/`)
- Grid layout with responsive columns (1-4 columns based on screen size)
- Infinite scroll with Intersection Observer
- Skeleton loading states
- Video cards with:
  - Hover effects and scale animations
  - Duration badges
  - Live indicators
  - Channel verification badges
  - View counts and upload dates

#### Watch Page (`/watch?v={videoId}`)
- Full-width video player
- Like/Dislike functionality
- Subscribe button with state
- Expandable video description
- Comments section with:
  - Add comment input
  - Like/Reply actions
  - Reply count indicators
- Recommendations sidebar with clickable videos

#### Search Page (`/search?q={query}`)
- Search results grid
- Empty state with helpful message
- Query display in header

#### Shorts Page (`/shorts`)
- Vertical video feed (9:16 aspect ratio)
- Navigation arrows (prev/next)
- Right-side action buttons:
  - Like/Dislike
  - Comment
  - Share
  - More options
- Channel info overlay
- Swipe/click navigation

#### Subscriptions Page (`/subscriptions`)
- Horizontal scrollable channel list
- New content indicators (blue dot)
- Latest videos grid from subscribed channels

### Technical Features
- **Mock Data Service**: Realistic video data generation
- **React Router v6**: Client-side routing
- **Infinite Scroll**: Using `react-intersection-observer`
- **Skeleton Loaders**: Smooth loading states
- **Hover Previews**: Image scaling on hover
- **Format Utilities**: Views, dates, duration formatting

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Development Server
The app runs on `http://localhost:3000` (or next available port)

## 📁 Project Structure

```
frontend_app/
├── public/
│   ├── index.html          # HTML template with dark theme
│   ├── manifest.json       # PWA manifest
│   └── favicon.ico         # App icon
├── src/
│   ├── components/
│   │   ├── Header.js       # Top navigation bar
│   │   ├── Sidebar.js      # Collapsible sidebar
│   │   └── VideoCard.js    # Video thumbnail card
│   ├── pages/
│   │   ├── Home.js         # Homepage with video grid
│   │   ├── Watch.js        # Video player page
│   │   ├── Search.js       # Search results
│   │   ├── Shorts.js       # Vertical video feed
│   │   └── Subscriptions.js # Subscribed channels
│   ├── services/
│   │   └── mockData.js     # Mock data generation
│   ├── App.js              # Main app with routing
│   ├── index.js            # React entry point
│   └── index.css           # Tailwind & global styles
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies
```

## 🎨 Styling

### Color Palette
```css
--youtube-bg: #0f0f0f          /* Main background */
--youtube-sidebar: #0f0f0f     /* Sidebar background */
--youtube-hover: #272727       /* Hover state */
--youtube-selected: #3f3f3f    /* Selected/Active state */
--youtube-border: #3f3f3f      /* Borders */
--youtube-text: #ffffff        /* Primary text */
--youtube-text-secondary: #aaaaaa /* Secondary text */
--youtube-red: #ff0000         /* YouTube red */
```

### Typography
- Font: Roboto (Google Fonts)
- Weights: 300, 400, 500, 700

## 🛠️ Technologies

- **React 18.3.1**: UI library with functional components and hooks
- **React Router 6.20.0**: Client-side routing
- **Tailwind CSS 3.3.5**: Utility-first CSS framework
- **React Intersection Observer 9.5.3**: Infinite scroll implementation
- **PostCSS 8.4.31**: CSS processing
- **Autoprefixer 10.4.16**: CSS vendor prefixing

## 📦 Components

### Header Component
- Logo and menu toggle
- Search functionality with form submission
- Notifications dropdown
- User menu dropdown
- Responsive design

### Sidebar Component
- Main navigation (Home, Shorts, Subscriptions)
- Library section (History, Watch Later)
- Subscribed channels list
- Collapsible state with smooth transitions

### VideoCard Component
- Lazy loading images
- Thumbnail with duration badge
- Channel avatar
- Title (2-line clamp)
- Channel name with verification badge
- View count and upload date
- Hover effects
- Skeleton loader variant

## 🔧 Mock Data Service

The app uses a comprehensive mock data service (`mockData.js`) that generates:
- Video metadata (title, views, duration, etc.)
- Channel information
- Comments with replies
- Shorts (vertical videos)
- Subscribed channels

### Utility Functions
- `formatViews(views)`: Formats numbers (1.2M, 500K, etc.)
- `formatTimeAgo(date)`: Human-readable time (2 days ago, etc.)
- `formatDuration(seconds)`: MM:SS or HH:MM:SS format
- `generateMockVideos(count, startId)`: Generate video array
- `generateMockComments(count)`: Generate comments
- `generateMockShorts(count)`: Generate shorts
- `generateSubscribedChannels()`: Generate channel list

## 🎯 Key Features Implementation

### Infinite Scroll
Uses `react-intersection-observer` to detect when user scrolls near bottom and loads more videos automatically.

### Skeleton Loading
Displays animated placeholder cards while content loads, improving perceived performance.

### Collapsible Sidebar
Smooth transition between expanded (240px) and collapsed (80px) states with icon-only view.

### Video Player Page
Full layout with:
- 16:9 video player
- Interactive buttons (like, share, subscribe)
- Comments with nested replies support
- Recommendations sidebar

### Shorts Feed
Vertical video format with:
- Navigation controls
- Action buttons on the right
- Auto-advance option
- Channel subscription overlay

## 🌐 Routing

```javascript
/                    # Home page with video grid
/watch?v={id}       # Video player page
/search?q={query}   # Search results
/shorts             # Vertical video feed
/subscriptions      # Subscribed channels
/library            # User library (redirects to home)
/history            # Watch history (redirects to home)
/watch-later        # Watch later list (redirects to home)
```

## 📱 Responsive Design

- **Desktop**: Full layout with expanded sidebar (default)
- **Tablet**: Grid adjusts to 2-3 columns
- **Mobile**: Single column, collapsible sidebar
- **Breakpoints**: Using Tailwind's default (sm, md, lg, xl)

## 🔐 Accessibility

- Semantic HTML elements
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus states on all buttons
- Alt text on all images
- Color contrast compliance

## 🚧 Future Enhancements

- Backend API integration
- Real video playback
- User authentication
- Upload functionality
- Playlist management
- Comments posting
- Real-time notifications
- Video recommendations algorithm
- Search filters and sorting

## 📝 Code Style

- **Functional Components**: Using React Hooks
- **PUBLIC_INTERFACE**: All public functions documented
- **JSDoc Comments**: Function documentation
- **ESLint**: Code linting enabled
- **No unused variables**: Clean, optimized code
- **Consistent naming**: camelCase for variables, PascalCase for components

## 🐛 Known Issues

None currently. The app compiles successfully without warnings.

## 📄 License

This is a demo project for educational purposes.

## 👥 Contributing

This is a template project. Feel free to fork and customize.

## 🙏 Acknowledgments

- Design inspired by YouTube's interface
- Mock images from Picsum Photos and Pravatar
- Icons: SVG inline icons
- Fonts: Google Fonts (Roboto)

---

**Built with ❤️ using React and Tailwind CSS**

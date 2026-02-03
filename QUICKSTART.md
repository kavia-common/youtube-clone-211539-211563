# YouTube Clone - Quick Start Guide

Get the YouTube clone up and running in 5 minutes! 🚀

## Prerequisites

- Node.js 14 or higher
- npm or yarn
- Modern web browser

## Installation

### Step 1: Navigate to Project Directory
```bash
cd youtube-clone-211539-211563/frontend_app
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- React 18.3.1
- React Router 6.20.0
- Tailwind CSS 3.3.5
- React Intersection Observer 9.5.3
- All other dependencies

### Step 3: Start Development Server
```bash
npm start
```

The app will open automatically at `http://localhost:3000` (or next available port).

## 🎯 What You'll See

### Home Page (`/`)
- Grid of video cards
- Infinite scroll (scroll down to load more)
- Click any video to watch

### Watch Page
- Click any video card
- Like/Dislike/Subscribe buttons work
- Comments section
- Recommendations on the right

### Search
- Type in the search bar
- Press Enter
- See search results

### Shorts
- Click "Shorts" in sidebar
- Navigate with arrow buttons
- Like/Comment/Share actions

### Subscriptions
- Click "Subscriptions" in sidebar
- See subscribed channels
- Browse latest videos

## 🎨 Features to Try

1. **Toggle Sidebar**: Click hamburger menu (top-left)
2. **Search**: Type query and press Enter
3. **Infinite Scroll**: Scroll down on home page
4. **Watch Video**: Click any video card
5. **Like/Subscribe**: Try interactive buttons on watch page
6. **Navigate Shorts**: Use up/down arrows in Shorts
7. **Check Subscriptions**: View subscribed channels

## 🔧 Available Scripts

### Development
```bash
npm start          # Start dev server (hot reload)
npm test           # Run tests
```

### Production
```bash
npm run build      # Create optimized build
npx serve -s build # Test production build locally
```

### Maintenance
```bash
npm install        # Install/update dependencies
npm audit fix      # Fix security vulnerabilities
```

## 📁 Project Structure

```
frontend_app/
├── src/
│   ├── components/
│   │   ├── Header.js          # Top navigation
│   │   ├── Sidebar.js         # Left sidebar
│   │   └── VideoCard.js       # Video thumbnail
│   ├── pages/
│   │   ├── Home.js            # Main feed
│   │   ├── Watch.js           # Video player
│   │   ├── Search.js          # Search results
│   │   ├── Shorts.js          # Vertical videos
│   │   └── Subscriptions.js   # Subscribed content
│   ├── services/
│   │   └── mockData.js        # Mock data generator
│   ├── App.js                 # Main app + routing
│   ├── index.js               # Entry point
│   └── index.css              # Global styles
├── public/
│   └── index.html             # HTML template
├── tailwind.config.js         # Tailwind config
└── package.json               # Dependencies
```

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  youtube: {
    bg: '#0f0f0f',           // Change background
    red: '#ff0000',          // Change accent
    // ... more colors
  }
}
```

### Add New Page
1. Create file in `src/pages/`
2. Add route in `src/App.js`:
```javascript
<Route path="/new-page" element={<NewPage />} />
```
3. Add link in `src/components/Sidebar.js`

### Modify Mock Data
Edit `src/services/mockData.js`:
- Change video counts
- Modify channel names
- Adjust view ranges
- Update title templates

## 🐛 Troubleshooting

### Port Already in Use
```bash
# The app will prompt to use a different port
# Or kill the process using port 3000:
lsof -ti:3000 | xargs kill
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Build Errors
```bash
# Check Node.js version
node --version  # Should be 14+

# Clear build cache
rm -rf build
npm run build
```

### Styles Not Applying
```bash
# Ensure Tailwind is configured
cat tailwind.config.js

# Restart dev server
npm start
```

## 📚 Learn More

- **Full Documentation**: [README.md](./frontend_app/README.md)
- **Feature List**: [FEATURES.md](./frontend_app/FEATURES.md)
- **Component API**: [COMPONENTS.md](./frontend_app/COMPONENTS.md)
- **Deployment**: [DEPLOYMENT.md](./frontend_app/DEPLOYMENT.md)

## 🎓 Learning Resources

### React
- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [React Hooks](https://react.dev/reference/react)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Examples](https://tailwindui.com/components)

### JavaScript
- [Modern JavaScript](https://javascript.info/)
- [ES6 Features](https://github.com/lukehoban/es6features)

## 🚀 Next Steps

1. **Explore the Code**
   - Read through component files
   - Understand React hooks usage
   - Study Tailwind utility classes

2. **Customize**
   - Change colors and styling
   - Add new features
   - Modify mock data

3. **Extend**
   - Connect to real API
   - Add authentication
   - Implement video upload

4. **Deploy**
   - Follow [DEPLOYMENT.md](./frontend_app/DEPLOYMENT.md)
   - Deploy to Vercel/Netlify
   - Share your version!

## ✅ Verification

Run this checklist to verify everything works:

- [ ] App starts without errors
- [ ] Home page shows video grid
- [ ] Can click and navigate to watch page
- [ ] Search functionality works
- [ ] Sidebar toggles open/closed
- [ ] Shorts page navigates up/down
- [ ] Subscriptions page loads
- [ ] No console errors
- [ ] Production build succeeds

## 💡 Tips

1. **Hot Reload**: Changes auto-refresh in dev mode
2. **Console**: Open browser DevTools (F12) to debug
3. **Network Tab**: See mock data loading
4. **React DevTools**: Install extension for debugging
5. **Tailwind Play**: Test Tailwind classes at [play.tailwindcss.com](https://play.tailwindcss.com/)

## 🎉 You're Ready!

The YouTube clone is fully functional and ready to use. Explore, customize, and have fun! 

For detailed information about features and implementation, check out the comprehensive documentation in the `frontend_app` directory.

---

**Need Help?**
- Check documentation files
- Review code comments
- Inspect browser console
- Read React/Tailwind docs

**Happy Coding!** 🎬

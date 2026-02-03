import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Search from './pages/Search';
import Shorts from './pages/Shorts';
import Subscriptions from './pages/Subscriptions';

// PUBLIC_INTERFACE
/**
 * Main application component with routing and layout
 */
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // PUBLIC_INTERFACE
  /**
   * Toggle sidebar open/closed state
   */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-youtube-bg text-youtube-text">
        <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} />
          
          <main
            className={`flex-1 transition-all duration-300 pt-14 ${
              isSidebarOpen ? 'ml-60' : 'ml-20'
            }`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watch" element={<Watch />} />
              <Route path="/search" element={<Search />} />
              <Route path="/shorts" element={<Shorts />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/library" element={<Home />} />
              <Route path="/history" element={<Home />} />
              <Route path="/watch-later" element={<Home />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

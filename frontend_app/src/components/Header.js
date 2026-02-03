import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * Header component with YouTube-like navigation, search, and user menu
 */
const Header = ({ onMenuClick, isSidebarOpen }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // PUBLIC_INTERFACE
  /**
   * Handle search submission
   */
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-youtube-bg border-b border-youtube-border z-50 flex items-center px-4">
      {/* Left section - Menu and Logo */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-youtube-hover rounded-full transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          aria-label="YouTube Home"
        >
          <svg className="w-8 h-8 text-youtube-red" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <span className="font-semibold text-xl tracking-tight">YouTube</span>
        </button>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-2xl mx-4">
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="flex-1 flex items-center bg-youtube-bg border border-youtube-border rounded-l-full overflow-hidden focus-within:border-blue-500">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent px-4 py-2 outline-none text-white placeholder-youtube-text-secondary"
              aria-label="Search"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-youtube-hover border border-l-0 border-youtube-border rounded-r-full hover:bg-youtube-selected transition-colors"
            aria-label="Search"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </form>
      </div>

      {/* Right section - Icons and User */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          className="p-2 hover:bg-youtube-hover rounded-full transition-colors"
          aria-label="Create"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z" />
          </svg>
        </button>

        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="p-2 hover:bg-youtube-hover rounded-full transition-colors relative"
            aria-label="Notifications"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-youtube-red rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-youtube-sidebar border border-youtube-border rounded-lg shadow-xl py-2">
              <div className="px-4 py-2 border-b border-youtube-border">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="px-4 py-8 text-center text-youtube-text-secondary">
                No new notifications
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 ring-white transition-all"
            aria-label="User menu"
          >
            <img
              src="https://i.pravatar.cc/150?img=33"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-youtube-sidebar border border-youtube-border rounded-lg shadow-xl py-2">
              <div className="px-4 py-3 border-b border-youtube-border flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=33"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-semibold">User Name</div>
                  <div className="text-sm text-youtube-text-secondary">@username</div>
                </div>
              </div>
              <button className="w-full px-4 py-2 text-left hover:bg-youtube-hover transition-colors">
                Your channel
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-youtube-hover transition-colors">
                Settings
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-youtube-hover transition-colors">
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { generateSubscribedChannels } from '../services/mockData';

// PUBLIC_INTERFACE
/**
 * Collapsible sidebar component with navigation and subscriptions
 */
const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const subscribedChannels = generateSubscribedChannels().slice(0, 8);

  // PUBLIC_INTERFACE
  /**
   * Check if a path is currently active
   */
  const isActive = (path) => location.pathname === path;

  // PUBLIC_INTERFACE
  /**
   * Sidebar navigation item component
   */
  const SidebarItem = ({ icon, label, path, badge }) => (
    <button
      onClick={() => navigate(path)}
      className={`w-full flex items-center gap-6 px-6 py-2 hover:bg-youtube-hover transition-colors ${
        isActive(path) ? 'bg-youtube-selected' : ''
      }`}
      aria-label={label}
    >
      {icon}
      {isOpen && (
        <>
          <span className="flex-1 text-left text-sm font-medium">{label}</span>
          {badge && (
            <span className="bg-youtube-red text-xs px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </>
      )}
    </button>
  );

  return (
    <aside
      className={`fixed top-14 left-0 bottom-0 bg-youtube-sidebar border-r border-youtube-border overflow-y-auto transition-all duration-300 z-40 ${
        isOpen ? 'w-60' : 'w-20'
      }`}
    >
      <nav className="py-3">
        {/* Main Navigation */}
        <div className="mb-3">
          <SidebarItem
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            }
            label="Home"
            path="/"
          />
          <SidebarItem
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 9.35L15 12l-5 2.65zM12 7a5 5 0 105 5 5 5 0 00-5-5m0-2a7 7 0 11-7 7 7 7 0 017-7" />
              </svg>
            }
            label="Shorts"
            path="/shorts"
          />
          <SidebarItem
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z" />
              </svg>
            }
            label="Subscriptions"
            path="/subscriptions"
          />
        </div>

        {isOpen && <div className="border-t border-youtube-border my-3"></div>}

        {/* Library Section */}
        {isOpen && (
          <div className="mb-3">
            <SidebarItem
              icon={
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11 7l6 3.5L11 14V7zm.03-7L11 3.5 2 8.5V10l9 5 9-5V8.5L11.03 0zM22 12l-9 5-9-5v1.5l9 5 9-5V12z" />
                </svg>
              }
              label="Library"
              path="/library"
            />
            <SidebarItem
              icon={
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              }
              label="History"
              path="/history"
            />
            <SidebarItem
              icon={
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.97 16.95L10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
                </svg>
              }
              label="Watch Later"
              path="/watch-later"
            />
          </div>
        )}

        {isOpen && <div className="border-t border-youtube-border my-3"></div>}

        {/* Subscriptions */}
        {isOpen && (
          <div>
            <h3 className="px-6 py-2 text-sm font-semibold text-youtube-text-secondary">
              Subscriptions
            </h3>
            {subscribedChannels.map((channel) => (
              <button
                key={channel.id}
                className="w-full flex items-center gap-4 px-6 py-2 hover:bg-youtube-hover transition-colors"
                aria-label={`Go to ${channel.name}`}
              >
                <div className="relative">
                  <img
                    src={channel.avatar}
                    alt={channel.name}
                    className="w-6 h-6 rounded-full"
                  />
                  {channel.hasNewContent && (
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 border-2 border-youtube-sidebar rounded-full"></span>
                  )}
                </div>
                <span className="flex-1 text-left text-sm truncate">
                  {channel.name}
                </span>
                {channel.isVerified && (
                  <svg className="w-4 h-4 text-youtube-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;

import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock, TrendingUp, X, Sparkles } from 'lucide-react';
import './Searchbar.css';

// Custom hook for debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Elegant Search Bar Component
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState([
    'Luxury watches',
    'Designer handbags',
    'Premium leather shoes',
    'Silk scarves',
    'Gold jewelry'
  ]);
  const [trendingSearches] = useState([
    'Winter Collection 2024',
    'Sustainable Fashion',
    'Vintage Accessories',
    'Limited Editions'
  ]);

  const searchRef = useRef(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show history when focused and empty
  useEffect(() => {
    if (isFocused && searchQuery === '') {
      setShowHistory(true);
    } else {
      setShowHistory(false);
    }
  }, [isFocused, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() && !searchHistory.includes(query.trim())) {
      setSearchHistory([query.trim(), ...searchHistory].slice(0, 5));
    }
  };

  const handleHistoryClick = (item) => {
    setSearchQuery(item);
    setShowHistory(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowHistory(true);
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className="elegant-search-container">
      {/* Background Effects */}
      <div className="bg-glow"></div>
      <div className="bg-pattern"></div>

      {/* Main Search Section */}
      <div className="search-section" ref={searchRef}>
        <div className="search-header">
          <h1 className="search-title">
            <Sparkles className="sparkle-icon" />
            Discover Elegance
          </h1>
          <p className="search-subtitle">Search our curated collection of premium items</p>
        </div>

        {/* Search Bar */}
        <div className={`search-bar ${isFocused ? 'focused' : ''}`}>
          <div className="search-icon-wrapper">
            <Search className="search-icon" size={22} />
            <div className="icon-glow"></div>
          </div>

          <input
            type="text"
            className="search-input"
            placeholder="What are you looking for today?"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />

          {searchQuery && (
            <button className="clear-button" onClick={clearSearch}>
              <X size={18} />
            </button>
          )}

          <div className="search-border-glow"></div>
        </div>

        {/* Typing Indicator */}
        {searchQuery && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="typing-text">Searching...</span>
          </div>
        )}

        {/* Search History & Trending Dropdown */}
        {showHistory && (
          <div className="history-dropdown">
            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="history-section">
                <div className="section-header">
                  <div className="section-title">
                    <Clock size={16} />
                    <span>Recent Searches</span>
                  </div>
                  <button className="clear-all-btn" onClick={clearHistory}>
                    Clear All
                  </button>
                </div>

                <div className="history-list">
                  {searchHistory.map((item, index) => (
                    <div
                      key={index}
                      className="history-item"
                      onClick={() => handleHistoryClick(item)}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <Clock size={14} className="item-icon" />
                      <span className="item-text">{item}</span>
                      <div className="item-hover-line"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            {searchHistory.length > 0 && (
              <div className="divider">
                <div className="divider-line"></div>
                <div className="divider-diamond"></div>
                <div className="divider-line"></div>
              </div>
            )}

            {/* Trending Searches */}
            <div className="trending-section">
              <div className="section-header">
                <div className="section-title">
                  <TrendingUp size={16} />
                  <span>Trending Now</span>
                </div>
              </div>

              <div className="trending-list">
                {trendingSearches.map((item, index) => (
                  <div
                    key={index}
                    className="trending-item"
                    onClick={() => handleHistoryClick(item)}
                    style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
                  >
                    <div className="trending-number">{index + 1}</div>
                    <span className="item-text">{item}</span>
                    <Sparkles size={14} className="trending-sparkle" />
                    <div className="item-hover-line"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-item">
          <span className="stat-number">10K+</span>
          <span className="stat-label">Premium Items</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">500+</span>
          <span className="stat-label">Luxury Brands</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">50K+</span>
          <span className="stat-label">Happy Clients</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
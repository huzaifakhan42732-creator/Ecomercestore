import React, { useState, useMemo, useCallback } from 'react';
import { TrendingUp, Eye } from 'lucide-react';

// Components
import Header from './components/Header.jsx';
import SearchBar from './components/Searchbar.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import ProductDetailModal from './components/Productdetail.jsx';
import Footer from './components/Footer.jsx';

// Hooks
import { useDebounce } from './hooks/useDebounce.jsx';
import { useLocalStorage } from './hooks/localstorage.jsx';

// Utils
import { getRecommendations, getCategories } from './utils/recommendationAlgorithm.js';
import FiltersPanel from './utils/Filterspanel.jsx';
import { filterProducts } from './utils/filters.js';

// Data
import { categories as allCategories, products } from './data/productsData.js';

// Styles
import './App.css';

const App = () => {
  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // LocalStorage State
  const [viewedProducts, setViewedProducts] = useLocalStorage('viewedProducts', []);
  const [searchHistory, setSearchHistory] = useLocalStorage('searchHistory', []);
  
  // Debounced Search
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Get categories (avoid collision with imported allCategories)
  const categoryList = useMemo(() => getCategories(), []);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return filterProducts(
      products,  // ✅ corrected
      debouncedSearch,
      selectedCategory,
      priceRange,
      minRating
    );
  }, [debouncedSearch, selectedCategory, priceRange, minRating]);

  // Get recommendations
  const recommendations = useMemo(() => {
    return getRecommendations(viewedProducts, 4);
  }, [viewedProducts]);

  // Handle search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Handle search submission (add to history)
  const handleSearchSubmit = useCallback(() => {
    if (searchQuery.trim() && !searchHistory.includes(searchQuery.trim())) {
      setSearchHistory([searchQuery.trim(), ...searchHistory].slice(0, 5));
    }
  }, [searchQuery, searchHistory, setSearchHistory]);

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Handle toggle filters
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Handle select search history
  const handleSelectHistory = (query) => {
    setSearchQuery(query);
  };

  // Handle clear search history
  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  // Handle product click
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Add product to viewed history
  const addToViewedProducts = useCallback((productId) => {
    if (!viewedProducts.includes(productId)) {
      setViewedProducts([productId, ...viewedProducts].slice(0, 10));
    }
  }, [viewedProducts, setViewedProducts]);

  // Reset filters
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 1000]);
    setMinRating(0);
  };

  return (
    <div className="app">
      {/* Header */}
      <Header />

      {/* Hero Section with Search */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2 className="hero-title">Discover Your Perfect Products</h2>
            <p className="hero-subtitle">Smart search... with personalized recommendations just for you</p>
            
            {/* Search Container */}
            <div className="search-container">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onClear={handleClearSearch}
                onToggleFilters={handleToggleFilters}
              />

            
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <FiltersPanel
                categories={categoryList} // ✅ corrected
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                minRating={minRating}
                onRatingChange={setMinRating}
                onResetFilters={handleResetFilters}
              />
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {/* Recommendations Section */}
          {!debouncedSearch && viewedProducts.length > 0 && (
            <section className="section">
              <div className="section-header">
                <h3 className="section-title">
                  <TrendingUp size={24} />
                  Recommended For You
                </h3>
                <p className="section-subtitle">Based on your browsing history</p>
              </div>
              <ProductGrid
                products={recommendations}
                onProductClick={handleProductClick}
                isRecommended={true}
              />
            </section>
          )}

          {/* Search Results */}
          <section className="section">
            <div className="section-header">
              <h3 className="section-title">
                {debouncedSearch ? `Search Results for "${debouncedSearch}"` : 'All Products'}
              </h3>
              <p className="section-subtitle">{filteredProducts.length} products found</p>
            </div>
            <ProductGrid
              products={filteredProducts}
              onProductClick={handleProductClick}
            />
          </section>

          {/* Recently Viewed */}
          {viewedProducts.length > 0 && (
            <section className="section">
              <div className="section-header">
                <h3 className="section-title">
                  <Eye size={24} />
                  Recently Viewed
                </h3>
              </div>
              <ProductGrid
                products={viewedProducts.slice(0, 4).map(id => 
                  products.find(p => p.id === id)  // ✅ corrected
                ).filter(Boolean)}
                onProductClick={handleProductClick}
              />
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToViewed={addToViewedProducts}
        />
      )}
    </div>
  );
};

export default App;

import React, { useState, useMemo, useCallback } from 'react';
import { TrendingUp, Eye } from 'lucide-react';

// Components
import SearchBar from './Searchbar.jsx';
import ProductGrid from './ProductGrid.jsx';
import ProductDetailModal from './Productdetail.jsx';
import Footer from './Footer.jsx';

// Hooks
import { useDebounce } from '../hooks/useDebounce.jsx';
import { useLocalStorage } from '../hooks/localstorage.jsx';

// Utils
import { getRecommendations, getCategories } from '../utils/recommendationAlgorithm.js';
import FiltersPanel from '../utils/Filterspanel.jsx';
import { filterProducts } from '../utils/filters.js';

// Data
import { products } from '../data/productsData.js';

// Styles
import '../App.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [viewedProducts, setViewedProducts] = useLocalStorage('viewedProducts', []);
  const [searchHistory, setSearchHistory] = useLocalStorage('searchHistory', []);

  const debouncedSearch = useDebounce(searchQuery, 300);
  const categoryList = useMemo(() => getCategories(), []);

  const filteredProducts = useMemo(() => {
    return filterProducts(
      products,
      debouncedSearch,
      selectedCategory,
      priceRange,
      minRating
    );
  }, [debouncedSearch, selectedCategory, priceRange, minRating]);

  const recommendations = useMemo(() => {
    return getRecommendations(viewedProducts, 4);
  }, [viewedProducts]);

  const handleSearchChange = (query) => setSearchQuery(query);
  const handleClearSearch = () => setSearchQuery('');
  const handleToggleFilters = () => setShowFilters(!showFilters);
  const handleProductClick = (product) => setSelectedProduct(product);

  const addToViewedProducts = useCallback((productId) => {
    if (!viewedProducts.includes(productId)) {
      setViewedProducts([productId, ...viewedProducts].slice(0, 10));
    }
  }, [viewedProducts, setViewedProducts]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 1000]);
    setMinRating(0);
  };

  return (
    <div className="app">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2 className="hero-title">Discover Your Perfect Products</h2>

            <div className="search-container">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onClear={handleClearSearch}
                onToggleFilters={handleToggleFilters}
              />
            </div>

            {showFilters && (
              <FiltersPanel
                categories={categoryList}
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

      <main className="main">
        <div className="container">

          {!debouncedSearch && viewedProducts.length > 0 && (
            <section className="section">
              <h3><TrendingUp size={24} /> Recommended</h3>
              <ProductGrid
                products={recommendations}
                onProductClick={handleProductClick}
              />
            </section>
          )}

          <section className="section">
            <h3>
              {debouncedSearch
                ? `Search Results for "${debouncedSearch}"`
                : 'All Products'}
            </h3>

            <ProductGrid
              products={filteredProducts}
              onProductClick={handleProductClick}
            />
          </section>

          {viewedProducts.length > 0 && (
            <section className="section">
              <h3><Eye size={24} /> Recently Viewed</h3>
              <ProductGrid
                products={viewedProducts
                  .slice(0, 4)
                  .map(id => products.find(p => p.id === id))
                  .filter(Boolean)}
                onProductClick={handleProductClick}
              />
            </section>
          )}

        </div>
      </main>

      <Footer />

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

export default Home;

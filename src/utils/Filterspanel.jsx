import React from 'react';
import { Star } from 'lucide-react';
import './filterpannel.css';

const FiltersPanel = ({ 
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  onResetFilters
}) => {
  return (
    <div className="filters-panel">
      {/* Category Filter */}
      <div className="filter-group">
        <label className="filter-label">Category</label>
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="filter-group">
        <label className="filter-label">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <div className="range-inputs">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[0]}
            onChange={(e) => onPriceChange([parseInt(e.target.value), priceRange[1]])}
            className="range-slider"
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
            className="range-slider"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="filter-group">
        <label className="filter-label">
          Minimum Rating: {minRating > 0 ? minRating : 'All'}
        </label>
        <div className="rating-buttons">
          {[0, 3, 4, 4.5].map(rating => (
            <button
              key={rating}
              className={`rating-btn ${minRating === rating ? 'active' : ''}`}
              onClick={() => onRatingChange(rating)}
            >
              {rating === 0 ? 'All' : `${rating}+`}
              {rating > 0 && <Star size={12} fill="currentColor" />}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button className="reset-filters-btn" onClick={onResetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default FiltersPanel;
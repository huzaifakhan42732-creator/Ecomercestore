import React, { useState } from 'react';
import { Star, Sparkles, Heart, Eye, ShoppingCart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onClick, isRecommended = false }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    onClick(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log('Added to cart:', product.name);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`product-card ${isRecommended ? 'product-card-recommended' : ''}`}
      onClick={() => onClick(product)}
    >
      {/* Badges */}
      <div className="product-badges">
        {isRecommended && (
          <div className="badge badge-recommended">
            <Sparkles size={12} />
            <span>Recommended</span>
          </div>
        )}

        {product.discount && (
          <div className="badge badge-discount">
            -{product.discount}%
          </div>
        )}

        {product.isNew && (
          <div className="badge badge-new">
            New
          </div>
        )}
      </div>

      {/* Wishlist */}
      <button
        className={`wishlist-btn ${isWishlisted ? 'wishlist-btn-active' : ''}`}
        onClick={handleWishlistClick}
        aria-label="Add to wishlist"
      >
        <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
      </button>

      {/* Product Image */}
      <div className="product-image">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <span className="emoji">🖼️</span>
        )}

        {/* Overlay Actions */}
        <div className="product-overlay">
          <button
            className="overlay-btn btn-quick-view"
            onClick={handleQuickView}
          >
            <Eye size={18} />
            <span>Quick View</span>
          </button>

          <button
            className="overlay-btn btn-add-cart"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        {/* Tags */}
        {product.tags && (
          <div className="product-tags">
            {product.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="product-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="product-footer">
          <div className="product-rating">
            <Star size={14} fill="currentColor" />
            <span className="rating-value">{product.rating}</span>
            {product.reviews && (
              <span className="rating-count">({product.reviews})</span>
            )}
          </div>

          <div className="product-price-container">
            {product.originalPrice && (
              <div className="product-original-price">
                ${product.originalPrice}
              </div>
            )}
            <div className="product-price">${product.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

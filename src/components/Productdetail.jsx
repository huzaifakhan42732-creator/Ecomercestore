import React, { useEffect, useState } from 'react';
import {
  X, Star, ShoppingBag, Heart, Share2, Minus, Plus,
  Truck, Shield, RotateCcw, ChevronLeft, ChevronRight
} from 'lucide-react';
import './Productdetail.css';

const ProductDetailModal = ({ product, onClose, onAddToViewed }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Navy', 'Gray', 'Beige'];
  
  // Ensure product.images is an array; if not, fallback to single image
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  useEffect(() => {
    onAddToViewed(product.id);
    setIsAnimating(true);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product.id, onAddToViewed]);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`modal-overlay ${isAnimating ? 'modal-overlay-active' : ''}`} onClick={onClose}>
      <div className={`modal-content ${isAnimating ? 'modal-content-active' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div className="modal-body">
          {/* Image Gallery */}
          <div className="modal-image-section">
            <div className="image-gallery">
              <div className="main-image-container">
                <div className="main-image">
                  <img
                    src={images[currentImageIndex]}
                    alt={`${product.name} image ${currentImageIndex + 1}`}
                    loading="lazy"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/400'}
                  />
                </div>

                {images.length > 1 && (
                  <>
                    <button className="image-nav-btn prev-btn" onClick={handlePrevImage} aria-label="Previous image">
                      <ChevronLeft size={24} />
                    </button>
                    <button className="image-nav-btn next-btn" onClick={handleNextImage} aria-label="Next image">
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                <div className="image-indicators">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="thumbnail-gallery">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'thumbnail-active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      loading="lazy"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="image-actions">
              <button
                className={`action-btn ${isFavorite ? 'action-btn-active' : ''}`}
                onClick={() => setIsFavorite(!isFavorite)}
                aria-label="Add to favorites"
              >
                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              <button className="action-btn" aria-label="Share product">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="modal-details">
            <div className="modal-header">
              <div className="modal-category">{product.category}</div>
              <div className="modal-rating">
                <Star size={18} fill="currentColor" />
                <span className="rating-value">{product.rating}</span>
                <span className="rating-count">({product.reviews || 0} reviews)</span>
              </div>
            </div>

            <h2 className="modal-title">{product.name}</h2>

            <div className="modal-price-section">
              <div className="modal-price">${product.price}</div>
              {product.originalPrice && (
                <div className="modal-original-price">${product.originalPrice}</div>
              )}
              {product.discount && (
                <div className="modal-discount">-{product.discount}%</div>
              )}
            </div>

            <p className="modal-description">{product.description}</p>

            {/* Color Selection */}
            <div className="option-group">
              <label className="option-label">Color: <span className="selected-option">{selectedColor}</span></label>
              <div className="color-options">
                {colors.map(color => (
                  <button
                    key={color}
                    className={`color-btn ${selectedColor === color ? 'color-btn-active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color}`}
                    style={{ background: color.toLowerCase() === 'white' ? '#f5f5f5' : color.toLowerCase() }}
                  >
                    {selectedColor === color && <span className="color-check">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="option-group">
              <label className="option-label">Size: <span className="selected-option">{selectedSize}</span></label>
              <div className="size-options">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'size-btn-active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="option-group">
              <label className="option-label">Quantity</label>
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={() => handleQuantityChange(-1)} disabled={quantity === 1}>
                  <Minus size={16} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button className="quantity-btn" onClick={() => handleQuantityChange(1)} disabled={quantity === 10}>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button className={`btn-primary ${addedToCart ? 'btn-success' : ''}`} onClick={handleAddToCart}>
                <ShoppingBag size={18} />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button className="btn-secondary">Buy Now</button>
            </div>

            {/* Features */}
            <div className="product-features">
              <div className="feature-item">
                <Truck size={20} />
                <div className="feature-text"><strong>Free Shipping</strong><span>On orders over $100</span></div>
              </div>
              <div className="feature-item">
                <RotateCcw size={20} />
                <div className="feature-text"><strong>Easy Returns</strong><span>30-day return policy</span></div>
              </div>
              <div className="feature-item">
                <Shield size={20} />
                <div className="feature-text"><strong>Secure Payment</strong><span>100% secure checkout</span></div>
              </div>
            </div>

            {/* Tags */}
            <div className="modal-tags">
              {product.tags && product.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;

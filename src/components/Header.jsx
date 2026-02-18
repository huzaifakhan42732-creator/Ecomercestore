import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Heart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import 

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3); // Example cart count

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      
      {/* Top Bar */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <p className="header-announcement">
              Free shipping on orders over $100 | Limited time offer
            </p>
            <div className="header-top-links">
              <a href="#customer-service" className="header-top-link">Customer Service</a>
              <a href="#track-order" className="header-top-link">Track Order</a>
              <a href="#store-locator" className="header-top-link">Store Locator</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="container">
          <div className="header-content">

            {/* Logo */}
            <div className="logo-container">
              <Link to="/" className="logo">
                <ShoppingBag className="logo-icon" />
                <span className="logo-text">Luxora</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="nav desktop-nav">
              <a href="#home" className="nav-link">Home</a>
              <a href="#collections" className="nav-link">Collections</a>
              <a href="#new-arrivals" className="nav-link">New Arrivals</a>
              <a href="#sale" className="nav-link nav-link-sale">Sale</a>
            <a href="#about" className="nav-link">About</a>
            </nav>

            {/* Header Actions */}
            <div className="header-actions">
              <button className="header-action-btn search-btn" aria-label="Search">
                <Search size={20} />
              </button>
              <a href="#account" className="header-action-btn" aria-label="Account">
                <User size={20} />
              </a>
              <a href="#wishlist" className="header-action-btn" aria-label="Wishlist">
                <Heart size={20} />
              </a>
              <a href="#cart" className="header-action-btn cart-btn" aria-label="Shopping Cart">
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </a>

              {/* Mobile Menu Toggle */}
              <button 
                className="mobile-menu-toggle" 
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav-open' : ''}`}>
        <nav className="mobile-nav-links">
          <a href="#home" className="mobile-nav-link" onClick={toggleMobileMenu}>Home</a>
          <a href="#collections" className="mobile-nav-link" onClick={toggleMobileMenu}>Collections</a>
          <a href="#new-arrivals" className="mobile-nav-link" onClick={toggleMobileMenu}>New Arrivals</a>
          <a href="#sale" className="mobile-nav-link mobile-nav-link-sale" onClick={toggleMobileMenu}>Sale</a>
          
        </nav>

        <div className="mobile-nav-footer">
          <a href="#account" className="mobile-nav-footer-link">My Account</a>
          <a href="#customer-service" className="mobile-nav-footer-link">Customer Service</a>
          <a href="#track-order" className="mobile-nav-footer-link">Track Order</a>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
      )}
    </header>
  );
};

export default Header;

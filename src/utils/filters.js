/**
 * Filter products based on search query and filters
 * @param {Object[]} products - Array of products
 * @param {string} searchQuery - Search query string
 * @param {string} category - Selected category
 * @param {number[]} priceRange - [min, max] price range
 * @param {number} minRating - Minimum rating filter
 * @returns {Object[]} - Filtered products
 */
export const filterProducts = (products, searchQuery, category, priceRange, minRating) => {
  return products.filter(product => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = category === 'All' || product.category === category;
    
    // Price filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Rating filter
    const matchesRating = product.rating >= minRating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });
};
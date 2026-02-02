import Product from './Product.jsx';
import './Productgrid.css';

const ProductGrid = ({ products, onProductClick, isRecommended = false }) => {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h4>No products found</h4>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map(product => (
        <Product
          key={product.id}
          product={product}
          onClick={onProductClick}
          isRecommended={isRecommended}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
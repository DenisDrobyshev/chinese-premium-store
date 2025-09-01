import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 'M', 1);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img 
            src={product.image} 
            alt={product.title}
            onLoad={() => setImageLoaded(true)}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
          {!imageLoaded && <div className="image-placeholder"></div>}
          {product.badge && <span className={`product-badge ${product.badge.toLowerCase()}`}>{product.badge}</span>}
          <button 
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleWishlistClick();
            }}
          >
            <i className="fas fa-heart"></i>
          </button>
        </div>
        
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h3 className="product-title">{product.title}</h3>
          <div className="product-price">
            <div className="price-container">
              <span className="current-price">{product.price.toLocaleString('ru-RU')}₽</span>
              {product.oldPrice && (
                <span className="old-price">{product.oldPrice.toLocaleString('ru-RU')}₽</span>
              )}
            </div>
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              <i className="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
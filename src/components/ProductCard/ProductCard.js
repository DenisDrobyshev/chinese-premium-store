import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const WISHLIST_KEY = 'imperial_wishlist_ids';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
      setIsWishlisted(stored.includes(product.id));
    } catch (e) {
      // ignore
    }
  }, [product.id]);

  const persistWishlist = (nextState) => {
    try {
      const stored = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
      const next = nextState
        ? Array.from(new Set([...stored, product.id]))
        : stored.filter((id) => id !== product.id);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    } catch (e) {
      // ignore
    }
  };

  const handleWishlistClick = () => {
    setIsWishlisted((prev) => {
      const next = !prev;
      persistWishlist(next);
      return next;
    });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 'M', 1);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
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
            aria-pressed={isWishlisted}
            aria-label={isWishlisted ? 'Убрать из избранного' : 'Добавить в избранное'}
          >
            <i className="fas fa-heart"></i>
          </button>
          <button className="quick-view-btn" onClick={handleQuickView} aria-label="Быстрый просмотр">
            Быстрый просмотр
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
              aria-label="Добавить в корзину"
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
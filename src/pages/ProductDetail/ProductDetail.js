import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import './ProductDetail.css';

const RECENTS_KEY = 'imperial_recent_ids';
export const getRecentlyViewed = () => {
  try {
    return JSON.parse(localStorage.getItem(RECENTS_KEY) || '[]');
  } catch (e) {
    return [];
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const product = products.find(p => p.id === parseInt(id));

  const categoryId = useMemo(() => {
    return categories.find(cat => cat.name === (product?.category || ''))?.id || 'all';
  }, [product]);

  const relatedByCategory = useMemo(() => {
    if (!product) return [];
    return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 8);
  }, [product]);

  const recentlyViewedProducts = useMemo(() => {
    const recentIds = getRecentlyViewed().filter(pid => pid !== product?.id);
    const recent = recentIds
      .map(pid => products.find(p => p.id === pid))
      .filter(Boolean)
      .slice(0, 8);
    return recent;
  }, [product]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (product) {
      try {
        const stored = JSON.parse(localStorage.getItem(RECENTS_KEY) || '[]');
        const next = [product.id, ...stored.filter((pid) => pid !== product.id)].slice(0, 8);
        localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
      } catch (e) {
        // ignore
      }
    }
  }, [product]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Товар не найден</h2>
        <p>Извините, запрашиваемый товар не существует.</p>
        <Link to="/catalog" className="back-to-catalog">Вернуться в каталог</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер');
      return;
    }
    
    addToCart(product, selectedSize, quantity);
    alert('Товар добавлен в корзину!');
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const productImages = [
    product.image,
    
  ];

  return (
    <div className="product-detail">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Главная</Link>
          <span>/</span>
          <Link to="/catalog">Каталог</Link>
          <span>/</span>
          <Link to={`/catalog?category=${categoryId}`}>{product.category}</Link>
          <span>/</span>
          <span>{product.title}</span>
        </nav>
        
        <div className="product-detail-content">
          <div className="product-gallery">
            <div className="main-image">
              <img src={productImages[activeImage]} alt={product.title} />
            </div>
            <div className="image-thumbnails">
              {productImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`${product.title} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="product-info">
            <div className="product-header">
              <span className="product-category">{product.category}</span>
              <h1>{product.title}</h1>
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <span className="rating-count">(12 отзывов)</span>
              </div>
            </div>
            
            <div className="product-pricing">
              <div className="price-container">
                <span className="current-price">{product.price.toLocaleString('ru-RU')}₽</span>
                {product.oldPrice && (
                  <span className="old-price">{product.oldPrice.toLocaleString('ru-RU')}₽</span>
                )}
              </div>
              {product.badge && (
                <span className={`product-badge ${product.badge.toLowerCase()}`}>{product.badge}</span>
              )}
            </div>
            
            <div className="product-description">
              <p>{product.description}</p>
            </div>
            
            <div className="product-options">
              <div className="option-group">
                <label>Цвет:</label>
                <div className="color-options">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? 'active' : ''}`}
                      style={{ 
                        backgroundColor: color === "Красный" ? "#e74c3c" : 
                                       color === "Черный" ? "#2c3e50" : 
                                       color === "Золотой" ? "#d4af37" : 
                                       color === "Белый" ? "#ecf0f1" : 
                                       color === "Розовый" ? "#ff9ff3" : 
                                       color === "Кремовый" ? "#f7d794" : 
                                       color === "Синий" ? "#3498db" : 
                                       color === "Серый" ? "#7f8c8d" : 
                                       color === "Бежевый" ? "#dcdde1" : "#95a5a6"
                      }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={color}
                    ></button>
                  ))}
                </div>
              </div>
              
              <div className="option-group">
                <label>Размер:</label>
                <div className="size-options">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button type="button" className="size-guide" onClick={() => alert('Таблица размеров скоро будет доступна')}>Таблица размеров</button>
              </div>
              
              <div className="option-group">
                <label>Количество:</label>
                <div className="quantity-selector">
                  <button onClick={decreaseQuantity}>-</button>
                  <span>{quantity}</span>
                  <button onClick={increaseQuantity}>+</button>
                </div>
              </div>
            </div>
            
            <div className="product-actions">
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                <i className="fas fa-shopping-cart"></i>
                Добавить в корзину
              </button>
              <button className="wishlist-btn">
                <i className="fas fa-heart"></i>
              </button>
            </div>
            
            <div className="product-details">
              <h3>Детали</h3>
              <ul>
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {(relatedByCategory.length > 0) && (
          <div className="related-section">
            <div className="related-header">
              <h2>Ещё в категории: {product.category}</h2>
            </div>
            <div className="products-grid">
              {relatedByCategory.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

        {(recentlyViewedProducts.length > 0) && (
          <div className="recent-section">
            <div className="related-header">
              <h2>Вы недавно смотрели</h2>
            </div>
            <div className="products-grid">
              {recentlyViewedProducts.map(rv => (
                <ProductCard key={rv.id} product={rv} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
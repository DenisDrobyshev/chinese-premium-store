import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { products } from '../../data/products';
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
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1584889c5c9d-5fe0fbd9bd77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <div className="product-detail">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Главная</Link>
          <span>/</span>
          <Link to="/catalog">Каталог</Link>
          <span>/</span>
          <Link to={`/catalog?category=${product.category.toLowerCase()}`}>{product.category}</Link>
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
                <a href="#" className="size-guide">Таблица размеров</a>
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
      </div>
    </div>
  );
};

export default ProductDetail;
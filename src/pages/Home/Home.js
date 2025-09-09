import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/products';
import './Home.css';

const RECENTS_KEY = 'imperial_recent_ids';

const Home = () => {
  const featuredProducts = products.slice(0, 4);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    try {
      const ids = JSON.parse(localStorage.getItem(RECENTS_KEY) || '[]');
      const mapped = ids
        .map((pid) => products.find(p => p.id === pid))
        .filter(Boolean)
        .slice(0, 8);
      setRecent(mapped);
    } catch (e) {
      setRecent([]);
    }
  }, []);
  
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Искусство китайской роскоши</h1>
          <p>Откройте для себя коллекцию премиальной одежды, созданной с многовековыми традициями китайского мастерства</p>
          <Link to="/catalog" className="cta-button">Смотреть коллекцию</Link>
        </div>
        <div className="hero-image">
          <img src="https://avatars.mds.yandex.net/i?id=49f1a879b8da412f84246c2405057092_l-11039778-images-thumbs&n=13" alt="Китайская премиальная одежда" />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Почему выбирают Imperial Silk</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🎨</div>
              <h3>Уникальный дизайн</h3>
              <p>Эксклюзивные узоры и вышивка, вдохновленные традиционным китайским искусством</p>
            </div>
            <div className="feature">
              <div className="feature-icon">👑</div>
              <h3>Премиальные материалы</h3>
              <p>Только натуральный шелк высочайшего качества и ручная работа</p>
            </div>
            <div className="feature">
              <div className="feature-icon">✈️</div>
              <h3>Быстрая доставка</h3>
              <p>Доставляем заказы по всему миру в кратчайшие сроки</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <h2>Популярные товары</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="view-all-container">
            <Link to="/catalog" className="view-all-btn">Смотреть все товары</Link>
          </div>
        </div>
      </section>
      
      {/* Recently Viewed */}
      {recent.length > 0 && (
        <section className="featured-products">
          <div className="container">
            <h2>Недавно просматривали</h2>
            <div className="products-grid">
              {recent.map(product => (
                <ProductCard key={`recent-${product.id}`} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Наша история</h2>
              <p>Imperial Silk продолжает вековые традиции китайского шелкового производства, объединяя ancient techniques с современным дизайном. Каждое изделие создается с вниманием к деталям и уважением к культурному наследию.</p>
              <Link to="/about" className="learn-more-btn">Узнать больше</Link>
            </div>
            <div className="story-image">
              <img src="https://i.pinimg.com/736x/fd/31/02/fd31027d4d7bee7a7a3e46333b7be10c.jpg" alt="Традиционное китайское производство" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
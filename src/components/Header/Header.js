import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🐉</span>
            Imperial Silk
          </Link>
          
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
          
          <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Главная</Link>
            <Link to="/catalog" onClick={() => setMenuOpen(false)}>Каталог</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>О нас</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Контакты</Link>
          </nav>
          
          <div className="header-actions">
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
            <button className="wishlist-btn">
              <i className="fas fa-heart"></i>
            </button>
            <Link to="/cart" className="cart-btn">
              <i className="fas fa-shopping-cart"></i>
              {getCartItemsCount() > 0 && <span className="cart-count">{getCartItemsCount()}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
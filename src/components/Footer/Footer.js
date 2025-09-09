import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">
              <span className="logo-icon">🐉</span>
              Imperial Silk
            </h3>
            <p>Китайская премиальная одежда с вековыми традициями качества и роскоши.</p>
            <div className="social-links">
              <a href="#" aria-label="WeChat">
                <i className="fab fa-weixin"></i>
              </a>
              <a href="#" aria-label="Weibo">
                <i className="fab fa-weibo"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Магазин</h4>
            <ul>
              <li><Link to="/catalog">Все товары</Link></li>
              <li><Link to="/catalog?category=dresses">Платья</Link></li>
              <li><Link to="/catalog?category=suits">Костюмы</Link></li>
              <li><Link to="/catalog?category=blouses">Блузы</Link></li>
              <li><Link to="/catalog?category=robes">Халаты</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Информация</h4>
            <ul>
              <li><Link to="/about">О нас</Link></li>
              <li><Link to="/contact">Контакты</Link></li>
              <li><Link to="/shipping">Доставка и оплата</Link></li>
              <li><Link to="/returns">Возврат и обмен</Link></li>
              <li><Link to="/privacy">Политика конфиденциальности</Link></li>
              <li><Link to="/terms">Пользовательское соглашение</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Контакты</h4>
            <div className="contact-info">
              <p><i className="fas fa-map-marker-alt"></i> Шанхай, Китай</p>
              <p><i className="fas fa-phone"></i> +86 123 4567 8900</p>
              <p><i className="fas fa-envelope"></i> info@imperialsilk.com</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Imperial Silk. Копирование и распространение запрещено. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
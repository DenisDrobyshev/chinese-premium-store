import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './Wishlist.css';

const WISHLIST_KEY = 'imperial_wishlist_ids';

const Wishlist = () => {
  const { addToCart } = useCart();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
      setIds(stored);
    } catch (e) {
      setIds([]);
    }
  }, []);

  const items = useMemo(() => {
    return ids
      .map((pid) => products.find(p => p.id === pid))
      .filter(Boolean);
  }, [ids]);

  const removeFromWishlist = (id) => {
    const next = ids.filter(pid => pid !== id);
    setIds(next);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
  };

  if (items.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="wishlist-header">
            <h1>Избранное</h1>
          </div>
          <div className="wishlist-empty">
            <div className="empty-icon">❤</div>
            <h2>Список избранного пуст</h2>
            <p>Добавьте товары, нажимая на сердечко на карточке товара</p>
            <Link to="/catalog" className="go-catalog-btn">Перейти в каталог</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>Избранное</h1>
        </div>

        <div className="wishlist-grid">
          {items.map(item => (
            <div key={item.id} className="wishlist-card">
              <ProductCard product={item} />
              <div className="wishlist-actions">
                <button className="remove-btn" onClick={() => removeFromWishlist(item.id)} aria-label="Удалить из избранного">
                  Удалить
                </button>
                <button className="cart-btn" onClick={() => addToCart(item, 'M', 1)} aria-label="Добавить в корзину">
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

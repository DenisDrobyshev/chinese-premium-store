import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [order, setOrder] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    comment: ''
  });

  const handleQuantityChange = (id, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id, size);
    } else {
      updateQuantity(id, size, newQuantity);
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    alert('Заказ оформлен! Мы свяжемся с вами для подтверждения.');
    clearCart();
    setShowCheckout(false);
    setOrder({ name: '', email: '', phone: '', address: '', comment: '' });
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-header">
            <h1>Корзина</h1>
          </div>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Ваша корзина пуста</h2>
            <p>Добавьте товары, чтобы продолжить покупки</p>
            <Link to="/catalog" className="continue-shopping-btn">Продолжить покупки</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Корзина</h1>
          <button onClick={clearCart} className="clear-cart-btn">Очистить корзину</button>
        </div>
        
        <div className="cart-content">
          <div className="cart-items">
            {items.map(item => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-size">Размер: {item.size}</p>
                  <p className="item-price">{item.price.toLocaleString('ru-RU')}₽</p>
                </div>
                <div className="item-quantity">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                  >-</button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                  >+</button>
                </div>
                <div className="item-total">
                  {(item.price * item.quantity).toLocaleString('ru-RU')}₽
                </div>
                <button 
                  className="remove-item-btn"
                  onClick={() => removeFromCart(item.id, item.size)}
                  aria-label="Удалить товар"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Итого</h2>
            <div className="summary-row">
              <span>Товары ({items.reduce((total, item) => total + item.quantity, 0)})</span>
              <span>{getCartTotal().toLocaleString('ru-RU')}₽</span>
            </div>
            <div className="summary-row">
              <span>Доставка</span>
              <span>Бесплатно</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Общая сумма</span>
              <span>{getCartTotal().toLocaleString('ru-RU')}₽</span>
            </div>
            <button className="checkout-btn" onClick={() => setShowCheckout(prev => !prev)}>
              {showCheckout ? 'Скрыть оформление' : 'Перейти к оформлению'}
            </button>
            <Link to="/catalog" className="continue-shopping-link">Продолжить покупки</Link>

            {showCheckout && (
              <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
                <h3>Оформление заказа</h3>
                <div className="form-grid">
                  <label>
                    Имя
                    <input type="text" value={order.name} onChange={(e) => setOrder({ ...order, name: e.target.value })} required />
                  </label>
                  <label>
                    Email
                    <input type="email" value={order.email} onChange={(e) => setOrder({ ...order, email: e.target.value })} required />
                  </label>
                  <label>
                    Телефон
                    <input type="tel" value={order.phone} onChange={(e) => setOrder({ ...order, phone: e.target.value })} required />
                  </label>
                  <label className="full">
                    Адрес доставки
                    <input type="text" value={order.address} onChange={(e) => setOrder({ ...order, address: e.target.value })} required />
                  </label>
                  <label className="full">
                    Комментарий
                    <textarea rows="3" value={order.comment} onChange={(e) => setOrder({ ...order, comment: e.target.value })}></textarea>
                  </label>
                </div>
                <button type="submit" className="submit-order-btn">Подтвердить заказ</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
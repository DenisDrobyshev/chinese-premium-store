import React from 'react';
import './Shipping.css';

const Shipping = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <h1>Доставка и оплата</h1>
        <p>Мы доставляем заказы по всему миру и предлагаем несколько способов оплаты.</p>
        <h2>Способы доставки</h2>
        <ul>
          <li>Экспресс-доставка (3-7 дней)</li>
          <li>Стандартная доставка (7-14 дней)</li>
          <li>Самовывоз из пунктов выдачи (если доступно)</li>
        </ul>
        <h2>Стоимость доставки</h2>
        <p>Стоимость рассчитывается автоматически при оформлении заказа и зависит от адреса доставки и веса посылки.</p>
        <h2>Способы оплаты</h2>
        <ul>
          <li>Банковские карты (Visa/Mastercard/MIR)</li>
          <li>Apple Pay/Google Pay</li>
          <li>PayPal</li>
        </ul>
      </div>
    </div>
  );
};

export default Shipping;

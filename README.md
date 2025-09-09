<div align="center">

# Imperial Silk · Chinese Premium Fashion 🐉

Элегантный интернет‑бутик с вдохновением восточной эстетики: роскошные коллекции, изысканные материалы и современный UX.

<br/>

[Смотреть демо](#-запуск) · [Функции](#-ключевые-функции) · [Стек](#-технологический-стек) · [Установка](#-установка-и-запуск)

</div>

---

## ✨ Ключевые функции

- **Каталог с фильтрами и сортировкой**: категория, цена, размеры, поиск, пагинация
- **Детальная карточка товара**: галерея, цвета, размеры, количество, бейджи, детали
- **Корзина и избранное**: контекст корзины + избранное в LocalStorage
- **Недавно просмотренные**: умное сохранение и показ похожих
- **Отзывчивый интерфейс**: адаптивные сетки, плавные ховеры и анимации
- **Навигация**: хлебные крошки, быстрый просмотр, аккуратные переходы
- **Контентные страницы**: About, Terms, Shipping, Returns, Privacy, Contact, Wishlist

## 🧰 Технологический стек

- **React** + React Router
- **Context API** для корзины
- **CSS** (адаптивная сетка, анимации)
- **LocalStorage**: wishlist и recently viewed
- **Create React App** как базовая сборка

## 📁 Структура проекта

```text
chinese-premium-fashion/
  public/
  src/
    components/
    context/
    data/
    pages/
    App.js
    index.js
    index.css
```

- **components/**: UI‑компоненты (`Header`, `Footer`, `ProductCard`, `CategoryFilter`, `LoadingSpinner`)
- **pages/**: страницы (каталог, карточка товара, статические страницы)
- **context/**: `CartContext` — корзина и операции
- **data/**: мок‑данные `products.js`, `categories.js`

## 🖋 Типографика

- Заголовки: `Noto Serif SC`
- Текст: `Open Sans`
- Шрифты подключены в `public/index.html` (Google Fonts) и применяются в CSS

## 🧪 Скрипты

```bash
npm install      # установка зависимостей
npm start        # запуск dev-сервера http://localhost:3000
npm run build    # продакшн-сборка в /build
```

## 🚀 Установка и запуск

```bash
git clone <repo-url>
cd chinese-premium-fashion
npm install
npm start
```


## 🧭 Навигация по коду

- Каталог: `src/pages/Catalog/Catalog.js`
- Карточка товара: `src/pages/ProductDetail/ProductDetail.js`
- Карточки товаров: `src/components/ProductCard/ProductCard.js`
- Корзина (контекст): `src/context/CartContext.js`
- Данные: `src/data/products.js`, `src/data/categories.js`


## ✅ Качество и UX

- Лоадер на начальной загрузке
- Плавные hover‑эффекты и микровзаимодействия
- Семантика и удобная навигация
- Отзывчивая сетка для десктопа и мобильных


## 📦 Деплой

Готовая сборка лежит в каталоге `build/` после `npm run build`. Размещайте на любом статикахостинге (Netlify, Vercel, GitHub Pages, Nginx).


## 🤝 Вклад

PR приветствуются. Старайтесь придерживаться существующего стиля именования и форматирования.


## 📝 Лицензия

MIT — используйте свободно, с указанием авторства.

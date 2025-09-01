import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import CategoryFilter from '../../components/CategoryFilter';
import LoadingSpinner from '../../components/LoadingSpinner';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import './Catalog.css';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const categoryFromParams = searchParams.get('category');
    if (categoryFromParams) {
      setActiveCategory(categoryFromParams);
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      const categoryName = categories.find(cat => cat.id === activeCategory)?.name;
      const filtered = products.filter(product => product.category === categoryName);
      setFilteredProducts(filtered);
    }
  }, [activeCategory]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="catalog-page">
      <div className="container">
        <div className="catalog-header">
          <h1>Каталог товаров</h1>
          <p>Откройте для себя нашу эксклюзивную коллекцию китайской премиальной одежды</p>
        </div>
        
        <div className="catalog-content">
          <aside className="catalog-sidebar">
            <CategoryFilter 
              activeCategory={activeCategory} 
              onCategoryChange={handleCategoryChange} 
            />
            
            <div className="sidebar-widget">
              <h3>Фильтры</h3>
              <div className="filter-group">
                <h4>Цена</h4>
                <div className="price-range">
                  <input type="range" min="0" max="50000" step="1000" />
                  <div className="price-values">
                    <span>0₽</span>
                    <span>50 000₽</span>
                  </div>
                </div>
              </div>
              
              <div className="filter-group">
                <h4>Размер</h4>
                <div className="size-filters">
                  {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                    <button key={size} className="size-filter-btn">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          
          <main className="catalog-main">
            <div className="catalog-controls">
              <div className="results-count">
                Найдено товаров: {filteredProducts.length}
              </div>
              <div className="sort-controls">
                <label htmlFor="sort">Сортировка:</label>
                <select id="sort">
                  <option value="popular">По популярности</option>
                  <option value="price-asc">По возрастанию цены</option>
                  <option value="price-desc">По убыванию цены</option>
                  <option value="newest">Сначала новые</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <h3>Товары не найдены</h3>
                <p>Попробуйте изменить параметры фильтрации</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
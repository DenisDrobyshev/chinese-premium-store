import React from 'react';
import { categories } from '../../data/categories';
import './CategoryFilter.css';

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <h3>Категории</h3>
      <div className="category-list">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
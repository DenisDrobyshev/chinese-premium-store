import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import CategoryFilter from '../../components/CategoryFilter';
import LoadingSpinner from '../../components/LoadingSpinner';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import './Catalog.css';

const PAGE_SIZE = 8;

const Catalog = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [activeCategory, setActiveCategory] = useState('all');
	const [isLoading, setIsLoading] = useState(true);
	const [sortBy, setSortBy] = useState('popular');
	const [searchText, setSearchText] = useState('');
	const [priceMin, setPriceMin] = useState(0);
	const [priceMax, setPriceMax] = useState(50000);
	const [selectedSizes, setSelectedSizes] = useState([]);
	const [filtersOpen, setFiltersOpen] = useState(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 800);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const categoryFromParams = searchParams.get('category');
		const qFromParams = searchParams.get('q');
		const sortFromParams = searchParams.get('sort');
		const minFromParams = searchParams.get('min');
		const maxFromParams = searchParams.get('max');
		const sizesFromParams = searchParams.get('sizes');
		const pageFromParams = Number(searchParams.get('page') || '1');
		if (categoryFromParams) {
			setActiveCategory(categoryFromParams);
		}
		if (qFromParams !== null) {
			setSearchText(qFromParams);
		}
		if (sortFromParams) {
			setSortBy(sortFromParams);
		}
		if (minFromParams) {
			setPriceMin(Number(minFromParams));
		}
		if (maxFromParams) {
			setPriceMax(Number(maxFromParams));
		}
		if (sizesFromParams) {
			setSelectedSizes(sizesFromParams.split(','));
		}
		if (!Number.isNaN(pageFromParams) && pageFromParams > 0) {
			setPage(pageFromParams);
		}
	}, [searchParams]);

	const filteredAndSortedProducts = useMemo(() => {
		let list = products;
		if (activeCategory !== 'all') {
			const categoryName = categories.find(cat => cat.id === activeCategory)?.name;
			list = list.filter(product => product.category === categoryName);
		}
		if (searchText.trim().length > 0) {
			const q = searchText.trim().toLowerCase();
			list = list.filter(p => (
				p.title.toLowerCase().includes(q) ||
				p.category.toLowerCase().includes(q) ||
				(p.description || '').toLowerCase().includes(q)
			));
		}
		list = list.filter(p => p.price >= priceMin && p.price <= priceMax);
		if (selectedSizes.length > 0) {
			list = list.filter(p => p.sizes?.some(sz => selectedSizes.includes(sz)));
		}
		if (sortBy === 'price-asc') {
			list = [...list].sort((a, b) => a.price - b.price);
		} else if (sortBy === 'price-desc') {
			list = [...list].sort((a, b) => b.price - a.price);
		} else if (sortBy === 'newest') {
			list = [...list].sort((a, b) => (b.id || 0) - (a.id || 0));
		}
		return list;
	}, [activeCategory, searchText, sortBy, priceMin, priceMax, selectedSizes]);

	const totalPages = Math.max(1, Math.ceil(filteredAndSortedProducts.length / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages);
	const paginatedProducts = useMemo(() => {
		const start = (currentPage - 1) * PAGE_SIZE;
		return filteredAndSortedProducts.slice(start, start + PAGE_SIZE);
	}, [filteredAndSortedProducts, currentPage]);

	const updateParams = (next) => {
		setSearchParams(next);
	};

	const handleCategoryChange = (categoryId) => {
		setActiveCategory(categoryId);
		const next = Object.fromEntries(searchParams.entries());
		if (categoryId === 'all') delete next.category; else next.category = categoryId;
		next.page = '1';
		updateParams(next);
	};

	const handleSortChange = (e) => {
		const value = e.target.value;
		setSortBy(value);
		const next = Object.fromEntries(searchParams.entries());
		next.sort = value;
		next.page = '1';
		updateParams(next);
	};

	const handleSearchInput = (e) => {
		const value = e.target.value;
		setSearchText(value);
		const next = Object.fromEntries(searchParams.entries());
		if (value.trim().length === 0) delete next.q; else next.q = value;
		next.page = '1';
		updateParams(next);
	};

	const handlePriceChange = (e) => {
		const value = Number(e.target.value);
		setPriceMax(value);
		const next = Object.fromEntries(searchParams.entries());
		next.max = String(value);
		if (!next.min) next.min = String(priceMin);
		next.page = '1';
		updateParams(next);
	};

	const toggleSize = (size) => {
		setSelectedSizes(prev => {
			const exists = prev.includes(size);
			const updated = exists ? prev.filter(s => s !== size) : [...prev, size];
			const next = Object.fromEntries(searchParams.entries());
			if (updated.length === 0) delete next.sizes; else next.sizes = updated.join(',');
			next.page = '1';
			updateParams(next);
			return updated;
		});
	};

	const goToPage = (newPage) => {
		const safe = Math.min(Math.max(1, newPage), totalPages);
		setPage(safe);
		const next = Object.fromEntries(searchParams.entries());
		next.page = String(safe);
		updateParams(next);
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
				<div className="filters-toggle">
					<button onClick={() => setFiltersOpen(prev => !prev)} aria-expanded={filtersOpen} aria-controls="filters-sidebar">
						<i className="fas fa-sliders-h"></i> Фильтры
					</button>
				</div>
				<div className="catalog-content">
					<aside id="filters-sidebar" className={`catalog-sidebar ${filtersOpen ? 'open' : ''}`}>
						<CategoryFilter 
							activeCategory={activeCategory} 
							onCategoryChange={(id) => { handleCategoryChange(id); setFiltersOpen(false); }} 
						/>
						<div className="sidebar-widget">
							<h3>Поиск</h3>
							<input 
								type="search" 
								placeholder="Найдите товар..." 
								value={searchText}
								onChange={handleSearchInput}
							/>
						</div>
						<div className="sidebar-widget">
							<h3>Фильтры</h3>
							<div className="filter-group">
								<h4>Цена</h4>
								<div className="price-range">
									<input type="range" min="0" max="50000" step="1000" value={priceMax} onChange={handlePriceChange} />
									<div className="price-values">
										<span>{priceMin.toLocaleString('ru-RU')}₽</span>
										<span>{priceMax.toLocaleString('ru-RU')}₽</span>
									</div>
								</div>
							</div>
							<div className="filter-group">
								<h4>Размер</h4>
								<div className="size-filters">
									{['XS', 'S', 'M', 'L', 'XL'].map(size => (
										<button key={size} className={`size-filter-btn ${selectedSizes.includes(size) ? 'active' : ''}`} onClick={() => toggleSize(size)}>
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
								Найдено товаров: {filteredAndSortedProducts.length}
							</div>
							<div className="sort-controls">
								<label htmlFor="sort">Сортировка:</label>
								<select id="sort" value={sortBy} onChange={handleSortChange}>
									<option value="popular">По популярности</option>
									<option value="price-asc">По возрастанию цены</option>
									<option value="price-desc">По убыванию цены</option>
									<option value="newest">Сначала новые</option>
								</select>
							</div>
						</div>
						{paginatedProducts.length > 0 ? (
							<>
								<div className="products-grid">
									{paginatedProducts.map(product => (
										<ProductCard key={product.id} product={product} />
									))}
								</div>
								<div className="pagination">
									<button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} aria-label="Предыдущая страница">‹</button>
									{Array.from({ length: totalPages }).map((_, i) => (
										<button key={i} className={currentPage === i + 1 ? 'active' : ''} onClick={() => goToPage(i + 1)}>{i + 1}</button>
									))}
									<button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Следующая страница">›</button>
								</div>
							</>
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
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import './Header.css';

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(true);
	const [searchText, setSearchText] = useState('');
	const [highlightIndex, setHighlightIndex] = useState(-1);
	const [scrolled, setScrolled] = useState(false);
	const { getCartItemsCount } = useCart();
	const navigate = useNavigate();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 4);
		onScroll();
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const toggleSearch = () => {
		setSearchOpen(prev => !prev);
	};

	const suggestions = useMemo(() => {
		const q = searchText.trim().toLowerCase();
		if (!q) return [];
		return products
			.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
			.slice(0, 6);
	}, [searchText]);

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		const query = searchText.trim();
		if (highlightIndex >= 0 && suggestions[highlightIndex]) {
			navigate(`/product/${suggestions[highlightIndex].id}`);
		} else if (query.length > 0) {
			navigate(`/catalog?q=${encodeURIComponent(query)}`);
		} else {
			navigate('/catalog');
		}
		setMenuOpen(false);
		setHighlightIndex(-1);
	};

	const onKeyDown = (e) => {
		if (!suggestions.length) return;
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setHighlightIndex((prev) => (prev + 1) % suggestions.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setHighlightIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
		} else if (e.key === 'Enter') {
			// handled by submit
		} else if (e.key === 'Escape') {
			setHighlightIndex(-1);
		}
	};

	return (
		<header className={`header ${scrolled ? 'scrolled' : ''}`}>
			<div className="container">
				<div className="header-content">
					<Link to="/" className="logo">
						<span className="logo-icon">🐉</span>
						Imperial Silk
					</Link>
					
					<button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Открыть меню">
						<i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
					</button>
					
					<nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
						<Link to="/" onClick={() => setMenuOpen(false)}>Главная</Link>
						<Link to="/catalog" onClick={() => setMenuOpen(false)}>Каталог</Link>
						<Link to="/about" onClick={() => setMenuOpen(false)}>О нас</Link>
						<Link to="/contact" onClick={() => setMenuOpen(false)}>Контакты</Link>
					</nav>
					
					<div className="header-actions">
						<form className={`search-form ${searchOpen ? 'open' : ''}`} onSubmit={handleSearchSubmit} role="search">
							<input
								type="search"
								placeholder="Поиск по каталогу..."
								value={searchText}
								onChange={(e) => { setSearchText(e.target.value); setHighlightIndex(-1); }}
								onKeyDown={onKeyDown}
								aria-label="Поиск"
							/>
							<button type="submit" className="search-submit" aria-label="Найти">
								<i className="fas fa-search"></i>
							</button>
							{searchOpen && suggestions.length > 0 && (
								<ul className="search-suggestions" role="listbox">
									{suggestions.map((s, i) => (
										<li
											key={s.id}
											className={i === highlightIndex ? 'active' : ''}
											onMouseDown={(e) => { e.preventDefault(); navigate(`/product/${s.id}`); }}
										>
											<i className="fas fa-search"></i>
											<span>{s.title}</span>
										</li>
									))}
								</ul>
							)}
						</form>
						<button className="search-btn" onClick={toggleSearch} aria-label="Показать поиск">
							<i className="fas fa-search"></i>
						</button>
						<Link to="/wishlist" className="wishlist-btn" aria-label="Избранное">
							<i className="fas fa-heart"></i>
						</Link>
						<Link to="/cart" className="cart-btn" aria-label="Корзина">
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
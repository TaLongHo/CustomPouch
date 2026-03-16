import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Header.module.css';

const Header = () => {
  const { state } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    { name: 'Túi vải dây rút', slug: 'tui-vai-day-rut', icon: '👜' },
    { name: 'Balo dây rút', slug: 'balo-day-rut', icon: '🎒' },
    { name: 'Túi vải không dệt', slug: 'tui-vai-khong-det', icon: '♻️' },
    { name: 'Túi vải Tết', slug: 'tui-tet', icon: '🧧' },
    { name: 'Túi vải Noel', slug: 'tui-noel', icon: '🎄' },
  ];

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.categoryDropdown')) {
        setShowCategoryDropdown(false);
      }
      if (!event.target.closest('.userSection')) {
        setShowUserDropdown(false);
      }
      if (!event.target.closest('.searchContainer')) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo Custom Pouch S.M.P */}
        <Link to="/" className={styles.logo}>
          <img src="/logo-custom-pouch.png" alt="Custom Pouch S.M.P" className={styles.logoImg} />
        </Link>
        
        <nav className={styles.nav}>
          {/* Category Dropdown */}
          <div className={`${styles.categoryDropdown} categoryDropdown`}>
            <button 
              className={styles.categoryBtn}
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
              <span>Danh mục sản phẩm</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="currentColor"
                style={{ 
                  transform: showCategoryDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s'
                }}
              >
                <path d="M8 11L3 6h10l-5 5z"/>
              </svg>
            </button>

            {showCategoryDropdown && (
              <div className={styles.categoryDropdownMenu}>
                {categories.map(cat => (
                  <Link 
                    key={cat.slug} 
                    to={`/category/${cat.slug}`}
                    onClick={() => setShowCategoryDropdown(false)}
                  >
                    <span className={styles.categoryIcon}>{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/" className={location.pathname === '/' ? styles.active : ''}>
            Trang chủ
          </Link>

          <Link to="/products" className={location.pathname === '/products' ? styles.active : ''}>
            Tất cả sản phẩm
          </Link>
          
          <Link to="/custom-design" className={location.pathname === '/custom-design' ? styles.active : ''}>
            🎨 Thiết kế túi
          </Link>
          
          <Link to="/news" className={location.pathname === '/news' ? styles.active : ''}>
            Tin tức
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? styles.active : ''}>
            Giới thiệu
          </Link>
        </nav>

        <div className={styles.rightSection}>
          {/* Search */}
          <div className={`${styles.searchContainer} searchContainer`}>
            {showSearch ? (
              <form onSubmit={handleSearch} className={styles.searchForm}>
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchSubmit}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </button>
              </form>
            ) : (
              <button 
                className={styles.searchIcon}
                onClick={() => setShowSearch(true)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            )}
          </div>

          {/* Giỏ hàng */}
          <Link to="/cart" className={styles.cartIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {cartItemsCount > 0 && <span className={styles.badge}>{cartItemsCount}</span>}
          </Link>

          {/* User section */}
          {user ? (
            <div className={`${styles.userSection} userSection`}>
              <button 
                className={styles.userBtn} 
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <div className={styles.userAvatar}>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <span className={styles.userName}>{user.name}</span>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="currentColor"
                  style={{ 
                    transform: showUserDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s'
                  }}
                >
                  <path d="M8 11L3 6h10l-5 5z"/>
                </svg>
              </button>
              
              {showUserDropdown && (
                <div className={styles.dropdown}>
                  <Link to="/profile" onClick={() => setShowUserDropdown(false)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Tài khoản
                  </Link>
                  <button onClick={handleLogout}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className={styles.loginBtn}>
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
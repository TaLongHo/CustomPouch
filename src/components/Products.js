import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';
import { ProductList } from './Home'; // Import ProductList riêng từ Home.js
import styles from '../styles/Products.module.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const { dispatch } = useCart();
  const { success } = useToast();

  // Load search từ URL params
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearch(urlSearch);
    }
  }, [searchParams]);

  // Data sản phẩm túi vải dây rút custom
  const allProducts = [
    { id: 1, name: 'Túi vải dây rút cỡ nhỏ (15x20cm)', price: 25000, image: '/pouch-product.png', description: 'Thích hợp đựng trang sức, quà tặng nhỏ' },
    { id: 2, name: 'Túi vải dây rút cỡ vừa (20x25cm)', price: 35000, image: '/pouch-product.png', description: 'Đa dụng cho mọi mục đích sử dụng' },
    { id: 3, name: 'Túi vải dây rút cỡ lớn (25x30cm)', price: 45000, image: '/pouch-product.png', description: 'Dung tích lớn, phù hợp đựng quần áo' },
    { id: 4, name: 'Túi vải dây rút custom theo yêu cầu', price: 50000, image: '/pouch-product.png', description: 'Thiết kế hoàn toàn theo ý bạn' },
    { id: 5, name: 'Set 5 túi vải đa kích cỡ', price: 150000, image: '/pouch-product.png', description: 'Combo tiết kiệm với nhiều kích cỡ' },
    { id: 6, name: 'Túi vải in logo doanh nghiệp', price: 60000, image: '/pouch-product.png', description: 'In logo, slogan theo yêu cầu (từ 50 cái)' },
  ];

  // Lọc theo search
  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    success('Đã thêm vào giỏ hàng!');
  };

  return (
    <div className={styles.products}>
      <h1>Túi Vải Dây Rút Custom</h1>
      <p className={styles.subtitle}>Khám phá bộ sưu tập túi vải dây rút độc đáo, có thể tùy chỉnh theo ý bạn</p>
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />
      <ProductList products={filteredProducts} limit={allProducts.length} onAddToCart={handleAddToCart} />
      
      <section className={styles.customSection}>
        <h2>Dịch vụ Custom theo yêu cầu</h2>
        <div className={styles.customInfo}>
          <p>✨ Tùy chỉnh họa tiết, màu sắc vải</p>
          <p>🎨 In logo, tên, hoặc thiết kế riêng</p>
          <p>📏 Chọn kích thước theo nhu cầu</p>
          <p>💼 Phù hợp cho quà tặng, sự kiện, doanh nghiệp</p>
        </div>
      </section>
    </div>
  );
};

export default Products;
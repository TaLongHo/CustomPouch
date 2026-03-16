import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';
import { ProductList } from './Home';
import styles from '../styles/CategoryPage.module.css';

const CategoryPage = () => {
  const { category } = useParams();
  const { dispatch } = useCart();
  const { success } = useToast();

  const categoryData = {
    'tui-vai-day-rut': {
      title: 'Túi Vải Dây Rút',
      description: 'Bộ sưu tập túi vải dây rút cao cấp, thiết kế đa dạng, phù hợp mọi nhu cầu',
      products: [
        { id: 1, name: 'Túi vải dây rút cỡ nhỏ (15x20cm)', price: 25000, image: '/pouch-product.png' },
        { id: 2, name: 'Túi vải dây rút cỡ vừa (20x25cm)', price: 35000, image: '/pouch-product.png' },
        { id: 3, name: 'Túi vải dây rút cỡ lớn (25x30cm)', price: 45000, image: '/pouch-product.png' },
        { id: 4, name: 'Túi vải dây rút custom theo yêu cầu', price: 50000, image: '/pouch-product.png' },
      ]
    },
    'balo-day-rut': {
      title: 'Balo Dây Rút',
      description: 'Balo dây rút tiện lợi, nhẹ nhàng, hoàn hảo cho đi học, đi chơi, tập gym',
      products: [
        { id: 11, name: 'Balo dây rút basic', price: 45000, image: '/pouch-product.png' },
        { id: 12, name: 'Balo dây rút có túi phụ', price: 55000, image: '/pouch-product.png' },
        { id: 13, name: 'Balo dây rút chống nước', price: 65000, image: '/pouch-product.png' },
        { id: 14, name: 'Balo dây rút custom họa tiết', price: 70000, image: '/pouch-product.png' },
      ]
    },
    'tui-vai-khong-det': {
      title: 'Túi Vải Không Dệt',
      description: 'Túi vải không dệt thân thiện môi trường, bền đẹp, giá cả hợp lý',
      products: [
        { id: 21, name: 'Túi vải không dệt cỡ nhỏ', price: 15000, image: '/pouch-product.png' },
        { id: 22, name: 'Túi vải không dệt cỡ vừa', price: 20000, image: '/pouch-product.png' },
        { id: 23, name: 'Túi vải không dệt cỡ lớn', price: 25000, image: '/pouch-product.png' },
        { id: 24, name: 'Túi vải không dệt in logo', price: 30000, image: '/pouch-product.png' },
      ]
    },
    'tui-tet': {
      title: 'Túi Vải Chúc Mừng Năm Mới',
      description: 'Túi vải thiết kế độc đáo cho dịp Tết, mang lại may mắn và tài lộc',
      products: [
        { id: 31, name: 'Túi vải Tết họa tiết mai vàng', price: 40000, image: '/pouch-product.png' },
        { id: 32, name: 'Túi vải Tết họa tiết đào đỏ', price: 40000, image: '/pouch-product.png' },
        { id: 33, name: 'Túi vải Tết họa tiết quất', price: 40000, image: '/pouch-product.png' },
        { id: 34, name: 'Túi vải Tết custom lời chúc', price: 50000, image: '/pouch-product.png' },
      ]
    },
    'tui-noel': {
      title: 'Túi Vải Noel',
      description: 'Túi vải Giáng sinh ấm áp, hoàn hảo cho mùa lễ hội cuối năm',
      products: [
        { id: 41, name: 'Túi vải Noel họa tiết ông già Noel', price: 35000, image: '/pouch-product.png' },
        { id: 42, name: 'Túi vải Noel họa tiết cây thông', price: 35000, image: '/pouch-product.png' },
        { id: 43, name: 'Túi vải Noel họa tiết tuần lộc', price: 35000, image: '/pouch-product.png' },
        { id: 44, name: 'Túi vải Noel custom tên', price: 45000, image: '/pouch-product.png' },
      ]
    },
  };

  const currentCategory = categoryData[category] || categoryData['tui-vai-day-rut'];

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    success('Đã thêm vào giỏ hàng!');
  };

  return (
    <div className={styles.categoryPage}>
      <div className={styles.categoryHeader}>
        <h1>{currentCategory.title}</h1>
        <p>{currentCategory.description}</p>
      </div>

      <div className={styles.productsContainer}>
        <ProductList 
          products={currentCategory.products} 
          limit={currentCategory.products.length} 
          onAddToCart={handleAddToCart} 
        />
      </div>

      <div className={styles.customInfo}>
        <h2>Dịch vụ Custom theo yêu cầu</h2>
        <p>Chúng tôi nhận thiết kế và in ấn theo yêu cầu với số lượng từ 20 sản phẩm trở lên.</p>
        <p>Thời gian sản xuất: 3-5 ngày làm việc.</p>
      </div>
    </div>
  );
};

export default CategoryPage;

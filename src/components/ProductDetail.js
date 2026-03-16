import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';
import styles from '../styles/ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const { success } = useToast();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  // Data sản phẩm - trong thực tế sẽ fetch từ API
  const allProducts = [
    { 
      id: 1, 
      name: 'Túi vải dây rút cỡ nhỏ (15x20cm)', 
      price: 25000, 
      image: '/pouch-product.png',
      images: ['/pouch-product.png', '/pouch-product.png', '/pouch-product.png'],
      description: 'Túi vải dây rút cỡ nhỏ, hoàn hảo cho việc đựng trang sức, mỹ phẩm, hoặc quà tặng nhỏ xinh.',
      features: [
        'Chất liệu: Vải cotton 100%',
        'Kích thước: 15x20cm',
        'Dây rút chắc chắn, bền đẹp',
        'Có thể giặt máy',
        'Thân thiện với môi trường'
      ],
      sizes: ['15x20cm'],
      category: 'Túi vải dây rút',
      stock: 100,
      rating: 4.8,
      reviews: 24
    },
    { 
      id: 2, 
      name: 'Túi vải dây rút cỡ vừa (20x25cm)', 
      price: 35000, 
      image: '/pouch-product.png',
      images: ['/pouch-product.png', '/pouch-product.png', '/pouch-product.png'],
      description: 'Túi vải dây rút cỡ vừa, đa năng cho nhiều mục đích sử dụng hàng ngày.',
      features: [
        'Chất liệu: Vải cotton cao cấp',
        'Kích thước: 20x25cm',
        'Thiết kế thời trang',
        'Dễ dàng bảo quản',
        'Màu sắc bền lâu'
      ],
      sizes: ['20x25cm'],
      category: 'Túi vải dây rút',
      stock: 80,
      rating: 4.9,
      reviews: 38
    },
    { 
      id: 3, 
      name: 'Túi vải dây rút cỡ lớn (25x30cm)', 
      price: 45000, 
      image: '/pouch-product.png',
      images: ['/pouch-product.png', '/pouch-product.png', '/pouch-product.png'],
      description: 'Túi vải dây rút cỡ lớn với dung tích rộng rãi, thích hợp đựng quần áo, đồ dùng cá nhân khi du lịch.',
      features: [
        'Chất liệu: Vải canvas dày dặn',
        'Kích thước: 25x30cm',
        'Dung tích lớn',
        'Dây rút siêu bền',
        'Phù hợp du lịch, gym'
      ],
      sizes: ['25x30cm'],
      category: 'Túi vải dây rút',
      stock: 60,
      rating: 4.7,
      reviews: 19
    },
    { 
      id: 4, 
      name: 'Túi vải dây rút custom theo yêu cầu', 
      price: 50000, 
      image: '/pouch-product.png',
      images: ['/pouch-product.png', '/logo-custom-pouch.png', '/pouch-product.png'],
      description: 'Túi vải dây rút thiết kế hoàn toàn theo ý bạn - in logo, họa tiết, màu sắc tùy chỉnh.',
      features: [
        'Tùy chỉnh 100% theo yêu cầu',
        'In logo, họa tiết, tên',
        'Chọn màu sắc vải',
        'Chọn kích thước',
        'Số lượng tối thiểu: 20 cái'
      ],
      sizes: ['Custom'],
      category: 'Túi vải dây rút',
      stock: 999,
      rating: 5.0,
      reviews: 56
    },
  ];

  const product = allProducts.find(p => p.id === parseInt(id)) || allProducts[0];

  const handleAddToCart = () => {
    if (product.sizes.length > 1 && !selectedSize) {
      success('Vui lòng chọn kích thước!', 'warning');
      return;
    }
    
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { ...product, quantity, selectedSize: selectedSize || product.sizes[0] } 
    });
    success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => navigate('/cart'), 300);
  };

  return (
    <div className={styles.productDetail}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <Link to="/products">Sản phẩm</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className={styles.container}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <img src={product.images[selectedImage]} alt={product.name} />
          </div>
          <div className={styles.thumbnails}>
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.productInfo}>
          <div className={styles.category}>{product.category}</div>
          <h1>{product.name}</h1>
          
          <div className={styles.rating}>
            <span className={styles.stars}>{'⭐'.repeat(Math.floor(product.rating))}</span>
            <span className={styles.ratingText}>{product.rating} ({product.reviews} đánh giá)</span>
          </div>

          <div className={styles.price}>
            {product.price.toLocaleString()} VNĐ
          </div>

          <div className={styles.description}>
            <p>{product.description}</p>
          </div>

          {/* Features */}
          <div className={styles.features}>
            <h3>Đặc điểm nổi bật:</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Size selector */}
          {product.sizes.length > 1 && (
            <div className={styles.sizeSelector}>
              <h3>Chọn kích thước:</h3>
              <div className={styles.sizes}>
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={selectedSize === size ? styles.active : ''}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className={styles.quantitySelector}>
            <h3>Số lượng:</h3>
            <div className={styles.quantityControl}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <span className={styles.stock}>Còn {product.stock} sản phẩm</span>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.addToCart} onClick={handleAddToCart}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Thêm vào giỏ
            </button>
            <button className={styles.buyNow} onClick={handleBuyNow}>
              Mua ngay
            </button>
          </div>

          {/* Contact for custom */}
          {product.id === 4 && (
            <div className={styles.customNote}>
              <p>💡 Sản phẩm custom cần liên hệ trực tiếp để được tư vấn thiết kế</p>
              <p>📧 Email: mamviet01@gmail.com | 📱 Phone: 0123456789</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className={styles.relatedProducts}>
        <h2>Sản phẩm liên quan</h2>
        <div className={styles.relatedGrid}>
          {allProducts.filter(p => p.id !== product.id).slice(0, 4).map(relatedProduct => (
            <Link to={`/product/${relatedProduct.id}`} key={relatedProduct.id} className={styles.relatedCard}>
              <img src={relatedProduct.image} alt={relatedProduct.name} />
              <h3>{relatedProduct.name}</h3>
              <p>{relatedProduct.price.toLocaleString()} VNĐ</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

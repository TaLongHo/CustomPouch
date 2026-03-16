import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';
import styles from '../styles/Home.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Tách ProductList ra export riêng để tái sử dụng
export const ProductList = ({ products = [], limit = 6, onAddToCart }) => {
  // Luôn gọi useCart ở đầu component (top-level)
  const { dispatch } = useCart();
  const { success } = useToast();

  // Fallback nếu không truyền onAddToCart
  const handleAddToCart = onAddToCart || ((product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    success('Đã thêm vào giỏ hàng!');
  });

  const defaultProducts = [
    { id: 1, name: 'Túi vải dây rút cỡ nhỏ (15x20cm)', price: 25000, image: '/pouch-product.png' },
    { id: 2, name: 'Túi vải dây rút cỡ vừa (20x25cm)', price: 35000, image: '/pouch-product.png' },
    { id: 3, name: 'Túi vải dây rút cỡ lớn (25x30cm)', price: 45000, image: '/pouch-product.png' },
    { id: 4, name: 'Túi vải dây rút custom theo yêu cầu', price: 50000, image: '/pouch-product.png' },
  ];

  const displayProducts = products.length > 0 ? products.slice(0, limit) : defaultProducts.slice(0, limit);

  return (
    <div className={styles.productGrid}>
      {displayProducts.map(product => (
        <div key={product.id} className={styles.productCard}>
          <Link to={`/product/${product.id}`} className={styles.productImageLink}>
            <img 
              src={product.image} 
              alt={product.name} 
              onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=No+Image'; }}
            />
          </Link>
          <Link to={`/product/${product.id}`} className={styles.productNameLink}>
            <h3>{product.name}</h3>
          </Link>
          <p>{product.price.toLocaleString()} VNĐ</p>
          <button onClick={() => handleAddToCart(product)}>Thêm vào giỏ</button>
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const { dispatch } = useCart();
  const { success } = useToast();

  // Inline style cho banner với background từ public
  const bannerStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/pouch-product.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#FFE5E5', // Fallback màu hồng pastel
  };

  const defaultProducts = [
    { id: 1, name: 'Túi vải dây rút cỡ nhỏ (15x20cm)', price: 25000, image: '/pouch-product.png' },
    { id: 2, name: 'Túi vải dây rút cỡ vừa (20x25cm)', price: 35000, image: '/pouch-product.png' },
    { id: 3, name: 'Túi vải dây rút cỡ lớn (25x30cm)', price: 45000, image: '/pouch-product.png' },
    { id: 4, name: 'Túi vải dây rút custom theo yêu cầu', price: 50000, image: '/pouch-product.png' },
    { id: 5, name: 'Balo dây rút thể thao', price: 55000, image: '/pouch-product.png' },
    { id: 6, name: 'Túi vải không dệt', price: 30000, image: '/pouch-product.png' },
  ];

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    success('Đã thêm vào giỏ hàng!');
  };

  // Cấu hình carousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className={styles.home}>
      <div className={styles.banner} style={bannerStyle}>
        {/* Watermark layer */}

        <div className={styles.bannerContent}>
          <h1>TÚI VẢI DÂY RÚT CUSTOM</h1>
          <p>Thiết kế theo ý bạn - Độc đáo và cá tính</p>
        </div>
      </div>
      <section className={styles.productsSection}>
        <h2>Sản phẩm nổi bật</h2>
        <div className={styles.carouselContainer}>
          <Slider {...carouselSettings}>
            {defaultProducts.map(product => (
              <div key={product.id} className={styles.carouselSlide}>
                <div className={styles.productCard}>
                  <Link to={`/product/${product.id}`} className={styles.productImageLink}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=No+Image'; }}
                    />
                  </Link>
                  <Link to={`/product/${product.id}`} className={styles.productNameLink}>
                    <h3>{product.name}</h3>
                  </Link>
                  <p>{product.price.toLocaleString()} VNĐ</p>
                  <button onClick={() => handleAddToCart(product)}>Thêm vào giỏ</button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Custom Design CTA */}
      <section className={styles.customCTA}>
        <div className={styles.ctaContent}>
          <div className={styles.ctaText}>
            <h2>🎨 Thiết Kế Túi Của Riêng Bạn!</h2>
            <p>Tạo túi vải độc đáo với charm yêu thích - Kéo thả và sáng tạo không giới hạn!</p>
            <ul className={styles.ctaFeatures}>
              <li>✨ Chọn loại túi & vải theo sở thích</li>
              <li>📏 Tùy chỉnh kích thước phù hợp</li>
              <li>🦋 Thêm charm xinh xắn lên túi</li>
              <li>🎯 Kéo thả charm đúng vị trí bạn muốn</li>
            </ul>
          </div>
          <div className={styles.ctaAction}>
            <Link to="/custom-design" className={styles.ctaButton}>
              Bắt đầu thiết kế →
            </Link>
            <p className={styles.ctaNote}>💡 Hoàn toàn miễn phí để thử nghiệm!</p>
          </div>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <h2>Tại sao chọn chúng tôi?</h2>
        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>🎨 Thiết kế tự do</h3>
            <p>Tùy chỉnh họa tiết, màu sắc theo ý bạn</p>
          </div>
          <div className={styles.feature}>
            <h3>✨ Chất lượng cao</h3>
            <p>Vải cotton mềm mại, bền đẹp</p>
          </div>
          <div className={styles.feature}>
            <h3>🚚 Giao hàng nhanh</h3>
            <p>Nhận hàng trong 3-5 ngày</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
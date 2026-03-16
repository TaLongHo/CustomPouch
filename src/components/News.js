import React from 'react';
import styles from '../styles/News.module.css';

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: 'Ra mắt bộ sưu tập túi vải Tết 2026',
      date: '15/01/2026',
      image: '/pouch-product.png',
      excerpt: 'Custom Pouch S.M.P tự hào giới thiệu bộ sưu tập túi vải đặc biệt chào mừng Tết Bính Ngọ 2026 với nhiều họa tiết độc đáo...',
      content: 'Bộ sưu tập bao gồm các mẫu túi vải với họa tiết mai, đào, quất và các biểu tượng may mắn. Đặc biệt, khách hàng có thể tùy chỉnh in tên hoặc lời chúc Tết riêng.',
    },
    {
      id: 2,
      title: 'Khuyến mãi 30% cho đơn hàng từ 50 sản phẩm',
      date: '10/01/2026',
      image: '/pouch-product.png',
      excerpt: 'Chương trình ưu đãi dành cho khách hàng doanh nghiệp, sự kiện với đơn hàng số lượng lớn...',
      content: 'Áp dụng cho tất cả các loại túi vải trong hệ thống. Thời gian khuyến mãi từ 10/01 đến 28/02/2026. Liên hệ ngay để được tư vấn!',
    },
    {
      id: 3,
      title: 'Túi vải không dệt - Xu hướng xanh 2026',
      date: '05/01/2026',
      image: '/pouch-product.png',
      excerpt: 'Túi vải không dệt đang trở thành lựa chọn hàng đầu cho các doanh nghiệp quan tâm đến môi trường...',
      content: 'Với ưu điểm bền bỉ, thân thiện môi trường và giá thành hợp lý, túi vải không dệt là giải pháp hoàn hảo thay thế túi ni lông.',
    },
    {
      id: 4,
      title: 'Hướng dẫn bảo quản túi vải để sử dụng lâu dài',
      date: '28/12/2025',
      image: '/pouch-product.png',
      excerpt: 'Những mẹo đơn giản giúp túi vải của bạn luôn đẹp như mới...',
      content: 'Giặt bằng tay với nước lạnh, phơi nơi thoáng mát, tránh ánh nắng trực tiếp. Không sử dụng chất tẩy mạnh để giữ màu sắc lâu hơn.',
    },
  ];

  return (
    <div className={styles.newsPage}>
      <div className={styles.newsHeader}>
        <h1>Tin tức</h1>
        <p>Cập nhật những thông tin mới nhất về sản phẩm và khuyến mãi</p>
      </div>

      <div className={styles.newsGrid}>
        {newsItems.map(item => (
          <article key={item.id} className={styles.newsCard}>
            <div className={styles.newsImage}>
              <img src={item.image} alt={item.title} />
              <span className={styles.newsDate}>{item.date}</span>
            </div>
            <div className={styles.newsContent}>
              <h2>{item.title}</h2>
              <p className={styles.excerpt}>{item.excerpt}</p>
              <button className={styles.readMore}>Xem chi tiết</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default News;

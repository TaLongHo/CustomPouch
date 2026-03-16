import React from 'react';
import styles from '../styles/About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.hero}>
        <img src="/logo-custom-pouch.png" alt="Custom Pouch S.M.P" className={styles.logo} />
        <h1>Custom Pouch S.M.P</h1>
        <p className={styles.tagline}>Túi vải dây rút - Thiết kế theo ý bạn</p>
      </div>
      
      <section className={styles.section}>
        <h2>Về chúng tôi</h2>
        <p>Custom Pouch S.M.P chuyên cung cấp túi vải dây rút cao cấp với dịch vụ custom theo yêu cầu. Chúng tôi tin rằng mỗi chiếc túi đều mang một câu chuyện riêng, và chúng tôi ở đây để giúp bạn kể câu chuyện của mình.</p>
      </section>

      <section className={styles.section}>
        <h2>Sản phẩm của chúng tôi</h2>
        <div className={styles.features}>
          <div className={styles.featureItem}>
            <span className={styles.icon}>🎨</span>
            <h3>Thiết kế tự do</h3>
            <p>Tùy chỉnh họa tiết, màu sắc, và kích thước theo ý bạn</p>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.icon}>✨</span>
            <h3>Chất lượng cao</h3>
            <p>Vải cotton mềm mại, bền đẹp, thân thiện môi trường</p>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.icon}>💼</span>
            <h3>Đa mục đích</h3>
            <p>Phù hợp cho quà tặng, sự kiện, doanh nghiệp</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Quy trình đặt hàng Custom</h2>
        <ol className={styles.process}>
          <li>📧 Liên hệ với chúng tôi và chia sẻ ý tưởng thiết kế</li>
          <li>🎨 Nhận bản thiết kế mẫu và báo giá</li>
          <li>✅ Xác nhận đơn hàng và thanh toán</li>
          <li>🚚 Nhận túi vải trong 3-5 ngày làm việc</li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2>Liên hệ với chúng tôi</h2>
        <p>📧 Email: mamviet01@gmail.com</p>
        <p>📱 Điện thoại: 0123456789</p>
        <p>🕒 Thời gian làm việc: Thứ 2 - Thứ 7 (8:00 - 18:00)</p>
      </section>
    </div>
  );
};

export default About;
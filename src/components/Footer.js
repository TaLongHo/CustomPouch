import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3>Custom Pouch S.M.P</h3>
          <p>Túi vải dây rút - Thiết kế theo ý bạn</p>
        </div>
        <div className={styles.section}>
          <h3>Liên hệ</h3>
          <p>📧 mamviet01@gmail.com</p>
          <p>📱 0123456789</p>
        </div>
        <div className={styles.section}>
          <h3>Theo dõi chúng tôi</h3>
          <p>Facebook | Instagram | Zalo</p>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2026 Custom Pouch S.M.P. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
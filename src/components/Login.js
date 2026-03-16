import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Login.module.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Đăng nhập
      if (!formData.email || !formData.password) {
        setError('Vui lòng nhập đầy đủ thông tin');
        return;
      }
      const result = login(formData.email, formData.password);
      if (result.success) {
        navigate('/');
      }
    } else {
      // Đăng ký
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Vui lòng nhập đầy đủ thông tin');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Mật khẩu không khớp');
        return;
      }
      if (formData.password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 ký tự');
        return;
      }
      const result = register(formData.name, formData.email, formData.password);
      if (result.success) {
        navigate('/');
      }
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h1>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label>Họ và tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
              />
            </div>
          )}
          
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
            />
          </div>
          
          {!isLogin && (
            <div className={styles.formGroup}>
              <label>Xác nhận mật khẩu</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
              />
            </div>
          )}
          
          <button type="submit" className={styles.submitBtn}>
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>
        
        <div className={styles.toggle}>
          {isLogin ? (
            <p>
              Chưa có tài khoản?{' '}
              <span onClick={() => setIsLogin(false)}>Đăng ký ngay</span>
            </p>
          ) : (
            <p>
              Đã có tài khoản?{' '}
              <span onClick={() => setIsLogin(true)}>Đăng nhập</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setMessage('Cập nhật thông tin thành công!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h1>{user?.name}</h1>
          <p className={styles.email}>{user?.email}</p>
        </div>

        {message && <div className={styles.success}>{message}</div>}

        <div className={styles.profileContent}>
          <div className={styles.sectionHeader}>
            <h2>Thông tin cá nhân</h2>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className={styles.editBtn}>
                Chỉnh sửa
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Họ và tên</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Địa chỉ</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ"
                  rows="3"
                />
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.saveBtn}>
                  Lưu thay đổi
                </button>
                <button type="button" onClick={handleCancel} className={styles.cancelBtn}>
                  Hủy
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.infoDisplay}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Họ và tên:</span>
                <span className={styles.value}>{user?.name}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{user?.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Số điện thoại:</span>
                <span className={styles.value}>{user?.phone || 'Chưa cập nhật'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Địa chỉ:</span>
                <span className={styles.value}>{user?.address || 'Chưa cập nhật'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

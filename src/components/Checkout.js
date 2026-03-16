import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';
import styles from '../styles/Checkout.module.css';

const Checkout = () => {
  const { state, dispatch } = useCart();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: '',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState({});

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = total >= 300000 ? 0 : 30000;
  const finalTotal = total + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Vui lòng chọn Tỉnh/Thành phố';
    }

    if (!formData.district.trim()) {
      newErrors.district = 'Vui lòng chọn Quận/Huyện';
    }

    if (!formData.ward.trim()) {
      newErrors.ward = 'Vui lòng chọn Phường/Xã';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      error('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (state.cart.length === 0) {
      error('Giỏ hàng trống!');
      return;
    }

    setLoading(true);

    // Giả lập API call
    setTimeout(() => {
      // Tạo order object
      const order = {
        id: Date.now(),
        customer: formData,
        items: state.cart,
        total: finalTotal,
        shipping: shipping,
        status: 'pending',
        date: new Date().toISOString(),
      };

      console.log('Order created:', order);

      // Clear cart
      dispatch({ type: 'CLEAR_CART' });

      // Show success
      success('Đặt hàng thành công! Chúng tôi sẽ liên hệ bạn sớm.');

      setLoading(false);

      // Redirect to success page or home
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 1500);
  };

  if (state.cart.length === 0) {
    return (
      <div className={styles.emptyCheckout}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2>Giỏ hàng trống</h2>
        <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục đặt hàng</p>
        <button onClick={() => navigate('/products')} className={styles.shopBtn}>
          Mua sắm ngay
        </button>
      </div>
    );
  }

  return (
    <div className={styles.checkout}>
      <h1>Thanh toán</h1>

      <div className={styles.container}>
        {/* Form */}
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit}>
            <div className={styles.section}>
              <h2>Thông tin người nhận</h2>

              <div className={styles.formGroup}>
                <label>Họ và tên <span className={styles.required}>*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className={errors.fullName ? styles.error : ''}
                />
                {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Email <span className={styles.required}>*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className={errors.email ? styles.error : ''}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Số điện thoại <span className={styles.required}>*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0123456789"
                    className={errors.phone ? styles.error : ''}
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>Địa chỉ giao hàng</h2>

              <div className={styles.formGroup}>
                <label>Địa chỉ cụ thể <span className={styles.required}>*</span></label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Số nhà, tên đường..."
                  className={errors.address ? styles.error : ''}
                />
                {errors.address && <span className={styles.errorText}>{errors.address}</span>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Tỉnh/Thành phố <span className={styles.required}>*</span></label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? styles.error : ''}
                  >
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Khác">Khác...</option>
                  </select>
                  {errors.city && <span className={styles.errorText}>{errors.city}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label>Quận/Huyện <span className={styles.required}>*</span></label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Quận/Huyện"
                    className={errors.district ? styles.error : ''}
                  />
                  {errors.district && <span className={styles.errorText}>{errors.district}</span>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Phường/Xã <span className={styles.required}>*</span></label>
                <input
                  type="text"
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                  placeholder="Phường/Xã"
                  className={errors.ward ? styles.error : ''}
                />
                {errors.ward && <span className={styles.errorText}>{errors.ward}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Ghi chú (tùy chọn)</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Ghi chú cho đơn hàng..."
                  rows="3"
                />
              </div>
            </div>

            <div className={styles.section}>
              <h2>Phương thức thanh toán</h2>

              <div className={styles.paymentMethods}>
                <label className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <div className={styles.paymentInfo}>
                    <span className={styles.paymentIcon}>💵</span>
                    <div>
                      <strong>Thanh toán khi nhận hàng (COD)</strong>
                      <p>Thanh toán bằng tiền mặt khi nhận hàng</p>
                    </div>
                  </div>
                </label>

                <label className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === 'bank'}
                    onChange={handleChange}
                  />
                  <div className={styles.paymentInfo}>
                    <span className={styles.paymentIcon}>🏦</span>
                    <div>
                      <strong>Chuyển khoản ngân hàng</strong>
                      <p>Chuyển khoản trước, giao hàng sau</p>
                    </div>
                  </div>
                </label>

                <label className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="momo"
                    checked={formData.paymentMethod === 'momo'}
                    onChange={handleChange}
                  />
                  <div className={styles.paymentInfo}>
                    <span className={styles.paymentIcon}>📱</span>
                    <div>
                      <strong>Ví MoMo</strong>
                      <p>Thanh toán qua ví điện tử MoMo</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className={styles.summarySection}>
          <div className={styles.summary}>
            <h2>Đơn hàng của bạn</h2>

            <div className={styles.summaryItems}>
              {state.cart.map(item => (
                <div key={item.id} className={styles.summaryItem}>
                  <img src={item.image} alt={item.name} />
                  <div className={styles.itemInfo}>
                    <h4>{item.name}</h4>
                    <p>Số lượng: {item.quantity}</p>
                  </div>
                  <div className={styles.itemPrice}>
                    {(item.price * item.quantity).toLocaleString()} đ
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summaryCalculation}>
              <div className={styles.summaryRow}>
                <span>Tạm tính:</span>
                <span>{total.toLocaleString()} đ</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Phí vận chuyển:</span>
                <span className={shipping === 0 ? styles.free : ''}>
                  {shipping === 0 ? 'Miễn phí' : `${shipping.toLocaleString()} đ`}
                </span>
              </div>
              {total < 300000 && (
                <div className={styles.shippingNote}>
                  Mua thêm {(300000 - total).toLocaleString()}đ để được miễn phí ship!
                </div>
              )}
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Tổng cộng:</span>
                <span>{finalTotal.toLocaleString()} đ</span>
              </div>
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className={styles.spinner}></span>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                  Đặt hàng
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

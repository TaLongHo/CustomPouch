import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';
import styles from '../styles/CustomDesign.module.css';

const CustomDesign = () => {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { success } = useToast();

  // Steps
  const [currentStep, setCurrentStep] = useState(1);
  
  // Selections
  const [selectedBag, setSelectedBag] = useState(null);
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [placedCharms, setPlacedCharms] = useState([]);
  const [draggedCharm, setDraggedCharm] = useState(null);

  // Data
  const bagTypes = [
    { id: 1, name: 'Túi dây rút cơ bản', image: '/pouch-product.png', price: 25000 },
    { id: 2, name: 'Túi dây rút cao cấp', image: '/pouch-product.png', price: 35000 },
    { id: 3, name: 'Balo dây rút', image: '/pouch-product.png', price: 45000 },
  ];

  const fabrics = [
    { id: 1, name: 'Vải cotton trắng', color: '#FFFFFF', price: 0 },
    { id: 2, name: 'Vải cotton hồng pastel', color: '#FFE5E5', price: 5000 },
    { id: 3, name: 'Vải canvas be', color: '#F5E6D3', price: 5000 },
    { id: 4, name: 'Vải linen xanh nhạt', color: '#E3F2FD', price: 5000 },
    { id: 5, name: 'Vải cotton vàng', color: '#FFF9C4', price: 5000 },
    { id: 6, name: 'Vải canvas xanh mint', color: '#E0F2F1', price: 5000 },
  ];

  const sizes = [
    { id: 1, name: 'Nhỏ (15x20cm)', dimensions: '15x20', price: 0 },
    { id: 2, name: 'Vừa (20x25cm)', dimensions: '20x25', price: 5000 },
    { id: 3, name: 'Lớn (25x30cm)', dimensions: '25x30', price: 10000 },
  ];

  const charms = [
    { id: 1, name: 'Bướm hồng', image: '/charm-butterfly.png', price: 15000 },
    { id: 2, name: 'Dứa vàng', image: '/charm-pineapple.png', price: 15000 },
    { id: 3, name: 'Dâu đỏ', image: '/charm-strawberry.png', price: 15000 },
    { id: 4, name: 'Táo nâu', image: '/charm-apple.png', price: 15000 },
    { id: 5, name: 'Cherry đỏ', image: '/charm-cherry.png', price: 15000 },
  ];

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    if (selectedBag) total += selectedBag.price;
    if (selectedFabric) total += selectedFabric.price;
    if (selectedSize) total += selectedSize.price;
    placedCharms.forEach(charm => {
      total += charm.price;
    });
    return total;
  };

  // Step navigation
  const nextStep = () => {
    if (currentStep === 1 && !selectedBag) {
      success('Vui lòng chọn loại túi!', 'warning');
      return;
    }
    if (currentStep === 2 && !selectedFabric) {
      success('Vui lòng chọn loại vải!', 'warning');
      return;
    }
    if (currentStep === 3 && !selectedSize) {
      success('Vui lòng chọn kích thước!', 'warning');
      return;
    }
    setCurrentStep(Math.min(4, currentStep + 1));
  };

  const prevStep = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  // Drag and Drop
  const handleDragStart = (e, charm) => {
    setDraggedCharm(charm);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedCharm) return;

    const canvas = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - canvas.left;
    const y = e.clientY - canvas.top;

    const newCharm = {
      ...draggedCharm,
      id: `${draggedCharm.id}-${Date.now()}`,
      x: x - 30, // Center the charm
      y: y - 30,
    };

    setPlacedCharms([...placedCharms, newCharm]);
    setDraggedCharm(null);
  };

  const removeCharm = (charmId) => {
    setPlacedCharms(placedCharms.filter(c => c.id !== charmId));
  };

  // Add to cart
  const handleAddToCart = () => {
    if (!selectedBag || !selectedFabric || !selectedSize) {
      success('Vui lòng hoàn thành tất cả các bước!', 'error');
      return;
    }

    const customProduct = {
      id: Date.now(),
      name: `Túi Custom - ${selectedBag.name}`,
      price: calculateTotal(),
      image: selectedBag.image,
      description: `Vải: ${selectedFabric.name}, Size: ${selectedSize.name}, Charms: ${placedCharms.length}`,
      customDesign: {
        bag: selectedBag,
        fabric: selectedFabric,
        size: selectedSize,
        charms: placedCharms,
      },
    };

    dispatch({ type: 'ADD_TO_CART', payload: customProduct });
    success('Đã thêm túi custom vào giỏ hàng!');
    
    setTimeout(() => {
      navigate('/cart');
    }, 1000);
  };

  return (
    <div className={styles.customDesign}>
      <div className={styles.header}>
        <h1>🎨 Thiết Kế Túi Của Bạn</h1>
        <p>Tạo túi vải độc đáo theo phong cách riêng của bạn</p>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>1</div>
          <span>Chọn túi</span>
        </div>
        <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>2</div>
          <span>Chọn vải</span>
        </div>
        <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>3</div>
          <span>Chọn size</span>
        </div>
        <div className={`${styles.step} ${currentStep >= 4 ? styles.active : ''}`}>
          <div className={styles.stepNumber}>4</div>
          <span>Thêm charm</span>
        </div>
      </div>

      <div className={styles.content}>
        {/* Step 1: Choose Bag */}
        {currentStep === 1 && (
          <div className={styles.stepContent}>
            <h2>Bước 1: Chọn loại túi</h2>
            <div className={styles.options}>
              {bagTypes.map(bag => (
                <div
                  key={bag.id}
                  className={`${styles.option} ${selectedBag?.id === bag.id ? styles.selected : ''}`}
                  onClick={() => setSelectedBag(bag)}
                >
                  <img src={bag.image} alt={bag.name} />
                  <h3>{bag.name}</h3>
                  <p className={styles.price}>{bag.price.toLocaleString()} VNĐ</p>
                  {selectedBag?.id === bag.id && (
                    <div className={styles.checkmark}>✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Choose Fabric */}
        {currentStep === 2 && (
          <div className={styles.stepContent}>
            <h2>Bước 2: Chọn loại vải</h2>
            <div className={styles.options}>
              {fabrics.map(fabric => (
                <div
                  key={fabric.id}
                  className={`${styles.fabricOption} ${selectedFabric?.id === fabric.id ? styles.selected : ''}`}
                  onClick={() => setSelectedFabric(fabric)}
                  style={{ backgroundColor: fabric.color }}
                >
                  <h3>{fabric.name}</h3>
                  <p className={styles.price}>
                    {fabric.price === 0 ? 'Miễn phí' : `+${fabric.price.toLocaleString()} VNĐ`}
                  </p>
                  {selectedFabric?.id === fabric.id && (
                    <div className={styles.checkmark}>✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Choose Size */}
        {currentStep === 3 && (
          <div className={styles.stepContent}>
            <h2>Bước 3: Chọn kích thước</h2>
            <div className={styles.options}>
              {sizes.map(size => (
                <div
                  key={size.id}
                  className={`${styles.sizeOption} ${selectedSize?.id === size.id ? styles.selected : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  <div className={styles.sizeIcon}>{size.dimensions}</div>
                  <h3>{size.name}</h3>
                  <p className={styles.price}>
                    {size.price === 0 ? 'Miễn phí' : `+${size.price.toLocaleString()} VNĐ`}
                  </p>
                  {selectedSize?.id === size.id && (
                    <div className={styles.checkmark}>✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Add Charms */}
        {currentStep === 4 && (
          <div className={styles.stepContent}>
            <h2>Bước 4: Thêm charm lên túi</h2>
            <p className={styles.instruction}>
              🎨 Kéo và thả các charm yêu thích lên túi của bạn! Click vào charm trên túi để xóa.
            </p>

            <div className={styles.designArea}>
              {/* Canvas */}
              <div className={styles.canvasSection}>
                <div
                  className={styles.canvas}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  style={{ backgroundColor: selectedFabric?.color || '#FFF9F9' }}
                >
                  <img src={selectedBag?.image} alt="Bag" className={styles.bagImage} />
                  
                  {placedCharms.map(charm => (
                    <div
                      key={charm.id}
                      className={styles.placedCharm}
                      style={{ left: charm.x, top: charm.y }}
                      onClick={() => removeCharm(charm.id)}
                      title="Click để xóa"
                    >
                      <img src={charm.image} alt={charm.name} />
                    </div>
                  ))}

                  {placedCharms.length === 0 && (
                    <div className={styles.emptyCanvas}>
                      Kéo charm vào đây
                    </div>
                  )}
                </div>

                <div className={styles.canvasInfo}>
                  <p>📦 Túi: {selectedBag?.name}</p>
                  <p>🎨 Vải: {selectedFabric?.name}</p>
                  <p>📏 Size: {selectedSize?.name}</p>
                  <p>✨ Charms: {placedCharms.length}</p>
                </div>
              </div>

              {/* Charms Library */}
              <div className={styles.charmsLibrary}>
                <h3>Chọn Charm</h3>
                <div className={styles.charmsList}>
                  {charms.map(charm => (
                    <div
                      key={charm.id}
                      className={styles.charmItem}
                      draggable
                      onDragStart={(e) => handleDragStart(e, charm)}
                    >
                      <img src={charm.image} alt={charm.name} />
                      <p>{charm.name}</p>
                      <span className={styles.charmPrice}>{charm.price.toLocaleString()}đ</span>
                    </div>
                  ))}
                </div>
                <div className={styles.libraryNote}>
                  💡 Mỗi charm có giá 15.000đ
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation & Total */}
      <div className={styles.footer}>
        <div className={styles.totalSection}>
          <h3>Tổng cộng:</h3>
          <p className={styles.totalPrice}>{calculateTotal().toLocaleString()} VNĐ</p>
        </div>

        <div className={styles.navigation}>
          {currentStep > 1 && (
            <button onClick={prevStep} className={styles.btnPrev}>
              ← Quay lại
            </button>
          )}
          
          {currentStep < 4 ? (
            <button onClick={nextStep} className={styles.btnNext}>
              Tiếp tục →
            </button>
          ) : (
            <button onClick={handleAddToCart} className={styles.btnAddCart}>
              🛒 Thêm vào giỏ hàng
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomDesign;

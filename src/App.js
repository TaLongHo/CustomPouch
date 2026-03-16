import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Profile from './components/Profile';
import News from './components/News';
import CategoryPage from './components/CategoryPage';
import CustomDesign from './components/CustomDesign';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <div className="App">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/custom-design" element={<CustomDesign />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/category/:category" element={<CategoryPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
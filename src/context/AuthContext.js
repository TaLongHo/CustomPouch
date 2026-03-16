import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Giả lập đăng nhập (trong thực tế sẽ gọi API)
    const mockUser = {
      id: 1,
      name: 'Khách hàng',
      email: email,
      avatar: null
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { success: true };
  };

  const register = (name, email, password) => {
    // Giả lập đăng ký (trong thực tế sẽ gọi API)
    const mockUser = {
      id: Date.now(),
      name: name,
      email: email,
      avatar: null
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Để lưu trạng thái theme

// Tạo context
const ThemeContext = createContext();

// Provider bọc toàn bộ ứng dụng
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load trạng thái theme khi khởi động ứng dụng
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
    };
    loadTheme();
  }, []);

  // Hàm chuyển đổi theme
  const toggleTheme = async () => {
    setIsDarkMode((prev) => {
      AsyncStorage.setItem('theme', JSON.stringify(!prev)); // Lưu trạng thái theme
      return !prev;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook để sử dụng theme
export const useTheme = () => useContext(ThemeContext);

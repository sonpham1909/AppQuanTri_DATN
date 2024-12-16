import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../utils/ThemeContact';
import { darkTheme,lightTheme } from '../../utils/theme';

const SuccessMessage = () => {
  const checkmarkImage = require('../../assets/images/icon_checkmark.png'); // Ensure the path is correct

  const {isDarkMode} = useTheme()
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title,{color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text}]}>Thành Công!</Text>
      <View >
        {checkmarkImage ? (
          <Image source={checkmarkImage}  />
        ) : (
          <Text style={styles.iconFallback}>✔</Text> // Fallback in case image is not available
        )}
      </View>
      <Text style={[styles.message,{color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text}]}>
        Đơn hàng của bạn sẽ được giao sớm. Cảm ơn bạn đã chọn ứng dụng của chúng tôi!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },


  iconFallback: {
    fontSize: 40,
    color: '#fff',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});

export default SuccessMessage;

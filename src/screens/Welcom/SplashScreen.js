import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const SplashScreen = ({ navigation }) => {
  // Bạn có thể sử dụng useEffect để điều hướng đến màn hình chính sau một vài giây
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login'); // Điều hướng sang màn hình đăng nhập
    }, 3000); // Sau 3 giây
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')} // Đảm bảo đường dẫn tới hình ảnh là đúng
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.primary, // Màu nền xanh lá cây
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150, // Đặt kích thước cho logo
    height: 150,
    resizeMode: 'contain',
  },
});

export default SplashScreen;

import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import homeStyles from '../../styles/homeStyles';
import { ScrollView } from 'react-native-gesture-handler';

const Banner = () => {
  // Mảng chứa các hình ảnh
  const images = [
    require('../../assets/images/home_banner.png'),
    require('../../assets/images/item_2.png'),
    require('../../assets/images/item_3.png'),
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Hàm để tự động thay đổi ảnh sau 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3000ms = 3 giây
  
    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <ScrollView style={homeStyles.banner}>
      <View >
        <Image source={images[currentImageIndex]} style={homeStyles.bannerImage} />
      </View>
      {/* Các thành phần khác */}
    </ScrollView>
  );
  };


export default Banner;

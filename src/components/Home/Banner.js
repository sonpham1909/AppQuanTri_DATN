import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
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
      <View>
        <Image source={images[currentImageIndex]} style={homeStyles.bannerImage} />
      </View>
      {/* Dấu chấm hiển thị vị trí ảnh hiện tại */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentImageIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#000000', // Dấu chấm trắng
  },
  inactiveDot: {
    backgroundColor: '#cccccc', // Dấu chấm xám
  },
});

export default Banner;
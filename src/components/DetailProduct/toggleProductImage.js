import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';

const DetailProduct = ({ toggleCollapse}) => {
  // Khởi tạo trạng thái để thay đổi hình ảnh
  const [productImage, setProductImage] = useState(require('../../assets/images/detailProduct+.png'));

  // Hàm để thay đổi giữa hai ảnh khi nhấn
  const toggleProductImage = () => {
    setProductImage((prev) =>
      prev === require('../../assets/images/detailProduct-.png')
        ? require('../../assets/images/detailProduct+.png')
        : require('../../assets/images/detailProduct-.png')
    );
    toggleCollapse();
  };

  return (
    <View style={styles.container}>
      {/* Nút bấm để thay đổi ảnh */}
      <TouchableOpacity onPress={toggleProductImage}>
        <Image source={productImage} style={styles.productImage} />
      </TouchableOpacity>
    </View>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});

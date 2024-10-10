import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const categories = [
  { id: '1', name: 'Áo', icon: require('../../assets/images/cat1.png') },
  { id: '2', name: 'Quần', icon: require('../../assets/images/cat2.png') },
  { id: '3', name: 'Quần', icon: require('../../assets/images/cat2.png') },
  { id: '4', name: 'Quần', icon: require('../../assets/images/cat2.png') }

];

const newProducts = [
  { id: '1', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 3 },
  { id: '2', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 4 }
];

const popularProducts = [
  { id: '1', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 5 },
  { id: '2', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 2 }
];// Hàm để hiển thị các ngôi sao đánh giá
const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <Image
        key={i}
        source={require('../../assets/images/home_start.png')}
        style={styles.starIcon}
      />
    );
  }
  return stars;
};
// Hàm để hiển thị danh sách sản phẩm
const ProductList = ({ title, products, onProductPress }) => (
  <View style={styles.productSection}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle1}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.viewAll}>Tất Cả</Text>
      </TouchableOpacity>
    </View>
    <FlatList
      horizontal
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onProductPress(item)} style={styles.productItem}>
          {/* Hình ảnh sản phẩm */}
          <Image source={item.image} style={styles.productImage} />

          {/* Đánh giá sao */}
          <View style={styles.ratingContainer}>
            {renderStars(item.rating)}
            <Text style={styles.ratingCount}>({item.rating})</Text>
          </View>

          {/* Tên sản phẩm */}
          <Text style={styles.productName}>{item.name}</Text>

          {/* Giá sản phẩm */}
          <Text style={styles.productPrice}>{"$"+item.price} đ</Text>

          {/* Số lượng đánh giá */}
          <View style={styles.reviewContainer}>
            <Image source={require('../../assets/images/home_cmt.png')} style={styles.reviewIcon} />
            <Text style={styles.reviewCount}>2</Text> 
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);


const HomeScreen = ({ navigation }) => {
  // Hàm xử lý khi nhấn vào một sản phẩm
  const handleProductPress = (product) => {
    // Thực hiện điều hướng hoặc xử lý khác khi sản phẩm được bấm
    console.log('Sản phẩm đã được nhấn:', product);
    // Ví dụ: Điều hướng sang trang chi tiết sản phẩm
    navigation.navigate('ProductDetails', { productId: product.id });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <Image source={require('../../assets/images/home_banner.png')} style={styles.bannerImage} />
      </View>

      {/* Categories */}
      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle1}>Danh Mục</Text>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.notificationIconContainer}>
                <Image source={item.icon} style={styles.categoryIcon} />
              </View>
              <Text style={styles.clother}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* New Products */}
      <ProductList title="Sản Phẩm Mới" products={newProducts} onProductPress={handleProductPress} />

      {/* Popular Products */}
      <ProductList title="Sản Phẩm Phổ Biến" products={popularProducts} onProductPress={handleProductPress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  banner: {
    padding: 10,
  },
  bannerImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  categorySection: {
    padding: 10,
  },
  sectionTitle1: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#303030',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 35,
  },
  notificationIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clother: {
    fontSize: 20,
    color: '#000000',
  },
  productSection: {
    padding: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewAll: {
    color: '#00bfa5',
    fontWeight: 'bold',
  },
   productItem: {
    marginRight: 15,
    width: 173,
    height:280,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom:10
  },
  productImage: {
    width: 173,
    height: 190,
    resizeMode: 'stretch',
    borderRadius: 8,
  
  },
  ratingContainer: {
    paddingLeft:10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  ratingCount: {
    marginLeft: 5,
    color: '#B1ABAB',
    fontSize:13
  },
  productName: {
    paddingTop:5,
    paddingLeft:10,
    paddingBottom:7,
    fontSize: 14,
    color: '#000',
  },
  productPrice: {
    paddingLeft:10,
    color: '#F01B1B',
    fontWeight: 'bold',
    fontSize: 13,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 17,
    right: 10,
  },
  reviewIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
    
  },
  reviewCount: {
    fontSize: 11,
    color: '#000000',
  },
  starIcon: {

    width: 13,
    height: 13,
    marginRight: 5, // Khoảng cách giữa các ngôi sao
  },
});

export default HomeScreen;

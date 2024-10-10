import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import renderStars from '../../components/Home/renderStars'
import homeStyles from '../../styles/homeStyles'
import ProductList from '../../components/Home/ProductList'
import handleProductPress from '../../components/Home/handleProductPress'
const categories = [
  { id: '1', name: 'Áo', icon: require('../../assets/images/home_shirt.png') },
  { id: '2', name: 'Quần', icon: require('../../assets/images/home_trouser.png') }
];

const newProducts = [
  { id: '1', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 3 },
  { id: '2', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 4 },
  { id: '3', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 4 }

];

const popularProducts = [
  { id: '1', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 5 },
  { id: '2', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 2 },
  { id: '3', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 4 }

];


const HomeScreen = ({ navigation }) => {
  

  return (
    <ScrollView style={homeStyles.container}>
      {/* Banner */}
      <View style={homeStyles.banner}>
        <Image source={require('../../assets/images/home_banner.png')} style={homeStyles.bannerImage} />
      </View>

      {/* Categories */}
      <View style={homeStyles.categorySection}>
        <Text style={homeStyles.sectionTitle1}>Danh Mục</Text>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={homeStyles.categoryItem}>
              <View style={homeStyles.notificationIconContainer}>
                <Image source={item.icon} style={homeStyles.categoryIcon} />
              </View>
              <Text style={homeStyles.clother}>{item.name}</Text>
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


export default HomeScreen;

import React from 'react';
import { ScrollView } from 'react-native';
import homeStyles from '../../styles/homeStyles';
import ProductList from '../../components/Home/ProductList';
import Banner from '../../components/Home/Banner';
import CategorySection from '../../components/Home/CategorySection';

const categories = [
  { id: '1', name: 'Áo', icon: require('../../assets/images/home_shirt.png') },
  { id: '2', name: 'Quần', icon: require('../../assets/images/home_trouser.png') }
];

const newProducts = [
  { 
    id: '1', 
    name: 'Áo Ba Lỗ Thể Thao', 
    price: '500,000', 
    image: require('../../assets/images/item_1.png'), 
    rating: 3, 
    ratingCount: 13, 
    size: 'M', 
    colors: ['#000000', '#FFFFFF'] // Các màu của sản phẩm
  },
  { 
    id: '2', 
    name: 'Áo Ba Lỗ Thể Thao', 
    price: '500,000', 
    image: require('../../assets/images/home_clother.png'), 
    rating: 4, 
    ratingCount: 25, 
    size: 'L', 
    colors: ['#FF0000', '#00FF00', '#0000FF'] // Thêm nhiều màu hơn
  },
  { 
    id: '3', 
    name: 'Áo Ba Lỗ Thể Thao', 
    price: '500,000', 
    image: require('../../assets/images/home_clother.png'), 
    rating: 4, 
    ratingCount: 17, 
    size: 'XL', 
    colors: ['#FFFF00', '#FF00FF'] // Danh sách màu sản phẩm
  }
];


const popularProducts = [
  { 
    id: '1', 
    name: 'Áo Ba Lỗ Thể Thao', 
    price: '500,000', 
    image: require('../../assets/images/item_1.png'), 
    rating: 3, 
    ratingCount: 13, 
    size: 'M', 
    colors: ['#000000', '#FFFFFF'] // Các màu của sản phẩm
  },
  { 
    id: '2', 
    name: 'Áo Ba Lỗ Thể Thao', 
    price: '500,000', 
    image: require('../../assets/images/home_clother.png'), 
    rating: 4, 
    ratingCount: 25, 
    size: 'L', 
    colors: ['#FF0000', '#00FF00', '#0000FF'] // Thêm nhiều màu hơn
  },
  { 
    id: '3', 
    name: 'Áo Ba Lỗ Thể Thao', 
    price: '500,000', 
    image: require('../../assets/images/home_clother.png'), 
    rating: 4, 
    ratingCount: 17, 
    size: 'XL', 
    colors: ['#FFFF00', '#FF00FF'] // Danh sách màu sản phẩm
  }

];

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={homeStyles.container}>
      {/* Banner Component */}
      <Banner />

      {/* Categories Component */}
      <CategorySection categories={categories} />

      {/* New Products */}
      <ProductList navigation={navigation} title="Sản Phẩm Mới" products={newProducts}  />

      {/* Popular Products */}
      <ProductList navigation={navigation} title="Sản Phẩm Phổ Biến" products={popularProducts} />
    </ScrollView>
  );
};

export default HomeScreen;

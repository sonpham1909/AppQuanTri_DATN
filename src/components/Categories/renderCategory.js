import React from 'react';
import { Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import cateStyles from '../../styles/cateStyles';

// Component cho mỗi loại quần
const CategoryItem = ({ item }) => {
  const navigation = useNavigation();  

  const handlePressCategory = () => {
    console.log(`Bạn đã chọn: ${item.name}`);
    navigation.navigate('CateClother', { category: item });  // Điều hướng và truyền dữ liệu
  };

  return (
    <TouchableOpacity style={cateStyles.categoryItem} onPress={handlePressCategory}>
      <Image source={require('../../assets/images/item_1.png')} style={cateStyles.categoryImage} />
      <Text style={cateStyles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );
};

// Hàm render cho FlatList
const renderCategory = ({ item }) => <CategoryItem item={item} />;

export default renderCategory;

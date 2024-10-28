import React from 'react';
import { Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import cateStyles from '../../styles/cateStyles';

const CategoryItem = ({ item, subCategories,categoryName }) => {
  const navigation = useNavigation();

  const handlePressCategory = () => {
    if (!item || !item.name || !item.image) {
      console.error("Danh mục không hợp lệ hoặc thiếu thông tin");
      return;
    }

    // Điều hướng đến CateClotherScreen và truyền danh sách các danh mục con cùng với danh mục con được chọn
    navigation.navigate('CateClother', {
      subCategories,     // Truyền danh sách các danh mục con
      selectedTabIndex: subCategories.findIndex(sub => sub._id === item._id),
      categoryName // Truyền danh mục cha
    });
  };

  return (
    <TouchableOpacity style={cateStyles.categoryItem} onPress={handlePressCategory}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={cateStyles.categoryImage} />
      ) : (
        <Text>No Image</Text>
      )}
      <Text style={cateStyles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

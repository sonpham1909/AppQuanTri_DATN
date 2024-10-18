import React from 'react';
import { FlatList, View, Text } from 'react-native';
import cateStyles from '../../styles/cateStyles';
import renderCategory from '../../components/Categories/renderCategory';
import pantsCategories from '../../components/Categories/data';

const CategoriesScreen = ({ route }) => {
  const { category } = route.params; // Nhận dữ liệu danh mục từ route.params

  return (
    <View style={cateStyles.container}>
      <Text style={cateStyles.categoryTitle}>Danh mục: {category.name}</Text>
      <FlatList
        data={pantsCategories}  // Bạn có thể lọc danh sách này dựa trên danh mục
        renderItem={renderCategory}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CategoriesScreen;
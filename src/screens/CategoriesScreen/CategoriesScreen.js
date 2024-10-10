import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import cateStyles from '../../styles/cateStyles';
import pantsCategories from '../../components/Categories/data';


const CategoriesScreen = ({ navigation }) => {
  // Hàm xử lý khi bấm vào từng loại quần
  const handlePressCategory = (category) => {
    console.log(`Bạn đã chọn: ${category.name}`);
    // Thực hiện điều hướng hoặc xử lý khác
    // navigation.navigate('CategoryDetailScreen', { categoryId: category.id });
  };

  // Hàm render từng loại quần
  const renderCategory = ({ item }) => (
    <TouchableOpacity style={cateStyles.categoryItem} onPress={() => handlePressCategory(item)}>
      <Image source={{ uri: item.image }} style={cateStyles.categoryImage} />
      <Text style={cateStyles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={cateStyles.container}>
      <FlatList
        data={pantsCategories}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CategoriesScreen;


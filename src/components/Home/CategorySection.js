import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import homeStyles from '../../styles/homeStyles';
import { useNavigation } from '@react-navigation/native';

const CategorySection = ({ categories }) => {
  const navigation = useNavigation();  // Sử dụng hook điều hướng

  const handlePress = (item) => {
    // Chuyển sang CategoriesScreen, truyền dữ liệu danh mục
    navigation.navigate('CategoriesScreen', { category: item });
  };

  return (
    <View style={homeStyles.categorySection}>
      <Text style={homeStyles.sectionTitle1}>Danh Mục</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={homeStyles.categoryItem} onPress={() => handlePress(item)}>
            <View style={homeStyles.notificationIconContainer}>
              <Image source={item.icon} style={homeStyles.categoryIcon} />
            </View>
            <Text style={homeStyles.clother}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategorySection;

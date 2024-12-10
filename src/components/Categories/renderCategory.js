import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../utils/ThemeContact';
import { darkTheme,lightTheme } from '../../utils/theme';

const CategoryItem = ({ item, subCategories, categoryName }) => {
  const navigation = useNavigation();
  //lấy trạng thái theme
  const {isDarkMode} = useTheme()

  const handlePressCategory = () => {
    if (!item || !item.name || !item.image) {
      console.error("Danh mục không hợp lệ hoặc thiếu thông tin");
      return;
    }

    navigation.navigate('CateClother', {
      subCategories,
      selectedTabIndex: subCategories.findIndex(sub => sub._id === item._id),
      categoryName
    });
  };

  return (
    <TouchableOpacity style={styles.categoryItem} onPress={handlePressCategory}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
      ) : (
        <Text style={{color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }}>No Image</Text>
      )}
      <Text style={[styles.categoryName,{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 16,
  },
  categoryName: {
    fontSize: 16,
    color: '#000000',
  },
});

export default CategoryItem;

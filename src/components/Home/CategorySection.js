import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import homeStyles from '../../styles/homeStyles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/actions/actionCategory';

const CategorySection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchCategories()); // Lấy danh mục cha khi component được render
  }, [dispatch]);

  const handlePress = item => {
    navigation.navigate('CategoriesScreen', { category: item }); // Chuyển đến màn hình danh mục con
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
 
  // if (error) {
  //   return <Text>Error: {error}</Text>;
  // }

  return (
    <View style={homeStyles.categorySection}>
      <Text style={homeStyles.sectionTitle1}>Danh Mục</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={homeStyles.categoryItem} onPress={() => handlePress(item)}>
            <View style={homeStyles.notificationIconContainer}>
              <Image source={{ uri: item.imgcategory }} style={{ width: 30, height: 30 }} />
            </View>
            <Text style={homeStyles.clother}>{item.namecategory}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategorySection;

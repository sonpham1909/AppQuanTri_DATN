import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import homeStyles from '../../styles/homeStyles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategories} from '../../redux/actions/actionCategory';
import StatusView from '../StatusView';
import { useTheme } from '../../utils/ThemeContact';
import { darkTheme,lightTheme } from '../../utils/theme';

const CategorySection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {categories, isLoading, error} = useSelector(state => state.categories);

  //lấy trạng thái theme
  const {isDarkMode} = useTheme()
  useEffect(() => {
    dispatch(fetchCategories()); // Lấy danh mục cha khi component được render
  }, [dispatch]);

  const handlePress = item => {
    navigation.navigate('CategoriesScreen', {category: item}); // Chuyển đến màn hình danh mục con
  };

  if (isLoading) {
    return <StatusView isLoading={true} />;
  }

  if (!categories || categories.length === 0) {
    return <StatusView emptyText="Không có yeu thich nao." />;
  }
  if (error) {
    return <StatusView error={error} />;
  }

  return (
    <View style={homeStyles.categorySection}>
      <Text style={[homeStyles.sectionTitle1,{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }]}>Danh Mục</Text>
      <FlatList
        horizontal
        data={categories}
        showsHorizontalScrollIndicator={false} // Ẩn thanh trượt ngang
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={homeStyles.categoryItem}
            onPress={() => handlePress(item)}>
            <View style={homeStyles.notificationIconContainer}>
              <Image
                source={{uri: item.imgcategory}}
                style={{width: 30, height: 30}}
              />
            </View>
            <Text style={[homeStyles.clother,{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }]}>{item.namecategory}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategorySection;

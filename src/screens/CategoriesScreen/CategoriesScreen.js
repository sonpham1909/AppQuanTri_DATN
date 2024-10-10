import React from 'react';
import pantsCategories from '../../components/Categories/data';
import renderCategory from '../../components/Categories/renderCategory';
import { FlatList, View } from 'react-native';
import cateStyles from '../../styles/cateStyles';

const CategoriesScreen = ({ navigation }) => {
 

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


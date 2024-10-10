import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProductItem from '../../components/Favotires/ProductItem'; // Import ProductItem component
import Button_Add from '../../components/Favotires/Button_Add'; // Import Footer component

const products = [
  { id: '1', name: 'Áo Phông Blue', price: '200.000', image: require('../../assets/images/item_1.png') },
  { id: '2', name: 'Bộ quần áo in hình núi', price: '350.000', image: require('../../assets/images/item_2.png') },
  { id: '3', name: 'Áo dài tay Rhodi', price: '150.000', image: require('../../assets/images/item_3.png') },
  { id: '4', name: 'Áo phông Rhodi', price: '200.000', image: require('../../assets/images/item_4_1.png') },
  { id: '5', name: 'Áo dài tay mùa đông', price: '239.000', image: require('../../assets/images/item_4_2.png') },
];

const Favorites = () => {
  const handleRemoveProduct = (id) => {
    console.log('Remove product with id:', id);
    // Xử lý logic xóa sản phẩm khỏi danh sách yêu thích
  };

  return (
    <View style={styles.container}>
      {/* Header */}

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onRemove={() => handleRemoveProduct(item.id)}
          />
        )}
        style={styles.list}
      />

      {/* Footer */}
      <Button_Add />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    paddingHorizontal: 10,
  },
});

import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import globalStyles from '../../styles/globalStyles';
import colors from '../../constants/colors';

const ProductScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const productList = [
    {
      id: 101,
      name: 'Áo khoác',
      category: 'Áo',
      basePrice: '15,000',
      seller: 'seller_01',
      image: require('../../assets/images/product_1.png'), // Replace with your image source
      variants: [
        {size: 'S', color: 'vàng', price: '15,000', stock: '5'},
        {size: 'S', color: 'vàng', price: '15,000', stock: '5'},
      ],
    },
  ];

  const handleAddProduct = () => {
        navigation.navigate('Addproduct'); 
    
    };

  const handleDeleteProduct = productId => {
    // Handle deleting a product
  };

  const handleCategoryChange = newCategory => {
    setSelectedCategory(newCategory);
  };

  return (
    <View style={globalStyles.container}>
      {/* Search Section */}
      <View style={styles.searchSection}>
        {/* Category Picker */}
        <View style={styles.categoryPickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            style={colors.textSecondary}
            onValueChange={itemValue => setSelectedCategory(itemValue)}>
            <Picker.Item label="Quần" value="quần" />
            <Picker.Item label="Áo" value="áo" />
          </Picker>
        </View>

        {/* Search Input */}
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm "
            placeholderTextColor={colors.textSecondary}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <Image
            source={require('../../assets/images/icon_search.png')}
            style={styles.searchIcon}
          />
        </View>
      </View>

      {/* Product List */}
      <FlatList
        data={productList}
        contentContainerStyle={styles.productListContainer}
        renderItem={({item}) => (
          <View style={styles.productCard}>
            {/* Delete Icon (X) in the top-right corner */}
            <TouchableOpacity
              onPress={() => handleDeleteProduct(item.id)}
              style={globalStyles.deleteButton}>
              <Image
                source={require('../../assets/images/icon_delete.png')}
                style={globalStyles.deleteIcon}
              />
            </TouchableOpacity>

            {/* Image and Product Info */}
            <View style={styles.row}>
              <Image source={item.image} style={styles.productImage} />

              <View >
                <Text style={globalStyles.categoryText}>
                  Categories: {item.category}
                </Text>
                <Text style={globalStyles.textPrimary}>Name: {item.name}</Text>
                <Text style={globalStyles.productPrice}>
                  Price: {item.basePrice} đ
                </Text>

                {/* Product Variants */}
                {item.variants.map((variant, index) => (
                  <View key={index} style={styles.variantRow}>
                    <Text>
                      Color: {variant.color} | Size: {variant.size} | Quantity:{' '}
                      {variant.stock}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={globalStyles.floatingButton}
        onPress={handleAddProduct}>
        <Image
          source={require('../../assets/images/icon_add.png')}
          style={globalStyles.floatingIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryPickerContainer: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.secondary,
  },
 
  searchInputContainer: {
    flex: 2,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: colors.textPrimary,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
  },
  productImage: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  variantRow: {
    flexDirection: 'row',
    marginTop: 5,
  }
 
 
});

export default ProductScreen;

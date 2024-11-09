import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  useSelector } from 'react-redux';

const FavoriteItem = ({ product, onToggleFavorite, navigation }) => {
  const favoriteList = useSelector(state => state.favorites.favoriteList);

  const isFavorite = productId =>
    favoriteList.some(fav => fav._id === productId);
  const formatPrice = price =>
    price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ProductDetailScreen', { product })}
    >
      {product.imageUrls && product.imageUrls.length > 0 && (
        <Image source={{ uri: product.imageUrls[0] }} style={styles.image} />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          {product.name || 'Tên sản phẩm'}
        </Text>
        <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>

      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => onToggleFavorite(product._id)}
          style={styles.loveIconContainer}>
          <MaterialCommunityIcons
            name={isFavorite(product._id) ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite(product._id) ? 'red' : 'gray'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.separator}></View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  loveIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 5,
  },
  productName: {
    fontFamily: 'Nunito Sans',
    fontSize: 14,
    color: '#606060',
  },
  productPrice: {
    fontFamily: 'Nunito Sans',
    fontSize: 16,
    color: '#303030',
    fontWeight: 'bold',
    marginTop: 4,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 10,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
});

export default FavoriteItem;

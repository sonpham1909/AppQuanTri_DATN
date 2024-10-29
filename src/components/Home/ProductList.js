// components/ProductList.js
import React, {useEffect} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import renderStars from '../Home/renderStars';
import {fetchProductReviews} from '../../redux/actions/actionProduct';
import {
  toggleFavorite,
  fetchFavoriteList,
} from '../../redux/actions/favoriteActions';

const ProductList = ({navigation, title, products}) => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.products.reviews);
  const favoriteList = useSelector(state => state.favorites.favoriteList);

  useEffect(() => {
    if (favoriteList.length === 0) {
      dispatch(fetchFavoriteList());
    }
    products.forEach(product => {
      dispatch(fetchProductReviews(product._id));
    });
  }, [dispatch, products]);

  const formatPrice = price =>
    price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});

  const isFavorite = productId =>
    favoriteList.some(fav => fav._id === productId);

  const handleToggleFavorite = productId => {
    dispatch(toggleFavorite(productId));
  };

  return (
    <View style={styles.productSection}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AllProductScreen', {category: products})
          }>
          <Text style={styles.viewAll}>Tất Cả</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          const productReviews = reviews[item._id] || {};
          const totalReviews = productReviews.totalReviews || 0;
          const averageRating = productReviews.averageRating || 0;

          const sizes = Array.isArray(item.variants)
            ? item.variants.map(variant => variant.size)
            : [];
            const colors = Array.isArray(item.variants)
            ? [...new Set(item.variants.map(variant => variant.color))] // Loại bỏ các màu trùng lặp
            : [];
          const firstPrice =
            Array.isArray(item.variants) && item.variants.length > 0
              ? item.variants[0].price
              : null;
          const imageUrl =
            Array.isArray(item.imageUrls) && item.imageUrls.length > 0
              ? item.imageUrls[0]
              : null;

          return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetailScreen', { product: item })

              }
              style={styles.productItem}>
              <View style={styles.imageContainer}>
                <Image source={{uri: imageUrl}} style={styles.productImage} />
                <TouchableOpacity
                  style={styles.favoriteIcon}
                  onPress={() => handleToggleFavorite(item._id)}>
                  <MaterialCommunityIcons
                    name={isFavorite(item._id) ? 'heart' : 'heart-outline'}
                    size={22}
                    color={isFavorite(item._id) ? 'red' : 'gray'}
                  />
                </TouchableOpacity>
                
              </View>

             

              <View style={styles.colorOptions}>
                {colors.map((color, index) => (
                  <View
                    key={index}
                    style={[styles.colorSquare, {backgroundColor: color}]}
                  />
                ))}
              </View>

              <View style={styles.sizeColorContainer}>
                <Text style={styles.productSize}>
                  {sizes[0]} - {sizes[sizes.length - 1]}
                </Text>
              </View>

              <Text style={styles.productName}>{item.name}</Text>

              <Text style={styles.productPrice}>{formatPrice(firstPrice)}</Text>

              {totalReviews > 0 && (
                <View style={styles.reviewSection}>
                  {renderStars(averageRating)}
                  <Text style={styles.reviewCount}>({totalReviews})</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductList;

const styles = {
  productSection: {marginBottom: 20},
  reviewSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  title: {fontSize: 20, fontWeight: 'bold', color: '#000000'},
  viewAll: {fontSize: 14, fontWeight: 'bold', color: '#00A65E'},
  productItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 10,
    width: 160,
    height: 300,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
  },
  productImage: {
    width: 130,
    height: 150,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  favoriteIcon: {position: 'absolute', top: 5, right: 5},
  sizeColorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  productSize: {fontSize: 12, color: '#999', marginLeft: 10},
  productName: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    marginLeft: 10,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  colorOptions: {
    marginLeft: 10,
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
  colorSquare: {
    marginRight: 5,
    width: 15,
    height: 15,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
};

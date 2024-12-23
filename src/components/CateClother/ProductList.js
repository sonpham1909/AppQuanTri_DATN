import React, {useCallback, useEffect} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductReviews} from '../../redux/actions/actionProduct';
import {
  toggleFavorite,
  fetchFavoriteList,
} from '../../redux/actions/actionFavorite';
import {fetchVariantsByProductId} from '../../redux/actions/actionsVariant';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';

const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ProductList = ({navigation, products}) => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.products.reviews);
  const variants = useSelector(state => state.variants.variants);
  const favoriteList = useSelector(state => state.favorites.favoriteList);

  useEffect(() => {
    if (favoriteList.length === 0) {
      dispatch(fetchFavoriteList());
    }
    products.forEach(product => {
      dispatch(fetchProductReviews(product._id));
      dispatch(fetchVariantsByProductId(product._id));
    });
  }, [dispatch, products]);

  
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchFavoriteList());
      products.forEach(product => {
        dispatch(fetchProductReviews(product._id));
        dispatch(fetchVariantsByProductId(product._id));
      });

    }, [dispatch,products]),
  );


  const formatPrice = price =>
    price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});

  const isFavorite = productId =>
    favoriteList.some(fav => fav._id === productId);

  const handleToggleFavorite = productId => {
    dispatch(toggleFavorite(productId));
  };

  return (
    <View style={styles.productSection}>
      <FlatList
        data={products}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          const variantsItem = variants[item._id] || [];
          const productReviews = reviews[item._id] || {};
          const totalReviews = productReviews.totalReviews || 0;
          const averageRating = productReviews.averageRating
          ? productReviews.averageRating.toFixed(1) // Làm tròn điểm trung bình đến 1 chữ số thập phân
          : '0.0';
          const availableSizes = Array.from(
            new Set(
              variantsItem
                .flatMap(variant => variant.sizes)
                .filter(size => size.quantity > 0)
                .map(size => size.size),
            ),
          ).sort((a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b));

          const sizeText =
            availableSizes.length > 1
              ? `${availableSizes[0]} - ${
                  availableSizes[availableSizes.length - 1]
                }`
              : availableSizes[0] || '';

          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetailScreen', {product: item})
              }
              style={styles.productItem}>
              <View style={styles.imageContainer}>
                {item.imageUrls?(<Image
                  source={{uri: item.imageUrls[0]}}
                  style={styles.productImage}
                />):(<Text>
                  Không có sản phẩm nào
                </Text>)}
                
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
                {variantsItem.map(variant => (
                  <View key={variant._id}>
                    <View
                      style={[
                        styles.colorSquare,
                        {backgroundColor: variant.color_code},
                      ]}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.productSize}>
                <Text style={styles.sizeText}>{sizeText}</Text>
              </View>

              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>

              {totalReviews > 0 && (
                <View style={styles.reviewSection}>
                  <MaterialCommunityIcons name="star" size={18} color="black" />
                  <Text style={styles.reviewCountBold}>{averageRating}</Text>
                  <Text style={styles.reviewCount}> ({totalReviews})</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductList;

const styles = {
  reviewSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 5,
  },
  reviewCountBold: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#000000',
    marginLeft: 3,
  },
  productItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 10,
    width: 160,
    height: 300,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop:10
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
    marginLeft: 8,
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

  colorSquare: {
    marginRight: 5,
    width: 15,
    height: 15,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  colorOptions: {
    marginLeft: 8,
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
};

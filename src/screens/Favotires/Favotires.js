// screens/Favorites.js
import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteList, toggleFavorite } from '../../redux/actions/favoriteActions';
import FavoriteItem from '../../components/Favotires/ProductItem';

const Favorites = ({ navigation }) => {
  const dispatch = useDispatch();
  const favoriteList = useSelector(state => state.favorites.favoriteList);

  const formatPrice = price =>
    price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});

  useEffect(() => {
    dispatch(fetchFavoriteList());
  }, [dispatch]);

  const handleToggleFavorite = (productId) => {
    dispatch(toggleFavorite(productId));
  };

  if (!favoriteList || favoriteList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>Không có sản phẩm yêu thích nào</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteList}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <FavoriteItem
            product={item}
            onToggleFavorite={() => handleToggleFavorite(item._id)}
            navigation={navigation} // Truyền navigation vào FavoriteItem
          />
        )}
        style={styles.list}
      />
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

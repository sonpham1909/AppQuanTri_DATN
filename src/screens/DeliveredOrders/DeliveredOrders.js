import React, {useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPurchasedProducts} from '../../redux/actions/actionOder'; // Giả sử bạn có hành động này
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {fetchUserReviews} from '../../redux/actions/actionsReview'; // Giả sử bạn có hành động này
import StatusView from '../../components/StatusView';

const DeliveredOrders = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {purchasedProducts, isLoading, error} = useSelector(
    state => state.order,
  );
  const {userReviews} = useSelector(state => state.reviewResponses); // Lấy danh sách đánh giá của người dùng
  console.log(userReviews);

  useEffect(() => {
    dispatch(fetchPurchasedProducts());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchUserReviews());
    }, [dispatch]),
  );

  if (isLoading) {
    return <StatusView isLoading={true} />;
  }

  if (!purchasedProducts || purchasedProducts.length === 0) {
    return <StatusView emptyText="Không có sản phẩm nào đã mua." />;
  }
  if (error) {
    return <StatusView error={error} />;
  }

  return (
    <ScrollView style={styles.container}>
      {purchasedProducts.map((item, index) => {
        const hasReviewed = userReviews.some(
          review => review.product_id === item.product_id,
        );

        return (
          <View key={index} style={styles.productItem}>
            <Image
              source={{
                uri: item.imageVariant !== 'N/A' ? item.imageVariant : null,
              }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>
                {item.productName || 'Sản phẩm không xác định'}
              </Text>
              <Text style={styles.productPrice}>
                {item.productPrice || 'N/A Đ'}
              </Text>
              <Text style={styles.productDetail}>Màu: {item.color}</Text>
              <Text style={styles.productDetail}>Kích cỡ: {item.size}</Text>
            </View>
            {!hasReviewed && (
              <TouchableOpacity
                style={styles.reviewButton}
                onPress={() =>
                  navigation.navigate('AddReview', {
                    productId: item.product_id,
                    color: item.color,
                    size: item.size,
                    imageVariant: item.imageVariant,
                  })
                }>
                <Text style={styles.reviewButtonText}>Viết đánh giá</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default DeliveredOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0', // Màu nền cho sản phẩm không có hình ảnh
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#242424',
  },
  productPrice: {
    fontSize: 16,
    color: '#00A65E',
    marginBottom: 5,
  },
  productDetail: {
    fontSize: 14,
    color: '#777',
  },
  reviewButton: {
    backgroundColor: '#00A65E',
    paddingVertical: 8,
    marginTop: 60,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  reviewButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: 'gray',
    textAlign: 'center',
  },
});

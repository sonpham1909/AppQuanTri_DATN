import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductReviews } from '../../redux/actions/actionProduct';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { toggleFavorite } from '../../redux/actions/favoriteActions';
import { fetchProductReviewResponses } from '../../redux/actions/actionsReview';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const reviews = useSelector(state => state.products.reviews);
  const { reviewResponses, isLoading, error } = useSelector(state => state.reviewResponses);
  const favoriteList = useSelector(state => state.favorites.favoriteList);

  const productReviews = reviewResponses[product._id] || [];
  const totalReview = reviews[product._id] || {};
  const totalReviews = totalReview.totalReviews || 0;
  const averageRating = totalReview.averageRating || 0;

  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || null);
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size || null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(product.variants[0]?.quantity || 0);
  const [isCollapsedMaterial, setIsCollapsedMaterial] = useState(true);
  const [isCollapsedDetails, setIsCollapsedDetails] = useState(true);

  useEffect(() => {
    dispatch(fetchProductReviews(product._id));
    dispatch(fetchProductReviewResponses(product._id));
  }, [dispatch, product._id]);

  useEffect(() => {
    if (selectedColor) {
      const sizesForColor = product.variants.filter(v => v.color === selectedColor).map(v => v.size);
      setAvailableSizes(sizesForColor);
      const selectedVariant = product.variants.find(v => v.color === selectedColor && v.size === sizesForColor[0]);
      setMaxQuantity(selectedVariant ? selectedVariant.quantity : 0);
      setQuantity(1);
      setSelectedSize(sizesForColor[0]);
    }
  }, [selectedColor]);

  const handleToggleFavorite = () => dispatch(toggleFavorite(product._id));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{product.name}</Text>
        <View style={styles.ratingRow}>
          {totalReviews > 0 && (
            <View style={styles.starsContainer}>
              {Array.from({ length: averageRating }, (_, i) => (
                <Image key={i} source={require('../../assets/images/home_start.png')} style={styles.starIcon} />
              ))}
              <Text style={styles.text1}>({totalReviews})</Text>
            </View>
          )}
        </View>

        <Image source={{ uri: product.imageUrls[0] || 'fallback-image-url' }} style={styles.productImage} />

        <View style={styles.row}>
          <Text style={styles.label}>Màu Sắc: </Text>
          <View style={styles.colorContainer}>
            {[...new Set(product.variants.map(v => v.color))].map((color, i) => (
              <TouchableOpacity key={i} style={[styles.colorCircle, { backgroundColor: color }, selectedColor === color && styles.selectedColor]} onPress={() => setSelectedColor(color)} />
            ))}
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Kích Cỡ: </Text>
          <View style={styles.sizeContainer}>
            {availableSizes.map((size, i) => (
              <TouchableOpacity key={i} style={[styles.sizeButton, selectedSize === size && styles.selectedSize]} onPress={() => setSelectedSize(size)}>
                <Text style={styles.sizeText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.price}>{`${product.variants[0]?.price.toLocaleString()} VND`}</Text>

        {/* Điều chỉnh số lượng và thêm vào giỏ */}
        <View style={styles.quantityRow}>
          <Text style={styles.label}>Số Lượng: </Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(Math.min(maxQuantity, quantity + 1))} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.stockText}>Còn {maxQuantity} sản phẩm</Text>

        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={handleToggleFavorite}>
            <MaterialCommunityIcons name={favoriteList.some(fav => fav._id === product._id) ? 'heart' : 'heart-outline'} size={26} color="red" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToCartButton} onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.addToCartText}>Thêm Giỏ Hàng</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Mô tả</Text>
          <TouchableOpacity onPress={() => setIsCollapsedMaterial(!isCollapsedMaterial)}>
            <Text style={styles.sectionToggle}>Chất liệu {isCollapsedMaterial ? '+' : '-'}</Text>
          </TouchableOpacity>

          {!isCollapsedMaterial && <Text style={styles.sectionContent}>{product.material || 'Không có thông tin chất liệu'}</Text>}

          <TouchableOpacity onPress={() => setIsCollapsedDetails(!isCollapsedDetails)}>
            <Text style={styles.sectionToggle}>Chi tiết {isCollapsedDetails ? '+' : '-'}</Text>
          </TouchableOpacity>
          {!isCollapsedDetails && <Text style={styles.sectionContent}>{product.description || 'Không có thông tin chi tiết'}</Text>}
        </View>

        <Text style={styles.sectionLabel}>Đánh giá</Text>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          productReviews.map(review => (
            <View key={review._id} style={styles.reviewContainer}>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <Text style={styles.reviewRating}>Đánh giá: {review.rating}</Text>
              {review.responses?.map(response => (
                <Text key={response._id} style={styles.responseText}>Phản hồi từ người bán: {response.comment}</Text>
              ))}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  detailsContainer: { padding: 16 },
  productTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#000' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  starsContainer: { flexDirection: 'row', alignItems: 'center', marginRight: 5 },
  text1: { fontSize: 16, marginLeft: 5 },
  productImage: { width: '100%', height: 250, resizeMode: 'contain', borderRadius: 8, marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  colorContainer: { flexDirection: 'row', marginLeft: 8 },
  colorCircle: { width: 30, height: 30, borderRadius: 15, marginHorizontal: 5, borderWidth: 1, borderColor: '#ddd' },
  selectedColor: { borderWidth: 2, borderColor: '#000' },
  sizeContainer: { flexDirection: 'row', marginLeft: 8 },
  sizeButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 4, borderWidth: 1, borderColor: '#ccc', marginHorizontal: 5 },
  selectedSize: { backgroundColor: '#ddd' },
  price: { fontSize: 18, fontWeight: 'bold', color: 'green', marginBottom: 8 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  quantityControls: { flexDirection: 'row', alignItems: 'center', marginRight: 8 },
  quantityButton: { padding: 6, borderWidth: 1, borderColor: '#ddd', borderRadius: 4 },
  quantityButtonText: { fontSize: 18, color: '#333' },
  quantityText: { marginHorizontal: 10, fontSize: 16, color: '#333' },
  stockText: { color: '#27ae60', fontSize: 14 },
  buttonsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  addToCartButton: { backgroundColor: '#27ae60', padding: 12, borderRadius: 8, alignItems: 'center', flex: 1, marginLeft: 10 },
  addToCartText: { color: '#fff', fontWeight: 'bold' },
  
  section: { marginVertical: 12 },
  sectionLabel: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  sectionToggle: { fontSize: 16, color: '#3498db', marginVertical: 6 },
  sectionContent: { fontSize: 14, color: '#666', paddingVertical: 4 },

  reviewContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  reviewComment: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  reviewRating: { fontSize: 14, color: '#555' },
  responseText: { fontSize: 14, color: '#888', marginLeft: 10, marginTop: 2, paddingLeft: 10, borderLeftWidth: 1, borderColor: '#ddd' },
});


import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductReviews} from '../../redux/actions/actionProduct';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {toggleFavorite} from '../../redux/actions/favoriteActions';
import {fetchProductReviewResponses} from '../../redux/actions/actionsReview';
import {fetchVariantsByProductId} from '../../redux/actions/actionsVariant';

const ProductDetailScreen = ({route, navigation}) => {
  const {product} = route.params;
  const dispatch = useDispatch();

  const reviews = useSelector(state => state.products.reviews) || {};
  const {reviewResponses, isLoading, error} =
    useSelector(state => state.reviewResponses) || {};
  const favoriteList = useSelector(state => state.favorites.favoriteList) || [];
  const variants = useSelector(
    state => state.variants.variants[product._id] || [],
  );

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [displayedImage, setDisplayedImage] = useState(product.imageUrls[0] || 'fallback-image-url');

  const productReviews = reviewResponses[product._id] || [];
  const totalReview = reviews[product._id] || {};
  const totalReviews = totalReview.totalReviews || 0;
  const averageRating = totalReview.averageRating || 0;

  const [isCollapsedMaterial, setIsCollapsedMaterial] = useState(true);
  const [isCollapsedDetails, setIsCollapsedDetails] = useState(true);

  useEffect(() => {
    dispatch(fetchProductReviews(product._id));
    dispatch(fetchProductReviewResponses(product._id));
    dispatch(fetchVariantsByProductId(product._id));
  }, [dispatch, product._id]);

  useEffect(() => {
    if (variants.length > 0) {
      // Thiết lập màu mặc định nếu chưa có màu nào được chọn
      if (!selectedColor) {
        setSelectedColor(variants[0].color_code);
      }
  
      const sizesForColor = variants
        .filter(v => v.color_code === selectedColor)
        .flatMap(v => v.sizes)
        .map(sizeObj => ({
          size: sizeObj.size,
          quantity: sizeObj.quantity,
        }));
  
      setAvailableSizes(sizesForColor);
  
      // Thiết lập kích cỡ đầu tiên làm kích cỡ mặc định nếu chưa có kích cỡ nào được chọn
      if (sizesForColor.length > 0) {
        setSelectedSize(selectedSize || sizesForColor[0].size);
        const selectedSizeObj = sizesForColor.find(
          sizeObj => sizeObj.size === (selectedSize || sizesForColor[0].size)
        );
        setMaxQuantity(selectedSizeObj ? selectedSizeObj.quantity : 0);
      } else {
        setMaxQuantity(0);
      }
  
      // Cập nhật ảnh nếu có màu sắc
      const selectedVariant = variants.find(v => v.color_code === selectedColor);
      if (selectedVariant) {
        setDisplayedImage(selectedVariant.image);
      }
    }
  }, [selectedColor, variants, selectedSize]);
  
  const handleToggleFavorite = () => dispatch(toggleFavorite(product._id));

  const isSizeAvailable = (size) => {
    return availableSizes.some(sizeObj => sizeObj.size === size && sizeObj.quantity > 0);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{product.name}</Text>
        <View style={styles.ratingRow}>
          {totalReviews > 0 && (
            <View style={styles.starsContainer}>
              {Array.from({length: Math.round(averageRating)}, (_, i) => (
                <Image
                  key={i}
                  source={require('../../assets/images/home_start.png')}
                  style={styles.starIcon}
                />
              ))}
              <Text style={styles.text1}>({totalReviews})</Text>
            </View>
          )}
        </View>

        <Image
          source={{uri: displayedImage}}
          style={styles.productImage}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Màu Sắc: </Text>
          <View style={styles.colorContainer}>
            {variants.map((variant, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.colorCircle,
                  {backgroundColor: variant.color_code},
                  selectedColor === variant.color_code && styles.selectedColor,
                  // Gạch ô nếu không còn kích thước nào
                  availableSizes.length === 0 && styles.disabled,
                ]}
                onPress={() => {
                  setSelectedColor(variant.color_code); // Cập nhật màu đã chọn
                }}
              />
            ))}
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Kích Cỡ: </Text>
          <View style={styles.sizeContainer}>
            {availableSizes.map((sizeObj, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.sizeButton,
                  selectedSize === sizeObj.size && styles.selectedSize,
                  !isSizeAvailable(sizeObj.size) && styles.disabled, // Gạch ô nếu không còn hàng
                ]}
                onPress={() => {
                  if (isSizeAvailable(sizeObj.size)) { // Kiểm tra có còn hàng không
                    setSelectedSize(sizeObj.size);
                    setMaxQuantity(sizeObj.quantity);
                  }
                }}>
                <Text style={styles.sizeText}>{sizeObj.size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.price}>{`${product.price.toLocaleString() || '0'} VND`}</Text>

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
            <MaterialCommunityIcons
              name={favoriteList.some(fav => fav._id === product._id) ? 'heart' : 'heart-outline'}
              size={26}
              color="red"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.addToCartText}>Thêm Giỏ Hàng</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Mô tả</Text>
          <TouchableOpacity onPress={() => setIsCollapsedMaterial(!isCollapsedMaterial)}>
            <Text style={styles.sectionToggle}>Chất liệu {isCollapsedMaterial ? '+' : '-'}</Text>
          </TouchableOpacity>
          {!isCollapsedMaterial && (
            <Text style={styles.sectionContent}>
              {product.material || 'Không có thông tin chất liệu'}
            </Text>
          )}

          <TouchableOpacity onPress={() => setIsCollapsedDetails(!isCollapsedDetails)}>
            <Text style={styles.sectionToggle}>Chi tiết {isCollapsedDetails ? '+' : '-'}</Text>
          </TouchableOpacity>
          {!isCollapsedDetails && (
            <Text style={styles.sectionContent}>
              {product.description || 'Không có thông tin chi tiết'}
            </Text>
          )}
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
                <Text key={response._id} style={styles.responseText}>
                  Phản hồi từ người bán: {response.comment}
                </Text>
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
  container: {flex: 1, backgroundColor: '#fff'},
  detailsContainer: {padding: 16},
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  disabled: {
    opacity: 0.5, // Giảm độ sáng cho ô
    textDecorationLine: 'line-through', // Gạch bỏ văn bản
  },
  ratingRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 8},
  starsContainer: {flexDirection: 'row', alignItems: 'center', marginRight: 5},
  text1: {fontSize: 16, marginLeft: 5},
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 16,
  },
  row: {flexDirection: 'row', alignItems: 'center', marginBottom: 8},
  colorContainer: {flexDirection: 'row', marginLeft: 8},
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedColor: {borderWidth: 2, borderColor: '#000'},
  sizeContainer: {flexDirection: 'row', marginLeft: 8},
  sizeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
  },
  selectedSize: {backgroundColor: '#ddd'},
  price: {fontSize: 18, fontWeight: 'bold', color: 'green', marginBottom: 8},
  quantityRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 16},
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  quantityButton: {
    padding: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  quantityButtonText: {fontSize: 18, color: '#333'},
  quantityText: {marginHorizontal: 10, fontSize: 16, color: '#333'},
  stockText: {color: '#27ae60', fontSize: 14},
  buttonsRow: {flexDirection: 'row', alignItems: 'center', marginTop: 16},
  addToCartButton: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  addToCartText: {color: '#fff', fontWeight: 'bold'},

  section: {marginVertical: 12},
  sectionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionToggle: {fontSize: 16, color: '#3498db', marginVertical: 6},
  sectionContent: {fontSize: 14, color: '#666', paddingVertical: 4},

  reviewContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  reviewComment: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  reviewRating: {fontSize: 14, color: '#555'},
  responseText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 10,
    marginTop: 2,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderColor: '#ddd',
  },
});

import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductReviews} from '../../redux/actions/actionProduct';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {toggleFavorite} from '../../redux/actions/favoriteActions';
import {fetchProductReviewResponses} from '../../redux/actions/actionsReview';
import {fetchVariantsByProductId} from '../../redux/actions/actionsVariant';
import renderStars from '../../components/Home/renderStars';

const {width} = Dimensions.get('window');

const ProductDetailScreen = ({route, navigation}) => {
  const {product} = route.params;
  const dispatch = useDispatch();
  const flatListRef = useRef();

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
  const [allImages, setAllImages] = useState([]);

  const productReviews = reviewResponses[product._id] || [];
  const totalReview = reviews[product._id] || {};
  const totalReviews = totalReview.totalReviews || 0;
  const averageRating = totalReview.averageRating
    ? totalReview.averageRating.toFixed(1)
    : '0.0';

  const [isCollapsedMaterial, setIsCollapsedMaterial] = useState(true);
  const [isCollapsedDetails, setIsCollapsedDetails] = useState(true);

  useEffect(() => {
    dispatch(fetchProductReviews(product._id));
    dispatch(fetchProductReviewResponses(product._id));
    dispatch(fetchVariantsByProductId(product._id));
  }, [dispatch, product._id]);

  useEffect(() => {
    if (variants.length > 0) {
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

      if (sizesForColor.length > 0) {
        setSelectedSize(selectedSize || sizesForColor[0].size);
        const selectedSizeObj = sizesForColor.find(
          sizeObj => sizeObj.size === (selectedSize || sizesForColor[0].size),
        );
        setMaxQuantity(selectedSizeObj ? selectedSizeObj.quantity : 0);
      } else {
        setMaxQuantity(0);
      }

      // Danh sách hình ảnh mới: ảnh của biến thể trước, ảnh của sản phẩm sau
      const selectedVariant = variants.find(
        v => v.color_code === selectedColor,
      );
      const newAllImages = [
        selectedVariant?.image,
        ...product.imageUrls,
      ].filter(Boolean); // Loại bỏ giá trị null hoặc undefined

      setAllImages(newAllImages);

      // Cuộn đến vị trí của ảnh biến thể đã chọn
      if (selectedVariant) {
        const index = newAllImages.findIndex(
          image => image === selectedVariant.image,
        );
        if (index !== -1 && flatListRef.current) {
          flatListRef.current.scrollToIndex({index, animated: false});
        }
      }
    }
  }, [selectedColor, variants, selectedSize]);

  const handleToggleFavorite = () => dispatch(toggleFavorite(product._id));

  const isSizeAvailable = size => {
    return availableSizes.some(
      sizeObj => sizeObj.size === size && sizeObj.quantity > 0,
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{product.name}</Text>
        <View style={styles.ratingRow}>
          {totalReviews > 0 && (
            <View style={styles.reviewSection}>
              {renderStars(averageRating)}
              <Text style={styles.reviewCountBold}>{averageRating}</Text>

              <Text style={styles.reviewCount}>({totalReviews})</Text>
            </View>
          )}
        </View>

        {allImages.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={allImages}
            horizontal
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({item}) => (
              <View style={{width}}>
                <Image source={{uri: item}} style={styles.productImage} />
              </View>
            )}
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text>Không có ảnh sản phẩm nào để hiển thị.</Text>
        )}

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
                ]}
                onPress={() => {
                  setSelectedColor(variant.color_code);
                  const newAllImages = [
                    variant.image,
                    ...product.imageUrls,
                  ].filter(Boolean); // Cập nhật danh sách hình ảnh với ảnh biến thể đã chọn trước tiên
                  setAllImages(newAllImages);
                  const index = newAllImages.findIndex(
                    image => image === variant.image,
                  );
                  if (index !== -1 && flatListRef.current) {
                    flatListRef.current.scrollToIndex({index, animated: false});
                  }
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
                  !isSizeAvailable(sizeObj.size) && styles.disabled,
                ]}
                onPress={() => {
                  if (isSizeAvailable(sizeObj.size)) {
                    setSelectedSize(sizeObj.size);
                    setMaxQuantity(sizeObj.quantity);
                  }
                }}>
                <Text style={styles.sizeText}>{sizeObj.size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.price}>{`${(
          product.price * quantity
        ).toLocaleString()} VND`}</Text>

        <View style={styles.quantityRow}>
          <Text style={styles.label}>Số Lượng: </Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={() =>
                setQuantity(Math.min(maxQuantity, quantity + 1, 10))
              }
              style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.stockText}>Còn {maxQuantity} sản phẩm</Text>

        <View style={styles.buttonsRow}>
          <TouchableOpacity onPress={handleToggleFavorite}>
            <MaterialCommunityIcons
              name={
                favoriteList.some(fav => fav._id === product._id)
                  ? 'heart'
                  : 'heart-outline'
              }
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
          <TouchableOpacity
            onPress={() => setIsCollapsedMaterial(!isCollapsedMaterial)}>
            <Text style={styles.sectionToggle}>
              Chất liệu {isCollapsedMaterial ? '+' : '-'}
            </Text>
          </TouchableOpacity>
          {!isCollapsedMaterial && (
            <Text style={styles.sectionContent}>
              {product.material || 'Không có thông tin chất liệu'}
            </Text>
          )}

          <TouchableOpacity
            onPress={() => setIsCollapsedDetails(!isCollapsedDetails)}>
            <Text style={styles.sectionToggle}>
              Chi tiết {isCollapsedDetails ? '+' : '-'}
            </Text>
          </TouchableOpacity>
          {!isCollapsedDetails && (
            <Text style={styles.sectionContent}>
              {product.description || 'Không có thông tin chi tiết'}
            </Text>
          )}
        </View>

        <Text style={styles.sectionLabel}>Đánh giá</Text>
        <View style={styles.ratingRow}>
          {totalReviews > 0 && (
            <View style={styles.reviewSection}>
              {renderStars(averageRating)}
              <Text style={styles.reviewCountBold}>{averageRating}</Text>

              <Text style={styles.reviewCount}>({totalReviews})</Text>
            </View>
          )}
        </View>

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
    color: '#000',
  },
  disabled: {
    opacity: 0.5,
    textDecorationLine: 'line-through',
  },
  productImage: {
    width: width,
    height: 400,
    resizeMode: 'contain',
    marginRight: 10,
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
  reviewSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewCountBold: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#000000',
    marginLeft: 3,
  },
});

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
import {fetchUserInfo} from '../../redux/actions/actionUser';

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
  const userInfo = useSelector(state => state.user.userInfo) || {};

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
    const usersToFetch = productReviews
      .map(review => review.user_id)
      .filter(userId => userId && !userInfo[userId]);

    usersToFetch.forEach(userId => {
      dispatch(fetchUserInfo(userId));
      console.log(`Fetching user info for userId: ${userId}`); // Debug
    });
  }, [dispatch, productReviews]);

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

      // Cập nhật danh sách ảnh chỉ khi chọn màu, không phải khi thay đổi kích cỡ
      if (!selectedSize) {
        // Chỉ cập nhật khi màu được chọn lần đầu
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
    }
  }, [selectedColor, variants]); // Loại bỏ selectedSize khỏi dependencies

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
          <Text style={styles.sectionLabel}>Màu Sắc: </Text>
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
          <Text style={styles.sectionLabel}>Kích Cỡ: </Text>
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
              {userInfo[review.user_id] ? (
                <View style={styles.userInfoContainer}>
                  <Image
                    source={{uri: userInfo[review.user_id].avatar}}
                    style={styles.userAvatar}
                  />
                  <Text style={styles.userName}>
                    {userInfo[review.user_id].full_name}
                  </Text>
                </View>
              ) : (
                <Text>Loading user info...</Text>
              )}
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <Text style={styles.reviewComment}>Size: {review.size}</Text>
              <Text style={styles.reviewComment}>Màu: {review.color}</Text>
              <View style={styles.reviewSection}>
                {renderStars(review.rating)}
              </View>
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
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8, // Giảm từ 10 xuống 8 để tiết kiệm không gian
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8, // Giảm từ 10 xuống 8 để nhất quán với marginVertical
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#303030',
    marginHorizontal: 8,
  },
  ratingRow:{
    marginHorizontal:8,
    marginVertical:5
  },
  reviewSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewCountBold: {
    fontSize: 14,
    color: '#808080',
  },
  reviewCount: {
    fontSize: 12,
    color: '#27ae60',
    fontWeight:'500',
  },
  productImage: {
    width: 396,
    height: 248, // Giảm chiều cao ảnh để tiết kiệm không gian
    resizeMode: 'contain',
    borderRadius:10,
    marginBottom:25
  },
  row: {flexDirection: 'row', alignItems: 'center', marginBottom:14},

  sectionLabel: {
    fontSize: 15,
    color: '#303030',
    fontWeight:'500'
  },

  colorContainer: {flexDirection: 'row', marginLeft: 8},
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff', // Thêm màu nền trắng để tạo ra khoảng trắng
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#000',
  },


  disabled: {
    opacity: 0.5,
    textDecorationLine: 'line-through',
  },

  sizeContainer: {flexDirection: 'row', marginLeft: 8},
  sizeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 4,
  },
  selectedSize: {backgroundColor: '#ddd'},
  price: {fontSize: 20, fontWeight: 'bold', color: '#27ae60', marginVertical: 10},
  quantityRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 12},
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  quantityButtonText: {fontSize: 16, color: '#333'}, // Giảm từ 18 xuống 16
  quantityText: {marginHorizontal: 8, fontSize: 16, color: '#333'},
  stockText: {color: '#27ae60', fontSize: 14, marginBottom: 12},
  buttonsRow: {flexDirection: 'row', alignItems: 'center', marginTop: 12},
  addToCartButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  addToCartText: {color: '#fff', fontWeight: 'bold'},
  section: {marginVertical: 10},

  sectionToggle: {fontSize: 16, color: '#3498db', marginVertical: 4},
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
    fontSize: 15, // Giảm từ 16 xuống 15
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  responseText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 8,
    marginTop: 2,
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderColor: '#ddd',
  },

});

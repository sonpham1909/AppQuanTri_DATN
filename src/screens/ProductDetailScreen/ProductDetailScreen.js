import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Alert,
  Modal,
  Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductReviews } from '../../redux/actions/actionProduct';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { toggleFavorite } from '../../redux/actions/favoriteActions';
import { fetchProductReviewResponses } from '../../redux/actions/actionsReview';
import { fetchVariantsByProductId } from '../../redux/actions/actionsVariant';
import renderStars from '../../components/Home/renderStars';
import { fetchUserInfo } from '../../redux/actions/actionUser';
import { addTocCart } from '../../redux/actions/actionCart';


// Component chính của màn hình chi tiết sản phẩm
const ProductDetailScreen = ({ route, navigation }) => {
  // Lấy sản phẩm từ tham số route
  const { product } = route.params;

  // Tạo dispatch để gửi action đến Redux store
  const dispatch = useDispatch();




  // Tham chiếu đến FlatList để có thể cuộn đến vị trí ảnh mong muốn
  const flatListRef = useRef();

  // Lấy thông tin từ Redux store, bao gồm đánh giá, phản hồi đánh giá, danh sách yêu thích, biến thể sản phẩm, và thông tin người dùng
  const reviews = useSelector(state => state.products.reviews) || {};
  const { reviewResponses, isLoading, error } =
    useSelector(state => state.reviewResponses) || {};
  const favoriteList = useSelector(state => state.favorites.favoriteList) || [];
  const variants = useSelector(state => state.variants.variants[product._id] || []);
  const userInfo = useSelector(state => state.user.userInfo) || {};

  // Các biến trạng thái để quản lý trạng thái giao diện, như màu sắc, kích cỡ được chọn, số lượng sản phẩm, danh sách hình ảnh, v.v.
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [allImages, setAllImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCollapsedMaterial, setIsCollapsedMaterial] = useState(true);
  const [isCollapsedDetails, setIsCollapsedDetails] = useState(true);
  const [selectedColorM, setSelectedColorM] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const scaleValue = useRef(new Animated.Value(0)).current;

  // Các biến được suy ra từ dữ liệu Redux và trạng thái, dùng để hiển thị tổng số đánh giá và đánh giá trung bình
  const productReviews = reviewResponses[product._id] || [];
  const totalReview = reviews[product._id] || {};
  const totalReviews = totalReview.totalReviews || 0;
  const averageRating = totalReview.averageRating
    ? totalReview.averageRating.toFixed(1)
    : '0.0';

  // Sử dụng useEffect để lấy dữ liệu khi component được mount
  useEffect(() => {
    // Lấy danh sách đánh giá của sản phẩm
    dispatch(fetchProductReviews(product._id));
    // Lấy phản hồi cho các đánh giá
    dispatch(fetchProductReviewResponses(product._id));
    // Lấy danh sách biến thể của sản phẩm (màu sắc, kích cỡ)
    dispatch(fetchVariantsByProductId(product._id));
  }, [dispatch, product._id]);

  // Lấy thông tin người dùng cho các đánh giá chưa có thông tin
  useEffect(() => {
    const usersToFetch = productReviews
      .map(review => review.user_id)
      .filter(userId => userId && !userInfo[userId]);
    // Lọc ra danh sách người dùng cần lấy thông tin, tránh lấy thông tin lặp lại

    usersToFetch.forEach(userId => {
      // Gửi action để lấy thông tin người dùng cho từng userId
      dispatch(fetchUserInfo(userId));
    });
  }, [dispatch, productReviews, userInfo]);

  // Cập nhật danh sách kích cỡ khả dụng và hình ảnh khi màu sắc hoặc biến thể thay đổi
  useEffect(() => {
    if (variants.length > 0) {
      // Nếu có biến thể, chọn màu đầu tiên nếu chưa có màu nào được chọn
      if (!selectedColor) {
        setSelectedColor(variants[0].color_code);
      }

      // Lấy danh sách kích cỡ khả dụng cho màu sắc được chọn
      const sizesForColor = getSizesForColor(variants, selectedColor);
      setAvailableSizes(sizesForColor);

      if (sizesForColor.length > 0) {
        // Nếu chưa có kích cỡ nào được chọn, chọn kích cỡ đầu tiên
        setSelectedSize(selectedSize || sizesForColor[0].size);
        const selectedSizeObj = sizesForColor.find(
          sizeObj => sizeObj.size === (selectedSize || sizesForColor[0].size),
        );
        // Cập nhật số lượng tối đa có thể mua của kích cỡ được chọn
        setMaxQuantity(selectedSizeObj ? selectedSizeObj.quantity : 0);
      } else {
        setMaxQuantity(0);
      }

      // Nếu chưa có kích cỡ nào được chọn, cập nhật danh sách hình ảnh
      if (!selectedSize) {
        updateAllImages(variants, selectedColor, product.imageUrls);
      }
    }
  }, [selectedColor, variants]);

  // Các hàm trợ giúp để lấy kích cỡ cho màu sắc và cập nhật hình ảnh
  const getSizesForColor = (variants, color) => {
    // Trả về danh sách kích cỡ và số lượng cho màu sắc đã chọn
    return variants
      .filter(v => v.color_code === color)
      .flatMap(v => v.sizes)
      .map(sizeObj => ({
        size: sizeObj.size,
        quantity: sizeObj.quantity,
      }));
  };

  const updateAllImages = (variants, color, defaultImages) => {
    // Cập nhật danh sách hình ảnh cho màu sắc đã chọn
    const selectedVariant = variants.find(v => v.color_code === color);
    const newAllImages = [selectedVariant?.image, ...defaultImages].filter(Boolean);
    setAllImages(newAllImages);

    if (selectedVariant) {
      const index = newAllImages.findIndex(image => image === selectedVariant.image);
      if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({ index, animated: false });
      }
    }
  };

  // Xử lý khi người dùng muốn thêm hoặc bỏ sản phẩm khỏi danh sách yêu thích
  const handleToggleFavorite = () => dispatch(toggleFavorite(product._id));


  //Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    const variant = variants.find(variant => variant.color_code === selectedColor);
    const cartData = {
      productId: product._id,
      color: variant?.color,
      size: selectedSize,
      quantity: quantity,
      variantId: variant?._id,
    };

    dispatch(addTocCart(cartData))
      .then(() => {
        setModalVisible(true); // Hiện modal khi thêm thành công
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }).start();
        setTimeout(() => {
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setModalVisible(false));
        }, 2000);
      })
      .catch(error => {
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng, vui lòng thử lại.');
        console.error('Error adding to cart:', error);
      });
  };

  // Kiểm tra xem kích cỡ có khả dụng không
  const isSizeAvailable = size => {
    return availableSizes.some(sizeObj => sizeObj.size === size && sizeObj.quantity > 0);
  };

  // Xử lý khi người dùng chọn màu sắc, cập nhật màu đã chọn và danh sách hình ảnh
  const handleColorSelect = variant => {
    setSelectedColor(variant.color_code);
    const color = variants.find(variant => variant.color_code === selectedColor)?.color;
    setSelectedColorM(color);
    console.log(color);

    updateAllImages(variants, variant.color_code, product.imageUrls);
  };

  // Xử lý khi người dùng chọn kích cỡ, cập nhật kích cỡ và số lượng tối đa
  const handleSizeSelect = sizeObj => {
    if (isSizeAvailable(sizeObj.size)) {
      setSelectedSize(sizeObj.size);
      setMaxQuantity(sizeObj.quantity);
    }
  };

  // Cập nhật chỉ mục của hình ảnh hiện tại khi người dùng cuộn qua danh sách hình ảnh
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentImageIndex(viewableItems[0].index);
    }
  }).current;

  // Cấu hình mức độ hiển thị cần thiết để kích hoạt sự kiện cuộn của FlatList
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // Render chính của màn hình chi tiết sản phẩm
  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{product.name}</Text>
        {totalReviews > 0 && renderReviewSummary()}
        {renderImages()}
        {renderColorOptions()}
        {renderSizeOptions()}
        {renderPrice()}
        {renderQuantitySelector()}
        {renderButtons()}
        {renderDescription()}
        {renderReviews()}

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
              <MaterialCommunityIcons
                name="check-circle"
                size={50}
                color="#27ae60"
                style={{ marginBottom: 10 }}
              />
              <Text style={styles.modalText}>Sản phẩm đã được thêm vào giỏ hàng thành công!</Text>
              <TouchableOpacity
                style={styles.viewCartButton}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Cart');
                }}>
                <Text style={styles.viewCartButtonText}>Xem giỏ hàng</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );

  // Các hàm render để hiển thị các phần khác nhau của màn hình chi tiết sản phẩm
  function renderImages() {
    // Hàm render hình ảnh sản phẩm
    return allImages.length > 0 ? (
      <>
        <FlatList
          ref={flatListRef}
          data={allImages}
          horizontal
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item }} style={styles.productImage} />
            </View>
          )}
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
        <Text style={styles.imageIndexText}>
          {currentImageIndex + 1} / {allImages.length}
        </Text>
      </>
    ) : (
      <Text>Không có ảnh sản phẩm nào để hiển thị.</Text>
    );
  }

  function renderColorOptions() {
    // Hàm render các tùy chọn màu sắc sản phẩm
    return (
      <View>
        

        <View style={styles.colorContainer}>
          {variants.map((variant, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.colorCircleWrapper,
                selectedColor === variant.color_code &&
                  styles.selectedColorWrapper,
              ]}
              onPress={() => handleColorSelect(variant)}>
              <View
                style={[
                  styles.colorCircle,
                  {backgroundColor: variant.color_code},
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          <Text style={styles.sectionLabel}>Màu Sắc: </Text>
          {selectedColor && (
            <Text style={styles.selectedColorName}>
              {
                variants.find(variant => variant.color_code === selectedColor)
                  ?.color
              }
            </Text>
          )}
        </View>
      </View>
    );
  }
  function renderSizeOptions() {
    // Hàm render các tùy chọn kích cỡ sản phẩm
    return (
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
              onPress={() => handleSizeSelect(sizeObj)}>
              <Text style={styles.sizeText}>{sizeObj.size}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  function renderQuantitySelector() {
    // Hàm render phần chọn số lượng sản phẩm
    return (
      <View>
        <View style={styles.quantityRow}>
          <Text style={styles.sectionLabel}>Số Lượng: </Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity(Math.min(maxQuantity, quantity + 1, 10))}
              style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.stockText}>Còn {maxQuantity} sản phẩm</Text>
      </View>
    );
  }

  function renderPrice() {
    // Hàm render giá sản phẩm
    return (
      <Text style={styles.price}>{`${(product.price * quantity).toLocaleString()} VND`}</Text>
    );
  }

  function renderButtons() {
    // Hàm render các nút (yêu thích và thêm vào giỏ hàng)
    return (
      <View style={styles.buttonsRow}>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <View style={styles.favoriteButton}>
            <MaterialCommunityIcons
              name={
                favoriteList.some(fav => fav._id === product._id)
                  ? 'heart'
                  : 'heart-outline'
              }
              size={22}
              color="#27ae60"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Thêm Giỏ Hàng</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderDescription() {
    // Hàm render phần mô tả, chất liệu và chi tiết sản phẩm
    return (
      <View style={styles.section}>
        <Text style={styles.sectionPainted}>Mô tả</Text>

        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIsCollapsedMaterial(!isCollapsedMaterial)}>
          <Text style={styles.sectionLabel}>Chất liệu</Text>
          <MaterialCommunityIcons
            name={isCollapsedMaterial ? 'chevron-down' : 'chevron-up'}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
        {!isCollapsedMaterial && (
          <Text style={styles.sectionContent}>
            {product.material || 'Không có thông tin chất liệu'}
          </Text>
        )}

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIsCollapsedDetails(!isCollapsedDetails)}>
          <Text style={styles.sectionLabel}>Chi tiết</Text>
          <MaterialCommunityIcons
            name={isCollapsedDetails ? 'chevron-down' : 'chevron-up'}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
        {!isCollapsedDetails && (
          <Text style={styles.sectionContent}>
            {product.description || 'Không có thông tin chi tiết'}
          </Text>
        )}

        <View style={styles.separator} />
      </View>
    );
  }

  function renderReviewSummary() {
    // Hàm render phần tóm tắt đánh giá sản phẩm
    return (
      <View style={styles.reviewSection1}>
        {renderStars(averageRating)}
        <Text style={styles.reviewCount}>({totalReviews})</Text>
      </View>
    );
  }

  function renderReviews() {
    // Hàm render chi tiết các đánh giá sản phẩm
    if (totalReviews === 0) return null;

    return (
      <>
        <Text style={styles.sectionLabelReview}>Đánh giá</Text>
        <View style={styles.ratingRow}>
          <View style={styles.reviewSection}>
            {renderStars(averageRating)}
            <Text style={styles.reviewCountBold}>{averageRating}</Text>
            <Text style={styles.reviewCount}>({totalReviews})</Text>
          </View>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          productReviews.map((review, index) => renderReviewItem(review, index))
        )}
      </>
    );
  }

  function renderReviewItem(review, index) {
    // Hàm render một mục đánh giá của sản phẩm
    const formattedDate = new Date(review.createdAt).toLocaleDateString('vi-VN');

    return (
      <View
        key={review._id}
        style={[
          styles.reviewContainer,
          index === productReviews.length - 1 && styles.noBorder,
        ]}>
        {userInfo[review.user_id] ? (
          <View style={styles.userInfoContainer}>
            <Image
              source={{ uri: userInfo[review.user_id].avatar }}
              style={styles.userAvatar}
            />
            <Text style={styles.userName}>{userInfo[review.user_id].full_name}</Text>
          </View>
        ) : (
          <Text>Loading user info...</Text>
        )}
        <View style={styles.reviewSection}>
          {renderStars(review.rating)}
          <Text style={styles.reviewDate}>{formattedDate}</Text>
        </View>
        <Text style={styles.reviewComment}>Size: {review.size}</Text>
        <Text style={styles.reviewComment}>Màu: {review.color}</Text>
        <Text style={styles.reviewComment}>{review.comment}</Text>
       
        {review.responses?.map(response => (
          <Text key={response._id} style={styles.responseText}>
            Phản hồi từ người bán: {response.comment}
          </Text>
        ))}
      </View>
    );
  }
};

export default ProductDetailScreen;


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  detailsContainer: { padding: 16 },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#303030',
    marginVertical: 5,
  },
  reviewSection1: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  reviewCountBold: { fontSize: 14, color: '#808080' },
  reviewCount: { fontSize: 12, color: '#27ae60', fontWeight: '500' },
  productImage: {
    width: 396,
    height: 248,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 25,
  },
  imageContainer: {
    backgroundColor: '#f0f0f0', // Nền màu xám cho container
    borderRadius: 12, // Bo góc cho container
    overflow: 'hidden', // Đảm bảo ảnh không vượt ra khỏi container
    marginVertical: 16,
    height: 250, // Đặt chiều cao của container ảnh
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageIndexText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },

  sectionLabel: {
    fontSize: 15,
    color: '#303030',
    fontWeight: '500',
  },

  colorContainer: {
    flexDirection: 'row',
    marginBottom:5
  },
  colorCircleWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:7,
    marginLeft:-3
  },
  selectedColorWrapper: {
    borderWidth: 2,
    borderColor: '#000', // Màu viền ngoài khi màu được chọn
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15, // Đảm bảo hình tròn hoàn hảo
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff', // Màu nền trắng để tạo khoảng trắng rõ ràng
  },

  disabled: {
    opacity: 1.5,
    textDecorationLine: 'line-through',
  },
  selectedColorName: {
    marginRights: 10,
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },

  sizeContainer: { flexDirection: 'row', marginLeft: 8 },
  sizeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 4,
  },
  selectedSize: { backgroundColor: '#ddd' },
  price: { fontSize: 20, fontWeight: 'bold', color: '#27ae60', marginBottom: 15 },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  quantityButton: {
    width: 30, // Đặt chiều rộng cố định
    height: 30, // Đặt chiều cao cố định
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  stockText: {
    color: '#27ae60',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },

  favoriteButton: {
    width: 50, // Chiều rộng và chiều cao cố định để tạo hình tròn
    height: 50,
    borderRadius: 10, // Bo góc tròn để tạo thành hình tròn
    backgroundColor: '#F0F0F0', // Màu nền nhẹ nhàng giúp nổi bật icon trái tim
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Thêm đổ bóng để nổi bật
  },
  addToCartButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },

  section: {
    marginVertical: 10,
  },
  sectionPainted: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Đặt icon và tiêu đề căn đều hai bên
    paddingVertical: 8,
  },

  sectionContent: {
    fontSize: 14,
    color: '#666',
    paddingVertical: 8,
    paddingLeft: 16, // Thụt lề để phần nội dung dễ phân biệt
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginVertical: 8, // Tạo khoảng cách giữa các phần
  },

  sectionLabelReview: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    paddingBottom: 10,
  },
  reviewSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    justifyContent: 'space-between',
  },
  reviewCountBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#888',
    marginLeft: 4,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 12, // Đặt khoảng cách giữa các item
  },
  noBorder: {
    borderBottomWidth: 0, // Bỏ đường kẻ cho item cuối cùng
  },

  reviewComment: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
  },
  responseText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 8,
    marginTop: 4,
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderColor: '#ddd',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  viewCartButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  viewCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  colorCircleWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:7,
    marginLeft:-3
  },
  selectedColorName: {
    marginRights: 10,
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});
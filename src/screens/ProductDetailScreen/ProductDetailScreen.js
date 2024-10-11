import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import toggleProductImage from '../../components/DetailProduct/toggleProductImage'
import DetailProduct from '../../components/DetailProduct/toggleProductImage';
const ProductDetailScreen = ({navigation}) => {
  const [selectedColor, setSelectedColor] = useState('gray');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isCollapsedMaterial, setIsCollapsedMaterial] = useState(true);
  const [isCollapsedDetails, setIsCollapsedDetails] = useState(true);
  const colors = ['gray', 'orange', 'blue', 'navy'];
  const sizes = ['S', 'M', 'L', 'XL'];
  // Hàm để thay đổi trạng thái mở/đóng
  const toggleCollapse = () => {
    setIsCollapsedMaterial(!isCollapsedMaterial);
  };
  const toggleCollapse2 = () => {
    setIsCollapsedDetails(!isCollapsedDetails);
  };

// Hàm để hiển thị các ngôi sao đánh giá
const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <Image
        key={i}
        source={require('../../assets/images/home_start.png')} // Đường dẫn đến ảnh ngôi sao của bạn
        style={styles.starIcon}
      />
    );
  }
  return stars;
};

const ReviewItem = ({ user, rating, comment, size, fit ,date}) => {
  return (
    <View style={styles.reviewContainer}>
      {/* Thông tin người dùng */}
      <Text style={styles.userName}>{user}</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      {/* Dòng ngôi sao và đánh giá */}
      <View style={styles.ratingRow}>
        <View style={styles.starsContainer}>{renderStars(rating)}</View>
      </View>
      <Text style={styles.dateText}>{date}</Text>
</View>
      {/* Kích cỡ và thông tin phù hợp */}
      <Text style={styles.sizeText}>Kích cỡ đã mua: {size}</Text>
      <Text style={styles.fitText}>Quần áo có vừa không: {fit}</Text>

      {/* Bình luận */}
      <Text style={styles.commentText}>{comment}</Text>
    </View>
  );
};

const Image1 = () => {
  // Mảng chứa các hình ảnh
  const images = [
    require('../../assets/images/item_1.png'),
    require('../../assets/images/item_2.png'),
    require('../../assets/images/item_3.png'),
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Hàm để tự động thay đổi ảnh sau 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3000ms = 3 giây
  
    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={images[currentImageIndex]} style={styles.productImage} />
      </View>
      {/* Các thành phần khác */}
    </ScrollView>
  );
  };
const ReviewsSection = () => {
  const reviews = [
    {
      user: 'Việt Vũ',
      rating: 5,
      size: 'S',
      fit: 'Đúng với kích thước',
      comment: 'Áo đẹp quá đà',
      date:'09/09/2024'
    },
    {
      user: 'Việt Vũ',
      rating: 5,
      size: 'S',
      fit: 'Đúng với kích thước',
      comment: 'Áo đẹp quá đà',
      date:'09/09/2024'

    },
    // Thêm các đánh giá khác tại đây nếu cần
  ];
  return (
    <View style={styles.reviewsSection}>
      <Text style={styles.sectionTitle}>Đánh Giá</Text>
      <View style={styles.ratingRow}>
        <View style={styles.starsContainer}>{renderStars(5)}</View>
        <Text style={styles.ratingText}>5.0</Text>
        
      </View>
      <View style={{height:10}}></View>

      <View  style={styles.collapsibleHeader}></View>
      <View style={{height:10}}></View>
      {reviews.map((review, index) => (
        <ReviewItem key={index} {...review} />
      ))}
    </View>
  );
};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>Áo Dài Tay</Text>
        <View style={styles.ratingRow}>
        <View style={styles.starsContainer}>{renderStars(5)}</View>
        <Text style={styles.ratingText}>5.0</Text>
        
      </View>
        
        <View style={styles.imageContainer}>
        <Image1></Image1>
        </View>

        {/* Color Selection */}
        <View style={styles.row}>
          <Text style={styles.label}>Màu Sắc: </Text>
          <View style={styles.colorContainer}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorCircle,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColor,
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>

        {/* Size Selection */}
        <View style={styles.row}>
          <Text style={styles.label}>Kích Cỡ: </Text>
          <View style={styles.sizeContainer}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSize,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={styles.sizeText1}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price */}
        <Text style={styles.price}>199.000 </Text>

        {/* Quantity and Add to Cart */}
        <View style={styles.quantityRow}>
          <Text style={styles.label}>Số Lượng: </Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.stockText}>Còn 24 sản phẩm</Text>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.favoriteButton}>
          <Image
              source={require('../../assets/images/detail_favorite.png')} 
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.addToCartButton}onPress={()=>navigation.navigate('Cart')}>
            <Text style={styles.addToCartText}>Thêm Giỏ Hàng</Text>
          </TouchableOpacity>
        </View>
        <View style={{height:15}}></View>

        <Text style={styles.label}>Mô tả </Text>
          <View style={{height:15}}></View>
        <View  style={styles.collapsibleHeader}></View>

        {/* Collapsible Section: Material */}
        <View style={styles.collapsibleRow}>
       
          <Text style={styles.collapsibleHeaderText}>Chất liệu</Text>
          
        <View>
        <DetailProduct toggleCollapse={toggleCollapse} />
        </View>
        </View>
        {!isCollapsedMaterial && (
          <View style={styles.collapsibleContent}>
            <Text>Vải mịn co giãn 4 chiều xịn xò nhé</Text>
          </View>
        )}
          <View  style={styles.collapsibleHeader}></View>
        {/* Collapsible Section: Details */}
        <View style={styles.collapsibleRow}>
    
          <Text style={styles.collapsibleHeaderText}>Chi tiết</Text>
          <View>
        <DetailProduct toggleCollapse={toggleCollapse2} />
        </View>
        </View>
        {!isCollapsedDetails && (
          <View style={styles.collapsibleContent}>
            <Text>Chi tiết sản phẩm...</Text>
          </View>
        )}
          <View  style={styles.collapsibleHeader}></View>

        {/* Reviews Section */}
   <ReviewsSection></ReviewsSection>
   </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  productTitle: {
    paddingTop:30,
    fontSize: 24,
    fontWeight: 'bold',
    color:'#303030'
  },
  rating: {
    fontSize: 16,
    color: '#777',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    color:'#303030',
    fontSize: 16,
    fontWeight: '500',
  },
  colorContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#000',
  },
  sizeContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  sizeButton: {
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    marginHorizontal: 5,
    width: 30,
    height: 30,
  },
  selectedSize: {
    borderColor: '#000',
    backgroundColor: '#00A65E',
  },

  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#00A65E',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  quantityButton: {
    backgroundColor: '#00A65E',
    borderRadius: 12,
    marginHorizontal: 10,
    width: 25,
    height: 25,
    alignItems:'center',
    justifyContent:'center'
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
       alignItems:'center',
    justifyContent:'center'
  },
  quantityText: {
    fontSize: 18,
    fontWeight:'600'
  },
  stockText: {
    fontSize: 16,
    color: '#007B00',
    marginVertical: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  favoriteButton: {
    width: 60,
    height: 60,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#00A65E',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonIcon: {
    width: 30,
    height: 30,
  },
  collapsibleHeader: {
    flex:1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  collapsibleHeaderText: {
    fontSize: 16,
    fontWeight: '400',
    color:'#303030'
  },
  collapsibleContent: {
    paddingVertical: 10,
  },
  reviewsContainer: {
    marginVertical: 20,
  },
 
  reviewItem: {
    marginVertical: 5,
  },
  reviewText: {
    fontSize: 14,
  },
  containercollap:{
    flex:1
  },
  collapsibleRow: {
    flexDirection: 'row', // Sắp xếp theo hàng ngang
    justifyContent: 'space-between', // Đưa "DetailProduct" sang phải
    alignItems: 'center', // Căn giữa theo trục dọc
    marginVertical: 10,
  },
  reviewsSection: {
    paddingTop:30,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color:'#303030'

  },
  reviewContainer: {
    flex:1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 10,
  },
  userName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,
    color:'#303030'

  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  starIcon: {
    width: 18,
    height: 18,
    marginRight: 2,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  ratingText: {
    fontSize: 18,
    color: '#777',
  },
  dateText: {
    fontSize: 13,
    color: '#777',
  },
  sizeText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 3,
  },
  sizeText1: {
    fontSize: 13,
    color: 'black',
  },
  fitText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 18,
    color:'#303030'

  },
});

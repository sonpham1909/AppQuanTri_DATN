import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import cateClotherStyles from '../../styles/cateClotherStyles';
import renderStars from '../Home/renderStars';

// Hàm để hiển thị danh sách sản phẩm
const ProductList = ({ title, products, onProductPress }) => (
  <View style={cateClotherStyles.productSection}>
   
    <FlatList
      horizontal 
      data={products}
      keyExtractor={(item) => item.id.toString()} // Đảm bảo ID là chuỗi
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onProductPress(item)} style={cateClotherStyles.productItem}>
          {/* Hình ảnh sản phẩm */}
          <Image source={item.image} style={cateClotherStyles.productImage} />

          {/* Đánh giá sao */}
          <View style={cateClotherStyles.ratingContainer}>
            {renderStars(item.rating)}
            <Text style={cateClotherStyles.ratingCount}>({item.rating})</Text>
          </View>

          {/* Tên sản phẩm */}
          <Text style={cateClotherStyles.productName}>{item.name}</Text>

          {/* Giá sản phẩm */}
          <Text style={cateClotherStyles.productPrice}>{item.price} đ</Text>

          {/* Số lượng đánh giá */}
          <View style={cateClotherStyles.reviewContainer}>
            <Image source={require('../../assets/images/home_cmt.png')} style={cateClotherStyles.reviewIcon} />
            <Text style={cateClotherStyles.reviewCount}>2</Text> 
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);

export default ProductList;

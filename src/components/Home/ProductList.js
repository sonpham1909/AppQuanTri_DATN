import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import homeStyles from '../../styles/homeStyles';
import renderStars from '../Home/renderStars';
import { useNavigation } from '@react-navigation/native';

// Hàm để hiển thị danh sách sản phẩm
const ProductList = ({ navigation,title, products }) => (

  <View style={homeStyles.productSection}>
    <View style={homeStyles.sectionHeader}>
      <Text style={homeStyles.sectionTitle}>{title}</Text>
  <TouchableOpacity onPress={()=> navigation.navigate('AllProductScreen', { category: products })}>
        <Text style={homeStyles.viewAll}>Tất Cả</Text>
      </TouchableOpacity>
    </View>
    <FlatList
      horizontal 
      data={products}
      keyExtractor={(item) => item.id.toString()} // Đảm bảo ID là chuỗi
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>navigation.navigate('ProductDetailScreen',{item:item})} style={homeStyles.productItem}>
          {/* Hình ảnh sản phẩm */}
          <Image source={item.image} style={homeStyles.productImage} />

          {/* Đánh giá sao */}
          <View style={homeStyles.ratingContainer}>
            {renderStars(item.rating)}
            <Text style={homeStyles.ratingCount}>({item.rating})</Text>
          </View>

          {/* Tên sản phẩm */}
          <Text style={homeStyles.productName}>{item.name}</Text>

          {/* Giá sản phẩm */}
          <Text style={homeStyles.productPrice}>{item.price} đ</Text>

          {/* Số lượng đánh giá */}
          <View style={homeStyles.reviewContainer}>
            <Image source={require('../../assets/images/home_cmt.png')} style={homeStyles.reviewIcon} />
            <Text style={homeStyles.reviewCount}>2</Text> 
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);

export default ProductList;

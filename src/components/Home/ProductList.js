import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import renderStars from '../Home/renderStars';

const ProductList = ({ navigation, title, products }) => (
  <View style={styles.productSection}>
    {/* Hiển thị tiêu đề danh mục sản phẩm */}
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('AllProductScreen', { category: products })}>
        <Text style={styles.viewAll}>Tất Cả</Text>
      </TouchableOpacity>
    </View>

    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductDetailScreen', { item: item })
          }
          style={styles.productItem}>
          {/* Hình ảnh sản phẩm */}
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.productImage} />

            {/* Icon yêu thích */}
            <TouchableOpacity style={styles.favoriteIcon}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={22}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {/* Màu sắc */}
          <View style={styles.colorOptions}>
            {item.colors && item.colors.length > 0 ? (
              item.colors.map((color, index) => (
                <View
                  key={index}
                  style={[styles.colorSquare, { backgroundColor: color }]}
                />
              ))
            ) : (
              <Text></Text>
            )}
          </View>

          {/* Kích cỡ và giới tính */}
          <View style={styles.sizeGenderContainer}>
            <Text style={styles.productGender}>XS - </Text>
            <Text style={styles.productSize}>{item.size}</Text>
          </View>

          {/* Tên sản phẩm */}
          <Text style={styles.productName}>{item.name}</Text>

          {/* Giá sản phẩm */}
          <Text style={styles.productPrice}>
            {item.price.toLocaleString('vi-VN')} VND
          </Text>

          {/* Đánh giá sao */}
          <View style={styles.ratingContainer}>
            {renderStars(item.rating)}
            <Text style={styles.ratingCount}>({item.ratingCount})</Text>
          </View>

        </TouchableOpacity>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

export default ProductList;

const styles = {
  productSection: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row', // Căn ngang
    justifyContent: 'space-between', // Đẩy tiêu đề sang trái và nút sang phải
    alignItems: 'center', // Căn giữa theo chiều dọc
    marginBottom: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00A65E',
    },
  productItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 10,
    width: 150,
    height: 290,

    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#e0e0e0', // Đảm bảo nền trắng cho container
  },
  productImage: {
    width: 160,
    height: 150,
    borderRadius: 8,
    resizeMode: 'contain', // Đảm bảo ảnh hiển thị đúng kích thước mà không bị kéo dài
  },
  favoriteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  sizeGenderContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  productGender: {
    fontSize: 12,
    color: '#999',
    marginLeft: 10,
  },
  productSize: {
    fontSize: 12,
    color: '#999',
  },
  productName: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    marginLeft: 10,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingCount: {
    fontSize: 12,
    color: '#999',
    marginLeft: 5,
  },
  colorOptions: {
    marginLeft: 10,
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
  colorSquare: {
    marginRight: 5,
    width: 15,
    height: 15,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
};

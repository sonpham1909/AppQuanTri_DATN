import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchtProductById } from '../../redux/actions/actionProduct';
import handleProductPress from '../AllProduct/handleProductPress';

const CartItem = ({ item, onIncrease, onDecrease, onRemove, navigation }) => {

  const dispatch = useDispatch();
  const product = useSelector(state => state.products.productById);

  const handleFetchProduct = () => {
    dispatch(fetchtProductById(item.product_id._id))
      .unwrap() // Nếu bạn dùng Redux Toolkit, `unwrap()` giúp lấy kết quả từ Promise của thunk
      .then(itemProduct => {
        navigation.navigate('ProductDetailScreen', { product: itemProduct });
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  };
  
 
  
  return (
    <TouchableOpacity onPress={handleFetchProduct}>
      <View style={styles.cartItem}>
      <Image source={{uri:item.image_variant}} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name} - ({item.color})</Text>
        <Text style={styles.itemPrice}>{item.price.toLocaleString()} VND</Text>
        <Text style={styles.itemSize}>Size - {item.size}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => onDecrease(item._id)} style={styles.quantityButton}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => onIncrease(item._id)} style={styles.quantityButton}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        {/* Add to Cart Button */}
    

        <TouchableOpacity onPress={onRemove}>
        <Image source={require('../../assets/images/icon_delete.png')}/>
        </TouchableOpacity>

        {/* Remove from Favorites Button */}
      
      </View>
      <View style={styles.separator}></View>

    </View>
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,  
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontFamily:'Nunito Sans',
    fontSize: 14,
    color: '#999999',
  },
  itemPrice: {
    fontFamily:'Nunito Sans',
    fontSize: 16,
    color: '#242424',
    fontWeight: 'bold',
    marginTop: 4,

  },
  itemSize: {
    fontSize: 13,
    color: '#00A65E',
    marginTop: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonsContainer: {
    justifyContent:'flex-start',
    margin:5
  },

  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
  },
  quantityText: {
    fontSize: 18,
  },
  quantityValue: {
    marginHorizontal: 10,
    fontFamily:'Nunito Sans',
    fontSize: 16,
    color: '#242424',
    fontWeight: 'bold',

  },
  separator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal:20,
    height: 1,  // Adjust the thickness of the line
    backgroundColor: '#E0E0E0',  // Light grey color to resemble the white line in the image
  },
  
 
});

export default CartItem;

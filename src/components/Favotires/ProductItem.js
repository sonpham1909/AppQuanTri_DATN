import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const FavoriteItem = ({ product, onRemove, onCartAdd }) => {
  return (
    <View style={styles.container}>
      {/* Product Image */}
      <Image source={product.image} style={styles.image} />

      {/* Product Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price} VND</Text>
      </View>

      {/* Buttons Container (stacked vertically) */}
      <View style={styles.buttonsContainer}>
        {/* Add to Cart Button */}
        <TouchableOpacity onPress={onRemove} style={styles.bgrcart}>
        <Image source={require('../../assets/images/icon_shoping.png')} style={styles.cartIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onRemove} style={styles.icon}>
        <Image source={require('../../assets/images/icon_delete.png')}/>
        </TouchableOpacity>

        {/* Remove from Favorites Button */}
      
      </View>
      <View style={styles.separator}></View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,  
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 5,
  },
  productName: {
    fontFamily:'Nunito Sans',
    fontSize: 14,
    color: '#606060',
  },
  productPrice: {
    fontFamily:'Nunito Sans',
    fontSize: 16,
    color: '#303030',
    fontWeight: 'bold',
    marginTop: 4,
  },
  buttonsContainer: {
    flexDirection: 'column',  // Stack buttons vertically
    justifyContent: 'space-between',
    alignItems:'center'
  },
 
  cartIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  bgrcart: {
    width:34,
    height:34,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    padding: 5,
    justifyContent:'center',
    alignItems:'center'
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom:9
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal:10,
    height: 1,  // Adjust the thickness of the line
    backgroundColor: '#E0E0E0',  // Light grey color to resemble the white line in the image
  },
});

export default FavoriteItem;


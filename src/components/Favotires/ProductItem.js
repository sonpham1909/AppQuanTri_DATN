import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icon

const FavoriteItem = ({ product, onRemove, onCartAdd }) => {
  return (
    <View style={styles.container}>
    
      <Image source={product.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price} VND</Text>
      </View>

      <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={onRemove} style={styles.loveIconContainer}>
        <MaterialCommunityIcons 
          name="heart" 
          size={24} 
          color="red" // Màu đỏ cho icon love
        />
      </TouchableOpacity>
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
  loveIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
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
    fontFamily: 'Nunito Sans',
    fontSize: 14,
    color: '#606060',
  },
  productPrice: {
    fontFamily: 'Nunito Sans',
    fontSize: 16,
    color: '#303030',
    fontWeight: 'bold',
    marginTop: 4,
  },
  buttonsContainer: {
    flexDirection: 'column',  // Stack buttons vertically
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  separator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 10,
    height: 1,  // Adjust the thickness of the line
    backgroundColor: '#E0E0E0',  // Light grey color to resemble the white line in the image
  },
});

export default FavoriteItem;

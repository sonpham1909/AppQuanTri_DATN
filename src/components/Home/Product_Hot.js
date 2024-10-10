import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Product_Hot = ({
  category,
  productName,
  price,
  imageSource,
  rating,
  onPress,
  onPress1,
}) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i < rating ? 'star' : 'star-o'}
          size={14}
          color="#FFD700"
          style={styles.star}
        />
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.ratingContainer}>{renderStars(rating)}</View>

        <Text style={styles.productName}>{productName}</Text>
        <Text style={styles.price}>{price} đ</Text>
      
      </View>
    </TouchableOpacity>
  );
};

export default Product_Hot;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    margin: 10,
    width: 150,
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F01B1B',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#006400',
    width: 25,
    height: 25,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  star: {
    marginRight: 2,
  },
});

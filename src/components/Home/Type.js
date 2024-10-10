import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const Type = ({imageSource, productName,onPress}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={styles.productContainer}>
      <View style={styles.circle}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <Text style={styles.productName}>{productName}</Text>
    </TouchableOpacity>
  );
};

export default Type;

const styles = StyleSheet.create({
  productContainer: {
    paddingLeft: 30,
    
  },
  circle: {
    height: 60,
    width:62,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 40,
    backgroundColor: '#DDDDDD',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  productName: {
    textAlign: 'center',
  },
});

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const Footer = () => {
  const navigation = useNavigation();  // Hook for navigation

  const handleAddToCart = () => {
    // Navigate to Cart screen
    navigation.navigate('Cart');
  };
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
      <Text style={styles.buttonText}>Thêm tất cả</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  button: {
    width:350,
    height:50,
    backgroundColor: '#00A65E',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 10,
  },
  buttonText: {
    fontFamily:'Nunito Sans',
    color: 'white',
    fontSize: 18,
  },
});

export default Footer;

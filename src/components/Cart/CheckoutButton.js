import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const CheckoutButton = () => {
    const navigation = useNavigation();  // Hook for navigation

  const handleAddToCart = () => {
    // Navigate to Cart screen
    navigation.navigate('Checkout');
  };
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.checkoutButton}onPress={handleAddToCart}>
        <Text style={styles.checkoutButtonText}>Thanh toán tất cả</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  checkoutButton: {
    width: 350,
    height: 50,
    backgroundColor: '#00A65E',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  checkoutButtonText: {
    fontFamily: 'Nunito Sans',
    color: 'white',
    fontSize: 18,
  },
});

export default CheckoutButton;

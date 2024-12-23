import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonAdd = ({ title, onPress }) => {

  const handleAddToCart = () => {
    // Navigate to Cart screen
  };
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
        button: {
          backgroundColor: '#00A65E',
          paddingVertical: 15,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 40,
          marginHorizontal:30
        },
        buttonText: {
            fontFamily: 'Nunito Sans',
            color: 'white',
            fontSize: 18,
        },
      
      
});

export default ButtonAdd;

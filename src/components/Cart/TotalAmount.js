import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { darkTheme,lightTheme } from '../../utils/theme';

const TotalAmount = ({ total }) => {
  const {isDarkMode} = useTheme()
  return (
    <View style={styles.totalContainer}>
      <Text style={[styles.totalLabel,{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }]}>Thành tiền:</Text>
      <Text style={[styles.totalAmount,{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }]}>{total.toLocaleString()} VND</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily:'Nunito Sans',
    color: '#242424',
  },
});

export default TotalAmount;

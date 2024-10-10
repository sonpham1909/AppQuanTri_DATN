import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TotalAmount = ({ total }) => {
  return (
    <View style={styles.totalContainer}>
      <Text style={styles.totalLabel}>Thành tiền:</Text>
      <Text style={styles.totalAmount}>{total.toLocaleString()} VND</Text>
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

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PriceDetails = ({ price, shippingFee, total }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Giá:</Text>
        <Text style={styles.value}>${price}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Phí Vận Chuyển:</Text>
        <Text style={styles.value}>${shippingFee}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.labelBold}>Tổng:</Text>
        <Text style={styles.valueBold}>${total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: '#888',
  },
  value: {
    fontSize: 18,
    color: '#000',
  },
  labelBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  valueBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PriceDetails;

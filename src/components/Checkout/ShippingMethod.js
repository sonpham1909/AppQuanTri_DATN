import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ShippingMethod = ({ method, icon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Phương thức giao hàng</Text>
      </View>
      <View style={styles.infoBox}>
        <View style={styles.methodContainer}>
          <Image source={icon} style={styles.methodIcon} />
          <Text style={styles.methodText}>{method}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily:'Nunito Sans',
    color: '#242424',
    marginBottom:15,
  },
  editText: {
    fontSize: 18,
    color: '#888',
  },
  infoBox: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 8,
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    width: 50,
    height: 30,
    marginRight: 10,
  },
  methodText: {
    color: '#333',
    fontSize: 14,
  },
});

export default ShippingMethod;

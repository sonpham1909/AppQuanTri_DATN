import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PaymentMethod = ({ methods }) => {
  const [selectedMethod, setSelectedMethod] = useState(null); // Quản lý trạng thái phương thức thanh toán được chọn

  const handleSelectMethod = (method) => {
    setSelectedMethod(method.name); // Cập nhật phương thức được chọn
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Phương thức thanh toán</Text>
      </View>
      <View style={styles.infoBox}>
        {methods.map((method, index) => (
          <TouchableOpacity
            key={index}
            style={styles.methodContainer}
            onPress={() => handleSelectMethod(method)}
          >
          
            <View style={styles.checkBox}>
              {selectedMethod === method.name ? (
                <Text style={styles.checked}>✓</Text> // Dấu tích khi được chọn
              ) : (
                <Text style={styles.unchecked}>○</Text> // Dấu chưa chọn
              )}
            </View>
            <Image source={method.icon} style={styles.methodIcon} />
            <Text style={styles.methodText}>{method.name}</Text>
          </TouchableOpacity>
        ))}
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
  infoBox: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 8,
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  methodIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  methodText: {
    flex: 1,
    color: '#333',
    fontSize: 14,
  },
  checkBox: {
    marginLeft: 10,
    marginRight:0,
  },
  checked: {
    fontSize: 18,
    color: '#00A65E',
  },
  unchecked: {
    fontSize: 18,
    color: '#888',
  },
});

export default PaymentMethod;

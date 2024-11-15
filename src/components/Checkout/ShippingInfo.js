// components/ShippingInfo.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ShippingInfo = ({ recipientName, addressDetail, recipientPhone, notes }) => {
  const navigation = useNavigation();

  const handleEditPress = () => {
    navigation.navigate('ShippingAddressScreen'); // Điều hướng đến màn hình chỉnh sửa địa chỉ
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Địa chỉ giao hàng</Text>
        <TouchableOpacity onPress={handleEditPress}>
          <Text style={styles.editText}>✎</Text>
        </TouchableOpacity>
      </View>
      {recipientName ? (
        <View style={styles.infoBox}>
          <Text style={styles.name}>{recipientName}</Text>
          <View style={styles.separator} />
          <Text style={styles.address}>
            {addressDetail?.street}, {addressDetail?.ward}, {addressDetail?.district}, {addressDetail?.city}{'\n'}
            {recipientPhone},{'\n'}
            {notes}
          </Text>
        </View>
      ) : (
        <Text style={styles.noAddressText}>Chưa có địa chỉ mặc định</Text>
      )}
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
    color: '#242424',
    marginBottom: 15,
  },
  editText: {
    fontSize: 18,
    color: '#888',
  },
  infoBox: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 10,
  },
  name: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 16,
  },
  separator: {
    marginVertical: 5,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  address: {
    color: '#888',
    fontSize: 14,
  },
  noAddressText: {
    fontSize: 16,
    color: '#888',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default ShippingInfo;

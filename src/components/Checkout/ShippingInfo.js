import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Để điều hướng

const ShippingInfo = ({name, address}) => {
  const navigation = useNavigation();

  const handleEditPress = () => {
    // Điều hướng sang màn hình chỉnh sửa địa chỉ
    navigation.navigate('ShippingAddressScreen'); // Tên màn hình đích, tùy vào cấu hình navigation
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Địa chỉ giao hàng</Text>
        <TouchableOpacity onPress={handleEditPress}>
          <Text style={styles.editText}>✎</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.separator} />
        <Text style={styles.address}>{address}</Text>
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
    fontFamily: 'Nunito Sans',
    fontSize: 18,
    color: '#242424',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  editText: {
    fontSize: 18,
    color: '#888',
  },
  infoBox: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    height: 100,
  },
  name: {
    padding: 10,
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
    padding: 10,
    color: '#888',
    fontSize: 14,
  },
});

export default ShippingInfo;

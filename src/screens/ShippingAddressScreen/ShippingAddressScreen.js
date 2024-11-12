import React, {useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { fetchAllAddresses, updateDefaultAddress,deleteAddress } from '../../redux/actions/actionAddress';


const ShippingAddressScreen = () => {
  // Hàm xử lý khi nhấn vào một điều hướnga
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { addressesList, isLoading, error } = useSelector(state => state.addresses);

  // Gọi API để lấy danh sách địa chỉ
  useEffect(() => {
    dispatch(fetchAllAddresses());
  }, [dispatch]);

  // Hàm xác nhận và xóa địa chỉ
  const handleDeleteAddress = (addressId) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa địa chỉ này không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => {
            dispatch(deleteAddress(addressId)).then(() => {
              // Gọi lại fetchAllAddresses sau khi xóa thành công để cập nhật giao diện
              dispatch(fetchAllAddresses());
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Hàm render từng địa chỉ trong danh sách
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.AddressName}>{item.recipientName}</Text>
        <TouchableOpacity onPress={() => dispatch(updateDefaultAddress(item._id))}>
          {item.isDefault ? (
            <Text style={styles.checked}>✓</Text> // Dấu tích khi được chọn
          ) : (
            <Text style={styles.unchecked}>○</Text> // Dấu chưa chọn
          )}
        </TouchableOpacity>
        {/* Nút xóa địa chỉ (không cho phép xóa địa chỉ mặc định) */}
       
      </View>
      <View style={styles.separator}></View>
      <Text style={styles.address}>{'Địa chỉ: '}{item.addressDetail.street}, {item.addressDetail.ward}, {item.addressDetail.district}, {item.addressDetail.city}{'\n'}{'\n'}{'Điện thoại: '}{item.recipientPhone}{'\n'}{'\n'}{'Ghi chú: '}{item.notes}</Text>
      {/* nếu isDefault = true hiển thị text mặc định */}
      {/* {item.isDefault && (
        <Text style={globalStyles.defaultLabel}>Mặc định</Text>
      )} */}
       {!item.isDefault && (
          <TouchableOpacity onPress={() => handleDeleteAddress(item._id)}>
            <Image
              style={styles.deleteIconAddress}
              source={require('../../assets/images/icon_delete.png')}
            />
          </TouchableOpacity>
        )}
    </View>
  );

 

  return (
    <View style={globalStyles.ShippingAddressContainer}>
      <View style={globalStyles.ShippingAddressContent}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Phiên bản hết hạn bạn cần đăng nhập lại</Text>
        ) : (
          <FlatList
            data={addressesList}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text>Không có địa chỉ nào</Text>
              </View>
            )}
          />
        )}
      </View>
      {/* Nút thêm địa chỉ luôn hiển thị */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddAddress')}
      >
        <Image
          style={styles.addIcon}
          source={require('../../assets/images/icon_add.png')}
        />
      </TouchableOpacity>
    </View>
  );
  
};



export default ShippingAddressScreen;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100, 
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#28a745',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  addIcon: {
    width: 30,
    height: 30,
    tintColor: '#FFF',
  },
  
  checked: {
    fontSize: 16,
    color: 'green',
  },
  unchecked: {
    fontSize: 20,
    color: 'gray',
  },
  deleteIconAddress: {
    width: 20,
    height: 20,
    tintColor: '#000',
    alignSelf:'flex-end',
    margin:5
  },
  card: {
    width:'auto',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding:7,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom:15
  },
  cardContent: {
    padding:7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  AddressName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    padding:7
  },
  separator: {
    marginVertical: 5,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    padding:7
  },
});
import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import Header from '../../components/ShippingAddress/Header';
import globalStyles from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';

const ShippingAddressScreen = () => {
  // Hàm xử lý khi nhấn vào một điều hướng
  const navigation = useNavigation();
  // Dữ liệu danh sách địa chỉ giả định
  const addresses = [
    {
      id: '1',
      name: 'Phùng Tiến Dũng',
      address: 'Số 55, Ngõ 177, Đường Cầu Diễn, Bắc Từ Liêm, Hà Nội',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Phùng Tiến Dũng',
      address: 'Số 55, Ngõ 177, Đường Cầu Diễn, Bắc Từ Liêm, Hà Nội',
      isDefault: false,
    },
    {
      id: '3',
      name: 'Phùng Tiến Dũng',
      address: 'Số 55, Ngõ 177, Đường Cầu Diễn, Bắc Từ Liêm, Hà Nội',
      isDefault: false,
    },
  ];

  // Hàm render từng địa chỉ trong danh sách
  const renderItem = ({item}) => (
    <View style={globalStyles.card}>
      <View style={globalStyles.cardContent}>
        <Text style={globalStyles.AddressName}>{item.name}</Text>
        <TouchableOpacity>
          <Image
            style={globalStyles.editIcon}
            source={require('../../assets/images/icon_edit.png')}
          />
        </TouchableOpacity>

      </View>
      <View style={globalStyles.separator}></View>


      <Text style={globalStyles.address}>{item.address}</Text>
      {/* nếu isDefault = true hiển thị text mặc định */}
      {item.isDefault && (
        <Text style={globalStyles.defaultLabel}>Mặc định</Text>
      )}
    </View>
  );

  return (
    <View style={globalStyles.ShippingAddressContainer}>
      
      <View style={globalStyles.ShippingAddressContent}>
        <FlatList
          data={addresses}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
      {/* Nút thêm địa chỉ */}
      <TouchableOpacity
        style={globalStyles.addButton}
        onPress={() => navigation.navigate('AddAddress')}>
        <Image
          style={globalStyles.addIcon}
          source={require('../../assets/images/icon_add.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ShippingAddressScreen;

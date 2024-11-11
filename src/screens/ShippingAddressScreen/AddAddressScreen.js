import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {addAddress} from '../../redux/actions/actionAddress';

const AddAddress = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Hàm xử lý khi thêm địa chỉ mới
  const handleAddAddress = () => {
    // Kiểm tra xem tất cả các trường có giá trị hay không
    if (!fullName || !phone || !country || !city || !district || !address) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }
  
    // Tạo dữ liệu địa chỉ để gửi đến backend
    const addressData = {
      recipientName: fullName,
      recipientPhone: phone,
      street: address,
      ward: district,
      district: city,
      city: country,
      notes: '', // Truyền notes, có thể để chuỗi rỗng nếu không có giá trị cụ thể
    };
  
    // Gọi API thêm địa chỉ
    dispatch(addAddress(addressData))
      .then(() => {
        Alert.alert('Thành công', 'Địa chỉ đã được thêm thành công!', [
          { text: 'OK', onPress: () => navigation.navigate('ShippingAddressScreen') },
        ]);
      })
      .catch((error) => {
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm địa chỉ, vui lòng thử lại.');
        console.error('Error adding address:', error);
      });
  };
  
  

  return (
    <View>
      <ScrollView contentContainerStyle={globalStyles.containerAddress}>
        {/* họ và tên */}
        <View style={globalStyles.inputContainerAddress}>
          <Text style={globalStyles.labelAddress}>Họ và tên</Text>
          <TextInput
            placeholder="Họ và tên"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            style={globalStyles.inputAddress}
          />
        </View>

        {/* số điện thoại */}
        <View style={globalStyles.inputContainerAddress}>
          <Text style={globalStyles.labelAddress}>Số điện thoại</Text>
          <TextInput
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            keyboardType="phone-pad"
            style={globalStyles.inputAddress}
          />
        </View>

        {/* chọn quốc gia */}
        <View style={globalStyles.pickerContainerAddress}>
          <Text style={globalStyles.labelAddress}>Thành Phố</Text>
          <Picker
            selectedValue={country}
            onValueChange={(itemValue) => setCountry(itemValue)}
            style={globalStyles.pickerAddress}
          >
            <Picker.Item label="Chọn Thành phố" value="" />
            <Picker.Item label="Hà Nội" value="Hà Nội" />
            <Picker.Item label="Hồ Chí Minh" value="Hồ Chí Minh" />
            <Picker.Item label="Đà Nẵng" value="Đà Nẵng" />
          </Picker>
        </View>

        {/* chọn thành phố */}
        <View style={globalStyles.pickerContainerAddress}>
          <Text style={globalStyles.labelAddress}>Quận/Huyện</Text>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue) => setCity(itemValue)}
            style={globalStyles.pickerAddress}
          >
            <Picker.Item label="Chọn Quận huyện" value="" />
            <Picker.Item label="Ba Đình" value="Ba Đình" />
            <Picker.Item label="Thủ Đức" value="Thủ Đức" />
            <Picker.Item label="Cầu Giấy" value="Cầu Giấy" />
          </Picker>
        </View>

        {/* chọn xã */}
        <View style={globalStyles.pickerContainerAddress}>
          <Text style={globalStyles.labelAddress}>Xã/Phường</Text>
          <Picker
            selectedValue={district}
            onValueChange={(itemValue) => setDistrict(itemValue)}
            style={globalStyles.pickerAddress}
          >
            <Picker.Item label="Chọn Xã/Phường" value="" />
            <Picker.Item label="Phường 1" value="Phường 1" />
            <Picker.Item label="Phường 2" value="Phường 2" />
            <Picker.Item label="Phường 3" value="Phường 3" />
          </Picker>
        </View>

        {/* địa chỉ chi tiết */}
        <View style={globalStyles.inputContainerAddress}>
          <Text style={globalStyles.labelAddress}>Địa chỉ chi tiết</Text>
          <TextInput
            placeholder="Ex: 25 Robert Latouche Street"
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={globalStyles.inputAddress}
          />
           <TextInput
            placeholder="Ex: 25 Robert Latouche Street"
            value={address}
            onChangeText={(text) => set(text)}
            style={globalStyles.inputAddress}
          />
        </View>
      </ScrollView>

      {/* Nút thêm địa chỉ */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
        <Text style={styles.addButtonText}>Thêm địa chỉ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddAddress;

// Styles cho button thêm địa chỉ
const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    margin: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

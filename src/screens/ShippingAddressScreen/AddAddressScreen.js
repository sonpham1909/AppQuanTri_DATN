import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { addAddress } from '../../redux/actions/actionAddress';
import axios from 'axios';
import tokenManager from '../../services/tokenService'; // Đường dẫn tới tệp token bạn đã cung cấp

const AddAddress = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState({ id: '', name: '' });
  const [district, setDistrict] = useState({ id: '', name: '' });
  const [ward, setWard] = useState({ id: '', name: '' });
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Hàm lấy token từ AsyncStorage và gọi API lấy danh sách thành phố
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const token = await tokenManager.getToken();
        if (!token) {
          throw new Error('Token is not available');
        }

        const citiesResponse = await axios.get('https://vapi.vnappmob.com/api/province', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCities(citiesResponse.data.results);
      } catch (error) {
        console.error('Error fetching cities:', error);
        Alert.alert('Lỗi', 'Không thể tải danh sách thành phố.');
      }
    };

    fetchCities();
  }, []);

  // Hàm lấy danh sách quận/huyện khi thành phố thay đổi
  useEffect(() => {
    const fetchDistricts = async () => {
      if (city.id) {
        try {
          const token = await tokenManager.getToken();
          if (!token) {
            throw new Error('Token is not available');
          }

          const districtsResponse = await axios.get(`https://vapi.vnappmob.com/api/province/district/${city.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setDistricts(districtsResponse.data.results);
        } catch (error) {
          console.error('Error fetching districts:', error);
          Alert.alert('Lỗi', 'Không thể tải danh sách quận/huyện.');
        }
      } else {
        setDistricts([]);
      }
      setWard({ id: '', name: '' }); // Reset xã/phường khi thay đổi thành phố
    };

    fetchDistricts();
  }, [city]);

  // Hàm lấy danh sách xã/phường khi quận/huyện thay đổi
  useEffect(() => {
    const fetchWards = async () => {
      if (district.id) {
        try {
          const token = await tokenManager.getToken();
          if (!token) {
            throw new Error('Token is not available');
          }

          const wardsResponse = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${district.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setWards(wardsResponse.data.results);
        } catch (error) {
          console.error('Error fetching wards:', error);
          Alert.alert('Lỗi', 'Không thể tải danh sách xã/phường.');
        }
      } else {
        setWards([]);
      }
    };

    fetchWards();
  }, [district]);

  // Hàm xử lý khi thêm địa chỉ mới
  const handleAddAddress = () => {
    if (!fullName || !phone || !city.id || !district.id || !ward.id || !address) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const addressData = {
      recipientName: fullName,
      recipientPhone: phone,
      street: address,
      ward: ward.name,
      district: district.name,
      city: city.name,
      notes: notes ? notes : '',
    };

    dispatch(addAddress(addressData))
      .then(() => {
        Alert.alert('Thành công', 'Địa chỉ đã được thêm thành công!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ShippingAddressScreen'),
          },
        ]);
      })
      .catch(error => {
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm địa chỉ, vui lòng thử lại.');
        console.error('Error adding address:', error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.containerAddress}>
        {/* Họ và tên */}
        <View style={styles.inputContainerAddress}>
          <Text style={styles.labelAddress}>Họ và tên</Text>
          <TextInput
            placeholder="Họ và tên"
            value={fullName}
            onChangeText={text => setFullName(text)}
            style={styles.inputAddress}
          />
        </View>

        {/* Số điện thoại */}
        <View style={styles.inputContainerAddress}>
          <Text style={styles.labelAddress}>Số điện thoại</Text>
          <TextInput
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={text => setPhone(text)}
            keyboardType="phone-pad"
            style={styles.inputAddress}
          />
        </View>

        {/* Chọn thành phố */}
        <View style={styles.pickerContainerAddress}>
          <Text style={styles.labelAddress}>Thành Phố</Text>
          <Picker
            selectedValue={city.id}
            onValueChange={(itemValue) => {
              const selectedCity = cities.find(city => city.province_id === itemValue);
              setCity({ id: selectedCity.province_id, name: selectedCity.province_name });
              setDistrict({ id: '', name: '' });
              setWard({ id: '', name: '' });
            }}
            style={styles.pickerAddress}>
            <Picker.Item label="Chọn Thành phố" value="" />
            {cities.map((city) => (
              <Picker.Item key={city.province_id} label={city.province_name} value={city.province_id} />
            ))}
          </Picker>
        </View>

        {/* Chọn quận/huyện */}
        <View style={styles.pickerContainerAddress}>
          <Text style={styles.labelAddress}>Quận/Huyện</Text>
          <Picker
            selectedValue={district.id}
            onValueChange={(itemValue) => {
              const selectedDistrict = districts.find(district => district.district_id === itemValue);
              setDistrict({ id: selectedDistrict.district_id, name: selectedDistrict.district_name });
              setWard({ id: '', name: '' });
            }}
            style={styles.pickerAddress}>
            <Picker.Item label="Chọn Quận/Huyện" value="" />
            {districts
              .filter(district => district.province_id === city.id)
              .map((district) => (
                <Picker.Item key={district.district_id} label={district.district_name} value={district.district_id} />
              ))}
          </Picker>
        </View>

        {/* Chọn xã/phường */}
        <View style={styles.pickerContainerAddress}>
          <Text style={styles.labelAddress}>Xã/Phường</Text>
          <Picker
            selectedValue={ward.id}
            onValueChange={(itemValue) => {
              const selectedWard = wards.find(ward => ward.ward_id === itemValue);
              setWard({ id: selectedWard.ward_id, name: selectedWard.ward_name });
            }}
            style={styles.pickerAddress}>
            <Picker.Item label="Chọn Xã/Phường" value="" />
            {wards
              .filter(ward => ward.district_id === district.id)
              .map((ward) => (
                <Picker.Item key={ward.ward_id} label={ward.ward_name} value={ward.ward_id} />
              ))}
          </Picker>
        </View>

        {/* Địa chỉ chi tiết */}
        <View style={styles.inputContainerAddress}>
          <Text style={styles.labelAddress}>Địa chỉ chi tiết</Text>
          <TextInput
            placeholder="Chi tiết địa chỉ nhận hàng "
            value={address}
            onChangeText={text => setAddress(text)}
            style={styles.inputAddress}
          />
        </View>

        {/* Ghi chú */}
        <View style={styles.inputContainerAddress}>
          <Text style={styles.labelAddress}>Ghi chú</Text>
          <TextInput
            placeholder="Ghi chú"
            value={notes}
            onChangeText={text => setNotes(text)}
            style={styles.inputAddress}
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

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    top: '85%',
    left: 20,
    right: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputAddress:{
    marginBottom: 16,
    marginLeft: 5,
  },
  inputContainerAddress:{
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    height: 70,
    marginBottom: 16,
  },
  labelAddress:{
    marginLeft: 5,
    marginTop: 5,
    fontSize: 12,
    justifyContent:'flex-end'
  },
  pickerContainerAddress:{
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  pickerAddress:{
    height: 50,
    width: '100%',
  },
  switchSetting:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerAddress:{
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
 
});
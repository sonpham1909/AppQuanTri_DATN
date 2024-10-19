import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import Header from '../../components/ShippingAddress/Header';
import globalStyles from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import AddButon from '../../components/ShippingAddress/ButtonAdd';

const AddAddress = () => {
  const [fullName, setFullName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  // Hàm xử lý khi nhấn vào một điều hướng
  const navigation = useNavigation();

  return (
    <View>
      {/* sử dụng component header */}

      <ScrollView contentContainerStyle={globalStyles.containerAddress}>
        {/* họ và tên */}
        <View style={globalStyles.inputContainerAddress}>
          <Text style={globalStyles.labelAddress}>Họ và tên</Text>
          <TextInput
            placeholder="Hieu"
            mode="outlined" /*Thêm border cho textInput*/
            value={fullName}
            onChangeText={text => setFullName(text)}
            style={globalStyles.inputAddress}
          />
        </View>

        {/* mã bưu chính */}
        <View style={globalStyles.inputContainerAddress}>
          <Text style={globalStyles.labelAddress}>Mã ZIP (mã bưu chính)</Text>
          <TextInput
            placeholder="010023120"
            mode="outlined"
            value={zipCode}
            onChangeText={text => setZipCode(text)}
            style={globalStyles.inputAddress}
          />
        </View>

        {/* sử dụng thư viện picker để chọn quốc gia */}
        <View style={globalStyles.pickerContainerAddress}>
          <Text style={globalStyles.labelAddress}>Thành Phố</Text>
          <Picker
            selectedValue={country}
            onValueChange={itemValue =>
              setCountry(itemValue)
            } /*set quốc gia vào useState*/
            style={globalStyles.pickerAddress}>
            <Picker.Item label="Chọn Thành phố" value="" />
            <Picker.Item label="Việt Nam" value="Vietnam" />
            <Picker.Item label="Lào" value="Laos" />
            <Picker.Item label="Campuchia" value="Cambodia" />
          </Picker>
        </View>

        {/* sử dụng thư viện picker để chọn thành phố */}
        <View style={globalStyles.pickerContainerAddress}>
          <Text style={globalStyles.labelAddress}>Huyện</Text>
          <Picker
            selectedValue={city}
            onValueChange={itemValue =>
              setCity(itemValue)
            } /*set thành phố vào useState*/
            style={globalStyles.pickerAddress}>
            <Picker.Item label="Chọn Quận huyện " value="" />
            <Picker.Item label="Hà Nội" value="Hà Nội" />
            <Picker.Item label="Hồ Chí Minh" value="Hồ Chí Minh" />
            <Picker.Item label="Đà Nẵng" value="Đà nẵng" />
          </Picker>
        </View>

        {/* sử dụng thư viện picker để chọn quận huyện */}
        <View style={globalStyles.pickerContainerAddress}>
          <Text style={globalStyles.labelAddress}>Xã</Text>
          <Picker
            selectedValue={district}
            onValueChange={itemValue =>
              setDistrict(itemValue)
            } /*set quận huyện vào useState*/
            style={globalStyles.pickerAddress}>
            <Picker.Item label="Hoàn kiếm" value="" />
            <Picker.Item label="Ba Vì" value="Ba Vì" />
            <Picker.Item label="Thủ Đức" value="Thủ Đức" />
            <Picker.Item label="Ngân Bình" value="Ngân Bình" />
          </Picker>
        </View>

        {/* địa chỉ */}
        <View style={globalStyles.inputContainerAddress}>
          <Text style={globalStyles.labelAddress}>Đia chỉ</Text>
          <TextInput
            placeholder="Ex: 25 Robert Latouche Street"
            mode="outlined"
            value={address}
            onChangeText={text => setAddress(text)}
            style={globalStyles.inputAddress}
          />
        </View>

        {/* dùng switch để chọn mặc định */}
        <View style={globalStyles.switchContainerAddress}>
          <Text>Chọn làm mặc định</Text>
          <Switch value={isDefault} onValueChange={setIsDefault} />
        </View>
      </ScrollView>
      <AddButon title="Thêm địa chỉ " />

    </View>
  );
};


export default AddAddress;

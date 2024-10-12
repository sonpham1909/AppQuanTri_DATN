import {StyleSheet, Text, View, TextInput, Switch} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/ShippingAddress/Header';
import globalStyles from '../../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
const SettingScreen = () => {
  //hàm chuyển hướng
  const navigation = useNavigation();
  // State cho Switch
  const [isSalesEnabled, setIsSalesEnabled] = useState(false);
  const [isBackgroundEnabled, setIsBackgroundEnabled] = useState(false);

  // Hàm thay đổi trạng thái của Switch
  const toggleSalesSwitch = () =>
    setIsSalesEnabled(previousState => !previousState);//đổi giá trị bằng !
  const toggleBackgroundSwitch = () =>
    setIsBackgroundEnabled(previousState => !previousState);

  return (
    <View>
      <Header onpress={() => navigation.goBack()} title="Setting" />
    <View style={globalStyles.containerSetting}>
      {/* Thông tin cá nhân */}
      <View style={globalStyles.sectionSetting}>
        <Text style={globalStyles.sectionTitleSetting}>Thông Tin Cá Nhân</Text>
        {/* họ tên */}
        <View style={globalStyles.infoContainerSetting}>
          <Text style={globalStyles.labelSetting}>Họ Tên</Text>
          <TextInput style={globalStyles.inputSetting} value="Việt Vũ" editable={false} />
        </View>
        {/* email */}
        <View style={globalStyles.infoContainerSetting}>
          <Text style={globalStyles.labelSetting}>Email</Text>
          <TextInput
            style={globalStyles.inputSetting}
            value="vvv@gmail.com"
            editable={false}
          />
        </View>
      </View>

      {/* Mật khẩu */}
      <View style={globalStyles.sectionSetting}>
        <Text style={globalStyles.sectionTitleSetting}>Mật Khẩu</Text>
        <TextInput
          style={globalStyles.inputSetting}
          value="********"
          editable={false} // Không cho phép người dùng chỉnh sửa
        />
      </View>

      {/* Thông báo */}
      <View style={globalStyles.sectionSetting}>
        <Text style={globalStyles.sectionTitleSetting}>Thông Báo</Text>
        <View style={globalStyles.switchSetting}>
          <Text style={globalStyles.labelSetting}>Sales</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isSalesEnabled ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleSalesSwitch}
            value={isSalesEnabled}
          />
        </View>
        <View style={globalStyles.switchSetting}>
          <Text style={globalStyles.labelSetting}>Màu nền</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isBackgroundEnabled ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleBackgroundSwitch}
            value={isBackgroundEnabled}
          />
        </View>
      </View>
    </View>
    </View>
  );
};

export default SettingScreen;

import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import globalStyles from '../../styles/globalStyles';
import CardProfile from '../../components/ShippingAddress/CardProfile';
import { useNavigation } from '@react-navigation/native';

const Personal = () => {
  const [avatar, setAvatar] = useState(null);
  // hàm chuyển hướng khi ấn card
  const navigation = useNavigation();
   // Dữ liệu mẫu
   const [orders, setOrders] = useState([
    { id: '1', name: 'Order 1' },
    { id: '2', name: 'Order 2' },
    { id: '3', name: 'Order 3' },
    { id: '4', name: 'Order 4' },
    { id: '5', name: 'Order 5' },
    { id: '6', name: 'Order 6' },
    { id: '7', name: 'Order 7' },
    { id: '8', name: 'Order 8' },
    { id: '9', name: 'Order 9' },
    { id: '10', name: 'Order 10' },
  ]);

  const [addresses, setAddresses] = useState([
    { id: '1', address: '123' },
    { id: '2', address: '456' },
    { id: '3', address: '789' },
  ]);

  const [reviews, setReviews] = useState([
    { id: '1', review: 'Review 1' },
    { id: '2', review: 'Review 2' },
    { id: '3', review: 'Review 3' },
    { id: '4', review: 'Review 4' },
    { id: '5', review: 'Review 5' },
  ]);


  const chooseImage = () => {
    let options = { /*khởi tạo tùy chọn option */
      mediaType: 'photo', /*chỉ định muốn chọn ảnh  */
      quality: 1, //số lượng ảnh
    };
    
    //hàm mở thư viện ảnh của thiết bị
    launchImageLibrary(options, (response) => {
      //khi người dùng hủy chọn
      if (response.didCancel) {
        console.log('Người dùng không chọn ảnh');
      //hiển thị lỗi khi không thành công
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      //ảnh được chọn thành công
      } else {
        const source = { uri: response.assets[0].uri }; //chứa uri của ảnh
        setAvatar(source);// lưu uri vào state
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
      <TouchableOpacity style={styles.boxAvatar} onPress={chooseImage}>
        {avatar ? (
          <Image source={avatar} style={styles.avatar} /> //nếu có ảnh thì hiển thị
        ) : (
          <Image source={require('../../assets/images/icon_avatar.png')} style={styles.avatar} />//nếu không có thì để mặc định
        )}
      </TouchableOpacity>
      <View>
      <Text style={styles.text}>Phùng Tiến Dũng</Text>
      <Text style={styles.email}>phungtiendung211104@gmail.com</Text>
      </View>
    </View>

    {/* CardProfile component */}
    <CardProfile title={'Đơn hàng của tôi'} onpress={()=>{navigation.navigate('InvoicesScreen')}} preview={'Đã có '+orders.length+' đơn hàng'} />
    <CardProfile title={'Địa Chỉ giao hàng'} onpress={() => {navigation.navigate('ShippingAddressScreen')}} preview={addresses.length+' Địa chỉ'} />
    <CardProfile title={'Đánh giá của tôi'} onpress={() => {navigation.navigate('ReviewsScreen')}} preview={'Đã đánh giá '+reviews.length+' mục'} />
    <CardProfile title={'Cài đặt'} onpress={() => {navigation.navigate('SettingScreen')}} preview={'Thông báo, Mật khẩu, FAQ, Liên hệ'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    marginRight:20,
    marginLeft:10,
    marginTop:10
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  info:{
    flexDirection:'row',
    alignItems:'center',
    
  },
  boxAvatar:{
    width: 100,
    height: 100,
    marginBottom: 10,
    marginRight:10,
    marginTop:10,
    backgroundColor: colors.border,
  }
});

export default Personal
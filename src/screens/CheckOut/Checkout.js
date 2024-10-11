import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShippingInfo from '../../components/Checkout/ShippingInfo';
import PaymentMethod from '../../components/Checkout/PaymentMethod';
import ShippingMethod from '../../components/Checkout/ShippingMethod';
import PriceDetails from '../../components/Checkout/PriceDetails';
import CustomButton from '../../components/Checkout/CustomButton';

import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const CheckoutScreen = () => {
  const navigation = useNavigation();  // Hook for navigation

  const handleOrderPress = () => {
    navigation.navigate('Congrats');  // Chuyển màn hình tới InvoicesScreen khi nhấn nút
  };

  return (
    <View style={styles.container}>
      <ShippingInfo name="Nguyen Van A" address="CD Fpt Polytechnic" />
      <PaymentMethod methods={[
        { name: 'ZaloPay', icon: require('../../assets/images/icon_zalopay.png') },
        { name: 'Thanh toán khi nhận hàng', icon: require('../../assets/images/icon_shipcod.png') }
      ]} />   
      <ShippingMethod method="Giao hàng tiết kiệm (2-3 days)" icon={require('../../assets/images/icon_ghtk.png')} />
      <PriceDetails price={95.00} shippingFee={5.00} total={100.00} />
      
      {/* Nút chuyển màn */}
      <CustomButton title="Đặt hàng" onPress={handleOrderPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF',
  },
});

export default CheckoutScreen;

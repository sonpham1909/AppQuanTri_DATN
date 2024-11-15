import React, { useEffect, useState, useCallback } from 'react';

import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import ShippingInfo from '../../components/Checkout/ShippingInfo';
import PaymentMethod from '../../components/Checkout/PaymentMethod';
import ShippingMethod from '../../components/Checkout/ShippingMethod';
import PriceDetails from '../../components/Checkout/PriceDetails';
import CustomButton from '../../components/Checkout/CustomButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShippingMethods } from '../../redux/actions/actionShipping';
import { fetchPaymentMethods } from '../../redux/actions/actionPayment'; 
import { fetchCart, deleteAllCartItems } from '../../redux/actions/actionCart';
import { fetchDefaultAddress } from '../../redux/actions/actionAddress';
import { createOrder } from '../../redux/actions/actionOder';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  
  const {
    shippingMethods,
    isLoading: shippingLoading,
    error: shippingError,
  } = useSelector(state => state.shipping);
  const {
    paymentMethods,
    isLoading: paymentLoading,
    error: paymentError,
  } = useSelector(state => state.payment);

  const { cart, isLoading: cartLoading } = useSelector(state => state.cart);
  const { defaultAddress } = useSelector(state => state.addresses);

  const totalAmount =
    Array.isArray(cart) && cart.length > 0
      ? cart.reduce((total, item) => total + item.price * item.quantity, 0)
      : 0;

  useEffect(() => {
    dispatch(fetchShippingMethods());
    dispatch(fetchPaymentMethods());
    dispatch(fetchCart());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchDefaultAddress());
    }, [dispatch]),
  );

  const handleOrderPress = () => {
    if (!defaultAddress || !selectedPaymentMethod || !selectedShippingMethod) {
      Alert.alert('Thông báo', 'Vui lòng kiểm tra thông tin giao hàng và thanh toán.');
      return;
    }
    console.log('Selected Payment Method ID:', selectedPaymentMethod);
  
    if (!cart || cart.length === 0) {
      Alert.alert('Thông báo', 'Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.');
      return;
    }
  
    const orderData = {
      address_id: defaultAddress._id,
      shipping_method_id: selectedShippingMethod,
      payment_method_id: selectedPaymentMethod,
      cartItems: cart,
    };
  
    dispatch(createOrder(orderData))
      .unwrap()
      .then(() => {
        // Xóa giỏ hàng sau khi đặt hàng thành công
        Alert.alert(
          'Thành công',
          'Đặt hàng thành công',
          [
            {
              text: 'OK',
              onPress: () => {
                // Xóa giỏ hàng sau khi người dùng nhấn OK
                dispatch(deleteAllCartItems()); // Gọi hành động deleteAllCartItems để xóa giỏ hàng
                navigation.navigate('Congrats'); // Điều hướng tới màn hình Congrats
              },
            },
          ],
        );
      })
      .catch((err) => {
        console.error('Order creation error:', err);
        Alert.alert('Lỗi', 'Đặt hàng không thành công. Vui lòng thử lại.');
      });
  };

  const shippingFee = shippingMethods.find((method) => method._id === selectedShippingMethod)?.cost || 0;

  const formattedShippingFee = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(shippingFee);

  const formattedTotal = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(totalAmount + shippingFee);

  const formattedTotalAmount = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(totalAmount);

  if (shippingLoading || paymentLoading || cartLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (shippingError || paymentError) {
    return <Text>Error: {shippingError || paymentError}</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <ShippingInfo
          recipientName={defaultAddress?.recipientName}
          addressDetail={defaultAddress?.addressDetail}
          recipientPhone={defaultAddress?.recipientPhone}
          notes={defaultAddress?.notes}
        />
        <PaymentMethod
          methods={paymentMethods}
          selectedMethod={selectedPaymentMethod}
          onSelectMethod={(method) => setSelectedPaymentMethod(method)}
        />

        {shippingMethods.length > 0 && (
          <ShippingMethod
            methods={shippingMethods}
            selectedMethod={selectedShippingMethod}
            onSelectMethod={(method) => setSelectedShippingMethod(method)}
          />
        )}
        <PriceDetails
          price={formattedTotalAmount}
          shippingFee={formattedShippingFee}
          total={formattedTotal}
        />
        <CustomButton title="Đặt hàng" onPress={handleOrderPress} />
      </View>
    </ScrollView>
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

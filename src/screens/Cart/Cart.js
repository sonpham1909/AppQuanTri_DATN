import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import CartItem from '../../components/Cart/CartItem';
import DiscountCodeInput from '../../components/Cart/DiscountCodeInput';
import TotalAmount from '../../components/Cart/TotalAmount';
import CheckoutButton from '../../components/Cart/CheckoutButton';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, fetchCart, updatequantity } from '../../redux/actions/actionCart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { cart, isLoading } = useSelector(state => state.cart);
  const user = useSelector(state => state.user.user);
  

  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchCart(user._id));
      
    }
  }, [dispatch, user]);

  const [discountCode, setDiscountCode] = useState('');

  const totalAmount = Array.isArray(cart) && cart.length > 0
  ? cart.reduce((total, item) => total + item.price * item.quantity, 0)
  : 0;


  const handleQuantityChange = (id, action) => {
    // Cập nhật UI ngay lập tức trong local state
    const updatedCart = cart.map(cartItem => {
      if (cartItem._id === id) {
        // Tăng hoặc giảm số lượng
        let newQuantity = action === 'increase' ? cartItem.quantity + 1 : cartItem.quantity - 1;
        newQuantity = newQuantity > 0 ? newQuantity : 1; // Đảm bảo số lượng tối thiểu là 1
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });

    // Cập nhật lại state giỏ hàng để UI phản hồi nhanh
    dispatch({ type: 'UPDATE_CART_LOCAL', payload: updatedCart });

    // Sau đó gọi API để cập nhật số lượng trên server
    dispatch(updatequantity({ cartItemId: id, quantity: updatedCart.find(item => item._id === id).quantity }));
  };

  const handleRemoveItem = id => {
    // Gọi API để xóa sản phẩm khỏi giỏ hàng trên server
    dispatch(deleteCartItem(id)).then(() => {
      // Đợi đến khi API trả về thành công
      dispatch(fetchCart(user._id)); // Lấy lại danh sách giỏ hàng mới để cập nhật UI
    });
  };
  

  if (isLoading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (!cart || cart.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MaterialCommunityIcons
          name="cart-off"
          size={64}
          color="#B0B0B0"
        />
        <Text style={{ marginTop: 10, color: '#B0B0B0' }}>Giỏ hàng của bạn đang trống</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Cart Items List */}
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={() => handleQuantityChange(item._id, 'increase')}
            onDecrease={() => handleQuantityChange(item._id, 'decrease')}
            onRemove={() => handleRemoveItem(item._id)}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item._id.toString()}
      />

      {/* Discount Code Input */}
     

      {/* Total Amount */}
      <TotalAmount total={totalAmount} />

      {/* Checkout Button */}
      <CheckoutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default CartScreen;

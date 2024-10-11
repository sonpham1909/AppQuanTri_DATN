import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CartItem from '../../components/Cart/CartItem';
import DiscountCodeInput from '../../components/Cart/DiscountCodeInput';
import TotalAmount from '../../components/Cart/TotalAmount';
import CheckoutButton from '../../components/Cart/CheckoutButton';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Áo Pattern', price: 157000, size: 'M', color: 'Orenger', quantity: 1, image: require('../../assets/images/item_1.png') },
    { id: 2, name: 'Áo giữ nhiệt', price: 279000, size: 'M', color: 'Green', quantity: 1, image: require('../../assets/images/item_2.png') },
    { id: 3, name: 'Quần dài nam', price: 590000, size: 'M', color: 'Red', quantity: 1, image: require('../../assets/images/item_3.png') },
    
  ]);
  
  const [discountCode, setDiscountCode] = useState('');
  
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = (id, action) => {
    setCartItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity > 1 ? item.quantity - 1 : item.quantity;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Cart Items List */}
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={(id) => handleQuantityChange(id, 'increase')}
            onDecrease={(id) => handleQuantityChange(id, 'decrease')}
            onRemove={(id) => handleRemoveItem(id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Discount Code Input */}
      <DiscountCodeInput discountCode={discountCode} onChangeCode={setDiscountCode} />

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


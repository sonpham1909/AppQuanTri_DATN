import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import CartItem from '../../components/Cart/CartItem';
import TotalAmount from '../../components/Cart/TotalAmount';
import CheckoutButton from '../../components/Cart/CheckoutButton';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, fetchCart, updatequantity } from '../../redux/actions/actionCart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CartScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { cart, isLoading } = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const totalAmount = Array.isArray(cart) && cart.length > 0
        ? cart.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;

    const handleQuantityChange = (id, action) => {
        const updatedCart = cart.map(cartItem => {
            if (cartItem._id === id) {
                let newQuantity = action === 'increase' ? cartItem.quantity + 1 : cartItem.quantity - 1;
                newQuantity = newQuantity > 0 ? newQuantity : 1;
                return { ...cartItem, quantity: newQuantity };
            }
            return cartItem;
        });

        dispatch({ type: 'UPDATE_CART_LOCAL', payload: updatedCart });

        dispatch(updatequantity({ cartItemId: id, quantity: updatedCart.find(item => item._id === id).quantity }));
    };

    const handleRemoveItem = id => {
        dispatch(deleteCartItem(id)).then(() => {
            dispatch(fetchCart());
        });
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color="#00ff00" />;
    }

    if (!cart || cart.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons name="cart-off" size={64} color="#B0B0B0" />
                <Text style={{ marginTop: 10, color: '#B0B0B0' }}>Giỏ hàng của bạn đang trống</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
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
            <TotalAmount total={totalAmount} />
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

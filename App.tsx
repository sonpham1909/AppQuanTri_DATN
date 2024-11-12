import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import Welcom from './src/screens/Welcom/SplashScreen';
import Registered from './src/screens/Registered/Registered';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

import CategoriesScreen from './src/screens/CategoriesScreen/CategoriesScreen';
import InvoicesScreen from './src/screens/InvoicesScreen/InvoicesScreen';
import ReviewsScreen from './src/screens/ReviewsScreen/ReviewsScreen';
import store, { persistor } from './src/redux/store/store';
// Đường dẫn tới store.js
import { Provider } from 'react-redux'; // Thêm import Provider từ react-redux
import CateClother from './src/screens/CateClotherScreen/CateClotherScreen';
import Cart from './src/screens/Cart/Cart';
import Checkout from './src/screens/CheckOut/Checkout';
import Favorites from './src/screens/Favotires/Favotires';
import Notification from './src/screens/Nofication/Nofication';
import DetailedOrders from './src/screens/DetailedOrders/DetailedOrders';
import ProductDetailScreen from './src/screens/ProductDetailScreen/ProductDetailScreen'
import Congrats from './src/screens/Congrats/Congrats'
import AllProductScreen from './src/screens/AllProductScreen/AllProductScreen'
import SettingScreen from './src/screens/SettingScreen/SettingScreen';
import ShippingAddressScreen from './src/screens/ShippingAddressScreen/ShippingAddressScreen';
import AddAddress from './src/screens/ShippingAddressScreen/AddAddressScreen';
import { PersistGate } from 'redux-persist/integration/react';
import CartItem from './src/components/Cart/CartItem';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcom"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcom" component={Welcom} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registered" component={Registered} />

            <Stack.Screen name="Home" component={BottomTabNavigator} />

            <Stack.Screen
              name="CategoriesScreen"
              component={CategoriesScreen}
              options={{
                headerStyle: {
                  backgroundColor: '#00A65E', // Màu nền xanh
                },
                headerTintColor: '#fff', // Màu chữ trắng
                headerTitleStyle: {
                  fontWeight: 'bold', // Kiểu chữ tiêu đề
                },
              }}
            />

            <Stack.Screen
              name="InvoicesScreen"
              component={InvoicesScreen}
              options={{
                headerShown: true,
                headerTitleAlign: 'center',
                title: 'Hóa đơn',
                headerStyle: {
                  backgroundColor: '#00A65E', // Màu nền xanh
                },
                headerTintColor: '#fff', // Màu chữ trắng
                headerTitleStyle: {
                  fontWeight: 'bold', // Kiểu chữ tiêu đề
                },
              }}
            />

            <Stack.Screen
              name="ReviewsScreen"
              component={ReviewsScreen}
              options={{
                headerShown: true,
                title: 'Nhận xét',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#00A65E', // Màu nền xanh
                },
                headerTintColor: '#fff', // Màu chữ trắng
                headerTitleStyle: {
                  fontWeight: 'bold', // Kiểu chữ tiêu đề
                },
              }}
            />

            <Stack.Screen
              name="CateClother"
              component={CateClother}
              options={{
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#00A65E', // Màu nền xanh
                },
                headerTintColor: '#fff', // Màu chữ trắng
                headerTitleStyle: {
                  fontWeight: 'bold', // Kiểu chữ tiêu đề
                },
              }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                headerShown: true,
                title: 'Giỏ hàng',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#00A65E', // Màu nền xanh
                },
                headerTintColor: '#fff', // Màu chữ trắng
                headerTitleStyle: {
                  fontWeight: 'bold', // Kiểu chữ tiêu đề
                },
              }}
            />
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{
                headerShown: true,
                title: 'Thanh toán',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#00A65E', // Màu nền xanh
                },
                headerTintColor: '#fff', // Màu chữ trắng
                headerTitleStyle: {
                  fontWeight: 'bold', // Kiểu chữ tiêu đề
                },
              }}
            />

            <Stack.Screen
              name="Favorites"
              component={Favorites}
              options={{
                headerShown: true,
                title: 'Favorites',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#00A65E', // Màu nền xanh
                },
                headerTintColor: '#fff', // Màu chữ trắng
                headerTitleStyle: {
                  fontWeight: 'bold', // Kiểu chữ tiêu đề
                },
              }}
            />

            <Stack.Screen
              name="Notification"
              component={Notification}
              options={{
                headerShown: true,
                title: 'Notification',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#00A65E', // Màu nền xanh
                },
                headerTintColor: '#fff', // Màu chữ trắng
                headerTitleStyle: {
                  fontWeight: 'bold', // Kiểu chữ tiêu đề
                },
              }}
            />
            <Stack.Screen
              name="DetailedOrders"
              component={DetailedOrders}
              options={{
                headerShown: true,
                headerTitleAlign: 'center',
                title: 'Chi tiết đơn hàng',
                headerStyle: {
                  backgroundColor: '#00A65E', // Màu nền xanh
                },
                headerTintColor: '#fff', // Màu chữ trắng
                headerTitleStyle: {
                  fontWeight: 'bold', // Kiểu chữ tiêu đề
                },
              }}
            />

            <Stack.Screen
              name="ProductDetailScreen"
              component={ProductDetailScreen}
              options={{
                headerShown: true,
                title: 'Chi tiết sản phẩm',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#00A65E', // Màu nền xanh
                },
                headerTintColor: '#fff', // Màu chữ trắng
                headerTitleStyle: {
                  fontWeight: 'bold', // Kiểu chữ tiêu đề
                },
              }}
            />
            <Stack.Screen
              name="Congrats"
              component={Congrats}
              options={{
                headerShown: false,
                title: 'Congrats',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#00A65E', // Màu nền xanh
                },
                headerTintColor: '#fff', // Màu chữ trắng
                headerTitleStyle: {
                  fontWeight: 'bold', // Kiểu chữ tiêu đề
                },
              }}
            />

            <Stack.Screen
              name="AllProductScreen"
              component={AllProductScreen}
              options={{
                headerShown: true,
                title: 'Tất cả sản phẩm',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#00A65E', // Màu nền xanh
                },
                headerTintColor: '#fff', // Màu chữ trắng
                headerTitleStyle: {
                  fontWeight: 'bold', // Kiểu chữ tiêu đề
                },
              }}
            />

            <Stack.Screen
              name="ShippingAddressScreen"
              component={ShippingAddressScreen}
              options={{
                headerShown: true,
                title: 'Địa chỉ',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#00A65E', // Màu nền xanh
                },
                headerTintColor: '#fff', // Màu chữ trắng
                headerTitleStyle: {
                  fontWeight: 'bold', // Kiểu chữ tiêu đề
                },
              }}
            />
            <Stack.Screen
              name="AddAddress"
              component={AddAddress}
              options={{
                headerShown: true,
                title: 'Thêm Địa chỉ',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#00A65E', // Màu nền xanh
                },
                headerTintColor: '#fff', // Màu chữ trắng
                headerTitleStyle: {
                  fontWeight: 'bold', // Kiểu chữ tiêu đề
                },
              }}
            />
            <Stack.Screen
              name="SettingScreen"
              component={SettingScreen}
              options={{
                headerShown: true,
                title: 'Cài đặt',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#00A65E', // Màu nền xanh
                },
                headerTintColor: '#fff', // Màu chữ trắng
                headerTitleStyle: {
                  fontWeight: 'bold', // Kiểu chữ tiêu đề
                },
              }}
            />

           
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

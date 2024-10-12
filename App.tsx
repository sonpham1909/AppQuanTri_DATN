import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../AppQuanTri_DATN/src/screens/LoginScreen/LoginScreen';
import Welcom from '../AppQuanTri_DATN/src/screens/Welcom/SplashScreen';
import Registered from '../AppQuanTri_DATN/src/screens/Registered/Registered';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from '../AppQuanTri_DATN/src/navigation/BottomTabNavigator';
import AccountScreen from '../AppQuanTri_DATN/src/screens/AccountScreen/AccountScreen';
import CategoriesScreen from '../AppQuanTri_DATN/src/screens/CategoriesScreen/CategoriesScreen';
import InvoicesScreen from '../AppQuanTri_DATN/src/screens/InvoicesScreen/InvoicesScreen';
import StatisticsScreen from '../AppQuanTri_DATN/src/screens/StatisticsScreen/StatisticsScreen';
import ReviewsScreen from '../AppQuanTri_DATN/src/screens/ReviewsScreen/ReviewsScreen';
import store from '../AppQuanTri_DATN/src/redux/store/store'; // Đường dẫn tới store.js
import {Provider} from 'react-redux'; // Thêm import Provider từ react-redux
import Cart from '../AppQuanTri_DATN/src/screens/Cart/Cart';
import Checkout from '../AppQuanTri_DATN/src/screens/CheckOut/Checkout';
import DetailedOrders from '../AppQuanTri_DATN/src/screens/DetailedOrders/DetailedOrders';
import Congrats from '../AppQuanTri_DATN/src/screens/Congrats/Congrats';
import AddAddress from './src/screens/ShippingAddressScreen/AddAddressScreen';
import SettingScreen from './src/screens/SettingScreen/SettingScreen';
import ShippingAddressScreen from './src/screens/ShippingAddressScreen/ShippingAddressScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcom"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcom" component={Welcom} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registered" component={Registered} />
        <Stack.Screen
          name="DetailedOrders"
          component={DetailedOrders}
          options={{
            headerShown: true,
            title: 'DetailedOrders',
            headerStyle: {
              backgroundColor: '#00A65E', // Màu nền xanh
            },
            headerTintColor: '#fff', // Màu chữ trắng
            headerTitleStyle: {
              fontWeight: 'bold', // Kiểu chữ tiêu đề
            },
            headerTitleAlign: 'center', // Center the title in all screens

          }}
        />
        <Stack.Screen
          name="Congrats"
          component={Congrats}
          options={{
            headerShown: true,
            title: 'Congrats',
            headerStyle: {
              backgroundColor: '#00A65E', // Màu nền xanh
            },
            headerTintColor: '#fff', // Màu chữ trắng
            headerTitleStyle: {
              fontWeight: 'bold', // Kiểu chữ tiêu đề
            },
            headerTitleAlign: 'center', // Center the title in all screens

          }}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: true,
            title: 'Cart',
            headerStyle: {
              backgroundColor: '#00A65E', // Màu nền xanh
            },
            headerTintColor: '#fff', // Màu chữ trắng
            headerTitleStyle: {
              fontWeight: 'bold', // Kiểu chữ tiêu đề
            },
            headerTitleAlign: 'center', // Center the title in all screens

          }}
        />

        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{
            headerShown: true,
            title: 'Checkout',
            headerStyle: {
              backgroundColor: '#00A65E', // Màu nền xanh
            },
            headerTintColor: '#fff', // Màu chữ trắng
            headerTitleStyle: {
              fontWeight: 'bold', // Kiểu chữ tiêu đề
            },
            headerTitleAlign: 'center', // Center the title in all screens

          }}
        />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            headerShown: true,
            title: 'Tài khoản',
            headerStyle: {
              backgroundColor: '#00A65E', // Màu nền xanh
            },
            headerTintColor: '#fff', // Màu chữ trắng
            headerTitleStyle: {
              fontWeight: 'bold', // Kiểu chữ tiêu đề
            },
            headerTitleAlign: 'center', // Center the title in all screens

          }}
        />

        <Stack.Screen
          name="CategoriesScreen"
          component={CategoriesScreen}
          options={{
            headerShown: true,
            title: 'Danh mục',
            headerStyle: {
              backgroundColor: '#00A65E', // Màu nền xanh
            },
            headerTintColor: '#fff', // Màu chữ trắng
            headerTitleStyle: {
              fontWeight: 'bold', // Kiểu chữ tiêu đề
            },
            headerTitleAlign: 'center', // Center the title in all screens

          }}
        />

        <Stack.Screen
          name="InvoicesScreen"
          component={InvoicesScreen}
          options={{
            headerShown: true,
            title: 'Hóa đơn',
            headerStyle: {
              backgroundColor: '#00A65E', // Màu nền xanh
            },
            headerTintColor: '#fff', // Màu chữ trắng
            headerTitleStyle: {
              fontWeight: 'bold', // Kiểu chữ tiêu đề
            },
            headerTitleAlign: 'center', // Center the title in all screens

          }}
        />

        <Stack.Screen
          name="StatisticsScreen"
          component={StatisticsScreen}
          options={{
            headerShown: true,
            title: 'Thống kê',
            headerStyle: {
              backgroundColor: '#00A65E', // Màu nền xanh
            },
            headerTintColor: '#fff', // Màu chữ trắng
            headerTitleStyle: {
              fontWeight: 'bold', // Kiểu chữ tiêu đề
            },
            headerTitleAlign: 'center', // Center the title in all screens

          }}
        />

        <Stack.Screen
          name="ReviewsScreen"
          component={ReviewsScreen}
          options={{
            headerShown: true,
            title: 'Nhận xét',
            headerStyle: {
              backgroundColor: '#00A65E', // Màu nền xanh
            },
            headerTintColor: '#fff', // Màu chữ trắng
            headerTitleStyle: {
              fontWeight: 'bold', // Kiểu chữ tiêu đề
            },
            headerTitleAlign: 'center', // Center the title in all screens

          }}
        />

        <Stack.Screen name="ShippingAddressScreen" component={ShippingAddressScreen} 
        options={{
          headerShown: true,
          title: 'Nhận xét',
          headerStyle: {
            backgroundColor: '#00A65E', // Màu nền xanh
          },
          headerTintColor: '#fff', // Màu chữ trắng
          headerTitleStyle: {
            fontWeight: 'bold', // Kiểu chữ tiêu đề
          },
          headerTitleAlign: 'center', // Center the title in all screens

        }}
        />
        <Stack.Screen name="AddAddress" component={AddAddress}
        options={{
          headerShown: true,
          title: 'AddAddress',
          headerStyle: {
            backgroundColor: '#00A65E', // Màu nền xanh
          },
          headerTintColor: '#fff', // Màu chữ trắng
          headerTitleStyle: {
            fontWeight: 'bold', // Kiểu chữ tiêu đề
          },
          headerTitleAlign: 'center', // Center the title in all screens

        }} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} 
        options={{
          headerShown: true,
          title: 'SettingScreen',
          headerStyle: {
            backgroundColor: '#00A65E', // Màu nền xanh
          },
          headerTintColor: '#fff', // Màu chữ trắng
          headerTitleStyle: {
            fontWeight: 'bold', // Kiểu chữ tiêu đề
          },
          headerTitleAlign: 'center', // Center the title in all screens

        }}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

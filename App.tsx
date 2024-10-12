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
import ReviewsScreen from '../AppQuanTri_DATN/src/screens/ReviewsScreen/ReviewsScreen';
import store from '../AppQuanTri_DATN/src/redux/store/store'; // Đường dẫn tới store.js
import {Provider} from 'react-redux'; // Thêm import Provider từ react-redux
import CateClother from '../AppQuanTri_DATN/src/screens/CateClotherScreen/CateClotherScreen';
import Cart from '../AppQuanTri_DATN/src/screens/Cart/Cart';
import Checkout from '../AppQuanTri_DATN/src/screens/CheckOut/Checkout';
import Favorites from '../AppQuanTri_DATN/src/screens/Favotires/Favotires';
import Notification from '../AppQuanTri_DATN/src/screens/Nofication/Nofication';
import DetailedOrders from '../AppQuanTri_DATN/src/screens/DetailedOrders/DetailedOrders';
import ProductDetailScreen from '../AppQuanTri_DATN/src/screens/ProductDetailScreen/ProductDetailScreen'
import Congrats from '../AppQuanTri_DATN/src/screens/Congrats/Congrats'
import AllProductScreen from '../AppQuanTri_DATN/src/screens/AllProductScreen/AllProductScreen'
import SettingScreen from './src/screens/SettingScreen/SettingScreen';
import ShippingAddressScreen from './src/screens/ShippingAddressScreen/ShippingAddressScreen';
import AddAddress from './src/screens/ShippingAddressScreen/AddAddressScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcom"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcom" component={Welcom} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registered" component={Registered} />


         

          <Stack.Screen name="Home" component={BottomTabNavigator} />
  
          <Stack.Screen
            name="AccountScreen"
            component={AccountScreen}
            options={{
              headerShown: true,
              headerTitleAlign: 'center',
              title: 'Tài khoản',
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
            name="CategoriesScreen"
            component={CategoriesScreen}
            options={{
              headerShown: true,
              title: 'Danh mục',
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
 
        <Stack.Screen name="CateClother"
        component={CateClother}
        options={{
          headerShown: true,
          title: 'Clother',
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
           <Stack.Screen name="Cart" component={Cart}
            options={{
              headerShown: true,
              title: 'Cart',
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
                 <Stack.Screen name="Checkout" component={Checkout}
          options={{
            headerShown: true,
            title: 'Checkout',
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
        
        <Stack.Screen name="Favorites" component={Favorites}
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
        
        <Stack.Screen name="Notification" component={Notification}
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
                <Stack.Screen name="DetailedOrders" component={DetailedOrders}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            title: 'DetailedOrders',
            headerStyle: {
              backgroundColor: '#00A65E', // Màu nền xanh
            },
            headerTintColor: '#fff', // Màu chữ trắng
            headerTitleStyle: {
              fontWeight: 'bold', // Kiểu chữ tiêu đề
            },
          }}
        />
        
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen}
          options={{
            headerShown: true,
            title: 'ProductDetailScreen',
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
        <Stack.Screen name="Congrats" component={Congrats}
          options={{
            headerShown: true,
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
        
        <Stack.Screen name="AllProductScreen" component={AllProductScreen}
          options={{
            headerShown: true,
            title: 'AllProductScreen',
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


        <Stack.Screen name="ShippingAddressScreen" component={ShippingAddressScreen} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
      
        </Stack.Navigator>
    

      </NavigationContainer>
    </Provider>
  );
};

export default App;

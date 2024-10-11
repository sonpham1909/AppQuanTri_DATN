import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../AppQuanTri_DATN/src/screens/LoginScreen/LoginScreen';
import Welcom from '../AppQuanTri_DATN/src/screens/Welcom/SplashScreen';
import Registered from '../AppQuanTri_DATN/src/screens/Registered/Registered';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from '../AppQuanTri_DATN/src/navigation/BottomTabNavigator';
import ProductsScreen from '../AppQuanTri_DATN/src/screens/ProductsScreen/ProductsScreen'; // Import các màn hình khác
import AccountScreen from '../AppQuanTri_DATN/src/screens/AccountScreen/AccountScreen';
import CategoriesScreen from '../AppQuanTri_DATN/src/screens/CategoriesScreen/CategoriesScreen';
import InvoicesScreen from '../AppQuanTri_DATN/src/screens/InvoicesScreen/InvoicesScreen';
import StatisticsScreen from '../AppQuanTri_DATN/src/screens/StatisticsScreen/StatisticsScreen';
import ReviewsScreen from '../AppQuanTri_DATN/src/screens/ReviewsScreen/ReviewsScreen';
import store from '../AppQuanTri_DATN/src/redux/store/store'; // Đường dẫn tới store.js
import {Provider} from 'react-redux'; // Thêm import Provider từ react-redux
import AddProduct from '../AppQuanTri_DATN/src/screens/ProductsScreen/AddproductSrceen';
import CateClother from '../AppQuanTri_DATN/src/screens/CateClotherScreen/CateClotherScreen';
import Cart from '../AppQuanTri_DATN/src/screens/Cart/Cart';
import Checkout from '../AppQuanTri_DATN/src/screens/CheckOut/Checkout';
import Favorites from '../AppQuanTri_DATN/src/screens/Favotires/Favotires';
import Notification from '../AppQuanTri_DATN/src/screens/Nofication/Nofication';
import DetailedOrders from '../AppQuanTri_DATN/src/screens/DetailedOrders/DetailedOrders';
import ProductDetailScreen from '../AppQuanTri_DATN/src/screens/ProductDetailScreen/ProductDetailScreen'
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcom" component={Welcom} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registered" component={Registered} />


         

          <Stack.Screen name="Home" component={BottomTabNavigator} />
          <Stack.Screen
            name="ProductsScreen"
            component={ProductsScreen}
            options={{
              headerShown: true,
              title: 'Sản phẩm',
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
            }}
          />
          <Stack.Screen name="Addproduct"
          component={AddProduct}
          options={{
            headerShown: true,
            title: 'Add sản phẩm',
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
    </Provider>
  );
};

export default App;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import colors from '../constants/colors';
import Nofication from '../screens/Nofication/Nofication';

import Customer from '../screens/Customer/Customer';
import Personal from '../screens/Personal/Personal';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Trang chủ') {
            iconName = focused ? 'home' : 'home-outline';  // Using filled and outline icons from MaterialCommunityIcons
          } else if (route.name === 'Khách hàng') {
            iconName = focused ? 'account' : 'account-outline';  // Icon for Khách hàng
          } else if (route.name === 'Thông báo') {
            iconName = focused ? 'bell' : 'bell-outline';  // Icon for Thông báo
          } else if (route.name === 'Cá nhân') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';  // Icon for Cá nhân
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarActiveBackgroundColor: '#00A65E',
        tabBarInactiveBackgroundColor: '#00A65E',
        tabBarStyle: {
          backgroundColor: '#00A65E',
        },
        headerStyle: {
          backgroundColor: '#00A65E',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Trang chủ" 
        component={HomeScreen} 
        options={{ title: 'Trang chủ' }} 
      />
      <Tab.Screen 
        name="Khách hàng" 
        component={Customer} 
        options={{ title: 'Khách hàng' }} 
      />
      <Tab.Screen 
        name="Thông báo" 
        component={Nofication} 
        options={{ title: 'Thông báo' }} 
      />
      <Tab.Screen 
        name="Cá nhân" 
        component={Personal} 
        options={{ title: 'Cá nhân' }} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

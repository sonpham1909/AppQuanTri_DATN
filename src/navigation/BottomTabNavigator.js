import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text, Alert } from 'react-native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import colors from '../constants/colors';
import Nofication from '../screens/Nofication/Nofication';
import Customer from '../screens/Customer/Customer';
import Personal from '../screens/Personal/Personal';

const Tab = createBottomTabNavigator();

const CustomHomeHeader = () => {
  const [searchText, setSearchText] = useState('');

  const handleTextChange = (text) => {
    if (text.length <= 39) {
      setSearchText(text);
    } else {
      Alert.alert('Thông báo', 'Bạn không thể nhập quá 40 ký tự!');
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <Image source={require('../assets/images/home_search.png')} style={styles.icon} />
        <TextInput 
          placeholder="Tìm Kiếm..." 
          style={styles.searchInput} 
          value={searchText}
          onChangeText={handleTextChange} // Cập nhật text khi người dùng nhập
          maxLength={40} // Giới hạn số ký tự
        />
      </View>
      <TouchableOpacity style={styles.notificationButton}>
        <View style={styles.notificationIconContainer}> 
          <Image source={require('../assets/images/home_notification.png')} style={styles.icon1} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Trang chủ') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Khách hàng') {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === 'Thông báo') {
            iconName = focused ? 'bell' : 'bell-outline';
          } else if (route.name === 'Cá nhân') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
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
        options={{ 
          title: 'Trang chủ',
          headerTitle: (props) => <CustomHomeHeader {...props} />,  // Set custom header
        }} 
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: 330,
    justifyContent: 'space-between', // Để phân chia không gian giữa các phần tử
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  notificationButton: {
    padding: 10,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 10, // Khoảng cách giữa biểu tượng và ô input
  },
  notificationIconContainer: {
    width: 35, // Đặt chiều rộng cho hình tròn
    height: 35, // Đặt chiều cao cho hình tròn
    borderRadius: 20, // Bán kính để tạo hình tròn
    backgroundColor: 'white', // Màu nền
    justifyContent: 'center',
    alignItems: 'center', // Canh giữa nội dung
  },
});

export default BottomTabNavigator;

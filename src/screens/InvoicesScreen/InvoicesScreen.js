import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator, ScrollView } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import InvoiceCard from '../../components/Invoices/InvoiceCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersByStatus } from '../../redux/actions/actionOder';

const initialLayout = { width: Dimensions.get('window').width };

const InvoicesScreen = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.order);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'pending', title: 'Chờ xác nhận' },
    { key: 'processing', title: 'Đang xử lý' },
    { key: 'canceled', title: 'Đã hủy' },
  ]);

  // Lấy trạng thái hiện tại dựa trên tab đang chọn
  const currentStatus = routes[index].key;

  // Gọi API lấy danh sách hóa đơn theo trạng thái khi thay đổi tab
  useEffect(() => {
    dispatch(fetchOrdersByStatus(currentStatus));
  }, [currentStatus, dispatch]);

  // Component render cho từng tab
  const renderOrderList = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#00A65E" />;
    }
    if (error) {
      return <Text style={styles.errorText}>Đã có lỗi xảy ra: {error}</Text>;
    }
    if (orders.length === 0) {
      return <Text style={styles.emptyText}>Không có hóa đơn nào.</Text>;
    }

    return orders.map((order) => (
      <InvoiceCard key={order._id} order={order} />
    ));
  };

  // Hàm render scene
  const renderScene = ({ route }) => {
    return (
      <ScrollView style={styles.scene}>
        {renderOrderList()}
      </ScrollView>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          labelStyle={styles.label}
          activeColor="#00A65E"
          inactiveColor="#999"
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  tabBar: {
    backgroundColor: '#FFF',
  },
  indicator: {
    backgroundColor: '#00A65E',
    height: 3,
  },
  label: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default InvoicesScreen;

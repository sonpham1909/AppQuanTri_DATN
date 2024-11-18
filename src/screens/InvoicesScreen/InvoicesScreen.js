import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import InvoiceCard from '../../components/Invoices/InvoiceCard';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrdersByStatus, cancelOrder} from '../../redux/actions/actionOder';
import StatusView from '../../components/StatusView';

const initialLayout = {width: Dimensions.get('window').width};

const InvoicesScreen = () => {
  const dispatch = useDispatch();
  const {orders, isLoading, error} = useSelector(state => state.order);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'pending', title: 'Chờ xác nhận'},
    {key: 'processing', title: 'Đang xử lý'},
    {key: 'canceled', title: 'Đã hủy'},
    {key: 'delivered', title: 'Thành công'},
  ]);

  // Lấy trạng thái hiện tại dựa trên tab đang chọn
  const currentStatus = routes[index].key;

  // Gọi API lấy danh sách hóa đơn theo trạng thái khi thay đổi tab
  useEffect(() => {
    dispatch(fetchOrdersByStatus(currentStatus));
  }, [currentStatus, dispatch]);

  // Hàm xử lý hủy đơn hàng
  const handleCancelOrder = (orderId) => {
    Alert.alert(
      'Xác nhận hủy đơn',
      'Bạn có chắc chắn muốn hủy đơn hàng này không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => {
            dispatch(cancelOrder(orderId))
              .unwrap()
              .then(() => {
                Alert.alert('Thông báo', 'Đơn hàng đã được hủy thành công.');
                dispatch(fetchOrdersByStatus(currentStatus));
              })
              .catch((error) => {
                Alert.alert('Lỗi', 'Không thể hủy đơn hàng. Vui lòng thử lại sau.');
              });
          },
        },
      ],
      {cancelable: true},
    );
  };

  // Component render cho từng tab
  const renderOrderList = () => {
    if (isLoading) {
      return <StatusView isLoading={true} />;
    }

    if (!orders || orders.length === 0) {
      return <StatusView emptyText="Không có đơn hàng nào." />;
    }
    if (error) {
      return <StatusView error={error} />;
    }

    return orders.map(order => (
      <InvoiceCard
        key={order._id}
        order={order}
        onCancel={() => handleCancelOrder(order._id)}
        showCancelButton={order.status === 'pending' || order.status === 'processing'}
      />
    ));
  };

  // Hàm render scene
  const renderScene = ({route}) => {
    return <ScrollView style={styles.scene}>{renderOrderList()}</ScrollView>;
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          labelStyle={styles.label}
          activeColor="#00A65E"
          inactiveColor="#999"
          scrollEnabled
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
});

export default InvoicesScreen;

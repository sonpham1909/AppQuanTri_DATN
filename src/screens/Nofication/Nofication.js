import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { socket } from '../../services/sockerIo';
import NotificationList from '../../components/Nofication/NotificationList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotification, addNotification } from '../../redux/actions/actionNotification'; // Thêm action addNotification
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../utils/ThemeContact';
import { darkTheme,lightTheme } from '../../utils/theme';

const Notification = () => {
  const dispatch = useDispatch();
  const { isLoading, notification } = useSelector((state) => state.notification);
  
  const {isDarkMode} = useTheme()

  // Lấy danh sách thông báo từ Redux khi component mount
  useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);

  // Lắng nghe thông báo mới từ socket và cập nhật Redux state (nếu cần)
  useEffect(() => {
    socket.on('pushnotification', (data) => {
      // Dispatch action để thêm thông báo mới vào Redux
      dispatch(addNotification(data)); 
      console.log('Received notification:', data);
    });

    // Cleanup khi component bị unmount
    return () => {
      socket.off('pushnotification');
    };
  }, [dispatch]);

  // Lấy lại thông báo khi quay lại màn hình
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchNotification());
      console.log('Received notifi:', notification);
    }, [dispatch])
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }}>Đang tải thông báo...</Text>
      ) : notification.length === 0 ? (
        <Text style={{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }}>Chưa có thông báo nào.</Text>
      ) : (
        <NotificationList notifications={notification} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Notification;

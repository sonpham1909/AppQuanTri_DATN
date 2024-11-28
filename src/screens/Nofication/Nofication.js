import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { socket } from '../../services/sockerIo';
import LocalNotification from '../../services/LocalNotification';

const Notification = () => {
  // Danh sách thông báo (state)
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    // Kiểm tra kết nối và lắng nghe sự kiện 'pushnotification' từ server
    socket.on('pushnotification', (data) => {
      // Log dữ liệu từ server
      // Cập nhật state để thêm thông báo mới vào danh sách
      setNotification((prev) => [...prev, data]);
      console.log('Updated notification state:', [...notification, data]); // Thêm log để kiểm tra
    });

    // Cleanup: Gỡ bỏ các listener khi component bị unmount
    return () => {
      socket.off('pushnotification');
    };
  }, [notification]);

  return (
    <View style={styles.container}>
      {/* Danh sách thông báo nhận được từ server */}
      {notification.length === 0 ? (
        <Text>Chưa có thông báo nào.</Text>
      ) : (
        notification.map((notifi, index) => (
          <View key={index} style={styles.notificationBox}>
            {/* Hiển thị đầy đủ dữ liệu nhận được từ server */}
            <Text style={styles.notificationText}>
              {notifi.title || 'Không có tiêu đề'}: {notifi.message || 'Không có thông báo cụ thể'}
            </Text>

      
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  notificationBox: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderRadius: 5,
  },
  notificationText: {
    fontSize: 16,
  },
});

export default Notification;

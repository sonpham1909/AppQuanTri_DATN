import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { socket } from '../../services/sockerIo';

const Notification = () => {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    // Lắng nghe sự kiện 'pushnotification' từ server và cập nhật state
    socket.on('pushnotification', (data) => {
      setNotification((prev) => [...prev, data]);
      console.log('Received notification:', data);
    });

    // Cleanup khi component bị unmount
    return () => {
      socket.off('pushnotification');
    };
  }, []); // [] để đảm bảo chỉ thiết lập listener một lần

  return (
    <View style={styles.container}>
      {notification.length === 0 ? (
        <Text>Chưa có thông báo nào.</Text>
      ) : (
        notification.map((notifi, index) => (
          <View key={index} style={styles.notificationBox}>
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

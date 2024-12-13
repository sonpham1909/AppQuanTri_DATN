import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import moment from 'moment'; // Sử dụng thư viện moment.js hoặc tự viết hàm

const NotificationItem = ({ item }) => {
  const formatTime = (time) => {
    const now = new Date();
    const createdAt = new Date(time);

    const diffMs = now - createdAt; // Khoảng cách thời gian tính bằng ms
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 60) return `${diffMinutes} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    return moment(createdAt).format('HH:mm DD/MM/YYYY'); // Định dạng thời gian cụ thể nếu quá 1 ngày
  };

  return (
    <View style={styles.container}>
      {item.imgNotifi && item.imgNotifi.length > 0 ? (
        <Image source={{ uri: item.imgNotifi[0] }} style={styles.image} />
      ) : (
        <Image source={require('../../assets/images/icon_shoping.png')} style={styles.image} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{formatTime(item.createdAt)}</Text>
        <Text style={styles.description}>{item.message}</Text>
        {item.status && (
          <Text style={item.status === 'unread' ? styles.newStatus : styles.defaultStatus}>
            {item.status}
          </Text>
        )}
      </View>
      <View style={styles.separator}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
  },
  image: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#f0f0f0', // Background khi không có ảnh
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    color: '#888',
    marginBottom: 5,
  },
  status: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  newStatus: {
    color: 'green',
  },
  defaultStatus: {
    color: '#888',
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 10,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
});

export default NotificationItem;

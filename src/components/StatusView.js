import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const StatusView = ({ isLoading, error, emptyText }) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00A65E" />
        <Text style={styles.text}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (emptyText) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{emptyText}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Đã có lỗi xảy ra: {error}</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default StatusView;

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const NotificationItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {item.status && <Text style={[styles.status, item.status === 'New' ? styles.newStatus : styles.defaultStatus]}>{item.status}</Text>}
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
    marginHorizontal:10,
    height: 1,  // Adjust the thickness of the line
    backgroundColor: '#E0E0E0',  // Light grey color to resemble the white line in the image
  },
});

export default NotificationItem;

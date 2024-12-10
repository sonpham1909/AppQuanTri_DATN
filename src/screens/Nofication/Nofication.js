import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NotificationList from '../../components/Nofication/NotificationList';

const Notification = () => {
  const notifications = [
    {
      id: 1,
      image: require('../../assets/images/item_1.png'),
      title: 'Your order #123456789 has been confirmed',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.',
      status: 'New',
    },
    {
      id: 2,
      image: require('../../assets/images/item_1.png'),
      title: 'Your order #123456789 has been canceled',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.',
      status: '',
    },
    {
      id: 3,
      image: require('../../assets/images/item_1.png'),
      title: 'Your order #123456789 has been shipped successfully',
      description: 'Please help us to confirm and rate your order to get 10% discount code for next order.',
      status: '',
    },
    {
      id: 4,
      image: require('../../assets/images/item_1.png'),
      title: 'Your order #123456789 has been confirmed',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec.',
      status: 'New',
    },
  ];

  return (
    <View style={styles.container}>
      <NotificationList notifications={notifications} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#00A65E',
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
  },
});

export default Notification;

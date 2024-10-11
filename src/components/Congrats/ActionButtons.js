import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ActionButtons = ({ navigation }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.trackOrderButton}
        onPress={() => navigation.navigate('InvoicesScreen')} // Navigate to the tracking screen
      >
        <Text style={styles.trackOrderButtonText}>Theo dõi đơn hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backHomeButton}
        onPress={() => navigation.navigate('Trang chủ')} // Navigate to the home screen
      >
        <Text style={styles.backHomeButtonText}>Trở lại trang chủ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
  trackOrderButton: {
    width:315,
    backgroundColor: '#00A65E',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginBottom: 15,
    alignItems:'center'
  },
  trackOrderButtonText: {
    color: '#fff',
    
    fontSize: 16,
    fontWeight: 'bold',
  },
  backHomeButton: {
    width:315,
    alignItems:'center',

    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  backHomeButtonText: {
    color: '#333',
    fontSize: 16,
  },
});

export default ActionButtons;

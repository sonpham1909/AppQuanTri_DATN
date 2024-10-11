import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InvoiceCard = () => {
  const navigation = useNavigation();

  const handleDetailPress = () => {
    navigation.navigate('DetailedOrders');
  };

  return (
    <View style={styles.invoiceCard}>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <View style={styles.invoiceHeader}>
          <Text style={styles.invoiceText}>Order No238562312</Text>
          <Text style={styles.detailText}>20/03/2020</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={{ paddingHorizontal: 40, paddingBottom: 20 }}>
        <View style={styles.invoiceDetails}>
          <Text style={styles.detailText}>
            Số lượng: <Text style={styles.invoiceText}>03</Text>
          </Text>
          <Text style={styles.detailText}>
            Tổng tiền: <Text style={styles.boldText}>$150</Text>
          </Text>
        </View>
        <View style={styles.invoiceActions}>
          <TouchableOpacity style={styles.detailButton} onPress={handleDetailPress}>
            <Text style={styles.buttonText}>Chi tiết</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.confirmText}>Hủy đơn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  invoiceCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 10,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  invoiceText: {
    fontSize: 16,
    color: '#242424',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
  invoiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 14,
    color: '#808080',
  },
  boldText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  invoiceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailButton: {
    backgroundColor: '#242424',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  confirmText: {
    color: '#27AE60',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InvoiceCard;

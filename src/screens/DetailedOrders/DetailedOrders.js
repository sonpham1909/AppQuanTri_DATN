import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Picker } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the MaterialCommunityIcons

const DetailedOrders = () => {
  const [status, setStatus] = useState("Chờ xác nhận");

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Đơn hàng: HD1</Text>
        <Text style={styles.headerDate}>16/10/2023</Text>
      </View>

      {/* Hàng hóa */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="package-variant-closed" size={20} color="#00A65E" />
          <Text style={styles.sectionTitle}>Hàng hóa</Text>
        </View>

        {/* Group of three items */}
        <View style={styles.groupedProducts}>
          {[1, 2, 3].map((item, index) => (
            <View style={styles.productItem} key={index}>
              <Image source={require('../../assets/images/item_1.png')} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item}. Quần dài</Text>
                <Text style={styles.productPrice}>1 x 20,000 Đ</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Khách hàng */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="account-outline" size={20} color="#00A65E" />
          <Text style={styles.sectionTitle}>Khách hàng</Text>
        </View>
        <View style={styles.customerInfo}>
          <View style={styles.customerRow}>
            <MaterialCommunityIcons name="account-outline" size={20} color="#00A65E" />
            <Text style={styles.customerText}>Nguyễn Như Hiếu</Text>
          </View>
          <View style={styles.customerRow}>
            <MaterialCommunityIcons name="phone" size={20} color="#00A65E" />
            <Text style={styles.customerText}> 0984907397</Text>
          </View>
          <View style={styles.customerRow}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#00A65E" />
            <Text style={styles.customerText}> Phúc Thọ - Hà Nội</Text>
          </View>
        </View>
      </View>

      {/* Thanh toán */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="credit-card-outline" size={20} color="#00A65E" />
          <Text style={styles.sectionTitle}>Thanh toán</Text>
        </View>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentText}>Date: 4h30</Text>
          <Text style={styles.paymentText}>Method: Shipcode</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1, // For Android shadow
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerDate: {
    fontSize: 16,
    color: '#999',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  /* Grouped Products inside One Border */
  groupedProducts: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1, // For Android shadow
  },

  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1, // Line between grouped items
    borderBottomColor: '#E0E0E0',
  },

  productItemLast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },

  productImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 5, // Rounded corners for the image
  },
  productInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  customerInfo: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1, // Changed from background to border
    borderColor: '#E0E0E0',
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  customerText: {
    fontSize: 16,
    marginLeft: 5, // Added spacing after the icon
  },

  paymentInfo: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1, // Changed from background to border
    borderColor: '#E0E0E0',
  },
  paymentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#00A65E',
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DetailedOrders;

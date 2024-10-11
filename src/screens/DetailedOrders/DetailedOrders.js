import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

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
        <Text style={styles.sectionTitle}>Hàng hóa</Text>
        <View style={styles.productItem}>
          <Image source={require('../../assets/images/item_1.png')} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>1. Quần dài</Text>
            <Text style={styles.productPrice}>1 x 20,000 Đ</Text>
          </View>
        </View>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Số lượng sản phẩm</Text>
          <Text style={styles.totalValue}>3</Text>
        </View>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Tổng tiền</Text>
          <Text style={styles.totalValue}>60,000 Đ</Text>
        </View>
      </View>

      {/* Khách hàng */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Khách hàng</Text>
        <View style={styles.customerInfo}>
          <Text style={styles.customerText}>📞 0984907397</Text>
          <Text style={styles.customerText}>📍 Phúc Thọ - Hà Nội</Text>
          <Text style={styles.customerText}>Tên</Text>
        </View>
      </View>

      {/* Thanh toán */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thanh toán</Text>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentText}>Date: 4h30</Text>
          <Text style={styles.paymentText}>Method: Shipcode</Text>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20, // Tăng padding hai bên để tạo khoảng cách
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Tăng khoảng cách phía dưới
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
    marginBottom: 25, // Tăng khoảng cách giữa các section
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15, // Tăng khoảng cách phía dưới tiêu đề
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15, // Tăng chiều cao mỗi mục
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  productImage: {
    width: 60, // Tăng kích thước ảnh
    height: 60,
    marginRight: 15,
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
  totalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10, // Tăng khoảng cách giữa các thông tin tổng
  },
  totalLabel: {
    fontSize: 16,
    color: '#888',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  customerInfo: {
    backgroundColor: '#F9F9F9',
    padding: 15, // Tăng padding bên trong hộp khách hàng
    borderRadius: 8,
  },
  customerText: {
    fontSize: 16,
    marginBottom: 5,
  },
  paymentInfo: {
    backgroundColor: '#F9F9F9',
    padding: 15, // Tăng padding bên trong hộp thanh toán
    borderRadius: 8,
  },
  paymentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#00A65E',
    paddingVertical: 20, // Tăng chiều cao của nút Lưu
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20, // Tăng khoảng cách phía trên nút
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DetailedOrders;

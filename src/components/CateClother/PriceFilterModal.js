import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const PriceFilterModal = ({ visible, onClose, applyFilters, priceRange = [0, 10000000] }) => {
  const [tempMinPrice, setTempMinPrice] = useState(priceRange[0]);
  const [tempMaxPrice, setTempMaxPrice] = useState(priceRange[1]);

  useEffect(() => {
    setTempMinPrice(priceRange[0]);
    setTempMaxPrice(priceRange[1]);
  }, [priceRange, visible]);

  const applyFilter = () => {
    applyFilters(tempMinPrice, tempMaxPrice); // Chuyển khoảng giá cho hàm applyFilters
    onClose();
  };

  const resetFilter = () => {
    setTempMinPrice(0);
    setTempMaxPrice(10000000);
    applyFilters(0, 10000000); // Reset giá trị lọc về mặc định
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chọn khoảng giá</Text>

          <View style={styles.sliderContainer}>
            <Text style={styles.priceText}>Giá từ: {tempMinPrice.toLocaleString('vi-VN')} VND</Text>
            <Slider
   style={styles.slider}
   minimumValue={0}
   maximumValue={10000000}
   defaultValue={tempMinPrice}
   step={50000}
   minimumTrackTintColor="#00A65E"
   maximumTrackTintColor="#ddd"
   thumbTintColor="#00A65E"
   onSlidingComplete={(value) => setTempMinPrice(value)} // Lưu giá trị khi dừng kéo
/>

          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.priceText}>Giá đến: {tempMaxPrice.toLocaleString('vi-VN')} VND</Text>
            <Slider
   style={styles.slider}
   minimumValue={0}
   maximumValue={10000000}
   defaultValue={tempMinPrice}
   step={50000}
   minimumTrackTintColor="#00A65E"
   maximumTrackTintColor="#ddd"
   thumbTintColor="#00A65E"
   onSlidingComplete={(value) => setTempMinPrice(value)} // Lưu giá trị khi dừng kéo
/>

          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={resetFilter} style={[styles.actionButton, styles.resetButton]}>
              <Text style={styles.actionButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={applyFilter} style={[styles.actionButton, styles.applyButton]}>
              <Text style={styles.actionButtonText}>Áp dụng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  priceText: {
    fontSize: 16,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#FF7043',
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#00A65E',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PriceFilterModal;

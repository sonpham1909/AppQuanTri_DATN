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
              value={tempMinPrice}
              step={50000}
              minimumTrackTintColor="#00A65E"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#00A65E"
              onValueChange={(value) => setTempMinPrice(value)} // Lưu giá trị khi kéo
            />
          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.priceText}>Giá đến: {tempMaxPrice.toLocaleString('vi-VN')} VND</Text>
            <Slider
              style={styles.slider}
              minimumValue={tempMinPrice} // Giá trị tối thiểu của max phải lớn hơn hoặc bằng min
              maximumValue={10000000}
              value={tempMaxPrice}
              step={50000}
              minimumTrackTintColor="#00A65E"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#00A65E"
              onValueChange={(value) => setTempMaxPrice(value)} // Lưu giá trị khi kéo
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

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  sizeButton: { marginHorizontal: 5, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ddd' },
  selectedButton: { borderColor: '#00A65E', backgroundColor: '#E5F5F1' },
  sizeText: { fontSize: 14 },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  actionButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  resetButton: { backgroundColor: '#ddd' },
  applyButton: { backgroundColor: '#00A65E' },
  actionButtonText: { color: 'white', fontWeight: 'bold' },

});

export default PriceFilterModal;

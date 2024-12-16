import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ColorFilterModal = ({ visible, filterOptions, onClose, applyFilters, initialFilters }) => {
  const [selectedColors, setSelectedColors] = useState(initialFilters || []);

  useEffect(() => {
    setSelectedColors(initialFilters || []);
  }, [initialFilters, visible]);

  // Hàm xử lý toggle chọn hoặc bỏ chọn màu sắc
  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  // Áp dụng bộ lọc và đóng modal
  const applyColorFilter = () => {
    console.log('Selected Colors:', selectedColors);  // Debug selected colors
    applyFilters(selectedColors);
    onClose();
  };
  
  // Reset lại bộ lọc
  const resetColorFilter = () => {
    setSelectedColors([]);
    applyFilters([]);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chọn màu sắc</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {(filterOptions || []).map((color, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleColor(color)}
                style={[
                  styles.colorCircle,
                  { backgroundColor: color ? color.toLowerCase() : '#ccc' }, // Xử lý màu không hợp lệ bằng màu mặc định
                  selectedColors.includes(color) && styles.selectedCircle,
                ]}
              >
                {selectedColors.includes(color) && (
                  <Text style={styles.checkMark}>✔</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={resetColorFilter} style={[styles.actionButton, styles.resetButton]}>
              <Text style={styles.actionButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={applyColorFilter} style={[styles.actionButton, styles.applyButton]}>
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
  colorCircle: { marginHorizontal: 5, width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: '#ddd', justifyContent: 'center', alignItems: 'center' },
  selectedCircle: { borderColor: '#00A65E', borderWidth: 2 },
  checkMark: { color: 'white', fontSize: 14 },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  actionButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  resetButton: { backgroundColor: '#ddd' },
  applyButton: { backgroundColor: '#00A65E' },
  actionButtonText: { color: 'white', fontWeight: 'bold' },
});

export default ColorFilterModal;

import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const SizeFilterModal = ({ visible, filterOptions, onClose, applyFilters, initialFilters }) => {
  const [selectedSizes, setSelectedSizes] = useState(initialFilters || []);

  useEffect(() => {
    setSelectedSizes(initialFilters || []);
  }, [initialFilters, visible]);

  // Hàm xử lý toggle chọn hoặc bỏ chọn size
  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Áp dụng bộ lọc và đóng modal
  const applySizeFilter = () => {
    applyFilters(selectedSizes);
    onClose();
  };

  // Reset lại bộ lọc
  const resetSizeFilter = () => {
    setSelectedSizes([]);
    applyFilters([]);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chọn kích cỡ</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {(filterOptions || []).map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => toggleSize(size)}
                style={[
                  styles.sizeButton,
                  selectedSizes.includes(size) && styles.selectedButton,
                ]}
              >
                <Text style={styles.sizeText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={resetSizeFilter} style={[styles.actionButton, styles.resetButton]}>
              <Text style={styles.actionButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={applySizeFilter} style={[styles.actionButton, styles.applyButton]}>
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

export default SizeFilterModal;

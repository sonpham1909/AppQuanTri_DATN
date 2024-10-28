import React, { useState, useEffect } from 'react'; 
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';

const SizeFilterModal = ({ visible, filterOptions, onClose, applyFilters, initialFilters }) => {
  const [tempSelectedSizes, setTempSelectedSizes] = useState(initialFilters || []);

  useEffect(() => {
    setTempSelectedSizes(initialFilters || []);
  }, [initialFilters, visible]);

  const toggleSize = (size) => {
    setTempSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const applyFilter = () => {
    applyFilters({ size: tempSelectedSizes });
    onClose();
  };

  const resetFilter = () => {
    setTempSelectedSizes([]);
    applyFilters({ size: [] });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chọn kích cỡ</Text>

          {/* Nút lựa chọn kích cỡ */}
          <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
            {(filterOptions || []).map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => toggleSize(size)}
                style={[
                  styles.sizeButton,
                  tempSelectedSizes.includes(size) && styles.sizeButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    tempSelectedSizes.includes(size) && styles.sizeButtonTextSelected,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Nút hành động */}
          <View style={styles.actionButtonsContainer}>
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
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  sizeButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00A65E',
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  sizeButtonSelected: {
    backgroundColor: '#00A65E',
  },
  sizeButtonText: {
    color: '#00A65E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sizeButtonTextSelected: {
    color: 'white',
  },
  actionButtonsContainer: {
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

export default SizeFilterModal;

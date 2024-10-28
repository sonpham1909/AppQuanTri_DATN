import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ColorFilterModal = ({ visible, filterOptions, onClose, applyFilters, initialFilters }) => {
  const [tempSelectedColors, setTempSelectedColors] = useState(initialFilters || []);

  useEffect(() => {
    setTempSelectedColors(initialFilters || []);
  }, [initialFilters, visible]);

  const toggleColor = (color) => {
    setTempSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const applyFilter = () => {
    applyFilters({ color: tempSelectedColors });
    onClose();
  };

  const resetFilter = () => {
    setTempSelectedColors([]);
    applyFilters({ color: [] });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chọn màu sắc</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {(filterOptions || []).map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => toggleColor(color)}
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: color.toLowerCase(),
                    borderColor: tempSelectedColors.includes(color) ? '#00A65E' : '#ddd',
                  },
                ]}
              >
                {tempSelectedColors.includes(color) && (
                  <Text style={styles.selectedText}>✔</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

export default ColorFilterModal;

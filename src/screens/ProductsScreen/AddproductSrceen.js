import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

const AddProductScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [material, setMaterial] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Áo');
  const [variations, setVariations] = useState([
    { size: 'M', color: 'Trắng', price: '220,000', stock: '50' },
  ]);

  const handleAddVariation = () => {
    setVariations([...variations, { size: 'M', color: 'Trắng', price: '220,000', stock: '50' }]);
  };

  const handleSaveProduct = () => {
    // Xử lý lưu sản phẩm
  };

  const handleDeleteVariation = (index) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>

      {/* Add Image */}
      <TouchableOpacity style={styles.addImageContainer}>
        <Image source={require('../../assets/images/icon_add.png')} style={styles.addImage} />
        <Text>Add Img</Text>
      </TouchableOpacity>

      {/* Tên */}
      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={name}
        onChangeText={setName}
      />

      {/* Giá */}
      <TextInput
        style={styles.input}
        placeholder="Giá"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {/* Vật liệu */}
      <TextInput
        style={styles.input}
        placeholder="Vật liệu"
        value={material}
        onChangeText={setMaterial}
      />

      {/* Mô tả */}
      <TextInput
        style={styles.input}
        placeholder="Mô tả"
        value={description}
        onChangeText={setDescription}
      />

      {/* Loại */}
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Áo" value="Áo" />
        <Picker.Item label="Quần" value="Quần" />
      </Picker>

      {/* Variations Section */}
      <Text style={styles.variationHeading}>Variations</Text>
      <TouchableOpacity style={styles.addVariationButton} onPress={handleAddVariation}>
        <Text style={styles.addVariationText}>+ Thêm thuộc tính</Text>
      </TouchableOpacity>

      {/* List of Variations */}
      <FlatList
        data={variations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.variationRow}>
            <Text>{`| Size: ${item.size} | Màu: ${item.color} | Giá: ${item.price} | Tồn Kho: ${item.stock} |`}</Text>
            <TouchableOpacity onPress={() => handleDeleteVariation(index)}>
              <Text style={styles.actionText}>[Xóa]</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProduct}>
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: spacing.medium,
  },
 
  addImageContainer: {
    alignItems: 'center',
    marginBottom: spacing.large,
  },
  addImage: {
    width: 100,
    height: 100,
    marginBottom: spacing.small,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.small,
    marginBottom: spacing.medium,
  },
  picker: {
    height: 50,
    marginBottom: spacing.medium,
  },
  variationHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacing.small,
  },
  addVariationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  addVariationText: {
    fontSize: 16,
    color: colors.primary,
  },
  variationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.small,
  },
  actionText: {
    color: 'red',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: spacing.medium,
    alignItems: 'center',
    marginTop: spacing.large,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddProductScreen;

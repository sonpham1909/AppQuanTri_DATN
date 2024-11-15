import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PaymentMethod = ({ methods, selectedMethod, onSelectMethod }) => {
  const [selectedValue, setSelectedValue] = useState(selectedMethod);
  const [selectedMethodImage, setSelectedMethodImage] = useState(null);

  useEffect(() => {
    // Chọn phương thức thanh toán đầu tiên mặc định nếu chưa có giá trị được chọn
    if (!selectedValue && methods.length > 0) {
      setSelectedValue(methods[0]._id);
      onSelectMethod(methods[0]._id);
      setSelectedMethodImage(methods[0].image); // Đặt hình ảnh đầu tiên làm mặc định
    }
  }, [methods]);

  const handleValueChange = (value) => {
    setSelectedValue(value);
    onSelectMethod(value);

    // Tìm hình ảnh của phương thức được chọn
    const method = methods.find((method) => method._id === value);
    if (method) {
      setSelectedMethodImage(method.image);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phương thức thanh toán</Text>
      <View style={styles.pickerContainer}>
        {selectedMethodImage && (
          <Image
            source={{ uri: selectedMethodImage }}
            style={styles.methodImage}
          />
        )}
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => handleValueChange(itemValue)}
          style={styles.picker}
        >
          {methods
            .filter((method) => method.is_active) // Lọc chỉ phương thức đang hoạt động
            .map((method) => (
              <Picker.Item key={method._id} label={method.name} value={method._id} />
            ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Nunito Sans',
    color: '#242424',
    marginBottom: 15,
  },
  infoBox: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginLeft:8
  },
  picker: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginRight: 10,
  },
 
  methodImage: {
    width: 50,
    height: 30,
  },
});

export default PaymentMethod;

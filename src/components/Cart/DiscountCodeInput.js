import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const DiscountCodeInput = ({discountCode, onChangeCode}) => {
  return (
    <View style={styles.container}>
      <View style={styles.discountContainer}>
        <TextInput
          placeholder="Nhập mã khuyến mãi của bạn"
          style={styles.discountInput}
          value={discountCode}
          onChangeText={onChangeCode}
        />
        <TouchableOpacity style={styles.discountButton}>
          <Text style={styles.discountButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  discountContainer: {
    width: 350,
    height: 44,
    flexDirection: 'row',
    marginBottom: 20,
    alignContent: 'center',
  },
  discountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#F0F0F0',
    
  },
  discountButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00C853',
    paddingHorizontal: 15,
    marginLeft: 10,
    borderRadius: 5,
  },
  discountButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default DiscountCodeInput;

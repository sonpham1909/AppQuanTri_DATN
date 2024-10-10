import React, { useState } from 'react';
import { TextInput, View, Image, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

const Input = ({ placeholder, secureTextEntry, icon, value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false); // Trạng thái để theo dõi focus

  return (
    <View style={[styles.inputContainer, isFocused && styles.focused]}>
      <Image source={icon} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)} // Khi input được chọn
        onBlur={() => setIsFocused(false)} // Khi input không được chọn
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.medium,
  },
  focused: {
    borderColor: colors.primary, // Màu xanh khi focus
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: spacing.small,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
  },
});

export default Input;

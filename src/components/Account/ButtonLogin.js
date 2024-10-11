import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import spacing from '../../constants/spacing';

const Button = ({ title, onPress, isPrimary = true }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isPrimary ? styles.primary : styles.secondary]}
      onPress={onPress}
    >
      <Text style={isPrimary ? styles.primaryText : styles.secondaryText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: spacing.medium,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.small,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  primaryText: {
    color: '#fff',
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  secondaryText: {
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: 16,
  },
});

export default Button;

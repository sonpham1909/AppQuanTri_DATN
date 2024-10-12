import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

const Header = ({ onpress, title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onpress} style={styles.backButton}>
        <Image style={styles.backIcon} source={require('../../assets/images/icon_back.png')} />
      </TouchableOpacity>
      <Text style={styles.titleScreen}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    backgroundColor: colors.primary,
    borderColor: colors.border,
    borderWidth: 1,
    justifyContent: 'center', // Căn giữa tiêu đề theo chiều ngang
  },
  backButton: {
    position: 'absolute', // Đảm bảo icon luôn ở vị trí cố định
    left: 10, // Đặt icon ở góc trái
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  titleScreen: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Căn giữa tiêu đề trong container
    paddingHorizontal: 40, // Đảm bảo rằng tiêu đề có khoảng trống để không đè lên icon
  },
});

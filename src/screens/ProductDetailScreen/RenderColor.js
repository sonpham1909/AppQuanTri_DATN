import React, { memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { darkTheme, lightTheme } from '../../utils/theme';

// Tạo thành phần ColorOptions
const ColorOptions = memo(({ variants, selectedColor, onColorSelect, isDarkMode }) => {
  return (
    <View>
      <View style={styles.colorContainer}>
        {variants.map((variant, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.colorCircleWrapper,
              selectedColor === variant.color_code && styles.selectedColorWrapper,
            ]}
            onPress={() => onColorSelect(variant)}>
            <View
              style={[
                styles.colorCircle,
                { backgroundColor: variant.color_code },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        <Text style={[styles.sectionLabel, { color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }]}>Màu Sắc: </Text>
        {selectedColor && (
          <Text style={[styles.selectedColorName, { color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }]}>
            {
              variants.find(variant => variant.color_code === selectedColor)?.color
            }
          </Text>
        )}
      </View>
    </View>
  );
});

export default ColorOptions;

const styles = StyleSheet.create({
    container: {flex: 1,},
    detailsContainer: {padding: 16},
    productTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#303030',
      marginVertical: 5,
    },
    reviewSection1: {flexDirection: 'row', alignItems: 'center', marginBottom: 4},
    reviewCountBold: {fontSize: 14, color: '#808080'},
    reviewCount: {fontSize: 12, color: '#27ae60', fontWeight: '500'},
    productImage: {
      width: 396,
      height: 248,
      resizeMode: 'contain',
      borderRadius: 10,
      marginBottom: 25,
    },
    imageContainer: {
      backgroundColor: '#f0f0f0', // Nền màu xám cho container
      borderRadius: 12, // Bo góc cho container
      overflow: 'hidden', // Đảm bảo ảnh không vượt ra khỏi container
      marginVertical: 16,
      height: 250, // Đặt chiều cao của container ảnh
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    imageIndexText: {
      fontSize: 16,
      color: '#333',
      textAlign: 'center',
      marginTop: 8,
    },
    row: {flexDirection: 'row', alignItems: 'center', marginBottom: 14},
  
    sectionLabel: {
      fontSize: 15,
      color: '#303030',
      fontWeight: '500',
    },
  
    colorContainer: {
      flexDirection: 'row',
      marginBottom: 5
    },
    colorCircleWrapper: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 7,
      marginLeft: -3
    },
    selectedColorWrapper: {
      borderWidth: 2,
      borderColor: '#000', // Màu viền ngoài khi màu được chọn
    },
    colorCircle: {
      width: 30,
      height: 30,
      borderRadius: 15, // Đảm bảo hình tròn hoàn hảo
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: '#fff', // Màu nền trắng để tạo khoảng trắng rõ ràng
    },
  
    disabled: {
      opacity: 0.5,
      textDecorationLine: 'line-through',
    },
    selectedColorName: {
      marginRights: 10,
      fontSize: 16,
      color: '#000',
      fontWeight: 'bold',
    },
  
    sizeContainer: {flexDirection: 'row', marginLeft: 8},
    sizeButton: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#ccc',
      marginHorizontal: 4,
    },
    selectedSize: {backgroundColor: '#ddd'},
    price: {fontSize: 20, fontWeight: 'bold', color: '#27ae60', marginBottom: 15},
    quantityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    quantityControls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    quantityButton: {
      width: 30, // Đặt chiều rộng cố định
      height: 30, // Đặt chiều cao cố định
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    quantityButtonText: {
      fontSize: 18,
      color: '#333',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    quantityText: {
      marginHorizontal: 12,
      fontSize: 16,
      color: '#333',
      fontWeight: '600',
    },
    stockText: {
      color: '#27ae60',
      fontSize: 14,
      fontWeight: '500',
    },
    buttonsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginVertical: 20,
    },
  
    favoriteButton: {
      width: 50, // Chiều rộng và chiều cao cố định để tạo hình tròn
      height: 50,
      borderRadius: 10, // Bo góc tròn để tạo thành hình tròn
      backgroundColor: '#F0F0F0', // Màu nền nhẹ nhàng giúp nổi bật icon trái tim
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2, // Thêm đổ bóng để nổi bật
    },
    addToCartButton: {
      backgroundColor: '#27ae60',
      paddingVertical: 15,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
      marginLeft: 16,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    addToCartText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
    },
  
    section: {
      marginVertical: 10,
    },
    sectionPainted: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 12,
    },
  
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', // Đặt icon và tiêu đề căn đều hai bên
      paddingVertical: 8,
    },
  
    sectionContent: {
      fontSize: 14,
      color: '#666',
      paddingVertical: 8,
      paddingLeft: 16, // Thụt lề để phần nội dung dễ phân biệt
    },
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      marginVertical: 8, // Tạo khoảng cách giữa các phần
    },
  
    sectionLabelReview: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginTop: 10,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderColor: '#e0e0e0',
      paddingBottom: 10,
    },
    reviewSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
      justifyContent: 'space-between',
    },
    reviewCountBold: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginLeft: 4,
    },
    reviewCount: {
      fontSize: 14,
      color: '#888',
      marginLeft: 4,
    },
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    userAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 8,
    },
    imgReview: {
      width: 80,
      height: 80,
  
      marginRight: 8,
    },
    userName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    reviewContainer: {
      backgroundColor: '#ffffff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 4,
      shadowOffset: {width: 0, height: 2},
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderColor: '#e0e0e0',
      marginBottom: 12, // Đặt khoảng cách giữa các item
    },
    noBorder: {
      borderBottomWidth: 0, // Bỏ đường kẻ cho item cuối cùng
    },
  
    reviewComment: {
      fontSize: 14,
      color: '#444',
      marginBottom: 4,
    },
    reviewDate: {
      fontSize: 12,
      color: '#888',
    },
    responseText: {
      fontSize: 14,
      color: '#888',
      marginLeft: 8,
      marginTop: 4,
      paddingLeft: 8,
      borderLeftWidth: 1,
      borderColor: '#ddd',
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: 300,
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 10,
      shadowOffset: {width: 0, height: 4},
      elevation: 5,
    },
    modalText: {
      fontSize: 18,
      color: '#333',
      marginBottom: 15,
      textAlign: 'center',
    },
    viewCartButton: {
      backgroundColor: '#27ae60',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginTop: 10,
    },
    viewCartButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    colorCircleWrapper: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 7,
      marginLeft: -3
    },
    selectedColorName: {
      marginRights: 10,
      fontSize: 16,
      color: '#000',
      fontWeight: 'bold',
    },
    imageModalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullscreenImage: {
      width: 420, // Chiều rộng cố định cho mỗi ảnh trong slide
      height: '80%',
    },
    closeButton: {
      position: 'absolute',
      top: 30,
      right: 20,
      zIndex: 1,
    },
    imageIndexText: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
      marginTop: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },
  
  });
  
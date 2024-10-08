import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../constants/colors';  // Sửa lại đường dẫn nếu cần
import FormWrapper from '../../components/FormWrapper';
import Container from '../../components/Container';
import globalStyles from '../../styles/globalStyles';  // Sửa lại đường dẫn nếu cần


const HomeScreen = ({ navigation }) => {
  return (
    <Container>
      <FormWrapper>
        <View style={styles.shortcutsContainer}>
          <Text style={globalStyles.heading}>Lối tắt</Text>
          <View style={styles.row}>
            {/* Sản phẩm */}
            <TouchableOpacity 
              style={styles.shortcut} 
              onPress={() => navigation.navigate('ProductsScreen')}  // Chuyển sang màn hình sản phẩm
            >
              <Icon name="shopping-cart" size={25} color={colors.black} />
              <Text style={globalStyles.orText}>Sản phẩm</Text>
            </TouchableOpacity>

            {/* Tài khoản */}
            <TouchableOpacity 
              style={styles.shortcut} 
              onPress={() => navigation.navigate('AccountScreen')}  // Chuyển sang màn hình tài khoản
            >
              <Icon name="user-plus" size={25} color={colors.black} />
              <Text style={globalStyles.orText}>Tài khoản</Text>
            </TouchableOpacity>

            {/* Danh mục */}
            <TouchableOpacity 
              style={styles.shortcut} 
              onPress={() => navigation.navigate('CategoriesScreen')}  // Chuyển sang màn hình danh mục
            >
              <Icon name="list-alt" size={25} color={colors.black} />
              <Text style={globalStyles.orText}>Danh mục</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            {/* Hóa đơn */}
            <TouchableOpacity 
              style={styles.shortcut} 
              onPress={() => navigation.navigate('InvoicesScreen')}  // Chuyển sang màn hình hóa đơn
            >
              <Icon name="file-text" size={25} color={colors.black} />
              <Text style={globalStyles.orText}>Hóa đơn</Text>
            </TouchableOpacity>

            {/* Thống kê */}
            <TouchableOpacity 
              style={styles.shortcut} 
              onPress={() => navigation.navigate('StatisticsScreen')}  // Chuyển sang màn hình thống kê
            >
              <Icon name="bar-chart" size={25} color={colors.black} />
              <Text style={globalStyles.orText}>Thống kê</Text>
            </TouchableOpacity>

            {/* Nhận xét */}
            <TouchableOpacity 
              style={styles.shortcut} 
              onPress={() => navigation.navigate('ReviewsScreen')}  // Chuyển sang màn hình nhận xét
            >
              <Icon name="comments" size={25} color={colors.black} />
              <Text style={globalStyles.orText}>Nhận xét</Text>
            </TouchableOpacity>
          </View>
        </View>
      </FormWrapper>
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  shortcut: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    elevation: 2, // Đổ bóng
  },
});

export default HomeScreen;

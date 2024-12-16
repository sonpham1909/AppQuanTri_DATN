import { StyleSheet, Text, View, TextInput, Switch, Alert, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import globalStyles from '../../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/actionUser'; 
import { useTheme } from '../../utils/ThemeContact';
import { lightTheme,darkTheme } from '../../utils/theme';
import tokenService from '../../services/tokenService';

const SettingScreen = ({route}) => {
  const navigation = useNavigation();
  const Id = route.params.userId;

  const dispatch = useDispatch(); 
  const { isLoading, isError, message, isSuccess } = useSelector(state => state.user); 

  const [isSalesEnabled, setIsSalesEnabled] = useState(true);
  const [isBackgroundEnabled, setIsBackgroundEnabled] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //chức năng showPassword
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleSalesSwitch = () => setIsSalesEnabled(previousState => !previousState);

  //Lấy trạng thái chuyển đổi theme
  const { isDarkMode, toggleTheme } = useTheme(); 

  // Logout
  const handleLogout = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn đăng xuất không?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đồng ý',
          onPress: async() => {
            await tokenService.removeToken()
            console.log('User logged out');
            navigation.navigate('Login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Đổi mật khẩu
  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập đủ thông tin.');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }
  
    // Kiểm tra mật khẩu cũ trước khi gửi lên server
    if (oldPassword === newPassword) {
      Alert.alert('Lỗi', 'Mật khẩu mới không thể trùng với mật khẩu cũ.');
      return;
    }
  
    // Gửi dữ liệu lên server để thay đổi mật khẩu
    dispatch(changePassword({ userId: Id, oldPassword, newPassword }))
      .unwrap()  // unwrap để lấy promise của kết quả
      .then(() => {
        if (isSuccess) {
          Alert.alert('Thành công', 'Mật khẩu của bạn đã được thay đổi.');
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
        }
      })
      .catch((error) => {
        // Xử lý lỗi từ backend (ví dụ: mật khẩu cũ không đúng)
        if (isError) {
          Alert.alert('Lỗi', 'Mật khẩu cũ không khớp.');
        }
      });
  };
  return (
    <View style={globalStyles.containerSetting}>
      <View style={styles.header}>
        <Text style={[styles.headerText1,{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }]}>Password</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="pencil" size={24} color="#C4C4C4" />
        </TouchableOpacity>
      </View>

    

      <Text style={[styles.notificationHeader,{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }]}>Thông Báo</Text>

      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel,{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }]}>Sales</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isSalesEnabled ? '#4CAF50' : '#f4f3f4'}
          onValueChange={toggleSalesSwitch}
          value={isSalesEnabled}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }]}>
          Chế độ tối
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#4CAF50' : '#f4f3f4'}
          onValueChange={toggleTheme}
          value={isDarkMode}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>

      {/* Modal for changing password */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Đổi mật khẩu</Text>

             <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry={!showOldPassword}
                placeholder="Mật khẩu cũ"
              />
              <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
                <MaterialCommunityIcons
                  name={showOldPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="#C4C4C4"
                />
              </TouchableOpacity>
            </View>

            {/* New password */}
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                placeholder="Mật khẩu mới"
              />
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <MaterialCommunityIcons
                  name={showNewPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="#C4C4C4"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm new password */}
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholder="Xác nhận mật khẩu mới"
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <MaterialCommunityIcons
                  name={showConfirmPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="#C4C4C4"
                />
              </TouchableOpacity>
            </View>


            <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
              <Text style={styles.changePasswordText}>Đổi mật khẩu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText1: {
    color: ' #909191',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Nunito Sans',
    paddingTop: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  label: {
    fontSize: 12,
    color: ' #808080',
    marginBottom: 5,
  },
  label1: {
    fontSize: 14,
    color: '#242424',
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    color: '#333',
    marginBottom: 15,
    width: '85%',  // Set width to 85% of the modal's width
  },
  notificationHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  switchContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  changePasswordButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  changePasswordText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  switchLabel: {
    fontSize: 16,
  },
});

export default SettingScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/actionUser';  // Import action login
import Input from '../../components/Account/Input';
import Button from '../../components/Account/ButtonLogin';
import Container from '../../components/Account/Container';
import FormWrapper from '../../components/Account/FormWrapper';
import globalStyles from '../../styles/globalStyles';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');  // Biến username thay vì email
  const [password, setPassword] = useState('');  // Biến password
  const dispatch = useDispatch();  // Khởi tạo dispatch để gọi action login
  const { isLoading, isError, message } = useSelector((state) => state.user);  // Lấy trạng thái từ Redux store
  
  const handleLogin = () => {
    console.log('Username:', username);  // Log giá trị username
    console.log('Password:', password);  // Log giá trị password
  
    // Kiểm tra xem username và password có hợp lệ hay không
    if (!username || !password || username.trim() === '' || password.trim() === '') {
      console.log('Validation failed: username or password is empty');
      Alert.alert('Lỗi', 'Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }
  
    // Gọi action login từ Redux
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        navigation.replace('Home');
      })
      .catch((error) => {
        Alert.alert('Lỗi đăng nhập', error.message || 'Đăng nhập không thành công');
      });
  };
  
  return (
    <Container>
      <FormWrapper>
        <Text style={globalStyles.heading}>Đăng nhập</Text>
        
        {/* Ô nhập tên đăng nhập */}
        <Input
          placeholder="Tên đăng nhập"
          value={username}  // Sử dụng username thay vì email
          onChangeText={text => setUsername(text)}  // Cập nhật state username
          icon={require('../../assets/images/icon_email.png')}  // Icon cho username
        />

        {/* Ô nhập mật khẩu */}
        <Input
          placeholder="Mật khẩu"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
          icon={require('../../assets/images/icon_password.png')}
        />

        {/* Link Quên mật khẩu */}
        <TouchableOpacity style={globalStyles.forgotPassword}>
          <Text style={globalStyles.linkText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        {/* Nút đăng nhập */}
        <Button title="Đăng nhập" onPress={handleLogin} isPrimary isLoading={isLoading} />

        {/* Nút đăng ký */}
        <Button title="Đăng ký" onPress={() => navigation.replace('Registered')} isPrimary={false} />
        
        {/* Đăng nhập với Google */}
        <Text style={globalStyles.orText}>Hoặc đăng nhập với Google</Text>
        <Image
          source={require('../../assets/images/icon_google.png')}
          style={globalStyles.googleIcon}
        />
      </FormWrapper>
    </Container>
  );
};

export default LoginScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/actionUser';
import Input from '../../components/Input';
import Button from '../../components/ButtonLogin';
import Container from '../../components/Container';
import FormWrapper from '../../components/FormWrapper';
import globalStyles from '../../styles/globalStyles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');  // Đổi lại thành 'email' thay vì 'email1'
  const [password, setPassword] = useState('');  // Đổi lại thành 'password' thay vì 'password1'
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.user);

  const handleLogin = () => {
    navigation.replace("Home")
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập email và mật khẩu');
      return;
    }

    dispatch(login({ email, password }))  // Sửa lại tên biến
      .unwrap()
      .then(() => {
        navigation.replace('Home');  // Điều hướng đến Home khi đăng nhập thành công
      })
      .catch((error) => {
        const errorMessage = error.message || JSON.stringify(error); // Xử lý thông báo lỗi
        Alert.alert('Lỗi đăng nhập', errorMessage ||  '');
    });
  }    

  return (
    <Container>
      <FormWrapper>
        <Text style={globalStyles.heading}>Đăng nhập</Text>
        
        {/* Ô nhập email */}
        <Input
          placeholder="Email"
          value={email}  // Sửa thành 'email'
          onChangeText={setEmail}
          icon={require('../../assets/images/icon_email.png')}
        />

        {/* Ô nhập mật khẩu */}
        <Input
          placeholder="Mật khẩu"
          secureTextEntry={true}
          value={password}  // Sửa thành 'password'
          onChangeText={setPassword}
          icon={require('../../assets/images/icon_password.png')}
        />

        {/* Link Quên mật khẩu */}
        <TouchableOpacity style={globalStyles.forgotPassword}>
          <Text style={globalStyles.linkText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        {/* Nút đăng nhập */}
        <Button title="Đăng nhập" onPress={handleLogin} isPrimary />

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

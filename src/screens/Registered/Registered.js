import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../redux/actions/actionUser'; // Import action register
import Input from '../../components/Input';
import Button from '../../components/ButtonLogin';
import Container from '../../components/Container';
import FormWrapper from '../../components/FormWrapper';
import globalStyles from '../../styles/globalStyles';

const Registered = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const dispatch = useDispatch();
  const {error, isLoading, userInfo} = useSelector(state => state.user);

  const handleRegister = () => {
    if (!username || !email || !password || password !== rePassword) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin và kiểm tra lại mật khẩu');
      return;
    }
  
    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        Alert.alert('Thành công', 'Đăng ký thành công');
        navigation.replace('Login');
      })
      .catch(() => {
        Alert.alert('Lỗi', error || 'Đăng ký không thành công');
      });
  };
  

  return (
    <Container>
      <FormWrapper>
        <Text style={globalStyles.heading}>Đăng ký</Text>

        {/* Ô nhập User Name */}
        <Input
          placeholder="User Name"
          value={username}
          onChangeText={text => setUsername(text)} // Đảm bảo cập nhật đúng giá trị khi người dùng nhập liệu
          icon={require('../../assets/images/icon_email.png')}
        />

        <Input
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)} // Đảm bảo cập nhật đúng giá trị khi người dùng nhập liệu
          icon={require('../../assets/images/icon_email.png')}
        />

        <Input
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)} // Đảm bảo cập nhật đúng giá trị khi người dùng nhập liệu
          icon={require('../../assets/images/icon_password.png')}
        />

        <Input
          placeholder="Re-Password"
          secureTextEntry={true}
          value={rePassword}
          onChangeText={text => setRePassword(text)} // Đảm bảo cập nhật đúng giá trị khi người dùng nhập liệu
          icon={require('../../assets/images/icon_password.png')}
        />

        {/* Nút đăng ký */}
        <Button title="Đăng ký" onPress={handleRegister} isPrimary={true} />
        <Button title="Đăng nhập" onPress={() => navigation.replace('Login')} isPrimary={false} />


        {/* Đăng nhập với Google */}
        <Text style={globalStyles.orText}>Hoặc đăng ký với Google</Text>
        <Image
          source={require('../../assets/images/icon_google.png')}
          style={globalStyles.googleIcon}
        />
      </FormWrapper>
    </Container>
  );
};

export default Registered;

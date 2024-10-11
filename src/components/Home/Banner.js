import React from 'react';
import { View, Image } from 'react-native';
import homeStyles from '../../styles/homeStyles';

const Banner = () => {
  return (
    <View style={homeStyles.banner}>
      <Image source={require('../../assets/images/home_banner.png')} style={homeStyles.bannerImage} />
    </View>
  );
};

export default Banner;

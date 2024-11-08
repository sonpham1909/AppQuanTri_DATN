import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Hàm để hiển thị các ngôi sao đánh giá
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Render các ngôi sao đầy đủ
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <MaterialCommunityIcons key={`full-${i}`} name="star" size={17} color="#FFD700" />
    );
  }

  // Render nửa ngôi sao nếu có
  if (hasHalfStar) {
    stars.push(
      <MaterialCommunityIcons key="half-star" name="star-half" size={17} color="#FFD700" />
    );
  }

  // Render các ngôi sao trống (nếu cần) để đạt tổng số 5 sao
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <MaterialCommunityIcons key={`empty-${i}`} name="star-outline" size={17} color="#FFD700" />
    );
  }

  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

export default renderStars;

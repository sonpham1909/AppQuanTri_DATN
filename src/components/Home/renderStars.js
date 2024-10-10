import { Image } from 'react-native';
import homeStyles from '../../styles/homeStyles'
// Hàm để hiển thị các ngôi sao đánh giá
const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Image
          key={i}
          source={require('../../assets/images/home_start.png')}
          style={homeStyles.starIcon}
        />
      );
    }
    return stars;
  };
  export default renderStars
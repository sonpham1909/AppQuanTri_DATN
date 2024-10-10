import { Image, Text, TouchableOpacity } from "react-native";
import handlePressCategory from '../../components/Categories/handlePressCategory';
import cateStyles from '../../styles/cateStyles';

  // Hàm render từng loại quần
  const renderCategory = ({ item }) => (
    <TouchableOpacity style={cateStyles.categoryItem} onPress={() => handlePressCategory(item)}>
      <Image source={{ uri: item.image }} style={cateStyles.categoryImage} />
      <Text style={cateStyles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );
  export default renderCategory;

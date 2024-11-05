import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import homeStyles from '../../styles/homeStyles';
import ProductList from '../../components/Home/ProductList';
import Banner from '../../components/Home/Banner';
import CategorySection from '../../components/Home/CategorySection';
import { fetchLatestProducts, fetchPopularProducts } from '../../redux/actions/actionProduct';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const latestProducts = useSelector(state => state.products.latestProducts);
  const popularProducts = useSelector(state => state.products.popularProducts);

  // State để theo dõi trạng thái loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // Bắt đầu tải dữ liệu
      await Promise.all([
        dispatch(fetchLatestProducts()),
        dispatch(fetchPopularProducts())
      ]);
      setLoading(false); // Kết thúc tải dữ liệu
    };

    loadData();
  }, [dispatch]);

  if (loading) {
    // Nếu đang tải dữ liệu, hiển thị ActivityIndicator
    return (
      <View style={[homeStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#00A65E" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={homeStyles.container}>
      {/* Banner Component */}
      <Banner />

      {/* Categories Component */}
      <CategorySection />

      {/* New Products */}
      <ProductList
        navigation={navigation}
        title="Sản Phẩm Mới Nhất"
        products={latestProducts || []} // Sử dụng mảng rỗng nếu latestProducts không có giá trị
      />

      {/* Popular Products */}
      <ProductList
        navigation={navigation}
        title="Sản Phẩm Phổ Biến"
        products={popularProducts || []}
      />
    </ScrollView>
  );
};

export default HomeScreen;

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, View} from 'react-native';
import homeStyles from '../../styles/homeStyles';
import ProductList from '../../components/Home/ProductList';
import Banner from '../../components/Home/Banner';
import CategorySection from '../../components/Home/CategorySection';
import {fetchLatestProducts} from '../../redux/actions/actionProduct';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const latestProducts = useSelector(state => state.products.latestProducts);

  useEffect(() => {
    dispatch(fetchLatestProducts());
  }, [dispatch]);
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
        products={latestProducts || []}
      />
    </ScrollView>
  );
};

export default HomeScreen;





import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProductList from '../../components/AllProduct/ProductList';
import handleProductPress from '../../components/AllProduct/handleProductPress';
import FilterSection from '../../components/AllProduct/FilterSection'; // Nhập FilterSection
import AllProductStyle from '../../styles/AllProductStyle';

const newProducts = [
    { id: '1', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 3 },
    { id: '2', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 4 },
    { id: '3', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 4 }
];



const AllProductScreen = ({navigation}) => {

   

    const [selectedSize, setSelectedSize] = useState('All');
    const [selectedColor, setSelectedColor] = useState('All');
    const [selectedPrice, setSelectedPrice] = useState('All');
   
    return (
        <View style={AllProductStyle.container}>
        {/* Filter Section */}
        <FilterSection 

            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
        />
        <View style={AllProductStyle.productListContainer}>
            <ProductList navigation={navigation } products={newProducts} onProductPress={handleProductPress} />
        </View>
    </View>
    );
};

export default AllProductScreen

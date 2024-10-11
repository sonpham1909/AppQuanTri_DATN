import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProductList from '../../components/CateClother/ProductList';
import handleProductPress from '../../components/CateClother/handleProductPress';
import FilterSection from '../../components/CateClother/FilterSection'; // Nhập FilterSection
import cateClotherStyles from '../../styles/cateClotherStyles';

const newProducts = [
    { id: '1', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 3 },
    { id: '2', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 4 },
    { id: '3', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 4 }
];

const wideLegProducts = [
    { id: '4', name: 'Quần Dài Rộng', price: '600,000', image: require('../../assets/images/item_1.png'), rating: 5 },
    // Thêm sản phẩm khác nếu cần
];

const shortProducts = [
    { id: '5', name: 'Quần Cộc', price: '300,000', image: require('../../assets/images/item_2.png'), rating: 4 },
    // Thêm sản phẩm khác nếu cần
];

const AllPants = ({ navigation,selectedSize, setSelectedSize, selectedColor, setSelectedColor, selectedPrice, setSelectedPrice }) => (
    <View>
        {/* Filter Section */}
        <FilterSection 

            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
        />
        <View style={cateClotherStyles.productListContainer}>
            <ProductList navigation={navigation }products={newProducts} onProductPress={handleProductPress} />
            <ProductList navigation={navigation } products={newProducts} onProductPress={handleProductPress} />

        </View>
    </View>
);

const WideLegPants = ({ navigation,selectedSize, setSelectedSize, selectedColor, setSelectedColor, selectedPrice, setSelectedPrice }) => (
    <View>
        {/* Filter Section */}
        <FilterSection 

            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
        />
        <View style={cateClotherStyles.productListContainer}>
            <ProductList navigation={navigation } products={wideLegProducts} onProductPress={handleProductPress} />
            
        </View>
    </View>
);

const Shorts = ({ navigation,selectedSize, setSelectedSize, selectedColor, setSelectedColor, selectedPrice, setSelectedPrice }) => (
    <View>
        {/* Filter Section */}
        <FilterSection 

            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
        />
        <View style={cateClotherStyles.productListContainer}>
            <ProductList navigation={navigation } products={shortProducts} onProductPress={handleProductPress} />
        </View>
    </View>
);

const CateClotherScreen = ({navigation}) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'all', title: 'TẤT CẢ QUẦN' },
        { key: 'wideLeg', title: 'QUẦN DÀI DÁNG RỘNG' },
        { key: 'shorts', title: 'QUẦN CỘC' },
    ]);

    const [selectedSize, setSelectedSize] = useState('All');
    const [selectedColor, setSelectedColor] = useState('All');
    const [selectedPrice, setSelectedPrice] = useState('All');

    const renderScene = SceneMap({
        all: () => (
            <AllPants 
            navigation={navigation }
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
            />
        ),
        wideLeg: () => (
            <WideLegPants 
            navigation={navigation }
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
            />
        ),
        shorts: () => (
            <Shorts 
            navigation={navigation }
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
            />
        ),
    });

    return (
        <View style={cateClotherStyles.container}>
            {/* Tab View */}
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                style={cateClotherStyles.tabView}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        indicatorStyle={cateClotherStyles.indicator}
                        style={cateClotherStyles.tabBar}
                        labelStyle={cateClotherStyles.label}
                        activeColor="#00A65E"
                        inactiveColor="#999"
                    />
                )}
            />
        </View>
    );
};

export default CateClotherScreen;

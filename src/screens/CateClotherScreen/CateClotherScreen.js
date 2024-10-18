import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ProductList from '../../components/CateClother/ProductList';
import handleProductPress from '../../components/CateClother/handleProductPress';
import FilterSection from '../../components/CateClother/FilterSection'; // Nhập FilterSection
import cateClotherStyles from '../../styles/cateClotherStyles';

const newProducts = [
    { 
        id: '1', 
        name: 'Áo Thun Nam', 
        price: '350,000', 
        image: require('../../assets/images/item_2.png'), 
        rating: 4,
        colors: ['#000000', '#FFFFFF'], // Tùy chọn màu sắc
        size: 'M'
    },
    { 
        id: '2', 
        name: 'Áo Khoác Nữ', 
        price: '750,000', 
        image: require('../../assets/images/item_2.png'), 
        rating: 5,
        colors: ['#FF0000', '#00FF00'], 
        size: 'L'
    },
    { 
        id: '3', 
        name: 'Quần Jean Nam', 
        price: '650,000', 
        image: require('../../assets/images/item_2.png'), 
        rating: 4,
        colors: ['#1E90FF', '#A52A2A'], 
        size: '32'
    },
    { 
        id: '4', 
        name: 'Váy Nữ', 
        price: '550,000', 
        image: require('../../assets/images/item_4_2.png'), 
        rating: 3,
        colors: ['#FF6347', '#FFD700'], 
        size: 'S'
    },
    { 
        id: '5', 
        name: 'Áo Polo Nam', 
        price: '400,000', 
        image: require('../../assets/images/item_3.png'), 
        rating: 5,
        colors: ['#008080', '#D2691E'], 
        size: 'M'
    },
    { 
        id: '6', 
        name: 'Áo Hoodie Unisex', 
        price: '800,000', 
        image: require('../../assets/images/item_2.png'), 
        rating: 4,
        colors: ['#333333', '#FFFFFF'], 
        size: 'XL'
    }
];

const wideLegProducts = [
    { 
        id: '1', 
        name: 'Quần Dài Rộng Đen', 
        price: '600,000', 
        image: require('../../assets/images/item_2.png'), 
        rating: 5,
        colors: ['#000000', '#808080'], 
        size: 'L'
    },
    { 
        id: '2', 
        name: 'Quần Dài Rộng Trắng', 
        price: '650,000', 
        image: require('../../assets/images/item_2.png'), 
        rating: 4,
        colors: ['#FFFFFF', '#C0C0C0'], 
        size: 'M'
    },
    { 
        id: '3', 
        name: 'Quần Dài Rộng Nữ', 
        price: '700,000', 
        image: require('../../assets/images/item_2.png'), 
        rating: 4,
        colors: ['#FF6347', '#FFD700'], 
        size: 'L'
    }
];

const shortProducts = [
    { 
        id: '1', 
        name: 'Quần Short Nam', 
        price: '300,000', 
        image: require('../../assets/images/item_2.png'), 
        rating: 4,
        colors: ['#000000', '#FFFFFF'], 
        size: 'L'
    },
    { 
        id: '2', 
        name: 'Quần Short Nữ', 
        price: '350,000', 
        image: require('../../assets/images/item_2.png'), 
        rating: 5,
        colors: ['#FF69B4', '#FFC0CB'], 
        size: 'S'
    },
    { 
        id: '3', 
        name: 'Quần Short Thể Thao', 
        price: '400,000', 
        image: require('../../assets/images/item_2.png'), 
        rating: 3,
        colors: ['#1E90FF', '#A52A2A'], 
        size: 'M'
    }
];


const AllPants = ({ navigation,selectedSize, setSelectedSize, selectedColor, setSelectedColor, selectedPrice, setSelectedPrice }) => (
    <View style={cateClotherStyles.container}>
        {/* Filter Section */}
        <FilterSection 
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
        />
            <ProductList navigation={navigation }products={newProducts} onProductPress={handleProductPress} />

    </View>
);

const WideLegPants = ({ navigation,selectedSize, setSelectedSize, selectedColor, setSelectedColor, selectedPrice, setSelectedPrice }) => (
    <View style={cateClotherStyles.container}>
        {/* Filter Section */}
        <FilterSection 

            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
        />
            <ProductList navigation={navigation } products={wideLegProducts} onProductPress={handleProductPress} />
            
    </View>
);

const Shorts = ({ navigation,selectedSize, setSelectedSize, selectedColor, setSelectedColor, selectedPrice, setSelectedPrice }) => (
    <View style={cateClotherStyles.container}>
        {/* Filter Section */}
        <FilterSection 

            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
        />
            <ProductList navigation={navigation } products={shortProducts} onProductPress={handleProductPress} />
    </View>
);

const CateClotherScreen = ({navigation}) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'all', title: 'TẤT CẢ QUẦN' },
        { key: 'wideLeg', title: 'QUẦN DÀI' },
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

import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import cateClotherStyles from '../../styles/cateClotherStyles';

const ProductList = ({ products, onProductPress }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => onProductPress(item)} style={cateClotherStyles.productItem}>
            <Image source={item.image} style={cateClotherStyles.productImage} />
            <Text style={cateClotherStyles.productName}>{item.name}</Text>
            <Text style={cateClotherStyles.productPrice}>{item.price} VND</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={cateClotherStyles.productList}
            showsVerticalScrollIndicator={false}  // Tùy chọn ẩn thanh cuộn dọc
        />
    );
};

export default ProductList;

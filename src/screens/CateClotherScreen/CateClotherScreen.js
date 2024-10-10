import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import ProductList from '../../components/CateClother/ProductList';
import handleProductPress from '../../components/CateClother/handleProductPress';
import useHandleGesture from '../../components/CateClother/handleGesture';

const newProducts = [
    { id: '1', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 3 },
    { id: '2', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 4 },
    { id: '3', name: 'Áo Ba Lỗ Thể Thao', price: '500,000', image: require('../../assets/images/home_clother.png'), rating: 4 }
];

const CateClotherScreen = () => {
    const [activeTab, setActiveTab] = useState('TẤT CẢ QUẦN');
    const [selectedSize, setSelectedSize] = useState('All');
    const [selectedColor, setSelectedColor] = useState('All');
    const [selectedPrice, setSelectedPrice] = useState('All');

    // State for managing sort button images
    const [sortImage, setSortImage] = useState(require('../../assets/images/clother_sort-.png'));

    const tabs = ['TẤT CẢ QUẦN', 'QUẦN DÀI DÁNG RỘNG', 'QUẦN CỘC'];

    const handleGesture = useHandleGesture(tabs, setActiveTab); // Sử dụng hàm đã tách ra

    // Function to toggle images on button press
    const toggleSortImage = () => {
        setSortImage((prev) => 
            prev === require('../../assets/images/clother_sort-.png') 
            ? require('../../assets/images/clother_sort+.png') // Replace with your second image path
            : require('../../assets/images/clother_sort-.png')
        );
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <PanGestureHandler onGestureEvent={handleGesture}>
                <View style={styles.container}>
                    {/* Tab Bar */}
                    <View style={styles.tabContainer}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.tabContainer}
                        >
                            {tabs.map(tab => (
                                <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tab}>
                                    <View style={styles.tabContent}>
                                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                                        {activeTab === tab && <View style={styles.activeTab} />}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Filter Section */}
                    <View style={styles.filterHeader}>
                        {/* Sort Icon 1 */}
                        <TouchableOpacity style={styles.sortButton} onPress={toggleSortImage}>
                            <Image source={sortImage} style={styles.sortIcon} />
                            <Text style={styles.sortText}>Sắp xếp theo</Text>
                        </TouchableOpacity>

                   
                    </View>

                    <View style={styles.filterContainer}>
                    <Text style={styles.filterLabel}>Bộ lọc</Text>

                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={selectedSize}
                                style={styles.picker}
                                onValueChange={(itemValue) => setSelectedSize(itemValue)}
                            >
                                <Picker.Item label="Kích cỡ" value="All" />
                                <Picker.Item label="S" value="S" />
                                <Picker.Item label="M" value="M" />
                                <Picker.Item label="L" value="L" />
                            </Picker>
                        </View>

                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={selectedColor}
                                style={styles.picker}
                                onValueChange={(itemValue) => setSelectedColor(itemValue)}
                            >
                                <Picker.Item label="Màu sắc" value="All" />
                                <Picker.Item label="Đen" value="Black" />
                                <Picker.Item label="Trắng" value="White" />
                            </Picker>
                        </View>

                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={selectedPrice}
                                style={styles.picker}
                                onValueChange={(itemValue) => setSelectedPrice(itemValue)}
                            >
                                <Picker.Item label="Giá" value="All" />
                                <Picker.Item label="Dưới 300,000" value="300" />
                                <Picker.Item label="300,000 - 500,000" value="500" />
                                <Picker.Item label="Trên 500,000" value="500+" />
                            </Picker>
                        </View>
                    </View>

                    {/* Product List with spacing */}
                    {activeTab === 'TẤT CẢ QUẦN' && (
                        <View style={styles.productListContainer}>
                            <ProductList products={newProducts} onProductPress={handleProductPress} />
                        <View style={styles.productListContainer}>

                            <ProductList products={newProducts} onProductPress={handleProductPress} />
                        </View>
                        </View>
                    )}
                </View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

export default CateClotherScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
    },
    tabContent: {
        padding: 10,
    },
    activeTab: {
        position: 'absolute',
        bottom: 0,
        height: 4,
        width: '40%',
        backgroundColor: '#242424',
        alignSelf: 'center',
    },
    tabText: {
        fontSize: 18,
        color: '#999999',
    },
    activeTabText: {
        fontSize: 18,
        color: '#242424',
        fontWeight: '500',
    },
    filterHeader: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    filterLabel: {
        top: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00A65E',
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sortIcon: {
        width: 18,
        height: 18,
        marginRight: 5,
    },
    sortText: {
        fontSize: 14,
        color: '#000',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    pickerWrapper: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        marginHorizontal: 5,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    picker: {
        height: 40,
        width: '100%',
    },
    pickerItem: {
        fontSize: 14,  // Smaller font size for picker items
        textAlign: 'left',  // Align the text to the left
    },
    productListContainer: {
        marginTop: 20, // Add spacing between product lists
    },
});

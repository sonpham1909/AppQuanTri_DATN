import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Thêm biểu tượng

const FilterSection = () => {
    const [selectedSize, setSelectedSize] = useState('Kích cỡ');
    const [isSizeModalVisible, setSizeModalVisible] = useState(false);
    
    const [selectedColor, setSelectedColor] = useState('Màu sắc');
    const [isColorModalVisible, setColorModalVisible] = useState(false);
    
    const [selectedPrice, setSelectedPrice] = useState('Giá');
    const [isPriceModalVisible, setPriceModalVisible] = useState(false);

    const sizes = ['S', 'M', 'L'];
    const colors = ['Đen', 'Trắng'];
    const prices = ['Dưới 300,000', '300,000 - 500,000', 'Trên 500,000'];

    // Hàm chọn kích cỡ
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setSizeModalVisible(false);
    };

    // Hàm chọn màu sắc
    const handleColorSelect = (color) => {
        setSelectedColor(color);
        setColorModalVisible(false);
    };

    // Hàm chọn giá
    const handlePriceSelect = (price) => {
        setSelectedPrice(price);
        setPriceModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* Header với tổng số sản phẩm và sắp xếp */}
            <View style={styles.header}>
                <Text style={styles.productCount}>60 (các) sản phẩm</Text>
                <TouchableOpacity style={styles.sortWrapper}>
                    <Text style={styles.sortText}>Sắp xếp theo</Text>
                    <MaterialCommunityIcons name="sort" size={18} color="#666" />
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
            {/* Bộ lọc */}
            <Text style={styles.filterLabel}>Bộ lọc</Text>
            <View style={styles.filterContainer}>

                {/* Chọn kích cỡ */}
                <TouchableOpacity style={styles.selectBox} onPress={() => setSizeModalVisible(true)}>
                    <Text style={styles.selectText}>{selectedSize}</Text>
                    <MaterialCommunityIcons name="chevron-down" size={18} color="#666" />
                </TouchableOpacity>

                {/* Chọn màu sắc */}
                <TouchableOpacity style={styles.selectBox} onPress={() => setColorModalVisible(true)}>
                    <Text style={styles.selectText}>{selectedColor}</Text>
                    <MaterialCommunityIcons name="chevron-down" size={18} color="#666" />
                </TouchableOpacity>

                {/* Chọn giá */}
                <TouchableOpacity style={styles.selectBox} onPress={() => setPriceModalVisible(true)}>
                    <Text style={styles.selectText}>{selectedPrice}</Text>
                    <MaterialCommunityIcons name="chevron-down" size={18} color="#666" />
                </TouchableOpacity>
            </View>

            {/* Modal cho kích cỡ */}
            <Modal visible={isSizeModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Chọn kích cỡ</Text>
                        <FlatList 
                            data={sizes}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSizeSelect(item)}>
                                    <Text style={styles.modalItem}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setSizeModalVisible(false)}>
                            <Text style={styles.modalClose}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal cho màu sắc */}
            <Modal visible={isColorModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Chọn màu sắc</Text>
                        <FlatList 
                            data={colors}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleColorSelect(item)}>
                                    <Text style={styles.modalItem}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setColorModalVisible(false)}>
                            <Text style={styles.modalClose}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal cho giá */}
            <Modal visible={isPriceModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Chọn giá</Text>
                        <FlatList 
                            data={prices}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handlePriceSelect(item)}>
                                    <Text style={styles.modalItem}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setPriceModalVisible(false)}>
                            <Text style={styles.modalClose}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productCount: {
        fontSize: 14,
        fontWeight: '500',
    },
    sortWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sortText: {
        fontSize: 14,
        color: '#666',
        marginRight: 5,
    },
    filterLabel: {
        color: '#00A65E',
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        marginLeft:25,
        marginTop:20,
    },
    selectBox: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        flexDirection: 'row', // Hiển thị mũi tên và văn bản trên cùng một hàng
        justifyContent: 'space-between', // Căn giữa văn bản và biểu tượng
        alignItems: 'center', // Căn giữa chiều dọc
    },
    selectText: {
        fontSize: 14,
        color: '#666',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalItem: {
        fontSize: 16,
        paddingVertical: 10,
        textAlign: 'center',
        width: '100%',
    },
    modalClose: {
        marginTop: 20,
        fontSize: 16,
        color: '#00A65E',
    },
});

export default FilterSection;

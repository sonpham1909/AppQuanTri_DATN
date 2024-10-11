import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const SortToggleButton = () => {
    const [sortImage, setSortImage] = useState(require('../../assets/images/clother_sort-.png'));

    const toggleSortImage = () => {
        setSortImage((prev) => 
            prev === require('../../assets/images/clother_sort-.png') 
            ? require('../../assets/images/clother_sort+.png') 
            : require('../../assets/images/clother_sort-.png')
        );
    };

    return (
        <TouchableOpacity style={styles.sortButton} onPress={toggleSortImage}>
            <Image source={sortImage} style={styles.sortIcon} />
            <Text style={styles.sortText}>Sắp xếp theo</Text>
        </TouchableOpacity>
    );
};

export default SortToggleButton;

const styles = StyleSheet.create({
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
    
});

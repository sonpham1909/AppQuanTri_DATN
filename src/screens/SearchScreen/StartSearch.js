import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StartSearch = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');

    // Khi mở màn hình này, input tìm kiếm sẽ tự động được focus
    const searchInputRef = useRef(null);
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

   const handleOnSearch = () =>{
 
        if(searchText){
          navigation.navigate('SearchScreen',{searchKeyWord: searchText}, { merge: true });
        }
    
      }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    if (searchText) {
                        setSearchText('');
                    } else {
                        navigation.goBack();
                    }
                }}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color="#00A65E"
                    />
                </TouchableOpacity>
               <View style={styles.searchContainer}>
               <TextInput
                    ref={searchInputRef}
                    style={styles.searchInput}
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
                        <MaterialCommunityIcons name="close" size={18} color="#000" />
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleOnSearch}
                >
                    <MaterialCommunityIcons
                        name="magnify" // Icon tìm kiếm
                        size={24} // Kích thước của icon
                        color="white" // Màu sắc của icon
                    />
                </TouchableOpacity>
               </View>
            </View>
            {/* Thêm phần nội dung kết quả tìm kiếm hoặc gợi ý tìm kiếm tại đây */}
        </View>
    );
};

export default StartSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    searchInput: {
        flex: 1,
        
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
        marginHorizontal: 10,
    },
    clearButton: {
        padding: 5,
    },
    searchButton: {
        backgroundColor: '#00A65E',
        padding: 10,

        marginLeft: 10,

    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#00A65E',
        borderRadius: 8,
        paddingLeft: 10,
        marginLeft: 10,
    }
});

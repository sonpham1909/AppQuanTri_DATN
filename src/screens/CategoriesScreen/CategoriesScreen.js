import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import Container from '../../components/Account/Container'
const data = [
  { id: '1', title: 'Áo', image: require('../../assets/images/icon_add.png') },
  { id: '2', title: 'Quần', image: require('../../assets/images/icon_add.png') },
  { id: '3', title: 'Giày', image: require('../../assets/images/icon_add.png') },
  { id: '4', title: 'Mũ', image: require('../../assets/images/icon_add.png') },
];

const CategoriesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.itemText}>{item.id}. {item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <TextInput 
        style={styles.searchInput} 
        placeholder="Tìm kiếm" 
        placeholderTextColor={'#B4AEAE'}
      />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  backButton: {
    fontSize: 20,
    color: '#fff',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    margin: 15,
    color:'ffffff',
    borderColor: '#DED9D9',
    borderWidth: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#B1ABAB',
    marginHorizontal:15,
    marginVertical:5
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  itemText: {
    fontSize: 13,
    color:'#000000'
  },
});

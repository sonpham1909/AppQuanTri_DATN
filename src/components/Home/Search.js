import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Search = (props) => {
  return (
    <View style={[styles.searchContainer, props.searchContainer]}>
    <Icon name="search" size={24} color="black" style={styles.searchIcon} />
      <TextInput
        style={[styles.input, props.input]}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row', // Hiển thị TextInput và Icon theo chiều ngang
    alignItems: 'center', // Căn chỉnh theo chiều dọc
    backgroundColor:'#DDDDDD',
    height:50,
    width:380,
    borderRadius:10,
  },
  input: {
    flex: 1, // TextInput chiếm phần lớn không gian còn lại
    paddingLeft: 15,
    color:'black'
    // Khoảng cách giữa phần tử và các lề
  },
  searchIcon: {
    marginLeft: 20, // Khoảng cách giữa Icon và TextInput
  },
});

export default Search;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const cateClotherStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding:5,
      backgroundColor: '#fff',
    },
   
     productItem: {
      marginRight: 15,
      width: 173,
      height:238,
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      marginBottom:10
    },
    productImage: {
      width: 173,
      height: 160,
      resizeMode: 'stretch',
      borderRadius: 8,
    
    },
    ratingContainer: {
      paddingLeft:10,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
  
    ratingCount: {
      marginLeft: 5,
      color: '#B1ABAB',
      fontSize:13
    },
    productName: {
      paddingTop:8,
      paddingLeft:10,
      paddingBottom:10,
      fontSize: 14,
      color: '#000',
    },
    productPrice: {
      paddingLeft:10,
      color: '#F01B1B',
      fontWeight: 'bold',
      fontSize: 13,
    },
    reviewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
    reviewIcon: {
      width: 15,
      height: 15,
      marginRight: 5,
      
    },
    reviewCount: {
      fontSize: 11,
      color: '#000000',
    },
    starIcon: {
  
      width: 13,
      height: 13,
      marginRight: 5, // Khoảng cách giữa các ngôi sao
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
    marginTop:20,
      alignItems: 'flex-end',
      marginBottom: 20,
  },
  filterLabel: {
    bottom:5,
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
      flexDirection:'row',
  },
  productSection:{
  },
  scene: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  tabBar: {
    backgroundColor: '#FFF',
  },
  indicator: {
    backgroundColor: '#00A65E',
    height: 3,
  },
  label: {
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical:20
  },
  productCount: {
    fontSize: 14,
    color: '#000',

  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 18,
    color: '#000',
},
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
  },
  filterText: {
    fontSize: 14,
    color: '#000',
  },


  pickerItem: {
    fontSize: 15, // Kích thước chữ nhỏ hơn cho các label trong Picker
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewAll: {
    color: '#00bfa5',
    fontWeight: 'bold',
  },
   productItem: {
    marginRight: 15,
    width: 173,
    height:238,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom:10
  },
  productImage: {
    width: 173,
    height: 150,
    resizeMode: 'stretch',
    borderRadius: 8,
  
  },
  ratingContainer: {
    paddingLeft:10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  ratingCount: {
    marginLeft: 5,
    color: '#B1ABAB',
    fontSize:13
  },
  productName: {
    paddingTop:8,
    paddingLeft:10,
    paddingBottom:10,
    fontSize: 14,
    color: '#000',
  },
  productPrice: {
    paddingLeft:10,
    color: '#F01B1B',
    fontWeight: 'bold',
    fontSize: 13,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  reviewIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
    
  },
  reviewCount: {
    fontSize: 11,
    color: '#000000',
  },
  starIcon: {

    width: 13,
    height: 13,
    marginRight: 5, // Khoảng cách giữa các ngôi sao
  },
  });
  export default cateClotherStyles
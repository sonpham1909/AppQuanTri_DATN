import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const cateClotherStyles = StyleSheet.create({
    container: {
      flex: 1,
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
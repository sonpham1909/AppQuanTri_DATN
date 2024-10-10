import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
    },
    banner: {
      padding: 10,
    },
    bannerImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
    },
    categorySection: {
      padding: 10,
    },
    sectionTitle1: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#303030',
    },
    sectionTitle: {
      fontSize: 20,
      color: '#000000',
      marginBottom: 10,
    },
    categoryItem: {
      alignItems: 'center',
      marginRight: 35,
    },
    notificationIconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#D9D9D9',
      justifyContent: 'center',
      alignItems: 'center',
    },
    clother: {
      fontSize: 20,
      color: '#000000',
    },
    productSection: {
      padding: 10,
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
  export default homeStyles
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Round = (props) => {
  return (
 <View >
    <TouchableOpacity
    style={[styles.bgr, props.bgr]}
    onPress={props.onPress}
    >
     <Image source={require('../../assets/images/home_banner.png')}/>
    </TouchableOpacity>
    </View>  
  )
}

export default Round

const styles = StyleSheet.create({
    bgr:{
        height:50,
        width:50,
        backgroundColor:'#DDDDDD',
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:15
    }
})
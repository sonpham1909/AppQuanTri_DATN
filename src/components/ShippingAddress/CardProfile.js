import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native'
import React from 'react'

const CardProfile = ({title,onpress,preview }) => {
    console.log(title)
    console.log(preview)
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.onPressProfile} onPress={onpress}>
      <Text style={styles.titleProfile}>{title}</Text>
      <Text>{preview}</Text>
      <Image style={styles.iconCardProfile} source={require('../../assets/images/icon_chevron.png')}/>
      </TouchableOpacity>
    </View>
  )
}

export default CardProfile

const styles = StyleSheet.create({
    container:{
        width: '90%',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        position: 'relative',
    },
    iconCardProfile:{
        width: 20,
        height: 20,
        resizeMode: 'contain',
        position: 'absolute',
        right: 20, // Đẩy icon về góc phải
        top: '50%', // Canh giữa theo chiều dọc
        transform: [{ translateY: -10 }], // Điều chỉnh chính xác vị trí giữa theo chiều dọc
    },
    titleProfile:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    onPressProfile:{
        width:'100%'
    }
})
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SuccessMessage from '../../components/Congrats/SuccessMessage';
import ActionButtons from '../../components/Congrats/ActionButtons';

const SuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SuccessMessage />
      <ActionButtons navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default SuccessScreen;

import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import InvoiceCard from '../../components/Invoices/InvoiceCard';

const Delivered = () => (
  
  <View style={styles.scene}>
    
    <InvoiceCard />
    <InvoiceCard />
  </View>
);

const Processing = () => (
  <View style={styles.scene}>
    <InvoiceCard />
  </View>
);

const Canceled = () => (
  <View style={styles.scene}>
    <InvoiceCard />
  </View>
);

const initialLayout = { width: Dimensions.get('window').width };

const InvoicesScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'delivered', title: 'Đã giao' },
    { key: 'processing', title: 'Đang xử lý' },
    { key: 'canceled', title: 'Đã hủy' },
  ]);

  const renderScene = SceneMap({
    delivered: Delivered,
    processing: Processing,
    canceled: Canceled,
  });
  const CustomTabBar = (props) => {
    const { key, ...otherProps } = props;
    return <TabBar {...otherProps} />;
  };
  return (
    <TabView
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={initialLayout}
    renderTabBar={(props) => (
      <CustomTabBar
        {...props} 
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
        labelStyle={styles.label}
        activeColor="#00A65E"
        inactiveColor="#999"
      />
    )}

/>

    
  );
};

const styles = StyleSheet.create({
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
});

export default InvoicesScreen;

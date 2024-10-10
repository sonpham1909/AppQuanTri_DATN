import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

const InvoicesScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Delivered');
  const tabs = ['Delivered', 'Processing', 'Canceled'];
  const lastGestureTime = useRef(0); // Thời gian gạt tay cuối cùng

  const handleGesture = (event) => {
    const currentTime = Date.now();
    
    // Kiểm tra thời gian giữa hai lần gạt
    if (currentTime - lastGestureTime.current < 300) return; // Nếu gạt quá nhanh thì không thực hiện gì

    if (event.nativeEvent.translationX > 30) {
      // Gạt tay qua phải
      setActiveTab(prev => {
        const currentIndex = tabs.indexOf(prev);
        lastGestureTime.current = currentTime; // Cập nhật thời gian gạt
        return currentIndex > 0 ? tabs[currentIndex - 1] : prev;
      });
    } else if (event.nativeEvent.translationX < -30) {
      // Gạt tay qua trái
      setActiveTab(prev => {
        const currentIndex = tabs.indexOf(prev);
        lastGestureTime.current = currentTime; // Cập nhật thời gian gạt
        return currentIndex < tabs.length - 1 ? tabs[currentIndex + 1] : prev;
      });
    }
  };

  const InvoiceCard = () => (
    <View style={styles.invoiceCard}>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <View style={styles.invoiceHeader}>
          <Text style={styles.invoiceText}>Order No238562312</Text>
          <Text style={styles.detailText}>20/03/2020</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={{ paddingHorizontal: 40, paddingBottom: 20 }}>
        <View style={styles.invoiceDetails}>
          <Text style={styles.detailText}>
            Số lượng: <Text style={styles.invoiceText}>03</Text>
          </Text>
          <Text style={styles.detailText}>
            Tổng tiền: <Text style={styles.boldText}>$150</Text>
          </Text>
        </View>
        <View style={styles.invoiceActions}>
          <TouchableOpacity style={styles.detailButton}>
            <Text style={styles.buttonText}>Chi tiết</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.confirmText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <View style={styles.container}>
          <View style={styles.tabContainer}>
            {tabs.map(tab => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tab}>
                <View style={styles.tabContent}>
                  <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                  {activeTab === tab && <View style={styles.activeTab} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === 'Delivered' && <InvoiceCard />}
          {/* Thêm logic để hiển thị InvoiceCard cho các tab khác nếu cần */}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default InvoicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
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
    paddingVertical: 10,
    position: 'relative',
  },
  activeTab: {
    position: 'absolute',
    bottom: 0,
    height: 4, // Độ dày của đường viền
    width: '40%', // Chiều dài đường viền
    backgroundColor: '#242424', // Màu đường viền
    alignSelf: 'center', // Căn giữa
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
  invoiceCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  invoiceText: {
    fontSize: 16,
    color: '#242424',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
  },
  invoiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 14,
    color: '#808080',
  },
  boldText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  invoiceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailButton: {
    backgroundColor: '#242424',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  confirmText: {
    color: '#27AE60',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

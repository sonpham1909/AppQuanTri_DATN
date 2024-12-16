import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import ProductList from '../../components/CateClother/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColorsAndSizesBySubCategoryId } from '../../redux/actions/actionsVariant';
import SizeFilterModal from '../../components/CateClother/SizeFilterModal';
import ColorFilterModal from '../../components/CateClother/ColorFilterModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import { fetchProductsBySubCategory } from '../../redux/actions/actionCategory';
import { LogBox } from 'react-native';
import { fetchProductsByVariant } from '../../redux/actions/actionProduct';
import PriceFilterModal from '../../components/CateClother/PriceFilterModal'; // Import thêm PriceFilterModal
import { useTheme } from '../../utils/ThemeContact';
import { darkTheme,lightTheme } from '../../utils/theme';

LogBox.ignoreLogs(['Warning: ...']); // Cảnh báo cụ thể
LogBox.ignoreAllLogs(); // Nếu muốn bỏ qua tất cả các log

const MAX_DISPLAY_ITEMS = 1;
// Màn hình CateClotherScreen nhận các tham số qua route
// route.params bao gồm: categoryName (tên danh mục), subCategories (danh sách các danh mục con), selectedTabIndex (tab được chọn mặc định)
const CateClotherScreen = ({ route }) => {
  // Các tham số nhận được từ route (dữ liệu từ màn hình trước đó)
  const { categoryName, subCategories, selectedTabIndex } = route.params;
  
  const {isDarkMode} = useTheme()

  // Khai báo các state quản lý dữ liệu và trạng thái UI
  const [index, setIndex] = useState(selectedTabIndex); // Quản lý tab hiện tại, mặc định là selectedTabIndex từ route
  const [loading, setLoading] = useState(false); // Quản lý trạng thái loading khi tải dữ liệu
  const [sizeFilterVisible, setSizeFilterVisible] = useState(false); // Modal chọn kích cỡ
  const [colorFilterVisible, setColorFilterVisible] = useState(false); // Modal chọn màu sắc
  const [priceFilterVisible, setPriceFilterVisible] = useState(false); // Modal chọn giá
  const [filterState, setFilterState] = useState({}); // Lưu trữ bộ lọc của từng tab
  const [filteredProductsState, setFilteredProductsState] = useState({}); // Lưu trữ sản phẩm đã lọc cho từng tab

  // Redux hooks
  const dispatch = useDispatch(); // Dùng để gọi các action Redux
  const navigation = useNavigation(); // Dùng để điều hướng giữa các màn hình
  const { colorsAndSizesBySubCategoryId } = useSelector(state => state.variants); // Lấy dữ liệu màu và kích cỡ từ Redux

  // Lấy ID của danh mục con hiện tại dựa trên tab đang chọn
  const currentSubCategoryId = subCategories[index]?._id;// Hàm tải sản phẩm và biến thể (variants) theo danh mục con
  const loadProductsAndVariants = async () => {
    // Nếu sản phẩm của tab đã được tải trước đó thì không cần tải lại
    if (filteredProductsState[index]) {
      return;
    }
    try {
      setLoading(true); // Bật trạng thái loading khi bắt đầu tải dữ liệu
      // Gọi action Redux để lấy sản phẩm theo danh mục con
      const productsResponse = await dispatch(
        fetchProductsBySubCategory(currentSubCategoryId),
      );
      // Gọi action Redux để lấy màu và kích cỡ theo danh mục con
      await dispatch(fetchColorsAndSizesBySubCategoryId(currentSubCategoryId));

      // Lưu sản phẩm đã lấy vào state cục bộ
      setFilteredProductsState(prev => ({
        ...prev,
        [index]: productsResponse.payload,
      }));
    } catch (error) {
      console.error('Error loading products and variants:', error);
    } finally {
      setLoading(false); // Tắt trạng thái loading khi dữ liệu đã được tải xong
    }
  };

  // Hàm áp dụng bộ lọc mới (kích cỡ, màu sắc, giá...)
  const applyFilterState = newFilters => {
    console.log('Applying new filters:', newFilters);

    setFilterState(prev => {
      const updatedFilters = {
        ...prev[index],
        ...newFilters, // Gộp bộ lọc mới với bộ lọc cũ của tab hiện tại
      };
      console.log('Updated Filters State:', updatedFilters);

      return {
        ...prev,
        [index]: updatedFilters, // Cập nhật bộ lọc cho tab hiện tại
      };
    });
  };

  // Hàm lọc sản phẩm theo bộ lọc đã chọn
  const filterProducts = async () => {
    const { size, color, minPrice, maxPrice } = filterState[index] || {}; // Lấy bộ lọc hiện tại

    const query = {
      subCategoryId: currentSubCategoryId,
      size: size || undefined,
      color_code: color || undefined,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };

    try {
      setLoading(true); // Bật trạng thái loading khi đang lọc sản phẩm
      const response = await dispatch(fetchProductsByVariant(query));

      const filteredProducts = response.payload;
      setFilteredProductsState(prev => ({
        ...prev,
        [index]: filteredProducts, // Cập nhật danh sách sản phẩm đã lọc cho tab hiện tại
      }));
    } catch (error) {
      console.error('Error filtering products:', error);
    } finally {
      setLoading(false); // Tắt trạng thái loading khi lọc xong
    }
  };

  // useEffect: Tự động tải sản phẩm và biến thể khi tab thay đổi
  useEffect(() => {
    if (currentSubCategoryId && !filteredProductsState[index]) {
      loadProductsAndVariants(); // Nếu sản phẩm chưa được tải thì gọi hàm tải
    }
  }, [index, currentSubCategoryId]);

  // useEffect: Tự động gọi filterProducts khi bộ lọc thay đổi
  useEffect(() => {
    if (filterState[index]) {
      filterProducts(); // Nếu bộ lọc thay đổi thì lọc lại sản phẩm
    }
  }, [filterState[index], index]);

  // Hàm hiển thị các bộ lọc (kích cỡ, màu sắc, giá)
  const renderFilters = () => (
    <View style={styles.filterContainer}>
      <Text style={styles.filterLabel}>Bộ lọc</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Bộ lọc kích cỡ */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSizeFilterVisible(true)}>
          <Text style={{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }}>
            {filterState[index]?.size?.length > 0
              ? renderTextWithEllipsis(filterState[index].size)
              : 'Kích cỡ'}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={18} color="#666" />
        </TouchableOpacity>

        {/* Bộ lọc màu sắc */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setColorFilterVisible(true)}>
          <Text style={{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }}>
            {filterState[index]?.color?.length > 0
              ? renderTextWithEllipsis(filterState[index].color)
              : 'Màu sắc'}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={18} color="#666" />
        </TouchableOpacity>

        {/* Bộ lọc giá */}
        <TouchableOpacity
          style={styles.filterButton1}
          onPress={() => setPriceFilterVisible(true)}>
          <Text style = {{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }}>
            {filterState[index]?.minPrice != null &&
              filterState[index]?.maxPrice != null
              ? `Giá: ${filterState[index].minPrice.toLocaleString(
                'vi-VN',
              )} - ${filterState[index].maxPrice.toLocaleString('vi-VN')} VND`
              : 'Giá'}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={18} color="#666" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  // Hàm để rút gọn danh sách các mục được chọn (ví dụ: kích cỡ, màu sắc) và hiển thị thêm dấu "..."
  const renderTextWithEllipsis = items => {
    return items.length > MAX_DISPLAY_ITEMS
      ? `${items.slice(0, MAX_DISPLAY_ITEMS).join(', ')}...`
      : items.join(', '); // Nếu quá nhiều thì hiển thị một phần và dấu "..."
  };

  // Hàm render nội dung của từng tab (các sản phẩm đã lọc)
  const renderScene = ({ route }) => {
    const routeIndex = subCategories.findIndex(sub => sub._id === route.key);
    const tabProducts = filteredProductsState[routeIndex] || [];

    return (
      <View style={styles.container}>
        {loading && routeIndex === index ? (
          <ActivityIndicator size="large" color="#00A65E" /> // Hiển thị loading khi đang tải sản phẩm
        ) : tabProducts.length === 0 ? (
          <Text style={{ textAlign: 'center', fontSize: 16, color: '#666' }}>
            Không có sản phẩm phù hợp với bộ lọc
          </Text>
        ) : (
          <ProductList navigation={navigation} products={tabProducts} /> // Hiển thị danh sách sản phẩm
        )}

        {filteredProductsState[index]?.length === 0 && (
          <Text style={{ textAlign: 'center', fontSize: 16, color: '#666' }}>
            Không có sản phẩm phù hợp với bộ lọc
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Trang chủ')}>
          <Image
            source={require('../../assets/images/icon_back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.categoryNameText}>{categoryName}</Text>
      </View>

      {/* Hiển thị bộ lọc */}
      {renderFilters()}

      {/* TabView với các sản phẩm đã lọc */}
      <TabView
        navigationState={{
          index,
          routes: subCategories.map(sub => ({
            key: sub._id,
            title: sub.name,
          })),
        }}
        renderScene={renderScene}
        onIndexChange={newIndex => setIndex(newIndex)} // Cập nhật tab khi người dùng thay đổi
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.label}
            activeColor="#00A65E"
            inactiveColor="#999"
            scrollEnabled
          />
        )}
        swipeEnabled
        lazy
      />

      {/* Các modals chọn bộ lọc */}
      <SizeFilterModal
        visible={sizeFilterVisible}
        filterOptions={colorsAndSizesBySubCategoryId[currentSubCategoryId]?.sizes || []}
        onClose={() => setSizeFilterVisible(false)}
        applyFilters={selectedSizes => {
          applyFilterState({ size: selectedSizes });
        }}
        initialFilters={filterState[index]?.size}
      />
      <ColorFilterModal
        visible={colorFilterVisible}
        filterOptions={colorsAndSizesBySubCategoryId[currentSubCategoryId]?.colors || []}
        onClose={() => setColorFilterVisible(false)}
        applyFilters={selectedColors => {
          console.log('Applying selected colors:', selectedColors);
          applyFilterState({ color: selectedColors });
        }}
        initialFilters={filterState[index]?.color}
      />
      <PriceFilterModal
        visible={priceFilterVisible}
        onClose={() => setPriceFilterVisible(false)}
        applyFilters={(minPrice, maxPrice) => {
          setFilterState(prevState => ({
            ...prevState,
            [index]: { ...prevState[index], minPrice, maxPrice },
          }));
        }}
        priceRange={[
          filterState[index]?.minPrice ?? 0,
          filterState[index]?.maxPrice ?? 10000000,
        ]}
      />
    </View>
  );
};

export default CateClotherScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#00A65E',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  categoryNameText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    alignItems: 'center',
  },
  filterButton: {
    height: 40,
    width: 110,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButton1: {
    height: 40,
    width: 'auto',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterLabel: {
    color: '#00A65E',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 10,
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
    textTransform: 'uppercase', // Giữ chữ không bị độn
    fontWeight: 'bold',
  },
});
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import ProductList from '../../components/CateClother/ProductList';
import {useDispatch, useSelector} from 'react-redux';
import {fetchColorsAndSizesBySubCategoryId} from '../../redux/actions/actionsVariant';
import SizeFilterModal from '../../components/CateClother/SizeFilterModal';
import ColorFilterModal from '../../components/CateClother/ColorFilterModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import {fetchProductsBySubCategory} from '../../redux/actions/actionCategory';
import {LogBox} from 'react-native';
import {fetchProductsByVariant} from '../../redux/actions/actionProduct';
import PriceFilterModal from '../../components/CateClother/PriceFilterModal'; // Import thêm PriceFilterModal
import { useTheme } from '../../utils/ThemeContact';
import { darkTheme,lightTheme } from '../../utils/theme';

LogBox.ignoreLogs(['Warning: ...']); // Cảnh báo cụ thể
LogBox.ignoreAllLogs(); // Nếu muốn bỏ qua tất cả các log

const MAX_DISPLAY_ITEMS = 1;

const CateClotherScreen = ({route}) => {
  const {categoryName, subCategories, selectedTabIndex} = route.params;

  const [index, setIndex] = useState(selectedTabIndex);
  const [loading, setLoading] = useState(false);
  const [sizeFilterVisible, setSizeFilterVisible] = useState(false);
  const [colorFilterVisible, setColorFilterVisible] = useState(false);
  const [priceFilterVisible, setPriceFilterVisible] = useState(false);
  const [filterState, setFilterState] = useState({});
  const [filteredProductsState, setFilteredProductsState] = useState({});

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {products} = useSelector(state => state.categories);
  const {colorsAndSizesBySubCategoryId} = useSelector(state => state.variants);


  //lấy trạng thái theme
  const {isDarkMode} = useTheme()

 

  const currentSubCategoryId = subCategories[index]?._id;

  const loadProductsAndVariants = async () => {
    try {

      setLoading(true);
      await dispatch(fetchProductsBySubCategory(currentSubCategoryId));
      await dispatch(fetchColorsAndSizesBySubCategoryId(currentSubCategoryId));
    } catch (error) {
      console.error('Error loading products and variants:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = async () => {
    const {size, color, minPrice, maxPrice} = filterState[index] || {};
    const query = {
      subCategoryId: currentSubCategoryId,
      size,
      color,
      minPrice,
      maxPrice,
    };

    try {
      setLoading(true);
      const response = await dispatch(fetchProductsByVariant(query));
      setFilteredProductsState(prev => ({
        ...prev,
        [index]: response.payload,
      }));
    } catch (error) {console.error('Error filtering products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentSubCategoryId && !filteredProductsState[index]) {
      loadProductsAndVariants();
    }
  }, [index, currentSubCategoryId]);

  useEffect(() => {
    if (filterState[index]) {
      filterProducts();
    }
  }, [filterState, index]);

  const filteredProducts = useMemo(() => {
    return filteredProductsState[index] || products;
  }, [filteredProductsState, index, products]);

  const renderFilters = () => (
    <View style={styles.filterContainer}>
      <Text style={styles.filterLabel}>Bộ lọc</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSizeFilterVisible(true)}>
          <Text>
            {filterState[index]?.size?.length > 0
              ? renderTextWithEllipsis(filterState[index].size)
              : 'Kích cỡ'}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={18} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setColorFilterVisible(true)}>
          <Text>
            {filterState[index]?.color?.length > 0
              ? renderTextWithEllipsis(filterState[index].color)
              : 'Màu sắc'}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={18} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setPriceFilterVisible(true)}>
          <Text>
            {filterState[index]?.minPrice != null &&
            filterState[index]?.maxPrice != null
              ? `Giá: ${filterState[
                  index
                ].minPrice.toLocaleString()} - ${filterState[
                  index
                ].maxPrice.toLocaleString()}`
              : 'Giá'}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={18} color="#666" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const renderTextWithEllipsis = items => {
    return items.length > MAX_DISPLAY_ITEMS
      ? `${items.slice(0, MAX_DISPLAY_ITEMS).join(', ')}...`
      : items.join(', ');
  };

  const renderScene = useCallback(() => {
    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#00A65E" />
        ) : filteredProducts.length > 0 ? (
          <ProductList navigation={navigation} products={filteredProducts} />
        ) : (
          <Text style={{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }}>Không có sản phẩm phù hợp với bộ lọc</Text>
        )}
      </View>
    );
  }, [filteredProducts, loading]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}onPress={() => navigation.navigate('Trang chủ')}>
          <Image
            source={require('../../assets/images/icon_back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={[styles.categoryNameText,{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }]}>{categoryName}</Text>
      </View>

      {/* <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Bộ lọc</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setSizeFilterVisible(true)}>
            <Text style={{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }}>
              {filterState[index]?.size?.length > 0
                ? renderTextWithEllipsis(filterState[index].size)
                : 'Kích cỡ'}
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={18}
              color="#666"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setColorFilterVisible(true)}>
            <Text style={{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }}>
              {filterState[index]?.color?.length > 0
                ? renderTextWithEllipsis(filterState[index].color)
                : 'Màu sắc'}
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={18}
              color="#666"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton1}
            onPress={() => setPriceFilterVisible(true)}>
            <Text style={{ color: isDarkMode ? darkTheme.colors.text : lightTheme.colors.text }}>
              {filterState[index]?.minPrice != null &&
              filterState[index]?.maxPrice != null
                ? `Giá: ${filterState[index].minPrice.toLocaleString(
                    'vi-VN',
                  )} - ${filterState[index].maxPrice.toLocaleString(
                    'vi-VN',
                  )} VND`
                : 'Giá'}
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={18}
              color="#666"
            />
          </TouchableOpacity>
        </ScrollView>
      </View> */}


      {renderFilters()}


      <TabView
        navigationState={{
          index,
          routes: subCategories.map(sub => ({
            key: sub._id,
            title: sub.name,
          })),
        }}
        renderScene={renderScene}
        onIndexChange={newIndex => setIndex(newIndex)}
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
        // swipeEnabled // Bật tính năng vuốt giữa các tab
        // lazy
      />

      {/* Modals */}
      <SizeFilterModal
        visible={sizeFilterVisible}
        filterOptions={
          colorsAndSizesBySubCategoryId[currentSubCategoryId]?.sizes || []
        }
        onClose={() => setSizeFilterVisible(false)}
        applyFilters={selectedSizes =>
          setFilterState(prev => ({
            ...prev,
            [index]: {...prev[index], size: selectedSizes},
          }))
        }
        initialFilters={filterState[index]?.size}
      />

      <ColorFilterModal
        visible={colorFilterVisible}
        filterOptions={
          colorsAndSizesBySubCategoryId[currentSubCategoryId]?.colors || []
        }
        onClose={() => setColorFilterVisible(false)}
        applyFilters={selectedColors =>
          setFilterState(prev => ({
            ...prev,
            [index]: {...prev[index], color: selectedColors},
          }))
        }
        initialFilters={filterState[index]?.color}
      />

      <PriceFilterModal
        visible={priceFilterVisible}
        onClose={() => setPriceFilterVisible(false)}
        applyFilters={(minPrice, maxPrice) =>
          setFilterState(prev => ({
            ...prev,
            [index]: {...prev[index], minPrice, maxPrice},
          }))
        }
        initialMinPrice={filterState[index]?.minPrice}
        initialMaxPrice={filterState[index]?.maxPrice}
      />
    </View>
  );
};

export default CateClotherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 5,
    backgroundColor: '#fff',

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
  categoryNameText: {flex: 1,
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
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import ProductList from '../../components/CateClother/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColorsAndSizesBySubCategoryId } from '../../redux/actions/actionsVariant';
import SizeFilterModal from '../../components/CateClother/SizeFilterModal';
import ColorFilterModal from '../../components/CateClother/ColorFilterModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import cateClotherStyles from '../../styles/cateClotherStyles';
import { fetchProductsBySubCategory } from '../../redux/actions/actionCategory';
import { LogBox } from 'react-native';
import { fetchProductsByVariant } from '../../redux/actions/actionProduct';
import PriceFilterModal from '../../components/CateClother/PriceFilterModal'; // Import thêm PriceFilterModal

const MAX_DISPLAY_ITEMS = 1;

LogBox.ignoreLogs(['Warning: ...']); // Cảnh báo cụ thể
LogBox.ignoreAllLogs(); // Nếu muốn bỏ qua tất cả các log

const CateClotherScreen = ({ route }) => {
  const { categoryName, subCategories, selectedTabIndex } = route.params;
  const [index, setIndex] = useState(selectedTabIndex);
  const [loading, setLoading] = useState(false);
  const [sizeFilterVisible, setSizeFilterVisible] = useState(false);
  const [colorFilterVisible, setColorFilterVisible] = useState(false);
  const [priceFilterVisible, setPriceFilterVisible] = useState(false); // Thêm trạng thái cho modal lọc giá

  const [filterState, setFilterState] = useState({});
  const [filteredProductsState, setFilteredProductsState] = useState({});
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.categories);
  const { colorsAndSizesBySubCategoryId } = useSelector((state) => state.variants);
  const navigation = useNavigation();

  useEffect(() => {
    // Kiểm tra xem dữ liệu đã có sẵn trong trạng thái chưa, nếu có thì không cần tải lại
    if (subCategories[index] && !filteredProductsState[index]) {
      const loadProductsAndVariants = async () => {
        setLoading(true);
        try {
          // Prefetch both products and variant data in parallel
          await Promise.all([
            dispatch(fetchProductsBySubCategory(subCategories[index]._id)),
            dispatch(fetchColorsAndSizesBySubCategoryId(subCategories[index]._id)),
          ]);
        } catch (error) {
          console.error("Error loading products and variants:", error);
        } finally {
          setLoading(false);
        }
      };

      loadProductsAndVariants();
    }
  }, [index, dispatch, subCategories, filteredProductsState]);

  useEffect(() => {
    if (subCategories[index]) {
      const filterProducts = async () => {
        const { size, color, minPrice, maxPrice } = filterState[index] || {};
  
        setLoading(true);
        try {
          let query = {
            subCategoryId: subCategories[index]._id,
          };
  
          // Thêm điều kiện vào query nếu có
          if (size) {
            query.size = size;
          }
          if (color) {
            query.color_code = color;
          }
          if (minPrice != null) {
            query.minPrice = minPrice;
          }
          if (maxPrice != null) {
            query.maxPrice = maxPrice;
          }
  
          // Gọi hàm fetch với query đã xây dựng
          const response = await dispatch(fetchProductsByVariant(query));
  
          setFilteredProductsState((prevState) => ({
            ...prevState,
            [index]: response.payload,
          }));
        } catch (error) {
          console.error("Error filtering products:", error);
        } finally {
          setLoading(false);
        }
      };
  
      filterProducts();
    }
  }, [filterState, index, dispatch, subCategories]);
  

  // useEffect(() => {
  //   // Kiểm tra xem đã có bộ lọc và dữ liệu tương ứng chưa, nếu chưa thì thực hiện lọc
  //   if (subCategories[index]) {
  //     const filterProducts = async () => {
  //       const { size, color, minPrice, maxPrice } = filterState[index] || {};
        
  //       // Nếu không có bộ lọc, không cần thực hiện lọc
  //       if (!size && !color) return;

  //       setLoading(true);
  //       try {
  //         const response = await dispatch(fetchProductsByVariant({
  //           subCategoryId: subCategories[index]._id,
  //           size,
  //           color_code: color,
  //           minPrice,
  //           maxPrice,
  //         }));

  //         setFilteredProductsState((prevState) => ({
  //           ...prevState,
  //           [index]: response.payload,
  //         }));
  //       } catch (error) {
  //         console.error("Error filtering products:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     filterProducts();
  //   }
  // }, [filterState, index, dispatch, subCategories]);

  const getFilteredProductsForCurrentTab = () => {
    return filteredProductsState[index] || products;
  };

  const renderTextWithEllipsis = (items) => {
    return items.length > MAX_DISPLAY_ITEMS
      ? `${items.slice(0, MAX_DISPLAY_ITEMS).join(', ')}...`
      : items.join(', ');
  };

  const renderScene = useCallback(() => {
    const filteredProducts = getFilteredProductsForCurrentTab();
    
    return (
      <View style={cateClotherStyles.container}>
        {loading ? (
          <View style={cateClotherStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#00A65E" />
          </View>
        ) : filteredProducts && filteredProducts.length > 0 ? (
          <ProductList
          navigation={navigation}
          products={filteredProducts} />
        ) : (
          <Text>Không có sản phẩm phù hợp với bộ lọc</Text>
        )}
      </View>
    );
  }, [filteredProductsState, index, loading]);

  return (
    <View style={cateClotherStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Trang chủ')}
        >
          <Image
            source={require('../../assets/images/icon_back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.categoryNameText}>{categoryName}</Text>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Bộ lọc</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setSizeFilterVisible(true)}
          >
            <Text>
              {filterState[index]?.size?.length > 0
                ? renderTextWithEllipsis(filterState[index].size)
                : 'Kích cỡ'}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={18} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setColorFilterVisible(true)}
          >
            <Text>
              {filterState[index]?.color?.length > 0
                ? renderTextWithEllipsis(filterState[index].color)
                : 'Màu sắc'}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={18} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filterButton1}
            onPress={() => setPriceFilterVisible(true)}
          >
             <Text>
      {filterState[index]?.minPrice != null && filterState[index]?.maxPrice != null
        ? `Giá: ${filterState[index].minPrice.toLocaleString('vi-VN')} - ${filterState[index].maxPrice.toLocaleString('vi-VN')} VND`
        : 'Giá'}
    </Text>
            <MaterialCommunityIcons name="chevron-down" size={18} color="#666" />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <TabView
        navigationState={{
          index,
          routes: subCategories.map((sub) => ({ key: sub._id, title: sub.name })),
        }}
        renderScene={renderScene}
        onIndexChange={(newIndex) => {
          setIndex(newIndex);
          // Xóa trạng thái loading khi chuyển tab để tránh vòng lặp gọi `useEffect`
          setLoading(false);
        }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={cateClotherStyles.indicator}
            style={cateClotherStyles.tabBar}
            labelStyle={cateClotherStyles.label}
            activeColor="#00A65E"
            inactiveColor="#999"
            scrollEnabled
          />
        )}
      />

      <SizeFilterModal
        visible={sizeFilterVisible}
        filterOptions={colorsAndSizesBySubCategoryId[subCategories[index]?._id]?.sizes || []}
        onClose={() => setSizeFilterVisible(false)}
        applyFilters={(selectedSizes) => {
          setFilterState((prevState) => ({
            ...prevState,
            [index]: { ...prevState[index], size: selectedSizes },
          }));
        }}
        initialFilters={filterState[index]?.size}
      />

      <ColorFilterModal
        visible={colorFilterVisible}
        filterOptions={colorsAndSizesBySubCategoryId[subCategories[index]?._id]?.colors || []}
        onClose={() => setColorFilterVisible(false)}
        applyFilters={(selectedColors) => {
          setFilterState((prevState) => ({
            ...prevState,
            [index]: { ...prevState[index], color: selectedColors },
          }));
        }}
        initialFilters={filterState[index]?.color}
      />
      <PriceFilterModal
        visible={priceFilterVisible}
        onClose={() => setPriceFilterVisible(false)}
        applyFilters={(minPrice, maxPrice) => {
          setFilterState((prevState) => ({
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
});

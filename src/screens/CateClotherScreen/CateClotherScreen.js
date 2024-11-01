import React, { useEffect, useState } from 'react';
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


const MAX_DISPLAY_ITEMS = 1;

const CateClotherScreen = ({ route }) => {
  const { categoryName, subCategories, selectedTabIndex } = route.params;
  const [index, setIndex] = useState(selectedTabIndex);
  const [loading, setLoading] = useState(false);
  const [sizeFilterVisible, setSizeFilterVisible] = useState(false);
  const [colorFilterVisible, setColorFilterVisible] = useState(false);
  const [filterState, setFilterState] = useState({});
  const [filteredProductsState, setFilteredProductsState] = useState({});
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.categories);
  const { colorsAndSizesBySubCategoryId } = useSelector((state) => state.variants);
  const navigation = useNavigation();

  useEffect(() => {
    const loadProductsAndVariants = async () => {
      setLoading(true);
      await dispatch(fetchProductsBySubCategory(subCategories[index]?._id));
      await dispatch(fetchColorsAndSizesBySubCategoryId(subCategories[index]?._id));
      setLoading(false);
    };

    if (subCategories[index]) {
      loadProductsAndVariants();
    }
  }, [index, dispatch, subCategories]);

  useEffect(() => {
    const colorsAndSizes = colorsAndSizesBySubCategoryId[subCategories[index]?._id] || { colors: [], sizes: [] };
    // Loại bỏ giá trị null trong mảng colors
    const validColors = colorsAndSizes.colors.filter(color => color !== null);
    setAvailableColors(validColors);
    setAvailableSizes(colorsAndSizes.sizes);
    console.log('SubCategory ID:', subCategories[index]?._id);
    console.log('Colors and Sizes:', colorsAndSizes);
  }, [colorsAndSizesBySubCategoryId, index, subCategories]);

  useEffect(() => {
    if (products) {
      setFilteredProductsState((prev) => ({
        ...prev,
        [index]: products,
      }));
    }
  }, [products, index]);
  const applyFilters = (newFilters) => {
    const currentFilters = filterState[index] || { size: [], color: [] };
    const updatedFilters = { ...currentFilters, ...newFilters };
  
    // Thông báo trạng thái bộ lọc
    console.log('Updated Filters:', updatedFilters);
  
    const filteredProducts = (products || []).filter((product) => {
      const subCategoryId = subCategories[index]?._id;
  
      // Kiểm tra xem `subCategoryId` có hợp lệ không
      if (!subCategoryId) {
        console.warn(`SubCategory ID is undefined for index: ${index}`);
        return false;
      }
  
      // Lấy thông tin về colors và sizes từ Redux Store
      const variantInfo = colorsAndSizesBySubCategoryId[subCategoryId];
      if (!variantInfo) {
        console.warn(`No valid variants found for SubCategory ID: ${subCategoryId}`);
        return false;
      }
  
      const { colors, sizes } = variantInfo;
  
      // Điều kiện lọc kích cỡ
      let matchesSize = true;
      if (updatedFilters.size.length > 0) {
        matchesSize = updatedFilters.size.some((size) => sizes.includes(size));
      }
  
      // Điều kiện lọc màu sắc
      let matchesColor = true;
      if (updatedFilters.color.length > 0) {
        matchesColor = updatedFilters.color.some((color) => colors.includes(color));
      }
  
      console.log('Product:', product.name, 'Matches Size:', matchesSize, 'Matches Color:', matchesColor);
  
      return matchesSize && matchesColor;
    });
  
    console.log('Filtered Products:', filteredProducts.map((p) => p.name));
  
    setFilterState((prev) => ({
      ...prev,
      [index]: updatedFilters,
    }));
    setFilteredProductsState((prev) => ({
      ...prev,
      [index]: filteredProducts,
    }));
  };
  
  
  const getFilteredProductsForCurrentTab = () => {
    return filteredProductsState[index] || products;
  };

  const renderTextWithEllipsis = (items) => {
    return items.length > MAX_DISPLAY_ITEMS
      ? `${items.slice(0, MAX_DISPLAY_ITEMS).join(', ')}...`
      : items.join(', ');
  };

  const renderScene = () => {
    if (loading) {
      return (
        <View style={cateClotherStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#00A65E" />
        </View>
      );
    }

    const filteredProducts = getFilteredProductsForCurrentTab();

    return (
      <View style={cateClotherStyles.container}>
        {filteredProducts && filteredProducts.length > 0 ? (
          <ProductList products={filteredProducts} />
        ) : (
          <Text>Không có sản phẩm phù hợp với bộ lọc</Text>
        )}
      </View>
    );
  };

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
        </ScrollView>
      </View>

      <TabView
        navigationState={{
          index,
          routes: subCategories.map((sub) => ({ key: sub._id, title: sub.name })),
        }}
        renderScene={renderScene}
        onIndexChange={setIndex}
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
        filterOptions={availableSizes}
        onClose={() => setSizeFilterVisible(false)}
        applyFilters={(selectedSizes) => applyFilters({ size: selectedSizes })}
        initialFilters={filterState[index]?.size || []}
      />
      <ColorFilterModal
        visible={colorFilterVisible}
        filterOptions={availableColors}
        onClose={() => setColorFilterVisible(false)}
        applyFilters={(selectedColors) => applyFilters({ color: selectedColors })}
        initialFilters={filterState[index]?.color || []}
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

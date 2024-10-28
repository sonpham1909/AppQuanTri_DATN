import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {LogBox} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import ProductList from '../../components/CateClother/ProductList';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductsBySubCategory} from '../../redux/actions/actionCategory';
import {useNavigation} from '@react-navigation/native';
import cateClotherStyles from '../../styles/cateClotherStyles';
import SizeFilterModal from '../../components/CateClother/SizeFilterModal';
import ColorFilterModal from '../../components/CateClother/ColorFilterModal';
import PriceFilterModal from '../../components/CateClother/PriceFilterModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getColorNameInVietnamese} from '../../constants/colorUtils';

const MAX_DISPLAY_ITEMS = 1; // Số lượng kích cỡ hoặc màu tối đa hiển thị

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
  const {products} = useSelector(state => state.categories);
  const navigation = useNavigation();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await dispatch(fetchProductsBySubCategory(subCategories[index]?._id));
      setLoading(false);
    };

    if (subCategories[index]) {
      loadProducts();
    }
  }, [index, dispatch, subCategories]);

  LogBox.ignoreLogs([
    'Warning: A props object containing a "key" prop is being spread into JSX',
  ]);

  const extractFilterOptions = () => {
    let sizes = new Set();
    let colors = new Set();

    if (!products || products.length === 0) {
      return {sizes: [], colors: []};
    }

    products.forEach(product => {
      product.variants.forEach(variant => {
        if (variant.quantity > 0) {
          // Chỉ thêm những kích cỡ/màu còn hàng
          sizes.add(variant.size);
          colors.add(variant.color);
        }
      });
    });

    return {
      sizes: Array.from(sizes),
      colors: Array.from(colors),
    };
  };

  const filterOptions = extractFilterOptions();

  const applyFilters = newFilters => {
    const currentFilters = filterState[index] || {
      size: [],
      color: [],
      price: [0, 10000000],
    };
    const updatedFilters = {...currentFilters, ...newFilters};

    const {size = [], color = [], price = [0, 10000000]} = updatedFilters;

    const filtered = (products || []).filter(product => {
      const matchesSize =
        size.length === 0 ||
        product.variants.some(
          variant => size.includes(variant.size) && variant.quantity > 0,
        );
      const matchesColor =
        color.length === 0 ||
        product.variants.some(
          variant => color.includes(variant.color) && variant.quantity > 0,
        );
      const matchesPrice = product.variants.some(
        variant => variant.price >= price[0] && variant.price <= price[1],
      );
      return matchesSize && matchesColor && matchesPrice;
    });

    setFilterState(prev => ({
      ...prev,
      [index]: updatedFilters,
    }));

    setFilteredProductsState(prev => ({
      ...prev,
      [index]: filtered,
    }));
  };

  const getFilteredProductsForCurrentTab = () => {
    return filteredProductsState[index] || products;
  };

  const renderTextWithEllipsis = items => {
    return items.length > MAX_DISPLAY_ITEMS
      ? `${items.slice(0, MAX_DISPLAY_ITEMS).join(', ')}...`
      : items.join(', ');
  };

  const renderScene = ({route}) => {
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
          onPress={() => navigation.navigate('Trang chủ')}>
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
            onPress={() => setSizeFilterVisible(true)}>
            <Text>
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
            <Text>
              {filterState[index]?.color?.length > 0
                ? renderTextWithEllipsis(
                    filterState[index].color.map(color =>
                      getColorNameInVietnamese(color),
                    ),
                  )
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
            <Text>
              {filterState[index]?.price &&
              (filterState[index].price[0] !== 0 ||
                filterState[index].price[1] !== 10000000)
                ? `${filterState[index].price[0]} ~ ${filterState[index].price[1]} VND`
                : 'Giá'}
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={18}
              color="#666"
            />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <TabView
        navigationState={{
          index,
          routes: subCategories.map(sub => ({key: sub._id, title: sub.name})),
        }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => (
          <TabBar
            key={props.navigationState.routes[props.navigationState.index].key}
            indicatorStyle={cateClotherStyles.indicator}
            style={cateClotherStyles.tabBar}
            labelStyle={cateClotherStyles.label}
            activeColor="#00A65E"
            inactiveColor="#999"
            scrollEnabled // Thêm dòng này để bật cuộn ngang

            {...props}
          />
        )}
      />

      <SizeFilterModal
        visible={sizeFilterVisible}
        filterOptions={filterOptions.sizes || []}
        onClose={() => setSizeFilterVisible(false)}
        applyFilters={applyFilters}
        initialFilters={filterState[index]?.size || []}
      />
      <ColorFilterModal
        visible={colorFilterVisible}
        filterOptions={filterOptions.colors || []}
        onClose={() => setColorFilterVisible(false)}
        applyFilters={applyFilters}
        initialFilters={filterState[index]?.color || []}
      />
      <PriceFilterModal
        visible={priceFilterVisible}
        onClose={() => setPriceFilterVisible(false)}
        applyFilters={applyFilters}
        priceRange={filterState[index]?.price || [0, 10000000]}
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

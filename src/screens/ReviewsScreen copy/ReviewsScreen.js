import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import globalStyles from '../../styles/globalStyles';

const ReviewsScreen = navigation => {
  // data
  const data = [
    {
      product_id: '1',
      rating: '4',
      coment: 'đẹp quá',
      date: '2022-01-01',
      image:
        'https://cdn2.yame.vn/pimg/ao-so-mi-co-be-tay-ngan-soi-nhan-tao-tham-hut-bieu-tuong-dang-rong-on-gian-seventy-seven-22-0023258/37a5b9fe-a458-e900-bdbf-001b3f08ea68.jpg?w=540&h=756&c=true&ntf=false',
      name: 'áo',
      price: '100.000',
    },
    {
      product_id: '2',
      rating: '4',
      coment: 'đẹp quá',
      date: '2022-01-01',
      image:
        'https://cdn2.yame.vn/pimg/ao-so-mi-co-be-tay-ngan-soi-nhan-tao-tham-hut-bieu-tuong-dang-rong-on-gian-seventy-seven-22-0023258/37a5b9fe-a458-e900-bdbf-001b3f08ea68.jpg?w=540&h=756&c=true&ntf=false',
      name: 'áo',
      price: '100.000',
    },
  ];
  //hàm render
  const renderItem = ({item}) => (
    <View style={globalStyles.cardReview}>
      <View style={globalStyles.renderItemReview}>
        {/* ảnh sản phẩm */}
        <Image
          source={{uri: item.image}}
          style={globalStyles.imageReview}
        />
        <View>
          {/* tên sản phẩm */}
          <Text style={globalStyles.nameReview}>{item.name}</Text>
          {/* giá sản phẩm */}
          <Text style={globalStyles.priceReview}>{item.price} VND</Text>
        </View>
      </View>

      <View style={{marginTop: 10}}>
         {/* đánh giá sao */}
         <View style={globalStyles.renderStarReview}>
            {renderStars(item.rating)}
            {/* ngày */}
            <Text style={globalStyles.dateReview}>{item.date}</Text>
          </View>
        <Text>{item.coment}</Text>
      </View>
    </View>
  );

  const renderStars = rating => {
    const stars = [];

    const ratingNumber = parseInt(rating, 10);//ép kiểu
    for (let i = 0; i < ratingNumber; i++) {
      stars.push(
        <Image
          key={i}
          source={require('../../assets/images/home_start.png')}
        />,
      );
    }
    return stars;
  };
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.product_id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ReviewsScreen;

import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axiosInstance from '../utils/axios';

const ProductDetail = () => {
  const dimension = Dimensions.get('window');
  const [product, setProduct] = useState({});
  const {params} = useRoute();
  const {navigate} = useNavigation();
  //console.log('route', params, product);

  const fetchProducts = () => {
    axiosInstance.get(`products/${params?.id}`).then(response => {
      setProduct(response.data);
    });
  };
  const addCarts = () => {
    axiosInstance
      .post('carts', product)
      .then(response => {
        if (response.status === 201 && response.data) {
          Alert.alert('başarılı', 'sepete eklendi');
        }
      })
      .catch(error => {
        Alert.alert('hata', 'sepete eklenemedi');
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [params]);

  const _renderItem = ({item}) => {
    //console.log('item', item);
    return (
      <View>
        <Image source={{uri: item}} style={styles.thumbnail} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri: product?.thumbnail}}
          resizeMode="cover"
        />
      </View>

      <Text style={styles.brandText}>
        {product?.brand} {product?.title}
      </Text>

      <View>
        <Text style={styles.descriptionText}>{product?.description}</Text>
        <Text>
          {product?.price}TL {product?.discountPercentage}%
        </Text>
      </View>
      <View>
        <FlatList
          style={{gap: 10}}
          data={product?.images}
          renderItem={_renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Button title="Sepete ekle" onPress={() => addCarts()} />
      <Button
        title="Ürünü Güncelle"
        onPress={() => navigate('ProductUpdate', product)}
      />
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  imageContainer: {
    width: 430,
    height: 300,
  },
  image: {
    width: '100%',
    height: 300,
  },
  thumbnailcon: {
    width: ' 100%',
    height: 200,
    backgroundColor: '',
  },

  thumbnail: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  brandText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
});

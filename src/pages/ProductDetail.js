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
import {useDetailStore} from '../utils/store';
import {useCartsStore} from '../utils/store';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductDetail = ({navigation}) => {
  const dimension = Dimensions.get('window');
  //const [product, setProduct] = useState({});
  const {product, setProduct} = useDetailStore();
  const {params} = useRoute();
  const {navigate} = useNavigation();
  const {addCartItem} = useCartsStore();
  //console.log('route', params, product);

  const fetchProducts = () => {
    axiosInstance.get(`products/${params?.id}`).then(response => {
      setProduct(response.data);
    });
  };
  const addCarts = async () => {
    const response = await axiosInstance
      .post('carts', product)
      .then(response => {
        if (response.status === 201 && response.data) {
          addCartItem(product);

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
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            paddingBottom:20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name={'chevron-back-outline'}
                size={25}
                style={{color: 'black'}}
              />
            </TouchableOpacity>
          </View>
        </View>

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
        <View style={{paddingVertical: 10}}>
          <FlatList
            style={{gap: 10}}
            data={product?.images}
            renderItem={_renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            paddingTop: 10,
          }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => addCarts()}>
            <Text style={styles.buttonText}>Sepete ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigate('ProductUpdate', product)}>
            <Text style={styles.buttonText}>Ürünü Güncelle</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#706F9B',
    padding: 10,
    paddingHorizontal: 10,
  },
  imageContainer: {
    borderRadius: 10,
    width: 430,
    height: 300,
  },
  image: {
    borderRadius: 10,
    width: '100%',
    height: 300,
  },
  thumbnailcon: {
    borderRadius: 10,
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
  buttonContainer: {
    borderWidth: 1,

    backgroundColor: '#665B75',

    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

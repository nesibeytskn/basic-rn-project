import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import axiosInstance from '../utils/axios';
import { useProductStore } from '../utils/store';

const Products = props => {
  const {navigate, setOptions} = useNavigation();
  //const [products, setProducts] = useState([]);
  const {products,setProducts}=useProductStore()
  const axiosProducts = () => {
    axiosInstance.get('products').then(response => {
      setProducts(response.data);
      //console.log('response', response.data);
    });
  };
  useLayoutEffect(() => {
    setOptions({
      headerRight: () => {
        return <Button title="Sepet" onPress={() => navigate('Cart')} />;
      },
      headerLeft: () => {
        return (
          <Button title="Ürün Ekle" onPress={() => navigate('ProductCreate')} />
        );
      },
    });
  }, []);

  useEffect(() => {
    axiosProducts();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigate('ProductDetail', {id: item?.id})}>
              <View style={styles.productContainer}>
                <Image
                  style={{width: 150, height: 150}}
                  source={{uri: item?.thumbnail}}
                />
                <Text>{item?.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    padding: 10,
  },
});

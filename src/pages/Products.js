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
import Icon from 'react-native-vector-icons/Ionicons';

import axiosInstance from '../utils/axios';
import {useCartsStore, useProductStore} from '../utils/store';

const Products = props => {
  const {navigate, setOptions} = useNavigation();

  const {products, setProducts} = useProductStore();
  const {addCartItem} = useCartsStore();
  const axiosProducts = () => {
    axiosInstance.get('products').then(response => {
      setProducts(response.data);
      //console.log('response', response.data);
    });
  };
  useLayoutEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => navigate('Cart')}>
            <Icon name={'cart-outline'} size={25} style={{color: 'gray'}} />
          </TouchableOpacity>
        );
      },
      headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => navigate('ProductCreate')}>
            <Icon name={'add'} size={25} style={{color: 'gray'}} />
          </TouchableOpacity>
        );
      },
    });
  }, []);

  useEffect(() => {
    axiosProducts();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => navigate('ProductCreate')}>
            <Icon name={'add'} size={25} style={{color: 'black'}} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'blue',
              borderRadius: 10,
              width: 20,
            }}>
            <Text style={{color:'#fff'}} key={products.id}>
              {useCartsStore.getState().items}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigate('Cart')}>
            <Icon name={'cart-outline'} size={25} style={{color: 'black'}} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigate('ProductDetail', {id: item?.id})}>
              <View style={styles.productContainer}>
                <Image
                  style={{width: 150, height: 150, borderRadius: 10}}
                  source={{uri: item?.thumbnail}}
                />
                <Text style={styles.textContainer}>{item?.title}</Text>
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
    backgroundColor: '#706F9B',
  },
  productContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    fontSize: 15,
    fontWeight: '700',
  },
});

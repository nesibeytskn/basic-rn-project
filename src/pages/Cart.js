import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosInstance from '../utils/axios';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const {navigate} = useNavigation();

  const fetchCarts = () => {
    axiosInstance.get('carts').then(response => {
      const {status, data} = response;
      if (status === 200) {
        setCarts(data);
      }
    });
  };
  useEffect(() => {
    fetchCarts();
  }, []);
  const deleteCart = cartsId => {
    axiosInstance
      .delete(`carts/${cartsId}`)
      .then(response => {
        // console.log('response', response.status, response);
        const {status} = response;
        if (status === 200) {
          fetchCarts();
        }
      })
      .catch(error => console.log(error));
  };

  const renderCarts =
    carts && carts?.length > 0 ? (
      carts.map(cart => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            justifyContent: 'space-between',
            padding: 15,
          }}
          key={cart.id}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 5,
            }}>
            <Image
              style={{width: 50, height: 50}}
              source={{uri: cart.thumbnail}}
            />
            <Text>{cart.title}</Text>
            <Text>{cart.price}</Text>
            <Text>{cart.quantity}</Text>
            <Text>{cart.total}</Text>
          </View>

          <Button title={'sil'} onPress={() => deleteCart(cart.id)} />
        </View>
      ))
    ) : (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text>Sepetiniz boştur lütfen ürün sayfasına bakınız</Text>
        <Button title="ürünlere git" onPress={() => navigate('Products')} />
      </View>
    );
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View>{renderCarts}</View>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({});

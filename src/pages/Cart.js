import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosInstance from '../utils/axios';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useCartsStore} from '../utils/store';

import Icon from 'react-native-vector-icons/Ionicons';

const Cart = () => {
  //const [carts, setCarts] = useState([]);
  const navigation = useNavigation();
  const {carts, setCarts, deleteCartItem, clearCart} = useCartsStore();

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
          deleteCartItem(cartsId);
        }
      })
      .catch(error => console.log(error));
  };

  const renderCarts = () =>
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
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => deleteCart(cart.id)}>
            <Text style={styles.buttonText}>Sil</Text>
          </TouchableOpacity>
        </View>
      ))
    ) : (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text>Sepetiniz boştur lütfen ürün sayfasına bakınız</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Products')}>
          <Text style={styles.buttonText}>Ürünlere Git</Text>
        </TouchableOpacity>
      </View>
    );
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#8998C5', padding: 20}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={'chevron-back-outline'}
              size={25}
              style={{color: 'black'}}
            />
          </TouchableOpacity>
        </View>
        <View>{renderCarts()}</View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
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

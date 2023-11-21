/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import React, {useEffect, useState} from 'react';

import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
});

const App = () => {
  {
    /*const fetchProducts = () => {
    const response = fetch('http://localhost:3000/products', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => console.log('data', JSON.stringify(data, null, 4)));
    // console.log('response', JSON.stringify(response, null, 4));
  };
  */
  }

  const [products, setProducts] = useState([]);
  const axiosProducts = async () => {
    const axiosResponse = await axiosInstance.get('products');
    setProducts(axiosResponse.data);
    console.log('response', axiosResponse);
  };

  const addedProducts = () => {
    axiosInstance.post('products', {
      title: 'ürün başlığı',
      description: 'n apple mobile which is nothing',
      price: 100,
      discountPersentage: 10,
      rating: 5,
      stock: 10,
      brand: 'ürün',
    });
    axiosProducts();
  };
  const updateProducts = () => {
    axiosInstance.put('products/3', {
      title: 'Samsung Universe 10',
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 9249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: 'Samsung',
      category: 'smartphones',
      thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
      images: ['https://i.dummyjson.com/data/products/3/1.jpg'],
    });
    if (Response.status === 200) {
      axiosProducts();
    }
  };
  const deleteProducts = productId => {
    axiosInstance.delete(`products/${productId}`).then(response => {
     // console.log('response', response.status, response);
      if (response.status === 200) {
        axiosProducts();
      }
    });
  };
  {
    /*
  {
    "id": 1,
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    "images": [
      "https://i.dummyjson.com/data/products/1/1.jpg",
      "https://i.dummyjson.com/data/products/1/2.jpg",
      "https://i.dummyjson.com/data/products/1/3.jpg",
      "https://i.dummyjson.com/data/products/1/4.jpg",
      "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
    ]
  },
*/
  }

  useEffect(() => {
    // fetchProducts();
    axiosProducts();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{gap: 5}}>
        {/* // {products.map((item: any) => {
          //   return <Text>{item.title}</Text>;
          // })} */}
        <FlatList
          data={products}
          ListHeaderComponent={() => {
            return (
              <View>
                <Button title="datayı getir" onPress={() => axiosProducts()} />
                <Button title="datayı boşalt" onPress={() => setProducts([])} />
                <Button title="ürün ekle " onPress={() => addedProducts()} />
                <Button
                  title="ürün güncelle"
                  onPress={() => updateProducts()}
                />
                <Button title="ürün sil" onPress={() => deleteProducts(34)} />
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text>Loading...</Text>
              </View>
            );
          }}
          renderItem={props => {
            return (
              <View>
                <Text>{props.item.title}</Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;

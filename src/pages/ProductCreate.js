import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import axiosInstance from '../utils/axios';
import {useCreateStore} from '../utils/store';
import Icon from 'react-native-vector-icons/Ionicons'

const ProductCreate = ({navigation}) => {
  {
    /*const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    images: [
      'https://i.dummyjson.com/data/products/1/1.jpg',
      'https://i.dummyjson.com/data/products/1/2.jpg',
      'https://i.dummyjson.com/data/products/1/3.jpg',
      'https://i.dummyjson.com/data/products/1/4.jpg',
      'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    ],
  });*/
  }
  const {product, setProduct, textChange} = useCreateStore();

  const productCreate = async () => {
    await axiosInstance.post('products', product).then(response => {
      const {data, status} = response;
      if (status === 200) {
        setProduct(product);
        Alert.alert('başarılı', `ürün eklendi ${data.title}`);
      }
    });
  };

  const onChangeText = (key, value) => {
    //setProduct({...product, [key]: value});
    textChange(key, value);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
      <View style={{padding:20}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name={'chevron-back-outline'}
                size={25}
                style={{color: 'black'}}
              />
            </TouchableOpacity>
          </View>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              onChangeText={text => onChangeText('title', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              onChangeText={text => onChangeText('description', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              onChangeText={text => onChangeText('price', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="DiscountPercentage"
              onChangeText={text => onChangeText('discountPercentage', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Rating"
              onChangeText={text => onChangeText('rating', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Stock"
              onChangeText={text => onChangeText('stock', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Brand"
              onChangeText={text => onChangeText('brand', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Category"
              defaultValue="SmartPhone"
              onChangeText={text => onChangeText('category', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Thumbnail"
              onChangeText={text => onChangeText('thumbnail', text)}
              value={product.thumbnail}
            />
            {/*<TextInput
          style={styles.input}
          placeholder="Images"
          onChangeText={text => onChangeText('images', text)}
        />*/}
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => productCreate()}>
            <Text style={styles.buttonText}>Ürünü Ekle</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ProductCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#A2ADCB',
    padding: 20,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    borderColor: 'gray',
  },
  inputContainer: {
    padding: 10,
    gap: 20,
    width: '100%',
    borderRadius: 10,
    borderColor: 'gray',
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

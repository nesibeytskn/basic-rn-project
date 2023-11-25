import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axiosInstance from '../utils/axios';
import {useUpdateStore} from '../utils/store';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductUpdate = props => {
  const navigation = useNavigation();
  //const [product, setProduct] = useState(props?.route?.params);
  //const {textChange} = useUpdateStore();

  const {updateProduct, product, textChange} = useUpdateStore();
  //const updateProduct = useUp} = useUpdateStore();
  const onChangeText = (key, value) => {
    //setProduct({...product, [key]: value});

    textChange(key, value);
  };
  useEffect(() => {
    // Komponent yüklendiğinde ürünü güncelle
    updateProduct(props);
  }, [updateProduct, props]);

  const productUpdate = async () => {
    const response = await axiosInstance
      .put(`products/${product.id}`, product)
      .then(response => {
        console.log(response);
        updateProduct(response.data);
      })
      .then(() => navigation.navigate('Products'));
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{paddingBottom:10}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={'chevron-back-outline'}
              size={25}
              style={{color: 'black'}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            onChangeText={text => onChangeText('title', text)}
            value={product?.title}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            onChangeText={text => onChangeText('description', text)}
            value={product?.description}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            onChangeText={text => onChangeText('price', text)}
            value={String(product?.price)}
          />
          <TextInput
            style={styles.input}
            placeholder="DiscountPercentage"
            onChangeText={text => onChangeText('discountPercentage', text)}
            value={String(product?.discountPercentage)}
          />
          <TextInput
            style={styles.input}
            placeholder="Rating"
            onChangeText={text => onChangeText('rating', text)}
            value={String(product?.rating)}
          />
          <TextInput
            style={styles.input}
            placeholder="Stock"
            onChangeText={text => onChangeText('stock', text)}
            value={String(product?.stock)}
          />
          <TextInput
            style={styles.input}
            placeholder="Brand"
            onChangeText={text => onChangeText('brand', text)}
            value={product?.brand}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            onChangeText={text => onChangeText('category', text)}
            value={product?.category}
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

        <View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => productUpdate()}>
            <Text style={styles.buttonText}>Ürünü Güncelle</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ProductUpdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#A2ADCB',
    padding: 30,
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

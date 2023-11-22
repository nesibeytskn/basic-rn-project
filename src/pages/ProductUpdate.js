import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import React, {useState} from 'react';
import axiosInstance from '../utils/axios';

const ProductUpdate = props => {
  const [product, setProduct] = useState(props?.route?.params);

  const onChangeText = (key, value) => {
    setProduct({...product, [key]: value});
  };

  function productUpdate() {
    axiosInstance.put(`products/${product.id}`, product).then(response => {
      console.log(response);
    });
  }
  return (
    <View>
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
      <Button title="Ürünü Güncelle" onPress={() => productUpdate()} />
    </View>
  );
};

export default ProductUpdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
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
});

import {useNavigation} from '@react-navigation/native';
import {create} from 'zustand';

export const useUpdateStore = create(set => ({
  product: {}, // Başlangıçta boş bir nesne
  updateProduct: props => set({product: props?.route?.params || product}), // Route'dan gelen parametreleri kullan veya boş bir nesne
  textChange: (key, value) =>
    set(state => ({product: {...state.product, [key]: value}})),
}));
export const useProductStore = create(set => ({
  products: [],
  setProducts: data => set({products: data}),
  //addCartProduct: () => set((state) => ({products: state.products + 1}))
}));

export const useDetailStore = create(set => ({
  product: {},
  setProduct: data => set({product: data}),
}));

export const useCartsStore = create(set => ({
  carts: [],
  items: 0,
  setCarts: data => set({carts: data}),
  addCartItem: product =>
    set(state => ({carts: [...state.carts, product], items: state.items + 1})),

  deleteCartItem: cartsId =>
    set(state => ({
      carts: state.carts.filter(product => product.id !== cartsId),
      items: state.items - 1,
    })),

  clearCart: () => set({carts: [], items: 0}),
}));

export const useCreateStore = create(set => ({
  product: {
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
  },
  setProduct: data => set({product: data}),
  textChange: (key, value) =>
    set(state => ({product: {...state.product, [key]: value}})),
}));
//props?.route?.params

{
  /** product: props => {
    props?.route?.params;
  },
  updateProduct: () => set(state => state.product.textChange),
  textChange: (key, value) => set(state => ({...product, [key]: value})), */
}
{
  /*addProduct: product =>
    set(state => {
      state.items++;
      const hasProduct = state.products.find(p => p.id === product.id);
      if (hasProduct) {
        return {
          products: state.products.map(p => {
            if (p.id === product.id) {
              return {...p, quantity: p.quantity + 1};
            }
            return p;
          }),
        };
      } else {
        return {
          products: [...state.products, {...product, quantity: 1}],
        };
      }
    }),
  */
}

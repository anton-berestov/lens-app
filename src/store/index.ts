import { createStore } from 'vuex';
import { getProducts, getProductsAndMeta } from '@/api/products';

const modules = {};

export default createStore({
  state: {
    popover: {
      show: false,
      message: [],
    },
    filter: {
      type: [],
      period: [],
      sphere: {},
      radius: {},
    },
    cart: Array<any>(),
  },
  getters: {
    popover: (state) => state.popover,
    filter: (state) => state.filter,
    cart: (state) => state.cart,
  },
  mutations: {
    SET_POPOVER: (state, payload) => (state.popover = payload),
    SET_FILTER: (state, payload) => (state.filter = payload),
    SET_CART: (state, payload: any) => state.cart.push(payload),
  },
  actions: {
    getProducts() {
      return new Promise((resolve, reject) => {
        getProducts()
          .then((data) => {
            console.log(data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    getProductsAndMeta() {
      return new Promise((resolve, reject) => {
        getProductsAndMeta()
          .then((data) => {
            console.log(data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
  },
  modules,
});

import { createStore } from 'vuex';
import { getProducts, getProduct, getMeta } from '@/api/products';

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
    products: [],
    cart: Array<any>(),
  },
  getters: {
    popover: (state) => state.popover,
    filter: (state) => state.filter,
    products: (state) => state.products,
    cart: (state) => state.cart,
  },
  mutations: {
    SET_POPOVER: (state, payload) => (state.popover = payload),
    SET_FILTER: (state, payload) => (state.filter = payload),
    SET_PRODUCTS: (state, payload) => (state.products = payload),
    SET_CART: (state, payload: any) => state.cart.push(payload),
  },
  actions: {
    async getProducts(context: any, params?: object) {
      return new Promise((resolve, reject) => {
        getProducts(params)
          .then((data) => {
            context.commit('SET_PRODUCTS', data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },

    async getProduct(context: any, id: number, params?: object) {
      // const product = await getProduct(id, params);
      // console.log('one product without params', product);
      const product = await getProduct(id, { populate: '*' });
      // console.log('one product with params', productAll);

      return product;
    },

    async getMeta(context: any, params?: object) {
      return await getMeta(params);
    },
  },
  modules,
});

import { createStore } from 'vuex';
import { getProducts, getProduct, getMeta } from '@/api/products';

const modules = {};

export default createStore({
  state: {
    popover: {
      show: false,
      message: []
    },
    filter: {
      type: [],
      period: [],
      sphere: {},
      radius: {}
    },
    cart: Array<any>()
  },
  getters: {
    popover: (state) => state.popover,
    filter: (state) => state.filter,
    cart: (state) => state.cart
  },
  mutations: {
    SET_POPOVER: (state, payload) => (state.popover = payload),
    SET_FILTER: (state, payload) => (state.filter = payload),
    SET_CART: (state, payload: any) => state.cart.push(payload)
  },
  actions: {
    async getProducts() {
      const products = await getProducts();
      console.log('without params', products);
      return products;
      /*return new Promise((resolve, reject) => {
        getProducts()
          .then((data) => {
            console.log(data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });*/
    },
    async getProductsAndMeta() {
      const products = await getProducts({ populate: '*' });
      console.log('with params', products);
      return products;

      /*return new Promise((resolve, reject) => {
        getProducts({ populate: '*' })
          .then((data) => {
            console.log(data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });*/
    },
    async getProduct(context: any, id: number, params?: object) {

      const product = await getProduct(id);
      console.log('one product without params', product);
      const productAll = await getProduct(id, { populate: '*' });
      console.log('one product with params', productAll);

      return productAll;
    },

    async getMeta(context:any, params?:object) {
      return await getMeta(params);
    }
  },
  modules
});

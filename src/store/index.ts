import { createStore } from 'vuex';
import { getProducts, getProduct, getCharacteristics } from '@/api/products';

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
    characteristics: {
      type: [],
      period: [],
      sphere: [],
      radius: [],
    },
    cart: Array<any>(),
  },
  getters: {
    popover: (state) => state.popover,
    filter: (state) => state.filter,
    products: (state) => state.products,
    cart: (state) => state.cart,
    type: (state) => state.characteristics.type,
    period: (state) => state.characteristics.period,
    sphere: (state) => state.characteristics.sphere,
    radius: (state) => state.characteristics.radius,
  },
  mutations: {
    SET_POPOVER: (state, payload) => (state.popover = payload),
    SET_FILTER: (state, payload) => (state.filter = payload),
    SET_PRODUCTS: (state, payload) => (state.products = payload),
    SET_CART: (state, payload: any) => state.cart.push(payload),
    SET_TYPE: (state, payload) => (state.characteristics.type = payload),
    SET_PERIOD: (state, payload) => (state.characteristics.period = payload),
    SET_SPHERE: (state, payload) => (state.characteristics.sphere = payload),
    SET_RADIUS: (state, payload) => (state.characteristics.radius = payload),
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

    async getTypes(context: any, params?: object) {
      return new Promise((resolve, reject) => {
        getCharacteristics('types')
          .then((data) => {
            context.commit('SET_TYPE', data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    async getPeriod(context: any, params?: object) {
      return new Promise((resolve, reject) => {
        getCharacteristics('periods')
          .then((data) => {
            context.commit('SET_PERIOD', data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    async getRadius(context: any, params?: object) {
      return new Promise((resolve, reject) => {
        getCharacteristics('radii')
          .then((data) => {
            context.commit('SET_RADIUS', data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    async getSphere(context: any, params?: object) {
      return new Promise((resolve, reject) => {
        getCharacteristics('spheres')
          .then((data) => {
            context.commit('SET_SPHERE', data);
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

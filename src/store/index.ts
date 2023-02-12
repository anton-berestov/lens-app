import { createStore } from 'vuex';
import {
  getProducts,
  getProduct,
  getCharacteristics,
  filterProducts,
} from '@/api/products';
import { checkSms, sendPhone, updateUser } from '@/api/user';
import { OrderProductDetails, Product } from '@/interfaces/ProductInterface';
import { saveAddress, getAddress } from '@/api/address';

const modules = {};

export default createStore({
  state: {
    popover: {
      show: false,
      message: [],
    },
    error: null,
    filter: {
      type: [],
      period: [],
      sphere: {},
      radius: {},
    },
    products: Array<Product>(),
    characteristics: {
      type: [],
      period: [],
      sphere: [],
      radius: [],
    },
    user: {},
    token: '',
    basket: {
      order_product_details: Array<OrderProductDetails>(),
      count: 0,
      total_amount: 0,
      total_discount: 0,
      user: 0,
    },
    order: '',
  },
  getters: {
    popover: (state) => state.popover,
    error: (state) => state.error,
    filter: (state) => state.filter,
    products: (state) => state.products,
    order_product_details: (state) => state.basket.order_product_details,
    basket_count: (state) => state.basket.count,
    total_amount: (state) => state.basket.total_amount,
    total_discount: (state) => state.basket.total_discount,
    basket_user: (state) => state.basket.user,
    type: (state) => state.characteristics.type,
    period: (state) => state.characteristics.period,
    sphere: (state) => state.characteristics.sphere,
    radius: (state) => state.characteristics.radius,
    user: (state) => state.user,
    token: (state) => state.token,
    basket: (state) => state.basket,
    order: (state) => state.order,
  },
  mutations: {
    SET_POPOVER: (state, payload) => (state.popover = payload),
    SET_ERROR: (state, payload) => (state.error = payload),
    SET_FILTER: (state, payload) => (state.filter = payload),
    SET_PRODUCTS: (state, payload) => (state.products = payload),
    SET_ORDER_PRODUCT_DETAILS: (state, payload: OrderProductDetails) =>
      state.basket.order_product_details.push(payload),
    SET_ORDER_PRODUCT_DETAILS_FULL: (state, payload) =>
      (state.basket.order_product_details = payload),
    SET_BASKET_COUNT: (state) =>
      (state.basket.count = state.basket.order_product_details
        .map((el) => el.product_count)
        .reduce((a, b) => Number(a) + Number(b), 0)),
    SET_TOTAL_AMOUNT: (state) =>
      (state.basket.total_amount = state.basket.order_product_details
        .map((el) => el.product_amount)
        .reduce((a, b) => Number(a) + Number(b), 0)),
    SET_TOTAL_DISCOUNT: (state) =>
      (state.basket.total_discount = state.basket.order_product_details
        .map((el) => el.product_discount)
        .reduce((a, b) => Number(a) + Number(b), 0)),
    SET_BASKET_USER: (state, payload) => (state.basket.user = payload),
    SET_TYPE: (state, payload) => (state.characteristics.type = payload),
    SET_PERIOD: (state, payload) => (state.characteristics.period = payload),
    SET_SPHERE: (state, payload) => (state.characteristics.sphere = payload),
    SET_RADIUS: (state, payload) => (state.characteristics.radius = payload),
    SET_USER: (state, payload) => (state.user = payload),
    SET_TOKEN: (state, payload) => (state.token = payload),
    SET_BASKET: (state, payload) => (state.basket = payload),
    SET_ORDER: (state, payload) => (state.order = payload),
  },
  actions: {
    setError(context, error) {
      context.commit('SET_ERROR', error);
    },
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
      console.log(params);
      const product = await getProduct(id, { populate: '*' });
      return product;
    },

    async getTypes(context: any) {
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
    async getPeriod(context: any) {
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
    async getRadius(context: any) {
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
    async getSphere(context: any) {
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

    async filterProducts(context: any) {
      return new Promise((resolve, reject) => {
        filterProducts(context.getters.filter)
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
    async sendPhone(context: any, params?: any) {
      return new Promise((resolve, reject) => {
        sendPhone(params)
          .then((data) => {
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    async checkSmsCode(context: any, params?: any) {
      return new Promise((resolve, reject) => {
        checkSms(params)
          .then((data) => {
            context.commit('SET_USER', data);
            context.commit('SET_TOKEN', localStorage.getItem('jwt'));
            localStorage.removeItem('phone');
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    async updateUser(context: any, params?: any) {
      return new Promise((resolve, reject) => {
        updateUser(params)
          .then((data) => {
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    async saveAddress(context: any, params?: any) {
      saveAddress(params)
        .then((data: any) => data)
        .catch((e: any) => {
          console.error(e);
        });
    },
    async getAddress(context: any, params?: any) {
      return getAddress(params)
        .then(({ data }: any) => data)
        .catch((e: any) => {
          console.error(e);
        });
    },
  },
  modules,
});

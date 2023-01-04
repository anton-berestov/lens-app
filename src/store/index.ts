import { createStore } from 'vuex';
const modules = {};

export default createStore({
  state: {
    popover: false,
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
  actions: {},
  modules,
});

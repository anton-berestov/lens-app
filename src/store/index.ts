import { createStore } from 'vuex';

const modules = {};

export default createStore({
  state: {
    popover: false,
    filter: {},
  },
  getters: {
    popover: (state) => state.popover,
    filter: (state) => state.filter,
  },
  mutations: {
    SET_POPOVER: (state, payload) => (state.popover = payload),
    SET_FILTER: (state, payload) => (state.filter = payload),
  },
  actions: {},
  modules,
});

import { createStore } from 'vuex';

const modules = {};

export default createStore({
  state: {
    popover: false,
  },
  getters: {
    popover: (state) => state.popover,
  },
  mutations: {
    SET_POPOVER: (state, payload) => (state.popover = payload),
  },
  actions: {},
  modules,
});

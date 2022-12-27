import { createStore } from 'vuex';

const modules = {};

export default createStore({
  state: {
    popover: false,
    filter: {
      period: [],
      type: [],
    },
  },
  getters: {
    popover: (state) => state.popover,
    period: (state) => state.filter.period,
    type: (state) => state.filter.type,
  },
  mutations: {
    SET_TYPE: (state, payload) => (state.filter.type = payload),
    SET_FILTER: (state, payload) =>
      payload.type === 'period'
        ? (state.filter.period = payload.value)
        : payload.type === 'type'
        ? (state.filter.type = payload.value)
        : [],
  },
  actions: {},
  modules,
});

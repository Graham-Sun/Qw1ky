import { MENU1 } from "../mutation-types";

// initial state
const state = {
  price: 0,
};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  [MENU1.SET_PRICE](state, products) {
    state.price = products.count * products.price;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

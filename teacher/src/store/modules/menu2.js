import { MENU1, MENU2 } from "../mutation-types";

// initial state
const state = {
  count: 0,
};

// getters
const getters = {};

// actions
const actions = {
  addCount({ state, commit }, products) {
    commit(MENU2.ADD_COUNT, 1);
    this.commit(`menu1/${MENU1.SET_PRICE}`, { count: state.count, price: 20 });
  },
  reduceCount({ state, commit }, products) {
    if (state.count > 0) {
      commit(MENU2.REDUCE_COUNT, 1);
      this.commit(`menu1/${MENU1.SET_PRICE}`, {
        count: state.count,
        price: 20,
      });
    }
  },
};

// mutations
const mutations = {
  [MENU2.REDUCE_COUNT](state, products) {
    state.count -= products;
  },
  [MENU2.ADD_COUNT](state, products) {
    state.count += products;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

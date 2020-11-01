import { ANALYSIS } from "../mutation-types";

// initial state
const state = {
  type: {
    "1": "单词成绩分析",
    "2": "总分基本分析",
  },
  class: {
    "1": "小学一年级",
    "2": "小学二年级",
    "3": "小学三年级",
    "4": "小学四年级",
    "5": "小学五年级",
    "6": "小学六年级",
    "7": "初中一年级",
    "8": "初中二年级",
    "9": "初中三年级",
    "10": "高中一年级",
    "11": "高中二年级",
    "12": "高中三年级",
  },
  year: ["2020", "2019", "2018", "2017", "2016", "2015"],
  analysis: JSON.parse(sessionStorage.getItem("analysis")),
};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  [ANALYSIS.SET_ANALYSIS](state, obj) {
    state.analysis = obj;
    sessionStorage.setItem("analysis", JSON.stringify(obj));
  },
  [ANALYSIS.NEXT](state, obj) {
    state.analysis.step += obj;
    sessionStorage.setItem("analysis", JSON.stringify(state.analysis));
  },
  [ANALYSIS.BACK](state, obj) {
    state.analysis.step += obj;
    sessionStorage.setItem("analysis", JSON.stringify(state.analysis));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

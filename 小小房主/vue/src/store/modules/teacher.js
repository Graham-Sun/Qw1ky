const state = {
  stage: {
    "1": "小学阶段",
    "2": "初中阶段",
    "3": "高中阶段",
  },
  subject: {
    "1": "语文",
    "2": "数学",
    "3": "英语",
    "4": "道法",
    "5": "思美",
    "6": "体育",
  },
  sex: {
    1: "女",
    0: "男",
  },
  class:{
    "1":"一年级",
    "2":"二年级",
    "3":"三年级",
    "4":"四年级",
    "5":"五年级",
    "6":"六年级",
    "7":"七年级",
    "8":"八年级",
    "9":"九年级",
  },
  type: {
    "1": "总分基本分析",
    "2": "学业质量分析",
    "3": "成绩高级分析"
  },

};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
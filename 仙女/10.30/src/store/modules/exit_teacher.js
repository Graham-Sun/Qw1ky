// import {
//     TEACHERINFO
// } from "./modules_action";
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
    status: {
        0: "禁用",
        1: "正常",
    },
    condition:{
        1:"参数设置",
        2:"分析完成"
    },
    class: {
        "1": "七年级",
        "2": "八年级",
        "3": "九年级",
    },
    
    type:{
        "1":"总分基本分析",
        "2":"单次基本分析",
    }
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
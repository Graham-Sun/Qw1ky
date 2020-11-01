// import {
//     ASINGLE
// } from "./modules_action";
const state = {
    status: {
        1: "参数设置",
        2: "分析完成"
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
    type: {
        "1": "总分基本分析",
        "2": "单次基本分析",
    },
    year: ["2015", "2016", "2017", "2018", "2019", "2020"],
    date: JSON.parse(sessionStorage.getItem("row")) || {
        id: "",
        step: 0
    },
};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
    // [ASINGLE.NEXT](state, obj) {
    //     state.date.step += obj;
    //     sessionStorage.setItem("analysis", JSON.stringify(state.date));
    // },
    // [ASINGLE.BACK](state, obj) {
    //     state.date.step += obj;
    //     sessionStorage.setItem("analysis", JSON.stringify(state.date));
    // },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
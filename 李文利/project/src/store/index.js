import Vue from 'vue'
import Vuex from 'vuex'
import {
    getSearch
} from "@/api/api"
import EXITTEACHER from "./modules/exit_teacher"
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        price: 10,
        sumPrice: 0,
        list: [],
    },
    //只接受同步的操作（ 必须是同步函数）
    //this.$store.commit("xxx") xxx=>mutations中的方法
    mutations: {
        addCount(state) {
            state.count += 1
            this.commit("sum")
        },
        subCount(state) {
            state.count -= 1
            this.commit("sum")
        },
        sum(state) {
            state.sumPrice = state.count * state.price
        },
        setList(state, data) {
            state.list = data
        }
    },
    //异步操作，只执行动作的调用，不会涉及数据的修改
    //this.$store.dispatch("xxx") xxx=>为actions中的方法
    actions: {
        /*
        context是什么?
        • Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象。
        • 也就是说，你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters
        注意： context和store并不是同一个对象,
        */
        //context是一个对象
        addCount(context) {
            console.log(context)
            context.commit("addCount")
        },
        subCount(context) {
            context.commit("subCount")
        },
        getSearch(context) {
            getSearch().then((res) => {
                context.commit("setList", res.data.list)
            })
        },

    },
    modules: {
        EXITTEACHER
    }
})
import Vue from "vue"
import Vuex from 'vuex'
import {getToken} from "@/common/auth";


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: getToken("token"),
    },
    getters: {
        token: state => state.token
    },
    mutations: {
        // 设置token值
        setToken: (state, token) => {
            state.token = token
        },
        delToken: (state) => {
          state.token = ''
        },
        refreshToken: (state, token) => {
            state.token = token
        }
    },
    actions: {
        setToken2State({commit}, token) {
            return new Promise((resolve) => {
                commit('setToken', token)
                resolve()
            })
        },
        removeToken2State({commit}) {
            return new Promise((resolve) => {
                commit('delToken')
                resolve()
            })
        }
    }
})

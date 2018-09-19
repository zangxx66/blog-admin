import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    reqUrl: 'http://127.0.0.1:666/api/',
    userInfo: ''
  },
  mutations: {
    setUserInfo(state, param) {
      state.userInfo = JSON.stringify(param)
      window.localStorage.setItem('satania.admin', state.userInfo)
    },
    delUserInfo(state) {
      state.userInfo = ''
      window.localStorage.removeItem('satania.admin')
    }
  },
  getters: {
    getReqUrl: state => () => {
      return state.reqUrl
    },
    getUserInfo:state => () => {
        return state.userInfo
    }
  },
  actions: {}
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let httpUrl = 'https://api.satania.app/api/'
if (Object.is(process.env.NODE_ENV, 'production')) {
  httpUrl = 'https://api.satania.app/api/'
} else {
  httpUrl = 'http://127.0.0.1:666/api/'
}

console.log(process.env.NODE_ENV)

const store = new Vuex.Store({
  state: {
    reqUrl: httpUrl,
    userInfo: '',
    session:''
  },
  mutations: {
    setUserInfo(state, param) {
      state.userInfo = JSON.stringify(param)
      var minutes = 60
      var exp = new Date()
      exp.setTime(exp.getTime() + minutes * 60 * 1000)
      document.cookie =
        'satania.admin' +
        '=' +
        escape(state.userInfo) +
        ';expires=' +
        exp.toGMTString() +
        ';path=/'
    },
    delUserInfo(state) {
      var exp = new Date()
      exp.setTime(exp.getTime() - 1)
      var reg = new RegExp('(^| )' + 'satania.admin' + '=([^;]*)(;|$)')
      var arr = null
      if ((arr = document.cookie.match(reg))) {
        document.cookie =
          'satania.admin' +
          '=' +
          state.userInfo +
          ';expires=' +
          exp.toGMTString()
      }
      state.userInfo = ''
    },
    setSession(state,param){
      state.session = param
      var minutes = 60
      var exp = new Date()
      exp.setTime(exp.getTime() + minutes * 60 * 1000)
      document.cookie =
        'satania.session' +
        '=' +
        escape(state.session) +
        ';expires=' +
        exp.toGMTString() +
        ';path=/'
    },
    delSession(state){
      var exp = new Date()
      exp.setTime(exp.getTime() - 1)
      var reg = new RegExp('(^| )' + 'satania.session' + '=([^;]*)(;|$)')
      var arr = null
      if ((arr = document.cookie.match(reg))) {
        document.cookie =
          'satania.session' +
          '=' +
          state.userInfo +
          ';expires=' +
          exp.toGMTString()
      }
      state.session = ''
    }
  },
  getters: {
    getReqUrl: state => () => {
      return state.reqUrl
    },
    getUserInfo: state => () => {
      if (Object.is(state.userInfo, '')) {
        var arr,
          reg = new RegExp('(^| )' + 'satania.admin' + '=([^;]*)(;|$)')
        if ((arr = document.cookie.match(reg))) {
          return unescape(arr[2])
        } else {
          return null
        }
      } else {
        return state.userInfo
      }
    },
    getSession:state => () => {
      if (Object.is(state.session, '')) {
        var arr,
          reg = new RegExp('(^| )' + 'satania.session' + '=([^;]*)(;|$)')
        if ((arr = document.cookie.match(reg))) {
          return unescape(arr[2])
        } else {
          return null
        }
      } else {
        return state.session
      }
    }
  },
  actions: {}
})

export default store

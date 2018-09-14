// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'

import 'muse-ui/dist/muse-ui.css'
import 'typeface-roboto'
import 'material-icons/iconfont/material-icons.css'
import 'material-icons/css/material-icons.css'
import 'muse-ui-loading/dist/muse-ui-loading.css'

Vue.config.productionTip = false
Vue.use(MuseUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

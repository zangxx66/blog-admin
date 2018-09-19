import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('../view/Home')
const Login = () => import('../view/Login')

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/Login.html',
      name:'Login',
      component:Login
    },
    {
      path:'*',
      name:'404',
      redirect:{name:'Home'}
    }
  ]
})

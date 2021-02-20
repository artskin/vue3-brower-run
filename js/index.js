//import {createApp} from './lib/esm/vue@3.0.5.esm-browser.js'
const {createApp } = Vue;
// import {VueRouter} from './lib/esm/vue-router@4.0.4.esm-browser.js'
// console.log(VueRouter)

import router from './router.js'
import $ajax from './myajax.js'
import $http from './request.js'


const myMixin = {
  created() {
    //this.$http()
  },
  methods: {
    $http,
    $ajax,
    loginOut: () =>{
      window.localStorage.removeItem('token')
      router.push('/login')
    }
  }
}
const App = {
  mixins: [myMixin],
  data() {
    return {
      sysInfo:{
        title:'JWT 登录系统',
        description:'基于Node + Express + MongoDB + Vue3 开发',
      }
    }
  }
}
const app = Vue.createApp(App);
app.use(router)
window.vm = app.mount('#app')

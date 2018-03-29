import Vue from 'vue'
import App from './app.vue'
import './assets/styles/global.styl'
import createRouter from './config/router'
import VueRouter from 'vue-router'
import createStore from './store/store'
import Vuex from 'vuex'

Vue.use(VueRouter)
Vue.use(Vuex)
// const root = document.createElement('div')
// document.body.appendChild(root)

const router = createRouter()
const store = createStore()

router.beforeEach((to, from, next) => {
  console.log('beforeEach Invoked')
  next()
})
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve Invoked')
  next()
})
router.afterEach((to, from) => {
  console.log('afterEach Invoked')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')

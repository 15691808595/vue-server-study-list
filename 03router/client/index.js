import Vue from 'vue'
import App from './app.vue'
import './assets/styles/global.styl'
import createRouter from './config/router'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const root = document.createElement('div')
// document.body.appendChild(root)

const router = createRouter()

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
  render: (h) => h(App)
}).$mount('#root')

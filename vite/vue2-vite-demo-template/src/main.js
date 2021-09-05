import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@style/global.scss'

Vue.config.productionTip = false

console.log('VUE_APP_BASE_API:', process.env.VUE_APP_BASE_API)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

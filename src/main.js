import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import './lib/js/opus.min.js'
import './lib/css/opus.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

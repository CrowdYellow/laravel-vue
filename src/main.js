import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './directives'
import './components'
import VueSweetalert2 from './plugins/vue-sweetalert2'

Vue.config.productionTip = false
Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

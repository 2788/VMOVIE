// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import './assets/css/iconfont.css'
import vueResource from 'vue-resource'
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(vueResource)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

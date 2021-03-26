import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.axios = axios;

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);



import Scroll from '@/components/Scroll'
Vue.component('Scroll' , Scroll);

import Loading from '@/components/Loading'
Vue.component('Loading' , Loading);

Vue.filter('setWH',(url,arg) => {
  return url.replace(/w\.h/,arg);
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

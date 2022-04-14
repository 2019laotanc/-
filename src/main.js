import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/assets/css/glob.css'
import 'element-ui/lib/theme-chalk/index.css'

import test from './api/test'
import { IconPark } from './myPlugin/myall'
import cookie from 'vue-cookie'
import  * as baseFuns from './utils/baseFun'
import *  as baseFilter from './common/baseFilter'



Vue.use(ElementUI)
Vue.use(baseFuns)
// 全局过滤
Object.keys(baseFilter).forEach(key => {
  Vue.filter(key, baseFilter[key])
})

Vue.prototype.$cookie = cookie;

Vue.prototype.$test = test

//注册全局组件
Vue.component('IconPark', IconPark);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

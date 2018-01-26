// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import VueResource from 'vue-resource'
import VueResourceMock from 'vue-resource-mock'
import MockData from './mock'
import 'jquery'
import VueI18n from 'vue-i18n'
import Ch from './assets/translate/Chinese.js'
import En from './assets/translate/English.js'
import store from './vuex/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'Chinese', // 语言标识
  messages: {
    Chinese: Ch,
    English: En
  }
})

if (process.env.NODE_ENV === 'development') {
  Vue.use(VueResourceMock, MockData)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store: store,
  template: '<App/>',
  components: { App }
})

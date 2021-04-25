import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// const zgEngine = window.require('zego-express-engine-electron/ZegoExpressEngine');
// const zgDefines = window.require('zego-express-engine-electron/ZegoExpressDefines');
// import { ZegoExpressEngine } from 'zego-express-engine-webrtc'
// import './render.js'
import Axios from 'axios'
Vue.prototype.$axios = Axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

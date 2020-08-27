import Vue from 'vue'
import App from './App'
import store from './store'
import {myRequest} from './network/api.js'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$http = myRequest
Vue.prototype.$store = store;

const app = new Vue({
	...App
})
app.$mount()

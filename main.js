import Vue from 'vue'
import App from './App'
import { myRequest } from "./api.js";
import store from "store/index.js";

Vue.config.productionTip = false
Vue.prototype.$MyRequest = myRequest;

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()

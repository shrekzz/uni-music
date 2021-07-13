import Vue from 'vue'
import App from './App'
import { myRequest } from "./api.js";
import store from "store/index.js";

Vue.config.productionTip = false
Vue.prototype.$MyRequest = myRequest;
// 初始化音频组件
Vue.prototype.$innerAudioContext = uni.createInnerAudioContext();

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()

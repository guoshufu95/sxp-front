import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store";
import sxpRoutes from "./router";
import  "./common/permission.js"
import initSocket from "@/common/socket";


Vue.prototype.$websocket = initSocket

Vue.prototype.msgSuccess = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'success' })
}

Vue.prototype.msgError = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'error' })
}

Vue.prototype.msgInfo = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'warning' })
}

Vue.config.productionTip = false
Vue.use(ElementUI)


new Vue({
  el: '#app',
  store,
  router:sxpRoutes,
  render: h => h(App),
})

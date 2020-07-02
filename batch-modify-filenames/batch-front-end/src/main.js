import Vue from "vue";
import App from "./App.vue";
import { Message, Modal } from "ant-design-vue";
Vue.config.productionTip = false;

// Failed to resolve directive: ant-portal
// https://github.com/vueComponent/ant-design-vue/issues/2261
Vue.use(Modal);
Vue.prototype.$message = Message;
new Vue({
  render: (h) => h(App),
}).$mount("#app");

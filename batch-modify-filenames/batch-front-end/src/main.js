import Vue from "vue";
import App from "./App.vue";
import { Message, Modal } from "ant-design-vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

// Failed to resolve directive: ant-portal
// https://github.com/vueComponent/ant-design-vue/issues/2261
Vue.use(Modal);
Vue.prototype.$message = Message;
new Vue({
  render: (h) => h(App),
}).$mount("#app");

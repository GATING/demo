import { createApp } from "vue";
import App from "./App.vue";

// 完整引入
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";

// 按需加载Antd
import initAntd from "./plugins/Antd";

const app = createApp(App);
// 完整引入
// app.use(Antd);
initAntd(app);

app.mount("#app");

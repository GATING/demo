<template>
  <!-- 国际化 -->
  <config-provider id="app" :locale="zh_CN">
    <ModifyFilename />
  </config-provider>
</template>

<script>
import { ConfigProvider } from "ant-design-vue";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import ModifyFilename from "@/components/ModifyFilename/";
export default {
  name: "App",
  components: {
    ModifyFilename,
    ConfigProvider
  },
  data() {
    return {
      zh_CN
    };
  }
};
</script>

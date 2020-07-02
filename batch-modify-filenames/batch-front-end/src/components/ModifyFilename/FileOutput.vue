<template>
  <a-row align="middle" type="flex" :gutter="16">
    <a-col :span="9">
      <a-input
        placeholder="*为所有拓展名,比较暴力"
        v-model="ext[0]"
        allowClear
      />
    </a-col>
    <a-col :span="3" class="icon-wrap">
      <a-icon type="double-right" />
    </a-col>
    <a-col :span="9">
      <a-input
        placeholder="请输入修改后的拓展名..."
        v-model="ext[1]"
        allowClear
      />
    </a-col>
    <a-col :span="3" class="switch-wrap">
      <a-switch
        checkedChildren="启用"
        unCheckedChildren="关闭"
        :value="enable"
        @change="changeEnableExt"
      />
    </a-col>
  </a-row>
</template>

<script>
import {
  Row as ARow,
  Col as ACol,
  Icon as AIcon,
  Input as AInput,
  Switch as ASwitch
} from "ant-design-vue";
export default {
  name: "FileOutput",
  props: {
    enable: {
      type: Boolean,
      default: true
    },
    ext: {
      type: Array,
      required: true
    }
  },
  components: {
    ARow,
    ACol,
    AIcon,
    AInput,
    ASwitch
  },
  methods: {
    changeEnableExt(checked) {
      this.$emit("update", "enable", checked);
    }
  }
};
</script>

<style lang="less" scoped>
.icon-wrap {
  font-size: 20px;
  text-align: center;
}
.switch-wrap {
  text-align: right;
}
</style>
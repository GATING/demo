<template>
  <div class="content">
    <div v-for="item in components" :key="item.name">
      <divider orientation="left">{{ item.label }}</divider>
      <component
        :is="item.name"
        v-bind="{ ...getProps(item.props) }"
        @update="
          (key, val) => {
            update(item.props, key, val);
          }
        "
      />
    </div>
  </div>
</template>

<script>
import getNewFileList from "@/utils/";
import { Divider } from "ant-design-vue";
import FileList from "./FileList";
import FileOutput from "./FileOutput";
import FileSetting from "./FileSetting";
export default {
  name: "ModifyFilename",
  components: {
    Divider,
    FileList,
    FileOutput,
    FileSetting
  },
  provide() {
    return {
      parent: this
    };
  },
  data() {
    return {
      components: [
        {
          label: "文件名设置",
          name: "FileSetting",
          props: "fileSettingsProps"
        },
        {
          label: "输出设置",
          name: "FileOutput",
          props: "fileOutputProps"
        },
        {
          label: "输出结果",
          name: "FileList",
          props: "fileListProps"
        }
      ],
      fileSettingsProps: {
        fileSettings: {
          filename: {
            value: "",
            span: 6,
            type: "file",
            placeholder: "请输入新的文件名"
          },
          serialNum: {
            value: "",
            span: 6,
            type: "sort-descending",
            placeholder: "起始序号(默认支持纯数字或纯字母)"
          },
          increment: {
            value: 1,
            span: 2,
            placeholder: "增量",
            isNum: true
          },
          preReplaceWord: {
            value: "",
            span: 3,
            type: "file",
            placeholder: "替换前的字符"
          },
          replaceWord: {
            value: "",
            span: 3,
            type: "file",
            placeholder: "替换后的字符"
          }
        },
        diyForm: {
          diySerial: "",
          separator: "",
          diyEnable: false
        }
      },
      fileOutputProps: {
        enable: false,
        ext: ["", ""]
      },
      oldFiles: []
    };
  },
  computed: {
    newFiles() {
      const { fileSettings, diyForm } = this.fileSettingsProps;
      const { ext, enable } = this.fileOutputProps;
      const { diySerial, separator, diyEnable } = diyForm;
      console.log(this.getRange(diySerial, separator, diyEnable));
      return getNewFileList(
        this.oldFiles,
        fileSettings,
        ext,
        enable,
        this.getRange(diySerial, separator, diyEnable)
      );
    }
  },
  watch: {
    "fileSettingsProps.diyForm.diySerial"(val) {
      if (!val) {
        this.fileSettingsProps.diyForm.diyEnable = !1;
      }
    }
  },
  methods: {
    getRange(diySerial, separator, enable) {
      if (!enable) return null;
      !separator ? (separator = ",") : null;
      return diySerial.split(separator);
    },
    getProps(key) {
      if (key === "fileListProps") {
        return {
          oldFiles: this.oldFiles,
          newFiles: this.newFiles
        };
      }
      return this[key] || {};
    },
    update(props, key, val) {
      if (props === "fileListProps") {
        return (this[key] = val);
      }
      this[props][key] = val;
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  width: 1366px;
  box-sizing: border-box;
  padding: 0 15px;
  margin: 0 auto;
  overflow-x: hidden;
}
</style>
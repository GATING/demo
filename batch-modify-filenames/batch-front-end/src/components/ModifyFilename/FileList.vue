<template>
  <a-row :gutter="16">
    <a-col :span="12" :key="key" v-for="(val, key) in listKeys">
      <FileListItem
        bordered
        :fileList="(() => getFileList(key))()"
        :filename="val"
      />
    </a-col>
  </a-row>
</template>

<script>
import { Row, Col } from "ant-design-vue";
import FileListItem from "./FileListItem";

export default {
  name: "FileList",
  props: {
    oldFiles: {
      type: Array,
      required: true
    },
    newFiles: {
      type: Array,
      required: true
    }
  },
  components: {
    "a-row": Row,
    "a-col": Col,
    FileListItem
  },
  data() {
    return {
      listKeys: {
        oldFiles: "原文件列表",
        newFiles: "新文件列表"
      },
      pagination: {
        pageSize: 10,
        showQuickJumper: true,
        hideOnSinglePage: true
      }
    };
  },
  methods: {
    getFileList(key) {
      return this[key] || [];
    }
  }
};
</script>


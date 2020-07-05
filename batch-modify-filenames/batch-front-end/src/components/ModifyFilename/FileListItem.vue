<template>
  <a-list bordered :dataSource="fileList" :pagination="pagination" ref="list">
    <div slot="header" class="list-header">
      <strong>
        {{ filename }}
      </strong>
      <a-button type="danger" size="small" @click="clearFiles">
        清空
      </a-button>
    </div>
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-list-item-meta>
        <a-tooltip slot="title" :overlayStyle="{ maxWidth: '500px' }">
          <template slot="title">
            {{ item.name }}
          </template>
          {{ item.name }}
        </a-tooltip>
      </a-list-item-meta>
      <a-button
        ghost
        type="danger"
        size="small"
        @click="
          () => {
            delCurrent(index);
          }
        "
      >
        删除
      </a-button>
    </a-list-item>
  </a-list>
</template>

<script>
import { List, Button, Tooltip } from "ant-design-vue";
const { Item } = List;
export default {
  name: "FileListItem",
  props: {
    fileList: {
      type: Array,
      required: true
    },
    filename: {
      type: String,
      required: true
    },
    pagination: {
      type: Object,
      default: () => ({
        pageSize: 10,
        showQuickJumper: true,
        hideOnSinglePage: true
      })
    }
  },
  inject: ["parent"],
  components: {
    "a-list": List,
    "a-list-item": Item,
    "a-list-item-meta": Item.Meta,
    "a-button": Button,
    "a-tooltip": Tooltip
  },
  methods: {
    delCurrent(current) {
      this.parent.oldFiles.splice(current, 1);
    },
    clearFiles() {
      this.parent.update("fileListProps", "oldFiles", []);
    },
    drop(e) {
      e.preventDefault();
      this.parent.update("fileListProps", "oldFiles", [
        ...this.parent.oldFiles,
        ...e.dataTransfer.files
      ]);
    }
  },
  mounted() {
    let $el = this.$refs.list.$el;
    this.$el = $el;
    if ($el) {
      $el.ondragenter = $el.ondragover = $el.ondragleave = () => false;
      $el.addEventListener("drop", this.drop, false);
    }
  },
  destroyed() {
    this.$el && this.$el.removeEventListener("drop", this.drop, false);
  }
};
</script>


<style lang="less" scoped>
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
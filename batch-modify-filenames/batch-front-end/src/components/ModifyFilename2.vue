<template>
  <div class="content">
    <a-divider orientation="left">文件名设置</a-divider>
    <a-row type="flex" :gutter="16">
      <a-col
        :key="key"
        :span="setting.span"
        v-for="(setting, key) in fileSettings"
      >
        <template v-if="setting.isNum">
          <a-input-number
            style="width:100%"
            :placeholder="setting.placeholder"
            :min="1"
            v-model="setting.value"
          />
        </template>
        <template v-else>
          <a-input
            :placeholder="setting.placeholder"
            v-model="setting.value"
            allowClear
          >
            <a-icon
              slot="prefix"
              :type="setting.type"
              style="color:rgba(0,0,0,.25)"
            />
          </a-input>
        </template>
      </a-col>
      <a-col>
        <a-button type="primary" @click="handleModify">
          确定修改
        </a-button>
      </a-col>
    </a-row>

    <a-divider orientation="left">输出设置</a-divider>
    <a-row align="middle" type="flex">
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
        />
      </a-col>
    </a-row>

    <a-divider orientation="left">输出结果</a-divider>
    <a-row :gutter="16">
      <a-col :span="12" :key="list.name" v-for="list in listHeader">
        <a-list
          bordered
          :dataSource="fileList"
          :pagination="pagination"
          class="dragFiles"
        >
          <div slot="header" class="list-header">
            <strong>
              {{ list.name }}
            </strong>
            <div>
              <a-button
                type="danger"
                size="small"
                @click="clearFiles"
                style="margin-right:20px"
              >
                清空
              </a-button>
              <a-checkbox v-model="list.isChecked">
                显示全目录
              </a-checkbox>
            </div>
          </div>

          <a-list-item slot="renderItem" slot-scope="item" class="list-item">
            <a-button
              slot="actions"
              type="danger"
              size="small"
              @click="
                () => {
                  delCurrent(item.path);
                }
              "
            >
              删除
            </a-button>
            <a-list-item-meta>
              <a-tooltip slot="title" :overlayStyle="{ maxWidth: '500px' }">
                <template slot="title">
                  {{ item.path }}
                </template>
                {{ list.isChecked ? item.path : item.name }}
              </a-tooltip>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {
  Divider as ADivider,
  Row as ARow,
  Col as ACol,
  Icon as AIcon,
  Input as AInput,
  Button as AButton,
  InputNumber as AInputNumber,
  Switch as ASwitch,
  Checkbox as ACheckbox,
  Tooltip as ATooltip,
  List,
  Message
} from "ant-design-vue";
const { Item } = List;
const testserialNum = str => !/(^\d+$)|(^[a-zA-Z]+$)/.test(str);
export default {
  name: "ModifyFilename",
  components: {
    AInput,
    AButton,
    AInputNumber,
    ADivider,
    ARow,
    ACol,
    AIcon,
    ASwitch,
    ACheckbox,
    ATooltip,
    "a-list": List,
    "a-list-item": Item,
    "a-list-item-meta": Item.Meta
  },
  computed: {
    newFiles() {
      return "";
    }
  },
  data() {
    return {
      oldFiles: [],
      enable: false,
      ext: ["", ""],
      fileSettings: {
        filename: {
          value: "",
          span: 5,
          type: "file",
          placeholder: "请输入新的文件名"
        },
        serialNum: {
          value: "",
          span: 5,
          type: "sort-descending",
          placeholder: "起始序号(纯数字或纯字母)"
        },
        increment: {
          value: 1,
          span: 2,
          placeholder: "增量",
          isNum: true
        },
        preReplaceWord: {
          value: "",
          span: 4,
          type: "file",
          placeholder: "替换前的字符"
        },
        replaceWord: {
          value: "",
          span: 4,
          type: "file",
          placeholder: "替换后的字符"
        }
      },
      isNeedExt: true,
      listHeader: {
        oldFiles: {
          name: "原文件列表",
          isChecked: false
        },
        newFiles: {
          name: "新文件列表",
          isChecked: false
        }
      },
      pagination: {
        pageSize: 10,
        showQuickJumper: true,
        hideOnSinglePage: true
      }
    };
  },
  methods: {
    async handleModify() {
      const serialNum = this.fileSettings.serialNum.value;
      if (testserialNum(serialNum) && serialNum) {
        return Message.error("请输入正确的序号，格式为纯数字或纯字母");
      }
    },
    getFileList(key) {
      return this[key];
    },
    delCurrent(path) {
      const current = this.fileList.findIndex(i => i.path === path);
      this.fileList.splice(current, 1);
    },
    clearFiles() {
      this.fileList = [];
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.content {
  width: 1200px;
  padding: 0 15px;
  margin: 0 auto;
  overflow-x: hidden;

  .icon-wrap {
    font-size: 20px;
    text-align: center;
  }
  .switch-wrap {
    text-align: right;
  }
  /deep/ .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
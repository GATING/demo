<template>
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
      <a-button @click="serialNumVisable = !0">
        自定义序号
      </a-button>
    </a-col>
    <a-col>
      <a-button type="primary" @click="handleModify">
        确定修改
      </a-button>
    </a-col>

    <a-modal
      title="自定义序号"
      :visible="serialNumVisable"
      @cancel="serialNumVisable = !1"
      @ok="handleDiySerialNum"
    >
      <a-form-model
        ref="diyForm"
        :model="diyForm"
        :rules="rules"
        labelAlign="left"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-form-model-item label="自定义序号" prop="diySerial">
          <a-input
            v-model="diyForm.diySerial"
            placeholder="请输入自定义序号"
            aria-placeholder="请输入自定义序号"
          />
        </a-form-model-item>
        <a-form-model-item label="自定义分隔符" prop="separator">
          <a-input
            v-model="diyForm.separator"
            placeholder="请输入自定义序号分隔符(默认,)"
            aria-placeholder="请输入自定义序号分隔符"
          />
        </a-form-model-item>
        <a-form-model-item label="是否启用自定义">
          <a-switch v-model="diyForm.diyEnable" :disabled="disabled" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-row>
</template>

<script>
import {
  Row as ARow,
  Col as ACol,
  Icon as AIcon,
  Input as AInput,
  Switch as ASwitch,
  Button as AButton,
  InputNumber as AInputNumber,
  FormModel as AFormModel,
} from "ant-design-vue";
import { saveAs } from "file-saver";
// 是否符合默认序号规范
import { isDefaultSerialNum } from "@/utils/regexp";
const AFormModelItem = AFormModel.Item;

export default {
  name: "FileSetting",
  props: {
    fileSettings: {
      type: Object,
      required: true,
    },
    diyForm: {
      type: Object,
      required: true,
    },
  },
  components: {
    ARow,
    ACol,
    AIcon,
    AInput,
    ASwitch,
    AButton,
    AInputNumber,
    AFormModel,
    AFormModelItem,
  },
  inject: ["parent"],
  // 没有自定义序号时不可操作
  computed: {
    disabled() {
      return !this.diyForm.diySerial;
    },
  },
  data() {
    return {
      serialNumVisable: !1,
      rules: {
        diySerial: [
          {
            required: true,
            message: "请输入自定义序号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleModify() {
      // 获取填写的序号
      const serialNum = this.fileSettings.serialNum.value;
      // 当没有启用自定义时，走默认规则
      if (isDefaultSerialNum(serialNum) && !this.diyForm.enable) {
        return this.$message.error("请输入正确的序号，格式为纯数字或纯字母");
      }
      const { newFiles, oldFiles } = this.parent;
      const data = new FormData();
      for (let i = 0; i < oldFiles.length; i++) {
        const { name } = newFiles[i];
        data.append("files", oldFiles[i]);
        data.append("name", name);
      }
      this.axios({
        method: "post",
        url: "/upload",
        data,
        responseType: "blob",
      })
        .then((res) => {
          const disposition = res.headers["content-disposition"];
          // 转换为Blob对象
          let file = new Blob([res.data], {
            type: "application/zip",
          });
          // 下载文件
          saveAs(
            file,
            disposition.replace(/^.*filename="?([^"]+)"?.*$/, "$1") ||
              "files.zip"
          );
          this.$message.success("修改成功");
        })
        .catch(() => {
          this.$message.error("发生错误");
        });
    },
    handleDiySerialNum() {
      this.$refs.diyForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        this.serialNumVisable = !1;
      });
    },
  },
};
</script>

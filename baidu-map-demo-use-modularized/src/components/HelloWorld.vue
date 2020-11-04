<template>
  <div>请选择你最喜欢的水果</div>
  <div>
    <button
      v-for="(fruit, idx) in fruits"
      :key="fruit"
      @click="handleSelect(idx)"
    >
      {{ fruit }}
    </button>
  </div>
  <!-- 第一步：还是跟往常一样，在 html 中写入 ref 的名称 -->
  <div ref="selectRef">你最喜欢的是【{{ select }}】</div>
</template>

<script>
import { ref, reactive, toRefs, watch } from "vue";
export default {
  setup() {
    // 获取真实dom
    const selectRef = ref(null);
    const data = reactive({
      fruits: ["芒果", "榴莲", "菠萝"],
      select: "",
      handleSelect(idx) {
        data.select = data.fruits[idx];
      },
    });
    watch(
      () => data.select,
      (val, preVal) => {
        // 得到一个 RefImpl 的对象, 通过 .value 访问到数据
        console.log(selectRef.value);
        console.log(val, preVal);
      }
    );
    return {
      ...toRefs(data),
      selectRef,
    };
  },
};
</script>
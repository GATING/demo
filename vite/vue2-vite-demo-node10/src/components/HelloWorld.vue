<template>
  <div class="hello">
    <h1 class="h1">{{ msg }}</h1>
    <test />
    <test-jsx />
    <text-vue></text-vue>
  </div>
</template>

<script lang="jsx">
import Test from './Test'
import TextVue from './TextVue'
export default {
  name: 'HelloWorld',
  components: {
    Test,
    TextVue,
    TestJsx: {
      render() {
        return <div>我是vue文件的JSX渲染的</div>
      }
    }
  },
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
.h1 {
  font-size: 30px;
  color: skyblue;
}
.hello {
  @include bgCover('@/assets/logo.png');
}
</style>

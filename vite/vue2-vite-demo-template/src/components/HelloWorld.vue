<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <test />
    <test-jsx />
  </div>
</template>

<script>
import Test from './Test'
export default {
  name: 'HelloWorld',
  components: {
    Test,
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

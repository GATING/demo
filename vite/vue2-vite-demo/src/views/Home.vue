<template>
  <div class="home">
    <h1 class="text-primary">123</h1>
    <button @click="handleClick">点击我</button>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@comp/HelloWorld'
const { sum } = require('../utils/index')

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    handleClick() {
      console.log(sum(1, 32))
    }
  }
}
</script>

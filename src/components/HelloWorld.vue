<template>
  <div class="hello">
    <Button type="primary" @click="handleClick('primary')">button</Button>
    <Button type="error" @click="handleClick('error')">button</Button>
    <Button type="success" @click="handleClick('success')">button</Button>
    <Button type="warning" @click="handleClick('warning')">button</Button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    handleClick (type) {
      switch (type) {
        case 'primary':
          window.less.modifyVars({
            '@primary-color': '#00f'
          })
          break
        case 'success':
          window.less.modifyVars({
            '@success-color': '#0f0'
          })
        case 'warning':
          window.less.modifyVars({
            '@warning-color': '#ff0'
          })
        case 'error':
          window.less.modifyVars({
            '@error-color': '#f00'
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

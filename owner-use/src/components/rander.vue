<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button v-on:click="reverseMessage">反转消息</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    reverseMessage() {
      // this.message = this.message.split('').reverse().join('')
      console.log(this.message.split(""));
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>

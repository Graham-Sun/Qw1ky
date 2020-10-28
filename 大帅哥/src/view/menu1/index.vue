<template>
  <div>
    menu1
    {{ price }}
  </div>
</template>

<script>
export default {
  name: "Menu1",
  data() {
    return {
      price: 0,
    };
  },
  methods: {
    testA() {
      this.price += 1;
      console.log("由A组件调用");
    },
  },
  mounted() {

  },
};
</script>

<style></style>

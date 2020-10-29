<template>
  <div>
    menu1
    {{ count }}
  </div>
</template>

<script>
export default {
  name: "Menu1",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    testA(e) {
      this.count += e
    },
  },
  mounted() {
    this.$bus.$on('aaa', this.testA)
  },
};
</script>

<style></style>

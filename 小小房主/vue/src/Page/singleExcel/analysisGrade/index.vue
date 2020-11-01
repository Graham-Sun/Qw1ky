<template>
  <div>
    analysisGrade
  </div>
</template>

<script>
  export default {
    name: "analysisGrade",
    data() {
      return {}
    },
    methods: {
      next() {
        this.asd()
      },
      asd() {
        this.$bus.$emit('next', "true");
      }
    }
  };
</script>

<style></style>
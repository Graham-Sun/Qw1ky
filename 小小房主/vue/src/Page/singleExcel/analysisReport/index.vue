<template>
  <div>
    analysisReport
  </div>
</template>

<script>
export default {
  name: "analysisReport",
  data(){
      return{}
    },
    methods: {
      next() {
        this.asd()
      },
      asd(){
        this.$bus.$emit('next', "true");
      }
    }
};
</script>

<style></style>

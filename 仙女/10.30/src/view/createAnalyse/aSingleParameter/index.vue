<template>
  <div id="aSingleParameter"></div>
</template>

<script>
export default {
  name: "aSingleParameter",
  methods: {
    begin(active) {
      return this.againSession(active);
    },
    backStep(active) {
      return (active -= 1);
    },
    againSession(active) {
      return (active += 1);
    },
    // againSession(active) {
    //   let data = JSON.parse(sessionStorage.getItem("row"));
    //   active += 1;
    //   data.step = active;
    //   sessionStorage.setItem("row", JSON.stringify(data));
    //   return active;
    // },
  },
};
</script>

<style lang="scss">
#aSingleParameter {
  width: 100%;
  height: 100%;
}
</style>
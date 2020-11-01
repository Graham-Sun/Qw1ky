<template>
  <div id="aSingleGrade">分数成绩导入</div>
</template>

<script>
export default {
  name: "ASingleGrade",
  methods: {
    begin(active) {
      return this.againSession(active);
    },
    backStep(active) {
      return (active -= 1);
    },
    againSession(active) {
      return (active += 1);
    }

  },
};
</script>

<style>
#aSingleGrade {
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div class="home">
    <statement-rander msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import rander from "@/components/rander.vue";

export default {
  name: "Home",
  components: {
   'statement-rander': rander,
  },
};
</script>

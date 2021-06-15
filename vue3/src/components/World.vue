<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <div name="footer"></div>
    </footer>
    <div>这是word的{{ active }}</div>
  </div>
</template>
<script>
import { myMixin } from "@/utils/mixins.js";

export default {
  inject: ["active"],
  mixins: [myMixin],
  data() {
    return {};
  },
  watch: {},
  mounted() {
    console.log(this.getScroll0ffset());
  },
};
</script>

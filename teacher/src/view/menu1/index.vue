<template>
  <div>
    menu1
    {{ price }}
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Menu1",
  data() {
    return {};
  },
  computed: {
    ...mapState("menu1", {
      price: (state) => state.price,
    }),
  },
  methods: {
    add() {},
  },
  mounted() {},
};
</script>

<style></style>

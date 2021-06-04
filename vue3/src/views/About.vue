<template>
  <div class="about">
    <h1>This is an about page</h1>
    <about-word>
      <template v-slot:header>
        <h1>Here might be a page title</h1>
      </template>

      <template v-slot:default>
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
      </template>

      <template #footer>
        <p>Here's some contact info</p>
      </template>
    </about-word>
  </div>
</template>
<script>
import World from "@/components/World.vue";

export default {
  name: "about",
  components: {
    "about-word": World,
  },
};
</script>

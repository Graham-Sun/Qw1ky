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
export default {
  inject: ["active"],
};
</script>

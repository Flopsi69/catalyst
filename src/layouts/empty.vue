<script setup>
const nuxtApp = useNuxtApp();
 nuxtApp.hook("page:finish", () => {
   document.body.classList.add("loaded");
 });
console.log(222)
</script>

<template>
  <Header></Header>
  <!-- <main class="main">
    <slot />
  </main> -->
</template>

<style scoped></style>

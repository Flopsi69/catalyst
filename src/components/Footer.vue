<script lang="ts" setup></script>

<template>
  <footer class="footer container">
    <div class="container footer__container">
      <!-- Info -->
      <FooterInfo class="footer__info" />

      <!-- Navigation -->
      <FooterNav class="footer__nav" />

      <!-- CTA -->
      <FooterAction class="footer__action" />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  padding: 30px 0 38px;
  margin-top: auto;
  @media(max-width: $sm) {
    padding: 35px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
  }
  &__container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @media(max-width: $sm) {
      justify-content: center;
    }
  }

  &__nav {
    @media(max-width: $lg) {
      margin-top: 50px;
      width: 100%;
      order: 1;
    }

    @media(max-width: $sm) {
      order: 0;
      margin: 40px 0 30px;
    }
  }
}
</style>

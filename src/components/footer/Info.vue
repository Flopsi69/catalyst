<script setup></script>

<template>
  <div class="info">
    <!-- Logo -->
    <NuxtLink to="/" class="info__logo">
      <img src="@img/logo-blue.png" alt="" />
    </NuxtLink>

    <!-- Copyright -->
    <div class="info__copyright fw-700 color-gray900">
      &copy; 2023. Alfa Catalyst. All rights reserved
    </div>

    <!-- Socials -->
    <FooterSocials class="info__socials" />
  </div>
</template>

<style lang="scss" scoped>
.info {
  @media(max-width: $sm) {
    text-align: center;
  }

  &__logo {
    margin-top: 35px;
    display: block;
    @media(max-width: $lg) {
      margin-top: 15px;
    }
    @media(max-width: $sm) {
      margin-top: 0;
    }

    img {
      width: 100%;
      max-width: 250px;
    }
  }

  &__copyright {
    margin-top: 25px;
    font-size: 14px;
  }

  &__socials {
    margin-top: 32px;
  }
}
</style>

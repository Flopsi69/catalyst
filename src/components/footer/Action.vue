<script setup></script>

<template>
  <div class="action">
    <div class="action__title uppercase fw-900">
      Subscribe to our <span>discord</span> server
    </div>

    <div class="action__caption color-gray900 fw-700">
      Communicate, get early updates and roles
    </div>

    <button class="btn btn-blue action__btn">Join Discord</button>
  </div>
</template>

<style lang="scss" scoped>
.action {
  padding: 24px 32px 32px;
  border-radius: 24px;
  max-width: 330px;
  width: 100%;
  background: url('@img/decor/lines-wave.svg') bottom no-repeat, #141927 url('@img/decor/shadow-down.png') no-repeat center;
  background-size: cover;
  @media(max-width: $lg) {
    max-width: 400px;
  }
  &__title {
    font-family: $f-un;
    font-size: 18px;
    span {
      display: inline-block;
      position: relative;
      padding-left: 30px;
      color: #5865F2;
      &:before {
        content: '';
        position: absolute;
        width: 24px;
        left: 0;
        top: 0;
        bottom: 0;
        background: url('@img/socials/discord-purple.svg') no-repeat center;
        background-size: contain;
        background-position-y: 2px;
      }
    }
  }

  &__caption {
    margin-top: 22px;
    font-size: 14px;
    max-width: 200px;
  }

  &__btn {
    margin-top: 18px;
    font-size: 14px;
  }
}
</style>

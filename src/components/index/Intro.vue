<script setup>
// import { useModalStore } from '~/stores/modal';

// const modal = useModalStore();
</script>

<template>
  <div class="info">
    <div class="info__caption uppercase fw-900">Take the journey</div>

    <div class="info__title uppercase fw-900">
      To the <br />
      <span class="color-blueG align-center">
        <img src="@img/icons/web3-2.svg" />
        web3
      </span>
      world with&nbsp;us
    </div>

    <button
      @click="$modal.show('auth')"
      class="btn btn-blue btn-primary btn-go info__btn uppercase w-100"
    >
      <span class="btn-go__value">Get Started</span>
      <span class="btn-go__arrow">
        <img src="@img/icons/arrow-right.svg" alt="" />
      </span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.info {
  &__caption {
    font-family: $f-un;
    font-size: 38px;
    line-height: 110%;
    letter-spacing: -0.02em;
    @media(max-width: $lg) {
      font-size: 30px;
    }
    @media(max-width: $sm) {
      font-size: 6.5vw;
    }
  }

  &__title {
    position: relative;
    font-family: $f-un;
    font-size: 96px;
    line-height: 1.05;
    letter-spacing: -0.03em;
    text-shadow: 0 0 30px rgba(0,0,0,0.6);
    @media(max-width: $lg) {
      margin-top: 10px;
      font-size: 70px;
    }
    @media(max-width: $md) {
      br {
        display: none;
      }
    }
    @media(max-width: $sm) {
      line-height: 1.1;
      font-size: 15vw;
      margin-top: 15px;
    }
    &:before {
      content: '';
      position: absolute;
      left: -5px;
      right: -5px;
      top: -5px;
      bottom: -5px;
      pointer-events: none;
      background: url('@img/temp/title.png') left no-repeat;
      // mix-blend-mode: multiply;
      mix-blend-mode: darken;
      background-size: cover;
      // opacity: 0.7;
      @media(max-width: $lg) {
        display: none;
      }
    }

    span {
      background-image: inear-gradient(255deg, #117EFB 30%, $white 100%);
      background-image: -webkit-linear-gradient(255deg, #117EFB 30%, $white 100%);
      text-shadow: none;
      display: inline-flex;
    }

    img {
      margin-right: 4px;
      margin-top: -4px;
      width: 1em;
      height: 1em;
    }
  }

  &__btn {
    margin-top: 35px;
    padding: 11px;
    max-width: 280px;
  }
}
</style>

<script setup></script>

<template>
  <div class="side">
    <div class="side__title uppercase fw-900">
      Become part of the
      <span class="color-blue500">global </span>
      <img class="side__title-icon" src="@img/icons/web3-planet.svg" alt="" />
      <span class="color-blueG"> web3 </span>
      <span class="color-blue500">community</span>
    </div>

    <img class="side__divider" src="@img/icons/dashes-line.svg" alt="" />

    <div class="side__caption color-blue500 fw-500 lh-150">
      Create an account, complete quests, pump up your character, earn
      achievements and get rewards from the best web3 projects. <br />
      Dive into the crypto world with AlfaCatalyst and start earning now
    </div>
  </div>
</template>

<style lang="scss" scoped>
.side {
  background: url('@img/bg/half-planet.svg') bottom no-repeat, linear-gradient(180deg, #0A1C49 0%, #0A1532 46.35%, #001856 100%);
  box-shadow: inset 18px 0px 24px rgba(0, 46, 164, 0.3);
  padding: 32px;
  max-width: 330px;
  width: 100%;
  margin-left: auto;
  &__title {
    font-family: $f-un;
    font-size: 18px;
    &-icon {
      vertical-align: text-top;
    }
  }

  &__divider {
    margin: 24px 0;
  }

  &__caption {
    font-size: 14px;
  }
}
</style>

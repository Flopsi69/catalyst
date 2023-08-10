<script setup>
const sex = ref('male');

const emit = defineEmits(['updateSex']);
watchEffect(() => {
  emit('updateSex', sex.value);
});
</script>

<template>
  <div class="sex">
    <div
      class="sex__male sex__item flex-center pointer"
      :class="{active: sex === 'male'}"
      @click="sex='male'"
    >
      <img v-show="sex === 'male'" src="@img/icons/male-active.svg" alt="" />
      <img v-show="sex === 'female'" src="@img/icons/male.svg" alt="" />
    </div>

    <div
      class="sex__female sex__item flex-center pointer"
      :class="{active: sex === 'female'}"
      @click="sex='female'"
    >
      <img
        v-show="sex === 'female'"
        src="@img/icons/female-active.svg"
        alt=""
      />
      <img v-show="sex === 'male'" src="@img/icons/female.svg" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sex {
  &__item {
    position: relative;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    transition: $transition;
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 64px;
      height: 64px;
      background-image: url('@img/icons/sex-bg.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      transition: $transition;
      pointer-events: none;
    }

    &:hover {
      background-color: $dark;
      &:before {
        // background-image: url('@img/character/bg-hover.svg');
      }
    }

    img {
      position: relative;
      width: 30px;
    }

    &.active {
      &:before {
        width: 100px;
        height: 100px;
        background-image: url('@img/icons/sex-bg-active.png');
      }
    }
  }
}
</style>

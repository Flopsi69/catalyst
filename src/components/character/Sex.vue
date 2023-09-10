<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])

const sexList = ['male', 'female']
</script>

<template>
  <div class="sex">
    <div
      v-for="sex of sexList"
      class="sex__item flex-center pointer"
      :class="{active: modelValue === sex}"
      @click="$emit('update:modelValue', sex)"
    >
      <img
        :src="`/images/character/sex/${sex}${modelValue === sex ? '-active' : ''}.svg`"
        alt=""
      />
    </div>

    <!-- <div
      class="sex__female sex__item flex-center pointer"
      :class="{active: modelValue === 'female'}"
      @click="$emit('update:modelValue', 'female')"
    >
      <img
        v-show="modelValue === 'female'"
        src="@img/icons/female-active.svg"
        alt=""
      />
      <img v-show="modelValue === 'male'" src="@img/icons/female.svg" alt="" />
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.sex {
  &__item {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    transition: $transition;
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      background-image: url('/images/character/sex/bg.svg');
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
        background-image: url('/images/character/sex/bg-active.png');
      }
    }
  }
}
</style>

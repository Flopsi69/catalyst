<script setup>
defineProps(['modelValue', 'items'])
defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <tooltip
      v-for="item in items"
      class="class__item flex-center pointer"
      :class="{active: modelValue === item}"
      @click="$emit('update:modelValue', item)"
      :text="item.type"
    >
      <img :src="`/images/character/class/${item.img}.png`" alt="" />
    </tooltip>
  </div>
</template>

<style lang="scss" scoped>
.class {
  &__item {
    position: relative;
    width: 60px;
    height: 60px;
    text-align: center;
    flex-shrink: 0;
    &:deep(.tooltip__value) {
      padding: 11px 8px;
      min-width: 65px;
      background-color: $gray600;
      @media(max-width: $md) {
        display: none;
      }
      &:before {
        background-color: $gray600;
      }
    }
    & + & {
      // margin-left: 35px;
      @media(max-width: $md) {
        // margin-left: 20px;
      }
    }
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      background-image: url('@img/character/bg.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      transition: $transition;
      pointer-events: none;
    }

    &:hover {
      &:before {
        background-image: url('@img/character/bg-hover.svg');
      }
    }

    img {
      width: 45px;
      transition: $transition;
    }

    &.active {
      img {
        width: 48px;
      }

      &:before {
        width: 100px;
        height: 100px;
        background-image: url('@img/character/bg-active.png');
      }
    }
  }
}
</style>

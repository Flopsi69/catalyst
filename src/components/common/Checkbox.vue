<script lang="ts" setup>
defineEmits(['update:modelValue']);
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    @click="$emit('update:modelValue', !modelValue)"
    class="checkbox"
    :class="{active: modelValue}"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  position: relative;
  font-size: 12px;
  letter-spacing: -0.02em;
  padding-left: 34px;
  min-height: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:before, &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    box-sizing: border-box;
    transition: $transition;
  }

  &:before {
    background: url('@img/icons/checkbox.svg') center no-repeat, $blueG;
    opacity: 0;
    z-index: 1;
  }

  &:after {
    background-color: #15203D;
    border: 1px solid #262E54;
  }

  &:not(.active):hover {
    &:after {
      background-color: #1B2745;
    }
  }

  &.active {
    &:before {
      opacity: 1;
    }
  }

  &.error {
    &:after {
      border-color: $red;
    }
  }
}
</style>

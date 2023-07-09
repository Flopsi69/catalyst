<script lang="ts" setup>
let { color } = defineProps({
  color: {
    type: String,
    default: 'red',
  },
});
</script>

<template>
  <button class="btn" :class="'btn_' + color"><slot></slot></button>
</template>

<style lang="scss" scoped>
.btn {
  padding: 12px 20px;
  border-radius: $radius;
  color: $white;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 0.3px;
  font-size: 16px;
  transition: 0.35s;
  &.connect-right {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &.connect-left {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  &[small] {
    font-size: 14px;
    padding: 10px 15px;
  }
  &[large] {
    padding: 14px 25px;
    font-size: 18px;
  }
  &_red {
    background: $brand-red;
    &:hover {
      background: darken($brand-red, 7);
      box-shadow: 0 0 10px 1px rgba($brand-red, 0.3);
    }
  }
  &_blue {
    background: $brand-blue;
    &:hover {
      background: darken($brand-blue, 7);
      box-shadow: 0 0 10px 1px rgba($brand-blue, 0.3);
    }
  }
}
</style>

<script setup>
defineProps({
  placement: {
    type: String,
    default: 'left',
  },
});
const isActive = ref(false);
const dropdown = ref(null)

onMounted(() => {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.dropdown') !== dropdown.value && isActive.value) {
      isActive.value = false;
    }
  })
})
</script>

<template>
  <div
    class="dropdown prevent-select"
    ref="dropdown"
    :class="{'active': isActive }"
  >
    <div
      class="dropdown__trigger"
      @click.prevent="isActive = !isActive; console.log('fireee')"
    >
      <slot name="trigger" :isActive="isActive"> </slot>
    </div>

    <div
      v-show="isActive"
      class="dropdown__body"
      :class="`dropdown__body_${placement}`"
    >
      <slot name="body"> </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  &__body {
    position: absolute;
    z-index: 99;
    top: calc(100% + 18px);
    padding: 12px;
    border-radius: 8px;
    border: 1px solid $gray600;
    background: rgba(22, 21, 40, 0.7);
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.10), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 15px 24px 0px rgba(0, 0, 0, 0.19), 0px 51px 80px 0px rgba(0, 0, 0, 0.29);
    backdrop-filter: blur(16px);
    &_left {
      left: 0;
    }
    &_right {
      right: 0;
    }
    &_center {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &__trigger {
    cursor: pointer;
    transition: $transition;
    // &:hover {
    //   opacity: 0.6;
    // }
  }

  &:deep(.dropdown__icon) {
    position: relative;
    padding-right: 10px;
    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: 3px;
      width: 4px;
      height: 12px;
      background: url('@img/icons/dropdown.svg') no-repeat center center;
      background-size: contain;
    }
  }
}
</style>

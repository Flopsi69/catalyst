<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: () => 'tooltip',
  },
  placement: {
    type: String,
    default: () => 'top',
  },
  isArrow: {
    type: Boolean,
    default: true,
  }
});
</script>

<template>
  <div class="tooltip">
    <slot></slot>
    <div
      class="tooltip__value fw-700"
      :class="[`tooltip__value_${placement}`, isArrow ? '' : 'tooltip__value_no-arrow']"
    >
      {{ text[0].toUpperCase() + text.substring(1) }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  &__value {
    position: absolute;
    z-index: 99;
    left: 50%;
    border-radius: 8px;
    background: #111E40;
    backdrop-filter: blur(12px);
    padding: 15px 30px;
    opacity: 0;
    pointer-events: none;
    transition: $transition;
    .tooltip:hover &{
      opacity: 1;
    }
    &:before {
      content: '';
      position: absolute;
      width: 14px;
      height: 14px;
      background: inherit;
      transform: rotate(45deg)
    }

    &_top {
      top: 0;
      left: 50%;
      transform: translateX(-50%) translateY(calc(-100% - 18px));
      &:before {
        left: 50%;
        top: 100%;
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
      }
    }

    &_bottom {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) translateY(calc(100% + 18px));
      &:before {
        left: 50%;
        top: 0;
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
      }
    }

    &_no-arrow {
      border: 1px solid $gray600;
      box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.10), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 15px 24px 0px rgba(0, 0, 0, 0.19), 0px 51px 80px 0px rgba(0, 0, 0, 0.29);
      backdrop-filter: blur(16px);
      background: rgba(22, 21, 40, 0.7);
      &:before {
        display: none;
      }
    }
  }
}
</style>

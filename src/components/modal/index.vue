<script setup>
// import { useModalStore } from '~/stores/modal';

// const modal = useModalStore();
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="$modal.isOpen.value"
        @click.self="$modal.close"
        class="modal flex-center"
      >
        <template v-if="$modal.name.value == 'auth'">
          <ModalAuth class="modal__inner modal__auth flex" />
        </template>

        <template v-if="$modal.name.value == 'reward'">
          <ModalReward class="modal__inner modal__reward" />
        </template>
      </div>
    </transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(0, 1, 24, 0.35) 0%, #000117 100%);
  backdrop-filter: blur(4px);
  max-height: 100vh;
  overflow-y: scroll;
  padding: 20px;

  &:deep(.modal__close) {
    transition: $transition;
    fill: #323E5C;
    cursor: pointer;
    width: 22px;
    &:hover {
      fill: #fff;
    }
  }

  &__inner {
    position: relative;
    margin: auto;
    overflow: hidden;
    background-color: #07122E;
    width: 100%;
    border-radius: 12px;
  }

  &__auth {
    max-width: 830px;
    display: flex;
  }

  &__reward {
    border-radius: 24px;
    max-width: 500px;
    &:before {
      content: '';
      position: absolute;
      left: -40%;
      right: -40%;
      bottom: -40%;
      top: -40%;
      background: repeating-conic-gradient(#0B1632 0deg 10deg,
      #07122E 0deg 20deg
      ) #07122E;
      animation: rotate linear 20s infinite;
      pointer-events: none;
    }

    &:after {
      content: '';
      position: absolute;
      height: 110px;
      top: 0;
      left: 0;
      right: 0;
      pointer-events: none;
      background: url('@img/bg/reward-head.png') top no-repeat;
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

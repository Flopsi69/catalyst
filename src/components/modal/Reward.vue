<script setup>
import close from "@img/icons/close.svg?component"

const isOpened = ref(false)

const rewards = reactive([
  {
    type: 'chest',
    amount: 1,
  },
  {
    type: 'poison',
    amount: 2,
  },
  {
    type: 'stone',
    amount: 100,
  },
  {
    type: 'xp',
    amount: 55,
  }
]);
</script>

<template>
  <div class="reward text-center">
    <div class="reward__title fw-900 uppercase">Congrats!</div>

    <div @click="$modal.close()" class="reward__close modal__close lh-0">
      <close />
    </div>

    <div class="reward__box">
      <img v-if="isOpened" src="@img/rewards/box-open.gif" alt="" />
      <img v-else src="@img/rewards/box.png" alt="" />
    </div>

    <div v-if="isOpened" class="reward__list">
      <tooltip
        v-for="reward of rewards"
        class="reward__item flex-center"
        :text="reward.type"
      >
        <div class="reward__item-icon lh-0">
          <img :src="`/images/rewards/${reward.type}.png`" alt="" />
        </div>
        <div class="reward__item-amount fw-900">{{ reward.amount }}</div>
      </tooltip>
    </div>

    <div v-else class="reward__caption lh-150 fw-500 color-blue500">
      You've just completed the registration.
      <br />
      Get a reward for it!
    </div>

    <button
      @click="isOpened = !isOpened"
      class="reward__btn btn btn-blue btn-arrow w-100"
    >
      <span> {{ isOpened ? 'Collect it' : 'Open the chest' }} </span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.reward {
  padding: 35px 45px 42px;
  @media(max-width: $sm) {
    padding: 30px 20px;
  }
  & > * {
    position: relative;
    z-index: 1;
  }

  &__list {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(4, 90px);
    gap: 18px;
    margin-top: 35px;
    @media(max-width: $sm) {
      grid-template-columns: repeat(2, 90px);
    }
  }

  &__item {
    position: relative;
    width: 90px;
    height: 90px;
    border-radius: 24px;
    transition: $transition;
    border: 4px solid;
    border-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, #177AF7 50%, rgba(0, 0, 0, 0) 80%) 1 100%;
    background: rgba(0, 0, 0, 0.40);
    backdrop-filter: blur(20px);
    &:hover {
      background-color: rgba(20, 43, 64, 0.55);
    }

    &-icon {
      padding-bottom: 10px;
      img {
        max-width: 60%;
        max-height: 60%;
      }
    }

    &-amount {
      position: absolute;
      font-family: $f-un;
      font-size: 14px;
      bottom: 7px;
      right: 12px;
    }
  }

  &__close {
    position: absolute;
    top: 35px;
    right: 25px;
    @media(max-width: $sm) {
      right: 20px;
      top: 28px;
    }
  }

  &__title {
    font-family: $f-un;
    font-size: 18px;
  }

  &__box {
    max-width: 300px;
    margin: 35px auto 0;
  }

  &__caption {
    font-size: 14px;
    margin-top: 25px;;
  }

  &__btn {
    font-size: 14px;
    margin-top: 24px;
    max-width: 260px;
    min-height: 55px;
  }
}
</style>

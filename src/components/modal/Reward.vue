<script setup>
import close from "@img/icons/close.svg?component"

const isOpened = ref(false)
const isOpening = ref(false)

const rewards = reactive([
  // {
  //   name: 'Mystery_Box',
  //   amount: 1,
  //   img: 'icon-mystery.png',
  // },
  // {
  //   type: 'chest',
  //   amount: 1,
  // },
  // {
  //   type: 'poison',
  //   amount: 2,
  // },
  // {
  //   type: 'stone',
  //   amount: 100,
  // },
  // {
  //   type: 'xp',
  //   amount: 55,
  // }
]);

// const { $modal } = useNuxtApp();
const store = useCharacterStore();

const openReward = async () => {
  // if (isOpened.value) {
  //   $modal.close();
  //   return false;
  // }

  isOpening.value = true;
  store.claimReward();

  setTimeout(() => {
    isOpening.value = false;
    isOpened.value = true
  }, 2700);

  // $emit('openReward');
}
</script>

<template>
  <div class="reward text-center" :class="{reward_opened: isOpened}">
    <div class="reward__title fw-900 uppercase">Congrats!</div>

    <div @click="$modal.close()" class="reward__close modal__close lh-0">
      <close />
    </div>

    <div class="reward__box">
      <img v-show="!isOpening" src="@img/rewards/box.png" alt="" />
      <img
        v-show="isOpening && !isOpened"
        src="@img/rewards/box-open.gif"
        alt=""
      />
    </div>

    <div v-if="isOpened" class="reward__list">
      <template v-if="false">
        <tooltip
          v-for="reward of rewards"
          class="reward__item flex-center"
          :text="reward.name"
        >
          <div class="reward__item-icon lh-0">
            <img :src="`/images/rewards/${reward.img}`" alt="" />
          </div>
          <div class="reward__item-amount fw-900">{{ reward.amount }}</div>
        </tooltip>
      </template>
      <div v-else class="reward__caption lh-150 fw-500 color-blue500">
        <p>You got a Founder's Box for pre-registration on AlfaCatalyst.</p>
        <div class="reward__includes">
          <p class="reward__includes-title fw-500">Guaranteed content:</p>
          <ul>
            <li>Founder's Gear Set for your character</li>
            <li>consumables starter pack</li>
          </ul>

          <p class="reward__includes-title fw-500">
            Unique content - chance to win epic drop:
          </p>
          <ul>
            <li>Epic Gear</li>
            <li>Epic Materials</li>
            <li>Airdrop</li>
          </ul>
        </div>
        <p class="reward__caption-sub">
          You can open Founder's Box at platform launch. Follow our social media
          to keep up with the latest updates.
        </p>
      </div>
    </div>

    <div v-else class="reward__caption lh-150 fw-500 color-blue500">
      You've just completed the pre-registration.
      <br />
      Get a reward for it!
    </div>

    <button
      v-if="!isOpened && !isOpening"
      @click="openReward"
      class="reward__btn btn btn-blue btn-arrow w-100"
    >
      <span> {{ isOpened ? 'Collect it' : 'Open reward' }} </span>
    </button>

    <FooterSocials v-else-if="!isOpening" class="reward__socials flex-center" />
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

  &__socials {
    margin-top: 20px;
    &:deep(.socials__link:nth-child(1n + 4)) {
      display: none;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    // grid-template-columns: repeat(4, 90px);
    gap: 18px;
    margin-top: 35px;
    .reward_opened & {
      margin-top: 0;
    }
    @media(max-width: $sm) {
      // grid-template-columns: repeat(2, 90px);
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
    .reward_opened & {
      margin-top: 0;
    }
  }

  &__caption {
    display: flex;
    flex-flow: column;
    align-items: center;
    font-size: 16px;
    margin-top: 25px;
    .reward_opened & {
      margin-top: 15px;
    }
    &-sub {
      font-size: 12px;
    }
  }

  &__includes {
    border-top: 1px solid rgba($blue500, .7);
    border-bottom: 1px solid rgba($blue500, .7);
    margin: 15px 0;
    padding: 15px 0;
    &-title {
      letter-spacing: 0.3px;
    }

    ul {
      display: flex;
      flex-flow: column;
      align-items: center;
      padding: 0;
      margin-top: 10px;
      list-style: none;
      font-size: 14px;
      & + p {
        margin-top: 10px;
      }
    }
    li {
      position: relative;
      display: inline-block;
      padding-left: 15px;
      &:before {
        content: '';
        position: absolute;
        width: 5px;
        height: 5px;
        background: $blue500;
        border-radius: 50%;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
      }
    }
  }

  &__btn {
    font-size: 14px;
    margin-top: 24px;
    max-width: 260px;
    min-height: 55px;
  }
}
</style>

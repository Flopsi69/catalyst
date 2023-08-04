<script setup>
import bg1 from '@img/bg/jumb-act-1.png'
import bg2 from '@img/bg/jumb-act-2.png'
import bg3 from '@img/bg/jumb-act-3.png'

import icon1 from '@img/icons/user-polygon.svg'
import icon2 from '@img/icons/helmet.svg'
import icon3 from '@img/icons/bag.svg'

const actions = [
  {
    title: 'Create an account',
    icon: icon1,
    bg: bg1
  },
  {
    title: 'Put together your own charactioner',
    icon: icon2,
    bg: bg2
  },
  {
    title: 'Have fun & earn',
    icon: icon3,
    bg: bg3
  }
]
</script>

<template>
  <Swiper
    class="actions w-100"
    :modules="[SwiperAutoplay]"
    :slides-per-view="'auto'"
    rewind
    :init="false"
    :breakpoints="{
      0: {
        centeredSlides: true,
        spaceBetween: 40,
      },
      768: {
        centeredSlides: false,
        spaceBetween: 0,
      }
    }"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: true,
    }"
  >
    <SwiperSlide
      class="action flex"
      v-for="action in actions"
      :key="action.title"
    >
      <div
        @click="$modal.show('auth')"
        class="action__inner w-100"
        :style="`background-image: url(${action.bg})`"
      >
        <img class="action__icon" :src="action.icon" />
        <div class="action__title fw-900 flex">
          <span class="action__title-value uppercase">{{ action.title }}</span>
          <img
            class="action__title-icon"
            src="@img/icons/arrow-right.svg"
            alt=""
          />
        </div>
      </div>
    </SwiperSlide>
  </Swiper>

  <!-- <div class="actions">
    <div v-for="action in actions" class="action flex">
      <NuxtLink
        to="/quests"
        class="action__inner w-100"
        :style="`background-image: url(${action.bg})`"
      >
        <img class="action__icon" :src="action.icon" />
        <div class="action__title fw-900 flex">
          <span class="action__title-value uppercase">{{ action.title }}</span>
          <img
            class="action__title-icon"
            src="@img/icons/arrow-right.svg"
            alt=""
          />
        </div>
      </NuxtLink>
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
.actions {
  overflow: visible;
  &:deep(.swiper-slide) {
    display: flex;
  }

  &:deep(.swiper-wrapper) {
    justify-content: flex-end;
    @media(max-width: $lg) {
      justify-content: center;
    }
    @media(max-width: $sm) {
      justify-content: flex-start;
      justify-content: initial;
    }
  }
}

.action {
  position: relative;
  transition: top $transition;
  cursor: pointer;
  top: 0;
  outline: 4px solid rgba(130, 195, 255, 0.3);
  border-radius: 32px;
  height: 240px;
  max-width: 240px;
  width: 100%;
  opacity: 1;
  @media(max-width: 1400px) {
    max-width: 30%;
  }
  @media(max-width: $lg) {
    height: 240px;
    max-width: 240px;
  }
  @media(max-width: $md) {
    height: 220px;
    max-width: 220px;
  }
  @media(max-width: $sm) {
    max-width: 75%;
    // margin: 0 40px;
    // max-width: 340px;
    // height: 340px;
    // flex-shrink: 0;
    height: 75vw;
  }
  & + & {
    margin-left: 36px;
    @media(max-width: $sm) {
      margin-left: 0;
    }
  }

  @media (hover: hover) {
    &:hover {
      top: -8px;
    }
  }
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(180deg, #1546FF 0%, #76E1F9 100%);
    filter: blur(25px);
    border-radius: inherit;
    z-index: -1;
  }

  &__inner {
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 32px;
    z-index: 1;
    &:before {
      content: '';
      border-radius: 32px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 50%, #02112B 100%);
      transition: $transition;
    }
    @media (hover: hover) {
      &:hover {
        &:before {
          opacity: 0;
        }
      }
    }
  }

  &__title {
    position: absolute;
    bottom: 24px;
    left: -18px;
    font-family: $f-un;
    font-size: 18px;
    @media(max-width: $lg) {
      font-size: 16px;
    }
    @media(max-width: $sm) {
      right: 30px;
      left: -16px;
      justify-content: space-between;
    }
    &-value {
      max-width: 200px;
      @media(max-width: $lg) {
        max-width: 180px;
      }
    }

    &-icon {
      opacity: 0;
      transition: $transition;
      filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(301deg) brightness(103%) contrast(103%);
      @media(max-width: $sm) {
        opacity: 1;
      }

      @media (hover: hover) {
        .action:hover & {
          opacity: 1;
        }
      }
    }
  }

  &__icon {
    position: absolute;
    right: 18px;
    top: 18px;
  }
}
</style>

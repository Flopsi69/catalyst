<script setup>
import launchpad from '@img/icons/nav-launchpad.svg'
import leaderboard from '@img/icons/nav-leaderboard.svg'
import achievements from '@img/icons/nav-achievements.svg'

const nav = reactive([
  {
    title: 'Launchpad',
    url: '#',
    img: launchpad,

  },
  {
    title: 'Achievements',
    url: '#',
    img: achievements,
  },
  {
    title: 'Leaderboard',
    url: '#',
    img: leaderboard,
  },
]);

const stats = reactive([
  {
    type: 'diamonds',
    value: 652,
  },
  {
    type: 'gold',
    value: 175,
  },
  {
    type: 'stardust',
    value: 380,
  },
])

const chains = reactive([
  {
    icon: 'ethereum',
    name: 'Ethereum'
  },
  {
    icon: 'polygon',
    name: 'Polygon'
  },
  {
    icon: 'bnb',
    name: 'BNB Smarn Chain'
  },
  {
    icon: 'avalanche',
    name: 'Avalanche'
  },
  {
    icon: 'kcc',
    name: 'KCC'
  },
  {
    icon: 'arbitrum',
    name: 'Arbitrum One'
  },
  {
    icon: 'optimism',
    name: 'Optimism'
  },
  {
    icon: 'okx',
    name: 'OKX Chain'
  }
]);

const isBurgerActive = ref(false);

const activeChain = ref(chains[0]);
</script>

<template>
  <header class="header container">
    <div class="header__inner head-decor flex align-center">
      <!-- Logo -->
      <NuxtLink class="header__logo logo" to="/">
        <img src="@img/logo.svg" alt="" />
      </NuxtLink>

      <!-- Nav -->
      <nav class="header__nav nav flex align-center">
        <a
          v-for="link of nav"
          class="nav__link link flex align-center fw-700"
          :href="link.url"
        >
          <img :src="link.img" alt="" />
          {{ link.title }}
        </a>
      </nav>

      <!-- Stats -->
      <div class="stats flex align-center">
        <tooltip
          v-for="{ value, type } of stats"
          class="stat stats__item flex align-center fw-700"
          :class="`stat_${type}`"
          placement="bottom"
          :text="type"
          :isArrow="false"
        >
          {{ value }}
        </tooltip>
      </div>

      <!-- Wallet -->
      <div class="dropdowns flex">
        <dropdown class="wallet">
          <template #trigger>
            <div class="network wallet__dropdown flex align-center">
              <div class="wallet__icon flex align-center justify-center">
                <img :src="`/images/chains/${activeChain.icon}.svg`" alt="" />
              </div>
              <div class="wallet__info">
                <div class="wallet__label fw-700">Network</div>
                <div class="wallet__value dropdown__icon fw-700">
                  {{ activeChain.name }}
                </div>
              </div>
            </div>
          </template>

          <template #body>
            <div class="chains fw-700">
              <div
                v-for="chain of chains"
                class="chain flex align-center"
                :class="{ active: activeChain.name === chain.name }"
                @click="activeChain = chain"
              >
                <div class="chain__icon flex-center lh-0">
                  <img
                    :src="`/images/chains/${activeChain.name === chain.name ? 'active' : chain.icon}.svg`"
                    alt=""
                  />
                </div>
                <div>
                  {{ chain.name }}
                </div>
              </div>
            </div>
          </template>
        </dropdown>

        <dropdown class="wallet">
          <template #trigger>
            <div class="network wallet__dropdown flex align-center">
              <div class="wallet__icon flex align-center justify-center">
                <img src="@img/icons/wallet.svg" alt="" />
              </div>
              <div class="wallet__info">
                <div class="wallet__label fw-700">Wallet</div>
                <div class="wallet__value dropdown__icon fw-700">
                  0xm4•••5sbpp
                </div>
              </div>
            </div>
          </template>

          <template #body>
            <div class="profile fw-700">
              <NuxtLink to="/character" class="profile__item flex align-center">
                <img src="@img/icons/profile.svg" alt="" />
                <span>Profile</span>
              </NuxtLink>
              <div class="profile__divider"></div>
              <div class="profile__item flex align-center">
                <img src="@img/icons/disconnect.svg" alt="" />
                <span>Disconnect</span>
              </div>
            </div>
          </template>
        </dropdown>
      </div>

      <button
        class="burger"
        :class="{active: isBurgerActive}"
        @click="isBurgerActive = !isBurgerActive"
      >
        <span></span>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding-top: 8px;
  padding-bottom: 8px;
  &__inner {
    @media(max-width: $lg) {
      & > *:not(.logo) {
        display: none;
      }
    }
    box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.55);
  }
}

.nav {
  margin-left: 24px;
  margin-right: 24px;
  &__link {
    font-size: 14px;
    & + & {
      margin-left: 36px;
    }

    img {
      margin-right: 10px;
    }
  }
}

.stats {
  margin-left: auto;
  &__item {
    & + & {
      margin-left: 24px;
    }
  }
}

.stat {
  font-size: 14px;
  &:before {
    content: '';
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #393462;
    background-position: center;
    background-repeat: no-repeat;
    margin-right: 7px;
    transition: $transition;
  }

  &_stardust:before {
    background-image: url('@img/icons/sand.svg');
  }

  &_diamonds:before {
    background-image: url('@img/icons/diamond.svg');
  }

  &_gold:before {
    background-image: url('@img/icons/gold.svg');
  }

  &:hover:before {
    background-color: $dark;
  }
}

.dropdowns {
  position: relative;
  margin-left: 12px;
  padding-left: 12px;
  &:before {
    content: '';
    position: absolute;
    background-color: $gray700;
    opacity: 0.3;
    width: 1px;
    height: 26px;
    top: 50%;
    margin-top: -13px;
    left: 0;
  }
}

.chains {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  // display: flex;
  // flex-wrap: wrap;
  font-size: 14px;
}

.chain {
  padding: 10px 12px;
  white-space: nowrap;
  border-radius: 8px;
  transition: $transition;
  cursor: pointer;
  &:hover {
    background: rgba($gray600, 0.9);
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }

  &__icon {
    margin-right: 7px;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  &.active {
    background: $gray600;
  }
}

.burger {
  display: none;
  // display: flex;
  align-items: center;
  position: relative;
  width: 30px;
  height: 20px;
  transition: 0.35s;
  &:before, &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    background-color: #DFDF35;
    height: 3px;
    border-radius: 5px;
    transition: $transition;
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
    .active & {
      transform: rotate(45deg);
    }
  }

  span {
    display: block;
    background-color: #DFDF35;
    height: 3px;
    width: 100%;
    border-radius: 5px;
    transition: $transition;
  }

  &.active {
    &:before, &:after {
      bottom: initial;
      left: 1px;
      right: 1px;
      top: 9px;
    }

    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }

    span {
      opacity: 0;
    }
  }
}

.profile {
  &__item {
    font-size: 14px;
    padding: 8px 10px;
    transition: $transition;
    cursor: pointer;
    &:hover {
      background-color: $gray600;
      border-radius: 8px;
    }
    img {
      margin-right: 8px;
      max-width: 24px;
    }

    & + & {
      margin-top: 4px;
    }
  }

  &__divider {
    height: 1px;
    background-color: $gray600;
    margin: 5px 0 12px;
  }
}

.wallet {
  & + & {
    margin-left: 28px;
  }

  &__icon {
    background-color: #393462;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-right: 12px;
    img {
      max-width: 22px;
      max-height: 22px;
      width: 100%;
      height: 100%;
    }
  }

  &__label {
    color: $gray900;
    letter-spacing: -0.02em;
    font-size: 13px;
  }

  &__value {
    font-size: 14px;
    width: 110px;
    overflow: hidden;
    white-space: nowrap;
    &:before {
      content: '';
      position: absolute;
      right: 0;
      pointer-events: none;
      top: 0;
      bottom: 0;
      width: 70px;
      height: 100%;
      background: $gray600;
      background: linear-gradient(to right, rgba(#201e39,0) 0%, #201e39 85%);
    }
  }
}
</style>

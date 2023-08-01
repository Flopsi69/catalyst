<script setup>
import launchpad from '@img/icons/nav-launchpad.svg'
import leaderboard from '@img/icons/nav-leaderboard.svg'
import achievements from '@img/icons/nav-achievements.svg'

useHead({
  bodyAttrs: {
    class: 'fixed-nav'
  }
})

const toast = useToast();

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
    value: 0,
  },
  {
    type: 'gold',
    value: 0,
  },
  {
    type: 'stardust',
    value: 0,
  },
])

// const isBurgerActive = ref(false);

// Web3
const { address, isConnected } = useAccount();
const { chain, chains } = useNetwork();

const { connect, connectors } = useConnect({
    onError(error) {
    // console.log('errorConnect', error)
      if (!connectors.value[0].ready) {
        return toast.error('Metamask not installed!')
      }
      toast.error(error.message)
    },
    onSuccess({account, connector: { name }}) {
      console.log('Connect', name)
      toast.success(`${name}: ${account.slice(0, 6)}***${account.slice(-4)}\nSuccessfully connected!`)
    }
})

const { disconnect } = useDisconnect({
  onError(error) {
    console.log('errorDisconnect', error)
    toast.error(error.shortMessage)
  },
  onSuccess(data) {
    toast("Wallet disconnected!")
  },
});
const { error, isLoading, pendingChainId, switchNetwork } =
  useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
    onError(err) {
      const errorMessage = err.shortMessage ? err.shortMessage : err.message ? err.message : err;
      toast.error(errorMessage)
    },
    onSuccess(data) {
      console.log(data)
      toast.success(`Successfully switched to ${data.name}!`)
    },
  });

const user = useSupabaseUser();
console.log(user.value)
const supabase = useSupabaseAuthClient();


async function signOut() {
  if (!user.value) return toast.error('You are not logged in');

  const { error } = await supabase.auth.signOut();

  if (error) {
    return toast.error(error.message)
  }

  toast.info("Successfully signed out!");
  navigateTo('/');
}

watch(chain,
  (chain) => {
    console.log('watchCahin', chain)
    if (chain?.unsupported && chains.value[0]?.id) {
      // switchNetwork(chains.value[0]?.id)
      toast.error('Unsupported network')
    }
  }
)

const authWallet = computed(() => {
  return address.value || user.value?.user_metadata?.walletAddress
})

console.log('authWallet', authWallet.value)
</script>

<template>
  <!-- <client-only>
    <div v-if="status === 'authenticated' || address" class="debug">
      <p v-if="address">Address: {{ address }}</p>
      <p v-if="data">{{ data }}</p>
    </div>
  </client-only> -->

  <header class="header container">
    <div class="header__inner head-decor flex align-center">
      <!-- Logo -->
      <div class="header__logo logo">
        <img src="@img/logo.svg" alt="" />
      </div>

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
      <div class="stats header__stats flex align-center">
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
      <client-only>
        <div v-if="user" class="wallet__wrap flex align-center">
          <button
            v-if="!isConnected"
            @click="isConnected ? disconnect() : connect({connector: connectors[0]})"
            class="btn btn-blue btn-icon header__connect"
          >
            <img src="@img/icons/wallet.svg" alt="" />
            {{ isConnected ? "Disconnect" : "Connect" }} Wallet
          </button>

          <dropdown v-if="isConnected" md="right" class="wallet">
            <template #trigger>
              <div class="network wallet__dropdown flex align-center">
                <div class="wallet__icon flex align-center justify-center">
                  <img
                    :src="`/images/chains/${chain.unsupported ? 'unsupported' : chain.network}.svg`"
                    alt=""
                  />
                </div>
                <div class="wallet__info">
                  <div class="wallet__label fw-700">Network</div>
                  <div class="wallet__value dropdown__icon fw-700">
                    {{ chain.name }}
                  </div>
                </div>
              </div>
            </template>

            <template #body>
              <div class="chains fw-700">
                <div
                  v-for="chainItem of chains"
                  class="chain flex align-center"
                  @click="switchNetwork(chainItem.id)"
                  :class="{ active: chain.id === chainItem.id }"
                >
                  <div class="chain__icon flex-center lh-0">
                    <img
                      :src="`/images/chains/${chain.id === chainItem.id ? 'active' : chainItem.network}.svg`"
                      :alt="chainItem.name"
                    />
                  </div>
                  <div>{{ chainItem.name }}</div>
                </div>
              </div>
            </template>
          </dropdown>

          <dropdown md="right" class="wallet">
            <template #trigger>
              <div class="wallet__dropdown flex align-center">
                <div class="wallet__icon flex align-center justify-center">
                  <img
                    :src="`images/icons/${authWallet ? 'wallet' : 'email'}-placeholder.svg`"
                    alt=""
                  />
                </div>
                <div class="wallet__info">
                  <div class="wallet__label fw-700">
                    {{authWallet ? "Wallet" : "E-mail"}}
                  </div>
                  <div class="wallet__value dropdown__icon fw-700">
                    <template v-if="authWallet">
                      {{ authWallet.slice(0, 3) + '...' + authWallet.slice(-3) }}
                    </template>
                    <template v-else>
                      {{ user.email }}
                    </template>
                  </div>
                </div>
              </div>
            </template>

            <template #body>
              <div class="profile fw-700">
                <div class="profile__mobile">
                  <!-- Profile Wallet -->
                  <div class="wallet__summary flex align-center">
                    <div class="wallet__icon flex align-center justify-center">
                      <img
                        :src="`images/icons/${authWallet ? 'wallet' : 'email'}-placeholder.svg`"
                        alt=""
                      />
                    </div>
                    <div class="wallet__info flex-grow">
                      <div class="wallet__label fw-700">
                        {{ authWallet ? "Wallet" : "E-mail" }}
                      </div>
                      <div class="wallet__value fw-700">
                        <template v-if="authWallet">
                          {{ authWallet.slice(0, 3) + '...' + authWallet.slice(-3) }}
                        </template>
                        <template v-else>
                          {{ user.email }}
                        </template>
                      </div>
                    </div>
                  </div>

                  <!-- Profile stats -->
                  <div class="stats profile__stats flex align-center">
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
                </div>

                <div class="profile__item flex align-center">
                  <img src="@img/icons/profile.svg" alt="" />
                  <span>Profile</span>
                </div>
                <div class="profile__divider"></div>
                <!-- -->
                <div
                  @click="isConnected ? disconnect() : signOut()"
                  class="profile__item flex align-center"
                >
                  <img src="@img/icons/disconnect.svg" alt="" />
                  <span>Disconnect</span>
                </div>
              </div>
            </template>
          </dropdown>
        </div>
      </client-only>

      <!-- <button
        class="burger"
        :class="{active: isBurgerActive}"
        @click="isBurgerActive = !isBurgerActive"
      >
        <span></span>
      </button> -->
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding-top: 8px;
  padding-bottom: 8px;
  @media(max-width: $sm) {
    padding: 0;
  }
  &__inner {
    box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.55);
    @media(max-width: $sm) {
      height: 56px;
      margin: 0;
      padding: 10px 16px;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 999;
      &:before, &:after {
        display: none;
      }
    }
  }

  &__logo {
    @media(max-width: $md) {
      margin-right: auto;
    }
  }

  &__stats {
    @media(max-width: $md) {
      display: none;
    }
  }

  &__connect {
    font-size: 13px;
    letter-spacing: -0.26px;
    border-radius: 12px;
    margin-right: 20px;
    padding: 13px 10px 11px;
    @media(max-width: $md) {
      // order: 1;
      padding: 9px 10px 8px;
      margin-right: 10px;
      // margin-right: 0;
      // margin-left: 12px;
    }
  }
}

.nav {
  margin-left: 24px;
  margin-right: 24px;
  @media(max-width: $lg) {
    position: fixed;
    justify-content: space-evenly;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: linear-gradient(180deg, #2A274B 0%, #1D1A32 100%);
    box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.55);
    margin: 0;
    padding: 0 2px;
  }
  &__link {
    font-size: 14px;
    @media(max-width: $lg) {
      display: flex;
      flex-flow: column;
      align-items: center;
      padding: 12px 6px 12px;
    }
    @media(max-width: $sm) {
      font-size: 11px;
      letter-spacing: -0.22px;
    }
    & + & {
      margin-left: 36px;
      @media(max-width: $lg) {
        margin-left: 0;
      }
    }

    img {
      margin-right: 10px;
      height: 20px;
      @media(max-width: $lg) {
        margin-right: 0;
        height: 24px;
        margin-bottom: 8px;
      }
    }
  }
}

.stats {
  margin-left: auto;
  &__item {
    & + & {
      margin-left: 24px;
      @media(max-width: $sm) {
        margin-left: 15px;
      }
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

.chains {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  font-size: 14px;
  @media(max-width: $md) {
    grid-template-columns: 1fr;
  }
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
    @media(max-width: $md) {
      padding: 12px 4px;
    }
    @media(hover:hover) {
      &:hover {
        background-color: $gray600;
        border-radius: 8px;
      }
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
    @media(max-width: $md) {
      margin: 0;
    }
  }

  &__mobile {
    display: none;
    @media(max-width: $md) {
      display: block;
    }
  }

  &__stats {
    padding: 12px 0;
    margin-top: 12px;
    border-top: 1px solid $gray600;
    border-bottom: 1px solid $gray600;
  }
}

.wallet {
  &__wrap {
    position: relative;
    margin-left: 12px;
    padding-left: 12px;
    flex-shrink: 0;
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

  & + & {
    margin-left: 20px;
    @media(max-width: $sm) {
      margin-left: 12px;
    }
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
    @media(max-width: $md) {
      width: 150px;
      text-overflow: ellipsis;
    }
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
      @media(max-width: $md) {
        display: none;
      }
    }
  }

  &__dropdown {
    @media(max-width: $md) {
      .wallet {
        &__info {
          display: none;
        }
        &__icon {
          position: relative;
          margin-right: 0;
          padding: 3px;
          border-radius: 128px;
          height: 30px;
          width: 46px;
          justify-content: flex-start;
          img {
            max-width: 24px;
            max-height: 24px;
          }

          &:after {
            content: "";
            position: absolute;
            right: 9px;
            top: auto;
            width: 4px;
            height: 12px;
            background: url('@img/icons/dropdown.svg') no-repeat center center;
            background-size: contain;

            .active & {
              filter: invert(100%) sepia(100%) saturate(38%) hue-rotate(321deg) brightness(110%) contrast(110%);
            }
          }
        }
      }
    }
  }
}
</style>

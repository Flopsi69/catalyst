<script setup>
const langs = reactive([
  {
    title: 'English',
    brief: 'en',
    url: '#',
  }
]);

const toast = useToast();

const activeLang = ref(langs[0]);
const user = useSupabaseUser();
const supabase = useSupabaseAuthClient();


async function signOut() {
  if (user.value) {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return toast.error(error.message)
    }

    toast.info("Successfully signed out!");
  }
}
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <!-- Logo -->
      <NuxtLink to="/" class="header__logo logo">
        <img src="@img/logo.svg" alt="" />
      </NuxtLink>

      <!-- Right Side -->
      <div class="header__control">
        <!-- Language toggler -->
        <dropdown class="header__lang lang fw-700" placement="center">
          <template #trigger>
            <div class="lang__value dropdown__icon uppercase">
              {{ activeLang.brief }}
            </div>
          </template>

          <template #body>
            <div
              v-for="lang in langs"
              class="lang__item"
              :class="{active: activeLang.brief == lang.brief}"
              @click="activeLang = lang"
            >
              {{lang.title}}
            </div>
          </template>
        </dropdown>

        <!-- CTA -->
        <!-- @click="status === 'authenticated' || user ? signOut() : $modal.show('auth')" -->
        <button
          @click="user ? signOut() : $modal.show('auth')"
          class="btn btn-blue btn_square uppercase header__btn"
        >
          {{ user ? 'Log Out' : 'Join platform' }}
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  &__container {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media(max-width: $sm) {
      height: 52px;
    }
  }

  &__logo {
    line-height: 0;
    max-width: 150px;
    @media(max-width: $md) {
      padding-right: 16px;
    }
    img {
      @media(max-width: $sm) {
        // max-width: 100px;
      }
    }
  }

  &__control {
    margin-right: -24px;
    display: flex;
    height: 100%;
    border-left: 1px solid rgba(255, 255, 255, 0.15);
    @media(max-width: $md) {
      margin-right: -16px;
    }
  }

  &__lang {
  }

  &__btn {
    padding: 12px 16px;
    @media(max-width: $sm) {
      padding: 7px 12px;
      font-size: 14px;
    }
  }
}

.lang {
  &:deep(.dropdown__body) {
    padding: 15px 5px;
    border-radius: 18px;
    background-color: $white;
    top: calc(100% + 1px);
    border-color: transparent;
  }

  &:deep(.dropdown__trigger) {
    padding: 22px;
    @media(max-width: $sm) {
      padding: 16px;
    }
  }

  &__item {
    position: relative;
    color: $dark;
    padding: 5px 35px 5px 12px;
    cursor: pointer;
    transition: $transition;
    &:before {
      content: '';
      opacity: 0;
      transition: $transition;
      position: absolute;
      top: 50%;
      right: 12px;
      width: 14px;
      height: 14px;
      transform: translateY(-50%);
      background: url('@img/icons/check-blue.svg') no-repeat right;
      background-size: contain;
    }

    &.active, &:hover {
      color: $blueGS;
    }

    &.active:before {
      opacity: 1;
    }
  }
}
</style>

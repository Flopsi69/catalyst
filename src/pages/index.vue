<script setup>
import { loadFull } from "tsparticles";
import particleOptions from "~/config/particlesOptions";

const particlesInit = async engine => {
    await loadFull(engine);
};

const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};

definePageMeta({
  layout: false,
  middleware: 'guest'
});

const { address } = useAccount();
const user = useSupabaseUser();

watchEffect(async () => {
  if (user.value) {
    await navigateTo('/quests');
  }
})
</script>

<template>
  <IndexHeader />

  <!-- <client-only>
    <div v-if="user || address" class="debug">
      <p v-if="address">Address: {{ address }}</p>
      <p v-if="user">User: {{ user.id }}</p>
    </div>
  </client-only> -->

  <main class="main">
    <section class="section jumb">
      <ClientOnly>
        <Particles
          id="particles"
          class="jumb__particles"
          :particlesInit="particlesInit"
          :particlesLoaded="particlesLoaded"
          :options="particleOptions"
        />
      </ClientOnly>

      <div class="container jumb__container">
        <IndexIntro class="jumb__info" />
        <IndexActions class="jumb__actions" />

        <img class="jumb__knight" src="@img/knight.png" alt="" />
      </div>
    </section>
  </main>

  <Footer />

  <Modal />
</template>

<style lang="scss" scoped>
.jumb {
  position: relative;
  padding: 110px 0 48px;
  background: url('@img/bg/jumb.jpeg') no-repeat top center;
  background-size: cover;
  overflow: hidden;
  &__particles {
    pointer-events: none;
    &:deep(canvas)  {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    }
  }

  // margin-bottom: -1px;
  &__container {
    display: flex;
    align-items: flex-end;
    @media(max-width: $lg) {
      display: block;
    }
  }

  &__info {
    max-width: 580px;
    width: 100%;
    padding-bottom: 175px;
    @media(max-width: $lg) {
      padding-bottom: 0;
      max-width: 500px;
    }
    @media(max-width: $md) {
      max-width: 100%;
    }
    @media(max-width: $sm) {
      text-align: center;
    }
  }

  &__actions {
    // position: relative;
    // z-index: 1;
    // flex-grow: 1;
    // display: flex;
    // justify-content: flex-end;
    @media(max-width: 1400px) {
      margin-left: -200px;
    }
    @media(max-width: $lg) {
      margin-top: 60px;
      margin-left: 0;
    }
    // @media(max-width: $sm) {
    //   flex-flow: column;
    //   margin-top: 45px;
    // }
  }

  &__knight {
    position: absolute;
    max-width: initial;
    max-height: initial;
    pointer-events: none;
    top: -1.4vw;
    width: 137vw;
    right: -12vw;
    @media(min-width: 1800px) {
      width: 102vw;
      right: -1vw;
    }
    @media(max-width: 1400px) {
      top: initial;
      bottom: 0;
      width: 120vw;
      right: -10vw;
    }
    @media(max-width: $lg) {
      width: 130vw;
    }
    @media(max-width: $md) {
      display: none;
      z-index: -1;
    }
  }
}
</style>

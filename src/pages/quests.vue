<script lang="ts" setup></script>

<template>
  <section class="section metrics">
    <div class="container metrics__container">
      <QuestMetric />
    </div>
  </section>

  <QuestControl class="section" />

  <section class="section recommended">
    <div class="container">
      <div class="recommended__inner plate plate_bg1">
        <div class="plate__title-wrap text-center">
          <div class="plate__title fw-500 uppercase">Recommended</div>
        </div>

        <!-- List -->
        <div class="plate__list">
          <QuestCard v-for="card in 6" />
        </div>
      </div>
    </div>
  </section>

  <section class="section community">
    <div class="container">
      <div class="community__inner plate plate_bg2">
        <div class="plate__title-wrap text-center">
          <div class="plate__title fw-500 uppercase">Community picks</div>
        </div>

        <!-- List -->
        <div class="plate__list">
          <QuestCard @click="$modal.show('reward')" v-for="card in 6" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section  {
  margin-bottom: 8px;
  @media(max-width: $md) {
    margin-bottom: 15px;
  }
}

.plate {
  border: 1px solid $gray600;
  border-radius: 12px;
  background-color: #161528;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 24px 30px;
  @media(max-width: $sm) {
    padding: 20px 15px;
  }

  &_bg1 {
    background-image: url('@img/bg/plate1.svg');
  }

  &_bg2 {
    background-image: url('@img/bg/plate2.svg');
  }

  &__title {
    font-family: $f-un;
    font-size: 18px;
    background: url('@img/icons/thumb-up.svg') left no-repeat;
    background-size: 24px;
    padding-left: 32px;
    display: inline-block;
    .community & {
      background: url('@img/icons/case.svg') left no-repeat;
      background-size: 22px;
      padding-left: 30px;
    }
  }

  &__list {
    margin-top: 32px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 9px 28px;
    @media(max-width: $lg) {
      gap: 12px;
    }
    @media(max-width: $md) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media(max-width: $sm) {
      grid-template-columns: 1fr;
      margin-top: 25px;
    }
  }
}

.metrics {
  &__container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    @media(max-width: $lg) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>

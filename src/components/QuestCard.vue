<script setup>
const props = defineProps({
  quest: {
    type: Object,
    required: true,
    default: () => ({
      title: String,
      caption: String,
      img: String,
      lvl: Number,
      isActive: Boolean,
      rewards: Object,
    })
  }
})
</script>

<template>
  <!-- btn-activator -->
  <!-- @click.prevent="quest.isActive ? $modal.show('reward') : null" -->

  <div
    class="card overflow-hidden"
    :class="[quest.isActive ? 'active' : 'disabled' ]"
    :style="`background-image: url(/images/quests/${quest.img})`"
  >
    <div class="card__lvl text-center fw-700 uppercase lh-1">
      <div class="card__lvl-value">{{ quest.lvl }}</div>
      <div class="card__lvl-caption">lvl</div>
    </div>

    <div class="card__head">
      <div class="card__title fw-900 uppercase">{{ quest.title }}</div>
      <div class="card__caption fw-700">{{ quest.caption }}</div>
    </div>

    <div class="card__info">
      <div class="card__metrics flex flex-wrap fw-700">
        <div v-for="reward in quest.rewards" class="card__metric">
          <img
            class="card__metric-icon"
            :src="`/images/rewards/icon-${reward.icon}`"
            alt=""
          />
          <span class="card__metric-value">{{ reward.value }}</span>
        </div>
      </div>

      <div v-if="quest.isActive" class="card__buttons">
        <a
          href="https://twitter.com/intent/user?screen_name=NASA"
          target="_blank"
          class="btn btn-gray btn-arrow card__btn w-100"
        >
          <span>Join telegram</span>
        </a>

        <button class="btn btn-gray btn-arrow card__btn w-100">
          <span>Verify</span>
        </button>
      </div>

      <button v-else class="btn btn-gray btn-arrow card__btn w-100">
        <span>Soon</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  border-radius: 12px;
  min-height: 275px;
  background: url('@img/bg/card-temp3.png') center no-repeat;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  cursor: pointer;
  transition: $transition;
  &.disabled {
    pointer-events: none;
  }
  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 95px;
    right: 0;
    top: 0;
    background: linear-gradient(180deg, rgba(11, 14, 23, 0) 27%, $dark 80%);
    transition: $transition;
  }

  &:not(.disabled):hover {
    transform: translateY(-5px);
    &:before {
      // background: linear-gradient(180deg, rgba(11, 14, 23, 0) 27%, $gray600 80%);
      // opacity: 0;
    }
  }


  &__lvl {
    position: absolute;
    width: 42px;
    height: 37px;
    right: 30px;
    top: 0;
    padding-top: 4px;
    background-image: url('@img/bg/lvl.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    letter-spacing: -0.02em;
    font-size: 13px;
    .card.disabled & {
      background-image: url('@img/bg/lvl-red.svg');
    }
    &-caption {
      font-size: 11px;
    }
  }

  &__title {
    font-size: 14px;
    font-family: $f-un;
  }

  &__caption {
    margin-top: 6px;
    font-size: 14px;
  }

  &__head {
    position: relative;
    padding: 0 18px;
  }

  &__info {
    position: relative;
    padding: 5px 18px 25px;
    background-color: $dark;
    // transition: $transition;
    .card:not(.disabled):not(.active):hover & {
      background-color: $gray600;
    }
    // background: linear-gradient(180deg, $dark 0%, $dark 100%);
  }

  &__metrics {
    margin: 0 -4px;
    // margin-top: 10px;
  }

  &__metric {
    display: flex;
    align-items: center;
    background: $gray600;
    border-radius: 128px;
    padding: 2px;
    line-height: 1;
    margin: 5px 4px;
    min-height: 28px;
    &-icon {
      width: 24px;
    }

    &-value {
      font-size: 13px;
      margin-left: 5px;
      letter-spacing: -0.02em;
      padding-right: 8px;
    }
  }

  &__btn {
    margin-top: 17px;
    min-height: 44px;
    font-size: 14px;
    line-height: 1.4;
  }

  &__buttons {
    display: flex;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
}
</style>

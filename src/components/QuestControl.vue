<script setup>
import fireIcon from "@img/icons/fire.svg?component"
import timeIcon from "@img/icons/time.svg?component"
import filterIcon from "@img/icons/filter.svg?component"
import closeIcon from "@img/icons/close.svg?component"

const sort = ref('trending')
</script>

<template>
  <section class="control">
    <div class="container">
      <div class="control__inner head-decor flex align-center">
        <div class="control__col rewards flex align-center">
          <div class="rewards__caption uppercase fw-900">Daily reward</div>

          <div class="rewards__stars flex align-center lh-0">
            <div class="rewards__star"></div>
            <div class="rewards__star"></div>
            <div class="rewards__star"></div>
            <div class="rewards__star"></div>
            <div class="rewards__star"></div>
            <div class="rewards__star"></div>
          </div>
        </div>

        <div class="control__col title uppercase fw-900 text-center">
          Quests
        </div>

        <div class="control__col flex justify-end height-100 prevent-select">
          <div class="toggler fw-700 flex">
            <div
              class="toggler__item"
              :class="{ active: sort === 'trending' }"
              @click="sort = 'trending'"
            >
              <fire-icon width="14" />
              Trending
            </div>

            <div
              class="toggler__item"
              :class="{ active: sort === 'newest' }"
              @click="sort = 'newest'"
            >
              <time-icon width="16" />
              Newest
            </div>
          </div>

          <dropdown class="filter" placement="right">
            <template #trigger="{ isActive }">
              <div class="filter__icon">
                <close-icon v-if="isActive" />
                <filter-icon v-else />
              </div>
              <span class="filter__value fw-700">Filters</span>
            </template>
            <template #body>
              <div class="filter__item">Available</div>
              <div class="filter__item">Missed</div>
              <div class="filter__item">In Progress</div>
              <div class="filter__item">All Status</div>
            </template>
          </dropdown>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.control {
  &__col {
    flex: 1;
  }
  &__inner {
    @media(max-width: $md) {
      padding-top: 16px;
      padding-bottom: 16px;
      height: auto;
      flex-flow: column;
      margin: 0;
      border: 1px solid #27233E;
      border-radius: 12px;
      &:before, &:after {
        display: none;
      }
    }
  }
}

.title {
  font-size: 18px;
  font-family: $f-un;
  margin: 0 24px;
  @media (max-width: $md) {
    font-size: 16px;
    margin-bottom: 15px;
  }
}

.rewards {
  @media (max-width: $md) {
    padding-bottom: 12px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba($gray900, .5);
  }
  &__caption {
    font-family: $f-un;
    font-size: 18px;
    white-space: nowrap;
    @media (max-width: $lg) {
      font-size: 14px;
    }
    @media (max-width: $sm) {
      font-size: 12px;
      margin-bottom: -3px;
    }
  }

  &__stars {
    margin-left: 24px;
    @media (max-width: $sm) {
      margin-left: 10px;
    }
  }

  &__star {
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 18px;
    height: 18px;
    @media (max-width: $sm) {
      width: 14px;
      height: 14px;
    }
    &:not(:last-child) {
      background-image: url('@img/icons/star.svg');
      &.active {
        background-image: url('@img/icons/star-gradient.svg');
      }
    }

    &:last-child {
      background-image: url('@img/icons/treasure.svg');
      width: 24px;
      height: 24px;
      @media (max-width: $sm) {
        width: 20px;
        height: 20px;
      }
    }

    & + & {
      margin-left: 16px;
      @media (max-width: $sm) {
        margin-left: 12px;
      }
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: -12px;
        background: $gray900;
        border-radius: 128px;
        width: 8px;
        height: 2px;
        transition: $transition;
        @media (max-width: $sm) {
          widows: 5px;
          left: -10px;
        }
      }
    }

    &.active + &.active {
      &:before {
        background: $blueG;
      }
    }
  }
}

.toggler {
  background: $dark;
  border-radius: 8px;
  padding: 4px;
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 135px;
    font-size: 13px;
    text-align: center;
    letter-spacing: -0.02em;
    height: 100%;
    border-radius: 8px;
    transition: $transition;
    fill: $gray900;
    @media (max-width: $lg) {
      width: 100px;
    }
    @media (max-width: $md) {
      width: auto;
      padding: 5px 20px;
    }
    @media(max-width: $sm) {
      padding: 5px 15px;
    }
    & + & {
      margin-left: 5px;
    }

    &:hover {
      background-color: $gray600;
    }

    &:not(.active) {
      cursor: pointer;
    }

    &.active {
      background: $blueG;
      fill: rgba(#fff, .7);
    }

    svg {
      margin-right: 5px;
      margin-top: -1px;
      fill: inherit;
    }
  }
}

.filter {
  margin-left: 12px;
  &:deep(.dropdown__trigger) {
    padding: 2px 20px;
    background: $dark;
    fill: $gray900;
    border-radius: 8px;
    height: 100%;
    display: flex;
    align-items: center;
    &:hover {
      color: $blueGS;
      fill: $blueGS;
    }
  }

  &:deep(.dropdown__body) {
    padding: 15px;
  }

  &.active:deep(.dropdown__trigger) {
    background: $blueG;
    color: $white;
    fill: $white;
  }

  &__icon {
    pointer-events: none;
    text-align: center;
    line-height: 0;
    margin-right: 7px;
    margin-top: -1px;
    width: 17px;
    height: 12px;
    max-height: 12px;
    @media(max-width: $sm) {
      margin-right: 0;
    }
    svg {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &__value {
    letter-spacing: -0.02em;
    font-size: 13px;
    @media(max-width: $sm) {
      display: none;
    }
  }

  &__item {
    font-weight: 700;
    white-space: nowrap;
    font-size: 14px;
    transition: $transition;
    cursor: pointer;
    padding: 3px;
    &:hover {
      color: $blueGS;
    }
    & + & {
      margin-top: 12px;
    }
  }
}
</style>

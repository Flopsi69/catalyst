<script></script>

<template>
  <div
    class="card btn-activator overflow-hidden"
    @click="$modal.show('reward')"
  >
    <div class="card__lvl text-center fw-700 uppercase lh-1">
      <div class="card__lvl-value">10</div>
      <div class="card__lvl-caption">lvl</div>
    </div>

    <div class="card__head">
      <div class="card__title fw-900 uppercase">Ethereum wetlands</div>
      <div class="card__caption fw-700">Partner Label</div>
    </div>

    <div class="card__info">
      <div class="card__metrics flex flex-wrap fw-700">
        <div class="card__metric">
          <img class="card__metric-icon" src="@img/labels/xp.svg" alt="" />
          <span class="card__metric-value">100</span>
        </div>

        <div class="card__metric">
          <img class="card__metric-icon" src="@img/labels/sand.svg" alt="" />
          <span class="card__metric-value">100</span>
        </div>

        <div class="card__metric">
          <img class="card__metric-icon" src="@img/labels/nft.svg" alt="" />
          <span class="card__metric-value">NFT</span>
        </div>
      </div>

      <button class="btn btn-gray btn-arrow card__btn w-100">
        <span>Open</span>
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
  background-size: cover;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  cursor: pointer;
  transition: $transition;
  &:nth-child(3n) {
    background: url('@img/bg/card-temp.png') center no-repeat;
    background-size: cover;
  }
  &:nth-child(2n) {
    background: url('@img/bg/card-temp2.png') center no-repeat;
    background-size: cover;
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

  &:hover {
    transform: translateY(-5px);
    &:before {
      background: linear-gradient(180deg, rgba(11, 14, 23, 0) 27%, $gray600 80%);
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
    background: url('@img/bg/lvl.svg') center no-repeat;
    background-size: contain;
    letter-spacing: -0.02em;
    font-size: 13px;
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
    .card:hover & {
      background-color: $gray600;
    }
    // background: linear-gradient(180deg, $dark 0%, $dark 100%);
  }

  &__metrics {
    margin: 0 -4px;
    // margin-top: 10px;
  }

  &__metric {
  }

  &__metric {
    display: flex;
    align-items: center;
    background: $gray600;
    border-radius: 128px;
    padding: 2px;
    line-height: 1;
    margin: 5px 4px;
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
  }
}
</style>

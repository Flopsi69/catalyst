<script setup>
let hours = ref('00');
let minutes = ref('00');
let seconds = ref('00')

function countdownTimer(duration) {
  let timer = duration;

  setInterval(function () {
    hours.value = parseInt(timer / 3600, 10);
    minutes.value = parseInt((timer % 3600) / 60, 10);
    seconds.value = parseInt((timer % 3600) % 60, 10);

    hours.value = hours.value < 10 ? "0" + hours.value : hours.value;
    minutes.value = minutes.value < 10 ? "0" + minutes.value : minutes.value;
    seconds.value = seconds.value < 10 ? "0" + seconds.value : seconds.value;

    // display.textContent = hours + ":" + minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }

    // console.log(hours.value + ":" + minutes.value + ":" + seconds.value)
  }, 1000);
}

// defineProps({
//   character: {
//     type: Object,
//     required: true,
//     default: {

//     }
//   },
// });

const { data: character } = await useFetch('/api/character');
console.log('character', character.value);
if (!character.value) {
  console.debug('navigate to character')
  // navigateTo('/character');
}

onMounted(() => {
  countdownTimer(3510);
});
</script>

<template>
  <!-- 1 -->
  <div v-if="character" class="metric player">
    <img
      v-if='character.sex === "male"'
      class="player__image player__image_male"
      src="@img/temp/man.gif"
      alt=""
    />
    <img
      v-if='character.sex === "female"'
      class="player__image player__image_female"
      src="@img/temp/woman.png"
      alt=""
    />

    <div class="metric__info text-center">
      <div class="metric__logo">
        <div class="metric__lvl lh-1 fw-700 flex justify-center align-center">
          1
        </div>
      </div>

      <div class="metric__title uppercase fw-900">{{character.nickname}}</div>

      <div class="metric__progress flex">
        <span></span>
      </div>

      <div class="metric__value flex justify-center fw-700 align-end">
        <span class="metric__value-current color-blueG">0</span>
        <span class="metric__value-divider">/</span>
        <span class="metric__value-total">3000</span>
      </div>
    </div>
  </div>

  <!-- 2 -->
  <div class="metric">
    <div class="metric__info text-center">
      <div class="metric__logo">
        <div class="metric__lvl lh-1 fw-700 flex justify-center align-center">
          18
        </div>
        <img src="@img/rewards/battle.png" alt="" />
      </div>

      <div class="metric__title uppercase fw-500">Battle pass</div>

      <div class="metric__progress flex">
        <span></span>
      </div>

      <div class="metric__value flex justify-center fw-700 align-end">
        <span class="metric__value-current color-blueG">0</span>
        <span class="metric__value-divider">/</span>
        <span class="metric__value-total">3000</span>
      </div>
    </div>
  </div>

  <!-- 3 -->
  <div class="metric">
    <div
      class="metric__level metric__level_red text-center fw-700 uppercase lh-1"
    >
      <div class="metric__level-value">5</div>
      <div class="metric__level-caption">lvl</div>
    </div>

    <div class="metric__info text-center">
      <div class="metric__logo">
        <img src="@img/rewards/dungeon.png" alt="" />
      </div>

      <div class="metric__title uppercase fw-500">Enter the dungeon</div>

      <div class="metric__countdown fw-700 uppercase">
        {{ hours }}
        <span class="color-gray900">:</span>
        {{ minutes }}
        <span class="color-gray900">:</span>
        <span class="color-blueG">{{ seconds }}</span>
      </div>
    </div>
  </div>

  <!-- 4 -->
  <div class="metric">
    <div
      class="metric__level metric__level_red text-center fw-700 uppercase lh-1"
    >
      <div class="metric__level-value">10</div>
      <div class="metric__level-caption">lvl</div>
    </div>

    <div class="metric__info text-center">
      <div class="metric__logo">
        <img src="@img/rewards/guild.png" alt="" />
      </div>

      <div class="metric__title uppercase fw-500">Join the guild</div>

      <button class="btn btn-blue metric__btn">Guild Master</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.metric {
  position: relative;
  min-height: 190px;
  padding: 24px 12px;
  border-radius: 12px;
  background: $darkGradient;
  background-size: cover;
  background-position: bottom;
  &:not(.player):before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(#1546FF, 0.7) 0%, rgba(#76E1F9, 0.7) 100%);
    filter: blur(32px);
    border-radius: inherit;
    z-index: -1;
    pointer-events: none;
    opacity: 0;
    transition: $transition;
  }
  &:not(.player):hover:before {
    opacity: 1;
  }
  &:nth-child(1)  {
    background-image: url('@img/bg/metric-player.png');
  }
  &:nth-child(2)  {
    background-image: url('@img/bg/metric-battle-pass.png');
  }
  &:nth-child(3)  {
    background-image: url('@img/bg/metric-dungeon.png');
  }
  &:nth-child(4)  {
    background-image: url('@img/bg/metric-guild.png');
  }

  &__info {
    position: relative;
    z-index: 2;
  }

  &__title {
    font-family: $f-un;
    margin-top: 8px;
    @media(max-width: $sm) {
      font-size: 12px
    }
    .player & {
      font-size: 18px;
      @media(max-width: $sm) {
        font-size: 14px;
      }
    }
  }

  &__logo {
    position: relative;
    width: 64px;
    height: 64px;
    margin: auto;
    img {
      // max-width: 77%;
      // max-height: 77%;
    }
  }

  &__lvl {
    position: absolute;;
    width: 36px;
    height: 42px;
    background: url('@img/bg/reward-value.svg') center no-repeat;
    background-size: contain;
    top: -9px;
    right: -20px;
    padding-top: 1px;
    letter-spacing: -0.32px;
  }

  &__level {
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
    @media(max-width: $sm) {
      right: 0;
    }
    &_red {
      background-image: url('@img/bg/lvl-red.svg');
    }
    &-caption {
      font-size: 11px;
    }
  }

  &__progress {
    overflow: hidden;
    background: $dark;
    box-shadow: inset 0px 4px 12px #3F4D80;
    border-radius: 128px;
    height: 10px;
    max-width: 178px;
    width: 100%;
    margin: 9px auto 0;
    @media(max-width: $sm) {
      height: 7px;
    }
    span {
      width: 1%;
      border-radius: 128px;
      background: $blueG;
    }
  }

  &__value {
    font-size: 11px;
    margin-top: 12px;
    letter-spacing: -0.02em;
    &-current {
      font-size: 14px;
      letter-spacing: 0;
    }
    &-divider {
      margin: 0 2px;
    }
  }

  &__countdown {
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(1px);
    border-radius: 8px;
    padding: 6px 12px;
    margin-top: 8px;
    display: inline-flex;
    justify-content: center;
    font-size: 18px;
    font-family: $f-un;
    letter-spacing: 1px;
    @media(max-width: $sm) {
      font-size: 16px;
      max-width: 140px;
      width: 100%;
    }
  }

  &__btn {
    margin-top: 14px;
    font-size: 13px;
    letter-spacing: -0.02em;
    padding: 10px 20px;
    @media(max-width: $sm) {
      font-size: 12px;
      padding: 8px 16px;
    }
  }
}

.player {
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(#000, .6);
    filter: blur(24px);
    height: 60px;
    z-index: 1;
  }
  &__image {
    position: absolute;
    pointer-events: none;
    top: 15%;
    left: -10%;
    right: 0;
    transform: scale(1.2);
    max-height: initial;
    &_female {
      left: 0;
    }
  }
}
</style>

<script setup>
// import * as Spine from "@esotericsoftware/spine-webgl";

// import * from "@esotericsoftware/spine-webgl";
// import manOptions from "~/config/spine/man/options";
import { useToast } from "vue-toastification";
import incrypt from "@img/character/incrypt-descr.png";
import paladin from "@img/character/paladin-descr.png";
import human from "@img/character/human.png";
import iconArrow from "@img/icons/arrow-bold.svg?component";
import { navigateTo } from "nuxt/app";

definePageMeta({
  layout: false,
  middleware: ['auth']
});

const { data: character} = await useFetch('/api/character');
console.log('character', character.value);

if (character.value) {
  navigateTo('/quests');
}

const toast = useToast();

const activeRace = ref(null);
const activeClass = ref(null);
const activeSex = ref(null);
const nickname = ref('');
const stepsCount = ref(3);
const step = ref(1);


const racesDescr = reactive([
  {
    title: 'Incrypt',
    descr: 'Incrypt is the world of web3 technomagic of the Middle Ages. During the last war, several elven aircraft carrying poisonous mixtures fell into the Ethereum Swamps, poisoning the soil. A few years later,',
    img: incrypt
  },
  {
    title: 'Human',
    descr: 'People are interested in the elven ruins. The Magical Council believes that the ruins may contain blueprints for flying devices, research on energy crystals, information on new currencies, equipment for mining them, and other materials that will help mankind achieve technological progress.',
    img: human
  },
  {
    title: 'Paladin',
    descr: 'Paladins of the Order of Layla, advocate the preservation of old customs and minimal intrusion of magic into people\'s lives. A paladin is a warrior of Light, the protector of the weak and a tireless opponent of evil. Protecting all that is good and pure in this world, he eradicates all that is evil. His ability to eradicate the undead is particularly strong: these creatures threaten the very existence of all good races, and the Order of Layla simply incinerates them. The existence of all evil is intolerable to a paladin, but demons and the undead certainly rank first among these evils.',
    img: paladin
  }
]);



async function handlePlay() {
  let error = null;

  if (!nickname.value) {
    error = 'Nickname is required';
  } else if (nickname.value.length <= 3) {
    error = 'Nickname is too short. Minimum 3 characters';
  } else if (nickname.value.length > 12) {
    error = 'Nickname is too long. Maximum 12 characters';
  } else if (nickname.value == 'admin') {
    error = 'Nickname is already taken';
  }

  if (error) {
    toast.error(error);
    return false;
  }

  const character = await $fetch('/api/character', {
    method: 'post',
    body: {
      race: activeRace.value.type,
      nickname: nickname.value,
      sex: activeSex.value,
    }
  })

  if (character) {
    console.log('character', character);
    navigateTo('/quests')
  }
}
</script>

<template>
  <main class="main flex-center">
    <!-- <div class="debug debug_brief">
      <p>Nick: {{ nickname }} {{ nickname.length }}</p>
      <p>Race: {{ activeRace }}</p>
      <p>Sex: {{ activeSex }}</p>
    </div> -->
    <div class="main__desk container flex justify-between">
      <!-- <img src="@img/bg/character-video-placeholder.png" alt="" /> -->
      <div class="params plate">
        <div class="params__logo lh-0">
          <img src="@img/logo-blue.png" alt="" />
        </div>

        <div class="params__races-wrap">
          <div class="caption">Choose a character's race</div>

          <CharacterRace
            @updateRace="(val)=>{activeRace = val}"
            class="params__races bg-dark flex-wrap flex-between"
          />
        </div>

        <div class="params__props soon">
          <div class="caption">Character customization</div>

          <CharacterProps class="params__props-list" />
        </div>

        <button class="btn btn-dark params__apply w-100 soon">
          Customization
        </button>

        <button class="btn btn-blue params__randomize flex-center w-100 soon">
          <img src="@img/icons/randomize.svg" alt="" />
          Randomize
        </button>
      </div>

      <div class="character">
        <div class="character__head ">
          <CharacterSex
            @updateSex="(val)=>{activeSex= val}"
            class="flex-between"
          />

          <div class="name">
            <div class="name__inner">
              <input
                @input="nickname = nickname.replace(/\s/g, '')"
                @keydown.space.prevent
                :maxlength="12"
                v-model.trim="nickname"
                class="name__input fw-700 w-100 text-center"
                type="text"
                placeholder="Nickname"
              />
            </div>
          </div>
        </div>

        <ClientOnly>
          <div class="avatar" :class="`avatar_${activeSex}`" id="avatar">
            <img v-if="activeSex === 'male'" src="@img/temp/man.gif" alt="" />
            <img v-else src="@img/temp/woman.png" alt="" />
          </div>
        </ClientOnly>

        <div v-if="false" class="character__class plate">
          <div class="class__caption text-center fw-700">
            Choose a character class
          </div>

          <CharacterClass class="character__class-list flex-center" />
        </div>
      </div>

      <div class="info">
        <div
          v-for="race of racesDescr"
          class="race plate flex flex-column overflow-hidden"
        >
          <div class="race__head flex align-center">
            <img class="race__logo" :src="race.img" alt="" />
            <div class="race__title fw-900 uppercase">{{ race.title }}</div>
          </div>
          <div class="race__descr fw-700">
            {{ race.descr }}
          </div>
        </div>

        <button
          @click="handlePlay"
          class="btn btn-blue btn-arrow info__play w-100 uppercase"
        >
          <span>Play</span>
        </button>
      </div>
    </div>

    <div class="main__mob container">
      <div class="avatar" :class="`avatar_${activeSex}`" id="avatar">
        <img v-if="activeSex === 'male'" src="@img/temp/man.gif" alt="" />
        <img v-else src="@img/temp/woman.png" alt="" />
      </div>

      <div class="steps">
        <div class="step">
          <div v-if="step === 1" class="plate step__plate">
            <div class="pagination flex-center">
              <div
                v-for="i in stepsCount"
                class="pagination__item"
                :class="{active: i === step}"
              ></div>
            </div>

            <div class="caption">Choose your gender</div>

            <CharacterSex
              @updateSex="(val)=>{activeSex= val}"
              class="flex-center step__sex"
            />
          </div>

          <div v-else-if="step === 2" class="plate step__plate">
            <div class="pagination flex-center">
              <div
                v-for="i in stepsCount"
                class="pagination__item"
                :class="{active: i === step}"
              ></div>
            </div>

            <div class="caption">Choose a character's race</div>

            <CharacterRace
              @updateRace="(val)=>{activeRace = val}"
              class="flex race-list"
            />

            <div class="race-list__divider"></div>

            <ClientOnly>
              <template v-if="activeRace">
                <div class="race-list__value uppercase fw-900">
                  {{ activeRace.type }}
                </div>
                <div class="race-list__descr fw-700">
                  {{ activeRace.descr }}
                </div>
              </template>
            </ClientOnly>
          </div>

          <!-- <div v-else-if="step === 3" class="plate step__plate">
            <div class="pagination flex-center">
              <div
                v-for="i in stepsCount"
                class="pagination__item"
                :class="{active: i === step}"
              ></div>
            </div>

            <div class="caption">Choose a character class</div>

            <CharacterClass
              @updateRace="(val)=>{activeClass = val}"
              class="flex-center"
            />

            <div class="race-list__divider"></div>

            <ClientOnly>
              <template v-if="activeClass">
                <div class="race-list__value uppercase fw-900">
                  {{ activeClass.type }}
                </div>
                <div class="race-list__descr fw-700">
                  {{ activeClass.descr }}
                </div>
              </template>
            </ClientOnly>
          </div> -->

          <!-- <div v-else-if="step === 3" class="plate step__plate">
            <div class="pagination flex-center">
              <div
                v-for="i in stepsCount"
                class="pagination__item"
                :class="{active: i === step}"
              ></div>
            </div>

            <CharacterProps />
          </div> -->
          <div v-else-if="step === 3" class="plate step__plate">
            <div class="pagination flex-center">
              <div
                v-for="i in stepsCount"
                class="pagination__item"
                :class="{active: i === step}"
              ></div>
            </div>

            <div class="caption">Enter the character's nickname</div>

            <div class="name">
              <div class="name__inner">
                <input
                  @input="nickname = nickname.replace(/\s/g, '')"
                  @keydown.space.prevent
                  :maxlength="12"
                  v-model.trim="nickname"
                  class="name__input fw-700 w-100 text-center"
                  type="text"
                  placeholder="Nickname"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Steps control -->
        <div class="control">
          <button
            class="btn btn-dark control__btn flex-center control__btn-prev uppercase"
            :class="{disabled: step === 1}"
            @click="step = step > 1 ? step - 1 : step"
          >
            <icon-arrow />
            Back
          </button>

          <button
            class="btn btn-blue control__btn flex-center control__btn-next uppercase"
            @click="step < stepsCount ? step++ : handlePlay()"
          >
            {{ step < stepsCount ? "Next" : "Play" }} {{ step }} /
            {{ stepsCount }}
            <icon-arrow />
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.soon {
  filter: grayscale(1);
  // opacity: .9;
  pointer-events: none;
}
.main {
  position: relative;
  padding: 24px 0;
  min-height: 100vh;
  background: url('@img/bg/character.jpeg') no-repeat center top;
  background-size: cover;
  @media(max-width: $md) {
    background: url('@img/bg/character-mob.jpeg') no-repeat center;
    background-size: cover;
    padding-bottom: 120px;
    &:after {
      position: absolute;
      height: 200px;
      bottom: 0;
      left: 0;
      right: 0;
      background: #070B1A;
      box-shadow: 0px 0px 24px 18px #070B1A;
    }
  }

  &__desk {
    @media(max-width: $md) {
      display: none;
    }
  }
  &__mob {
    display: none;
    @media(max-width: $md) {
      display: block;
    }
  }
}

.caption {
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  @media(max-width: $md) {
    margin-bottom: 16px;
  }
}

.plate {
  position: relative;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 18px;
  padding: 13px 32px;
  backdrop-filter: blur(16px);
  border-width: 4px;
  border-style: solid;
  border-image:
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 10%,
      #177AF7 50%,
      rgba(0, 0, 0, 0) 90%
    ) 1 100%;
}

.params {
  width: 292px;
  padding: 0 24px 24px;
  margin-top: 50px;
  &__logo {
    position: relative;
    margin-top: -50px;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: url('@img/logo-blue.png') no-repeat center;
      filter: blur(22px);
      background-size: contain;
      pointer-events: none;
    }
  }

  &__races {
    padding: 15px;
    border-radius: 32px;
    &-wrap {
      margin-top: 24px;
    }
  }

  &__props {
    margin-top: 32px;
    &-list {
      margin-top: 18px;
    }
  }

  &__apply {
    height: 55px;
    margin-top: 16px;
  }

  &__randomize {
    height: 55px;
    margin-top: 12px;
    img {
      margin-right: 5px;
    }
  }
}

.race-list {
  overflow-x: auto;
  padding: 20px 24px;
  margin: -20px -24px;
  gap: 12px;

  &__divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(114, 111, 155, 0.15) 0%, rgba(114, 111, 155, 0.50) 48.96%, rgba(114, 111, 155, 0.15) 100%);
    margin: 20px 0 12px;
  }

  &__value {
    font-family: $f-un;
    font-size: 14px;
  }

  &__descr {
    margin-top: 14px;
    font-size: 13px;
    letter-spacing: -0.26px;
  }
}

.character {
  margin-top: 15px;
  &__head {
    width: 164px;
    margin: auto;
  }
  &__class {
    margin-top: 10px;
    &-list {
      margin-top: 20px;
    }
  }
}

.name {
  margin-top: 20px;
  border-radius: 18px;
  background: #000 linear-gradient(to bottom, rgba(0, 0, 0, 0) 5%, #177AF7 50%, rgba(0, 0, 0, 0) 95%);
  @media(max-width: $md) {
    max-width: 175px;
    margin: 24px auto 0;
  }
  &__inner {
    width: calc(100% - 8px);
    margin: auto;
    border-radius: 20px;
    background: #000;
  }
  &__input {
    height: 56px;
    color: #fff;
  }
}

.avatar {
  text-align: center;
  margin-top: 30px;
  @media(max-width: 992px) {
    margin-top: 0;
  }
  img {
    max-height: 555px;
    @media(max-width: 992px) {
      max-height: 70vh;
    }
  }
  &_male {
    img {
      margin-left: -15%;
    }
  }
}

.info {
  max-width: 292px;
  width: 100%;

  &__play {
    font-family: $f-un;
    font-weight: 900;
    font-size: 18px;
    height: 64px;
    margin-top: 30px;
    box-shadow: 0px 0px 24px 0px #00A3FF inset;
  }
}

.race {
  height: 220px;
  & + & {
    margin-top: 24px;
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 14px;
    background: #070D23;
    box-shadow: 0px 0px 24px 18px #070D23;
  }

  &__head {
    position: relative;
    padding-bottom: 10px;
    &:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(90deg, rgba(114, 111, 155, 0.15) 0%, rgba(114, 111, 155, 0.5) 48.96%, rgba(114, 111, 155, 0.15) 100%);
      height: 1px;
    }
  }

  &__logo {
    border-radius: 50%;
    margin-right: 10px;
    width: 48px;
  }

  &__title {
    font-family: $f-un;
    font-size: 18px;
  }

  &__descr {
    margin-top: 18px;
    padding-bottom: 25px;
    font-size: 13px;
    letter-spacing: -0.02em;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 6px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      border-radius: 128px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: $gray900;
      border-radius: 128px;
    }
  }
}

.control {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 17px;
  margin-top: 12px;
  &__btn {
    font-family: $f-un;
    font-size: 18px;
    font-weight: 900;
    border-radius: 18px;
    padding: 18px 10px;
    &.disabled {
      pointer-events: none;
      opacity: 0.3;
    }

    svg {
      fill: $white;
      width: 18px;
      margin-left: 10px;
    }

    &-prev {
      border: 1px solid $gray600;
      svg {
        margin-left: 0;
        margin-right: 10px;
        transform: rotate(180deg);
        fill: $gray700;
      }
    }

  }
}

.steps {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
}

.step {
  &__plate {
    padding: 24px;
  }

  &__sex {
    margin-top: 25px;
    padding-bottom: 10px;
    gap: 24px;
  }
}

.pagination {
  margin-bottom: 18px;
  &__item {
    position: relative;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid $white;
    opacity: 0.3;
    transition: $transition;
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $white;
      transition: $transition;
      opacity: 0;
    }
    &.active {
      border-color: $white;
      opacity: 1;
      &:before {
        opacity: 1;
      }
    }
    & + & {
      margin-left: 8px;
    }
  }
}
</style>

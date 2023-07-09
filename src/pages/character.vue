<script setup>
import incrypt from "@img/character/incrypt-descr.png";
import paladin from "@img/character/paladin-descr.png";

import orc from "@img/character/orc.png";
import elf from "@img/character/elf.png";
import human from "@img/character/human.png";
import dwarf from "@img/character/dwarf.png";
import undead from "@img/character/undead.png";
import goblin from "@img/character/goblin.png";

import class1 from "@img/character/class1.png";
import class2 from "@img/character/class2.png";

definePageMeta({
  layout: false,
});

const races = reactive([
  {
    type: 'orc',
    img: orc,
  },
  {
    type: 'elf',
    img: elf,
  },
  {
    type: 'human',
    img: human,
  },
  {
    type: 'dwarf',
    img: dwarf,
  },
  {
    type: 'undead',
    img: undead,
  },
  {
    type: 'goblin',
    img: goblin,
  },
])

const classes = reactive([
  {
    type: 'class1',
    img: class1,
  },
  {
    type: 'class2',
    img: class2,
  }
])

const activeClass = ref('class1');
const activeRace = ref('elf');
const sex = ref('male');

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

const properties = reactive([
  {
    active: 'Skin Color',
    list: [
      'Skin Color 1',
      'Skin Color 2',
      'Skin Color 3',
      'Skin Color 4',
      'Skin Color 5',
      'Skin Color 6',
    ]
  },
  {
    active: 'Face',
    list: [
      'Face 1',
      'Face 2',
      'Face 3',
      'Face 4',
      'Face 5',
      'Face 6',
    ]
  },
  {
    active: 'Hair Style',
    list: [
      'Hair Style 1',
      'Hair Style 2',
      'Hair Style 3',
      'Hair Style 4',
      'Hair Style 5',
      'Hair Style 6',
    ]
  },
  {
    active: 'Hair Color',
    list: [
      'Hair Color 1',
      'Hair Color 2',
      'Hair Color 3',
      'Hair Color 4',
      'Hair Color 5',
      'Hair Color 6',
    ]
  }
])
</script>

<template>
  <main class="main">
    <div class="container flex justify-between">
      <!-- <img src="@img/bg/character-video-placeholder.png" alt="" /> -->
      <div class="params plate">
        <div class="params__logo">
          <img src="@img/logo-blue.png" alt="" />
        </div>

        <div class="choose">
          <div class="choose__caption text-center fw-700">
            Choose a character's race
          </div>

          <div
            class="choose__list bg-dark flex-wrap flex-between ju-center text-center"
          >
            <tooltip
              v-for="race in races"
              class="choose__item flex-center pointer"
              :class="{active: activeRace === race.type}"
              @click="activeRace = race.type"
              :text="race.type"
            >
              <img :src="race.img" alt="" />
            </tooltip>
          </div>
        </div>

        <div class="custom">
          <div class="custom__caption text-center fw-700">
            Character customization
          </div>
          <div class="custom__list fw-700 lh-1">
            <div
              v-for="property in properties"
              class="custom__item overflow-hidden"
            >
              <div class="custom__item-inner flex-center property">
                <button class="btn btn-gray property__prev property__arrow">
                  <img src="@img/icons/arrow-solid.svg" alt="" />
                </button>
                <div class="property__value">{{ property.active }}</div>
                <button class="btn btn-gray property__next property__arrow">
                  <img src="@img/icons/arrow-solid.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <button class="btn btn-dark params__apply w-100">Customization</button>

        <button class="btn btn-blue params__randomize flex-center w-100">
          <img src="@img/icons/randomize.svg" alt="" />
          Randomize
        </button>
      </div>

      <div class="character">
        <div class="character__head ">
          <div class="sex flex-between">
            <div
              class="sex__male sex__item flex-center pointer"
              :class="{active: sex === 'male'}"
              @click="sex='male'"
            >
              <img
                v-show="sex === 'male'"
                src="@img/icons/male-active.svg"
                alt=""
              />
              <img v-show="sex === 'female'" src="@img/icons/male.svg" alt="" />
            </div>

            <div
              class="sex__female sex__item flex-center pointer"
              :class="{active: sex === 'female'}"
              @click="sex='female'"
            >
              <img
                v-show="sex === 'female'"
                src="@img/icons/female-active.svg"
                alt=""
              />
              <img v-show="sex === 'male'" src="@img/icons/female.svg" alt="" />
            </div>
          </div>

          <div class="name">
            <div class="name__inner">
              <input
                class="name__input fw-700 w-100 text-center"
                type="text"
                placeholder="Nickname"
              />
            </div>
          </div>
        </div>

        <div class="avatar">
          <!-- <img src="@img/temp/man.gif" alt="" /> -->
          <img src="@img/temp/woman.png" alt="" />
        </div>

        <div class="class plate">
          <div class="class__caption text-center fw-700">
            Choose a character class
          </div>

          <div class="class__list flex-center">
            <div
              v-for="classEl in classes"
              class="class__item flex-center pointer"
              :class="{active: activeClass === classEl.type}"
              @click="activeClass = classEl.type"
            >
              <img :src="classEl.img" alt="" />
            </div>
          </div>
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

        <button class="btn btn-blue btn-arrow info__play w-100 uppercase">
          <span>Play</span>
        </button>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main {
  padding: 24px 0;
  min-height: 100vh;
  background: url('@img/bg/character.jpeg') no-repeat center top;
  background-size: cover;
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

.choose {
  margin-top: 24px;
  &__list {
    padding: 15px;
    border-radius: 32px;
    margin-top: 20px;
  }

  &__item {
    position: relative;
    width: 60px;
    height: 60px;
    &:deep(.tooltip__value) {
      padding: 11px 8px;
      min-width: 65px;
      background-color: $gray600;
      &:before {
        background-color: $gray600;
      }
    }
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      background-image: url('@img/character/bg.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      transition: $transition;
      pointer-events: none;
    }
    &:hover {
      &:before {
        background-image: url('@img/character/bg-hover.svg');
      }
    }
    &:nth-child(1n + 4) {
      margin-top: 16px;
    }

    img {
      width: 45px;
      transition: $transition;
    }

    &.active {
      img {
        width: 48px;
      }

      &:before {
        width: 100px;
        height: 100px;
        background-image: url('@img/character/bg-active.png');
      }
    }
  }
}

.custom {
  margin-top: 32px;
  &__list {
    margin-top: 18px;
  }

  &__item {
    border-radius: 18px;
    background: #000 linear-gradient(to bottom, rgba(0, 0, 0, 0) 5%, #177AF7 50%, rgba(0, 0, 0, 0) 95%);
    &-inner {
      width: calc(100% - 8px);
      margin: auto;
      border-radius: 20px;
      background: #000;
    }
    & + & {
      margin-top: 12px;
    }
  }
}

.property {
  padding: 12px;
  font-size: 14px;
  &__arrow {
    border-radius: 128px;
    width: 42px;
    height: 32px;
    padding: 0 4px 0 0;
  }
  &__prev {
    margin-right: auto;
  }
  &__next {
    margin-left: auto;
    transform: rotate(180deg);
  }
}

.character {
  margin-top: 15px;
  &__head {
    width: 164px;
    margin: auto;
  }
}


.sex {
  &__item {
    position: relative;
    width: 64px;
    height: 64px;
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 64px;
      height: 64px;
      background-image: url('@img/icons/sex-bg.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      transition: $transition;
      pointer-events: none;
    }

    &:hover {
      &:before {
        background-image: url('@img/character/bg-hover.svg');
      }
    }

    img {
      position: relative;
      width: 30px;
    }

    &.active {
      &:before {
        width: 100px;
        height: 100px;
        background-image: url('@img/icons/sex-bg-active.png');
      }
    }
  }
}

.name {
  margin-top: 20px;
  border-radius: 18px;
  background: #000 linear-gradient(to bottom, rgba(0, 0, 0, 0) 5%, #177AF7 50%, rgba(0, 0, 0, 0) 95%);
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
  margin-top: 30px;
  img {
    max-width: 290px;
    margin-left: -8%;
  }
}

.class {
  margin-top: 10px;
  &__list {
    margin-top: 20px;
  }
  &__item {
    position: relative;
    width: 60px;
    height: 60px;
    & + & {
      margin-left: 35px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      background-image: url('@img/character/bg.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      transition: $transition;
      pointer-events: none;
    }

    &:hover {
      &:before {
        background-image: url('@img/character/bg-hover.svg');
      }
    }

    img {
      width: 45px;
      transition: $transition;
    }

    &.active {
      img {
        width: 48px;
      }

      &:before {
        width: 100px;
        height: 100px;
        background-image: url('@img/character/bg-active.png');
      }
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
    margin-top: 50px;
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
</style>

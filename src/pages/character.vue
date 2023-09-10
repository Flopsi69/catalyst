<script setup>
import { useToast } from "vue-toastification";
import iconArrow from "@img/icons/arrow-bold.svg?component";

definePageMeta({
  layout: false,
  middleware: 'auth'
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const store = useCharacterStore();

if (!store.character) {
  await store.getCharacter();
  if (store.character) {
    await navigateTo('/quests')
  }
}
const toast = useToast();

const raceList = reactive([
  {
    type: 'orc',
    img: 'orc',
    descr: 'Orcs are one of the oldest and most advanced races'
  },
  {
    type: 'elf',
    img: 'elf',
    descr: 'Elfs are one of the oldest and most advanced races'
  },
  {
    type: 'human',
    img: 'human',
    descr: 'Humans are one of the oldest and most advanced races'
  },
  // {
  //   type: 'dwarf',
  //   img: dwarf,
  //   descr: 'Dwarfs are one of the oldest and most advanced races'
  // },
  // {
  //   type: 'undead',
  //   img: undead,
  //   descr: 'Undeads are one of the oldest and most advanced races'
  // },
  // {
  //   type: 'goblin',
  //   img: goblin,
  //   descr: 'Goblins are one of the oldest and most advanced races'
  // },
])
const classList = reactive([
  {
    type: 'Paladin',
    img: 'paladin',
    descr: 'Fearless warriors wearing heavy armor use the magic of light to destroy enemies'
  },
  {
    type: 'Mage',
    img: 'mage',
    descr: 'Mages destroy enemies with spells. They do not wear heavy armor, so they are vulnerable in melee fight'
  },
  {
    type: 'Hunter',
    img: 'hunter',
    descr: 'Hunters are seasoned trackers. They are excellent with bow, gun and crossbow'
  }
])

const sex = ref('male');
const face = ref('face1');
const head = ref('head');
const race = ref(raceList[2]);
const characterClass = ref(classList[0]);

const nickname = ref('');
const stepsCount = ref(5);
const step = ref(1);


const descriptions = reactive([
  {
    title: 'Incrypt',
    descr: 'Incrypt is the world of web3 technomagic of the Middle Ages. During the last war, several elven aircraft carrying poisonous mixtures fell into the Ethereum Swamps, poisoning the soil. A few years later,',
    img: '/images/character/incrypt-descr.png'
  },
  {
    title: 'Human',
    descr: 'People are interested in the elven ruins. The Magical Council believes that the ruins may contain blueprints for flying devices, research on energy crystals, information on new currencies, equipment for mining them, and other materials that will help mankind achieve technological progress.',
    img: '/images/character/human-descr.png'
  }
  // {
  //   title: 'Paladin',
  //   descr: 'Paladins of the Order of Layla, advocate the preservation of old customs and minimal intrusion of magic into people\'s lives. A paladin is a warrior of Light, the protector of the weak and a tireless opponent of evil. Protecting all that is good and pure in this world, he eradicates all that is evil. His ability to eradicate the undead is particularly strong: these creatures threaten the very existence of all good races, and the Order of Layla simply incinerates them. The existence of all evil is intolerable to a paladin, but demons and the undead certainly rank first among these evils.',
  //   img: paladin
  // }
]);

const heroSrc = computed(() => {
  return `${sex.value}/${characterClass.value?.img || 'paladin'}-${face.value}${head.value === 'head' ? '' : '-' + head.value}.gif`
})

async function handlePlay() {
  console.log('create character', nickname.value);
  const a = {
    sex: sex.value,
    face: face.value,
    head: head.value,
    race: toRaw(race.value),
    class: toRaw(characterClass.value),
  };

  console.log(a)
  let error = null;

  if (!nickname.value) {
    error = 'Nickname is required';
  } else if (nickname.value.length < 3) {
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

  // todo
  const characterData = {
    nickname: nickname.value,
    sex: sex.value,
    userId: user.value.id,
    json: {
      sex: sex.value,
      face: face.value,
      head: head.value,
      race: race.value,
      class: characterClass.value,
    },
    image: heroSrc.value
  }

  const { data: char, error: charError } = await useAsyncData('character',
  async () => supabase
      .from('characters')
      .insert(characterData)
      .select()
      .single(), { transform: result => result.data }
  )

  if (charError.value) {
    console.log('CharacterPostError:', charError.value)
  }
  if (char.value) {
    console.log('CharacterPost', char.value)
    toast.success(`Welcome to the game, ${char.value.nickname}!`);
    await navigateTo('/quests')
  }
}
</script>

<template>
  <main class="main flex-center">
    <div class="main__desk container flex justify-between">
      <div class="params plate">
        <div class="params__section params__logo lh-0">
          <img src="/images/brand-logo-w.png" alt="" />
          <!-- <img src="@img/logo-blue.png" /> -->
        </div>

        <div class="params__section">
          <div class="caption">Choose Gender</div>

          <CharacterSex
            v-model="sex"
            class="params__plate bg-dark flex-evenly"
          />
        </div>

        <div class="params__section">
          <div class="caption">Choose Race</div>
          <CharacterRace
            v-model="race"
            :items="raceList"
            class="params__plate bg-dark flex-wrap flex-between"
          />
        </div>

        <div class="params__section">
          <div class="caption">Choose Class</div>
          <CharacterClass
            v-model="characterClass"
            :items="classList"
            class="params__plate bg-dark flex-between"
          />
        </div>

        <div class="params__section params__props">
          <div class="caption">Customization</div>
          <CharacterProps
            v-model:face="face"
            v-model:head="head"
            class="params__props-list"
          />
        </div>

        <!-- <button class="btn btn-dark params__apply w-100 soon">
          Customization
        </button>

        <button class="btn btn-blue params__randomize flex-center w-100 soon">
          <img src="@img/icons/randomize.svg" />
          Randomize
        </button> -->
      </div>

      <div class="character">
        <div class="character__head ">
          <CharacterSex
            v-if="false"
            @updateSex="(val)=>{sex= val}"
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

        <div class="avatar" :class="`avatar_${sex}`" id="avatar">
          <img :src="`/images/character/${heroSrc}`" alt="" />
        </div>
      </div>

      <div class="info">
        <div
          v-for="race of descriptions"
          class="race plate flex flex-column overflow-hidden"
        >
          <div class="race__head flex align-center">
            <img class="race__logo" :src="race.img" />
            <div class="race__title fw-900 uppercase">{{ race.title }}</div>
          </div>
          <div class="race__descr fw-700">
            {{ race.descr }}
          </div>
        </div>

        <client-only>
          <div
            v-if="characterClass"
            class="race plate flex flex-column overflow-hidden"
          >
            <div class="race__head flex align-center">
              <img
                class="race__logo"
                :src="`/images/character/class/${characterClass.img}.png`"
              />
              <div class="race__title fw-900 uppercase">
                {{ characterClass.type }}
              </div>
            </div>
            <div class="race__descr fw-700">
              {{ characterClass.descr }}
            </div>
          </div>
        </client-only>

        <button
          @click="handlePlay"
          class="btn btn-blue btn-arrow info__play w-100 uppercase"
        >
          <span>Earn</span>
        </button>
      </div>
    </div>

    <div class="main__mob container">
      <div class="avatar" :class="`avatar_${sex}`" id="avatar">
        <img :src="`/images/character/${heroSrc}`" alt="" />
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

            <div class="caption">Choose Gender</div>

            <CharacterSex v-model="sex" class="flex-center step__sex" />
          </div>

          <div v-else-if="step === 2" class="plate step__plate">
            <div class="pagination flex-center">
              <div
                v-for="i in stepsCount"
                class="pagination__item"
                :class="{active: i === step}"
              ></div>
            </div>

            <div class="caption">Choose Race</div>

            <CharacterRace
              v-model="race"
              :items="raceList"
              class="flex-center race-list"
            />

            <div class="race-list__divider"></div>

            <ClientOnly>
              <template v-if="characterClass">
                <div class="race-list__value uppercase fw-900">
                  {{ race.type }}
                </div>
                <div class="race-list__descr fw-700">
                  {{ race.descr }}
                </div>
              </template>
            </ClientOnly>
          </div>

          <div v-else-if="step === 3" class="plate step__plate">
            <div class="pagination flex-center">
              <div
                v-for="i in stepsCount"
                class="pagination__item"
                :class="{active: i === step}"
              ></div>
            </div>

            <div class="caption">Choose Class</div>

            <CharacterClass
              v-model="characterClass"
              :items="classList"
              class="flex-center race-list"
            />

            <div class="race-list__divider"></div>

            <ClientOnly>
              <template v-if="characterClass">
                <div class="race-list__value uppercase fw-900">
                  {{ characterClass.type }}
                </div>
                <div class="race-list__descr fw-700">
                  {{ characterClass.descr }}
                </div>
              </template>
            </ClientOnly>
          </div>

          <div v-else-if="step === 4" class="plate step__plate">
            <div class="pagination flex-center">
              <div
                v-for="i in stepsCount"
                class="pagination__item"
                :class="{active: i === step}"
              ></div>
            </div>

            <CharacterProps v-model:face="face" v-model:head="head" />
          </div>

          <div v-else-if="step === 5" class="plate step__plate">
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
            {{ step < stepsCount ? "Next" : "Earn" }}
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
    overflow: hidden;
    @media(max-width: $md) {
      display: block;
    }
  }
}

.caption {
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
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
  &__plate {
    padding: 15px;
    border-radius: 32px;
  }
  &__logo {
    position: relative;
    margin-top: -50px;
    transform: scale(1.3);
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

  &__section {
    & + & {
      margin-top: 24px;
    }
  }

  &__props {
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
  // overflow-x: auto;
  // padding: 20px 24px;
  // margin: -20px -24px;
  gap: 24px;

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
  align-self: center;
  &__head {
    width: 164px;
    margin: auto;
  }
}

.name {
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
  margin-top: 60px;
  @media(max-width: 992px) {
    margin-top: 0;
  }
  img {
    max-height: 555px;
    @media(max-width: 992px) {
      max-height: 60vh;
      height: 100%;
      max-width: none;
    }
  }
  &_male {
    img {
      margin-left: -12%;
    }
  }
  &_female {
    img {
      @media(max-width: 992px) {
        margin-left: -12%;
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
    margin-top: 30px;
    box-shadow: 0px 0px 24px 0px #00A3FF inset;
  }
}

.race {
  height: 210px;
  & + & {
    margin-top: 20px;
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

<script setup>
import orc from "@img/character/orc.png";
import elf from "@img/character/elf.png";
import human from "@img/character/human.png";
import dwarf from "@img/character/dwarf.png";
import undead from "@img/character/undead.png";
import goblin from "@img/character/goblin.png";

const raceList = reactive([
  {
    type: 'orc',
    img: orc,
    descr: 'Orcs are one of the oldest and most advanced races'
  },
  {
    type: 'elf',
    img: elf,
    descr: 'Elfs are one of the oldest and most advanced races'
  },
  {
    type: 'human',
    img: human,
    descr: 'Humans are one of the oldest and most advanced races'
  },
  {
    type: 'dwarf',
    img: dwarf,
    descr: 'Dwarfs are one of the oldest and most advanced races'
  },
  {
    type: 'undead',
    img: undead,
    descr: 'Undeads are one of the oldest and most advanced races'
  },
  {
    type: 'goblin',
    img: goblin,
    descr: 'Goblins are one of the oldest and most advanced races'
  },
])

const active = ref(raceList.find(r => r.type === 'human'));

const emit = defineEmits(['updateRace']);

watchEffect(() => {
  emit('updateRace', active.value);
});
</script>

<template>
  <div class="race__list">
    <tooltip
      v-for="race in raceList"
      class="race flex-center pointer"
      :class="{ active: active === race, soon: race.type !== 'human' }"
      @click="active = race;"
      :text="race.type"
    >
      <img :src="race.img" alt="" />
    </tooltip>
  </div>
</template>

<style lang="scss" scoped>
.race {
  position: relative;
  width: 60px;
  height: 60px;
  text-align: center;
  flex-shrink: 0;
  &:deep(.tooltip__value) {
    padding: 11px 8px;
    min-width: 65px;
    background-color: $gray600;
    @media(max-width: $md) {
      display: none;
    }
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

  @media(hover: hover) {
    &:hover {
      &:before {
        background-image: url('@img/character/bg-hover.svg');
      }
    }
  }

  &:nth-child(1n + 4) {
    margin-top: 16px;
    @media(max-width: $md) {
      margin-top: 0;
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

  &.soon {
    pointer-events: none;
    filter: grayscale(100%);
  }
}
</style>

<script setup>
import class1 from "@img/character/class1.png";
import class2 from "@img/character/class2.png";

const classList = reactive([
  {
    type: 'Paladin',
    img: class1,
    descr: 'Fearless warriors wearing heavy armor use the magic of light to destroy enemies'
  },
  {
    type: 'Wizzard',
    img: class2,
    descr: 'Fearless warriors wearing heavy armor use the magic of light to destroy enemies'
  },
  {
    type: 'test',
    img: class2,
    descr: 'Fearless warriors wearing heavy armor use the magic of light to destroy enemies'
  }
])

const active = ref(classList[0]);

const emit = defineEmits(['updateRace']);

watchEffect(() => {
  emit('updateRace', active.value);
});
</script>

<template>
  <div class="class__list">
    <div
      v-for="classItem in classList"
      class="class__item flex-center pointer"
      :class="{active: active === classItem}"
      @click="active = classItem"
    >
      <img :src="classItem.img" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.class {
  &__item {
    position: relative;
    width: 60px;
    height: 60px;
    & + & {
      margin-left: 35px;
      @media(max-width: $md) {
        margin-left: 20px;
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
</style>

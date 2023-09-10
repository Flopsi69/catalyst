<script setup>
defineProps(['face', 'head'])
const emit = defineEmits(['update:face', 'update:head'])

const properties = reactive([
  {
    alias: 'face',
    active: 'Face 1',
    list: [
      'Face 1',
      'Face 2',
      'Face 3',
    ]
  },
  {
    alias: 'head',
    active: 'Head',
    list: [
      'Head',
      'Head 1',
      'Head 2',
      'Head 3',
    ]
  }
])

function toggleProperty(property, direction) {
  const index = property.list.indexOf(property.active);

  if (direction === 'next') {
    property.active = property.list[index + 1] || property.list[0];
  } else {
    property.active = property.list[index - 1] || property.list[property.list.length - 1];
  }

  const val = property.active.replace(' ', '').toLowerCase();

  emit(`update:${property.alias}`, val)
}
</script>

<template>
  <div class="props fw-700 lh-1">
    <div v-for="property in properties" class="props__item overflow-hidden">
      <div class="property flex-center">
        <button
          @click="toggleProperty(property, 'prev')"
          class="btn btn-gray property__prev property__arrow"
        >
          <img src="@img/icons/arrow-solid.svg" alt="" />
        </button>
        <div class="property__value">{{ property.active }}</div>
        <button
          @click="toggleProperty(property, 'next')"
          class="btn btn-gray property__next property__arrow"
        >
          <img src="@img/icons/arrow-solid.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.props {
  &__item {
    border-radius: 18px;
    background: #000 linear-gradient(to bottom, rgba(0, 0, 0, 0) 5%, #177AF7 50%, rgba(0, 0, 0, 0) 95%);
    & + & {
      margin-top: 12px;
      @media(max-width: $md) {
        margin-top: 4px;
      }
    }
  }
}

.property {
  width: calc(100% - 8px);
  margin: auto;
  border-radius: 20px;
  background: #000;
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
</style>

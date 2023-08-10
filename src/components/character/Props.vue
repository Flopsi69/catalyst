<script setup>
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
  <div class="props fw-700 lh-1">
    <div v-for="property in properties" class="props__item overflow-hidden">
      <div class="property flex-center">
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

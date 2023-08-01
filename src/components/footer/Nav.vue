<script setup>
const cols = reactive([
  {
    title: 'About',
    links: [
      {
        title: 'AlfaPlatform',
        url: '/'
      },
      {
        title: 'Careers',
        url: '#'
      },
      {
        title: 'Brand Ki',
        url: '#'
      },
      {
        title: 'Press Ki',
        url: '#'
      }
    ]
  },
  {
    title: 'Support',
    links: [
      {
        title: 'Help center',
        url: '#'
      },
      {
        title: 'Support',
        url: '#'
      },
      {
        title: 'Contact us',
        url: '#'
      }
    ]
  },
  {
    title: 'Developers',
    links: [
      {
        title: 'Documentation',
        url: '#'
      },
      {
        title: 'Bug bounty',
        url: '#'
      },
      {
        title: 'Audit',
        url: '#'
      }
    ]
  }
])
</script>

<template>
  <div class="nav flex">
    <div v-for="col of cols" class="nav__col">
      <div class="nav__title fw-900 uppercase">{{ col.title }}</div>
      <div class="nav__list color-gray900 flex flex-column fw-700">
        <a
          v-for="link of col.links"
          :href="link.url"
          class="nav__link"
          >{{ link.title }}</a
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.nav {
  @media(max-width: $sm) {
    justify-content: center;
  }
  &__col {
    & + & {
      position: relative;
      margin-left: 48px;
      padding-left: 49px;
      @media(max-width: 1400px) {
        margin-left: 20px;
        padding-left: 21px;
      }
      @media(max-width: $sm) {
        margin-left: 15px;
        padding-left: 16px;
      }
      &:before {
        content: '';
        position: absolute;
        width: 1px;
        height: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(114, 111, 155, 0) 0%, rgba(114, 111, 155, 0.3) 50.52%, rgba(114, 111, 155, 0) 100%);
      }
    }
  }

  &__title {
    font-family: $f-un;
    font-size: 18px;
    @media(max-width: $sm) {
      font-size: 12px;
    }
  }

  &__list {
    margin-top: 24px;
    font-size: 14px;
    @media(max-width: $sm) {
      font-size: 12px;
      margin-top: 16px;
    }
  }

  &__link {
    &:hover {
      color: #0A84FF;
    }
    & + & {
      margin-top: 20px;
      @media(max-width: $sm) {
        margin-top: 15px;
      }
    }
  }
}
</style>

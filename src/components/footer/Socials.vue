<script setup>
import telegram from "@img/socials/tg.svg"
import twitter from "@img/socials/twitter.svg"
import medium from "@img/socials/medium.svg"
import github from "@img/socials/github.svg"
import linkedin from "@img/socials/linkedin.svg"
import youtube from "@img/socials/youtube.svg"
import instagram from "@img/socials/instagram.svg"

const socials = reactive([
  {
    url: '#',
    social: 'telegram',
    img: telegram
  },
  {
    url: '#',
    social: 'twitter',
    img: twitter
  },
  {
    url: '#',
    social: 'medium',
    img: medium
  },
  {
    url: '#',
    social: 'github',
    img: github
  },
  {
    url: '#',
    social: 'linkedin',
    img: linkedin
  },
  {
    url: '#',
    social: 'youtube',
    img: youtube
  },
  {
    url: '#',
    social: 'instagram',
    img: instagram
  },
])
</script>

<template>
  <div class="socials">
    <a
      @click.prevent
      v-for="social of socials"
      :href="social.url"
      class="socials__link flex-center lh-0"
      :class="[social.social]"
      target="_blank"
    >
      <img :src="social.img" alt="" />
    </a>
  </div>
</template>

<style lang="scss" scoped>
.socials {
  display: flex;
  &__link {
    position: relative;
    border-radius: 50%;
    background-color: #181E2F;
    width: 36px;
    height: 36px;
    &:before {
      content: '';
      position: absolute;
      border-radius: 50%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: $blueG;
      transition: $transition;
      z-index: -1;
    }

    &:hover {
      background-color: transparent;
    }

    &.telegram {
      img {
        left: -2px
      }
    }

    img {
      position: relative;
      max-width: 60%;
      max-height: 60%;
    }

    & + & {
      margin-left: 12px;
    }
  }
}
</style>

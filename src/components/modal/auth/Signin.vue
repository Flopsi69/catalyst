<script setup>
const isShowPassword = ref(false)
</script>

<template>
  <div class="signup">
    <div class="signup__group input__group">
      <label class="label signup__label input__label" for="">E-mail</label>
      <input class="input signup__input" type="email" />
    </div>

    <div class="signup__group input__group">
      <label class="label signup__label input__label" for="">Password</label>
      <input
        class="input signup__input"
        :type="isShowPassword ? 'text' : 'password'"
      />
      <img
        @click="isShowPassword=!isShowPassword"
        src="@img/icons/eye.svg"
        class="input__icon-password"
        :class="{'active': isShowPassword}"
      />
    </div>

    <button class="btn btn-blue w-100 signup__btn">Continue</button>

    <div class="signup__divier flex-center">
      <span class="uppercase fw-700 color-blueG">Or</span>
    </div>

    <button class="btn btn-trans w-100 signup__auth flex-center">
      <img src="@img/icons/google-auth.svg" alt="" />
      Register with Google
    </button>

    <button class="btn btn-trans w-100 signup__auth flex-center">
      <img src="@img/icons/metamask-auth.svg" alt="" />
      Metamask
    </button>

    <div class="signup__agree fw-700">
      <div class="signup__agree-inner">
        By register, I agree to the AlfaCatalyst
        <a class="color-blueG" href="#">Privacy Policy</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.signup {
  &__divier {
    position: relative;
    font-size: 14px;
    padding: 20px 0;
    span {
      position: relative;
      z-index: 1;
    }
    &:before {
      content: '';
      position: absolute;
      background-color: #07122E;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      margin: auto;
      pointer-events: none;
      width: 70px;
    }
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      transform: translateY(-50%);
      background-color: #132041;
    }
  }

  &__agree {
    position: relative;
    margin-top: 18px;
    font-size: 12px;
    letter-spacing: -0.02em;
    padding-left: 35px;
    &-inner {
      padding-top: 5px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 24px;
      height: 24px;
      background: #15203D;
      border: 1px solid #262E54;
      border-radius: 4px;
    }
  }

  &__btn {
    min-height: 55px;
    margin-top: 24px;
  }

  &__auth {
    min-height: 55px;
    font-size: 13px;
    letter-spacing: -0.02em;
    & + & {
      margin-top: 18px;
    }
    img {
      margin-right: 8px;
    }
  }
 }
</style>

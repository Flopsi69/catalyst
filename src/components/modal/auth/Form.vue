<script setup>
// import { useModalStore } from '~/stores/modal';
// const { close } = useModalStore();

import close from "@img/icons/close.svg?component"

const isShowPassword = ref(false)
const currentTab = ref('signup');

const authData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  isAgree: false
});


const validatePassword = reactive([
  {
    caption: 'Minimum',
    condition: '8 characters',
    validate: (value) => {
      return value.length >= 8;
    }
  },
  {
    caption: 'At least',
    condition: '1 digit',
    validate: (value) => {
      return /[\d]/.test(value);
    }
  },
  {
    caption: 'At least',
    condition: '1 letter',
    validate: (value) => {
      return /[a-zA-Z]/.test(value);
    }
  },
  {
    caption: 'At least',
    condition: '1 capital letter',
    validate: (value) => {
      return /[A-Z]/.test(value);
    }
  },
  {
    caption: 'At least 1 symbol',
    condition: '#!@%$*?&-',
    validate: (value) => {
      return /[#!@%$*?&-]/.test(value);
    }
  },
]);


const validateForm = () => {
  const { email, password, confirmPassword, isAgree } = authData;
  const isEmailValid = email.length > 0;
  const isPasswordValid = password.length > 0;
  const isConfirmPasswordValid = confirmPassword.length > 0;
  const isAgreeValid = isAgree;

  return isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgreeValid;
}
</script>

<template>
  <div class="auth">
    <div class="auth__head text-center">
      <img class="auth__logo" src="@img/logo.svg" alt="" />

      <div @click="$modal.close" class="modal__close auth__close lh-0">
        <close />
      </div>
    </div>

    <div class="auth__body">
      <div class="auth__tabs fw-700">
        <div
          class="auth__tab"
          :class="{'active' : currentTab === 'signup'}"
          @click="currentTab='signup'"
        >
          Sign Up
        </div>
        <div
          class="auth__tab"
          :class="{'active' : currentTab === 'signin'}"
          @click="currentTab='signin'"
        >
          Sign In
        </div>
      </div>

      <div class="form">
        <div class="input__group">
          <label class="label input__label" for="">E-mail</label>
          <input
            v-model="authData.email"
            class="input form__input"
            type="email"
          />
        </div>

        <div class="input__group">
          <label class="label input__label" for="">Password</label>

          <input
            v-model="authData.password"
            class="input form__input"
            :type="isShowPassword ? 'text' : 'password'"
          />

          <div class="validation transition bg-dark fw-700">
            <div
              v-for="rule of validatePassword"
              class="validation__item"
              :class="{'active': rule.validate(authData.password)}"
            >
              {{ rule.caption }}
              <span class="validation__value">{{ rule.condition }}</span>
            </div>
          </div>

          <img
            @click="isShowPassword=!isShowPassword"
            src="@img/icons/eye.svg"
            class="input__icon-password"
            :class="{'active': isShowPassword}"
          />
        </div>

        <div v-if="currentTab === 'signup'" class="input__group">
          <label class="label input__label" for="">Confirm Password</label>

          <input
            v-model="authData.confirmPassword"
            class="input form__input"
            :type="isShowPassword ? 'text' : 'password'"
          />

          <div class="validation transition bg-dark fw-700">
            <div
              v-for="rule of validatePassword"
              class="validation__item"
              :class="{'active': rule.validate(authData.confirmPassword)}"
            >
              {{ rule.caption }}
              <span class="validation__value">{{ rule.condition }}</span>
            </div>
          </div>

          <img
            @click="isShowPassword=!isShowPassword"
            src="@img/icons/eye.svg"
            class="input__icon-password"
            :class="{'active': isShowPassword}"
          />
        </div>

        <button class="btn btn-blue btn-arrow w-100 form__submit">
          <span>
            {{ currentTab === 'signup' ? 'Register' : 'Continue' }}
          </span>
        </button>

        <div class="form__divider flex-center">
          <span class="uppercase fw-700 color-blueG">Or</span>
        </div>

        <button class="btn btn-trans w-100 form__btn flex-center">
          <img src="@img/icons/google-auth.svg" alt="" />
          Continue with Google
        </button>

        <button class="btn btn-trans w-100 form__btn flex-center">
          <img src="@img/icons/metamask-auth.svg" alt="" />
          Metamask
        </button>

        <checkbox
          v-if="currentTab === 'signup'"
          v-model="authData.agreeCheckbox"
          class="agree"
        >
          <div class="agree__label fw-700">
            By register, I agree to the AlfaCatalyst
            <a @click.stop="" class="agree__link color-blueG" href="#"
              >Privacy Policy</a
            >
          </div>
        </checkbox>
      </div>

      <!-- <ModalAuthSignup v-show="currentTab === 'signup'" />
      <ModalAuthSignin v-show="currentTab === 'signin'" /> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  flex-grow: 1;

  &__head {
    background: #0F182F;
    background-size: cover;
    position: relative;
    padding: 20px 20px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 77px;
    overflow: hidden;
    &:before {
      content: '';
      position: absolute;
      width: 313px;
      height: 85px;;
      top: 63px;
      left: 0;
      right: 0;
      margin: auto;
      background: $blueG;
      opacity: 0.7;
      filter: blur(32px);
    }
  }

  &__logo {
    position: relative;
  }

  &__close {
    position: absolute;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
  }

  &__body {
    padding: 10px 64px 32px;
    @media(max-width: $sm) {
      padding: 0 20px 28px;
    }
  }

  &__tabs {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid #132041;
    margin-bottom: 24px;
  }

  &__tab {
    position: relative;
    font-size: 18px;
    padding: 14px 9px;
    transition: $transition;
    &:after {
      content: '';
      position: absolute;
      height: 2px;
      bottom: -2px;
      left: 9px;
      right: 9px;
      background: $blueG;
      opacity: 0;
      transition: $transition;;
    }

    &:not(.active) {
      color: $gray700;
      cursor: pointer;
      &:hover {
        color: rgba($white, .8);
      }
    }

    &.active {
      &:after {
        opacity: 1;
      }
    }
  }
}

.form {
  &__divider {
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

  &__submit {
    min-height: 55px;
    margin-top: 24px;
    font-size: 14px;
  }

  &__btn {
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

.validation {
  position: absolute;
  top: 50%;
  left: calc(100% + 17px);
  transform: translateY(-50%);
  padding: 15px;
  white-space: nowrap;
  font-size: 13px;
  letter-spacing: -0.26px;
  border-radius: 12px;
  opacity: 0;
  pointer-events: none;
  transition: $transition;
  &:before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    left: -8px;
    background-color: $dark;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }
  &__item {
    position: relative;
    padding-left: 25px;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      background: url('@img/icons/check.svg') no-repeat center;
      background-size: contain;
      transition: $transition;
    }

    &.active {
      &:before {
        background-image: url('@img/icons/check-blue.svg');
      }
    }


    & + & {
      margin-top: 10px;
    }
  }

  &__value {
    display: inline-block;
    padding: 4px 6px;
    border-radius: 6px;
    background: $gray600;
    transition: $transition;
    .active & {
      background: $blueG;
    }
  }
}

.agree {
  margin-top: 18px;
}
</style>

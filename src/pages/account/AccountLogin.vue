<!-- /* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */ -->

<script lang="ts" setup>
import { ref } from 'vue'

import router from '@/router'

import Toast from 'primevue/toast'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'

import { useAuth } from '@core/services/UseAuth.js'
import { useTheme } from '@core/services/UseTheme'
import { useSidemenu } from '@/layouts/services/UseSidemenu'
import { usePersianNumber } from '@shared/utils/UsePersianNumber.js'

import { useToast } from 'primevue/usetoast'

import { tap } from 'rxjs/operators'

import { useField, useForm } from 'vee-validate'

interface LoginForm {
  username: string
  password: string
}

const { currentTheme } = useTheme()
const { redirectUrl, logIn, setAuthorizationToken } = useAuth()
const { toEnglish, toPersian } = usePersianNumber()
const { openSidemenu } = useSidemenu()
const toast = useToast()

const { handleSubmit } = useForm<LoginForm>()

// Simple validation functions
const { value: username, errorMessage: usernameError } = useField('username', (value: any) => {
  if (!value) return 'لطفا نام کاربری را خالی نگذارید'
  return true
})

const { value: password, errorMessage: passwordError } = useField('password', (value: any) => {
  if (!value) return 'لطفا گذرواژه را خالی نگذارید'
  if (value.length < 8) return toPersian('گذرواژه حداقل شامل 8 کاراکتر می‌باشد')
  return true
})

const loading = ref(false)
const rememberMe = ref(false)

const signIn = handleSubmit((loginForm) => {
  loading.value = true

  logIn(toEnglish(loginForm.username), loginForm.password)
    .pipe(tap(() => (loading.value = false)))
    .subscribe((isValid) => {
      if (isValid) {
        setAuthorizationToken('TOKEN', rememberMe.value)

        // Redirect the user
        router.push(redirectUrl.value || '/')
        openSidemenu()
      } else
        toast.add({
          life: 8000,
          severity: 'error',
          detail: `خطا`,
          summary: 'اطلاعات وارد شده صحیح نمی‌باشد'
        })
    })
})
</script>

<template>
  <div class="page">
    <Toast />

    <main class="h-full w-full d-flex ai-center flex-column jc-center m-h-100">
      <div class="card m-xl-4 m-lg-1 m-md-1 m-sm-1 m-0 border-round shadow-2">
        <div class="card-body">
          <div class="row">
            <div class="col-md-12 col-xl-7 order-2 order-lg-1 bordered-box">
              <form class="py-xl-4 p-lg-3 p-md-2 p-2" @submit.prevent="signIn" novalidate>
                <div class="form-group px-xl-4">
                  <div class="field">
                    <label for="username" class="text-600 font-medium mb-2 ms-1">
                      نام کاربری
                    </label>
                    <InputText
                      id="username"
                      name="username"
                      v-model="username"
                      :class="{ 'p-invalid': usernameError }"
                      class="w-100"
                      type="text"
                      :state="null"
                      required
                    />
                    <small class="p-error d-block" id="text-error">{{
                      usernameError || '&nbsp;'
                    }}</small>
                  </div>

                  <div class="field">
                    <label for="password" class="text-600 font-medium mb-2 ms-1"> گذرواژه </label>
                    <Password
                      toggleMask
                      id="password"
                      name="password"
                      v-model="password"
                      inputClass="w-100"
                      class="w-100"
                      :class="{ 'p-invalid': passwordError }"
                      :feedback="false"
                      :minlength="8"
                    />
                    <small class="p-error d-block" id="text-error">{{
                      passwordError || '&nbsp;'
                    }}</small>
                  </div>

                  <div class="d-flex align-items-center justify-content-between mt-md-4 mx-1">
                    <!-- remember me -->
                    <div class="d-flex flex-row-reverse align-items-center ms-1">
                      <label for="rememberMe" class="text-900">
                        <strong> منو یادتون بمونه </strong>
                      </label>

                      <Checkbox
                        id="rememberMe"
                        name="rememberMe"
                        class="me-2"
                        v-model="rememberMe"
                        :binary="true"
                      />
                    </div>
                    <!-- forgot password -->
                    <a class="active-link no-underline me-1 text-hilight text-start cursor-pointer">
                      <strong> گذرواژتو فراموش کردی؟ </strong>
                    </a>
                  </div>

                  <div class="w-100 text-end pt-3 d-flex jc-center ai-center">
                    <PButton
                      rounded
                      class="submit-button w-100 p-button-primary"
                      icon="pi pi-user"
                      type="submit"
                      label="ورود"
                      :loading="loading"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="col-md-12 col-xl-5">
              <div class="row d-flex jc-center ai-center mt-xl-3">
                <div class="col-xl-12 text-xl-center text-md-start">
                  <div class="text-900 display-5 font-medium mb-xl-4 mb-md-0">
                    <strong> سـلام </strong>
                  </div>

                  <div class="pb-2">
                    <span class="text-600 font-medium line-height-3">
                      هنوز حساب کاربری نداری؟
                    </span>

                    <a
                      class="active-link no-underline text-hilight cursor-pointer"
                      routerLink="/account/register"
                      ariaCurrentWhenActive="page"
                    >
                      <strong> از اینجا بساز! </strong>
                    </a>
                  </div>
                </div>
                <!-- light theme sign in -->
                <svg
                  v-if="currentTheme === 'light-theme'"
                  class="col-xl-12 d-xl-block d-none rounded mt-3"
                  width="330"
                  height="220"
                  viewBox="0 0 900 600"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="transparent" d="M0 0h900v600H0z" />
                  <path
                    d="M233.702 340.487c-9.832-75.071 41.974-164.345 152.377-150.805 93.645 11.482 113.945-3.323 154.259-24.42 26.623-13.926 68.27-38.567 102.058 31.895 44.224 92.222-59.489 236.818-152.117 281.165-88.577 42.413-238.743-1.601-256.577-137.835z"
                    fill="#FD4D00"
                  />
                  <rect
                    x="275.027"
                    y="176.359"
                    width="45.925"
                    height="5.35"
                    rx="2.675"
                    transform="rotate(135 275.027 176.359)"
                    fill="#E1E4E5"
                  />
                  <rect
                    x="253.492"
                    y="450.773"
                    width="27.287"
                    height="3.179"
                    rx="1.59"
                    transform="rotate(135 253.492 450.773)"
                    fill="#E1E4E5"
                  />
                  <rect
                    x="640.152"
                    y="407.79"
                    width="27.287"
                    height="3.179"
                    rx="1.59"
                    transform="rotate(-45 640.152 407.79)"
                    fill="#E1E4E5"
                  />
                  <rect
                    x="257.418"
                    y="176.233"
                    width="17.052"
                    height="5.35"
                    rx="2.675"
                    transform="rotate(135 257.418 176.233)"
                    fill="#E1E4E5"
                  />
                  <rect
                    x="243.03"
                    y="450.698"
                    width="10.132"
                    height="3.179"
                    rx="1.59"
                    transform="rotate(135 243.03 450.698)"
                    fill="#E1E4E5"
                  />
                  <rect
                    x="650.613"
                    y="407.865"
                    width="10.132"
                    height="3.179"
                    rx="1.59"
                    transform="rotate(-45 650.613 407.865)"
                    fill="#E1E4E5"
                  />
                  <path
                    d="M488.113 500.517c-4.574 1.095-10.718 3.455-14.203 8.152-3.483 4.696.731 6.083 6.296 5.181 5.565-.902 11.087-4.041 13.326-8.461 2.238-4.419-1.664-5.77-5.419-4.872zm22.534-8.746c-2.21.529-5.177 1.669-6.861 3.937-1.682 2.269.353 2.938 3.041 2.503 2.688-.436 5.356-1.952 6.437-4.087 1.081-2.135-.804-2.787-2.617-2.353zm82.259-30.43c5.743-3.938 6.305-13.106 6.305-13.106s-8.75-2.778-14.491 1.165c-5.742 3.937-6.307 13.101-6.307 13.101s8.75 2.778 14.493-1.16z"
                    fill="#E1E4E5"
                  />
                  <ellipse cx="577.372" cy="117.121" rx="7.657" ry="8.204" fill="#E1E4E5" />
                  <ellipse cx="684.576" cy="330.983" rx="4.376" ry="6.564" fill="#E1E4E5" />
                  <path
                    d="m360.775 334.885 48.123 48.606 105.027-106.11"
                    stroke="#fff"
                    stroke-width="45.945"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M485.68 166.873c-31.284 8.283-65.278-17.54-65.278-17.54s16.75-39.24 48.045-47.5c31.284-8.283 65.268 17.518 65.268 17.518s-16.751 39.239-48.035 47.522z"
                    fill="url(#a)"
                  />
                  <path
                    d="M703.145 246.156c-9.407 9.574-26.998 7.556-26.998 7.556s-2.327-17.542 7.088-27.111c9.407-9.574 26.989-7.561 26.989-7.561s2.328 17.542-7.079 27.116z"
                    fill="url(#b)"
                  />
                  <ellipse
                    rx="15.862"
                    ry="16.956"
                    transform="matrix(1 0 0 -1 198.328 334.811)"
                    fill="#E1E4E5"
                  />
                  <ellipse cx="195.046" cy="235.811" rx="6.017" ry="5.47" fill="#E1E4E5" />
                  <circle cx="350.383" cy="153.22" r="11.486" fill="#E1E4E5" />
                  <path
                    d="M673.209 137.358h-.231c-1.365 19.509-15.749 19.809-15.749 19.809s15.861.312 15.861 22.854c0-22.542 15.862-22.854 15.862-22.854s-14.378-.3-15.743-19.809z"
                    fill="#E1E4E5"
                  />
                  <defs>
                    <linearGradient
                      id="a"
                      x1="367.623"
                      y1="188.524"
                      x2="639.781"
                      y2="51.108"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#fff" />
                      <stop offset="1" stop-color="#EEE" />
                    </linearGradient>
                    <linearGradient
                      id="b"
                      x1="665.613"
                      y1="278.86"
                      x2="733.62"
                      y2="172.253"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#fff" />
                      <stop offset="1" stop-color="#EEE" />
                    </linearGradient>
                  </defs>
                </svg>
                <!-- / light theme sign in -->
                <!-- dark theme sign in -->
                <svg
                  v-if="currentTheme === 'dark-theme'"
                  class="col-xl-12 d-xl-block d-none rounded mt-3"
                  width="330"
                  height="220"
                  viewBox="0 0 900 600"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="transparent" d="M0 0h900v600H0z" />
                  <path
                    d="M233.702 340.487c-9.832-75.071 41.974-164.345 152.377-150.805 93.645 11.482 113.945-3.323 154.259-24.42 26.623-13.926 68.27-38.567 102.058 31.895 44.224 92.222-59.489 236.818-152.117 281.165-88.577 42.413-238.743-1.601-256.577-137.835z"
                    fill="#657EFF"
                  />
                  <rect
                    x="275.027"
                    y="176.359"
                    width="45.925"
                    height="5.35"
                    rx="2.675"
                    transform="rotate(135 275.027 176.359)"
                    fill="#E1E4E5"
                  />
                  <rect
                    x="253.492"
                    y="450.773"
                    width="27.287"
                    height="3.179"
                    rx="1.59"
                    transform="rotate(135 253.492 450.773)"
                    fill="#E1E4E5"
                  />
                  <rect
                    x="640.152"
                    y="407.79"
                    width="27.287"
                    height="3.179"
                    rx="1.59"
                    transform="rotate(-45 640.152 407.79)"
                    fill="#E1E4E5"
                  />
                  <rect
                    x="257.418"
                    y="176.233"
                    width="17.052"
                    height="5.35"
                    rx="2.675"
                    transform="rotate(135 257.418 176.233)"
                    fill="#E1E4E5"
                  />
                  <rect
                    x="243.03"
                    y="450.698"
                    width="10.132"
                    height="3.179"
                    rx="1.59"
                    transform="rotate(135 243.03 450.698)"
                    fill="#E1E4E5"
                  />
                  <rect
                    x="650.613"
                    y="407.865"
                    width="10.132"
                    height="3.179"
                    rx="1.59"
                    transform="rotate(-45 650.613 407.865)"
                    fill="#E1E4E5"
                  />
                  <path
                    d="M488.113 500.517c-4.574 1.095-10.718 3.455-14.203 8.152-3.483 4.696.731 6.083 6.296 5.181 5.565-.902 11.087-4.041 13.326-8.461 2.238-4.419-1.664-5.77-5.419-4.872zm22.534-8.746c-2.21.529-5.177 1.669-6.861 3.937-1.682 2.269.353 2.938 3.041 2.503 2.688-.436 5.356-1.952 6.437-4.087 1.081-2.135-.804-2.787-2.617-2.353zm82.259-30.43c5.743-3.938 6.305-13.106 6.305-13.106s-8.75-2.778-14.491 1.165c-5.742 3.937-6.307 13.101-6.307 13.101s8.75 2.778 14.493-1.16z"
                    fill="#E1E4E5"
                  />
                  <ellipse cx="577.372" cy="117.121" rx="7.657" ry="8.204" fill="#E1E4E5" />
                  <ellipse cx="684.576" cy="330.983" rx="4.376" ry="6.564" fill="#E1E4E5" />
                  <path
                    d="m360.775 334.885 48.123 48.606 105.027-106.11"
                    stroke="#fff"
                    stroke-width="45.945"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M485.68 166.873c-31.284 8.283-65.278-17.54-65.278-17.54s16.75-39.24 48.045-47.5c31.284-8.283 65.268 17.518 65.268 17.518s-16.751 39.239-48.035 47.522z"
                    fill="url(#a)"
                  />
                  <path
                    d="M703.145 246.156c-9.407 9.574-26.998 7.556-26.998 7.556s-2.327-17.542 7.088-27.111c9.407-9.574 26.989-7.561 26.989-7.561s2.328 17.542-7.079 27.116z"
                    fill="url(#b)"
                  />
                  <ellipse
                    rx="15.862"
                    ry="16.956"
                    transform="matrix(1 0 0 -1 198.328 334.811)"
                    fill="#E1E4E5"
                  />
                  <ellipse cx="195.046" cy="235.811" rx="6.017" ry="5.47" fill="#E1E4E5" />
                  <circle cx="350.383" cy="153.22" r="11.486" fill="#E1E4E5" />
                  <path
                    d="M673.209 137.358h-.231c-1.365 19.509-15.749 19.809-15.749 19.809s15.861.312 15.861 22.854c0-22.542 15.862-22.854 15.862-22.854s-14.378-.3-15.743-19.809z"
                    fill="#E1E4E5"
                  />
                  <defs>
                    <linearGradient
                      id="a"
                      x1="367.623"
                      y1="188.524"
                      x2="639.781"
                      y2="51.108"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#fff" />
                      <stop offset="1" stop-color="#EEE" />
                    </linearGradient>
                    <linearGradient
                      id="b"
                      x1="665.613"
                      y1="278.86"
                      x2="733.62"
                      y2="172.253"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#fff" />
                      <stop offset="1" stop-color="#EEE" />
                    </linearGradient>
                  </defs>
                </svg>
                <!-- / dark theme sign in -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
main {
  position: relative;

  .card {
    max-width: 1000px;
    min-height: 350px;
  }
  .card-body {
    padding: 20px 20px 20px 20px !important;
  }
}

.shadow-2 {
  box-shadow: var(--main-card-shadow) !important;
}

.text-hilight {
  color: var(--main-hilight-color) !important;
}

.text-900 {
  color: var(--sidemenu-item-color) !important;
}

.text-600 {
  color: var(--surface-600) !important;
}

.line-height-3 {
  line-height: 1.5 !important;
}

.cursor-pointer {
  cursor: pointer !important;
}

.no-underline {
  text-decoration: none !important;
}

.p-ripple {
  overflow: hidden;
  position: relative;
}

.active-link:hover {
  text-decoration: underline !important;
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 1200px) {
  .bordered-box {
    border-right: 1px solid var(--bluegray-100);
  }
}
/* Small Devices, Tablets */
@media only screen and (max-width: 1200px) {
  .bordered-box {
    border-top: 1px solid var(--bluegray-100);
  }
}
</style>

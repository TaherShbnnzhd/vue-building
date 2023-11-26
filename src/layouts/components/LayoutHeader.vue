<!-- /* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */ -->

<script lang="ts" setup>
import { computed, ref } from 'vue'

import { useTheme } from '@core/services/UseTheme'
import { useAuth } from '@core/services/UseAuth'
import { useSidemenu } from '../services/UseSidemenu'

import { useConfirm } from 'primevue/useconfirm'
import ConfirmDialog from 'primevue/confirmdialog'
import router from '@/router'

const { currentTheme, switchTheme } = useTheme()
const { logOut, isAuthenticated } = useAuth()
const { closeSidemenu } = useSidemenu()
const confirm = useConfirm()

const _darkmode = ref(currentTheme.value === 'light-theme' ? false : true)

const darkmode = computed({
  get() {
    return _darkmode.value
  },
  set(v: boolean) {
    _darkmode.value = v
    toggleDarkMode(v)
  }
})

/**
 *  Switch theme between dark and light mode
 *
 * @param event event
 * @param theme theme's name
 * @param dark darkmode
 */
function toggleDarkMode(darkmode: boolean) {
  if (darkmode) switchTheme('dark-theme')
  else switchTheme('light-theme')
}

/** Sign out */
function signOut() {
  //  storedRoutesService.clearStoredRoutes()
  closeSidemenu()
  logOut()
  router.push('/account/login')
}

/** Show sign out confirmation dialog */
function confirmSignout() {
  confirm.require({
    message: 'آیا برای خروج از حساب کاربری اطمینان دارید؟',
    header: 'هشدار خروج از حساب کاربری',
    icon: 'pi pi-user',
    acceptLabel: 'تایید و خروج',
    acceptClass: 'p-button-danger',
    acceptIcon: 'pi pi-power-off',
    rejectLabel: 'انصراف',
    rejectClass: 'p-button-secondary',
    defaultFocus: 'reject',
    accept: () => signOut()
  })
}
</script>

<template>
  <header class="header py-1 px-4 d-flex align-items-center justify-content-between">
    <!-- mega menu -->
    <div class="menubar px-3">
      <RouterLink class="home-botton fs-5 p-button-text p-button-rounded" to="/">
        <sub class="pb-1 sub-brand"></sub>
        <strong class="brand">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</strong>
      </RouterLink>
    </div>
    <!-- / mega menu -->
    <div class="d-flex align-items-center justify-content-center me-1">
      <!-- light | dark mode switch -->
      <div class="me-3">
        <label class="switch">
          <input type="checkbox" :checked="darkmode" @change="darkmode = !darkmode" />
          <span class="slider"></span>
        </label>
      </div>
      <!-- / light | dark mode switch -->
      <!-- signout button -->
      <PButton
        rounded
        v-if="isAuthenticated"
        pTooltip="خروج از حساب کاربری"
        class="sign-out-button p-button-lg p-button-rounded p-button-text p-button-danger"
        type="button"
        icon="mgc_power_fill"
        @click="confirmSignout()"
      />
      <!--/ signout button -->
    </div>
  </header>

  <ConfirmDialog :style="{ width: '450px' }" :rtl="true" />
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: var(--header-height);
  background-color: var(--sidemenu-main-color);
  box-shadow: var(--main-box-shadow);
  z-index: var(--z-index-header);

  .home-botton {
    text-decoration: none;
    color: var(--main-hilight-color);
    transition: var(--main-transition);

    &:focus {
      box-shadow: 0 0 0 0.2rem transparent;
    }

    .brand {
      letter-spacing: 1.3px;
      cursor: pointer;
    }

    .sub-brand {
      letter-spacing: 2px;
      padding-left: 2px;
    }
  }
  /* The switch - the box around the slider */
  .switch {
    --width-of-switch: 3.2em;
    --height-of-switch: 1.5em;
    /* size of sliding icon -- sun and moon */
    --size-of-icon: 1.1em;
    /* it is like a inline-padding of switch */
    --slider-offset: 0.2em;
    position: relative;
    width: var(--width-of-switch);
    height: var(--height-of-switch);
    transition: var(--main-transition);
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--main-color);
    transition: 0.4s;
    border-radius: 13px;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: var(--size-of-icon, 1.4em);
    width: var(--size-of-icon, 1.4em);
    border-radius: 20px;
    left: var(--slider-offset, 0.3em);
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(40deg, #fb7ba2, #fce043 70%);
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: var(--main-color);
  }

  input:checked + .slider:before {
    left: calc(100% - (var(--size-of-icon, 1.4em) + var(--slider-offset, 0.3em)));
    background: #3e3e3e;
    /* change the value of second inset in box-shadow to change the angle and direction of the moon  */
    box-shadow:
      inset -3px -2px 5px -2px #c5d4f9,
      inset -9px -3px 0 0 #fcfcfcfc;
  }
}
</style>

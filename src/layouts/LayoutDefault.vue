<!-- /* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */ -->

<script setup lang="ts">
import { getCurrentInstance, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'
import router from '@/router'

import { useSidemenu } from './services/UseSidemenu'

import LayoutFooter from './components/LayoutFooter.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutSidemenu from './components/LayoutSidemenu.vue'
import LayoutLoading from './components/LayoutLoading.vue'

import Toast from 'primevue/toast'

const sidemenu = useSidemenu()

/** Current application version. */
const version = getCurrentInstance()?.appContext?.config?.globalProperties?.versionNumber

/** Components loading. */
const loading = ref(false)

/** Width of the screen. */
const innerWidth = ref(window.innerWidth)

onBeforeMount(() => {
  offcanvasModeDetection(window.innerWidth)

  router.afterEach(() => (loading.value = true))
  router.afterEach(() => (loading.value = false))
})

onMounted(() => {
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

/** Get width of the screen */
function onResize() {
  innerWidth.value = window.innerWidth
  offcanvasModeDetection(window.innerWidth)
}

/**
 * Detect sidemenu offcanvas mode.
 * @param innerWidth windows width
 */
function offcanvasModeDetection(innerWidth: number) {
  if (innerWidth < 991) sidemenu.offcanvasMode.value = true
  else sidemenu.offcanvasMode.value = false
}
</script>

<template>
  <main>
    <div class="container-fluid">
      <!-- Header -->
      <LayoutHeader />
      <!-- / Header -->

      <!-- Sidemenu -->
      <LayoutSidemenu :innerWidth="innerWidth" />
      <!-- / Sidemenu -->

      <!-- / Left frame -->
      <div class="left-frame"></div>
      <!-- / Left frame -->

      <!-- Main content -->
      <div class="content">
        <!-- Main content body -->
        <div
          class="content-body"
          :class="{
            full: sidemenu.offcanvasMode || sidemenu.isClose(),
            compact: !sidemenu.offcanvasMode && !sidemenu.isClose()
          }"
        >
          <!-- page loading screen -->
          <div class="loading-content">
            <LayoutLoading :loading="loading" />
          </div>
          <!-- / Page loading screen -->

          <!-- http error message -->
          <Toast key="httpErrorMessage" position="bottom-left" />
          <!-- / Http error message -->

          <!-- route content viewbox -->
          <div class="route-content container">
            <RouterView />
          </div>
          <!-- / Route content viewbox -->
        </div>
        <!-- / Main content body -->
      </div>
      <!-- / Main content -->

      <!-- Footer -->
      <div class="mt-2">
        <LayoutFooter :version="version" />
      </div>
      <!-- / Footer -->
    </div>
  </main>
</template>

<style lang="scss">
main {
  scroll-behavior: smooth;
  background-color: var(--main-color);
  background: var(--main-gradiant);
  --content-height: calc(var(--header-height) + var(--toolbar-height));

  .container-fluid {
    padding: 0 0 0 0;
    margin: 0 0 0 0;

    .compact-header {
      .home-botton {
        padding-right: var(--sidemenu-width);
      }
    }

    .compact-footer {
      .copy-right {
        padding-right: var(--sidemenu-width);
      }
    }

    .content {
      position: relative;
      width: 100%;
      height: calc(100vh - var(--header-height) + var(--footer-height));

      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
        background-color: transparent;
        overflow-y: auto;
        overflow-x: hidden;
      }

      &::-webkit-scrollbar-thumb {
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
        background-color: transparent;
        overflow-y: auto;
        overflow-x: hidden;
      }

      &::-webkit-scrollbar {
        display: none;
      }

      .content-body {
        transition: var(--main-transition);

        &.full {
          margin: calc(var(--content-height) + 1rem) 3rem 1rem 3rem;
        }

        &.compact {
          margin: calc(var(--content-height) + 1rem) calc(var(--sidemenu-width) + 1rem) 1rem 1.43rem;
        }

        .loading-content {
          position: fixed;
          top: var(--header-height);
          z-index: var(--z-index-main-loading);
          height: var(--loading-element-size);
          text-align: center;
          justify-content: space-around;
          display: flex;
          justify-items: center;
          flex-wrap: nowrap;
          align-items: center;
        }
      }
    }

    .left-frame {
      position: fixed;
      left: 0;
      width: 8px;
      height: 100vh;
      background-color: var(--sidemenu-main-color);
      z-index: 98;

      &:before,
      &:after {
        content: '';
        position: absolute;
        height: 10px;
        width: 80px;
        bottom: 0;
      }

      &:before {
        top: var(--header-height);
        left: 8px;
        height: 30px;
        width: 30px;
        border-bottom-left-radius: 50%;
        background: transparent;
        transform: rotate(90deg);
        box-shadow: 0 13px 0 0 var(--sidemenu-main-color);
      }

      &:after {
        bottom: var(--footer-height);
        left: 7px;
        height: 30px;
        width: 30px;
        border-bottom-left-radius: 50%;
        background: transparent;
        transform: rotate(0deg);
        box-shadow: 0 10px 0 0 var(--sidemenu-main-color);
      }
    }
  }

  @media (max-width: 991px) {
    .content-body {
      transition: var(--main-transition);

      &.full,
      &.compact {
        margin: calc(var(--content-height) + 1rem) 3rem 1rem 3rem;
        transition: var(--main-transition);
      }
    }
  }

  .offcanvas {
    width: 380px;
  }
}
</style>

<!-- /* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */ -->

<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount, ref, watch } from 'vue'
import router from '@/router'

import { useSidemenu } from './services/UseSidemenu'
import { useWindowResize } from './services/UseWindowResize'

import LayoutFooter from './components/LayoutFooter.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutSidemenu from './components/LayoutSidemenu.vue'
import LayoutLoading from './components/LayoutLoading.vue'

import Toast from 'primevue/toast'

const sidemenu = useSidemenu()
const { width } = useWindowResize()

/** Current application version. */
const packageVersion = getCurrentInstance()?.appContext?.config?.globalProperties?.packageVersion

/** Components loading. */
const loading = ref(false)

watch(width, (newWidth) => sidemenu.setOffcanvas(newWidth < 991))

onBeforeMount(() => {
  sidemenu.setOffcanvas(width.value < 991)
  router.afterEach(() => (loading.value = true))
  router.afterEach(() => (loading.value = false))
})
</script>

<template>
  <main>
    <div class="container-fluid">
      <!-- Header -->
      <LayoutHeader />
      <!-- / Header -->

      <!-- Sidemenu -->
      <LayoutSidemenu />
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
            full: sidemenu.isOffcanvas.value || sidemenu.hasCloseState(),
            compact: !sidemenu.isOffcanvas.value && !sidemenu.hasCloseState()
          }"
        >
          <!-- page loading screen -->
          <div class="loading-content">
            <LayoutLoading :loading="loading" />
          </div>
          <!-- / Page loading screen -->

          <!-- http error message -->
          <Toast position="bottom-left" />
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
        <LayoutFooter :version="packageVersion" />
      </div>
      <!-- / Footer -->
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  scroll-behavior: smooth;
  background-color: var(--main-color);
  background: var(--main-gradiant);
  --content-height: calc(var(--header-height) + var(--toolbar-height));

  .container-fluid {
    padding: 0 0 0 0;
    margin: 0 0 0 0;

    .compact-header {
      :deep(.home-botton) {
        padding-right: var(--sidemenu-width);
      }
    }

    .compact-footer {
      :deep(.copy-right) {
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
        left: 8px;
        height: 30px;
        width: 30px;
        border-bottom-left-radius: 35%;
        background: transparent;
      }

      &:before {
        top: var(--header-height);
        transform: rotate(90deg);
        box-shadow: 0 13px 0 0 var(--sidemenu-main-color);
      }

      &:after {
        bottom: var(--footer-height);
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

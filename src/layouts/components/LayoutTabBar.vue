<!-- /* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */ -->

<script lang="ts" setup>
import { useKeepAlive } from '@/@core/services/UseKeepAlive'
import { useTheme } from '@/@core/services/UseTheme'
import router from '@/router'
import Toolbar from 'primevue/toolbar'
import { onMounted, ref } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'

const activePath = ref('')
const tabs = ref<RouteLocationNormalized[]>([])

const { currentTheme } = useTheme()
const { getComponents, addComponent, removeComponent } = useKeepAlive()

onMounted(() =>
  router.afterEach((component) => {
    // Use component path as component unique name
    addComponent(component)
    tabs.value = getComponents()
    activePath.value = component.path
  })
)
/**
 * Discrad component's path and navigate to prev or next tab or home
 * @param route tab path
 */
function discardRoute(path: string) {
  if (path) {
    const prevIndex = tabs.value.findIndex((activeTab) => activeTab.path === path) - 1
    const nextIndex = tabs.value.findIndex((activeTab) => activeTab.path === path)

    removeComponent(path)

    if (activePath.value === path)
      if (nextIndex < tabs.value.length) router.push(tabs.value[nextIndex].path)
      else if (prevIndex > -1) router.push(tabs.value[prevIndex].path)
      else router.push('/home/dashboard')
  }
}
</script>

<template>
  <Toolbar class="section">
    <template #start>
      <div class="navigation-tab" v-for="tab of tabs" :key="tab.path">
        <span
          class="p-buttonset navigation-tab-wrapper border-bottom w-100"
          :class="{
            'border-primary': currentTheme === 'light-theme' && tab.path === activePath,
            'border-warning': currentTheme === 'dark-theme' && tab.path === activePath
          }"
        >
          <PButton
            class="p-button-text p-button-primary ps-3 w-75 text-start"
            :class="{ 'p-button-secondary': tab.path !== activePath }"
            :label="tab.meta['title']"
            @click="$router.push(tab.path)"
            @click.middle="discardRoute(tab.path)"
          />
          <PButton
            class="p-button-text p-button-secondary w-25"
            :class="{ 'p-button-danger': tab.path === activePath }"
            icon="pi pi-times"
            iconPos="left"
            @click="discardRoute(tab.path)"
          />
        </span>
      </div>
    </template>
  </Toolbar>
</template>

<style lang="scss" scoped>
.section {
  transition: var(--main-transition);

  .navigation-tab {
    width: 14.2rem;

    .p-buttonset {
      .p-button:first-of-type {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 2px !important;
        border-bottom-right-radius: 2px !important;
      }

      .p-button:last-of-type {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: 2px !important;
        border-bottom-left-radius: 2px !important;
      }
    }

    .navigation-tab-wrapper {
      display: inline-flex;
      justify-content: space-between;
    }
  }
}

.p-toolbar {
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow: auto;

  height: var(--toolbar-height);
  padding: 0.5rem 4rem 0.5rem 1rem;

  background-color: var(--sidemenu-main-color);
  box-shadow: var(--main-box-shadow);
  border-radius: 8px;
  border-color: transparent;

  scrollbar-width: thin;
  scrollbar-color: #8b8b8b transparent;

  &::-webkit-scrollbar {
    height: 7px;
    width: 7px;
    background-color: transparent;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background-color: #485161;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background-color: #808b9e;
  }

  &::-webkit-scrollbar-thumb:horizontal {
    background-color: #8b8b8b;
  }
}

.p-button {
  padding: 0.5rem 0.5rem;

  .p-button-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

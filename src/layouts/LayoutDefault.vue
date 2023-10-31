<!-- /* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */ -->

<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import LayoutFooter from './components/LayoutFooter.vue'

const version = getCurrentInstance()?.appContext?.config?.globalProperties?.versionNumber
</script>

<template>
  <RouterView />
  <LayoutFooter :version="version" />
</template>

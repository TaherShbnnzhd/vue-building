<!-- /* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */ -->

<template>
  <!-- Intro animation -->
  <div class="view">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

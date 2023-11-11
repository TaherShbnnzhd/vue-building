<!-- /* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */ -->

<template>
  <Transition name="fade">
    <RouterView />
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

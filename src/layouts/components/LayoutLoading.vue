<!-- /* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */ -->

<script lang="ts" setup>
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div class="loader" v-show="props.loading">
    <span class="progress"></span>
  </div>
</template>

<style lang="scss" scoped>
/* From cssbuttons.io by @satyamchaudharydev */
.loader {
  width: 100vw;
  overflow: hidden;
  transition: 0.5s;
  letter-spacing: 2px;

  .progress {
    position: absolute;

    &:nth-child(1) {
      top: 0;
      left: -100%;
      width: 100%;
      height: var(--loading-element-size);
      background: linear-gradient(90deg, transparent, var(--loading-element-color));
      animation: progress-animation 1.3s linear infinite;
    }
  }
}

@keyframes progress-animation {
  0% {
    left: -100%;
  }

  100% {
    left: 200%;
  }
}
</style>

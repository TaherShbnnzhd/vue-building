<!-- /* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */ -->

<script lang="ts" setup>
withDefaults(defineProps<{ version: string }>(), {
  version: 'unknown'
})
</script>

<template>
  <footer class="footer px-4 d-flex align-items-center justify-content-between w-100">
    <div class="nowrap-text copy-right">
      <small> کلیه حقوق این وب سایت محفوظ و متعلق به هیچکس می‌باشد. </small>
    </div>
    <div class="mx-3">
      <small>
        {{ version }}
      </small>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  font-size: 14px;
  height: var(--footer-height);
  background-color: var(--sidemenu-main-color);
  box-shadow: var(--main-box-shadow);
  z-index: var(--z-index-footer);

  div {
    font-size: 14px;
    font-weight: 500;
    color: var(--main-card-color);
    transition: var(--main-transition);
  }
}
</style>

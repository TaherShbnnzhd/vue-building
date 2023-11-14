<!-- /* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */ -->

<script lang="ts" setup>
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import Avatar from 'primevue/avatar'
import { ref } from 'vue'

const toast = useToast()

const showSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'با موفقیت انجام شد.',
    detail: 'عملیات',
    group: 'showcase-alert-severity',
    life: 8500
  })
}

const showInfo = () => {
  toast.add({
    severity: 'info',
    summary: 'در حال انجام است . . .',
    detail: 'عملیات',
    group: 'showcase-alert-severity',
    life: 8500
  })
}

const showWarn = () => {
  toast.add({
    severity: 'warn',
    summary: 'لغو شد؟!',
    detail: 'عملیات',
    group: 'showcase-alert-severity',
    life: 8500
  })
}

const showError = () => {
  toast.add({
    severity: 'error',
    summary: 'با خطا مواجح شد!!!',
    detail: 'عملیات',
    group: 'showcase-alert-severity',
    life: 8500
  })
}

const visible = ref(false)

const showTemplate = () => {
  if (!visible.value) {
    toast.add({
      severity: 'success',
      summary: 'آیا با من ازدواج می‌کنید ؟',
      group: 'showcase-alert-template'
    })
    visible.value = true
  }
}

const onReply = () => {
  toast.removeGroup('showcase-alert-template')
  visible.value = false
}

const onClose = () => {
  visible.value = false
}
</script>

<template>
  <div class="page">
    <Toast position="bottom-left" group="showcase-alert-severity" />

    <Toast position="bottom-center" group="showcase-alert-template" @close="onClose">
      <template #message="slotProps">
        <div class="d-flex flex-column align-items-start p-toast-message-text" style="flex: 1">
          <div class="d-flex align-items-center gap-2">
            <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
            <span class="font-bold text-900 p-toast-summary">بانوی پاکدامن</span>
          </div>
          <div class="font-medium text-lg my-3 text-900 p-toast-detail">
            {{ slotProps.message.summary }}
          </div>
          <PButton class="p-button-sm" label="بله" @click="onReply()" />
        </div>
      </template>
    </Toast>

    <div class="row">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">حالت‌های نمایش اعلان</h5>
          <div class="card-text">
            <div class="d-flex w-100 ai-center jc-center">
              <div class="d-flex justify-content-around ai-center w-50">
                <PButton raised label="نمایش وضعیت" severity="success" @click="showSuccess" />
                <PButton raised label="نمایش وضعیت" severity="info" @click="showInfo" />
                <PButton raised label="نمایش وضعیت" severity="warning" @click="showWarn" />
                <PButton raised label="نمایش وضعیت" severity="danger" @click="showError" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">شخصی سازی اعلان</h5>
          <div class="card-text">
            <div class="d-flex w-100 ai-center jc-center">
              <div class="d-flex justify-content-around ai-center w-50">
                <PButton raised @click="showTemplate" label="نمایش پیشنهاد" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

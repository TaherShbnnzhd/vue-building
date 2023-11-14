<!-- /* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */ -->

<script lang="ts" setup>
import InputText from 'primevue/inputtext'

import { ref } from 'vue'

const search = ref(null)
</script>

<template>
  <div class="page">
    <div class="row">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">حالت‌های نمایش اعلان</h5>
          <div class="card-text">
            <div class="d-flex justify-content-start gap-3">
              <span class="p-input-icon-left">
                <InputText v-model="search" placeholder="جستجو" />
                <i class="pi pi-search" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

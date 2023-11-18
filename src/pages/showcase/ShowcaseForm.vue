<!-- /* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */ -->

<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputSwitch from 'primevue/inputswitch'

import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const firstname = ref('')
const lastname = ref('')
const bio = ref('')
const email = ref('')
const city = ref('')
const province = ref('')
const website = ref('')
const privacy = ref(false)
const selectedCountry = ref()
const countries = ref([
  { name: 'ایران', code: 'IR' },
  { name: 'استرالیا', code: 'AU' },
  { name: 'برزیل', code: 'BR' },
  { name: 'چین', code: 'CN' },
  { name: 'یونان', code: 'EG' },
  { name: 'فرانسه', code: 'FR' },
  { name: 'آلمان', code: 'DE' },
  { name: 'هند', code: 'IN' },
  { name: 'جاپون', code: 'JP' },
  { name: 'اسپانیا', code: 'ES' },
  { name: 'آمریکا', code: 'US' }
])

const onSubmit = () => {
  toast.add({
    severity: 'success',
    summary: 'با موفقیت انجام شد.',
    detail: 'عملیات',
    group: 'ShowcaseForm',
    life: 8500
  })
}
</script>

<template>
  <div class="page">
    <Toast position="bottom-left" group="ShowcaseForm" />
    <div class="row">
      <div class="card">
        <div class="card-body">
          <div class="card-title">حالت‌های نمایش اعلان</div>
          <div class="card-text">
            <div class="row justify-content-start">
              <!-- firstname -->
              <div class="field col-4">
                <label class="font-medium ms-1" for="firstname">نام</label>
                <InputText id="firstname" class="w-100" v-model="firstname" />
              </div>
              <!-- / firstname -->
              <!-- lastname -->
              <div class="field col-8">
                <label class="font-medium ms-1" for="lastname">نام خانوادگی</label>
                <InputText id="lastname" class="w-100" v-model="lastname" />
              </div>
              <!-- / lastname -->
            </div>

            <hr class="my-3" />

            <div class="row justify-content-start">
              <!-- avatar -->
              <div class="field col-4">
                <label for="avatar" class="font-medium ms-1">تصویر</label>
                <div class="d-flex align-items-end jc-center gap-4">
                  <img src="/images/avatar/xuxuefeng.png" width="110" height="110" />
                  <Toast />
                  <PButton id="avatar" aria-label="Filter" label="انتخاب تصویر" />
                </div>
              </div>
              <!-- / avatar -->
              <!-- bio -->
              <div class="field col-8">
                <label class="font-medium ms-1" for="bio">مشخصات</label>
                <Textarea autoResize id="bio" class="w-100" v-model="bio" rows="5" cols="30" />
              </div>
              <!-- / bio -->
            </div>

            <hr class="my-3" />

            <div class="row justify-content-start">
              <!-- email -->
              <div class="field col-6">
                <label class="font-medium ms-1" for="email">رایانامه</label>
                <InputText id="email" class="w-100" v-model="email" />
              </div>
              <!-- / email -->
              <!-- country -->
              <div class="field col-6">
                <label class="font-medium ms-1" for="country">کشور</label>

                <Dropdown
                  editable
                  v-model="selectedCountry"
                  :options="countries"
                  optionLabel="name"
                  placeholder="انتخاب کشور"
                  class="w-full md:w-14rem"
                />
              </div>
              <!-- / bio -->
              <!-- city -->
              <div class="field col-6">
                <label class="font-medium ms-1" for="city">شهر</label>
                <InputText id="city" class="w-100" v-model="city" />
              </div>
              <!-- / city -->
              <!-- province -->
              <div class="field col-6">
                <label class="font-medium ms-1" for="province">استان</label>
                <InputText id="province" class="w-100" v-model="province" />
              </div>
              <!-- / province -->
            </div>

            <hr class="my-3" />

            <div class="row justify-content-start">
              <!-- website -->
              <div class="field col-12">
                <label class="font-medium ms-1" for="website">تارنامه</label>

                <InputGroup style="direction: ltr">
                  <InputGroupAddon>www.</InputGroupAddon>
                  <InputText id="website" class="w-100" v-model="website" />
                </InputGroup>
              </div>
              <!-- / website -->
            </div>

            <hr class="my-3" />

            <div class="row justify-content-start">
              <!-- privacy -->
              <label class="font-medium ms-1" for="privacy">امنیت</label>
              <div class="field col-12">
                <div class="d-flex ai-center justify-content-start mt-2">
                  <InputSwitch binary id="privacy" v-model="privacy" />
                  <span class="font-medium ms-1 mt-1" for="privacy"
                    >اشتراک اطلاعات حساب کاربری</span
                  >
                </div>
                <!-- / privacy -->
              </div>

              <hr class="my-3" />

              <div class="row justify-content-start">
                <!-- submit -->
                <div class="col-12 d-flex justify-content-end">
                  <PButton class="w-25" label="ثبت اطلاعات" @click="onSubmit" />
                </div>
                <!-- / submit -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

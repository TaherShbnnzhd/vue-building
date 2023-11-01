/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import './assets/main.css'
import './styles/themes/light.scss'

import 'bootstrap/dist/css/bootstrap.rtl.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import 'mingcute_icon/font/Mingcute.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice'
import Ripple from 'primevue/ripple'
import { primeVueConfiguration } from './assets/configuration/primeVue'


const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, primeVueConfiguration)
app.use(ConfirmationService)
app.use(ToastService)
app.use(DialogService)
app.use(router)

app.directive('ripple', Ripple)

app.mount('#app')

// cannot use these import statements directly in a Vue component,
// so should add in globalProperties.
app.config.globalProperties.versionNumber = import.meta.env.PACKAGE_VERSION

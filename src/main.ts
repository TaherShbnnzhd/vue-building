/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import './assets/main.css'

import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice'
import Button from 'primevue/button'
import Toast from 'primevue/toast'

import { primeVueConfig } from './assets/configs/primeVueConfig'

import { loadRuntimeConfiguration, runtimeConfiguration } from '@core/plugins/runtimeConfiguration'

// Since fetch is asynchronous,
// the application is mounted after the data has been gathered successfully.
// This way, we make sure the configuration is loaded to prevent incoherent state in the application.
const runtimeConfigurationOptions = await loadRuntimeConfiguration()

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Plugins
app.use(runtimeConfiguration, runtimeConfigurationOptions)

app.use(PrimeVue, primeVueConfig)
app.use(ConfirmationService)
app.use(ToastService)
app.use(DialogService)

// Components
app.component('PButton', Button)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Toast', Toast)

app.mount('#app')

// cannot use these import statements directly in a Vue component,
// so should add in globalProperties.
app.config.globalProperties.packageVersion = import.meta.env.PACKAGE_VERSION

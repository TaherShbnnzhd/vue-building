/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// cannot use these import statements directly in a Vue component,
// so should add in globalProperties.
app.config.globalProperties.versionNumber = import.meta.env.PACKAGE_VERSION

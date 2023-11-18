/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { usePrimeVue } from 'primevue/config'
import { ref } from 'vue'

/** Theme name */
const currentTheme = ref<'light-theme' | 'dark-theme'>('light-theme')

/** Handle themes */
export function useTheme() {
  const primevue = usePrimeVue()
  /**
   * Switch theme between loaded primeNG themes
   * @param theme theme bundle name
   */
  function switchTheme(theme: 'light-theme' | 'dark-theme') {
    const appThemeLink = document.getElementById('app-theme-link') as HTMLLinkElement

    if (appThemeLink) {
      currentTheme.value = theme
      appThemeLink.href = `/themes/${currentTheme.value}.css`

      switch (theme) {
        case 'light-theme':
          primevue.changeTheme('lara-dark-teal', 'lara-light-teal', 'primevue-theme-link', () => {})
          break
        case 'dark-theme':
          primevue.changeTheme('lara-light-teal', 'lara-dark-teal', 'primevue-theme-link', () => {})
          break
        default:
          primevue.changeTheme('lara-dark-teal', 'lara-light-teal', 'primevue-theme-link', () => {})
      }
    }
  }

  return {
    currentTheme,
    switchTheme
  }
}

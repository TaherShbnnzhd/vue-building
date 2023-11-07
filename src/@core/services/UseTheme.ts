/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { ref } from 'vue'

/** Theme name */
const currentTheme = ref<'light-theme' | 'dark-theme'>('light-theme')

/** Handle themes */
export function useTheme() {
  /**
   * Switch theme between loaded primeNG themes
   * @param theme theme bundle name
   */
  function switchTheme(theme: 'light-theme' | 'dark-theme') {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement

    if (themeLink) {
      currentTheme.value = theme
      themeLink.href = `/themes/${currentTheme.value}.css`
    }
  }

  return {
    currentTheme,
    switchTheme
  }
}

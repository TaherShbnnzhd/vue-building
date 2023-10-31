/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

/** Handle themes */
export function useTheme() {
  /** Theme name */
  let theme: 'light-theme' | 'dark-theme' = 'light-theme'

  /**
   * Switch theme between loaded primeNG themes
   * @param theme theme bundle name
   */
  function switchTheme(name: 'light-theme' | 'dark-theme') {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement

    if (themeLink) {
      theme = name
      themeLink.href = theme + '.css'
    }
  }

  return {
    theme,
    switchTheme
  }
}

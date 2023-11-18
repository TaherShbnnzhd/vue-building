/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { ref, onMounted, onUnmounted } from 'vue'

/** Handle windows width and height */
export function useWindowResize() {
  /** Windows height */
  const height = ref(window.innerHeight)

  /** Windows width */
  const width = ref(window.innerWidth)

  function handler() {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => window.addEventListener('resize', handler))
  onUnmounted(() => window.removeEventListener('resize', handler))

  return { width, height }
}

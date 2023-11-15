/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { ref } from 'vue'
import { BehaviorSubject } from 'rxjs'

import { useAuth } from '@core/services/UseAuth'
import { computed } from 'vue'

/** Sidemenu state. */
const state = ref(true)

/** Sidemenu offcanvas state. */
const isOffcanvasSidemenu = ref(true)

/** Sidemenu menu name. */
const sidemenus = new BehaviorSubject<string>('')

/** Handle sidemenu actions */
export function useSidemenu() {
  const { isAuthenticated } = useAuth()

  /** Sidemenu close state. */
  const isClosedSidemenu = computed(() => state.value)

  /** Set sidemenu offcanvas state. */
  function setOffcanvasSidemenu(value: boolean) {
    if (value) openSidemenu()
    else if (isAuthenticated.value) {
      sidemenus.next(sidemenus.getValue())
      closeSidemenu()
    }
    isOffcanvasSidemenu.value = value
  }

  /** Open sidemenu. */
  function openSidemenu() {
    if (isAuthenticated.value) state.value = false
  }

  /** Close sidemenu. */
  function closeSidemenu() {
    state.value = true
  }

  return {
    sidemenus,
    isOffcanvasSidemenu,
    setOffcanvasSidemenu,
    openSidemenu,
    closeSidemenu,
    isClosedSidemenu
  }
}

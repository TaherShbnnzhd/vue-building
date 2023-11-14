/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { ref } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'

/** Array which will store components name indexed by keys */
const aliveComponents = ref<RouteLocationNormalized[]>([])

/** Handle caches dynamically toggled components */
export function useKeepAlive() {
  /**
   * Add new alive component without ignoreTab in it's routing meta
   * @param path Route of the component
   */
  function addAliveComponent(component: RouteLocationNormalized) {
    if (getComponentIndex(component.path) === -1)
      if (!component.meta['ignoreTab']) aliveComponents.value.push(component)
  }

  /**
   * Remove selected alive component form alive components list
   * @param name path of the component
   */
  function removeAliveComponent(path: string) {
    const index = getComponentIndex(path)

    if (index > -1) aliveComponents.value.splice(index, 1)
  }

  /** Get all alive components */
  function getAliveComponents() {
    return aliveComponents.value
  }

  /** Remove all alive components */
  function clearAliveComponents() {
    aliveComponents.value.splice(0, aliveComponents.value.length)
  }

  /**
   * Check if component name is in alive components list
   * @param name component name
   * @returns component
   */
  function getComponentIndex(path: string) {
    return aliveComponents.value.findIndex((component) => component.path === path)
  }

  return {
    addAliveComponent,
    removeAliveComponent,
    getAliveComponents,
    clearAliveComponents
  }
}

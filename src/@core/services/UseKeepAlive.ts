/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { ref } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'

/** Array which will store components name indexed by keys */
const components = ref<RouteLocationNormalized[]>([])

/** Handle caches dynamically toggled components */
export function useKeepAlive() {
  /**
   * Get all components with thier data
   * @returns All components with their data
   */
  function getComponents() {
    return components.value
  }

  /**
   * Add new component without ignoreTab in it's routing
   * @param path Route of the component
   * @param storedRoute Route data to store
   */
  function addComponent(component: RouteLocationNormalized) {
    if (getComponentIndex(component.path) === -1)
      if (!component.meta['ignoreTab']) components.value.push(component)
  }

  /**
   * Check if component name is in components list
   * @param name component name
   * @returns component
   */
  function getComponentIndex(path: string) {
    return components.value.findIndex((componentName) => componentName.path === path)
  }

  /**
   * Remove selected component form components list
   * @param name path of the component
   */
  function removeComponent(path: string) {
    const omponentIndex = getComponentIndex(path)

    if (omponentIndex > -1) components.value.splice(omponentIndex, 1)
  }

  /** Remove all components */
  function clearComponents() {
    components.value.splice(0, components.value.length)
  }

  return {
    getComponents,
    addComponent,
    removeComponent,
    clearComponents
  }
}

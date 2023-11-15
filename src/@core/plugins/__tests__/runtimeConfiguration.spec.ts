/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { describe, expect, it } from 'vitest'
import type { RuntimeConfigurationOptions } from '../runtimeConfiguration'
import { runtimeConfiguration } from '../runtimeConfiguration'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

/** Unit test plugin */
const App = defineComponent({
  template: '<template>{{ serverAddress }}</template>',
  data() {
    // @ts-ignore
    const serverAddress = this.$runtimeConfiguration.serverAddress
    return {
      serverAddress
    }
  }
})

// Plugins can be unit tested in a black box testing fashion.
describe('runtimeConfiguration plugin', () => {
  it('resolves serverAddress value from injected configuration options', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [
          [
            runtimeConfiguration,
            {
              variables: {
                serverAddress: 'https://www.primefaces.org/data/customers'
              }
            } as RuntimeConfigurationOptions
          ]
        ]
      }
    })
    expect(wrapper.text()).toBe('https://www.primefaces.org/data/customers')
  })
})

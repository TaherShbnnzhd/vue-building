/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import type { App, Plugin } from 'vue'

export interface RuntimeConfiguration {
  serverAddress: string
}

export interface RuntimeConfigurationOptions {
  variables: RuntimeConfiguration
}

export const runtimeConfiguration: Plugin = {
  install: (app: App, options: RuntimeConfigurationOptions) => {
    // Runtime configuration variables can be accessed from injection : `runtimeConfiguration`.
    app.config.globalProperties.$runtimeConfiguration = options.variables

    // They can also be accessed from global property `$runtimeConfiguration`
    app.provide('runtimeConfiguration', options.variables)
  }
}

/** Loads runtime configuration from static file (in /public folder) */
export const loadRuntimeConfiguration = async (): Promise<RuntimeConfigurationOptions> => {
  const response = await fetch('/runtime-config.json')
  const configurations = await response.json()

  return {
    variables: {
      serverAddress: configurations.SERVER_ADDRESS
    } as RuntimeConfiguration
  } as RuntimeConfigurationOptions
}

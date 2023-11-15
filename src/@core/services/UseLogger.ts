/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

import { ref } from 'vue'

/** Log message pool */
const logMessages = ref<string[]>([])

/** Log errors such as http errors to sync with server */
export function useLogger() {
  /**
   * Add message to message pool
   * @param message = string message
   */
  function addLogMessage(message: string): void {
    logMessages.value.push(message)
  }

  /** Empty log message pool */
  function clearLogMessages(): void {
    logMessages.value = []
  }

  return {
    logMessages,
    addLogMessage,
    clearLogMessages
  }
}

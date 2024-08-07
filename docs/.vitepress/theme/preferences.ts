import { ref } from 'vue'

export const inBrowser = typeof window !== 'undefined'

const get = (key: string, defaultValue = false): boolean =>
  inBrowser ? JSON.parse(localStorage.getItem(key) || String(defaultValue)) : defaultValue

export const preferClassicKey = 'nbx-prefer-classic'
export const preferClassic = ref(get(preferClassicKey, true))

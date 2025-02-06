import { loadSpace } from '@usersnap/browser'
import type { SpaceApi } from '@usersnap/browser'

declare global {
  interface Window {
    usersnap: SpaceApi | undefined;
  }
}

// Replace with the API key from your widget installation page
export const USERSNAP_SPACE_API_KEY = "<USERSNAP_SPACE_API_KEY>"

export default defineNuxtPlugin
  (nuxtApp => {
    loadSpace(USERSNAP_SPACE_API_KEY).then((api) => {
      api.init()
      window.usersnap = api
    })
  })

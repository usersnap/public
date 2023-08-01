import { loadSpace } from '@usersnap/browser'

// Replace with the API key from your widget installation page
export const USERSNAP_GLOBAL_API_KEY = "<USERSNAP_GLOBAL_API_KEY>"

export default () => {
  loadSpace(USERSNAP_GLOBAL_API_KEY).then((api) => {
    api.init()
  })
}

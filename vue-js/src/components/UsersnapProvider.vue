<script>
import { computed, reactive } from 'vue'
import { loadSpace } from '@usersnap/browser'
import { USERSNAP_GLOBAL_API_KEY } from '../constants'

export default {
  props: {
      initParams: {
          type: Object,
      }
  },
  data() {
    return {
      usersnapApi: null
    }
  },
  methods: {
      setUsersnapApi(api) {
          this.usersnapApi = api;
      }
  },
  provide() {
    return {
      usersnapApi: computed(() => this.usersnapApi)
    }
  },
  mounted() {
    loadSpace(USERSNAP_GLOBAL_API_KEY).then((api) => {
      api.init(this.initParams)
      this.setUsersnapApi(api)
    })
  },
}
</script>

<template>
  <slot></slot>
</template>

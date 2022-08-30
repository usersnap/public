<script>
import { computed } from 'vue'
import { USERSNAP_GLOBAL_API_KEY } from '../constants'

export default {
  props: {
      initParams: {
          type: Object,
          default: {}
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
  created() {
    window.onUsersnapCXLoad = (api) => {
      api.init(this.initParams);
      this.setUsersnapApi(api)
    }
    const script = document.createElement('script');
    script.defer = 1;
    script.src = `https://widget.usersnap.com/global/load/${USERSNAP_GLOBAL_API_KEY}?onload=onUsersnapCXLoad`;
    document.head.appendChild(script);

    return () => {
        if (this.usersnapApi) {
            usersnapApi.destroy();
        }
        script.remove();
    }
  },
  beforeUnmount() {
    if (this.usersnapApi) {
      this.usersnapApi.destroy();
    }
  },
}
</script>

<template>
  <slot></slot>
</template>

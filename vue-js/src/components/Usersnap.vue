<script>
const USERSNAP_API_KEY = '<USERSNAP_API_KEY>'
const USERSNAP_GLOBAL_API_KEY = '<USERSNAP_GLOBAL_API_KEY>'

export default {
  name: 'Usersnap',
  created() {
    window.onUsersnapCXLoad = function(api) {
      api.init();
      api.show(USERSNAP_API_KEY)
    }
    const script = document.createElement('script');
    script.defer = 1;
    script.src = `https://widget.usersnap.com/global/load/${USERSNAP_GLOBAL_API_KEY}?onload=onUsersnapCXLoad`;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}
</script>

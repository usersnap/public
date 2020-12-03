// Replace with the API keys from your widget installation page
const USERSNAP_GLOBAL_API_KEY = '<USERSNAP_GLOBAL_API_KEY>';
const USERSNAP_API_KEY = '<USERSNAP_API_KEY>';

export default () => {
  window.onUsersnapCXLoad = function(api) {
    // store the Usersnap global api on the window, if case you want to use it in other contexts
    window.Usersnap = api;
    api.init();
    api.show(USERSNAP_API_KEY)
  }
  var script = document.createElement('script');
  script.defer = 1;
  script.src = `https://widget.usersnap.com/global/load/${USERSNAP_GLOBAL_API_KEY}?onload=onUsersnapCXLoad`;
  document.getElementsByTagName('head')[0].appendChild(script);
}

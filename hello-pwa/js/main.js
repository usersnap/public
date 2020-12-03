window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
}


window.onUsersnapCXLoad = (api) => {
  api.init({button: null});
  window.Usersnap = api;
}


window.leaveFeedback = () => {
  window.Usersnap.open();
}

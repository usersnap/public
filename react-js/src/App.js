import Helmet from 'react-helmet'

import logo from './logo.svg';
import './App.css';

// Replace with the API keys from your widget installation page
const USERSNAP_GLOBAL_API_KEY = "<USERSNAP_GLOBAL_API_KEY>"
const USERSNAP_API_KEY = "<USERSNAP_API_KEY>"

function App() {
  return (
    <>
    <Helmet>
      <script type="text/javascript">
        {`
            window.onUsersnapCXLoad = function(api) {
              api.init();
              api.show('${USERSNAP_API_KEY}') 
            }
            var script = document.createElement('script');
            script.defer = 1;
            script.src = 'https://widget.usersnap.com/global/load/${USERSNAP_GLOBAL_API_KEY}?onload=onUsersnapCXLoad';
            document.getElementsByTagName('head')[0].appendChild(script);
        `}
      </script>
    </Helmet>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </>
  );
}

export default App;

import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { UsersnapProvider } from './UsersnapContext';
import CustomButton from './examples/CustomButton';
import CustomDisplayLogic from './examples/CustomDisplayLogic';
import PassInitialValues from './examples/PassInitialValues';
import WidgetApiEvents from './examples/WidgetApiEvents';

function App() {
  const [currentExample, setCurrentExample] = useState('basic')

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <button onClick={() => setCurrentExample('basic')}>Basic</button>
        <button onClick={() => setCurrentExample('customButton')}>Custom button</button>
        <button onClick={() => setCurrentExample('onlyForLoggedInUsers')}>Only for logged in users</button>
        <button onClick={() => setCurrentExample('onlyWithCertainEmails')}>Only with certain emails</button>
        <button onClick={() => setCurrentExample('customDisplayLogic')}>Custom display logic</button>
        <button onClick={() => setCurrentExample('passInitialValues')}>Pass initial values</button>
        <button onClick={() => setCurrentExample('widgetApiEvents')}>Widget API events</button>
        <button onClick={() => setCurrentExample('nativeScreenshot')}>Native screenshot</button>
        <button onClick={() => setCurrentExample('nativeScreenshotInNewTab')}>Native screenshot in new tab</button>
        <button onClick={() => setCurrentExample('otherWidgetOptions')}>Other widget options</button>
      </div>
      <div className="examples">
        {currentExample === 'basic' && (
          <UsersnapProvider>
            <div>Basic installation</div>
          </UsersnapProvider>
        )}
        {currentExample === 'customButton' && (
          <UsersnapProvider>
            <CustomButton />
          </UsersnapProvider>
        )}
        {currentExample === 'onlyForLoggedInUsers' && (
          /**
           * "userId" should be non-falsy value in order for the widget
           * to consider the current user as logged in one
           */
          <UsersnapProvider initParams={{ user: { userId: '123' }}}>
            <div>Only logged in users should see that</div>
          </UsersnapProvider>
        )}
        {currentExample === 'onlyWithCertainEmails' && (
          /**
           * "email" should be a string which will be compared
           * to the list of allowed or not-allowed emails
           */
          <UsersnapProvider initParams={{ user: { email: 'user@mail.com' }}}>
            <div>Only users with allowed emails should see that</div>
          </UsersnapProvider>
        )}
        {currentExample === 'customDisplayLogic' && (
          <UsersnapProvider>
            <CustomDisplayLogic />
          </UsersnapProvider>
        )}
        {currentExample === 'passInitialValues' && (
          <UsersnapProvider>
            <PassInitialValues />
          </UsersnapProvider>
        )}
        {currentExample === 'widgetApiEvents' && (
          <UsersnapProvider>
            <WidgetApiEvents />
          </UsersnapProvider>
        )}
        {currentExample === 'nativeScreenshot' && (
          /**
           * "nativeScreenshot" should be "true" value or "{ target: '_self' }"
           */
          <UsersnapProvider initParams={{ nativeScreenshot: true }}>
            <div>Native screenshot</div>
          </UsersnapProvider>
        )}
        {currentExample === 'nativeScreenshotInNewTab' && (
          /**
           * "nativeScreenshot" should be object "{ target: '_blank' }"
           */
          <UsersnapProvider initParams={{ nativeScreenshot: { target: '_blank' } }}>
            <div>Native screenshot in new tab</div>
          </UsersnapProvider>
        )}
        {currentExample === 'otherWidgetOptions' && (
          <UsersnapProvider initParams={{
            collectGeoLocation: 'none', // whether to collect geo location when submitting feedback, other values are "null" and "'all"
            enableScreenshot: false, // whether to enable widget screenshot
            useLocalStorage: false, // whether allowed to use user's local storage
            useSystemFonts: true, // whether widget should use browser default font rather than loading external one
            locale: 'de' // force widget language
          }}>
            <div>Other widget options</div>
            <ul>
                <li>collectGeoLocation</li>
                <li>enableScreenshot</li>
                <li>useLocalStorage</li>
                <li>useSystemFonts</li>
                <li>locale</li>
            </ul>
          </UsersnapProvider>
        )}
      </div>
    </div>
  );
}

export default App;

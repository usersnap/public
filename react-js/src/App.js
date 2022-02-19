import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { UsersnapProvider } from './UsersnapContext';
import CustomButton from './examples/CustomButton';
import Basic from './examples/Basic';
import OnlyForLoggedInUsers from './examples/OnlyForLoggedInUsers';
import OnlyWithCertainEmails from './examples/OnlyWithCertainEmails'
import CustomDisplayLogic from './examples/CustomDisplayLogic';
import PassInitialValues from './examples/PassInitialValues';
import WidgetApiEvents from './examples/WidgetApiEvents';
import NativeScreenshot from './examples/NativeScreenshot';
import OtherWidgetOptions from './examples/OtherWidgetOptions';

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
            <Basic />
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
            <OnlyForLoggedInUsers />
          </UsersnapProvider>
        )}
        {currentExample === 'onlyWithCertainEmails' && (
          /**
           * "email" should be a string which will be compared
           * to the list of allowed or not-allowed emails
           */
          <UsersnapProvider initParams={{ user: { email: 'user@mail.com' }}}>
            <OnlyWithCertainEmails />
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
            <NativeScreenshot />
          </UsersnapProvider>
        )}
        {currentExample === 'otherWidgetOptions' && (
          <UsersnapProvider initParams={{
            collectGeoLocation: 'none', // whether to collect geo location when submitting feedback, other values are "null" and "'all"
            enableScreenshot: false, // whether to enable widget screenshot
            useLocalStorage: false, // whether allowed to use user's local storage
            useSystemFonts: true, // whether widget should use browser default font rather than loading external one
            locale: 'en' // force widget language
          }}>
            <OtherWidgetOptions />
          </UsersnapProvider>
        )}
      </div>
    </div>
  );
}

export default App;

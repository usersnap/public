import React, { useState } from "react"
import { UsersnapProvider } from "../components/UsersnapContext"
import CustomButton from '../examples/CustomButton';
import Basic from '../examples/Basic';
import OnlyForLoggedInUsers from '../examples/OnlyForLoggedInUsers';
import OnlyWithCertainEmails from '../examples/OnlyWithCertainEmails'
import CustomDisplayLogic from '../examples/CustomDisplayLogic';
import PassInitialValues from '../examples/PassInitialValues';
import WidgetApiEvents from '../examples/WidgetApiEvents';
import NativeScreenshot from '../examples/NativeScreenshot';
import OtherWidgetOptions from '../examples/OtherWidgetOptions';

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  backgroundColor: '#282c34',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'calc(10px + 2vmin)',
  color: 'white',
}

const buttonStyles = {
  color: 'white',
  border: '1px solid white',
  background: 'none',
  borderRadius: '5px',
  marginRight: '10px',
}

const examplesStyles = {
  marginTop: '20px'
}

// markup
const IndexPage = () => {
  const [currentExample, setCurrentExample] = useState('basic')

  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <img
        alt="Gatsby G Logo"
        src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"
      />
      <div>
        <button style={buttonStyles} onClick={() => setCurrentExample('basic')}>Basic</button>
        <button style={buttonStyles} onClick={() => setCurrentExample('customButton')}>Custom button</button>
        <button style={buttonStyles} onClick={() => setCurrentExample('onlyForLoggedInUsers')}>Only for logged in users</button>
        <button style={buttonStyles} onClick={() => setCurrentExample('onlyWithCertainEmails')}>Only with certain emails</button>
        <button style={buttonStyles} onClick={() => setCurrentExample('customDisplayLogic')}>Custom display logic</button>
        <button style={buttonStyles} onClick={() => setCurrentExample('passInitialValues')}>Pass initial values</button>
        <button style={buttonStyles} onClick={() => setCurrentExample('widgetApiEvents')}>Widget API events</button>
        <button style={buttonStyles} onClick={() => setCurrentExample('nativeScreenshot')}>Native screenshot</button>
        <button style={buttonStyles} onClick={() => setCurrentExample('nativeScreenshotInNewTab')}>Native screenshot in new tab</button>
        <button style={buttonStyles} onClick={() => setCurrentExample('otherWidgetOptions')}>Other widget options</button>
      </div>
      <div style={examplesStyles}>
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
    </main>
  )
}

export default IndexPage

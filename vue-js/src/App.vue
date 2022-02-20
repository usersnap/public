<script>
import UsernapProvider from './components/UsersnapProvider.vue'
import CustomButton from './examples/CustomButton.vue'
import CustomDisplayLogic from './examples/CustomDisplayLogic.vue'
import PassInitialValues from './examples/PassInitialValues.vue'
import WidgetApiEvents from './examples/WidgetApiEvents.vue'

export default {
  data() {
    return {
      currentExample: 'basic',
    }
  },
  methods: {
    setCurrentExample(example) {
      this.currentExample = example;
    }
  },
  components: {
    UsernapProvider,
    CustomButton,
    CustomDisplayLogic,
    PassInitialValues,
    WidgetApiEvents,
  }
}
</script>

<template>
  <div class="wrapper">
    <header>
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    </header>

    <div class="buttons">
        <button @click="setCurrentExample('basic')">Basic</button>
        <button @click="setCurrentExample('customButton')">Custom button</button>
        <button @click="setCurrentExample('onlyForLoggedInUsers')">Only for logged in users</button>
        <button @click="setCurrentExample('onlyWithCertainEmails')">Only with certain emails</button>
        <button @click="setCurrentExample('customDisplayLogic')">Custom display logic</button>
        <button @click="setCurrentExample('passInitialValues')">Pass initial values</button>
        <button @click="setCurrentExample('widgetApiEvents')">Widget API events</button>
        <button @click="setCurrentExample('nativeScreenshot')">Native screenshot</button>
        <button @click="setCurrentExample('nativeScreenshotInNewTab')">Native screenshot in new tab</button>
        <button @click="setCurrentExample('otherWidgetOptions')">Other widget options</button>
      </div>

    <main>
      <UsernapProvider v-if="currentExample === 'basic'">
        <div>Basic installation</div>
      </UsernapProvider>
      <UsernapProvider v-if="currentExample === 'customButton'">
        <CustomButton />
      </UsernapProvider>
      <UsernapProvider :initParams="{
        /**
        * 'userId' should be non-falsy value in order for the widget
        * to consider the current user as logged in one
        */
        user: { userId: '123' }
      }" v-if="currentExample === 'onlyForLoggedInUsers'">
        <div>Only logged in users should see that</div>
      </UsernapProvider>
      <UsernapProvider :initParams="{
        /**
        * 'email' should be a string which will be compared
        * to the list of allowed or not-allowed emails
        */
        user: { email: 'user@mail.com' }
      }" v-if="currentExample === 'onlyWithCertainEmails'">
        <div>Only users with included emails should see that</div>
      </UsernapProvider>
      <UsernapProvider v-if="currentExample === 'customDisplayLogic'">
        <CustomDisplayLogic />
      </UsernapProvider>
      <UsernapProvider v-if="currentExample === 'passInitialValues'">
        <PassInitialValues />
      </UsernapProvider>
      <UsernapProvider v-if="currentExample === 'widgetApiEvents'">
        <WidgetApiEvents />
      </UsernapProvider>
      <UsernapProvider :initParams="{
        /**
        * 'nativeScreenshot' should be 'true' value or '{ target: '_self' }'
        */
        nativeScreenshot: true
      }" v-if="currentExample === 'nativeScreenshot'">
        <div>Native screenshot</div>
      </UsernapProvider>
      <UsernapProvider :initParams="{
        /**
        * 'nativeScreenshot' should be an object '{ target: '_blank' }'
        */
        nativeScreenshot: { target: '_blank' }
      }" v-if="currentExample === 'nativeScreenshotInNewTab'">
        <div>Native screenshot in new tab</div>
      </UsernapProvider>
      <UsernapProvider :initParams="{
          collectGeoLocation: 'none', // whether to collect geo location when submitting feedback, other values are null and 'all'
          enableScreenshot: false, // whether to enable widget screenshot
          useLocalStorage: false, // whether allowed to use user's local storage
          useSystemFonts: true, // whether widget should use browser default font rather than loading external one
          locale: 'de' // force widget language
        }" v-if="currentExample === 'otherWidgetOptions'">
        <div>Other widget options</div>
        <ul>
            <li>collectGeoLocation</li>
            <li>enableScreenshot</li>
            <li>useLocalStorage</li>
            <li>useSystemFonts</li>
            <li>locale</li>
        </ul>
      </UsernapProvider>
    </main>
  </div>
</template>

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  width: 100%;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

button {
  background: none;
  color: white;
  border: 1px solid white;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

main {
  font-size: 25px;
  color: white;
  margin-top: 20px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    padding: 0 2rem;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  header {
    display: flex;
    place-items: center;
  }
}
</style>

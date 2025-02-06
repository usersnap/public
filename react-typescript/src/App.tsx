import logo from './assets/react.svg'
import './App.css'
import { UsersnapProvider } from './UsersnapProvider'

// import CustomButton from './examples/CustomButton'
// import PassInitialValues from './examples/PassInitialValues'
// import CustomDisplayLogic from './examples/CustomDisplayLogic';
// import PassInitialValues from './examples/PassInitialValues';
// import WidgetApiEvents from './examples/WidgetApiEvents';
// import PassHiddenValues from './examples/PassHiddenValues';

function App() {
  return (
    <UsersnapProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="logo" alt="logo" />
        </header>
        <div className="examples">
          <p>
            Take a look at the  examples in the <code>src/examples</code> folder.
          </p>
        </div>
      </div>
    </UsersnapProvider>
  )
}

export default App

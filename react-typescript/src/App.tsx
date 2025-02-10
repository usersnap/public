import logo from './assets/react.svg'
import './App.css'
import { UsersnapProvider } from './UsersnapProvider'

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
